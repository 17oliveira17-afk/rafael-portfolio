"use client";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const links = [
  { label: "LinkedIn", value: "linkedin.com/in/rafaelgdesign", href: "https://linkedin.com/in/rafaelgdesign", icon: "↗" },
  { label: "Email", value: "rafael@rafaelgdesign.com", href: "mailto:rafael@rafaelgdesign.com", icon: "→" },
  { label: "Portfolio", value: "rafaelgdesign.com", href: "https://rafaelgdesign.com", icon: "↗" },
];

export default function ContactPage() {
  return (
    <main className="page-enter">

      {/* ── Hero ── */}
      <section style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 3rem 5rem", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(74,250,138,.07) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-30%,-50%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="label" style={{ marginBottom: "1.5rem" }}>Let&apos;s work together</p>
          <h1 className="display-xl" style={{ marginBottom: "2rem" }}>
            Got a project<br />in mind<span style={{ color: "var(--accent)" }}>?</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 480, fontWeight: 300 }}>
            I&apos;m open to Product Design Lead roles and senior design positions in fintech and B2B.
            Currently open to opportunities in Canada and globally.
          </p>
        </div>
      </section>

      {/* ── Contact links ── */}
      <section style={{ padding: "4rem 3rem 8rem", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {links.map((lk, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <a
                  href={lk.href}
                  target="_blank"
                  style={{ textDecoration: "none", display: "block" }}
                  data-hover
                >
                  <div
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "2.5rem 0",
                      borderBottom: i < links.length - 1 ? "1px solid var(--border)" : "none",
                      transition: "padding-left .3s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = "1rem"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
                  >
                    <div>
                      <p className="label" style={{ marginBottom: ".6rem" }}>{lk.label}</p>
                      <h2 className="display-md" style={{ color: "var(--text)", fontSize: "clamp(1.4rem, 3vw, 3rem)" }}>
                        {lk.value}
                      </h2>
                    </div>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--accent)", transition: "transform .3s ease" }}>
                      {lk.icon}
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Availability */}
          <ScrollReveal delay={200}>
            <div style={{
              marginTop: "5rem", padding: "2.5rem 3rem",
              background: "linear-gradient(135deg, rgba(74,250,138,.07), rgba(160,255,110,.03))",
              border: "1px solid rgba(74,250,138,.18)", borderRadius: 20,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s infinite" }} />
                  <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }`}</style>
                  <span className="label" style={{ color: "var(--accent)" }}>Available</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem" }}>
                  Open to new opportunities
                </h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <p className="label" style={{ marginBottom: ".4rem" }}>Focus areas</p>
                <p style={{ color: "var(--text-muted)", fontSize: ".85rem" }}>Fintech · B2B · Canada</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Back nav */}
      <section style={{ padding: "2rem 3rem 4rem", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", gap: "1rem" }}>
          <Link href="/" className="btn-ghost">← Back to Home</Link>
          <Link href="/about" className="btn-ghost">About me →</Link>
        </div>
      </section>

    </main>
  );
}
