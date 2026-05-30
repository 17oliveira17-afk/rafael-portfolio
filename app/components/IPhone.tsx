"use client";
import Image from "next/image";

/**
 * iPhone 16 Pro mockup — uses real Apple reference PNG with transparent frame
 * Mockup dimensions: 644 × 1324
 * Screen safe area inside frame: 28,48 → 616,1276 (588 × 1228)
 */
export default function IPhone({
  src,
  alt = "",
  width = 280,
  style = {},
}: {
  src?: string;
  alt?: string;
  width?: number;
  style?: React.CSSProperties;
}) {
  const height = width * (1324 / 644);

  // Screen rect as % of mockup dimensions
  const SCREEN = {
    left: (28 / 644) * 100,        // ≈ 4.35%
    top: (48 / 1324) * 100,        // ≈ 3.62%
    right: ((644 - 616) / 644) * 100,  // ≈ 4.35%
    bottom: ((1324 - 1276) / 1324) * 100, // ≈ 3.62%
  };
  // Screen corner radius (matches iPhone 16 Pro screen radius scaled to mockup)
  const cornerRadiusPx = (88 / 644) * width;

  return (
    <div style={{ width, height, position: "relative", display: "inline-block", ...style }}>
      {/* Screen content (sits behind, clipped to screen area with rounded corners) */}
      {src && (
        <div style={{
          position: "absolute",
          left:   `${SCREEN.left}%`,
          top:    `${SCREEN.top}%`,
          right:  `${SCREEN.right}%`,
          bottom: `${SCREEN.bottom}%`,
          borderRadius: cornerRadiusPx,
          overflow: "hidden",
          background: "#fff",
        }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`${width}px`}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      )}

      {/* iPhone frame mockup on top */}
      <Image
        src="/iphone-mockup.png"
        alt=""
        fill
        sizes={`${width}px`}
        style={{ pointerEvents: "none", objectFit: "contain" }}
        priority
      />
    </div>
  );
}
