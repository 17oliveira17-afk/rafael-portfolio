"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────
   HERO LAB 5 — test page, NOT linked anywhere.
   Simple, modern, attractive. Soft drifting color
   blobs (the 5 case accents) + kinetic typography
   + a morphing word + hover motion. No WebGL.
   View at /hero-lab-5.
   ────────────────────────────────────────────── */

const MORPH = ["products", "systems", "teams"];

const CASES = [
  { name: "CVC Flights", c: "#eab308", href: "/work/cvc" },
  { name: "Rappi", c: "#ff6a2b", href: "/work/rappi" },
  { name: "Design Systems", c: "#00c8a0", href: "/work/design-system" },
  { name: "Leadership", c: "#ec6b86", href: "/work/leadership" },
  { name: "MapleTrack", c: "#e31c5f", href: "/work/maple-track" },
];

export default function HeroLab5() {
  const [word, setWord] = useState(0);
  const [on, setOn] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOn(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setWord((w) => (w + 1) % MORPH.length), 2600);
    const move = (e: PointerEvent) => {
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
    };
    window.addEventListener("pointermove", move);
    return () => { clearInterval(id); window.removeEventListener("pointermove", move); };
  }, []);

  const line1 = ["I", "design"];
  const line2 = ["that", "move", "the", "needle."];

  return (
    <main style={{ position: "relative", minHeight: "100svh", background: "#07070a", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>

      {/* drifting color blobs */}
      <div className="blob b1" aria-hidden />
      <div className="blob b2" aria-hidden />
      <div className="blob b3" aria-hidden />
      <div className="blob b4" aria-hidden />
      <div className="grain" aria-hidden />
      {/* cursor glow */}
      <div ref={glowRef} className="cursor-glow" aria-hidden />

      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 10, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Hero Lab 5 · modern
      </div>

      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 1.5rem", maxWidth: 1100 }}>

        {/* eyebrow */}
        <p className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "80ms", fontSize: ".72rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: "2rem" }}>
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#00c8a0", marginRight: ".6rem", verticalAlign: "middle", boxShadow: "0 0 12px #00c8a0" }} />
          AI-First Product Design Lead · Working Globally
        </p>

        {/* headline */}
        <h1 style={{ fontSize: "clamp(2.6rem,7.5vw,6.5rem)", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1.02, color: "#fff", marginBottom: "2rem" }}>
          <span style={{ display: "block" }}>
            {line1.map((w, i) => (
              <span key={i} className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: `${180 + i * 70}ms`, display: "inline-block", marginRight: ".24em" }}>{w}</span>
            ))}
            {/* morphing word */}
            <span style={{ display: "inline-block", position: "relative", verticalAlign: "top" }}>
              <span style={{ visibility: "hidden" }}>{MORPH.reduce((a, b) => (a.length > b.length ? a : b))}</span>
              {MORPH.map((m, i) => (
                <span key={m} style={{
                  position: "absolute", left: 0, top: 0, whiteSpace: "nowrap",
                  fontStyle: "italic", fontWeight: 500,
                  backgroundImage: "linear-gradient(100deg,#eab308,#ff6a2b 35%,#ec6b86 62%,#00c8a0)",
                  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                  opacity: i === word ? 1 : 0,
                  transform: i === word ? "translateY(0)" : "translateY(.35em)",
                  transition: "opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1)",
                }}>{m}</span>
              ))}
            </span>
          </span>
          <span style={{ display: "block" }}>
            {line2.map((w, i) => (
              <span key={i} className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: `${340 + i * 70}ms`, display: "inline-block", marginRight: ".24em" }}>{w}</span>
            ))}
          </span>
        </h1>

        {/* sub */}
        <p className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "660ms", fontSize: "clamp(.98rem,1.35vw,1.15rem)", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 560, margin: "0 auto 2.5rem" }}>
          8+ years turning complex fintech &amp; B2B systems into experiences that convert — now shipping them end-to-end with AI.
        </p>

        {/* CTAs */}
        <div className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "760ms", display: "flex", gap: ".85rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          <Link href="/#work" className="cta-a">View case studies →</Link>
          <Link href="/about" className="cta-b">About me</Link>
        </div>

        {/* case chips */}
        <div className={`rise ${on ? "in" : ""}`} style={{ transitionDelay: "880ms", display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
          {CASES.map((c) => (
            <Link key={c.name} href={c.href} className="chip" style={{ ["--c" as string]: c.c }}>
              <span className="dot" style={{ background: c.c }} />
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .rise { opacity: 0; transform: translateY(24px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .rise.in { opacity: 1; transform: translateY(0); }

        .blob { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; will-change: transform; }
        .b1 { width: 46vw; height: 46vw; background: #eab308; opacity: .22; left: -6%; top: -8%; animation: f1 24s ease-in-out infinite alternate; }
        .b2 { width: 42vw; height: 42vw; background: #ff6a2b; opacity: .20; right: -4%; top: 4%; animation: f2 28s ease-in-out infinite alternate; }
        .b3 { width: 44vw; height: 44vw; background: #e31c5f; opacity: .20; left: 12%; bottom: -12%; animation: f3 26s ease-in-out infinite alternate; }
        .b4 { width: 38vw; height: 38vw; background: #00c8a0; opacity: .18; right: 10%; bottom: -8%; animation: f4 30s ease-in-out infinite alternate; }
        @keyframes f1 { to { transform: translate3d(8vw,6vh,0) scale(1.15); } }
        @keyframes f2 { to { transform: translate3d(-7vw,8vh,0) scale(.9); } }
        @keyframes f3 { to { transform: translate3d(6vw,-7vh,0) scale(1.1); } }
        @keyframes f4 { to { transform: translate3d(-5vw,-6vh,0) scale(1.18); } }

        .cursor-glow { position: fixed; left: 0; top: 0; width: 600px; height: 600px; border-radius: 50%; pointer-events: none; z-index: 2;
          background: radial-gradient(circle, rgba(255,255,255,.07), transparent 60%); transition: transform .35s cubic-bezier(.16,1,.3,1); }

        .grain { position: absolute; inset: 0; pointer-events: none; opacity: .05; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

        .cta-a, .cta-b { font-size: .93rem; font-weight: 600; padding: .85rem 2rem; border-radius: 100px; text-decoration: none; display: inline-block;
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, background .3s ease; }
        .cta-a { background: #fff; color: #111; box-shadow: 0 8px 30px rgba(255,255,255,.14); }
        .cta-a:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(255,255,255,.24); }
        .cta-b { background: rgba(255,255,255,.07); color: #fff; border: 1px solid rgba(255,255,255,.16); backdrop-filter: blur(10px); }
        .cta-b:hover { transform: translateY(-3px); background: rgba(255,255,255,.13); }

        .chip { display: inline-flex; align-items: center; gap: .5rem; font-size: .76rem; font-weight: 500; color: rgba(255,255,255,.6);
          text-decoration: none; padding: .45rem 1rem; border-radius: 100px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.03);
          transition: transform .35s cubic-bezier(.16,1,.3,1), color .3s ease, border-color .3s ease, box-shadow .35s ease; }
        .chip:hover { transform: translateY(-3px); color: #fff; border-color: var(--c); box-shadow: 0 8px 26px color-mix(in srgb, var(--c) 35%, transparent); }
        .dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }

        @media (prefers-reduced-motion: reduce) {
          .blob, .cursor-glow { animation: none; transition: none; }
          .rise { transition: none; opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}
