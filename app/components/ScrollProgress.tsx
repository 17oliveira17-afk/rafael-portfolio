"use client";
import { useEffect, useRef } from "react";

/* A thin reading-progress bar pinned to the very top of the viewport.
   Fills left→right as you scroll the page — a subtle, premium signal that
   ties the whole experience together. Desktop and mobile. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
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

  return (
    <div aria-hidden style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 300, pointerEvents: "none" }}>
      <div
        ref={ref}
        style={{
          height: "100%",
          width: "100%",
          transformOrigin: "0 50%",
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, #0071e3, #4aa3ff)",
          boxShadow: "0 0 12px rgba(0,113,227,.6)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
