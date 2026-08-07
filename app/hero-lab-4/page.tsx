"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";

/* ──────────────────────────────────────────────
   HERO LAB 4 — test page, NOT linked anywhere.
   "Living spectrum, scrolled": one persistent WebGL mesh
   gradient behind the whole page that morphs toward each
   project's accent color as you scroll, with content
   panels revealing in smooth parallax. View at /hero-lab-4.
   ────────────────────────────────────────────── */

const PROJECTS = [
  { n: "01", name: "CVC Flights", tag: "Brazil's biggest travel app — 2.0★ to 4.6★, +212% checkout.", href: "/work/cvc", rgb: [0.918, 0.702, 0.031] },
  { n: "02", name: "Rappi Onboarding", tag: "Merchant onboarding across 9 markets — 2 weeks to 2 days.", href: "/work/rappi", rgb: [1.0, 0.416, 0.169] },
  { n: "03", name: "Design Systems", tag: "From zero to scale — one atom seeding a whole system.", href: "/work/design-system", rgb: [0.0, 0.784, 0.627] },
  { n: "04", name: "Design Leadership", tag: "A fractured team, restructured — 8-week cycle down to 3.", href: "/work/leadership", rgb: [0.925, 0.42, 0.525] },
  { n: "05", name: "MapleTrack", tag: "A 0→1 immigration SaaS, designed + shipped solo with AI.", href: "/work/maple-track", rgb: [0.89, 0.11, 0.373] },
];

