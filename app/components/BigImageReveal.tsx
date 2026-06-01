"use client";
import Image from "next/image";
import { useRef, ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";
import useIsMobile from "./useIsMobile";

/**
 * Apple-style full-bleed image with scale-in reveal.
 * Used between sections to break the page with cinematic visuals.
 */
export default function BigImageReveal({
  src,
  alt,
  caption,
  overlay,
  minHeight = "70vh",
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  overlay?: ReactNode;
  minHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const effectiveHeight = isMobile ? "100svh" : minHeight;

  return (
    <section className="full-bleed" style={{ background: "#000", padding: 0, position: "relative", overflow: "hidden" }}>
      <ScrollReveal type="in" style={{ width: "100%", display: "block" }}>
        <div
          ref={ref}
          style={{
            position: "relative",
            width: "100%",
            minHeight: effectiveHeight,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="100vw"
            priority={false}
          />

          {/* dark gradient for text legibility */}
          {overlay && (
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.65) 50%, rgba(0,0,0,.82) 100%)",
              pointerEvents: "none",
            }} />
          )}

          {overlay && (
            <div style={{
              position: "relative", zIndex: 2, textAlign: "center",
              color: "#fff", maxWidth: 900, padding: "0 1.5rem",
            }}>
              {overlay}
            </div>
          )}
        </div>
        {caption && (
          <p style={{
            fontSize: ".82rem", color: "#86868b", textAlign: "center",
            padding: "1.5rem 1.5rem 2rem", maxWidth: 600, margin: "0 auto",
          }}>
            {caption}
          </p>
        )}
      </ScrollReveal>
    </section>
  );
}
