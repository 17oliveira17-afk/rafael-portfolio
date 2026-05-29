"use client";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1.5rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        Rafael<span style={{ color: "var(--accent)" }}>.</span>
      </span>

      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {["Work", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="label"
            style={{ color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.12em" }}
          >
            {item}
          </a>
        ))}
        <a
          href="mailto:rafael@rafaelgdesign.com"
          style={{
            padding: "0.5rem 1.2rem",
            border: "1px solid var(--accent)",
            borderRadius: "100px",
            color: "var(--accent)",
            textDecoration: "none",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = "var(--accent)";
            (e.target as HTMLElement).style.color = "#000";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = "transparent";
            (e.target as HTMLElement).style.color = "var(--accent)";
          }}
        >
          Hire me
        </a>
      </div>
    </nav>
  );
}
