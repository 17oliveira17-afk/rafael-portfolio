"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* A large "process artifact" — a benchmark board, wireframe, or flow map.
   These are the THINKING, not the product, so they're shown as flat documents
   (no device frame), big, sliding in from one side with a desaturate→color
   reveal that reads as "this is where the work came from." Alternate `reverse`
   between consecutive artifacts so they enter from opposite sides. */

export default function ArtifactReveal({
  src,
  eyebrow,
  title,
  body,
  metric,
  reverse = false,
  ratio = "16 / 10",
  isMobile = false,
}: {
  src: string;
  eyebrow?: string;
  title: string;
  body: string;
  metric?: { n: string; l: string };
  reverse?: boolean;
  ratio?: string;
  isMobile?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.22 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const slideFrom = reverse ? 70 : -70;

  const artifact = (
    <div
      style={{
        transform: isMobile ? "none" : shown ? "translateX(0)" : `translateX(${slideFrom}px)`,
        opacity: shown ? 1 : 0,
        filter: shown ? "grayscale(0)" : "grayscale(.65)",
        transition:
          "transform 1.1s cubic-bezier(.16,1,.3,1), opacity 1s ease, filter 1.3s ease",
        willChange: "transform, opacity, filter",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: ratio,
          borderRadius: 18,
          overflow: "hidden",
          background: "#0b0b0e",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 36px 80px rgba(0,0,0,.55), 0 12px 30px rgba(0,0,0,.4)",
          padding: 14,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 8, overflow: "hidden" }}>
          <Image src={src} alt={title} fill unoptimized sizes="(max-width:768px) 90vw, 700px" style={{ objectFit: "contain" }} />
        </div>
        {/* subtle "old world" tint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(0,113,227,.05), transparent 40%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );

  const text = (
    <div
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: "opacity .9s ease .15s, transform .9s cubic-bezier(.16,1,.3,1) .15s",
      }}
    >
      {eyebrow && (
        <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1rem" }}>
          {eyebrow}
        </p>
      )}
      <h3 style={{ fontSize: "clamp(1.4rem,2.4vw,2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.02em", lineHeight: 1.1, marginBottom: "1rem" }}>
        {title}
      </h3>
      <p style={{ fontSize: ".98rem", color: "rgba(255,255,255,.55)", lineHeight: 1.75 }}>{body}</p>
      {metric && (
        <div style={{ marginTop: "1.75rem", display: "inline-flex", alignItems: "baseline", gap: ".6rem", padding: ".7rem 1.1rem", borderRadius: 12, border: "1px solid rgba(0,113,227,.3)", background: "rgba(0,113,227,.06)" }}>
          <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0071e3", letterSpacing: "-.03em", lineHeight: 1 }}>{metric.n}</span>
          <span style={{ fontSize: ".75rem", color: "rgba(255,255,255,.5)", letterSpacing: ".04em" }}>{metric.l}</span>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : reverse ? "0.82fr 1.18fr" : "1.18fr 0.82fr",
        gap: isMobile ? "2rem" : "4.5rem",
        alignItems: "center",
      }}
    >
      {isMobile ? (
        <>
          {artifact}
          {text}
        </>
      ) : reverse ? (
        <>
          {text}
          {artifact}
        </>
      ) : (
        <>
          {artifact}
          {text}
        </>
      )}
    </div>
  );
}
