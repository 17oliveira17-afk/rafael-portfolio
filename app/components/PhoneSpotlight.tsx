"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DeviceFrame from "./DeviceFrame";

/* One pinned iPhone that crossfades through several product screens as you
   scroll — instead of scattering a grid of phones across the page. The screen
   list sits beside the device; the active item lights up and its description
   expands. The phone is drawn in code (DeviceFrame) and fed RAW screens.

   On mobile it degrades to a clean vertical stack (one phone per screen). */

export type SpotItem = {
  src: string;
  title: string;
  body: string;
  metric?: string; // optional highlight chip, e.g. "+23% cross-sell"
};

export default function PhoneSpotlight({
  items,
  isMobile = false,
  finish = "titanium",
  vhPerItem = 78,
  baked = false,
}: {
  items: SpotItem[];
  isMobile?: boolean;
  finish?: "titanium" | "black" | "blue" | "desert";
  vhPerItem?: number;
  baked?: boolean; // src PNGs already include the phone mockup — skip the code frame
}) {
  const n = items.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-r.top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolled / total : 0;
      const idx = Math.min(n - 1, Math.max(0, Math.floor(p * n + 0.0001)));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile, n]);

  const goTo = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const pageTop = el.getBoundingClientRect().top + window.scrollY;
    const y = pageTop + ((i + 0.5) / n) * total;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* ── Mobile: simple stacked phones ── */
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            {baked ? (
              <div style={{ width: 250 }}>
                <Image src={it.src} alt={it.title} width={908} height={1880} unoptimized sizes="250px" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            ) : (
              <DeviceFrame width={230} finish={finish}>
                <Image src={it.src} alt={it.title} fill unoptimized sizes="240px" style={{ objectFit: "cover", objectPosition: "center top" }} />
              </DeviceFrame>
            )}
            <div style={{ textAlign: "center", maxWidth: 360 }}>
              {it.metric && (
                <span style={{ display: "inline-block", marginBottom: ".75rem", padding: ".3rem .8rem", borderRadius: 100, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".04em", color: "#eab308", border: "1px solid rgba(234,179,8,.35)", background: "rgba(234,179,8,.06)" }}>{it.metric}</span>
              )}
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff", marginBottom: ".6rem", letterSpacing: "-.01em" }}>{it.title}</h3>
              <p style={{ fontSize: ".92rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>{it.body}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ── Desktop: pinned phone, scroll-driven crossfade ── */
  return (
    <div ref={wrapRef} style={{ position: "relative", height: `${n * vhPerItem}vh` }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "5rem",
        }}
      >
        {/* caption list */}
        <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
          {items.map((it, i) => {
            const on = i === active;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "1rem 0 1rem 1.25rem",
                  borderLeft: `2px solid ${on ? "#eab308" : "rgba(255,255,255,.1)"}`,
                  transition: "border-color .4s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: on ? ".5rem" : 0 }}>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".06em", color: on ? "#eab308" : "rgba(255,255,255,.3)", transition: "color .4s ease" }}>
                    0{i + 1}
                  </span>
                  <h3 style={{ fontSize: on ? "1.5rem" : "1.15rem", fontWeight: 600, letterSpacing: "-.02em", color: on ? "#fff" : "rgba(255,255,255,.4)", transition: "color .4s ease, font-size .4s ease" }}>
                    {it.title}
                  </h3>
                  {it.metric && on && (
                    <span style={{ padding: ".25rem .7rem", borderRadius: 100, fontSize: ".66rem", fontWeight: 700, letterSpacing: ".04em", color: "#eab308", border: "1px solid rgba(234,179,8,.35)", background: "rgba(234,179,8,.06)" }}>{it.metric}</span>
                  )}
                </div>
                <div style={{ overflow: "hidden", maxHeight: on ? 90 : 0, opacity: on ? 1 : 0, transition: "max-height .5s cubic-bezier(.16,1,.3,1), opacity .5s ease" }}>
                  <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7, paddingRight: "1rem" }}>{it.body}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* pinned device */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {(() => {
            const layers = items.map((it, i) => {
              const rel = i - active;
              const dir = rel === 0 ? 0 : rel < 0 ? -1 : 1; // earlier steps exit left, later enter from right
              const slide = baked
                ? {
                    opacity: i === active ? 1 : 0,
                    transform: `translateX(${dir * 60}%) scale(${i === active ? 1 : 0.8}) rotateY(${dir * -16}deg)`,
                  }
                : {
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "scale(1)" : "scale(1.04)",
                  };
              return (
                <div
                  key={i}
                  aria-hidden={i !== active}
                  style={{
                    position: "absolute",
                    inset: 0,
                    ...slide,
                    transformOrigin: "center center",
                    transition: "opacity .6s cubic-bezier(.4,0,.2,1), transform .85s cubic-bezier(.16,1,.3,1)",
                    willChange: "transform, opacity",
                  }}
                >
                  <Image src={it.src} alt={it.title} fill unoptimized sizes="360px" style={{ objectFit: baked ? "contain" : "cover", objectPosition: "center top" }} />
                </div>
              );
            });
            return baked ? (
              <div style={{ position: "relative", width: 340, aspectRatio: "908 / 1880", perspective: 1400 }}>{layers}</div>
            ) : (
              <DeviceFrame width={310} finish={finish}>{layers}</DeviceFrame>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
