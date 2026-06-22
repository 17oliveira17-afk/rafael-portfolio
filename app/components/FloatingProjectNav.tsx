"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import useIsMobile from "./useIsMobile";

const PROJECTS = [
  { label: "Mobile App", short: "App", href: "/work/cvc" },
  { label: "Onboarding", short: "Onb", href: "/work/rappi" },
  { label: "Design System", short: "DS", href: "/work/design-system" },
  { label: "Leadership", short: "Lead", href: "/work/leadership" },
  { label: "SaaS", short: "SaaS", href: "/work/maple-track" },
];

export default function FloatingProjectNav() {
  const path = usePathname();
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let lastY = 0;
    const fn = () => {
      const y = window.scrollY;
      const pastHero = y > window.innerHeight * 0.8;
      const scrollingDown = y > lastY;
      lastY = y;

      if (!pastHero) {
        setVisible(false);
        return;
      }

      if (scrollingDown) {
        setVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setVisible(false), 2500);
      } else {
        setVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setVisible(false), 2500);
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <nav
      onMouseEnter={() => { if (hideTimer.current) clearTimeout(hideTimer.current); setVisible(true); }}
      onMouseLeave={() => { hideTimer.current = setTimeout(() => setVisible(false), 1500); }}
      style={{
        position: "fixed", bottom: isMobile ? "1rem" : "2rem",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "120%"})`,
        opacity: visible ? 1 : 0,
        zIndex: 100, display: "flex", alignItems: "center",
        gap: isMobile ? ".2rem" : ".35rem",
        padding: isMobile ? ".3rem .4rem" : ".35rem .5rem",
        borderRadius: 100,
        background: "rgba(20,20,24,.88)", backdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,.1)",
        boxShadow: "0 12px 40px rgba(0,0,0,.5)",
        maxWidth: "calc(100vw - 2rem)",
        transition: "transform .4s cubic-bezier(.16,1,.3,1), opacity .3s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {PROJECTS.map((p) => {
        const active = path === p.href;
        return (
          <Link
            key={p.href}
            href={p.href}
            style={{
              fontSize: isMobile ? ".64rem" : ".72rem",
              fontWeight: active ? 600 : 400,
              color: active ? "#fff" : "rgba(255,255,255,.5)",
              textDecoration: "none",
              padding: isMobile ? ".35rem .55rem" : ".4rem .8rem",
              borderRadius: 100,
              background: active ? "rgba(255,255,255,.12)" : "transparent",
              transition: "all .2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {isMobile ? (active ? p.label : p.short) : p.label}
          </Link>
        );
      })}
    </nav>
  );
}
