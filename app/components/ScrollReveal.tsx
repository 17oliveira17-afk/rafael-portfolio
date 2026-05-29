"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  type?: "up" | "in";
}

export default function ScrollReveal({ children, delay = 0, className = "", style = {}, type = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add("visible"), delay);
        obs.unobserve(el);
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`${type === "in" ? "fade-in" : "fade-up"} ${className}`} style={style}>
      {children}
    </div>
  );
}
