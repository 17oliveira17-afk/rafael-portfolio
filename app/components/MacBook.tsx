"use client";
import Image from "next/image";

/**
 * MacBook component — renders a PNG that already includes
 * the device frame + content (MacBook Air 2022 mockup PNGs).
 * Simple, lightweight, pixel-perfect.
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
  color?: string;
  style?: React.CSSProperties;
}) {
  if (!src) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: width,
        margin: "0 auto",
        display: "block",
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={880}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
        priority={false}
      />
    </div>
  );
}