const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
uniform vec3 u_accent; uniform float u_focus;
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0; vec3 h=abs(x)-0.5; vec3 ox=floor(x+0.5); vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<4;i++){ v+=a*snoise(p); p*=2.0; a*=0.5; } return v; }
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy; float asp=u_res.x/u_res.y;
  vec2 p=vec2(uv.x*asp,uv.y)+u_focus*0.5;
  float t=u_time*0.045;
  vec2 m=vec2(u_mouse.x*asp,u_mouse.y); float md=distance(p,m); float mInf=0.30/(md*md+0.22);
  vec2 q=vec2(fbm(p*1.1+t),fbm(p*1.1+vec2(3.1,1.7)-t));
  vec2 r=vec2(fbm(p*1.1+q*1.7+vec2(1.7,9.2)+t*0.7+mInf),fbm(p*1.1+q*1.7+vec2(8.3,2.8)-t*0.6));
  float n=fbm(p*1.0+r*1.5+t*0.5); float f=clamp(n*0.5+0.5,0.0,1.0);
  float g2=clamp(fbm(p*0.8-t*0.4+r)*0.5+0.5,0.0,1.0);
  vec3 c1=vec3(0.918,0.702,0.031), c2=vec3(1.0,0.416,0.169), c3=vec3(0.925,0.42,0.525), c4=vec3(0.89,0.11,0.373), c5=vec3(0.0,0.784,0.627);
  vec3 col=mix(c1,c2,smoothstep(0.0,0.34,f));
  col=mix(col,c3,smoothstep(0.30,0.54,f));
  col=mix(col,c4,smoothstep(0.50,0.74,f));
  col=mix(col,c5,smoothstep(0.72,1.0,f));
  col+=(g2-0.5)*0.14;
  // bias the whole field toward the current section accent (keeps the flow)
  col=mix(col, col*0.5 + u_accent*0.85, 0.4);
  float vig=smoothstep(1.35,0.25,distance(uv,vec2(0.5)));
  col*=0.82+0.18*vig;
  gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);
}`;

export default function HeroLab4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const accent = useRef<[number, number, number]>([0.55, 0.4, 0.5]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (ty: number, src: string) => {
      const s = gl.createShader(ty)!; gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!; gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res"), uTime = gl.getUniformLocation(prog, "u_time"), uMouse = gl.getUniformLocation(prog, "u_mouse"), uAccent = gl.getUniformLocation(prog, "u_accent"), uFocus = gl.getUniformLocation(prog, "u_focus");

    const scale = 0.6;
    const mouse = { x: .5, y: .5, tx: .5, ty: .5 };
    const cur: [number, number, number] = [0.55, 0.4, 0.5];
    let focus = 0;

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale)), h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(uRes, w, h);
    };
    resize();

    let raf = 0; const t0 = performance.now();
    const render = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
      const [ar, ag, ab] = accent.current;
      cur[0] += (ar - cur[0]) * .04; cur[1] += (ag - cur[1]) * .04; cur[2] += (ab - cur[2]) * .04;
      focus += ((window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) - focus) * .05;
      gl.uniform1f(uTime, reduce ? 12 : (now - t0) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform3f(uAccent, cur[0], cur[1], cur[2]);
      gl.uniform1f(uFocus, focus);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.tx = (e.clientX - r.left) / r.width; mouse.ty = 1 - (e.clientY - r.top) / r.height; };
    let rt: ReturnType<typeof setTimeout>; const onResize = () => { clearTimeout(rt); rt = setTimeout(resize, 150); };
    window.addEventListener("pointermove", onMove); window.addEventListener("resize", onResize);

    // scroll-driven content reveals + accent selection
    const onScroll = () => {
      const vh = window.innerHeight; let best = Infinity, bi = 0;
      panelsRef.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect(); const center = r.top + r.height / 2; const dist = (center - vh / 2) / vh;
        const k = Math.max(0, 1 - Math.abs(dist) * 1.35);
        el.style.opacity = String(0.15 + 0.85 * k);
        el.style.transform = `translateY(${dist * 40}px) scale(${0.96 + 0.04 * k})`;
        const ad = Math.abs(center - vh / 2);
        if (ad < best) { best = ad; bi = i; }
      });
      accent.current = PROJECTS[bi].rgb as [number, number, number];
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf); clearTimeout(rt);
      window.removeEventListener("pointermove", onMove); window.removeEventListener("resize", onResize); window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const hex = (rgb: number[]) => `rgb(${rgb.map((v) => Math.round(v * 255)).join(",")})`;

  return (
    <main style={{ position: "relative", background: "linear-gradient(120deg,#eab308,#ff6a2b 28%,#ec6b86 52%,#e31c5f 74%,#00c8a0)" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", display: "block", zIndex: 0 }} />
      <div aria-hidden style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(0,0,0,.20), transparent 72%)", pointerEvents: "none", zIndex: 1 }} />

      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 10, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.85)", border: "1px solid rgba(255,255,255,.4)", borderRadius: 100, padding: ".3rem .7rem", backdropFilter: "blur(6px)" }}>
        Hero Lab 4 · scroll spectrum
      </div>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 3, minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 1.5rem" }}>
        <p className="page-in" style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#fff", marginBottom: "1.75rem", textShadow: "0 2px 20px rgba(0,0,0,.35)" }}>
          AI-First Product Design Lead · Working Globally
        </p>
        <h1 className="page-in" style={{ fontSize: "clamp(2.8rem,8vw,7rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: .98, color: "#fff", marginBottom: "1.75rem", textShadow: "0 6px 40px rgba(0,0,0,.28)", maxWidth: 1000 }}>
          I design products<br /><span style={{ fontStyle: "italic", fontWeight: 500 }}>that move the needle.</span>
        </h1>
        <p className="page-in" style={{ fontSize: "clamp(1rem,1.4vw,1.2rem)", color: "rgba(255,255,255,.9)", maxWidth: 540, margin: "0 auto 2.5rem", lineHeight: 1.65, textShadow: "0 2px 20px rgba(0,0,0,.3)" }}>
          8+ years turning complex fintech &amp; B2B systems into experiences that convert — now shipping them end-to-end with AI.
        </p>
        <div style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.75)" }}>Scroll to explore ↓</div>
      </section>

      {/* PROJECT PANELS */}
      {PROJECTS.map((p, i) => (
        <section key={p.n} style={{ position: "relative", zIndex: 3, minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1.5rem" }}>
          <div ref={(el) => { panelsRef.current[i] = el; }} style={{ maxWidth: 760, textAlign: "center", willChange: "transform, opacity", transition: "none" }}>
            <p style={{ fontSize: "clamp(4rem,14vw,10rem)", fontWeight: 800, lineHeight: .9, color: "rgba(255,255,255,.22)", letterSpacing: "-.04em", marginBottom: "-.5rem" }}>{p.n}</p>
            <h2 style={{ fontSize: "clamp(2rem,5.5vw,4rem)", fontWeight: 800, color: "#fff", letterSpacing: "-.03em", marginBottom: "1rem", textShadow: "0 4px 30px rgba(0,0,0,.3)" }}>{p.name}</h2>
            <div style={{ width: 60, height: 4, borderRadius: 4, background: "#fff", margin: "0 auto 1.5rem", opacity: .9 }} />
            <p style={{ fontSize: "clamp(1.05rem,1.6vw,1.35rem)", color: "rgba(255,255,255,.92)", maxWidth: 520, margin: "0 auto 2.25rem", lineHeight: 1.6, textShadow: "0 2px 18px rgba(0,0,0,.3)" }}>{p.tag}</p>
            <Link href={p.href} style={{ display: "inline-block", fontSize: ".95rem", fontWeight: 600, padding: ".85rem 2.25rem", borderRadius: 100, background: "#fff", color: hex(p.rgb), textDecoration: "none", boxShadow: "0 12px 34px rgba(0,0,0,.25)" }}>
              Explore case →
            </Link>
          </div>
        </section>
      ))}

      {/* CLOSING */}
      <section style={{ position: "relative", zIndex: 3, minHeight: "70svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 1.5rem" }}>
        <h2 style={{ fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-.03em", marginBottom: "2rem", textShadow: "0 6px 40px rgba(0,0,0,.3)" }}>Let&apos;s build something.</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/contact" style={{ fontSize: ".95rem", fontWeight: 600, padding: ".9rem 2.4rem", borderRadius: 100, background: "#fff", color: "#111", textDecoration: "none", boxShadow: "0 12px 34px rgba(0,0,0,.25)" }}>Get in touch →</Link>
          <Link href="/about" style={{ fontSize: ".95rem", fontWeight: 600, padding: ".9rem 2.4rem", borderRadius: 100, background: "rgba(255,255,255,.14)", color: "#fff", textDecoration: "none", border: "1px solid rgba(255,255,255,.5)", backdropFilter: "blur(10px)" }}>About me</Link>
        </div>
      </section>
    </main>
  );
}
