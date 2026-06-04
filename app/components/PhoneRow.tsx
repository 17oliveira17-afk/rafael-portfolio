"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* A row of pre-framed phone screenshots (mockup already baked into the PNG)
   shown directly on the section's black background with a soft blue glow
   behind them — no card box. On desktop the phones sit centered side by side;
   on mobile they become a horizontal, snap-scrolling strip.

   On appear, the phones stagger in (rise + fade + scale). As you keep
   scrolling, each phone drifts with a subtle parallax — the outer two move
   opposite the middle, giving the triptych depth tied to scroll. */

export type RowItem = { src: string; alt?: string; caption?: string };

export default function PhoneRow({
  items,
  isMobile = false,
  width = 262,
}: {
  items: RowItem[];
  isMobile?: boolean;
  width?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [drift, setDrift] = useState(0); // -1..1 : row position vs viewport centre

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centre = r.top + r.height / 2;
      setDrift(Math.max(-1, Math.min(1, (vh / 2 - centre) / vh)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const n = items.length;
  const mid = (n - 1) / 2;

  return (
    <div style={{ position: "relative" }}>
      {/* blue glow behind the phones */}
      <div
        style={{
          position: "absolute",
          inset: isMobile ? "0" : "-10% -5%",
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,113,227,.20) 0%, transparent 65%)",
        }}
      />

      <div
        ref={ref}
        className="phone-row-scroll"
        style={{
          position: "relative",
          display: "flex",
          gap: isMobile ? "1.25rem" : "2.5rem",
          justifyContent: isMobile ? "flex-start" : "center",
          alignItems: "flex-start",
          overflowX: isMobile ? "auto" : "visible",
          scrollSnapType: isMobile ? "x mandatory" : undefined,
          padding: isMobile ? "1rem 1.5rem 1.5rem" : ".5rem 0",
          margin: isMobile ? "0 -1.5rem" : 0,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {items.map((it, i) => {
          const depth = i - mid;                       // -1, 0, +1 in a triptych
          const par = isMobile ? 0 : drift * depth * 26; // parallax drift
          const delay = i * 95;                        // stagger on appear
          return (
            <div
              key={i}
              style={{
                flex: "0 0 auto",
                width: isMobile ? "72vw" : width,
                maxWidth: isMobile ? 320 : undefined,
                scrollSnapAlign: "center",
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(60px) scale(.9)",
                transition: `opacity .8s ease ${delay}ms, transform 1s cubic-bezier(.16,1,.3,1) ${delay}ms`,
                willChange: "transform, opacity",
              }}
            >
              <div
                style={{
                  transform: `translateY(${par}px)`,
                  transition: "transform .2s linear",
                  willChange: "transform",
                }}
              >
                <Image
                  src={it.src}
                  alt={it.alt || ""}
                  width={800}
                  height={1650}
                  unoptimized
                  sizes={isMobile ? "72vw" : `${width}px`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    filter: "drop-shadow(0 34px 70px rgba(0,0,0,.55))",
                  }}
                />
                {it.caption && (
                  <p
                    style={{
                      marginTop: ".85rem",
                      textAlign: "center",
                      fontSize: ".8rem",
                      color: "rgba(255,255,255,.55)",
                      lineHeight: 1.45,
                    }}
                  >
                    {it.caption}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .phone-row-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
