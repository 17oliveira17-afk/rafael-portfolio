"use client";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const links = [
  {
    label: "Email",
    value: "rafael_oliveira17@hotmail.com",
    href: "mailto:rafael_oliveira17@hotmail.com",
  },
  {
    label: "WhatsApp",
    value: "+55 11 99852-5386",
    href: "https://wa.me/5511998525386",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rafael-guimaraes-oliveira-br",
    href: "https://www.linkedin.com/in/rafael-guimaraes-oliveira-br/",
  },
  {
    label: "Dribbble",
    value: "dribbble.com/rafaguimaraes",
    href: "https://dribbble.com/rafaguimaraes",
  },
  {
    label: "Medium",
    value: "medium.com/@relieved-space-ferret-293",
    href: "https://medium.com/@relieved-space-ferret-293",
  },
];

export default function ContactPage() {
  return (
    <main className="page-in" style={{ background: "#000" }}>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "10rem 6rem 6rem", position: "relative", overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 20% 60%, rgba(0,113,227,.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "2rem" }}>Contact</p>
            <h1 style={{ fontSize: "clamp(3rem,7vw,7rem)", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1, color: "#fff", marginBottom: "2rem" }}>
              Got a project<br />in mind?
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.55)", maxWidth: 480, lineHeight: 1.7, marginBottom: "3rem" }}>
              Open to Product Design Lead roles in fintech and B2B. Currently pursuing opportunities in Canada.
            </p>
            <a href="mailto:rafael_oliveira17@hotmail.com" className="btn-blue" style={{ fontSize: "1rem", padding: ".9rem 2.5rem" }}>
              Say Hello →
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ LINKS ═══ */}
      <section style={{ background: "#000" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6rem" }}>
          {links.map((lk, i) => (
            <ScrollReveal key={i}>
              <a href={lk.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "3rem 0", borderBottom: "1px solid rgba(255,255,255,.08)",
                  transition: "opacity .2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                >
                  <div>
                    <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".75rem" }}>{lk.label}</p>
                    <h2 style={{ fontSize: "clamp(1rem,2vw,1.75rem)", fontWeight: 600, color: "#fff", letterSpacing: "-.02em" }}>{lk.value}</h2>
                  </div>
                  <span style={{ color: "#0071e3", fontSize: "2rem", fontWeight: 300, flexShrink: 0 }}>↗</span>
                </div>
              </a>
            </ScrollReveal>
          ))}

          {/* Available card */}
          <ScrollReveal>
            <div style={{ padding: "4rem 0 6rem" }}>
              <div style={{ padding: "2.5rem", background: "rgba(255,255,255,.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem" }}>
                    <div className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#34c759" }} />
                    <p style={{ fontSize: ".72rem", fontWeight: 600, color: "#34c759", letterSpacing: ".1em", textTransform: "uppercase" }}>Available</p>
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: "1.1rem", color: "#fff" }}>Open to new opportunities</h3>
                </div>
                <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.45)", textAlign: "right" }}>Fintech · B2B · Canada</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.08)", padding: "2rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)" }}>© 2025 Rafael Guimarães. All rights reserved.</p>
        <Link href="/" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>← Home</Link>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          section[style*="padding: 10rem 6rem"] { padding: 8rem 1.5rem 4rem !important; }
          div[style*="padding: 0 6rem"] { padding: 0 1.5rem !important; }
          footer[style*="padding: 2rem 6rem"] { padding: 2rem 1.5rem !important; }
        }
      `}</style>
    </main>
  );
}
