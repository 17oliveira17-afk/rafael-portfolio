"use client";
import Image from "next/image";
import { useState } from "react";
import DeviceFrame from "./DeviceFrame";

/* Apple "lens slider" (48/35/28mm) + "Cores" variant chip, generalized.
   A segmented control swaps a centered device with a crossfade + subtle zoom.
   Use it for a step scrubber (Search → Results → Confirmation) or a
   before/after toggle (Webview → Native). Lives on a dark stage.

   Pass `frame` to draw a single CSS iPhone shell and feed it RAW screens
   (no baked-in mockup) — only the screen crossfades inside the frame. */

export type SwitchItem = {
  label: string;        // segment label
  src: string;          // device PNG (framed) — or a RAW screen when `frame` is on
  caption?: string;     // line shown under the control
  badge?: string;       // small tag shown over the stage (e.g. "Before" / "After", "2x")
};

export default function DeviceSwitcher({
  items,
  height = 560,
  heightMobile = 430,
  isMobile = false,
  frame = false,
  finish = "titanium",
}: {
  items: SwitchItem[];
  height?: number;
  heightMobile?: number;
  isMobile?: boolean;
  frame?: boolean;
  finish?: "titanium" | "black" | "blue" | "desert";
}) {
  const [active, setActive] = useState(0);
  const n = items.length;
  const stageH = isMobile ? heightMobile : height;
  const frameW = Math.round(stageH * 0.46);

  return (
    <div style={{ width: "100%" }}>
      {/* ── Stage ── */}
      <div
        style={{
          position: "relative",
          height: stageH,
          borderRadius: 28,
          overflow: "hidden",
          background: "radial-gradient(ellipse 60% 70% at 50% 45%, rgba(0,113,227,.14) 0%, transparent 62%), #08080a",
          border: "1px solid rgba(255,255,255,.07)",
        }}
      >
        {/* badge */}
        {items[active].badge && (
          <div
            key={`badge-${active}`}
            style={{
              position: "absolute", top: 18, left: 18, zIndex: 3,
              padding: ".35rem .85rem", borderRadius: 100,
              background: "rgba(255,255,255,.08)", backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.12)",
              fontSize: ".68rem", fontWeight: 600, letterSpacing: ".08em",
              textTransform: "uppercase", color: "#fff",
              animation: "ds-fade .5s ease",
            }}
          >
            {items[active].badge}
          </div>
        )}

        {frame ? (
          /* one persistent CSS frame — only the screen crossfades inside it */
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "1.5rem 0" : "2rem 0" }}>
            <DeviceFrame width={frameW} finish={finish}>
              {items.map((it, i) => (
                <div
                  key={i}
                  aria-hidden={i !== active}
                  style={{
                    position: "absolute", inset: 0,
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "scale(1)" : "scale(1.04)",
                    transition: "opacity .6s cubic-bezier(.4,0,.2,1), transform .8s cubic-bezier(.4,0,.2,1)",
                  }}
                >
                  <Image src={it.src} alt={it.label} fill unoptimized sizes="320px" style={{ objectFit: "cover", objectPosition: "center top" }} />
                </div>
              ))}
            </DeviceFrame>
          </div>
        ) : (
          /* stacked, crossfading pre-framed devices */
          items.map((it, i) => (
            <div
              key={i}
              aria-hidden={i !== active}
              style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: isMobile ? "1.75rem 0" : "2.25rem 0",
                opacity: i === active ? 1 : 0,
                transform: i === active ? "scale(1)" : "scale(1.06)",
                transition: "opacity .6s cubic-bezier(.4,0,.2,1), transform .8s cubic-bezier(.4,0,.2,1)",
                pointerEvents: "none",
              }}
            >
              <Image
                src={it.src}
                alt={it.label}
                fill
                unoptimized
                sizes="(max-width: 768px) 80vw, 420px"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))
        )}
      </div>

      {/* ── Caption ── */}
      <div style={{ minHeight: "2.6rem", textAlign: "center", marginTop: "1.5rem" }}>
        <p
          key={`cap-${active}`}
          style={{
            fontSize: ".95rem", color: "rgba(255,255,255,.62)", lineHeight: 1.55,
            maxWidth: 520, margin: "0 auto", animation: "ds-fade .5s ease",
          }}
        >
          {items[active].caption}
        </p>
      </div>

      {/* ── Segmented control ── */}
      <div
        style={{
          position: "relative", display: "flex", gap: 0, margin: "1.5rem auto 0",
          maxWidth: n > 2 ? 460 : 360, padding: 5, borderRadius: 100,
          background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.09)",
        }}
      >
        {/* sliding pill */}
        <div
          style={{
            position: "absolute", top: 5, bottom: 5, left: 5,
            width: `calc((100% - 10px) / ${n})`,
            transform: `translateX(${active * 100}%)`,
            borderRadius: 100, background: "#fff",
            transition: "transform .45s cubic-bezier(.4,0,.2,1)",
            boxShadow: "0 2px 12px rgba(0,0,0,.35)",
          }}
        />
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              position: "relative", zIndex: 1, flex: 1, padding: ".7rem .5rem",
              border: "none", background: "transparent", cursor: "pointer",
              fontSize: ".82rem", fontWeight: 600, letterSpacing: "-.01em",
              color: i === active ? "#08080a" : "rgba(255,255,255,.65)",
              transition: "color .35s ease", whiteSpace: "nowrap",
            }}
          >
            {it.label}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes ds-fade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
