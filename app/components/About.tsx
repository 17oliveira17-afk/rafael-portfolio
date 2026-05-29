"use client";
import { useEffect, useRef } from "react";

const experience = [
  { year: "2025 –", role: "Product Design Lead", company: "Thoughtworks Brasil", note: "MiBanco · B2B Credit Platform" },
  { year: "2023 – 25", role: "Senior Product Designer", company: "Rappi", note: "Fintech · Growth" },
  { year: "2020 – 23", role: "Product Designer", company: "CVC Corp", note: "Travel · Mobile" },
  { year: "2018 – 20", role: "UX/UI Designer", company: "Home Collection", note: "E-commerce" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).querySelectorAll(".about-item").forEach((el, i) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = "1";
              (el as HTMLElement).style.transform = "translateX(0)";
            }, i * 100);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      style={{
        padding: "8rem 3rem",
        borderTop: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          {/* Left */}
          <div>
            <p className="label" style={{ marginBottom: "1.5rem" }}>About Me</p>
            <h2
              className="display-lg"
              style={{ fontSize: "clamp(1.8rem, 4vw, 4rem)", marginBottom: "2rem" }}
            >
              Hi! I&apos;m Rafael<br />
              <span className="grad-text">Guimarães.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1rem", fontWeight: 300, marginBottom: "1.5rem" }}>
              A Brazilian Product Designer working globally. I lead design for fintech and growth products,
              turning complex systems into experiences that drive conversion, activation, and retention.
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1rem", fontWeight: 300 }}>
              I love unique sports, traveling, road trips, and geeky things. Currently based in São Paulo,
              designing for teams across the globe.
            </p>

            <div style={{ marginTop: "3rem", display: "flex", gap: "1rem" }}>
              <a
                href="mailto:rafael@rafaelgdesign.com"
                style={{
                  padding: "0.875rem 2rem",
                  background: "var(--accent)",
                  color: "#000",
                  borderRadius: "100px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
              >
                Get in touch
              </a>
              <a
                href="https://www.linkedin.com/in/rafaelgdesign/"
                target="_blank"
                style={{
                  padding: "0.875rem 2rem",
                  border: "1px solid var(--border)",
                  borderRadius: "100px",
                  textDecoration: "none",
                  color: "var(--text-muted)",
                  fontSize: "0.85rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor = "var(--text-muted)";
                  (e.target as HTMLElement).style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor = "var(--border)";
                  (e.target as HTMLElement).style.color = "var(--text-muted)";
                }}
              >
                LinkedIn →
              </a>
            </div>
          </div>

          {/* Right — Experience */}
          <div ref={ref}>
            <p className="label" style={{ marginBottom: "2rem" }}>Experience</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {experience.map((e, i) => (
                <div
                  key={i}
                  className="about-item"
                  style={{
                    padding: "1.5rem 0",
                    borderBottom: i < experience.length - 1 ? "1px solid var(--border)" : "none",
                    display: "grid",
                    gridTemplateColumns: "90px 1fr",
                    gap: "1.5rem",
                    alignItems: "center",
                    opacity: 0,
                    transform: "translateX(20px)",
                    transition: `opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)`,
                  }}
                >
                  <span className="label" style={{ color: "var(--text-muted)" }}>{e.year}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.95rem" }}>
                      {e.role}
                    </p>
                    <p style={{ color: "var(--accent)", fontSize: "0.85rem", marginTop: "0.2rem" }}>
                      {e.company}
                    </p>
                    <p className="label" style={{ color: "var(--text-muted)", marginTop: "0.25rem", fontSize: "0.65rem" }}>
                      {e.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
