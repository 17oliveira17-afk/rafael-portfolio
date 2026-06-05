"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [darkBg, setDarkBg] = useState(false);
  const path = usePathname();

  useEffect(() => {
    // true when an rgb(...) string is dark (luminance < ~0.55); white pages stay light
    const isDarkColor = (c: string) => {
      const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
      if (!m) return false;
      const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.55;
    };
    const fn = () => {
      setScrolled(window.scrollY > 10);
      // sample just below the nav, then walk up to the first opaque background
      let node = document.elementFromPoint(window.innerWidth / 2, 64) as HTMLElement | null;
      let dark = true; // pages default to dark backgrounds
      while (node) {
        const c = window.getComputedStyle(node).backgroundColor;
        if (c && c !== "transparent" && !c.startsWith("rgba(0, 0, 0, 0)")) {
          dark = isDarkColor(c);
          break;
        }
        node = node.parentElement;
      }
      setDarkBg(dark);
    };
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    fn();
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, [path]);

  const isDark = darkBg;

  return (
    <nav className={`apple-nav ${scrolled ? "scrolled" : ""} ${isDark ? "dark" : ""}`}>
      <div className="apple-nav-inner">
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", fontWeight: 700, fontSize: ".95rem", letterSpacing: "-.02em", color: isDark ? "#f5f5f7" : "#1d1d1f" }}>
          Rafael<span style={{ color: "#0071e3" }}>.</span>
        </Link>

        {/* Links */}
        <div className="apple-nav-links" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { label: "Work", href: "/work" },
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
