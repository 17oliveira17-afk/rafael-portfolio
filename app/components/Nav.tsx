"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isLight = path === "/about" || path === "/contact";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "1.2rem 2.5rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "background .4s ease",
      background: scrolled
        ? isLight ? "rgba(245,245,247,.92)" : "rgba(0,0,0,.88)"
        : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
    }}>
      <Link href="/" style={{
        fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-.03em",
        textDecoration: "none",
        color: isLight && scrolled ? "#000" : "#fff",
      }}>
        RG<span style={{ color: "var(--accent)" }}>.</span>
      </Link>

      <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
        {[
          { label: "Work", href: "/#work" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ].map(l => (
          <Link key={l.href} href={l.href} style={{
            padding: ".35rem .9rem",
            borderRadius: 100,
            fontSize: ".72rem", fontWeight: 500, letterSpacing: ".1em",
            textTransform: "uppercase", textDecoration: "none",
            color: isLight && scrolled ? "#000" : "rgba(255,255,255,.7)",
            transition: "color .2s ease",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = isLight ? "#000" : "#fff"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = isLight && scrolled ? "#000" : "rgba(255,255,255,.7)"}
          >{l.label}</Link>
        ))}
        <Link href="/contact" style={{
          padding: ".4rem 1.1rem",
          background: "var(--accent)", color: "#000",
          borderRadius: 100, textDecoration: "none",
          fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em",
          textTransform: "uppercase",
          transition: "transform .2s ease",
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
        >Hire me</Link>
      </div>
    </nav>
  );
}
