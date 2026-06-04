"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* A huge "process artifact" shown inside a real MacBook mockup (PNG already
   includes the device frame). The laptop is oversized so it bleeds past the
   viewport edges, and it ZOOMS as you scroll through a pinned stage — the
   Apple product-shot move. Caption (eyebrow/title/body/metric) sits above,
   revealing as you enter. On mobile it degrades to a clean stacked image. */

export default function MacBookReveal({
  src,
  eyebrow,
  title,
  body,
  metric,
  isMobile = false,
  heightVh = 165,
}: {
  src: string;
  eyebrow?: string;
  title: string;
  body: string;
  metric?: { n: string; l: string };
  isMobile?: boolean;
  heightVh?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0..1 progress through the pinned stage
  const [capShown, setCapShown] = useState(false);

  useEffect(() => {
    const el = capRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setCapShown(true), obs.unobserve(el)),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-r.top, 0), Math.max(total, 1));
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile]);

  const caption = (
    <div
      ref={capRef}
      style={{
        maxWidth: 760,
        opacity: capShown ? 1 : 0,
        transform: capShown ? "translateY(0)" : "translateY(18px)",
        transition: "opacity .9s ease, transform .9s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {eyebrow && (
        <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1rem" }}>
          {eyebrow}
        </p>
      )}
      <h3 style={{ fontSize: "clamp(1.5rem,2.6vw,2.3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.02em", lineHeight: 1.08, marginBottom: "1.1rem" }}>
        {title}
      </h3>
      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.75 }}>{body}</p>
      {metric && (
        <div style={{ marginTop: "1.75rem", display: "inline-flex", alignItems: "baseline", gap: ".6rem", padding: ".7rem 1.1rem", borderRadius: 12, border: "1px solid rgba(0,113,227,.3)", background: "rgba(0,113,227,.06)" }}>
          <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0071e3", letterSpacing: "-.03em", lineHeight: 1 }}>{metric.n}</span>
          <span style={{ fontSize: ".75rem", color: "rgba(255,255,255,.5)", letterSpacing: ".04em" }}>{metric.l}</span>
        </div>
      )}
    </div>
  );

  /* ── Mobile: caption + static laptop ── */
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {caption}
        <div style={{ width: "112%", marginLeft: "-6%" }}>
          <Image src={src} alt={title} width={2145} height={1300} unoptimized sizes="112vw" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
    );
  }

  /* ── Desktop: caption, then a pinned laptop that zooms on scroll ── */
  const scale = 1.0 + p * 0.16; // zoom in 1.00 → 1.16
  const ty = (0.5 - p) * 46; // gentle rise as it zooms

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>{caption}</div>

      {/* full-bleed pinned zoom stage */}
      <div
        ref={wrapRef}
        style={{
          position: "relative",
          height: `${heightVh}vh`,
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: "min(118vw, 1700px)",
              transform: `translateY(${ty}px) scale(${scale})`,
              transition: "transform .12s linear",
              willChange: "transform",
              filter: "drop-shadow(0 50px 90px rgba(0,0,0,.6))",
            }}
          >
            <Image src={src} alt={title} width={2145} height={1300} unoptimized sizes="118vw" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
