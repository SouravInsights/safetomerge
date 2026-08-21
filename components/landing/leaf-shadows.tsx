"use client";

import * as React from "react";

/**
 * LeafShadows
 *
 * Renders soft, animated leaf shadows over the page.
 *
 * The component plays a short looping video of real leaf shadows and draws
 * each frame onto a fullscreen WebGL canvas. The fragment shader is not a
 * passthrough: it layers what footage alone cannot do — a levels remap that
 * pulls real shadow depth out of the footage's grays (multiply blending
 * only shows darkening, and the raw footage has no true blacks, so this is
 * what makes everything below visible), crepuscular rays marched toward
 * the sun with the video itself as the occluder, independent sway per leaf
 * region (parallax the flat video lacks), dust motes twinkling in the
 * shafts, a warm-light/cool-shadow color grade, slow gusts, and a soft
 * vignette. Each is a uniform-prop you can dial to zero.
 *
 * Texture uploads run at the video's framerate (requestVideoFrameCallback)
 * while drawing runs on rAF at display rate, so the shader motion stays
 * smooth on high-refresh screens. The canvas renders at half device
 * resolution: the footage is soft and low-res, so nothing visible is lost.
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

// The real shader work. The video is the base, and the shader layers what
// footage alone cannot do: crepuscular rays marched toward the sun with the
// video itself as the occluder (shafts shift as the foliage sways),
// independent sway per leaf region (parallax the flat video lacks), dust
// motes twinkling in the light, slow gusts that swell and calm, and a soft
// vignette keeping focus on the content column. Every uniform can be dialed
// to zero for a plain pass.
const FRAG = `
  precision mediump float;
  uniform sampler2D u_video;
  uniform vec2 u_res;
  uniform float u_time;
  uniform float u_sway;
  uniform float u_rays;
  uniform float u_gust;
  uniform float u_vignette;
  uniform float u_motes;
  uniform float u_lo;
  varying vec2 v_texCoord;

  /* Sun sits just off the top-left edge; shafts slant down-right. */
  const vec2 LIGHT_POS = vec2(0.10, 1.10);
  /* Warm sunlight in the gaps, cool sky ambient in the shadows — real
     foliage shadows are never neutral gray. */
  const vec3 RAY_TINT = vec3(1.0, 0.93, 0.78);
  const vec3 SHADE_TINT = vec3(0.94, 0.98, 1.06);

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

  /* Levels remap. The footage is low-contrast (soft grays, no true blacks)
     and multiply blending only ever darkens the page, so bright pixels are
     composited away to nothing. u_lo pulls real shadow depth out of the
     grays; every effect below needs those darks to be visible at all. */
  float lev(float x) {
    return clamp((x - u_lo) / (1.0 - u_lo), 0.0, 1.0);
  }

  void main() {
    vec2 uv = v_texCoord;
    vec2 asp = vec2(u_res.x / u_res.y, 1.0);
    float t = u_time;

    /* Sway: leaves at different depths drift on different phases, so the
       frame feels layered instead of one flat plate. Two octaves is enough
       for organic motion. */
    vec2 sway = vec2(
      noise(uv * asp * 3.0 + vec2(t * 0.24, t * 0.11)),
      noise(uv * asp * 3.0 + vec2(7.3 - t * 0.19, 2.1 + t * 0.13)));
    sway += 0.5 * vec2(
      noise(uv * asp * 6.5 + vec2(-t * 0.41, 3.7)),
      noise(uv * asp * 6.5 + vec2(1.9, t * 0.37)));
    uv = clamp(uv + (sway - 0.75) * (0.012 * u_sway), 0.0, 1.0);

    vec3 raw = texture2D(u_video, uv).rgb;
    vec3 col = vec3(lev(raw.r), lev(raw.g), lev(raw.b));

    /* Crepuscular rays: march from the pixel toward the sun, accumulating
       the footage's bright gaps with decay. The leaves themselves occlude
       the light, so the shafts move with the foliage. */
    float ray = 0.0;
    if (u_rays > 0.001) {
      vec2 uvA = uv * asp;
      vec2 toLight = LIGHT_POS * asp - uvA;
      float dist = length(toLight);
      vec2 stepA = toLight * (0.9 / 12.0);
      vec2 posA = uvA;
      float decay = 1.0;
      for (int i = 0; i < 12; i++) {
        posA += stepA;
        float g = lev(texture2D(u_video, clamp(posA / asp, 0.0, 1.0)).g);
        ray += smoothstep(0.55, 1.0, g) * decay;
        decay *= 0.85;
      }
      ray = ray / 12.0 * smoothstep(1.6, 0.3, dist) * u_rays;
    }

    /* Color grade: cool the shadows, warm the light that gets through. */
    float gap = smoothstep(0.5, 0.95, col.g);
    col *= mix(SHADE_TINT, vec3(1.0), gap);
    col += RAY_TINT * ray * 0.8;

    /* Dust motes: one drifting, twinkling speck per grid cell. Only shows
       where a shaft lands on darker foliage — bright specks over bright
       gaps are invisible under multiply blending anyway. */
    if (u_motes > 0.001) {
      vec2 g = uv * asp * 26.0;
      vec2 id = floor(g);
      vec2 f = fract(g);
      vec2 o = vec2(hash(id), hash(id + 17.31));
      o += 0.25 * vec2(
        sin(t * (0.25 + 0.3 * hash(id + 5.7)) + hash(id) * 6.2831),
        cos(t * (0.20 + 0.3 * hash(id + 9.1)) + hash(id + 3.3) * 6.2831));
      float mote = smoothstep(0.06, 0.0, length(f - o));
      mote *= 0.5 + 0.5 * sin(t * (0.6 + hash(id + 13.7)) + hash(id * 1.7) * 6.2831);
      float darkBehind = 1.0 - smoothstep(0.4, 0.9, col.g);
      col += RAY_TINT * mote * darkBehind * (0.25 + ray) * u_motes;
    }

    /* Gusts: a slow, incommensurate swell so the whole frame breathes. */
    float gust = 1.0 + u_gust * (0.5 * sin(t * 0.21) + 0.3 * sin(t * 0.077 + 1.3));
    col *= gust;

    /* Vignette: corners fall off softly toward the content column. */
    vec2 vc = (v_texCoord - 0.5) * asp;
    float vig = 1.0 - u_vignette * smoothstep(0.4, 1.1, length(vc));
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
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
  /** Whether the effect is visible. When false the canvas stays mounted
      (remounting would re-measure the viewport at a bad moment, e.g. while
      mobile browser chrome is still out) but the video pauses and the
      render loop stops. */
  enabled?: boolean;
  /** Horizontal anchor of the cover crop, 0 (left) to 1 (right), default
      0.5 (centered). Videos with foliage near the edges have an empty
      center, and portrait screens crop away most of the width — anchor the
      crop at the foliage so phones keep the leaves in frame. */
  focusX?: number;
  /** Vertical anchor of the cover crop, 0 (top) to 1 (bottom). */
  focusY?: number;
  /** Extra className merged onto the canvas element. */
  className?: string;
  /** How much the leaf regions sway independently (parallax). 0 = off. */
  sway?: number;
  /** Intensity of the light shafts marching from the sun through the
      foliage. 0 = off. */
  rays?: number;
  /** How strongly the gusts swell and calm the whole frame. 0 = off. */
  gust?: number;
  /** Soft darkening of the corners toward the content column. 0 = off. */
  vignette?: number;
  /** Dust motes twinkling where shafts land on darker foliage. 0 = off. */
  motes?: number;
  /** Shadow depth pulled from the footage's grays via a levels remap.
      Multiply blending only shows darkening and the raw footage has no
      true blacks, so without this everything above stays invisible.
      0 = passthrough, 1 = maximum crush. */
  contrast?: number;
}

