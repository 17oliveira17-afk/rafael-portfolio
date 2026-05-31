"use client";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";

const exp = [
  {
    year: "2025 —",
    role: "Product Design Lead",
    company: "Thoughtworks Brasil",
    detail: "Leading end-to-end design for URPI PRO — a B2B credit origination platform for MiBanco connecting field advisors with micro-entrepreneurs across Latin America. AI First mindset. Recovered a delayed roadmap and built the design workflow from scratch.",
    tags: ["B2B", "Fintech", "AI", "Leadership"],
    c: "#0071e3",
  },
  {
    year: "2022 — 25",
    role: "Senior Product Designer",
    company: "Rappi",
    detail: "Led fintech and growth products across Latin America. Redesigned restaurant onboarding increasing conversion +53.4%. Improved lead verification +135.4%. Built design system components. Collaborated with PMs and eng across multiple squads simultaneously.",
    tags: ["Fintech", "Growth", "Design System"],
    c: "#ff6b00",
  },
  {
    year: "2018 — 22",
    role: "Product Designer",
    company: "CVC Corp",
    detail: "Full redesign of the mobile flight booking experience. App rating 2.0 → 4.6★. Checkout conversion 6% → 20% (+212%). Hotel cross-sell +23%. Load time 40s → 6s. First loyalty program released. Design System refinements.",
    tags: ["Travel", "Mobile", "Design System"],
    c: "#b8ab00",
  },
  {
    year: "Until 2018",
    role: "UX / UI / Web Designer",
    company: "Agencies",
    detail: "Digital design across e-commerce, web, and multimedia. Built foundation in front-end development, 3D, and visual communication.",
    tags: ["E-commerce", "Web", "UI"],
    c: "#6e6e73",
  },
];

const principles = [
  {
    n: "01",
    title: "Impact over output.",
    desc: "I measure success by results, not deliverables. Every design decision traces back to a metric — conversion, retention, satisfaction, revenue.",
  },
  {
    n: "02",
    title: "Systems, not screens.",
    desc: "I design reusable components and scalable frameworks. A screen is temporary. A design system compounds across every product decision after me.",
  },
  {
    n: "03",
    title: "Clarity from complexity.",
    desc: "Fintech, credit, compliance — I turn regulatory and technical constraints into experiences that feel obvious. The harder the domain, the more design earns its seat.",
  },
  {
    n: "04",
    title: "Cross-functional by default.",
    desc: "I sit at the intersection of product, engineering, and business. I speak their languages. That's what makes execution actually happen.",
  },
];

const testimonials = [
  {
    quote: "Rafael's dedication, strong design process, and proactive mindset consistently led to exceptional results. A top-tier designer.",
    name: "Allan Cardozo",
    role: "Design Manager, Delivery Hero · Ex-Rappi Director",
  },
  {
    quote: "Rafa led a major revamp of restaurant onboarding, pushing the team toward first-principles thinking and delivering real impact.",
    name: "Nima Zahedi",
    role: "Product Director, Monzo",
  },
  {
    quote: "Rafael's designs significantly improved usability and boosted conversion rates, aligning perfectly with business goals.",
    name: "German Sotelo",
    role: "Engineering Manager, Rappi",
  },
  {
    quote: "Rafa kept a complex project on track despite shifting deadlines, showing resilience and delivering outstanding results.",
    name: "Santiago Martinez",
    role: "Product Manager, Rappi",
  },
  {
    quote: "Rafael is not only an exceptional designer but also a fantastic teammate — proactive, detail-oriented, and always raising the bar.",
    name: "Paula Lenis",
    role: "Design Lead, Rappi",
  },
  {
    quote: "From the moment I interviewed Rafa, I knew he had incredible potential. Seeing his growth and contributions over time has been inspiring.",
    name: "Carolina Ledesma",
    role: "Design Manager, CVC Corp",
  },
];

