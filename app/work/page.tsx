"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useIsMobile from "../components/useIsMobile";
import { PROJECTS } from "../components/ProjectGallery";

export default function WorkPage() {
  const isMobile = useIsMobile();
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.45) {
            const idx = els.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActiveIdx(idx);
          }
        }
      },
      { threshold: 0.45 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  const active = PROJECTS[activeIdx] || PROJECTS[0];

  return (
    <main className="page-in" style={{ background: "#000", position: "relative" }}>

      {/* ambient glow — follows active project color */}
      <div
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${active.glow}20 0%, transparent 55%)`,
          transition: "background 1s ease",
        }}
      />

      {/* sticky side nav — project dots */}
      {!isMobile && (
        <nav style={{ position: "fixed", right: "2.5rem", top: "50%", transform: "translateY(-50%)", zIndex: 50, display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "flex-end" }}>
          {PROJECTS.map((p, i) => (
            <button
              key={p.href}
              onClick={() => scrollTo(i)}
              style={{
                display: "flex", alignItems: "center", gap: ".75rem",
                background: "none", border: "none", cursor: "pointer", padding: 0,
                flexDirection: "row-reverse",
              }}
            >
              <div style={{
                width: i === activeIdx ? 14 : 8,
                height: i === activeIdx ? 14 : 8,
                borderRadius: "50%",
                background: i === activeIdx ? active.glow : "rgba(255,255,255,.2)",
                border: i === activeIdx ? `2px solid ${active.glow}` : "2px solid transparent",
                transition: "all .4s ease",
                boxShadow: i === activeIdx ? `0 0 16px ${active.glow}60` : "none",
              }} />
              <span style={{
                fontSize: ".68rem", fontWeight: 600, letterSpacing: ".06em",
                color: i === activeIdx ? "rgba(255,255,255,.9)" : "rgba(255,255,255,0)",
                transition: "color .3s ease",
                whiteSpace: "nowrap",
              }}>
                {p.company}
              </span>
            </button>
          ))}
        </nav>
      )}

      {/* mobile top indicator */}
      {isMobile && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", gap: 4, padding: "0 1.5rem", paddingTop: "env(safe-area-inset-top, 52px)" }}>
          {PROJECTS.map((p, i) => (
            <div key={p.href} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= activeIdx ? active.glow : "rgba(255,255,255,.15)",
              transition: "background .4s ease",
            }} />
          ))}
        </div>
      )}

      {/* scroll container */}
      <div ref={wrapRef}>
        {PROJECTS.map((p, i) => (
          <section
            key={p.href}
            ref={(el) => { sectionRefs.current[i] = el; }}
            style={{
              minHeight: "100svh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              padding: isMobile ? "6rem 1.5rem" : "4rem 6rem",
            }}
          >
            {/* project accent glow */}
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: `radial-gradient(ellipse 70% 55% at ${i % 2 === 0 ? "30% 60%" : "70% 40%"}, ${p.glow}18 0%, transparent 60%)`,
            }} />

            {/* ghost index number */}
            <div aria-hidden style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -55%)",
              fontSize: isMobile ? "42vw" : "min(48vw, 38rem)",
              fontWeight: 800, lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: `1.5px ${p.glow}14`,
              letterSpacing: "-.06em",
              pointerEvents: "none", userSelect: "none",
            }}>
              0{i + 1}
            </div>

            <Link href={p.href} style={{ textDecoration: "none", display: "block", position: "relative", zIndex: 1, maxWidth: 1100, width: "100%" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : i % 2 === 0 ? "1.1fr 1fr" : "1fr 1.1fr",
                gap: isMobile ? "2rem" : "5rem",
                alignItems: "center",
              }}>
                {/* metric side */}
                {(() => {
                  const metricBlock = (
                    <div style={{ order: isMobile ? 0 : (i % 2 === 0 ? 0 : 1) }}>
                      <p style={{
                        fontSize: ".68rem", fontWeight: 700, letterSpacing: ".18em",
                        textTransform: "uppercase", color: p.glow,
                        marginBottom: isMobile ? "1rem" : "1.5rem",
                        opacity: 0,
                        animation: activeIdx === i ? "fadeUp .8s ease .15s forwards" : "none",
                      }}>
                        {p.eyebrow}
                      </p>

                      <h2 style={{
                        fontSize: isMobile ? "clamp(2.8rem,12vw,3.6rem)" : "clamp(3.5rem,6vw,6.5rem)",
                        fontWeight: 700, color: "#fff", letterSpacing: "-.05em",
                        lineHeight: .95, marginBottom: ".6rem",
                        opacity: 0,
                        animation: activeIdx === i ? "fadeUp 1s ease .3s forwards" : "none",
                      }}>
                        {p.metric}
                      </h2>
                      <p style={{
                        fontSize: isMobile ? ".82rem" : ".9rem",
                        color: "rgba(255,255,255,.5)", letterSpacing: ".06em",
                        textTransform: "uppercase", marginBottom: isMobile ? "1.5rem" : "2.5rem",
                        opacity: 0,
                        animation: activeIdx === i ? "fadeUp .8s ease .45s forwards" : "none",
                      }}>
                        {p.metricLabel}
                      </p>

                      <h3 style={{
                        fontSize: isMobile ? "1.6rem" : "clamp(1.5rem,2.4vw,2.2rem)",
                        fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.02em",
                        lineHeight: 1.1, marginBottom: ".9rem",
                        opacity: 0,
                        animation: activeIdx === i ? "fadeUp .8s ease .55s forwards" : "none",
                      }}>
                        {p.title}
                      </h3>

                      <p style={{
                        fontSize: isMobile ? ".92rem" : "1rem",
                        color: "rgba(255,255,255,.5)", lineHeight: 1.75,
                        maxWidth: 440, marginBottom: "1.75rem",
                        opacity: 0,
                        animation: activeIdx === i ? "fadeUp .8s ease .65s forwards" : "none",
                      }}>
                        {p.blurb}
                      </p>

                      <div style={{
                        display: "flex", gap: ".45rem", flexWrap: "wrap", marginBottom: "2rem",
                        opacity: 0,
                        animation: activeIdx === i ? "fadeUp .7s ease .75s forwards" : "none",
                      }}>
                        {p.tags.map(t => (
                          <span key={t} style={{
                            fontSize: ".66rem", fontWeight: 600,
                            padding: ".28rem .7rem", borderRadius: 100,
                            border: `1px solid ${p.glow}44`,
                            color: "rgba(255,255,255,.6)",
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: ".5rem",
                        fontSize: ".95rem", fontWeight: 600, color: p.glow,
                        opacity: 0,
                        animation: activeIdx === i ? "fadeUp .7s ease .85s forwards" : "none",
                      }}>
                        Read case study
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  );

                  const plateBlock = (
                    <div style={{
                      order: isMobile ? -1 : (i % 2 === 0 ? 1 : 0),
                      opacity: 0,
                      animation: activeIdx === i ? "fadeScale .9s ease .2s forwards" : "none",
                    }}>
                      <div style={{
                        position: "relative",
                        aspectRatio: isMobile ? "16/10" : "4/5",
                        borderRadius: 28,
                        overflow: "hidden",
                        background: p.grad,
                        boxShadow: `0 40px 100px ${p.glow}25`,
                      }}>
                        {/* orbs */}
                        <div aria-hidden style={{ position: "absolute", width: "80%", aspectRatio: "1", borderRadius: "50%", top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(255,255,255,.5), transparent 60%)", filter: "blur(10px)", mixBlendMode: "soft-light", pointerEvents: "none" }} />
                        <div aria-hidden style={{ position: "absolute", width: "70%", aspectRatio: "1", borderRadius: "50%", bottom: "-25%", left: "-15%", background: "radial-gradient(circle, rgba(0,0,0,.4), transparent 60%)", filter: "blur(12px)", pointerEvents: "none" }} />
                        {/* dot grid */}
                        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.5) 1px, transparent 1.3px)", backgroundSize: "22px 22px", opacity: .12, WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 65% 30%, #000, transparent 75%)", maskImage: "radial-gradient(ellipse 80% 75% at 65% 30%, #000, transparent 75%)", pointerEvents: "none" }} />
                        {/* sheen */}
                        <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,.12) 46%, transparent 62%)", pointerEvents: "none" }} />
                        {/* company badge */}
                        <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 2 }}>
                          <span style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", color: "#fff", padding: ".4rem .9rem", borderRadius: 100, background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)", backdropFilter: "blur(8px)" }}>
                            {p.company}
                          </span>
                        </div>
                        {/* giant ghost number */}
                        <div style={{ position: "absolute", bottom: "-8%", right: "5%", fontSize: isMobile ? "8rem" : "14rem", fontWeight: 800, lineHeight: 1, color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,.25)", letterSpacing: "-.06em", pointerEvents: "none" }}>
                          0{i + 1}
                        </div>
                      </div>
                    </div>
                  );

                  return <>{metricBlock}{plateBlock}</>;
                })()}
              </div>
            </Link>
          </section>
        ))}

        {/* CTA */}
        <section style={{
          minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center",
          padding: isMobile ? "5rem 1.5rem" : "6rem", textAlign: "center",
          position: "relative",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,113,227,.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: "1.25rem" }}>
              {PROJECTS.length} projects · depth over volume
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", marginBottom: "1.5rem" }}>
              Want the rest of the story?
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 2.25rem" }}>
              These are the public ones. There&apos;s more under NDA — happy to walk you through it.
            </p>
            <Link href="/contact" className="btn-blue" style={{ padding: ".9rem 2.5rem", fontSize: ".95rem" }}>
              Get in touch →
            </Link>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeScale { from { opacity: 0; transform: scale(.92); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </main>
  );
}
