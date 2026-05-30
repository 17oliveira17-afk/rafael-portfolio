"use client";
import Image from "next/image";

/**
 * iPhone 17 Pro Max Deep Blue mockup
 * Uses the uploaded SVG as the device frame.
 * The screenshot is overlaid on the screen area (x=44.209, y=34.8218, w=914.833, h=1987.46)
 * ViewBox: 0 0 990 2048
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
  color?: string; // kept for API compatibility
  style?: React.CSSProperties;
}) {
  const aspectRatio = 2048 / 990;
  const height = width * aspectRatio;

  // Screen area in viewBox coords
  const SX = 44.209, SY = 34.8218, SW = 914.833, SH = 1987.46;
  const RX = 100; // rounded corners for screen clip

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
            top: `${(SY / 2048) * 100}%`,
            left: `${(SX / 990) * 100}%`,
            width: `${(SW / 990) * 100}%`,
            height: `${(SH / 2048) * 100}%`,
            borderRadius: `${(RX / 990) * width}px`,
            overflow: "hidden",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      )}

      {/* SVG device frame on top */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/iphone-deep-blue.svg"
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
