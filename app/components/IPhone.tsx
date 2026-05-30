"use client";
import Image from "next/image";

/**
 * iPhone component — renders a PNG that already includes
 * the device frame + content (iPhone 17 Pro Deep Blue mockup PNGs).
 * Simple, lightweight, pixel-perfect.
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
  color?: string;
  style?: React.CSSProperties;
}) {
  if (!src) return null;
  const aspectRatio = 2096 / 990; // iPhone 17 Pro PNG dimensions
  const height = width * aspectRatio;

  return (
    <div style={{ width, height, display: "inline-block", flexShrink: 0, ...style }}>
      <Image
        src={src}
        alt={alt}
        width={990}
        height={2096}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}
