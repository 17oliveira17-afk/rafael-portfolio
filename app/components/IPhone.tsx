"use client";

/**
 * iPhone 17 Pro Deep Blue — PNG já inclui device frame + conteúdo.
 * mix-blend-mode: screen faz o preto (#000) virar transparente em qualquer fundo,
 * preservando a borda do device e o conteúdo da tela 100%.
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
      style={{
        width,
        height: "auto",
        display: "block",
        mixBlendMode: "screen",
        ...style,
      }}
    />
  );
}
