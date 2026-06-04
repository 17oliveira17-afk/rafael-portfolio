"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* A stack of "combo" triptychs — three product screens composited into one
   wide panel (titles + phone mockups already baked into the PNG). Each panel
   rises + scales into place as it enters, and drifts with a gentle scroll
   parallax so the section feels alive without competing with the screens.
   On mobile the composites are kept as-is (best image quality) with a clean
   fade-in. */

type Combo = { src: string; alt: string };

function Panel({ src, alt, isMobile, index }: { src: string; alt: string; isMobile: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [drift, setDrift] = useState(0); // -1..1 parallax as it crosses viewport

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), obs.unobserve(el)),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2;
      setDrift(Math.max(-1, Math.min(1, (vh / 2 - center) / vh)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile]);

  const py = isMobile ? 0 : drift * 22; // gentle parallax drift
  const enter = shown ? 0 : 36;
  const scale = shown ? 1 : 0.97;

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: `translateY(${enter + py}px) scale(${scale})`,
        transition: "opacity 1s ease, transform 1.1s cubic-bezier(.16,1,.3,1)",
        willChange: "transform, opacity",
        borderRadius: 22,
        overflow: "hidden",
        background: "#1f1e21",
        border: "1px solid rgba(255,255,255,.07)",
        boxShadow: "0 40px 90px rgba(0,0,0,.55), 0 14px 34px rgba(0,0,0,.4)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={1438}
        height={1096}
        unoptimized
        sizes="(max-width:768px) 92vw, 1100px"
        priority={index === 0}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}

export default function ComboReveal({ items, isMobile = false }: { items: Combo[]; isMobile?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "2rem" : "2.5rem" }}>
      {items.map((it, i) => (
        <Panel key={i} src={it.src} alt={it.alt} isMobile={isMobile} index={i} />
      ))}
    </div>
  );
}
