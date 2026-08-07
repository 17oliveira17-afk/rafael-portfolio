"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";

/* ──────────────────────────────────────────────
   HERO LAB 3 — test page, NOT linked anywhere.
   "Living spectrum": a Stripe-style WebGL mesh gradient
   built from the 5 case-study accent colors, flowing via
   fractal Brownian motion and warping toward the cursor.
   Colorful, connected, not dark. View at /hero-lab-3.
   ────────────────────────────────────────────── */

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<4;i++){ v += a*snoise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float asp = u_res.x / u_res.y;
  vec2 p = vec2(uv.x*asp, uv.y);
  float t = u_time * 0.045;

  vec2 m = vec2(u_mouse.x*asp, u_mouse.y);
  float md = distance(p, m);
  float mInf = 0.30 / (md*md + 0.22);

  vec2 q = vec2(fbm(p*1.1 + t), fbm(p*1.1 + vec2(3.1,1.7) - t));
  vec2 r = vec2(fbm(p*1.1 + q*1.7 + vec2(1.7,9.2) + t*0.7 + mInf),
                fbm(p*1.1 + q*1.7 + vec2(8.3,2.8) - t*0.6));
  float n = fbm(p*1.0 + r*1.5 + t*0.5);
  float f = clamp(n*0.5 + 0.5, 0.0, 1.0);
  float g2 = clamp(fbm(p*0.8 - t*0.4 + r)*0.5 + 0.5, 0.0, 1.0);

  vec3 c1 = vec3(0.918,0.702,0.031); // CVC yellow
  vec3 c2 = vec3(1.000,0.416,0.169); // Rappi orange
  vec3 c3 = vec3(0.925,0.420,0.525); // Leadership pink
  vec3 c4 = vec3(0.890,0.110,0.373); // MapleTrack rose
  vec3 c5 = vec3(0.000,0.784,0.627); // Design System teal

  vec3 col = mix(c1, c2, smoothstep(0.0, 0.34, f));
  col = mix(col, c3, smoothstep(0.30, 0.54, f));
  col = mix(col, c4, smoothstep(0.50, 0.74, f));
  col = mix(col, c5, smoothstep(0.72, 1.0, f));
  col += (g2 - 0.5) * 0.14;

  float vig = smoothstep(1.35, 0.25, distance(uv, vec2(0.5)));
  col *= 0.82 + 0.18 * vig;
  col = clamp(col, 0.0, 1.0);
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HeroLab3() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return; // CSS fallback gradient stays visible

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const scale = 0.6; // render at reduced res, CSS upscales (smooth gradient hides it)
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();

    let raf = 0;
    const t0 = performance.now();
    const render = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uTime, reduce ? 12.0 : (now - t0) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduce) raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    if (reduce) render(performance.now());

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1.0 - (e.clientY - r.top) / r.height;
    };
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(resize, 150); };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf); clearTimeout(rt);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <main style={{ position: "relative", minHeight: "100svh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(120deg,#eab308,#ff6a2b 28%,#ec6b86 52%,#e31c5f 74%,#00c8a0)" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />

      {/* soft legibility scrim — keeps color dominant */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(0,0,0,.22), transparent 72%)", pointerEvents: "none" }} />

      {/* test marker */}
      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 10, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", border: "1px solid rgba(255,255,255,.4)", borderRadius: 100, padding: ".3rem .7rem", backdropFilter: "blur(6px)" }}>
        Hero Lab 3 · living spectrum
      </div>

      {/* content */}
      <div className="page-in" style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 1.5rem", maxWidth: 1000 }}>
        <p style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#fff", marginBottom: "1.75rem", textShadow: "0 2px 20px rgba(0,0,0,.35)" }}>
          AI-First Product Design Lead · Working Globally
        </p>
        <h1 style={{ fontSize: "clamp(2.8rem,8vw,7rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 0.98, color: "#fff", marginBottom: "1.75rem", textShadow: "0 6px 40px rgba(0,0,0,.28)" }}>
          I design products<br /><span style={{ fontStyle: "italic", fontWeight: 500 }}>that move the needle.</span>
        </h1>
        <p style={{ fontSize: "clamp(1rem,1.4vw,1.2rem)", fontWeight: 400, lineHeight: 1.65, color: "rgba(255,255,255,.9)", maxWidth: 560, margin: "0 auto 2.5rem", textShadow: "0 2px 20px rgba(0,0,0,.3)" }}>
          8+ years turning complex fintech &amp; B2B systems into experiences that convert — now shipping them end-to-end with AI.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/#work" style={{ fontSize: ".95rem", fontWeight: 600, padding: ".9rem 2.4rem", borderRadius: 100, background: "#fff", color: "#111", textDecoration: "none", boxShadow: "0 10px 30px rgba(0,0,0,.25)" }}>
            View case studies →
          </Link>
          <Link href="/about" style={{ fontSize: ".95rem", fontWeight: 600, padding: ".9rem 2.4rem", borderRadius: 100, background: "rgba(255,255,255,.14)", color: "#fff", textDecoration: "none", border: "1px solid rgba(255,255,255,.5)", backdropFilter: "blur(10px)" }}>
            About me
          </Link>
        </div>
      </div>

      {/* scroll cue */}
      <div aria-hidden style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 3, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.7)" }}>
        Scroll
      </div>
    </main>
  );
}
