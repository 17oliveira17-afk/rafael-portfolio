"use client";
import { ReactNode } from "react";

/**
 * iPhone 16 Pro SVG mockup
 * - Real dimensions: 1206x2622 (×3 from physical 402×874 pt)
 * - Display safe area: 36px frame inset
 * - Corner radius: 200 (frame) / 168 (screen)
 * - Titanium frame with realistic gradients
 * - Pass <img>/<Image> as children to fill screen
 */
export default function IPhone({
  src,
  alt = "",
  width = 280,
  children,
  color = "natural", // "natural" | "black" | "white" | "desert"
  style = {},
}: {
  src?: string;
  alt?: string;
  width?: number;
  children?: ReactNode;
  color?: "natural" | "black" | "white" | "desert";
  style?: React.CSSProperties;
}) {
  // Aspect: 1206/2622 ≈ 0.4599
  const height = width * (2622 / 1206);

  const frames = {
    natural: { outer: "#5c5d62", mid: "#7c7d82", highlight: "#c8c9cc", shadow: "#3a3b3e" },
    black:   { outer: "#1a1a1c", mid: "#2a2a2c", highlight: "#4a4a4c", shadow: "#0a0a0a" },
    white:   { outer: "#e8e8e8", mid: "#f5f5f5", highlight: "#ffffff", shadow: "#c8c8c8" },
    desert:  { outer: "#a08673", mid: "#b89c87", highlight: "#d8c4af", shadow: "#7a6555" },
  };
  const f = frames[color];
  const id = `ip-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div style={{ width, height, position: "relative", ...style }}>
      <svg
        viewBox="0 0 1206 2622"
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0, display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Titanium frame gradient (vertical light source) */}
          <linearGradient id={`${id}-frame`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={f.shadow} />
            <stop offset="3%"   stopColor={f.outer} />
            <stop offset="10%"  stopColor={f.mid} />
            <stop offset="50%"  stopColor={f.highlight} stopOpacity="0.4" />
            <stop offset="90%"  stopColor={f.mid} />
            <stop offset="97%"  stopColor={f.outer} />
            <stop offset="100%" stopColor={f.shadow} />
          </linearGradient>

          {/* Inner bezel — uniform dark */}
          <linearGradient id={`${id}-bezel`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#1a1a1c" />
          </linearGradient>

          {/* Screen glass reflection */}
          <linearGradient id={`${id}-glare`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
          </linearGradient>

          {/* Side button highlight */}
          <linearGradient id={`${id}-btn`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor={f.shadow} />
            <stop offset="50%" stopColor={f.highlight} />
            <stop offset="100%" stopColor={f.shadow} />
          </linearGradient>

          {/* Clip path for screen content (rounded rect) */}
          <clipPath id={`${id}-screen-clip`}>
            <rect x="60" y="60" width="1086" height="2502" rx="168" ry="168" />
          </clipPath>
        </defs>

        {/* Side buttons (left: action + volume up + volume down) */}
        <rect x="0" y="380"  width="8" height="60"  rx="3" fill={`url(#${id}-btn)`} />
        <rect x="0" y="540"  width="8" height="140" rx="3" fill={`url(#${id}-btn)`} />
        <rect x="0" y="720"  width="8" height="140" rx="3" fill={`url(#${id}-btn)`} />
        {/* Right: power button */}
        <rect x="1198" y="640" width="8" height="200" rx="3" fill={`url(#${id}-btn)`} />

        {/* Outer titanium frame */}
        <rect
          x="8" y="0"
          width="1190" height="2622"
          rx="200" ry="200"
          fill={`url(#${id}-frame)`}
        />

        {/* Inner bezel (the black gap between frame and screen) */}
        <rect
          x="36" y="36"
          width="1134" height="2550"
          rx="174" ry="174"
          fill={`url(#${id}-bezel)`}
        />

        {/* Screen black (in case content fails to load) */}
        <rect
          x="60" y="60"
          width="1086" height="2502"
          rx="168" ry="168"
          fill="#000"
        />

        {/* Screen content slot — clipped */}
        {src && (
          <image
            href={src}
            x="60" y="60"
            width="1086" height="2502"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${id}-screen-clip)`}
          />
        )}

        {/* Dynamic Island */}
        <rect
          x="446" y="92"
          width="314" height="100"
          rx="50" ry="50"
          fill="#000"
        />
        {/* DI front-facing camera */}
        <circle cx="690" cy="142" r="14" fill="#1a1a1c" />
        <circle cx="690" cy="142" r="10" fill="#0a0a0a" />
        <circle cx="694" cy="138" r="3" fill="#2a3a5a" opacity="0.6" />

        {/* Glass reflection overlay */}
        <rect
          x="60" y="60"
          width="1086" height="2502"
          rx="168" ry="168"
          fill={`url(#${id}-glare)`}
          pointerEvents="none"
        />
      </svg>

      {/* If using as wrapper with HTML children inside screen */}
      {children && (
        <div style={{
          position: "absolute",
          top: `${(60 / 2622) * 100}%`,
          left: `${(60 / 1206) * 100}%`,
          right: `${(60 / 1206) * 100}%`,
          bottom: `${(60 / 2622) * 100}%`,
          borderRadius: `${(168 / 2622) * height}px`,
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
