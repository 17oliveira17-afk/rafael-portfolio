"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  type?: "y" | "x";
}

export default function ScrollReveal({ children, delay = 0, className = "", style = {}, type = "y" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${type === "x" ? "reveal-x" : "reveal"} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
