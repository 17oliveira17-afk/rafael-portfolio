"use client";
import { useId } from "react";
import Image from "next/image";

/**
 * iPhone 16 Pro mockup — pure SVG, identical to Apple reference photo.
 * - Outside the device: transparent
 * - Inside the screen: slot where the screenshot appears
 * - Frame, bezel, Dynamic Island, buttons all drawn in SVG
 *
 * ViewBox: 1206 × 2622 (device dimensions × 2, matches iPhone 16 Pro proportions)
 * Screen safe area: x=60→1146, y=60→2562 (1086 × 2502) with corner radius 168
 */
export default function IPhone({
  src,
  alt = "",
  width = 280,
  color = "natural",
  style = {},
}: {
  src?: string;
  alt?: string;
  width?: number;
  color?: "natural" | "black" | "white" | "desert";
  style?: React.CSSProperties;
}) {
  const height = width * (2622 / 1206);
  const id = useId().replace(/:/g, "");

  // Frame color palette — Black Titanium (matches Apple reference)
  const palettes = {
    natural: { c1: "#88898c", c2: "#5a5b5e", c3: "#2c2d2f", c4: "#1a1b1d", edge: "#0e0e10" },
    black:   { c1: "#3a3a3c", c2: "#28282a", c3: "#18181a", c4: "#0e0e10", edge: "#000000" },
    white:   { c1: "#f5f5f7", c2: "#e0e0e2", c3: "#c0c0c2", c4: "#a0a0a2", edge: "#888" },
    desert:  { c1: "#c2a585", c2: "#a0825f", c3: "#7a604a", c4: "#5a4438", edge: "#2c1f17" },
  };
  const p = palettes[color];

  // Screen rectangle in viewBox space
  const SX = 60, SY = 60, SW = 1086, SH = 2502, SR = 168;

  return (
    <div style={{ width, height, position: "relative", display: "inline-block", ...style }}>
      <svg
        viewBox="0 0 1206 2622"
        width="100%" height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer titanium frame gradient — multi-stop for realistic light reflection */}
          <linearGradient id={`frame-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"    stopColor={p.edge} />
            <stop offset="1.2%"  stopColor={p.c3} />
            <stop offset="3%"    stopColor={p.c4} />
            <stop offset="5%"    stopColor={p.c2} />
            <stop offset="8%"    stopColor={p.c1} />
            <stop offset="50%"   stopColor={p.c3} />
            <stop offset="92%"   stopColor={p.c1} />
            <stop offset="95%"   stopColor={p.c2} />
            <stop offset="97%"   stopColor={p.c4} />
            <stop offset="98.8%" stopColor={p.c3} />
            <stop offset="100%"  stopColor={p.edge} />
          </linearGradient>

          {/* Inner bezel (the thin ring between titanium and screen) */}
          <linearGradient id={`bezel-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#0a0a0a" />
            <stop offset="50%"  stopColor="#000000" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>

          {/* Button shading */}
          <linearGradient id={`btn-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={p.edge} />
            <stop offset="35%"  stopColor={p.c2} />
            <stop offset="65%"  stopColor={p.c1} />
            <stop offset="100%" stopColor={p.edge} />
          </linearGradient>

          {/* Top corner highlight (the silvery edge catch) */}
          <linearGradient id={`hi-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#c8c8cc" stopOpacity="0.5" />
            <stop offset="20%" stopColor="#c8c8cc" stopOpacity="0" />
          </linearGradient>

          {/* Camera lens gradient */}
          <radialGradient id={`lens-${id}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="#1c2848" />
            <stop offset="40%"  stopColor="#0a1024" />
            <stop offset="70%"  stopColor="#000" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>

          {/* Glass glare on screen */}
          <linearGradient id={`glare-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#fff" stopOpacity="0.08" />
            <stop offset="35%"  stopColor="#fff" stopOpacity="0" />
            <stop offset="65%"  stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.04" />
          </linearGradient>

          {/* Screen clip path with proper corner radius */}
          <clipPath id={`clip-${id}`}>
            <rect x={SX} y={SY} width={SW} height={SH} rx={SR} ry={SR} />
          </clipPath>
        </defs>

        {/* ─── SIDE BUTTONS ─── */}
        {/* Left: Action button */}
        <rect x="-6" y="380"  width="14" height="60"  rx="4" fill={`url(#btn-${id})`} />
        {/* Left: Volume Up */}
        <rect x="-6" y="540"  width="14" height="140" rx="4" fill={`url(#btn-${id})`} />
        {/* Left: Volume Down */}
        <rect x="-6" y="720"  width="14" height="140" rx="4" fill={`url(#btn-${id})`} />
        {/* Right: Power / Camera Control */}
        <rect x="1198" y="640" width="14" height="200" rx="4" fill={`url(#btn-${id})`} />

        {/* ─── OUTER TITANIUM FRAME ─── */}
        <rect
          x="8" y="0"
          width="1190" height="2622"
          rx="200" ry="200"
          fill={`url(#frame-${id})`}
        />

        {/* Top reflective highlight on titanium */}
        <rect
          x="8" y="0"
          width="1190" height="180"
          rx="200" ry="200"
          fill={`url(#hi-${id})`}
        />

        {/* ─── INNER BEZEL (thin black ring around screen) ─── */}
        <rect
          x="36" y="36"
          width="1134" height="2550"
          rx="174" ry="174"
          fill={`url(#bezel-${id})`}
        />

        {/* ─── SCREEN AREA (transparent slot for screenshot) ─── */}
        <rect
          x={SX} y={SY}
          width={SW} height={SH}
          rx={SR} ry={SR}
          fill="#000"
        />

        {/* Screen content (foreignObject lets us put an HTML img with cover crop) */}
        {src && (
          <foreignObject
            x={SX} y={SY}
            width={SW} height={SH}
            clipPath={`url(#clip-${id})`}
          >
            <div style={{
              width: "100%", height: "100%", overflow: "hidden",
              borderRadius: `${SR}px`,
            }}>
              <Image
                src={src}
                alt={alt}
                width={SW}
                height={SH}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
          </foreignObject>
        )}

        {/* ─── DYNAMIC ISLAND ─── */}
        <rect
          x="446" y="92"
          width="314" height="100"
          rx="50" ry="50"
          fill="#000"
        />
        {/* Front camera (left circle in island) */}
        <circle cx="510" cy="142" r="14" fill="#0a0a0a" />
        <circle cx="510" cy="142" r="9"  fill={`url(#lens-${id})`} />
        {/* Face ID sensor (right circle in island) */}
        <circle cx="694" cy="142" r="18" fill="#0a0a0a" />
        <circle cx="694" cy="142" r="13" fill={`url(#lens-${id})`} />
        {/* Tiny lens reflection */}
        <circle cx="697" cy="138" r="3" fill="#3a4a6a" opacity="0.6" />
        {/* Privacy indicator dot (the green dot from reference) */}
        <circle cx="538" cy="138" r="4" fill="#52d273" opacity="0.95" />

        {/* ─── GLASS GLARE OVERLAY ─── */}
        <rect
          x={SX} y={SY}
          width={SW} height={SH}
          rx={SR} ry={SR}
          fill={`url(#glare-${id})`}
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}
