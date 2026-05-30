"use client";
import { useState, useRef, useEffect } from "react";
import IPhone from "./IPhone";

interface Slide {
  src: string;
  label: string;
  desc: string;
}

/**
 * Native scroll-snap carousel with dots and edge gradients.
 * Designed for mobile but works at any width.
 */
export default function PhoneCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / w);
      setActive(Math.max(0, Math.min(slides.length - 1, i)));
    };
    el.addEventListener("scroll", fn, { passive: true });
    return () => el.removeEventListener("scroll", fn);
  }, [slides.length]);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* Counter */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", padding: "0 .5rem" }}>
        <div>
          <p style={{ fontSize: ".7rem", color: "#0071e3", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".4rem" }}>
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#fff", letterSpacing: "-.01em" }}>
            {slides[active].label}
          </h3>
        </div>
        <div style={{ display: "flex", gap: ".4rem" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => ref.current?.scrollTo({ left: ref.current.clientWidth * i, behavior: "smooth" })}
              style={{
                width: i === active ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === active ? "#0071e3" : "rgba(255,255,255,.25)",
                border: "none",
                padding: 0,
                transition: "all .3s ease",
                cursor: "pointer",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={ref}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          gap: 0,
          // Hide scrollbar
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        {slides.map((s, i) => (
          <div key={i} style={{
            flex: "0 0 100%",
            scrollSnapAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 1rem",
          }}>
            <IPhone src={s.src} alt={s.label} width={280} />
          </div>
        ))}
      </div>

      {/* Description below */}
      <p style={{
        fontSize: ".9rem",
        color: "rgba(255,255,255,.55)",
        lineHeight: 1.6,
        textAlign: "center",
        marginTop: "1.75rem",
        padding: "0 1rem",
        minHeight: "2.7em",
      }}>
        {slides[active].desc}
      </p>
    </div>
  );
}
