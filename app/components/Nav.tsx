"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [darkBg, setDarkBg] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 10);
      // detect if current section has dark bg
      const el = document.elementFromPoint(window.innerWidth / 2, 50);
      const section = el?.closest("section, main");
      const bg = section ? window.getComputedStyle(section).backgroundColor : "";
      setDarkBg(bg.includes("0, 0, 0") || bg.includes("29, 29, 31"));
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isDark = darkBg;

  return (
    <nav className={`apple-nav ${scrolled ? "scrolled" : ""} ${isDark ? "dark" : ""}`}>
      <div className="apple-nav-inner">
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", fontWeight: 700, fontSize: ".95rem", letterSpacing: "-.02em", color: isDark ? "#f5f5f7" : "#1d1d1f" }}>
          Rafael<span style={{ color: "#0071e3" }}>.</span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { label: "Work", href: "/#work" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{
              fontSize: ".8rem", fontWeight: 400, textDecoration: "none",
              color: isDark ? "rgba(245,245,247,.8)" : "rgba(29,29,31,.8)",
              transition: "color .15s ease",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = isDark ? "#f5f5f7" : "#1d1d1f"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = isDark ? "rgba(245,245,247,.8)" : "rgba(29,29,31,.8)"}
            >{l.label}</Link>
          ))}
          <Link href="/contact" className="btn-blue" style={{ fontSize: ".8rem", padding: ".45rem 1.1rem" }}>
            Hire me
          </Link>
        </div>
      </div>
    </nav>
  );
}