export function LeafShadows({
  srcMp4,
  srcWebm,
  opacity = 0.2,
  opacityDark = 0.6,
  isDark = false,
  enabled = true,
  focusX = 0.5,
  focusY = 0.5,
  className = "",
  sway = 0.5,
  rays = 0.7,
  gust = 0.2,
  vignette = 0.35,
  motes = 0.4,
  contrast = 0.6,
}: LeafShadowsProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const enabledRef = React.useRef(enabled);

  /* The canvas never unmounts when the effect is toggled off: remounting
     re-measures the viewport at whatever moment the toggle happens (often
     while mobile browser chrome is still out), which leaves the cover crop
     composed for the wrong height. Pause and hide instead. */
  React.useEffect(() => {
    enabledRef.current = enabled;
    const canvas = canvasRef.current;
    if (canvas) canvas.style.visibility = enabled ? "" : "hidden";
    const video = videoRef.current;
    if (!video) return;
    if (enabled) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [enabled]);

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
    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    gl.uniform1f(gl.getUniformLocation(program, "u_sway"), sway);
    gl.uniform1f(gl.getUniformLocation(program, "u_rays"), rays);
    gl.uniform1f(gl.getUniformLocation(program, "u_gust"), gust);
    gl.uniform1f(gl.getUniformLocation(program, "u_vignette"), vignette);
    gl.uniform1f(gl.getUniformLocation(program, "u_motes"), motes);
    gl.uniform1f(gl.getUniformLocation(program, "u_lo"), 0.6 * contrast);

    const video = document.createElement("video");
    videoRef.current = video;
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
    let viewW = 0;
    let viewH = 0;

    /* Mobile browser chrome shrinks and grows the viewport during scroll.
       window.resize only fires when the chrome finishes animating (one big
       jump when momentum scrolling settles), so the viewport is polled
       every frame instead: visualViewport.height tracks the chrome's own
       animation, and the composition follows it smoothly. */
    const viewSize = () => {
      const vv = window.visualViewport;
      const h = vv && Math.abs(vv.scale - 1) < 0.01 ? vv.height : window.innerHeight;
      return { w: Math.round(window.innerWidth), h: Math.round(h) };
    };

    // Cover-fit crop math (same as CSS object-fit: cover with
    // object-position: focusX/focusY), keeps the video filling the viewport
    // without distortion at any aspect ratio. Runs once the video metadata
    // is available and on every viewport change — the first resize happens
    // before metadata loads, so this must not be skipped on size alone.
    const updateCrop = () => {
      if (!video.videoWidth || !video.videoHeight) return;
      const canvasAR = canvas.width / canvas.height;
      const videoAR = video.videoWidth / video.videoHeight;
      let u0 = 0, v0 = 0, u1 = 1, v1 = 1;
      if (videoAR > canvasAR) {
        const visible = canvasAR / videoAR;
        u0 = focusX * (1 - visible);
        u1 = u0 + visible;
      } else {
        const visible = videoAR / canvasAR;
        v0 = focusY * (1 - visible);
        v1 = v0 + visible;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([u0, v0, u1, v0, u0, v1, u1, v1]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);
    };

    const resize = () => {
      const { w, h } = viewSize();
      if (w === viewW && h === viewH) return;
      viewW = w;
      viewH = h;

      // The footage is soft and low-res, so rendering the canvas at half
      // device resolution loses nothing visible and halves the GPU cost of
      // the ray march.
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * 0.5;
      canvas.width = viewW * dpr;
      canvas.height = viewH * dpr;
      canvas.style.width = `${viewW}px`;
      canvas.style.height = `${viewH}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      updateCrop();
    };

    const start = performance.now();
    let frameDirty = false;

    // Texture uploads run at the video's framerate (rVFC), but drawing runs
    // on its own rAF loop at display rate, so the shader motion (sway, rays,
    // motes) stays butter-smooth on high-refresh screens even though the
    // footage itself is ~30fps.
    const drawLoop = () => {
      rafHandle = requestAnimationFrame(drawLoop);
      resize(); // cheap no-op unless the viewport changed since last frame
      if (video.paused || video.ended) return;
      if (ready && (frameDirty || !supportsRVFC)) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        frameDirty = false;
      }
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const supportsRVFC = "requestVideoFrameCallback" in HTMLVideoElement.prototype;
    let rafHandle: number | null = null;
    let rvfcHandle: number | null = null;

    const onVideoFrame = () => {
      frameDirty = true;
      rvfcHandle = video.requestVideoFrameCallback(onVideoFrame);
    };

    const startLoop = () => {
      if (!ready) return;
      if (rafHandle === null) rafHandle = requestAnimationFrame(drawLoop);
      if (supportsRVFC && rvfcHandle === null) {
        rvfcHandle = video.requestVideoFrameCallback(onVideoFrame);
      }
    };
    const stopLoop = () => {
      if (rafHandle !== null) {
        cancelAnimationFrame(rafHandle);
        rafHandle = null;
      }
      if (rvfcHandle !== null) {
        video.cancelVideoFrameCallback(rvfcHandle);
        rvfcHandle = null;
      }
    };

    video.addEventListener("playing", startLoop);
    video.addEventListener("pause", stopLoop);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPref = () => {
      if (!enabledRef.current || reduceMotion.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
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
      updateCrop();
      applyMotionPref();
    });

    /* The per-frame poll in the draw loop handles smooth tracking while the
       video plays; these listeners catch viewport changes while the loop is
       stopped (video paused, FX off, reduced motion). */
    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);
    resize();
    video.load();

    return () => {
      stopLoop();
      video.removeEventListener("playing", startLoop);
      video.removeEventListener("pause", stopLoop);
      reduceMotion.removeEventListener("change", applyMotionPref);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      video.pause();
      video.remove();
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(texBuf);
      gl.deleteTexture(texture);
    };
  }, [srcMp4, srcWebm, focusX, focusY, sway, rays, gust, vignette, motes, contrast]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-40 mix-blend-multiply transform-gpu ${className}`}
      style={{ opacity: isDark ? opacityDark : opacity }}
    />
  );
}