const metrics = [
  { n: "14+", label: "Years in design" },
  { n: "7+", label: "Years in product" },
  { n: "+212%", label: "Checkout conversion at CVC" },
  { n: "+53%", label: "Onboarding conversion at Rappi" },
  { n: "+135%", label: "Lead verification at Rappi" },
  { n: "4.6★", label: "App Store rating from 2.0" },
];

export default function AboutPage() {
  return (
    <main className="page-in" style={{ background: "#000" }}>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: "100vh", background: "#000", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", overflow: "hidden" }}>
        {/* Left — text */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "10rem 4rem 6rem 6rem", position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem", opacity: 0, animation: "fadeUp .9s ease .2s forwards" }}>
            Product Design Lead · São Paulo, Brazil
          </p>
          <h1 style={{ fontSize: "clamp(3rem,5vw,6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1, marginBottom: "2rem", opacity: 0, animation: "fadeUp 1.1s ease .4s forwards" }}>
            Rafael<br />Guimarães.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.7, maxWidth: 400, marginBottom: "3rem", opacity: 0, animation: "fadeUp .9s ease .6s forwards" }}>
            14+ years designing digital products. I turn complexity into clarity — fintech, B2B platforms, and mobile experiences that actually move metrics.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: 0, animation: "fadeUp .9s ease .8s forwards" }}>
            <Link href="/contact" className="btn-blue" style={{ fontSize: ".95rem" }}>Get in touch</Link>
            <a href="https://rafaelgdesign.com/wp-content/uploads/2026/03/CV-Rafael-Guimaraes-2026-03.pdf" target="_blank" rel="noopener noreferrer" className="btn-white-ghost" style={{ fontSize: ".95rem" }}>Download CV</a>
          </div>
        </div>

        {/* Right — photo */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #000 0%, transparent 30%)", zIndex: 1 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, #000 0%, transparent 100%)", zIndex: 1 }} />
          <Image
            src="/rafael-portrait.jpg"
            alt="Rafael Guimarães"
            fill
            style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.85 }}
            priority
          />
          {/* Blue glow */}
          <div style={{ position: "absolute", bottom: "10%", left: "20%", width: "60%", height: "40%", background: "radial-gradient(ellipse, rgba(0,113,227,0.3) 0%, transparent 70%)", zIndex: 2 }} />
        </div>

        {/* Mobile fallback */}
        <style>{`
          @media (max-width: 860px) {
            section[data-hero] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ═══ METRICS STRIP ═══ */}
      <section style={{ background: "#0a0a0a", padding: "5rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
          {metrics.map((m, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div style={{ background: "#0a0a0a", padding: "2.5rem 2rem", textAlign: "center", transition: "background .3s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#111")}
                onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}
              >
                <div style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: "#0071e3", letterSpacing: "-.04em", lineHeight: 1 }}>{m.n}</div>
                <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.5)", marginTop: ".75rem", lineHeight: 1.4 }}>{m.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ STATEMENT ═══ */}
      <section style={{ background: "#000", padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "2rem" }}>What I do</p>
            <h2 style={{ fontSize: "clamp(2.5rem,5vw,5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "3rem" }}>
              I specialize in making<br />the complex feel <em style={{ color: "#0071e3", fontStyle: "italic" }}>obvious.</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.75 }}>
                Fintech, B2B credit platforms, mobile commerce — these are domains where users face real stakes and real friction. My job is to remove that friction without losing the nuance that makes the product work.
              </p>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.5)", lineHeight: 1.75 }}>
                I&apos;ve led design end-to-end at Thoughtworks, Rappi, and CVC Corp. I write briefs, run research, build systems, present to executives, and ship with engineers. I don&apos;t hand things off — I see them through.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PRINCIPLES ═══ */}
      <section style={{ background: "#0a0a0a", padding: "8rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "5rem" }}>Design principles</p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            {principles.map((p, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ background: "#0a0a0a", padding: "3.5rem", height: "100%", transition: "background .3s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#111")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}
                >
                  <p style={{ fontSize: ".7rem", color: "#0071e3", fontWeight: 600, letterSpacing: ".1em", marginBottom: "1.25rem" }}>{p.n}</p>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1rem", letterSpacing: "-.02em" }}>{p.title}</h3>
                  <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHOTO BREAK ═══ */}
      <section style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
        <Image src="/rafael-working.jpg" alt="Rafael working" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 30%, transparent 70%, #000 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
          <ScrollReveal>
            <p style={{ fontSize: "clamp(1.5rem,4vw,3.5rem)", fontWeight: 700, color: "#fff", textAlign: "center", letterSpacing: "-.03em", lineHeight: 1.2, textShadow: "0 2px 40px rgba(0,0,0,0.8)", maxWidth: 800, padding: "0 2rem" }}>
              &ldquo;A top-tier designer with a strong process<br />and a proactive mindset.&rdquo;
            </p>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,.5)", fontSize: ".85rem", marginTop: "1.5rem" }}>Allan Cardozo · Design Manager, Delivery Hero</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section style={{ background: "#000", padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "5rem" }}>Experience</p>
          </ScrollReveal>
          {exp.map((e, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "3rem", padding: "3.5rem 0", borderBottom: i < exp.length - 1 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
                <div>
                  <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", marginBottom: ".5rem" }}>{e.year}</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: "1.2rem", color: "#fff", marginBottom: ".4rem", letterSpacing: "-.01em" }}>{e.role}</h3>
                  <p style={{ color: e.c, fontSize: ".9rem", fontWeight: 500, marginBottom: "1.25rem" }}>{e.company}</p>
                  <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 560, marginBottom: "1.25rem" }}>{e.detail}</p>
                  <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                    {e.tags.map(t => (
                      <span key={t} style={{ padding: ".2rem .7rem", border: "1px solid rgba(255,255,255,.12)", borderRadius: 100, fontSize: ".68rem", color: "rgba(255,255,255,.4)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: "#0a0a0a", padding: "10rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "2rem" }}>Recognized by</p>
            <h2 style={{ fontSize: "clamp(2rem,4vw,4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "5rem" }}>
              What leaders say.
            </h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={(i % 3) * 80}>
                <div style={{ background: "#0a0a0a", padding: "2.5rem", height: "100%", transition: "background .3s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#111")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}
                >
                  <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.7)", lineHeight: 1.7, marginBottom: "2rem", fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                  <p style={{ fontSize: ".85rem", color: "#fff", fontWeight: 600 }}>{t.name}</p>
                  <p style={{ fontSize: ".75rem", color: "rgba(255,255,255,.4)", marginTop: ".3rem" }}>{t.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ background: "#000", padding: "12rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,113,227,.12) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "2rem" }}>Open to opportunities</p>
            <h2 style={{ fontSize: "clamp(2.5rem,6vw,6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.02, marginBottom: "1.5rem" }}>
              Based in São Paulo.<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>Open to Canada</em><br />or remote.
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 3rem", lineHeight: 1.7 }}>
              Design Lead looking for high-impact product teams. Fintech, B2B, and complex domains preferred.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-blue" style={{ fontSize: "1rem", padding: ".9rem 2.5rem" }}>Let&apos;s talk</Link>
              <a href="https://www.linkedin.com/in/rafael-guimaraes-oliveira-br/" target="_blank" rel="noopener noreferrer" className="btn-white-ghost" style={{ fontSize: "1rem", padding: ".9rem 2.5rem" }}>LinkedIn</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.08)", padding: "2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)" }}>© 2025 Rafael Guimarães. All rights reserved.</p>
          <div style={{ display: "flex", gap: "2rem" }}>
            <Link href="/" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>← Home</Link>
            <Link href="/work/cvc" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>CVC Case Study</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 860px) {
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 140px 1fr"] { grid-template-columns: 1fr !important; }
          [style*="padding: 10rem 2rem 6rem 6rem"] { padding: 8rem 1.5rem 4rem !important; }
        }
      `}</style>
    </main>
  );
}
