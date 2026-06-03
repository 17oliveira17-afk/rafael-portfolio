"use client";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

/* Apple "Tela Pro imersiva" feature carousel — wide snap cards with a frosted
   glass caption card floating over each slide, arrow + dot nav, peeking edges. */

export type FeatureSlide = {
  src: string;
  title: string;
  body?: string;
  ratio?: string;        // per-slide override, default 16/10
  position?: string;     // objectPosition, e.g. "center top"
};

function Arrow({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick} disabled={disabled}
      aria-label={dir === "left" ? "Previous" : "Next"}
      style={{
        width: 46, height: 46, borderRadius: "50%", border: "none",
        background: disabled ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.1)",
        color: disabled ? "rgba(255,255,255,.2)" : "#fff",
        cursor: disabled ? "default" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background .25s ease",
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "rgba(255,255,255,.2)"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "rgba(255,255,255,.1)"; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
}

export default function FeatureCarousel({
  slides, cardWidth = 720, gap = 22,
}: { slides: FeatureSlide[]; cardWidth?: number; gap?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);
  const STEP = cardWidth + gap;

  const update = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setAtStart(t.scrollLeft < 8);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 8);
    setActive(Math.round(t.scrollLeft / STEP));
  }, [STEP]);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    update();
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { t.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * STEP, behavior: "smooth" });

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: ".6rem", marginBottom: "1.25rem" }} className="fc-arrows">
        <Arrow dir="left" onClick={() => scrollBy(-1)} disabled={atStart} />
        <Arrow dir="right" onClick={() => scrollBy(1)} disabled={atEnd} />
      </div>

      <div ref={trackRef} className="fc-track" style={{
        display: "flex", gap, overflowX: "auto", scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
        padding: "0 1.5rem 1rem", margin: "0 -1.5rem",
      }}>
        {slides.map((s, i) => (
          <div key={i} style={{ flexShrink: 0, width: cardWidth, maxWidth: "88vw", scrollSnapAlign: "center" }}>
            <div style={{
              position: "relative", aspectRatio: s.ratio ?? "16 / 10",
              borderRadius: 24, overflow: "hidden",
              background: "#0c0c0f", boxShadow: "0 28px 60px rgba(0,0,0,.5)",
              border: "1px solid rgba(255,255,255,.06)",
            }}>
              <Image src={s.src} alt={s.title} fill unoptimized sizes="760px"
                style={{ objectFit: "cover", objectPosition: s.position ?? "center" }} />
              {/* gradient scrim for legibility */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.72) 0%, transparent 48%)" }} />
              {/* frosted caption card */}
              <div style={{
                position: "absolute", left: 20, right: 20, bottom: 20,
                padding: "1.1rem 1.3rem", borderRadius: 16,
                background: "rgba(20,20,22,.55)", backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)", border: "1px solid rgba(255,255,255,.12)",
              }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", letterSpacing: "-.01em", marginBottom: s.body ? ".35rem" : 0 }}>{s.title}</h4>
                {s.body && <p style={{ fontSize: ".84rem", color: "rgba(255,255,255,.62)", lineHeight: 1.55 }}>{s.body}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: "1rem" }}>
        {slides.map((_, i) => (
          <button key={i}
            onClick={() => trackRef.current?.scrollTo({ left: i * STEP, behavior: "smooth" })}
            aria-label={`Go to ${i + 1}`}
            style={{
              width: i === active ? 22 : 8, height: 8, borderRadius: 4, border: "none", padding: 0, cursor: "pointer",
              background: i === active ? "#fff" : "rgba(255,255,255,.25)", transition: "width .3s ease, background .3s ease",
            }} />
        ))}
      </div>

      <style jsx>{`
        .fc-track::-webkit-scrollbar { display: none; }
        @media (max-width: 767px) { .fc-arrows { display: none !important; } }
      `}</style>
    </div>
  );
}
