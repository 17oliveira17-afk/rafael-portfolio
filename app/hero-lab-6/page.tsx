"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

/* HERO LAB 6 — full brand-blue monochrome. Bold, confident,
   one color owning the screen. Test route, not linked. */

const CASES = [
  { name: "CVC Flights", href: "/work/cvc" },
  { name: "Rappi", href: "/work/rappi" },
  { name: "Design Systems", href: "/work/design-system" },
  { name: "Leadership", href: "/work/leadership" },
  { name: "MapleTrack", href: "/work/maple-track" },
];

export default function HeroLab6() {
  const [on, setOn] = useState(false);
  useEffect(() => { setOn(true); }, []);
  const w1 = ["I", "design", "products"];
  const w2 = ["that", "move", "the", "needle."];

  return (
    <main style={{ position: "relative", minHeight: "100svh", background: "#0071e3", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="wash a" aria-hidden />
      <div className="wash b" aria-hidden />
      <div className="wash c" aria-hidden />
      <div className="grain" aria-hidden />

      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 10, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.3)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Hero Lab 6 · brand blue
      </div>

      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 1.5rem", maxWidth: 1100 }}>
        <p className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "80ms", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", marginBottom: "2rem" }}>
          AI-First Product Design Lead · Working Globally
        </p>

        <h1 style={{ fontSize: "clamp(2.7rem,8vw,7rem)", fontWeight: 800, letterSpacing: "-.045em", lineHeight: .98, color: "#fff", marginBottom: "2rem" }}>
          <span style={{ display: "block" }}>
            {w1.map((w, i) => <span key={i} className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: `${180 + i * 70}ms`, display: "inline-block", marginRight: ".22em" }}>{w}</span>)}
          </span>
          <span style={{ display: "block" }}>
            {w2.map((w, i) => <span key={i} className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: `${390 + i * 70}ms`, display: "inline-block", marginRight: ".22em", fontStyle: i > 0 ? "italic" : "normal", fontWeight: i > 0 ? 500 : 800, opacity: i > 0 ? .92 : 1 }}>{w}</span>)}
          </span>
        </h1>

        <p className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "700ms", fontSize: "clamp(1rem,1.35vw,1.18rem)", fontWeight: 400, lineHeight: 1.7, color: "rgba(255,255,255,.85)", maxWidth: 560, margin: "0 auto 2.5rem" }}>
          8+ years turning complex fintech &amp; B2B systems into experiences that convert — now shipping them end-to-end with AI.
        </p>

        <div className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "800ms", display: "flex", gap: ".85rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          <Link href="/#work" className="cta-a">View case studies →</Link>
          <Link href="/about" className="cta-b">About me</Link>
        </div>

        <div className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "900ms", display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
          {CASES.map((c) => <Link key={c.name} href={c.href} className="chip">{c.name}</Link>)}
        </div>
      </div>

      <style jsx>{`
        .rise { opacity: 0; transform: translateY(26px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .rise.in { opacity: 1; transform: translateY(0); }
        .wash { position: absolute; border-radius: 50%; filter: blur(110px); pointer-events: none; will-change: transform; }
        .a { width: 60vw; height: 60vw; background: #4aa8ff; opacity: .55; left: -10%; top: -14%; animation: d1 26s ease-in-out infinite alternate; }
        .b { width: 55vw; height: 55vw; background: #0047b3; opacity: .6; right: -8%; bottom: -14%; animation: d2 30s ease-in-out infinite alternate; }
        .c { width: 45vw; height: 45vw; background: #7b5cff; opacity: .35; right: 18%; top: 8%; animation: d3 34s ease-in-out infinite alternate; }
        @keyframes d1 { to { transform: translate3d(10vw,8vh,0) scale(1.15); } }
        @keyframes d2 { to { transform: translate3d(-8vw,-8vh,0) scale(1.1); } }
        @keyframes d3 { to { transform: translate3d(-6vw,10vh,0) scale(.88); } }
        .grain { position: absolute; inset: 0; pointer-events: none; opacity: .06; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        .cta-a, .cta-b { font-size: .93rem; font-weight: 600; padding: .85rem 2rem; border-radius: 100px; text-decoration: none; display: inline-block; transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, background .3s ease; }
        .cta-a { background: #fff; color: #0071e3; box-shadow: 0 10px 34px rgba(0,0,0,.18); }
        .cta-a:hover { transform: translateY(-3px); box-shadow: 0 16px 44px rgba(0,0,0,.26); }
        .cta-b { background: rgba(255,255,255,.14); color: #fff; border: 1px solid rgba(255,255,255,.45); backdrop-filter: blur(10px); }
        .cta-b:hover { transform: translateY(-3px); background: rgba(255,255,255,.22); }
        .chip { font-size: .76rem; font-weight: 500; color: rgba(255,255,255,.8); text-decoration: none; padding: .45rem 1rem; border-radius: 100px; border: 1px solid rgba(255,255,255,.28); transition: transform .35s cubic-bezier(.16,1,.3,1), background .3s ease, color .3s ease; }
        .chip:hover { transform: translateY(-3px); background: #fff; color: #0071e3; }
        @media (prefers-reduced-motion: reduce) { .wash { animation: none; } .rise { transition: none; opacity: 1; transform: none; } }
      `}</style>
    </main>
  );
}
