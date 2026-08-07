"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

/* HERO LAB 10 — fullscreen video seen THROUGH giant type.
   A black layer in multiply blend mode punches the headline
   out of the darkness, so the case footage plays inside the
   letters. Test route, not linked. */

const CASES = [
  { name: "CVC Flights", c: "#eab308", m: "2.0★ → 4.6★ · +212% checkout", v: "/videos/cvc-airport.mp4", href: "/work/cvc" },
  { name: "Rappi Onboarding", c: "#ff6a2b", m: "2 weeks → 2 days to open a store", v: "/videos/rappi-kitchen.mp4", href: "/work/rappi" },
  { name: "Design Systems", c: "#00c8a0", m: "From zero to scale, twice", v: "/videos/ds-components.mp4", href: "/work/design-system" },
  { name: "Design Leadership", c: "#ec6b86", m: "8-week cycle → 3 weeks", v: "/videos/leadership-workshop.mp4", href: "/work/leadership" },
  { name: "MapleTrack", c: "#e31c5f", m: "0 → 1 SaaS, shipped solo with AI", v: "/videos/maple-immigration.mp4", href: "/work/maple-track" },
];
const DUR = 6000;

export default function HeroLab10() {
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
      {/* video stack */}
      {CASES.map((c, k) => (
        <video key={c.name} src={c.v} autoPlay loop muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: k === i ? 1 : 0, transform: k === i ? "scale(1.05)" : "scale(1.14)", transition: "opacity 1.4s ease, transform 7s ease-out" }} />
      ))}

      {/* MULTIPLY MASK — white type lets the video through, black hides it */}
      <div className="mask" aria-hidden>
        <h1 className={`giant ${on ? "in" : ""}`}>
          I DESIGN<br />PRODUCTS<br />THAT MOVE<br />THE NEEDLE
        </h1>
      </div>

      {/* accessible copy of the headline for screen readers */}
      <h1 className="sr">I design products that move the needle.</h1>

      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 10, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Hero Lab 10 · type mask
      </div>

      {/* top eyebrow */}
      <p className={`rise ${on ? "in" : ""}`} style={{ position: "absolute", top: "clamp(6.5rem,12vh,9rem)", left: 0, right: 0, zIndex: 5, textAlign: "center", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.7)" }}>
        AI-First Product Design Lead · Working Globally
      </p>

      {/* bottom rail */}
      <div className={`rail rise ${on ? "in" : ""}`} style={{ transitionDelay: "500ms" }}>
        <div className="rail-in">
          <Link href={cur.href} className="now">
            <span style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: cur.c, transition: "color 1.2s ease" }}>Now showing</span>
            <span style={{ fontSize: "1.02rem", fontWeight: 700, letterSpacing: "-.02em" }}>{cur.name}</span>
            <span style={{ fontSize: ".8rem", color: "rgba(255,255,255,.6)" }}>{cur.m}</span>
          </Link>
          <div style={{ display: "flex", gap: ".8rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/#work" className="cta-a">View case studies →</Link>
            <div className="ticks">
              {CASES.map((c, k) => (
                <button key={c.name} onClick={() => setI(k)} className="tick" aria-label={c.name}>
                  <span className="tfill" style={{ background: c.c, animation: k === i ? `grow ${DUR}ms linear forwards` : "none", transform: k === i ? undefined : "scaleX(0)" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask { position: absolute; inset: 0; z-index: 2; background: #000; mix-blend-mode: multiply; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .giant { margin: 0; color: #fff; font-weight: 900; text-align: center; letter-spacing: -.045em; line-height: .88;
          font-size: clamp(2.6rem, 11.5vw, 11rem); opacity: 0; transform: scale(1.06); transition: opacity 1.2s cubic-bezier(.16,1,.3,1), transform 1.4s cubic-bezier(.16,1,.3,1); }
        .giant.in { opacity: 1; transform: scale(1); }
        .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        .rise { opacity: 0; transform: translateY(24px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .rise.in { opacity: 1; transform: translateY(0); }
        .rail { position: absolute; left: 0; right: 0; bottom: 0; z-index: 5; padding: 0 clamp(1.25rem,4vw,3rem) clamp(1.5rem,3vw,2.25rem);
          background: linear-gradient(to top, rgba(0,0,0,.85), transparent); }
        .rail-in { display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,.16); padding-top: 1rem; }
        .now { display: flex; flex-direction: column; gap: .15rem; text-decoration: none; color: #fff; transition: opacity .3s ease; }
        .now:hover { opacity: .75; }
        .cta-a { font-size: .9rem; font-weight: 600; padding: .8rem 1.9rem; border-radius: 100px; background: #fff; color: #111; text-decoration: none; transition: transform .35s cubic-bezier(.16,1,.3,1); }
        .cta-a:hover { transform: translateY(-3px); }
        .ticks { display: flex; gap: .45rem; }
        .tick { width: 44px; height: 3px; border-radius: 3px; background: rgba(255,255,255,.22); border: none; padding: 0; cursor: pointer; overflow: hidden; }
        .tfill { display: block; width: 100%; height: 100%; transform-origin: left; transform: scaleX(0); }
        @keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @media (prefers-reduced-motion: reduce) { .rise, .giant { transition: none; opacity: 1; transform: none; } .tfill { animation: none !important; } }
      `}</style>
    </main>
  );
}
