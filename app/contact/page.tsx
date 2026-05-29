"use client";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

export default function ContactPage() {
  return (
    <main className="page-in section-dark">

      <section style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 2.5rem 6rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(74,250,138,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="t-label" style={{ marginBottom: "2rem" }}>Contact</p>
          <h1 className="t-hero" style={{ fontSize: "clamp(3rem,9vw,10rem)", marginBottom: "2rem" }}>
            Got a project<br />in mind<span className="grad-green">?</span>
          </h1>
          <p className="t-sub" style={{ maxWidth: 440, marginBottom: "3.5rem", fontSize: "clamp(1rem,1.5vw,1.2rem)" }}>
            Open to Product Design Lead roles in fintech and B2B. Currently pursuing opportunities in Canada.
          </p>
          <a href="mailto:rafael@rafaelgdesign.com" className="btn-white">Say Hello →</a>
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,.07)", maxWidth: 900, margin: "0 auto", padding: "0 2.5rem" }}>
        {[
          { label: "Email", value: "rafael@rafaelgdesign.com", href: "mailto:rafael@rafaelgdesign.com" },
          { label: "LinkedIn", value: "linkedin.com/in/rafaelgdesign", href: "https://linkedin.com/in/rafaelgdesign" },
          { label: "Portfolio", value: "rafaelgdesign.com", href: "https://rafaelgdesign.com" },
        ].map((lk, i) => (
          <ScrollReveal key={i}>
            <a href={lk.href} target="_blank" style={{ textDecoration: "none", display: "block" }} data-cur>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "3rem 0", borderBottom: "1px solid rgba(255,255,255,.07)",
                transition: "padding-left .3s ease",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.paddingLeft = "1rem"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.paddingLeft = "0"}
              >
                <div>
                  <p className="t-label" style={{ marginBottom: ".75rem" }}>{lk.label}</p>
                  <h2 className="t-headline" style={{ fontSize: "clamp(1.2rem,2.5vw,2.5rem)" }}>{lk.value}</h2>
                </div>
                <span style={{ fontSize: "2.5rem", color: "var(--accent)" }}>↗</span>
              </div>
            </a>
          </ScrollReveal>
        ))}

        <ScrollReveal style={{ padding: "5rem 0" }}>
          <div style={{ padding: "2.5rem 3rem", background: "rgba(74,250,138,.05)", border: "1px solid rgba(74,250,138,.15)", borderRadius: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem" }}>
                <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
                <span className="t-label" style={{ color: "var(--accent)" }}>Available</span>
              </div>
              <h3 style={{ fontWeight: 600, fontSize: "1.2rem" }}>Open to new opportunities</h3>
            </div>
            <p className="t-sub" style={{ textAlign: "right", fontSize: ".85rem" }}>Fintech · B2B · Canada</p>
          </div>
        </ScrollReveal>
      </section>

      <footer style={{ padding: "2rem 2.5rem", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between" }}>
        <Link href="/" className="t-label" style={{ textDecoration: "none", fontSize: ".6rem", transition: "color .2s ease" }}
          onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
          onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--gray)"}
        >← Home</Link>
        <span className="t-label" style={{ fontSize: ".6rem" }}>© 2025 Rafael Guimarães</span>
      </footer>
    </main>
  );
}
