"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

/* HERO LAB 9 — fullscreen cinematic video hero.
   The 5 case videos fill the whole screen and crossfade,
   with the accent colour, case name and metric following
   along. Test route, not linked. */

const CASES = [
  { name: "CVC Flights", c: "#eab308", m: "2.0★ → 4.6★ · +212% checkout", v: "/videos/cvc-airport.mp4", href: "/work/cvc" },
  { name: "Rappi Onboarding", c: "#ff6a2b", m: "2 weeks → 2 days to open a store", v: "/videos/rappi-kitchen.mp4", href: "/work/rappi" },
  { name: "Design Systems", c: "#00c8a0", m: "From zero to scale, twice", v: "/videos/ds-components.mp4", href: "/work/design-system" },
  { name: "Design Leadership", c: "#ec6b86", m: "8-week delivery cycle → 3 weeks", v: "/videos/leadership-workshop.mp4", href: "/work/leadership" },
  { name: "MapleTrack", c: "#e31c5f", m: "0 → 1 SaaS, shipped solo with AI", v: "/videos/maple-immigration.mp4", href: "/work/maple-track" },
];
const DUR = 6000;

export default function HeroLab9() {
  const [on, setOn] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    setOn(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI((p) => (p + 1) % CASES.length), DUR);
    return () => clearInterval(id);
  }, []);

  const cur = CASES[i];

  return (
    <main style={{ position: "relative", minHeight: "100svh", background: "#000", overflow: "hidden", color: "#fff" }}>
      {/* fullscreen video stack */}
      {CASES.map((c, k) => (
        <video key={c.name} src={c.v} autoPlay loop muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: k === i ? 1 : 0, transform: k === i ? "scale(1.04)" : "scale(1.12)", transition: "opacity 1.4s ease, transform 7s ease-out" }} />
      ))}

      {/* legibility scrims */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.55) 38%, rgba(0,0,0,.35) 65%, rgba(0,0,0,.6) 100%)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${cur.c}22, transparent 70%)`, transition: "background 1.4s ease", pointerEvents: "none" }} />

      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 10, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Hero Lab 9 · fullscreen
      </div>

      {/* centre statement */}
      <div style={{ position: "relative", zIndex: 3, minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "6rem 1.5rem 12rem" }}>
        <p className={`rise ${on ? "in" : ""}`} style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", marginBottom: "1.75rem" }}>
          AI-First Product Design Lead · Working Globally
        </p>
        <h1 style={{ fontSize: "clamp(2.6rem,7.5vw,6.5rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: .99, marginBottom: "1.5rem", textShadow: "0 6px 44px rgba(0,0,0,.5)", maxWidth: 1050 }}>
          {["I", "design", "products"].map((w, k) => <span key={k} className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: `${160 + k * 70}ms`, display: "inline-block", marginRight: ".22em" }}>{w}</span>)}
          <br />
          <span className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "400ms", display: "inline-block", fontStyle: "italic", fontWeight: 500, color: cur.c, transition: "color 1.2s ease, opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)" }}>
            that move the needle.
          </span>
        </h1>
        <p className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "540ms", fontSize: "clamp(.98rem,1.3vw,1.15rem)", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,.78)", maxWidth: 560, marginBottom: "2.25rem", textShadow: "0 2px 24px rgba(0,0,0,.5)" }}>
          8+ years turning complex fintech &amp; B2B systems into experiences that convert — now shipping them end-to-end with AI.
        </p>
        <div className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "640ms", display: "flex", gap: ".8rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/#work" className="cta-a">View case studies →</Link>
          <Link href="/about" className="cta-b">About me</Link>
        </div>
      </div>

      {/* bottom rail — what you're watching */}
      <div className={`rail rise ${on ? "in" : ""}`} style={{ transitionDelay: "800ms" }}>
        <div className="rail-in">
          <Link href={cur.href} className="now">
            <span style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: cur.c, transition: "color 1.2s ease" }}>Now showing</span>
            <span style={{ fontSize: "1.02rem", fontWeight: 700, letterSpacing: "-.02em" }}>{cur.name}</span>
            <span style={{ fontSize: ".8rem", color: "rgba(255,255,255,.6)" }}>{cur.m}</span>
          </Link>
          <div className="ticks">
            {CASES.map((c, k) => (
              <button key={c.name} onClick={() => setI(k)} className="tick" aria-label={c.name}>
                <span className="tfill" style={{ background: c.c, animation: k === i ? `grow ${DUR}ms linear forwards` : "none", transform: k === i ? undefined : "scaleX(0)" }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .rise { opacity: 0; transform: translateY(26px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .rise.in { opacity: 1; transform: translateY(0); }
        .cta-a, .cta-b { font-size: .93rem; font-weight: 600; padding: .85rem 2.1rem; border-radius: 100px; text-decoration: none; display: inline-block; transition: transform .35s cubic-bezier(.16,1,.3,1), background .3s ease; }
        .cta-a { background: #fff; color: #111; box-shadow: 0 12px 36px rgba(0,0,0,.35); }
        .cta-a:hover { transform: translateY(-3px); }
        .cta-b { background: rgba(255,255,255,.12); color: #fff; border: 1px solid rgba(255,255,255,.4); backdrop-filter: blur(10px); }
        .cta-b:hover { transform: translateY(-3px); background: rgba(255,255,255,.2); }
        .rail { position: absolute; left: 0; right: 0; bottom: 0; z-index: 4; padding: 0 clamp(1.25rem,4vw,3rem) clamp(1.5rem,3vw,2.25rem); }
        .rail-in { display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,.16); padding-top: 1rem; }
        .now { display: flex; flex-direction: column; gap: .15rem; text-decoration: none; color: #fff; transition: opacity .3s ease; }
        .now:hover { opacity: .75; }
        .ticks { display: flex; gap: .5rem; }
        .tick { width: 54px; height: 3px; border-radius: 3px; background: rgba(255,255,255,.22); border: none; padding: 0; cursor: pointer; overflow: hidden; }
        .tfill { display: block; width: 100%; height: 100%; transform-origin: left; transform: scaleX(0); }
        @keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @media (prefers-reduced-motion: reduce) { .rise { transition: none; opacity: 1; transform: none; } .tfill { animation: none !important; } }
      `}</style>
    </main>
  );
}
