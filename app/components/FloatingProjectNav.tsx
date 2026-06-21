"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PROJECTS = [
  { label: "CVC", href: "/work/cvc" },
  { label: "Rappi", href: "/work/rappi" },
  { label: "Design Systems", href: "/work/design-system" },
  { label: "Leadership", href: "/work/leadership" },
  { label: "MapleTrack", href: "/work/maple-track" },
];

export default function FloatingProjectNav() {
  const path = usePathname();

  return (
    <nav style={{
      position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
      zIndex: 100, display: "flex", alignItems: "center", gap: ".35rem",
      padding: ".35rem .5rem", borderRadius: 100,
      background: "rgba(20,20,24,.88)", backdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(255,255,255,.1)",
      boxShadow: "0 12px 40px rgba(0,0,0,.5)",
    }}>
      {PROJECTS.map((p) => {
        const active = path === p.href;
        return (
          <Link
            key={p.href}
            href={p.href}
            style={{
              fontSize: ".72rem", fontWeight: active ? 600 : 400,
              color: active ? "#fff" : "rgba(255,255,255,.5)",
              textDecoration: "none",
              padding: ".4rem .8rem", borderRadius: 100,
              background: active ? "rgba(255,255,255,.12)" : "transparent",
              transition: "all .2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {p.label}
          </Link>
        );
      })}
    </nav>
  );
}
