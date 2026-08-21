"use client";

import * as React from "react";

/**
 * LeafShadows
 *
 * Renders soft, animated leaf shadows over the page.
 *
 * Despite the WebGL canvas, this is not a generative shader. The component
 * plays a short looping video of leaf shadows and draws each frame onto a
 * fullscreen canvas. The fragment shader is a plain passthrough: it copies
 * the video pixel for pixel, with zero image processing. WebGL is only used
 * so frames paint in sync with the video (requestVideoFrameCallback) and
 * scale to any viewport without distortion.
 *
 * The shadow effect itself is plain CSS compositing: the canvas uses
 * mix-blend-mode: multiply at low opacity. The video is dark leaf
 * silhouettes on a bright background, so the bright parts blend away into
 * the page and only the leaf shapes darken whatever sits underneath.
 *
 * Feed it a seamless loop with dark leaves on a light background — search
 * "leaf shadow loop" or "gobo overlay" on stock video sites, or film a
 * houseplant against a white wall with a lamp.
 */

const VERT = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

// Pure passthrough — no image processing happens in GLSL. All of the
// visual effect comes from the CSS blend mode applied to the canvas.
const FRAG = `
  precision mediump float;
  uniform sampler2D u_video;
  varying vec2 v_texCoord;
  void main() {
    gl_FragColor = texture2D(u_video, v_texCoord);
  }
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export interface LeafShadowsProps {
  /** mp4 source for the leaf-shadow loop. Required. */
  srcMp4: string;
  /** webm source, preferred by Chrome/Firefox when present. Optional. */
  srcWebm?: string;
  /** Canvas opacity in light mode. Around 0.2 keeps it subtle. */
  opacity?: number;
  /** Canvas opacity in dark mode — needs more weight to show up on dark
      surfaces. */
  opacityDark?: number;
  /** Whether dark mode is currently active — swaps to opacityDark when true. */
  isDark?: boolean;
  /** Extra className merged onto the canvas element. */
  className?: string;
}

export function LeafShadows({
  srcMp4,
  srcWebm,
  opacity = 0.2,
  opacityDark = 0.6,
  isDark = false,
  className = "",
}: LeafShadowsProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const texBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
    const texLoc = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program, "u_video"), 0);

    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute("playsinline", "");

    const sourceMp4 = document.createElement("source");
    sourceMp4.src = srcMp4;
    sourceMp4.type = "video/mp4";
    video.appendChild(sourceMp4);

    if (srcWebm) {
      const sourceWebm = document.createElement("source");
      sourceWebm.src = srcWebm;
      sourceWebm.type = "video/webm";
      video.appendChild(sourceWebm);
    }

    let ready = false;

    // Cover-fit crop math (same as CSS object-fit: cover), keeps the video
    // filling the viewport without distortion at any aspect ratio.
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);

      if (video.videoWidth && video.videoHeight) {
        const canvasAR = canvas.width / canvas.height;
        const videoAR = video.videoWidth / video.videoHeight;
        let u0 = 0, v0 = 0, u1 = 1, v1 = 1;
        if (videoAR > canvasAR) {
          u0 = (1 - canvasAR / videoAR) / 2;
          u1 = 1 - u0;
        } else {
          v0 = (1 - videoAR / canvasAR) / 2;
          v1 = 1 - v0;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([u0, v0, u1, v0, u0, v1, u1, v1]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);
      }
    };

    const drawFrame = () => {
      if (ready && !video.paused && !video.ended) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const supportsRVFC = "requestVideoFrameCallback" in HTMLVideoElement.prototype;
    let handle: number | null = null;

    const loop = () => {
      if (video.paused || video.ended) {
        handle = null;
        return;
      }
      if (supportsRVFC) {
        
        handle = video.requestVideoFrameCallback(() => {
          drawFrame();
          loop();
        });
      } else {
        handle = requestAnimationFrame(() => {
          drawFrame();
          loop();
        });
      }
    };

    const startLoop = () => {
      if (handle === null && ready) loop();
    };
    const stopLoop = () => {
      if (handle !== null) {
       
        supportsRVFC ? video.cancelVideoFrameCallback(handle) : cancelAnimationFrame(handle);
        handle = null;
      }
    };

    video.addEventListener("playing", startLoop);
    video.addEventListener("pause", stopLoop);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPref = () => {
      reduceMotion.matches ? video.pause() : video.play().catch(() => {});
    };
    reduceMotion.addEventListener("change", applyMotionPref);

    const onVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        applyMotionPref();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    video.addEventListener("loadeddata", () => {
      ready = true;
      resize();
      applyMotionPref();
    });

    window.addEventListener("resize", resize);
    resize();
    video.load();

    return () => {
      stopLoop();
      video.removeEventListener("playing", startLoop);
      video.removeEventListener("pause", stopLoop);
      reduceMotion.removeEventListener("change", applyMotionPref);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      video.pause();
      video.remove();
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(texBuf);
      gl.deleteTexture(texture);
    };
  }, [srcMp4, srcWebm]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-40 h-full w-full mix-blend-multiply transform-gpu ${className}`}
      style={{ opacity: isDark ? opacityDark : opacity }}
    />
  );
}
