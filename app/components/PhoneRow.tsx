"use client";
import Image from "next/image";

/* A row of pre-framed phone screenshots (mockup already baked into the PNG)
   shown directly on the section's black background with a soft blue glow
   behind them — no card box, no border. On desktop the phones sit centered
   side by side; on mobile they become a horizontal, snap-scrolling strip. */

export type RowItem = { src: string; alt?: string; caption?: string };

export default function PhoneRow({
  items,
  isMobile = false,
  width = 300,
}: {
  items: RowItem[];
  isMobile?: boolean;
  width?: number;
}) {
  return (
    <div style={{ position: "relative" }}>
      {/* blue glow behind the phones */}
      <div
        style={{
          position: "absolute",
          inset: isMobile ? "0" : "-10% -5%",
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,113,227,.20) 0%, transparent 65%)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          gap: isMobile ? "1.25rem" : "2.5rem",
          justifyContent: isMobile ? "flex-start" : "center",
          alignItems: "flex-start",
          overflowX: isMobile ? "auto" : "visible",
          scrollSnapType: isMobile ? "x mandatory" : undefined,
          padding: isMobile ? "1rem 1.5rem 1.5rem" : "1rem 0",
          margin: isMobile ? "0 -1.5rem" : 0,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
        className="phone-row-scroll"
      >
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 auto",
              width: isMobile ? "72vw" : width,
              maxWidth: isMobile ? 320 : undefined,
              scrollSnapAlign: "center",
            }}
          >
            <Image
              src={it.src}
              alt={it.alt || ""}
              width={800}
              height={1650}
              unoptimized
              sizes={isMobile ? "72vw" : `${width}px`}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                filter: "drop-shadow(0 34px 70px rgba(0,0,0,.55))",
              }}
            />
            {it.caption && (
              <p
                style={{
                  marginTop: "1.25rem",
                  textAlign: "center",
                  fontSize: ".9rem",
                  color: "rgba(255,255,255,.55)",
                  lineHeight: 1.6,
                }}
              >
                {it.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .phone-row-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
