"use client";
import Image from "next/image";
import { useRef, useState, useEffect, CSSProperties, ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";
import useIsMobile from "./useIsMobile";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function useScrollProgress<T extends HTMLElement>(): [React.RefObject<T | null>, number] {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const enter = window.innerHeight;
      setP(Math.max(0, Math.min(1, (enter - r.top) / (enter * 0.6))));
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return [ref, p];
}

export default function SideShotShared({ src, alt, side, eyebrow, title, body, accent = "#0071e3", dims }: {
  src: string; alt: string; side: "left" | "right"; eyebrow: string; title: ReactNode; body: string; accent?: string;
  dims?: { w: number; h: number };
}) {
  const isMobile = useIsMobile();
  const [slideRef, sp] = useScrollProgress<HTMLDivElement>();
  const e = easeOut(sp);
  const dir = side === "left" ? -1 : 1;
  const slideStyle: CSSProperties = isMobile
    ? {}
    : { transform: `translateX(${(1 - e) * dir * 28}%)`, opacity: 0.25 + 0.75 * e, willChange: "transform, opacity" };

  const img = (
    <div ref={slideRef} style={{ position: "relative", zIndex: 0, ...slideStyle }}>
      <div aria-hidden style={{ position: "absolute", inset: "-14%", background: `radial-gradient(ellipse at center, ${accent}22, transparent 65%)`, filter: "blur(65px)", pointerEvents: "none" }} />
      <Image src={src} alt={alt} width={dims?.w ?? 1408} height={dims?.h ?? 853} sizes="70vw"
        style={{ width: "100%", height: "auto", display: "block", position: "relative", filter: "drop-shadow(0 40px 70px rgba(0,0,0,.55))" }} />
    </div>
  );

  const txt = (
    <div style={{ maxWidth: 430 }}>
      <p style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: accent, marginBottom: ".9rem" }}>{eyebrow}</p>
      <h3 style={{ fontSize: isMobile ? "1.5rem" : "clamp(1.6rem,2.6vw,2.4rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", lineHeight: 1.12, marginBottom: "1rem" }}>{title}</h3>
      <p style={{ fontSize: isMobile ? ".92rem" : "1.02rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>{body}</p>
    </div>
  );

  if (isMobile) {
    return (
      <ScrollReveal type="up">
        <div style={{ padding: "0 1.5rem" }}>
          {txt}
          <div style={{ marginTop: "1.75rem", marginRight: side === "right" ? "-1.5rem" : 0, marginLeft: side === "left" ? "-1.5rem" : 0 }}>{img}</div>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal type="up">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "clamp(2rem,5vw,5rem)", maxWidth: 1400, margin: "0 auto" }}>
        {side === "left" ? (
          <>
            <div style={{ marginLeft: "-15%", marginRight: "-3%" }}>{img}</div>
            <div style={{ paddingRight: "clamp(1rem,4vw,4rem)" }}>{txt}</div>
          </>
        ) : (
          <>
            <div style={{ paddingLeft: "clamp(1rem,4vw,4rem)", display: "flex", justifyContent: "flex-end" }}>{txt}</div>
            <div style={{ marginRight: "-15%", marginLeft: "-3%" }}>{img}</div>
          </>
        )}
      </div>
    </ScrollReveal>
  );
}
