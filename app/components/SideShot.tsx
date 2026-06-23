"use client";
import Image from "next/image";
import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";
import ScrollReveal from "./ScrollReveal";

/* Editorial side-bleed device: a huge notebook enters from one page edge
   (the side you can't see), sliding + fading in as you scroll, with the copy
   sitting in the open space on the other side. No card box, no border. */

function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh;
      const end = vh * 0.32;
      const raw = (start - r.top) / (start - end);
      setP(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p] as const;
}

const easeOut = (p: number) => 1 - Math.pow(1 - p, 2);

export const GLOWS: Record<string, string> = {
  blue:   "radial-gradient(ellipse 60% 58% at 50% 42%, rgba(234,179,8,.42), transparent 68%)",
  violet: "radial-gradient(ellipse 60% 58% at 50% 42%, rgba(217,148,0,.40), transparent 68%)",
  green:  "radial-gradient(ellipse 60% 58% at 50% 42%, rgba(0,200,160,.38), transparent 68%)",
  pink:   "radial-gradient(ellipse 60% 58% at 50% 42%, rgba(255,82,140,.38), transparent 68%)",
  gold:   "radial-gradient(ellipse 60% 58% at 50% 42%, rgba(234,179,8,.42), transparent 68%)",
  amber:  "radial-gradient(ellipse 60% 58% at 50% 42%, rgba(217,148,0,.40), transparent 68%)",
};

export default function SideShot({
  src,
  alt,
  side,
  eyebrow,
  title,
  body,
  metric,
  glow = "blue",
  isMobile = false,
  width = 2145,
  height = 1300,
}: {
  src: string;
  alt: string;
  side: "left" | "right";
  eyebrow?: string;
  title: ReactNode;
  body: string;
  metric?: { n: string; l: string };
  glow?: keyof typeof GLOWS;
  isMobile?: boolean;
  width?: number;
  height?: number;
}) {
  const glowBg = glow ? GLOWS[glow] : null;
  const [slideRef, sp] = useScrollProgress<HTMLDivElement>();
  const e = easeOut(sp);
  const dir = side === "left" ? -1 : 1;
  const slideStyle: CSSProperties = isMobile
    ? {}
    : {
        // slide in from the page edge AND grow from smaller to full size
        transform: `translateX(${(1 - e) * dir * 30}%) scale(${0.88 + e * 0.12})`,
        transformOrigin: side === "left" ? "left center" : "right center",
        opacity: 0.2 + 0.8 * e,
        willChange: "transform, opacity",
      };

  const img = (
    <div ref={slideRef} style={{ position: "relative", zIndex: 0, ...slideStyle }}>
      {glowBg && <div aria-hidden style={{ position: "absolute", inset: "-14%", background: glowBg, filter: "blur(65px)", pointerEvents: "none" }} />}
      <Image src={src} alt={alt} width={width} height={height} unoptimized sizes="80vw"
        style={{ width: "100%", height: "auto", display: "block", position: "relative", filter: "drop-shadow(0 40px 80px rgba(0,0,0,.6))" }} />
    </div>
  );

  const txt = (
    <div style={{ maxWidth: 440 }}>
      {eyebrow && <p style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#eab308", marginBottom: ".9rem" }}>{eyebrow}</p>}
      <h3 style={{ fontSize: isMobile ? "1.5rem" : "clamp(1.6rem,2.6vw,2.4rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", lineHeight: 1.12, marginBottom: "1rem" }}>{title}</h3>
      <p style={{ fontSize: isMobile ? ".92rem" : "1.02rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>{body}</p>
      {metric && (
        <div style={{ marginTop: "1.75rem", display: "inline-flex", alignItems: "baseline", gap: ".6rem", padding: ".7rem 1.1rem", borderRadius: 12, border: "1px solid rgba(234,179,8,.3)", background: "rgba(234,179,8,.06)" }}>
          <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "#eab308", letterSpacing: "-.03em", lineHeight: 1 }}>{metric.n}</span>
          <span style={{ fontSize: ".75rem", color: "rgba(255,255,255,.5)", letterSpacing: ".04em" }}>{metric.l}</span>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <ScrollReveal>
        <div>
          {txt}
          <div style={{ marginTop: "1.75rem", marginRight: side === "right" ? "-1.5rem" : 0, marginLeft: side === "left" ? "-1.5rem" : 0 }}>{img}</div>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal>
      <div style={{ display: "grid", gridTemplateColumns: side === "left" ? "1.26fr 0.74fr" : "0.74fr 1.26fr", alignItems: "center", gap: "clamp(1.5rem,4vw,4rem)", maxWidth: 1500, margin: "0 auto" }}>
        {side === "left" ? (
          <>
            <div style={{ marginLeft: "-20%", marginRight: "-4%" }}>{img}</div>
            <div style={{ paddingRight: "clamp(1rem,3vw,3rem)" }}>{txt}</div>
          </>
        ) : (
          <>
            <div style={{ paddingLeft: "clamp(1rem,3vw,3rem)", display: "flex", justifyContent: "flex-end" }}>{txt}</div>
            <div style={{ marginRight: "-20%", marginLeft: "-4%" }}>{img}</div>
          </>
        )}
      </div>
    </ScrollReveal>
  );
}
