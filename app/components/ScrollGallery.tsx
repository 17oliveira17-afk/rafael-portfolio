"use client";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

/* Apple "take a closer look" horizontal rail — scroll-snap, arrows, dots, peeking edges.
   Generic: feed it screenshots. Works on a dark stage. */
export type GalleryItem = { src: string; alt?: string; caption?: string };

function Arrow({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick} disabled={disabled}
      aria-label={dir === "left" ? "Previous" : "Next"}
      style={{
        width: 44, height: 44, borderRadius: "50%", border: "none",
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

export default function ScrollGallery({
  items, cardWidth = 300, gap = 18, ratio = "9 / 19.5",
}: { items: GalleryItem[]; cardWidth?: number; gap?: number; ratio?: string }) {
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
      <div style={{ display: "flex", justifyContent: "flex-end", gap: ".6rem", marginBottom: "1.25rem" }} className="sg-arrows">
        <Arrow dir="left" onClick={() => scrollBy(-1)} disabled={atStart} />
        <Arrow dir="right" onClick={() => scrollBy(1)} disabled={atEnd} />
      </div>

      <div ref={trackRef} className="sg-track" style={{
        display: "flex", gap, overflowX: "auto", scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
        padding: "0 1.5rem 1rem", margin: "0 -1.5rem",
      }}>
        {items.map((it, i) => (
          <figure key={i} style={{ flexShrink: 0, width: cardWidth, maxWidth: "78vw", scrollSnapAlign: "center", margin: 0 }}>
            <div style={{
              aspectRatio: ratio, borderRadius: 26, overflow: "hidden", position: "relative",
              background: "#0c0c0f", boxShadow: "0 24px 50px rgba(0,0,0,.5)",
            }}>
              <Image src={it.src} alt={it.alt ?? ""} fill unoptimized sizes="320px" style={{ objectFit: "cover" }} />
            </div>
            {it.caption && <figcaption style={{ marginTop: ".8rem", fontSize: ".78rem", color: "rgba(255,255,255,.45)", textAlign: "center", lineHeight: 1.5 }}>{it.caption}</figcaption>}
          </figure>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: ".5rem" }}>
        {items.map((_, i) => (
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
        .sg-track::-webkit-scrollbar { display: none; }
        @media (max-width: 767px) { .sg-arrows { display: none !important; } }
      `}</style>
    </div>
  );
}
