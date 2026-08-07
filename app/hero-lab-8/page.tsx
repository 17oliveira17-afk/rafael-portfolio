"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

/* HERO LAB 8 — split layout: statement left, live case
   media right, auto-cycling through the 5 projects with the
   accent colour following along. Test route, not linked. */

const CASES = [
  { name: "CVC Flights", c: "#eab308", m: "2.0★ → 4.6★ · +212% checkout", v: "/videos/cvc-airport.mp4", href: "/work/cvc" },
  { name: "Rappi Onboarding", c: "#ff6a2b", m: "2 weeks → 2 days to open a store", v: "/videos/rappi-kitchen.mp4", href: "/work/rappi" },
  { name: "Design Systems", c: "#00c8a0", m: "From zero to scale", v: "/videos/ds-components.mp4", href: "/work/design-system" },
  { name: "Leadership", c: "#ec6b86", m: "8-week cycle → 3 weeks", v: "/videos/leadership-workshop.mp4", href: "/work/leadership" },
  { name: "MapleTrack", c: "#e31c5f", m: "0 → 1 SaaS, shipped solo with AI", v: "/videos/maple-immigration.mp4", href: "/work/maple-track" },
];

export default function HeroLab8() {
  const [on, setOn] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    setOn(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI((p) => (p + 1) % CASES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const cur = CASES[i];

  return (
    <main style={{ position: "relative", minHeight: "100svh", background: "#08080b", overflow: "hidden", color: "#fff" }}>
      <div className="tint" style={{ background: cur.c }} aria-hidden />

      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 10, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Hero Lab 8 · split
      </div>

      <div className="grid">
        {/* LEFT — statement */}
        <div className="left">
          <p className={`rise ${on ? "in" : ""}`} style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: "1.75rem" }}>
            AI-First Product Design Lead · Working Globally
          </p>
          <h1 style={{ fontSize: "clamp(2.4rem,5.5vw,4.6rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.0, marginBottom: "1.5rem" }}>
            {["I", "design", "products"].map((w, k) => <span key={k} className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: `${150 + k * 70}ms`, display: "inline-block", marginRight: ".22em" }}>{w}</span>)}
            <br />
            <span className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "380ms", display: "inline-block", fontStyle: "italic", fontWeight: 500, color: cur.c, transition: "color .8s ease, opacity .9s, transform .9s" }}>that move the needle.</span>
          </h1>
          <p className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "520ms", fontSize: "clamp(.95rem,1.2vw,1.08rem)", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 440, marginBottom: "2.25rem" }}>
            8+ years turning complex fintech &amp; B2B systems into experiences that convert — now shipping them end-to-end with AI.
          </p>
          <div className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "620ms", display: "flex", gap: ".75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <Link href="/#work" className="cta-a">View case studies →</Link>
            <Link href="/about" className="cta-b">About me</Link>
          </div>
          {/* progress list */}
          <div className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "720ms", display: "flex", flexDirection: "column", gap: ".2rem" }}>
            {CASES.map((c, k) => (
              <button key={c.name} onClick={() => setI(k)} className="row" style={{ opacity: k === i ? 1 : .4 }}>
                <span className="bar"><span className="fill" style={{ background: c.c, transform: `scaleX(${k === i ? 1 : 0})` }} /></span>
                <span style={{ fontWeight: k === i ? 600 : 400 }}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — live media */}
        <div className={`right rise ${on ? "in" : ""}`} style={{ transitionDelay: "300ms" }}>
          <div className="frame" style={{ boxShadow: `0 40px 90px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.08), 0 0 80px ${cur.c}33` }}>
            {CASES.map((c, k) => (
              <video key={c.name} src={c.v} autoPlay loop muted playsInline
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: k === i ? 1 : 0, transition: "opacity 1.1s ease" }} />
            ))}
            <div className="scrim" />
            <div className="cap">
              <p style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: cur.c, marginBottom: ".35rem", transition: "color .8s ease" }}>{`0${i + 1} — Case study`}</p>
              <p style={{ fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-.02em", marginBottom: ".2rem" }}>{cur.name}</p>
              <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.6)" }}>{cur.m}</p>
            </div>
            <Link href={cur.href} className="open">Explore →</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rise { opacity: 0; transform: translateY(24px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .rise.in { opacity: 1; transform: translateY(0); }
        .tint { position: absolute; width: 55vw; height: 55vw; border-radius: 50%; filter: blur(130px); opacity: .18; right: -12%; top: -18%; pointer-events: none; transition: background 1.2s ease; }
        .grid { position: relative; z-index: 3; min-height: 100svh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: clamp(2rem,5vw,5rem); padding: 7rem clamp(1.5rem,5vw,5rem) 4rem; }
        .frame { position: relative; width: 100%; aspect-ratio: 4/5; border-radius: 22px; overflow: hidden; background: #000; }
        .scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.15) 45%, transparent 70%); }
        .cap { position: absolute; left: 1.5rem; right: 1.5rem; bottom: 1.5rem; }
        .open { position: absolute; top: 1.1rem; right: 1.1rem; font-size: .72rem; font-weight: 600; color: #111; background: #fff; padding: .45rem 1rem; border-radius: 100px; text-decoration: none; transition: transform .3s cubic-bezier(.16,1,.3,1); }
        .open:hover { transform: translateY(-2px); }
        .cta-a, .cta-b { font-size: .9rem; font-weight: 600; padding: .8rem 1.9rem; border-radius: 100px; text-decoration: none; display: inline-block; transition: transform .35s cubic-bezier(.16,1,.3,1), background .3s ease; }
        .cta-a { background: #fff; color: #111; }
        .cta-a:hover { transform: translateY(-3px); }
        .cta-b { background: rgba(255,255,255,.07); color: #fff; border: 1px solid rgba(255,255,255,.18); }
        .cta-b:hover { transform: translateY(-3px); background: rgba(255,255,255,.13); }
        .row { display: flex; align-items: center; gap: .8rem; background: none; border: none; color: #fff; font-size: .82rem; padding: .45rem 0; cursor: pointer; text-align: left; transition: opacity .5s ease; }
        .bar { width: 46px; height: 2px; background: rgba(255,255,255,.18); border-radius: 2px; overflow: hidden; flex-shrink: 0; }
        .fill { display: block; width: 100%; height: 100%; transform-origin: left; transition: transform 5s linear; }
        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr; padding-top: 6rem; }
          .frame { aspect-ratio: 16/11; }
        }
        @media (prefers-reduced-motion: reduce) { .rise { transition: none; opacity: 1; transform: none; } .fill { transition: none; } }
      `}</style>
    </main>
  );
}
