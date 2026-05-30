"use client";
import { useId } from "react";
import Image from "next/image";

/**
 * MacBook Pro 14" M4 Space Black — pure SVG, identical to Apple reference photo.
 * - Outside the device: transparent
 * - Inside the screen: slot where screenshot appears
 * - Lid, bezel, notch, hinge, base all drawn in SVG
 *
 * ViewBox: 2400 × 1430 (matches MacBook Pro 14" proportions including base)
 * Screen safe area: x=200, y=80, w=2000, h=1240 with corner radius 22
 */
export default function MacBook({
  src,
  alt = "",
  width = 1100,
  color = "space-black",
  style = {},
}: {
  src?: string;
  alt?: string;
  width?: number;
  color?: "space-black" | "silver";
  style?: React.CSSProperties;
}) {
  const height = width * (1430 / 2400);
  const id = useId().replace(/:/g, "");

  // Color palette
  const palettes = {
    "space-black": {
      lidLight: "#2a2a2c", lidMid: "#18181a", lidDark: "#0a0a0c", lidEdge: "#000",
      baseLight: "#252527", baseMid: "#16161a", baseDark: "#0a0a0c", baseEdge: "#000",
      hinge: "#0a0a0c",
    },
    silver: {
      lidLight: "#e8e8ec", lidMid: "#c8c8cc", lidDark: "#a0a0a4", lidEdge: "#888",
      baseLight: "#d8d8dc", baseMid: "#b8b8bc", baseDark: "#909094", baseEdge: "#666",
      hinge: "#888",
    },
  };
  const p = palettes[color];

  const SX = 200, SY = 80, SW = 2000, SH = 1240, SR = 22;

  return (
    <div style={{ width: "100%", maxWidth: width, position: "relative", display: "block", margin: "0 auto", ...style }}>
      <svg
        viewBox="0 0 2400 1430"
        width="100%" height="auto"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Lid (back of screen) — subtle horizontal gradient for that aluminum sheen */}
          <linearGradient id={`lid-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={p.lidEdge} />
            <stop offset="1.5%" stopColor={p.lidDark} />
            <stop offset="3%"   stopColor={p.lidMid} />
            <stop offset="50%"  stopColor={p.lidLight} stopOpacity="0.6" />
            <stop offset="97%"  stopColor={p.lidMid} />
            <stop offset="98.5%" stopColor={p.lidDark} />
            <stop offset="100%" stopColor={p.lidEdge} />
          </linearGradient>

          {/* Inner bezel - pure black, slight gradient */}
          <linearGradient id={`bezel-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#000" />
            <stop offset="50%"  stopColor="#050505" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>

          {/* Base (the bottom keyboard housing seen from front) */}
          <linearGradient id={`base-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={p.baseLight} />
            <stop offset="35%"  stopColor={p.baseMid} />
            <stop offset="100%" stopColor={p.baseDark} />
          </linearGradient>

          {/* Base side-curve gradient */}
          <linearGradient id={`base-edge-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={p.baseEdge} />
            <stop offset="5%"   stopColor={p.baseDark} />
            <stop offset="50%"  stopColor={p.baseMid} />
            <stop offset="95%"  stopColor={p.baseDark} />
            <stop offset="100%" stopColor={p.baseEdge} />
          </linearGradient>

          {/* Screen glass glare */}
          <linearGradient id={`glare-${id}`} x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0%"   stopColor="#fff" stopOpacity="0.05" />
            <stop offset="40%"  stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.03" />
          </linearGradient>

          {/* Camera lens */}
          <radialGradient id={`lens-${id}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="#1c2848" />
            <stop offset="50%"  stopColor="#0a0e1a" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>

          {/* Soft bottom shadow */}
          <radialGradient id={`shadow-${id}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="#000" stopOpacity="0.45" />
            <stop offset="60%"  stopColor="#000" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          <clipPath id={`clip-${id}`}>
            <rect x={SX} y={SY} width={SW} height={SH} rx={SR} ry={SR} />
          </clipPath>
        </defs>

        {/* Bottom shadow */}
        <ellipse cx="1200" cy="1420" rx="950" ry="18" fill={`url(#shadow-${id})`} />

        {/* ─── LID (back of screen) ─── */}
        <rect
          x="135" y="0"
          width="2130" height="1340"
          rx="40" ry="40"
          fill={`url(#lid-${id})`}
        />

        {/* ─── INNER BEZEL (the dark border around screen) ─── */}
        <rect
          x="170" y="50"
          width="2060" height="1300"
          rx="28" ry="28"
          fill={`url(#bezel-${id})`}
        />

        {/* ─── WEBCAM NOTCH ─── */}
        <rect
          x="1100" y="50"
          width="200" height="34"
          rx="17" ry="17"
          fill="#000"
        />
        {/* Camera */}
        <circle cx="1200" cy="67" r="9" fill="#0a0a0a" />
        <circle cx="1200" cy="67" r="6" fill={`url(#lens-${id})`} />
        <circle cx="1202" cy="65" r="1.8" fill="#3a4a6a" opacity="0.5" />

        {/* ─── SCREEN BACKGROUND ─── */}
        <rect
          x={SX} y={SY}
          width={SW} height={SH}
          rx={SR} ry={SR}
          fill="#000"
        />

        {/* ─── SCREEN CONTENT SLOT ─── */}
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

        {/* ─── GLASS GLARE OVERLAY ─── */}
        <rect
          x={SX} y={SY}
          width={SW} height={SH}
          rx={SR} ry={SR}
          fill={`url(#glare-${id})`}
          pointerEvents="none"
        />

        {/* ─── HINGE (thin dark strip between lid and base) ─── */}
        <rect x="100" y="1340" width="2200" height="14" fill={p.hinge} />

        {/* ─── BASE (the bottom keyboard housing seen from front, slightly trapezoidal) ─── */}
        <path
          d="M 60 1354
             L 2340 1354
             Q 2360 1354 2358 1370
             L 2330 1410
             Q 2320 1425 2300 1425
             L 100 1425
             Q 80 1425 70 1410
             L 42 1370
             Q 40 1354 60 1354 Z"
          fill={`url(#base-${id})`}
        />
        {/* Trackpad/groove notch (small indentation centered front) */}
        <rect
          x="1080" y="1395"
          width="240" height="14"
          rx="3" ry="3"
          fill={p.baseEdge}
          opacity="0.6"
        />
        {/* Subtle base highlight */}
        <rect x="60" y="1410" width="2280" height="2" fill={p.baseLight} opacity="0.3" />
      </svg>
    </div>
  );
}
