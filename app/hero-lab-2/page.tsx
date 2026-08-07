"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

/* ──────────────────────────────────────────────
   HERO LAB 2 — test page, NOT linked anywhere.
   Concept #1: generative particle identity.
   ~7k GPU-cheap particles form the name, react to the
   cursor, and periodically dissolve + reform. Deep black,
   additive glow, Apple aesthetic. View at /hero-lab-2.
   ────────────────────────────────────────────── */

const NAME = "RAFAEL";
const ACCENTS = ["#ffffff", "#ffffff", "#ffffff", "#bcd4ff", "#5a9bff", "#8f7bff"];

type P = { x: number; y: number; vx: number; vy: number; hx: number; hy: number; c: string; s: number; ph: number };

export default function HeroLab2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let t0 = performance.now();
    let lastPulse = 0;
    let pulse = 0; // 0..1 dissolve amount

    const sampleTargets = () => {
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const o = off.getContext("2d");
      if (!o) return [] as { x: number; y: number }[];
      o.fillStyle = "#fff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      const fs = Math.min(W * 0.2, 240);
      o.font = `800 ${fs}px system-ui, -apple-system, "Inter", sans-serif`;
      o.fillText(NAME, W / 2, H / 2);
      const data = o.getImageData(0, 0, W, H).data;
      const gap = W < 768 ? 6 : Math.max(4, Math.round(fs / 52));
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] > 130) pts.push({ x, y });
        }
      }
      return pts;
    };

    const build = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pts = sampleTargets();
      particles = pts.map((p, i) => {
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.max(W, H) * (0.5 + Math.random() * 0.5);
        return {
          x: W / 2 + Math.cos(ang) * rad,
          y: H / 2 + Math.sin(ang) * rad,
          vx: 0, vy: 0,
          hx: p.x, hy: p.y,
          c: ACCENTS[i % ACCENTS.length],
          s: Math.random() < 0.12 ? 1.8 : 1.1,
          ph: Math.random() * Math.PI * 2,
        };
      });
      if (reduce) particles.forEach((p) => { p.x = p.hx; p.y = p.hy; });
    };

    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      // periodic dissolve/reform pulse (~every 9s)
      if (!reduce && now - lastPulse > 9000) { lastPulse = now; pulse = 1; }
      pulse *= 0.94;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.28)";
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // shimmer offset around home
        const sh = reduce ? 0 : Math.sin(t * 1.3 + p.ph) * 1.1;
        let tx = p.hx + Math.cos(p.ph) * sh;
        let ty = p.hy + Math.sin(p.ph) * sh;
        // dissolve: push toward an outward flow when pulsing
        if (pulse > 0.01) {
          const dx = p.hx - W / 2, dy = p.hy - H / 2;
          tx += dx * pulse * 0.6 + Math.cos(p.ph * 3 + t) * 40 * pulse;
          ty += dy * pulse * 0.6 + Math.sin(p.ph * 3 + t) * 40 * pulse;
        }
        // spring to target
        p.vx += (tx - p.x) * 0.02;
        p.vy += (ty - p.y) * 0.02;
        // mouse repulsion
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 14000) {
          const d = Math.sqrt(md2) || 1;
          const f = (1 - d / 118) * 5;
          p.vx += (mdx / d) * f;
          p.vy += (mdy / d) * f;
        }
        p.vx *= 0.86; p.vy *= 0.86;
        p.x += p.vx; p.y += p.vy;
        const a = 0.55 + 0.35 * Math.sin(t * 2 + p.ph);
        ctx.globalAlpha = 0.5 + a * 0.5;
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    build();
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
    raf = requestAnimationFrame(frame);
    const revealT = setTimeout(() => setReady(true), reduce ? 0 : 1500);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(build, 200); };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(revealT); clearTimeout(rt);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <main style={{ position: "relative", minHeight: "100svh", background: "#000", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />

      {/* test marker */}
      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 10, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Hero Lab 2 · particles
      </div>

      {/* overlay text — above and below the particle name */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "clamp(90px, 22vw, 250px)", pointerEvents: "none", zIndex: 3, padding: "0 1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#5a9bff", opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(-8px)", transition: "opacity 1s ease, transform 1s ease" }}>
          AI-First Product Design Lead · Working Globally
        </p>
        <div style={{ opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(10px)", transition: "opacity 1s ease .1s, transform 1s cubic-bezier(.16,1,.3,1) .1s", pointerEvents: "auto" }}>
          <p style={{ fontSize: "clamp(.95rem,1.3vw,1.15rem)", fontWeight: 300, color: "rgba(255,255,255,.62)", maxWidth: 540, margin: "0 auto 1.75rem", lineHeight: 1.7 }}>
            I design products that move the needle — now shipping them end-to-end with AI.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#work" className="btn-blue" style={{ fontSize: ".95rem", padding: ".85rem 2.25rem" }}>View case studies</Link>
            <Link href="/about" className="btn-white-ghost" style={{ fontSize: ".95rem", padding: ".85rem 2.25rem" }}>About me</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
