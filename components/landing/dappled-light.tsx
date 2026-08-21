"use client";

import * as React from "react";

/* Dappled light: slow-drifting soft shadows across the page, like sun
   through leaves onto paper. A single WebGL fragment shader renders FBM
   noise as low-alpha ink blobs on a transparent canvas that floats above
   the page (the fixed grain layer still sits above it). Runs at half
   resolution since the blobs are blurry by design, pauses when the tab is
   hidden, and renders one static frame under prefers-reduced-motion. */

const VERT = `
attribute vec2 p;
void main() {
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_strength;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.x *= u_res.x / u_res.y;

  float t = u_time * 0.045;
  float f1 = fbm(uv * 1.5 + vec2(t * 0.8, t * 0.45));
  float f2 = fbm(uv * 2.8 - vec2(t * 0.55, t * 0.3) + 4.7);
  float field = f1 * 0.62 + f2 * 0.38;
  // fbm output clusters tightly around 0.5, so the window must sit narrow
  // and close to the mean to produce large soft-edged blobs.
  float shadow = smoothstep(0.47, 0.63, field);

  // Premultiplied ink: the canvas is composited as premultiplied alpha.
  float a = shadow * u_strength;
  gl_FragColor = vec4(vec3(0.118, 0.145, 0.188) * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function DappledLight({ strength = 0.13 }: { strength?: number }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Fullscreen triangle.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uStrength = gl.getUniformLocation(program, "u_strength");
    gl.uniform1f(uStrength, strength);

    gl.clearColor(0, 0, 0, 0);

    // Half resolution is plenty for soft blobs and keeps the GPU load low.
    const resize = () => {
      const scale = 0.5;
      canvas.width = Math.max(1, Math.floor(window.innerWidth * scale));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    const draw = (now: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      draw(start + 12000);
      return () => window.removeEventListener("resize", resize);
    }

    let raf = 0;
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => cancelAnimationFrame(raf);
    const onVisibility = () => (document.hidden ? stopLoop() : startLoop());

    startLoop();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buffer);
    };
  }, [strength]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] h-full w-full"
    />
  );
}
