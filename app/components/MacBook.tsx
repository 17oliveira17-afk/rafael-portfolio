"use client";
import Image from "next/image";

/**
 * MacBook Pro Space Black mockup
 * Uses the uploaded SVG as the device frame.
 * Screen visible area: x=207.699, y=30.0889, width=1632, height=1056.72
 * ViewBox: 0 0 2048 1237
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
  color?: string; // kept for API compatibility
  style?: React.CSSProperties;
}) {
  const aspectRatio = 1237 / 2048;
  const height = width * aspectRatio;

  // Screen area in viewBox coords (visible screen, not the oversized pattern rect)
  const SX = 207.699, SY = 30.0889, SW = 1632, SH = 1056.72;
  const RX = 18; // rounded corners matching the SVG bezel rx

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        display: "inline-block",
        ...style,
      }}
    >
      {/* Screenshot sits behind the SVG frame */}
      {src && (
        <div
          style={{
            position: "absolute",
            top: `${(SY / 1237) * 100}%`,
            left: `${(SX / 2048) * 100}%`,
            width: `${(SW / 2048) * 100}%`,
            height: `${(SH / 1237) * 100}%`,
            borderRadius: `${(RX / 2048) * width}px`,
            overflow: "hidden",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      )}

      {/* SVG device frame on top */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/macbook-space-black.svg"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
