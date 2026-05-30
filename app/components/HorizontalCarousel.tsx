"use client";
import { ReactNode, useRef, useState, useEffect } from "react";

/**
 * Apple-style horizontal carousel with snap and progress dots.
 * On desktop: shows multiple items in a row (no scroll needed).
 * On mobile: full-width swipeable cards with scroll-snap-mandatory.
 */
export default function HorizontalCarousel({
  items,
  itemWidth = 280,
  gap = 16,
}: {
  items: ReactNode[];
  itemWidth?: number;
  gap?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const idx = Math.round(track.scrollLeft / (itemWidth + gap));
      setActive(Math.min(items.length - 1, Math.max(0, idx)));
    };
    track.addEventListener("scroll", update, { passive: true });
    return () => track.removeEventListener("scroll", update);
  }, [itemWidth, gap, items.length]);

  return (
    <div style={{ width: "100%" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: "0 1.5rem 1rem",
          margin: "0 -1.5rem",
        }}
        className="hc-track"
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: itemWidth,
              scrollSnapAlign: "center",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 8, marginTop: "1.25rem",
      }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const track = trackRef.current;
              if (track) track.scrollTo({ left: i * (itemWidth + gap), behavior: "smooth" });
            }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === active ? "currentColor" : "rgba(128,128,128,.35)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width .3s ease, background .3s ease",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .hc-track::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
