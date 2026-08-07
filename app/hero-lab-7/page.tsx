"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

/* HERO LAB 7 — light editorial. Off-white, Swiss grid,
   oversized type, colorful accents, marquee. Test route. */

const CASES = [
  { name: "CVC Flights", c: "#eab308", m: "2.0★ → 4.6★", href: "/work/cvc" },
  { name: "Rappi", c: "#ff6a2b", m: "+53% conversion", href: "/work/rappi" },
  { name: "Design Systems", c: "#00c8a0", m: "0 → 1", href: "/work/design-system" },
  { name: "Leadership", c: "#ec6b86", m: "8w → 3w", href: "/work/leadership" },
  { name: "MapleTrack", c: "#e31c5f", m: "Solo, with AI", href: "/work/maple-track" },
];

export default function HeroLab7() {
  const [on, setOn] = useState(false);
  useEffect(() => { setOn(true); }, []);

  return (
    <main style={{ position: "relative", minHeight: "100svh", background: "#f4f2ee", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", color: "#111" }}>
      <div className="tint t1" aria-hidden />
      <div className="tint t2" aria-hidden />

      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 10, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(0,0,0,.45)", border: "1px solid rgba(0,0,0,.18)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Hero Lab 7 · editorial
      </div>

      <div style={{ position: "relative", zIndex: 3, padding: "0 clamp(1.5rem,5vw,5rem)", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid rgba(0,0,0,.14)", paddingBottom: "1rem", marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
          <p className={`rise ${on ? "in" : ""}`} style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase" }}>Rafael Guimarães</p>
          <p className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "60ms", fontSize: ".7rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(0,0,0,.5)" }}>AI-First Product Design Lead · Working Globally</p>
        </div>

        <h1 style={{ fontSize: "clamp(2.6rem,9vw,8rem)", fontWeight: 800, letterSpacing: "-.05em", lineHeight: .92, marginBottom: "clamp(1.5rem,3vw,2.5rem)", maxWidth: 1300 }}>
          {["I", "design", "products"].map((w, i) => <span key={i} className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: `${150 + i * 70}ms`, display: "inline-block", marginRight: ".2em" }}>{w}</span>)}
          <br />
          {["that", "move"].map((w, i) => <span key={i} className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: `${360 + i * 70}ms`, display: "inline-block", marginRight: ".2em" }}>{w}</span>)}
          <span className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "500ms", display: "inline-block", fontStyle: "italic", fontWeight: 500, backgroundImage: "linear-gradient(100deg,#eab308,#ff6a2b 30%,#e31c5f 62%,#00c8a0)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>the&nbsp;needle.</span>
        </h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap" }}>
          <p className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "640ms", fontSize: "clamp(.95rem,1.25vw,1.1rem)", lineHeight: 1.65, color: "rgba(0,0,0,.62)", maxWidth: 460 }}>
            8+ years turning complex fintech &amp; B2B systems into experiences that convert — now shipping them end-to-end with AI.
          </p>
          <div className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "720ms", display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
            <Link href="/#work" className="cta-a">View case studies →</Link>
            <Link href="/about" className="cta-b">About me</Link>
          </div>
        </div>
      </div>

      {/* marquee of cases */}
      <div className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "860ms", position: "relative", zIndex: 3, marginTop: "clamp(3rem,7vw,5rem)", borderTop: "1px solid rgba(0,0,0,.14)", paddingTop: "1.25rem", overflow: "hidden" }}>
        <div className="track">
          {[...CASES, ...CASES].map((c, i) => (
            <Link key={i} href={c.href} className="item">
              <span className="sq" style={{ background: c.c }} />
              <span style={{ fontWeight: 600 }}>{c.name}</span>
              <span style={{ color: "rgba(0,0,0,.42)" }}>{c.m}</span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .rise { opacity: 0; transform: translateY(24px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .rise.in { opacity: 1; transform: translateY(0); }
        .tint { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
        .t1 { width: 45vw; height: 45vw; background: #ff6a2b; opacity: .16; right: -8%; top: -12%; animation: dd1 28s ease-in-out infinite alternate; }
        .t2 { width: 40vw; height: 40vw; background: #00c8a0; opacity: .14; left: -6%; bottom: -14%; animation: dd2 32s ease-in-out infinite alternate; }
        @keyframes dd1 { to { transform: translate3d(-8vw,8vh,0) scale(1.12); } }
        @keyframes dd2 { to { transform: translate3d(7vw,-6vh,0) scale(1.1); } }
        .cta-a, .cta-b { font-size: .9rem; font-weight: 600; padding: .8rem 1.9rem; border-radius: 100px; text-decoration: none; display: inline-block; transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, background .3s ease; }
        .cta-a { background: #111; color: #fff; }
        .cta-a:hover { transform: translateY(-3px); box-shadow: 0 14px 34px rgba(0,0,0,.2); }
        .cta-b { background: transparent; color: #111; border: 1px solid rgba(0,0,0,.25); }
        .cta-b:hover { transform: translateY(-3px); background: rgba(0,0,0,.05); }
        .track { display: flex; gap: 2.5rem; width: max-content; animation: mq 34s linear infinite; }
        .track:hover { animation-play-state: paused; }
        @keyframes mq { to { transform: translateX(-50%); } }
        .item { display: inline-flex; align-items: center; gap: .6rem; font-size: .82rem; text-decoration: none; color: #111; white-space: nowrap; transition: opacity .3s ease; }
        .item:hover { opacity: .55; }
        .sq { width: 9px; height: 9px; border-radius: 2px; display: inline-block; }
        @media (prefers-reduced-motion: reduce) { .tint, .track { animation: none; } .rise { transition: none; opacity: 1; transform: none; } }
      `}</style>
    </main>
  );
}
