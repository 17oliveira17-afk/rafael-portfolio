"use client";
import Image from "next/image";

/**
 * iPhone 17 Pro Deep Blue — PNG já inclui device frame + conteúdo.
 * Renderiza exatamente o PNG, sem overlay, sem clip, sem distorção.
 * Dimensões reais: 908 × 1880 px
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

  return (
    <Image
      src={src}
      alt={alt}
      width={908}
      height={1880}
      style={{
        width,
        height: "auto",
        display: "block",
        ...style,
      }}
    />
  );
}
