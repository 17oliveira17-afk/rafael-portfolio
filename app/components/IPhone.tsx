"use client";
import { useId, ReactNode } from "react";

/**
 * iPhone 16 Pro SVG mockup (vector, scales infinitely)
 */
export default function IPhone({
  src,
  alt = "",
  width = 280,
  children,
  color = "natural",
  style = {},
}: {
  src?: string;
  alt?: string;
  width?: number;
  children?: ReactNode;
  color?: "natural" | "black" | "white" | "desert";
  style?: React.CSSProperties;
}) {
  const height = width * (2622 / 1206);

  const frames = {
    natural: { outer: "#5c5d62", mid: "#7c7d82", highlight: "#c8c9cc", shadow: "#3a3b3e" },
    black:   { outer: "#1a1a1c", mid: "#2a2a2c", highlight: "#4a4a4c", shadow: "#0a0a0a" },
    white:   { outer: "#e8e8e8", mid: "#f5f5f5", highlight: "#ffffff", shadow: "#c8c8c8" },
    desert:  { outer: "#a08673", mid: "#b89c87", highlight: "#d8c4af", shadow: "#7a6555" },
  };
  const f = frames[color];
  const rawId = useId();
  const id = rawId.replace(/:/g, ""); // useId returns IDs like ":r1:" which can break attr names

  return (
    <div style={{ width, height, position: "relative", display: "inline-block", ...style }}>
      <svg
        viewBox="0 0 1206 2622"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`frame-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={f.shadow} />
            <stop offset="3%"   stopColor={f.outer} />
            <stop offset="10%"  stopColor={f.mid} />
            <stop offset="50%"  stopColor={f.highlight} stopOpacity="0.4" />
            <stop offset="90%"  stopColor={f.mid} />
            <stop offset="97%"  stopColor={f.outer} />
            <stop offset="100%" stopColor={f.shadow} />
          </linearGradient>
          <linearGradient id={`bezel-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#1a1a1c" />
          </linearGradient>
          <linearGradient id={`glare-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id={`btn-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor={f.shadow} />
            <stop offset="50%" stopColor={f.highlight} />
            <stop offset="100%" stopColor={f.shadow} />
          </linearGradient>
          <clipPath id={`clip-${id}`}>
            <rect x="60" y="60" width="1086" height="2502" rx="168" ry="168" />
          </clipPath>
        </defs>

        {/* Side buttons */}
        <rect x="0" y="380"  width="8" height="60"  rx="3" fill={`url(#btn-${id})`} />
        <rect x="0" y="540"  width="8" height="140" rx="3" fill={`url(#btn-${id})`} />
        <rect x="0" y="720"  width="8" height="140" rx="3" fill={`url(#btn-${id})`} />
        <rect x="1198" y="640" width="8" height="200" rx="3" fill={`url(#btn-${id})`} />

        {/* Frame */}
        <rect x="8" y="0" width="1190" height="2622" rx="200" ry="200" fill={`url(#frame-${id})`} />
        {/* Inner bezel */}
        <rect x="36" y="36" width="1134" height="2550" rx="174" ry="174" fill={`url(#bezel-${id})`} />
        {/* Black screen */}
        <rect x="60" y="60" width="1086" height="2502" rx="168" ry="168" fill="#000" />

        {/* Screen image */}
        {src && (
          <image
            href={src}
            x="60" y="60"
            width="1086" height="2502"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#clip-${id})`}
          />
        )}

        {/* Dynamic Island */}
        <rect x="446" y="92" width="314" height="100" rx="50" ry="50" fill="#000" />
        <circle cx="690" cy="142" r="14" fill="#1a1a1c" />
        <circle cx="690" cy="142" r="10" fill="#0a0a0a" />
        <circle cx="694" cy="138" r="3" fill="#2a3a5a" opacity="0.6" />

        {/* Glare overlay */}
        <rect x="60" y="60" width="1086" height="2502" rx="168" ry="168" fill={`url(#glare-${id})`} pointerEvents="none" />
      </svg>

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
