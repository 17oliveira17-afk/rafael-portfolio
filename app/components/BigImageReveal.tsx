"use client";
import Image from "next/image";
import { useRef, useState, useEffect, ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";
import useIsMobile from "./useIsMobile";

/**
 * Apple-style full-bleed cinematic banner.
 * The image enters bright and high-quality, then darkens as it scrolls
 * toward the center of the viewport — so the overlaid text lands on a
 * dark, legible backdrop exactly when it's being read.
 */
export default function BigImageReveal({
  src,
  alt,
  caption,
  overlay,
  minHeight = "70vh",
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  overlay?: ReactNode;
  minHeight?: string;
  objectPosition?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const effectiveHeight = isMobile ? "100svh" : minHeight;

  // Scroll progress: 0 as the section enters, 1 when it sits at viewport center.
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = r.top + r.height / 2;
      const dist = Math.abs(center - vh / 2) / (vh / 2 + r.height / 2);
      setProg(Math.max(0, Math.min(1, 1 - dist)));
    };
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    fn();
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);

  const ease = 1 - Math.pow(1 - prog, 3);
  const darkA = 0.32 + 0.46 * ease;   // 0.32 (bright, image shows off) → 0.78 (dark, text legible)
  const scale = 1.06 - 0.06 * ease;   // gentle zoom-out settle as it darkens

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
            style={{ objectFit: "cover", objectPosition, transform: `scale(${scale})`, willChange: "transform" }}
            sizes="100vw"
            priority={false}
          />

          {/* scroll-driven darkening for text legibility */}
          {overlay && (
            <>
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(180deg, rgba(0,0,0,${(darkA * 0.9).toFixed(3)}) 0%, rgba(0,0,0,${(darkA * 0.72).toFixed(3)}) 45%, rgba(0,0,0,${Math.min(1, darkA * 1.05).toFixed(3)}) 100%)`,
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse 72% 62% at 50% 50%, rgba(0,0,0,${(0.28 * ease).toFixed(3)}) 0%, transparent 68%)`,
                pointerEvents: "none",
              }} />
            </>
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
