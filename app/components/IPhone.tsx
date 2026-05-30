"use client";

/**
 * iPhone 17 Pro Deep Blue — PNG já inclui device frame + conteúdo.
 * Renderiza o PNG 100% sem nenhum blend mode ou filtro.
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{ width, height: "auto", display: "block", ...style }}
    />
  );
}
