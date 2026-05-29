"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";
interface Props { children: ReactNode; delay?: number; className?: string; style?: CSSProperties; type?: "up"|"in"|"scale"; }
export default function ScrollReveal({ children, delay = 0, className = "", style = {}, type = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const cls = type === "in" ? "fade-in" : type === "scale" ? "scale-in" : "fade-up";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("visible"), delay); obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, type]);
  const cls = type === "in" ? "fade-in" : type === "scale" ? "scale-in" : "fade-up";
  return <div ref={ref} className={`${cls} ${className}`} style={style}>{children}</div>;
}
