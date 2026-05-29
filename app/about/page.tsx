"use client";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const exp = [
  { year: "2025 –", role: "Product Design Lead", company: "Thoughtworks Brasil", detail: "Designing URPI PRO — B2B credit origination platform for MiBanco. AI First mindset.", tags: ["B2B", "Fintech", "AI"], c: "#0071e3" },
  { year: "2023 – 25", role: "Senior Product Designer", company: "Rappi", detail: "Fintech and growth products across Latin America. Conversion, activation, retention.", tags: ["Fintech", "Growth"], c: "#ff6b00" },
  { year: "2020 – 23", role: "Product Designer", company: "CVC Corp", detail: "Flight booking redesign. 2.0 → 4.6★. Conversion 6.4% → 20%. Cross-sell +23%.", tags: ["Travel", "Mobile"], c: "#f5e642" },
  { year: "2018 – 20", role: "UX/UI Designer", company: "Home Collection", detail: "E-commerce experiences and digital design team.", tags: ["E-commerce"], c: "#6e6e73" },
];

export default function AboutPage() {
  return (
    <main className="page-in">

      {/* Hero */}
      <section className="section-black" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "8rem 2rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 20% 60%, rgba(0,113,227,.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, position: "relative", zIndex: 1 }}>
          <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>About</p>
          <h1 className="t-hero-white" style={{ marginBottom: "2rem" }}>
            Hi, I'm Rafael<br />Guimarães.
          </h1>
          <p className="t-body-white" style={{ maxWidth: 520, fontSize: "1.1rem" }}>
            A Brazilian Product Designer working globally. 14+ years in digital design. I live at the intersection of complexity and clarity.
          </p>
        </div>
      </section>

      {/* Statement */}
      <section className="section-white" style={{ padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <ScrollReveal>
            <h2 className="t-section-title" style={{ marginBottom: "1.5rem" }}>
              Designing at the intersection<br />of complexity and clarity.
            </h2>
            <p className="t-body" style={{ maxWidth: 560 }}>
              Currently at Thoughtworks Brasil, working with an AI First mindset on URPI PRO — a B2B credit origination platform connecting field advisors with micro-entrepreneurs across Latin America.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience */}
      <section className="section-off-white" style={{ padding: "5rem 2rem 7rem", borderTop: "1px solid #d2d2d7" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ marginBottom: "4rem" }}>Experience</p>
          </ScrollReveal>
          {exp.map((e, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "3rem", padding: "3rem 0", borderBottom: i < exp.length - 1 ? "1px solid #d2d2d7" : "none" }}>
                <p style={{ fontSize: ".75rem", color: "#6e6e73", paddingTop: ".2rem" }}>{e.year}</p>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: "1.1rem", color: "#1d1d1f", marginBottom: ".35rem" }}>{e.role}</h3>
                  <p style={{ color: e.c === "#f5e642" ? "#b8ab00" : e.c, fontSize: ".9rem", marginBottom: "1rem" }}>{e.company}</p>
                  <p className="t-body" style={{ fontSize: ".88rem", maxWidth: 480, marginBottom: "1rem" }}>{e.detail}</p>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    {e.tags.map(t => <span key={t} style={{ padding: ".2rem .65rem", border: "1px solid #d2d2d7", borderRadius: 100, fontSize: ".68rem", color: "#6e6e73" }}>{t}</span>)}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-white" style={{ padding: "5rem 2rem 6rem", borderTop: "1px solid #d2d2d7" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="t-headline" style={{ maxWidth: 380 }}>Let's build something great together.</h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link href="/work/cvc" className="btn-blue-ghost">See my work</Link>
            <Link href="/contact" className="btn-blue">Get in touch</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#f5f5f7", borderTop: "1px solid #d2d2d7", padding: "2rem", display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: ".72rem", color: "#6e6e73" }}>© 2025 Rafael Guimarães</p>
        <Link href="/" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>← Home</Link>
      </footer>
    </main>
  );
}
