"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ──────────────────────────────────────────────
   HERO LAB — test page, NOT linked anywhere.
   Concept #1: the headline generates itself like an
   LLM writing it, over a subtle Apple-style backdrop.
   View at /hero-lab — the real home hero is untouched.
   ────────────────────────────────────────────── */

const PART1 = "I design products ";
const PART2 = "that move the needle.";
const FULL = PART1 + PART2;

export default function HeroLab() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(FULL.length); setDone(true); setShowRest(true); return; }

    let i = 0;
    let last = 0;
    let acc = 0;
    const STEP = 34; // ms per character — realistic LLM cadence

    const tick = (t: number) => {
      if (!last) last = t;
      acc += t - last;
      last = t;
      while (acc >= STEP && i < FULL.length) { i++; acc -= STEP; }
      setN(i);
      if (i < FULL.length) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => setShowRest(true), 220);
      }
    };

    const start = setTimeout(() => { raf.current = requestAnimationFrame(tick); }, 650);
    return () => { clearTimeout(start); cancelAnimationFrame(raf.current); };
  }, []);

  const shown1 = FULL.slice(0, Math.min(n, PART1.length));
  const shown2 = n > PART1.length ? FULL.slice(PART1.length, n) : "";
  const caretAttached = !done;

  return (
    <main style={{ position: "relative", minHeight: "100svh", background: "#000", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>

      {/* ── subtle generative backdrop ── */}
      <div className="aurora-a" aria-hidden />
      <div className="aurora-b" aria-hidden />
      <div className="grain" aria-hidden />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,.55) 100%)", pointerEvents: "none" }} />

      {/* ── test marker ── */}
      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 10, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Hero Lab · test
      </div>

      {/* ── content ── */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem", maxWidth: 1000 }}>
        <p className="eyebrow" style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "2rem" }}>
          AI-First Product Design Lead · Working Globally
        </p>

        <h1 style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)", fontWeight: 700, letterSpacing: "-.035em", lineHeight: 1.0, color: "#fff", marginBottom: "2rem", minHeight: "1.1em" }}>
          <span>{shown1}</span>
          <span style={{ background: "linear-gradient(90deg,#0071e3,#7aa8ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{shown2}</span>
          {caretAttached && <span className="caret" />}
        </h1>

        <p style={{ fontSize: "clamp(1rem,1.4vw,1.2rem)", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,.65)", maxWidth: 580, margin: "0 auto 3rem", opacity: showRest ? 1 : 0, transform: showRest ? "translateY(0)" : "translateY(12px)", transition: "opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)" }}>
          8+ years turning complex fintech and B2B systems into experiences that drive measurable conversion, activation, and retention — now shipping production-grade products end-to-end with AI.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", opacity: showRest ? 1 : 0, transform: showRest ? "translateY(0)" : "translateY(12px)", transition: "opacity .8s ease .1s, transform .8s cubic-bezier(.16,1,.3,1) .1s" }}>
          <Link href="/#work" className="btn-blue" style={{ fontSize: ".95rem", padding: ".85rem 2.25rem" }}>View case studies</Link>
          <Link href="/about" className="btn-white-ghost" style={{ fontSize: ".95rem", padding: ".85rem 2.25rem" }}>About me</Link>
        </div>
      </div>

      <style jsx>{`
        .caret {
          display: inline-block;
          width: .06em;
          height: .92em;
          margin-left: .06em;
          background: #7aa8ff;
          border-radius: 2px;
          transform: translateY(.08em);
          animation: blink 1s steps(2, start) infinite;
          box-shadow: 0 0 14px rgba(122,168,255,.8);
        }
        @keyframes blink { to { opacity: 0; } }

        .aurora-a, .aurora-b {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          opacity: .55;
          will-change: transform;
        }
        .aurora-a {
          width: 60vw; height: 60vw;
          left: 8%; top: 6%;
          background: radial-gradient(circle, rgba(0,113,227,.35), transparent 62%);
          animation: driftA 22s ease-in-out infinite alternate;
        }
        .aurora-b {
          width: 55vw; height: 55vw;
          right: 6%; bottom: 4%;
          background: radial-gradient(circle, rgba(90,70,220,.30), transparent 62%);
          animation: driftB 26s ease-in-out infinite alternate;
        }
        @keyframes driftA {
          from { transform: translate3d(0,0,0) scale(1); }
          to   { transform: translate3d(6vw,4vh,0) scale(1.12); }
        }
        @keyframes driftB {
          from { transform: translate3d(0,0,0) scale(1.05); }
          to   { transform: translate3d(-5vw,-4vh,0) scale(.92); }
        }
        .grain {
          position: absolute; inset: 0; pointer-events: none; opacity: .04;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        @media (prefers-reduced-motion: reduce) {
          .caret, .aurora-a, .aurora-b { animation: none; }
        }
      `}</style>
    </main>
  );
}
