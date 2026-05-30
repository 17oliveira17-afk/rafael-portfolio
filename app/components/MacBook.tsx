"use client";
import Image from "next/image";

/**
 * MacBook Pro 14" M4 mockup — uses real Apple reference photo
 * Mockup dimensions: 2200 × 1340
 * Screen safe area: 165,25 → 2035,1158 (1870 × 1133)
 */
export default function MacBook({
  src,
  alt = "",
  width = 1100,
  style = {},
}: {
  src?: string;
  alt?: string;
  width?: number;
  style?: React.CSSProperties;
}) {
  const height = width * (1340 / 2200);

  const SCREEN = {
    left: (165 / 2200) * 100,            // ≈ 7.5%
    top:  (25 / 1340) * 100,             // ≈ 1.86%
    right: ((2200 - 2035) / 2200) * 100, // ≈ 7.5%
    bottom: ((1340 - 1158) / 1340) * 100, // ≈ 13.58% (includes keyboard base)
  };
  const cornerRadiusPx = (22 / 2200) * width;

  return (
    <div style={{ width, height, position: "relative", display: "inline-block", ...style }}>
      {/* Screen content */}
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

      {/* MacBook frame mockup on top */}
      <Image
        src="/macbook-mockup.jpg"
        alt=""
        fill
        sizes={`${width}px`}
        style={{ pointerEvents: "none", objectFit: "contain" }}
        priority
      />
    </div>
  );
}
