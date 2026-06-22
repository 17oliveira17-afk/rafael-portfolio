"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <nav style={{
      position: "fixed", bottom: isMobile ? "1rem" : "2rem",
      left: "50%", transform: "translateX(-50%)",
      zIndex: 100, display: "flex", alignItems: "center",
      gap: isMobile ? ".2rem" : ".35rem",
      padding: isMobile ? ".3rem .4rem" : ".35rem .5rem",
      borderRadius: 100,
      background: "rgba(20,20,24,.88)", backdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(255,255,255,.1)",
      boxShadow: "0 12px 40px rgba(0,0,0,.5)",
      maxWidth: "calc(100vw - 2rem)",
    }}>
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
