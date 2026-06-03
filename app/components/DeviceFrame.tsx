"use client";
import { ReactNode } from "react";

/* Code-drawn iPhone 17 Pro frame. Wrap a RAW app screen (no baked-in mockup)
   or any children (e.g. a live <iframe> Figma prototype). Themeable titanium.
   Upload just the screen — the frame is drawn in CSS, sharp at any size. */

const FINISHES: Record<string, { body: string; rail: string }> = {
  titanium: { body: "linear-gradient(145deg,#43433f 0%,#1d1d1f 42%,#33332f 100%)", rail: "#6c6c66" },
  black:    { body: "linear-gradient(145deg,#3a3a3d 0%,#0c0c0e 45%,#2a2a2d 100%)", rail: "#5a5a5e" },
  blue:     { body: "linear-gradient(145deg,#46566b 0%,#1b2330 45%,#34465c 100%)", rail: "#6d8199" },
  desert:   { body: "linear-gradient(145deg,#c8a07a 0%,#8a6845 45%,#b89067 100%)", rail: "#d8b893" },
};

export default function DeviceFrame({
  src,
  alt = "",
  children,
  width = 280,
  finish = "titanium",
  objectPosition = "center top",
}: {
  src?: string;
  alt?: string;
  children?: ReactNode;
  width?: number;
  finish?: keyof typeof FINISHES;
  objectPosition?: string;
}) {
  const f = FINISHES[finish] ?? FINISHES.titanium;
  const bezel = Math.max(6, Math.round(width * 0.033));
  const bodyRadius = Math.round(width * 0.165);
  const screenRadius = Math.round(width * 0.125);
  const islandW = Math.round(width * 0.30);
  const islandH = Math.round(width * 0.085);

  return (
    <div
      style={{
        position: "relative",
        width,
        aspectRatio: "0.487",
        borderRadius: bodyRadius,
        background: f.body,
        padding: bezel,
        boxShadow:
          "0 50px 80px rgba(0,0,0,.55), 0 18px 36px rgba(0,0,0,.4), inset 0 0 0 1.5px rgba(255,255,255,.14), inset 0 0 0 3px rgba(0,0,0,.35)",
      }}
    >
      {/* side rails (buttons) */}
      <span style={railStyle(f.rail, "left", "21%", "4.5%")} />
      <span style={railStyle(f.rail, "left", "30%", "9%")} />
      <span style={railStyle(f.rail, "left", "41%", "9%")} />
      <span style={railStyle(f.rail, "right", "32%", "13%")} />

      {/* screen */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: screenRadius,
          overflow: "hidden",
          background: "#000",
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block" }}
          />
        ) : (
          children
        )}

        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: Math.round(width * 0.04),
            left: "50%",
            transform: "translateX(-50%)",
            width: islandW,
            height: islandH,
            background: "#000",
            borderRadius: islandH,
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: islandH * 0.45,
          }}
        >
          <span style={{ width: islandH * 0.32, height: islandH * 0.32, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #2b3a4a, #05080c)" }} />
        </div>
      </div>
    </div>
  );
}

function railStyle(color: string, side: "left" | "right", top: string, height: string): React.CSSProperties {
  return {
    position: "absolute",
    [side]: -1.5,
    top,
    height,
    width: 3,
    background: color,
    borderRadius: 3,
    [side === "left" ? "borderTopLeftRadius" : "borderTopRightRadius"]: 3,
    zIndex: 0,
  } as React.CSSProperties;
}
