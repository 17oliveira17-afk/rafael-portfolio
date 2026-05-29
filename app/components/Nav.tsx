"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Work",    href: "/#work" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: "1.4rem 3rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background .4s ease, border-color .4s ease",
        background: scrolled ? "rgba(8,8,8,.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: "1.15rem",
            fontWeight: 800, letterSpacing: "-.03em", color: "var(--text)",
          }}>
            RG<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href.split("#")[0])) ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              padding: ".45rem 1.2rem",
              border: "1px solid var(--accent)",
              borderRadius: "100px",
              color: "var(--accent)",
              textDecoration: "none",
              fontSize: ".7rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase",
              transition: "background .2s ease, color .2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "#000";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
          >
            Hire me
          </Link>
        </div>
      </nav>
    </>
  );
}
