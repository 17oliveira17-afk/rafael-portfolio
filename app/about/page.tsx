"use client";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const experience = [
  {
    year: "2025 –",
    role: "Product Design Lead",
    company: "Thoughtworks Brasil",
    detail: "Designing URPI PRO — a B2B credit origination platform for MiBanco. Working with field advisors (ADNs) to streamline micro-entrepreneur credit flows.",
    tags: ["B2B", "Fintech", "AI First"],
    accent: "var(--accent)",
  },
  {
    year: "2023 – 25",
    role: "Senior Product Designer",
    company: "Rappi",
    detail: "Led design for fintech and growth products across Latin America. Focused on conversion, activation, and retention at scale.",
    tags: ["Fintech", "Growth", "LatAm"],
    accent: "#f96d2b",
  },
  {
    year: "2020 – 23",
    role: "Product Designer",
    company: "CVC Corp",
    detail: "Led the flight booking redesign — turning a webview app with 2.0 ★ into a native 4.6 ★ experience. Conversion went from 6.4% to 20%.",
    tags: ["Travel", "Mobile", "B2C"],
    accent: "#f5e642",
  },
  {
    year: "2018 – 20",
    role: "UX/UI Designer",
    company: "Home Collection",
    detail: "Designed e-commerce experiences and led the digital design team.",
    tags: ["E-commerce", "UI"],
    accent: "#aaa",
  },
];

const skills = [
  { area: "Design", items: ["Figma", "Design Systems", "Prototyping", "High-fidelity UI", "Component Libraries"] },
  { area: "Research", items: ["Usability Testing", "User Interviews", "UX Audit", "Benchmarking", "Heuristic Analysis"] },
  { area: "Process", items: ["Discovery Sprints", "Cross-functional Collaboration", "Stakeholder Management", "AI First Mindset"] },
  { area: "Domains", items: ["Fintech", "B2B Platforms", "Travel", "Growth Products", "Credit & Payments"] },
];

export default function AboutPage() {
  return (
    <main className="page-enter">

      {/* ── Hero ── */}
      <section style={{ minHeight: "65vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 3rem 5rem", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(74,250,138,.07) 0%, transparent 70%)", top: -60, right: 0 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="label" style={{ marginBottom: "1.5rem" }}>About Me</p>
          <h1 className="display-xl" style={{ marginBottom: "2rem" }}>
            Hi! I&apos;m Rafael<br />
            <span className="grad-text">Guimarães.</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: 560, fontWeight: 300 }}>
            A Brazilian Product Designer working globally. I lead design for fintech and growth products —
            turning complex systems into experiences that drive{" "}
            <span style={{ color: "var(--text)" }}>conversion, activation, and retention.</span>
          </p>
        </div>
      </section>

      {/* ── Background ── */}
      <section style={{ padding: "5rem 3rem", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <ScrollReveal>
              <p className="label" style={{ marginBottom: "1.25rem" }}>Background</p>
              <h2 className="display-md" style={{ marginBottom: "2rem" }}>
                Designing at the intersection of complexity and clarity.
              </h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: ".95rem", fontWeight: 300, marginBottom: "1.25rem" }}>
                I&apos;ve spent 14+ years in digital design, with the last 8 focused on product design. My work lives in fintech,
                travel, and growth platforms — places where the user flow is complex, the stakes are high, and clarity is everything.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: ".95rem", fontWeight: 300, marginBottom: "1.25rem" }}>
                Currently at <span style={{ color: "var(--text)" }}>Thoughtworks Brasil</span>, working with an AI First mindset
                on URPI PRO — a B2B credit origination platform that connects field advisors with micro-entrepreneurs across Latin America.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: ".95rem", fontWeight: 300 }}>
                Outside of work, I love unique sports (yes, snowboarding in the Andes), road trips, traveling,
                and geeky things. I&apos;ve worked with teams across 12+ countries.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="label" style={{ marginBottom: "1.25rem" }}>Skills &amp; Expertise</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {skills.map((s, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: ".85rem", marginBottom: ".75rem", color: "var(--accent)" }}>
                      {s.area}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                      {s.items.map((item, j) => (
                        <span key={j} className="label" style={{
                          padding: ".3rem .75rem", border: "1px solid var(--border)",
                          borderRadius: 100, fontSize: ".6rem",
                          transition: "border-color .2s ease, color .2s ease",
                        }}
                        onMouseEnter={e => {
                          (e.target as HTMLElement).style.borderColor = "rgba(74,250,138,.4)";
                          (e.target as HTMLElement).style.color = "var(--accent)";
                        }}
                        onMouseLeave={e => {
                          (e.target as HTMLElement).style.borderColor = "var(--border)";
                          (e.target as HTMLElement).style.color = "var(--text-muted)";
                        }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Experience timeline ── */}
      <section style={{ padding: "5rem 3rem 8rem", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <ScrollReveal>
            <p className="label" style={{ marginBottom: "3.5rem" }}>Experience</p>
          </ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {experience.map((e, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div style={{
                  display: "grid", gridTemplateColumns: "120px 1fr",
                  gap: "2.5rem", alignItems: "start",
                  padding: "2.5rem 0",
                  borderBottom: i < experience.length - 1 ? "1px solid var(--border)" : "none",
                  position: "relative",
                }}>
                  {/* accent dot + line */}
                  <div>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: e.accent, marginBottom: ".75rem" }} />
                    <span className="label" style={{ fontSize: ".62rem" }}>{e.year}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", marginBottom: ".3rem" }}>
                      {e.role}
                    </h3>
                    <p style={{ color: e.accent, fontSize: ".9rem", marginBottom: "1rem" }}>{e.company}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: ".88rem", lineHeight: 1.7, fontWeight: 300, maxWidth: 520, marginBottom: "1rem" }}>
                      {e.detail}
                    </p>
                    <div style={{ display: "flex", gap: ".5rem" }}>
                      {e.tags.map(t => (
                        <span key={t} className="label" style={{
                          padding: ".25rem .65rem", border: "1px solid var(--border)",
                          borderRadius: 100, fontSize: ".58rem",
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "4rem 3rem 6rem", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p className="label" style={{ marginBottom: ".75rem" }}>Want to know more?</p>
            <h2 className="display-md" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>Let&apos;s build something together.</h2>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link href="/work/cvc" className="btn-ghost">See my work →</Link>
            <Link href="/contact" className="btn-primary">Get in touch</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
