"use client";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const exp = [
  { year: "2025 –", role: "Product Design Lead", company: "Thoughtworks Brasil", detail: "Designing URPI PRO — a B2B credit origination platform for MiBanco. AI First mindset.", tags: ["B2B", "Fintech"], c: "var(--accent)" },
  { year: "2023 – 25", role: "Senior Product Designer", company: "Rappi", detail: "Fintech and growth products across Latin America. Conversion, activation, retention at scale.", tags: ["Fintech", "Growth"], c: "#f96d2b" },
  { year: "2020 – 23", role: "Product Designer", company: "CVC Corp", detail: "Flight booking redesign. 2.0 → 4.6 ★. Conversion 6.4% → 20%. Cross-sell +23%.", tags: ["Travel", "Mobile"], c: "#f5e642" },
  { year: "2018 – 20", role: "UX/UI Designer", company: "Home Collection", detail: "E-commerce experiences and digital design team.", tags: ["E-commerce"], c: "#888" },
];

export default function AboutPage() {
  return (
    <main className="page-in section-dark">

      {/* Hero */}
      <section style={{ minHeight: "75vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 2.5rem 6rem", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 50% at 30% 40%, rgba(74,250,138,.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <p className="t-label" style={{ marginBottom: "2rem" }}>About</p>
          <h1 className="t-hero" style={{ fontSize: "clamp(3rem,8vw,9rem)", marginBottom: "2.5rem" }}>
            Hi! I'm Rafael<br /><span className="grad-green">Guimarães.</span>
          </h1>
          <p className="t-sub" style={{ maxWidth: 520, fontSize: "clamp(1rem,1.5vw,1.25rem)" }}>
            A Brazilian Product Designer working globally. 14+ years in digital design, 8+ years in product. I live at the intersection of complexity and clarity.
          </p>
        </div>
      </section>

      {/* Statement */}
      <section style={{ padding: "10rem 2.5rem", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <ScrollReveal>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 className="t-statement">
              Designing at the intersection of<br />complexity and <span className="grad-green">clarity.</span>
            </h2>
            <p className="t-sub" style={{ maxWidth: 560, marginTop: "3rem" }}>
              Currently at Thoughtworks Brasil, working with an AI First mindset on URPI PRO — a B2B credit origination platform connecting field advisors with micro-entrepreneurs across Latin America.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Experience */}
      <section style={{ padding: "6rem 2.5rem 10rem", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-label" style={{ marginBottom: "5rem" }}>Experience</p>
          </ScrollReveal>
          {exp.map((e, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "3rem", padding: "3rem 0", borderBottom: i < exp.length - 1 ? "1px solid rgba(255,255,255,.07)" : "none" }}>
                <p className="t-label" style={{ paddingTop: ".3rem" }}>{e.year}</p>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: "1.15rem", marginBottom: ".4rem" }}>{e.role}</h3>
                  <p style={{ color: e.c, fontSize: ".95rem", marginBottom: "1rem" }}>{e.company}</p>
                  <p className="t-sub" style={{ fontSize: ".9rem", maxWidth: 480, marginBottom: "1rem" }}>{e.detail}</p>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    {e.tags.map(t => <span key={t} className="t-label" style={{ padding: ".25rem .65rem", border: "1px solid rgba(255,255,255,.1)", borderRadius: 100, fontSize: ".58rem" }}>{t}</span>)}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 2.5rem 8rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
        <ScrollReveal>
          <h2 className="t-headline" style={{ maxWidth: 400 }}>Let's build something together.</h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link href="/work/cvc" className="btn-outline">See my work →</Link>
            <Link href="/contact" className="btn-white">Get in touch</Link>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
