"use client";
import { ReactNode } from "react";

/**
 * MacBook Pro 14" M4 SVG mockup
 * Physical: 14.2" display, 3024×1964 native, 16:10.36 aspect
 * SVG canvas: 2400 wide × 1430 tall (incl. base/lid)
 * Screen area: 200,80 → 2200,1320 (2000×1240)
 * Space Black titanium body
 */
export default function MacBook({
  src,
  alt = "",
  width = 1100,
  children,
  color = "space-black", // "space-black" | "silver"
  style = {},
}: {
  src?: string;
  alt?: string;
  width?: number;
  children?: ReactNode;
  color?: "space-black" | "silver";
  style?: React.CSSProperties;
}) {
  const height = width * (1430 / 2400);

  const palette = {
    "space-black": {
      lid: "#1a1a1d", lidEdge: "#0a0a0c", lidHi: "#2a2a2e",
      base: "#181819", baseEdge: "#0a0a0c", baseHi: "#252528",
      hinge: "#0c0c0e",
    },
    silver: {
      lid: "#c8c8cc", lidEdge: "#a0a0a4", lidHi: "#e8e8ec",
      base: "#b8b8bc", baseEdge: "#909094", baseHi: "#d8d8dc",
      hinge: "#888",
    },
  };
  const p = palette[color];
  const id = `mb-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div style={{ width, height, position: "relative", ...style }}>
      <svg
        viewBox="0 0 2400 1430"
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0, display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Lid edge gradient — subtle bezel highlight */}
          <linearGradient id={`${id}-lid`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={p.lidEdge} />
            <stop offset="2%"   stopColor={p.lid} />
            <stop offset="50%"  stopColor={p.lidHi} stopOpacity="0.5" />
            <stop offset="98%"  stopColor={p.lid} />
            <stop offset="100%" stopColor={p.lidEdge} />
          </linearGradient>

          {/* Inner bezel — pure black */}
          <linearGradient id={`${id}-bezel`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>

          {/* Base (the bottom keyboard half - thin strip) */}
          <linearGradient id={`${id}-base`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={p.baseHi} />
            <stop offset="30%"  stopColor={p.base} />
            <stop offset="100%" stopColor={p.baseEdge} />
          </linearGradient>

          {/* Base side curve gradient */}
          <linearGradient id={`${id}-base-side`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={p.baseEdge} />
            <stop offset="50%"  stopColor={p.base} />
            <stop offset="100%" stopColor={p.baseEdge} />
          </linearGradient>

          {/* Screen glass reflection */}
          <linearGradient id={`${id}-glare`} x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="40%"  stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
          </linearGradient>

          {/* Shadow under laptop */}
          <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="#000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          {/* Clip path for screen */}
          <clipPath id={`${id}-screen-clip`}>
            <rect x="200" y="80" width="2000" height="1240" rx="22" ry="22" />
          </clipPath>
        </defs>

        {/* Subtle shadow below */}
        <ellipse cx="1200" cy="1420" rx="900" ry="20" fill={`url(#${id}-shadow)`} />

        {/* LID (the screen panel back) */}
        <rect
          x="135" y="0"
          width="2130" height="1340"
          rx="40" ry="40"
          fill={`url(#${id}-lid)`}
        />

        {/* Inner bezel */}
        <rect
          x="170" y="50"
          width="2060" height="1300"
          rx="28" ry="28"
          fill={`url(#${id}-bezel)`}
        />

        {/* Webcam notch (centered top) */}
        <rect
          x="1100" y="50"
          width="200" height="34"
          rx="17" ry="17"
          fill="#000"
        />
        {/* Webcam dot */}
        <circle cx="1200" cy="67" r="8" fill="#1a1a1c" />
        <circle cx="1200" cy="67" r="5" fill="#0a0a0a" />
        <circle cx="1203" cy="64" r="2" fill="#2a3a5a" opacity="0.5" />

        {/* Screen background (black behind content) */}
        <rect
          x="200" y="80"
          width="2000" height="1240"
          rx="22" ry="22"
          fill="#000"
        />

        {/* Screen content — clipped image */}
        {src && (
          <image
            href={src}
            x="200" y="80"
            width="2000" height="1240"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${id}-screen-clip)`}
          />
        )}

        {/* Glass glare overlay */}
        <rect
          x="200" y="80"
          width="2000" height="1240"
          rx="22" ry="22"
          fill={`url(#${id}-glare)`}
          pointerEvents="none"
        />

        {/* Hinge area — thin dark strip below the lid */}
        <rect x="100" y="1340" width="2200" height="14" fill={p.hinge} />

        {/* BASE — bottom of laptop (the keyboard housing seen from front) */}
        <path
          d="M 60 1354 L 2340 1354 Q 2360 1354 2358 1370 L 2330 1410 Q 2320 1425 2300 1425 L 100 1425 Q 80 1425 70 1410 L 42 1370 Q 40 1354 60 1354 Z"
          fill={`url(#${id}-base)`}
        />

        {/* Trackpad notch (centered indentation) */}
        <rect
          x="1080" y="1395"
          width="240" height="14"
          rx="3" ry="3"
          fill={p.baseEdge}
          opacity="0.6"
        />

        {/* Subtle base side highlights */}
        <rect x="60" y="1410" width="2280" height="2" fill={p.baseHi} opacity="0.3" />
      </svg>

      {/* HTML children slot */}
      {children && (
        <div style={{
          position: "absolute",
          top: `${(80 / 1430) * 100}%`,
          left: `${(200 / 2400) * 100}%`,
          right: `${(200 / 2400) * 100}%`,
          bottom: `${((1430 - 1320) / 1430) * 100}%`,
          borderRadius: `${(22 / 1430) * height}px`,
          overflow: "hidden",
          background: "#000",
        }}>
          {children}
        </div>
      )}

      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{alt}</span>
    </div>
  );
}
