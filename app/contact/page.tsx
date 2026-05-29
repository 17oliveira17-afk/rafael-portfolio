"use client";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

export default function ContactPage() {
  return (
    <main className="page-in">
      <section className="section-black" style={{ minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "8rem 2rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(0,113,227,.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, position: "relative", zIndex: 1 }}>
          <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>Contact</p>
          <h1 className="t-hero-white" style={{ marginBottom: "1.5rem" }}>Got a project<br />in mind?</h1>
          <p className="t-body-white" style={{ maxWidth: 420, marginBottom: "3rem" }}>
            Open to Product Design Lead roles in fintech and B2B. Currently pursuing opportunities in Canada.
          </p>
          <a href="mailto:rafael@rafaelgdesign.com" className="btn-blue" style={{ fontSize: "1rem", padding: ".85rem 2.5rem" }}>Say Hello →</a>
        </div>
      </section>

      <section className="section-off-white" style={{ borderTop: "1px solid #d2d2d7" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {[
            { label: "Email", value: "rafael@rafaelgdesign.com", href: "mailto:rafael@rafaelgdesign.com" },
            { label: "LinkedIn", value: "linkedin.com/in/rafaelgdesign", href: "https://linkedin.com/in/rafaelgdesign" },
            { label: "Portfolio", value: "rafaelgdesign.com", href: "https://rafaelgdesign.com" },
          ].map((lk, i) => (
            <ScrollReveal key={i}>
              <a href={lk.href} target="_blank" style={{ textDecoration: "none", display: "block" }} data-cur>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "3rem 2rem", borderBottom: "1px solid #d2d2d7",
                  transition: "background .15s ease",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#ebebef"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <div>
                    <p className="t-eyebrow" style={{ marginBottom: ".75rem" }}>{lk.label}</p>
                    <h2 className="t-headline" style={{ fontSize: "clamp(1.1rem,2.5vw,2.2rem)", color: "#1d1d1f" }}>{lk.value}</h2>
                  </div>
                  <span style={{ color: "#0071e3", fontSize: "1.8rem", fontWeight: 300 }}>↗</span>
                </div>
              </a>
            </ScrollReveal>
          ))}

          <ScrollReveal style={{ padding: "3rem 2rem 5rem" }}>
            <div style={{ padding: "2.5rem", background: "#fff", borderRadius: 20, border: "1px solid #d2d2d7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem" }}>
                  <div className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#34c759" }} />
                  <p style={{ fontSize: ".75rem", fontWeight: 600, color: "#34c759", letterSpacing: ".08em", textTransform: "uppercase" }}>Available</p>
                </div>
                <h3 style={{ fontWeight: 600, fontSize: "1.1rem", color: "#1d1d1f" }}>Open to new opportunities</h3>
              </div>
              <p className="t-body" style={{ textAlign: "right", fontSize: ".85rem" }}>Fintech · B2B · Canada</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer style={{ background: "#f5f5f7", borderTop: "1px solid #d2d2d7", padding: "2rem", display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: ".72rem", color: "#6e6e73" }}>© 2025 Rafael Guimarães</p>
        <Link href="/" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>← Home</Link>
      </footer>
    </main>
  );
}
