"use client";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";

const exp = [
  {
    year: "2025 —",
    role: "Product Design Lead",
    company: "Thoughtworks",
    story: "Joined into one of the most turbulent design fronts I've seen — a team delivering 1–2 months late, no defined process, bad design decisions, and endless uncontrolled changes. In under two months, I replaced that chaos with a structured 3-week sprint cadence covering all 5 design phases with quality gates — a 62% reduction in cycle time. I also introduced an AI-first prototyping workflow that cut operational overhead and accelerated validation. The same client who walked out of meetings later described the new plan as 'solid and leading to excellent results.' Formally designated Leader of the UX Front, added to the Client Leadership Team, rated Consistently Exceeded Expectations — performing at Lead grade. All navigated in Spanish.",
    tags: ["B2B", "Fintech", "Regulated", "Leadership", "LatAm"],
    c: "#0071e3",
  },
  {
    year: "2022 — 25",
    role: "Senior Product Designer",
    company: "Rappi",
    story: "Three years designing fintech and growth products at one of Latin America's most demanding tech companies. I led the full redesign of restaurant onboarding — a product used by hundreds of thousands of merchants — driving +53% conversion and +135% lead verification. Alongside that, I shaped the activation and retention experience for Rappi's financial products, built and evolved Design System components adopted across multiple squads, and collaborated with PMs and engineering on concurrent workstreams under real pressure. The environment was fast, the stakes were high, and the impact was measurable.",
    tags: ["Fintech", "Growth", "Design System", "LatAm"],
    c: "#ff6b00",
  },
  {
    year: "2018 — 22",
    role: "Product Designer",
    company: "CVC Corp",
    story: "I inherited a mobile app with a 2.0★ App Store rating, a 40-second load time, and a checkout that converted at 6%. What followed was a full native redesign of the flight booking experience — from research and architecture to UI and launch. Within one month of the flights redesign going live, the rating jumped to 3.2★. After rolling out across all products, it reached 4.6★. Checkout conversion went from 6% to 20% (+212%), load time dropped from 40s to 6s. I also led CVC's first loyalty program and contributed to Design System maturation. The project that showed me what design leadership with real business stakes looks like.",
    tags: ["Travel", "Mobile", "Design System", "Conversion"],
    c: "#b8ab00",
  },
  {
    year: "Until 2018",
    role: "UX / UI / Web Designer",
    company: "Agencies",
    story: "Seven years across digital agencies — e-commerce, multimedia, web, and brand. Where I built the craft: front-end intuition, visual communication, 3D visualization, and a habit of shipping under tight deadlines for demanding clients. The foundation everything else is built on.",
    tags: ["E-commerce", "Web", "UI", "Brand"],
    c: "#6e6e73",
  },
];

const aiSkills = [
  {
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: "Prototype at production speed",
    desc: "I use AI tools to build high-fidelity, near-production prototypes — collapsing weeks of validation cycles into days.",
  },
  {
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>,
    title: "AI-first product thinking",
    desc: "Designing for AI features — copilots, smart forms, recommendation surfaces — where the UX has to make the model feel trustworthy and useful.",
  },
  {
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><path d="m12 12 4 10 1.7-4.3L22 16Z"/></svg>,
    title: "Reduce bias, increase signal",
    desc: "AI-assisted synthesis cuts pattern recognition time and surfaces insights that manual affinity mapping misses. Less groupthink, more signal.",
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
  { n: "4.6★", label: "App Store rating (2.0 → 3.2 → 4.6)" },
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
            <a href="/CV-Rafael_Guimaraes-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn-white-ghost" style={{ fontSize: ".95rem" }}>Download CV</a>
          </div>
        </div>

        {/* Right — photo */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #000 0%, transparent 30%)", zIndex: 1 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, #000 0%, transparent 100%)", zIndex: 1 }} />
          <Image
            src="/rafael-portrait-v2.png"
            alt="Rafael Guimarães"
            fill
            style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.85 }}
            priority
          />
          <div style={{ position: "absolute", bottom: "10%", left: "20%", width: "60%", height: "40%", background: "radial-gradient(ellipse, rgba(0,113,227,0.3) 0%, transparent 70%)", zIndex: 2 }} />
        </div>
      </section>

      {/* ═══ LOGOS CAROUSEL ═══ */}
      <section style={{ background: "#000", padding: "4rem 0", borderTop: "1px solid rgba(255,255,255,.06)", overflow: "hidden" }}>
        <p style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.25)", textAlign: "center", marginBottom: "2.5rem" }}>Companies</p>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, #000, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, #000, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ display: "flex", gap: "6rem", alignItems: "center", animation: "logoScroll 28s linear infinite", width: "max-content" }}>
            {[
              { src: "/logos/logo-thoughtworks.png", alt: "Thoughtworks" },
              { src: "/logos/logo-rappi.png", alt: "Rappi" },
              { src: "/logos/logo-cvc.png", alt: "CVC Corp" },
              { src: "/logos/logo-submarino.png", alt: "Submarino Viagens" },
              { src: "/logos/logo-almundo.png", alt: "Almundo" },
              { src: "/logos/logo-avantrip.png", alt: "Avantrip" },
              { src: "/logos/logo-biblos.png", alt: "Biblos" },
              { src: "/logos/logo-experimento.png", alt: "Experimento" },
              { src: "/logos/logo-ola.png", alt: "Ola" },
              { src: "/logos/logo-visual.png", alt: "Visual" },
              { src: "/logos/logo-rexture.png", alt: "Rexture" },
              { src: "/logos/logo-trend.png", alt: "Trend" },
              { src: "/logos/logo-frame1.png", alt: "Company" },
              { src: "/logos/logo-2.png", alt: "Company" },
              { src: "/logos/logo-5.png", alt: "Company" },
              { src: "/logos/logo-thoughtworks.png", alt: "Thoughtworks" },
              { src: "/logos/logo-rappi.png", alt: "Rappi" },
              { src: "/logos/logo-cvc.png", alt: "CVC Corp" },
              { src: "/logos/logo-submarino.png", alt: "Submarino Viagens" },
              { src: "/logos/logo-almundo.png", alt: "Almundo" },
              { src: "/logos/logo-avantrip.png", alt: "Avantrip" },
              { src: "/logos/logo-biblos.png", alt: "Biblos" },
              { src: "/logos/logo-experimento.png", alt: "Experimento" },
              { src: "/logos/logo-ola.png", alt: "Ola" },
              { src: "/logos/logo-visual.png", alt: "Visual" },
              { src: "/logos/logo-rexture.png", alt: "Rexture" },
              { src: "/logos/logo-trend.png", alt: "Trend" },
              { src: "/logos/logo-frame1.png", alt: "Company" },
              { src: "/logos/logo-2.png", alt: "Company" },
              { src: "/logos/logo-5.png", alt: "Company" },
            ].map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                style={{ height: 128, width: "auto", opacity: 0.45, filter: "grayscale(1) brightness(2)", transition: "opacity .3s", flexShrink: 0 }}
                onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.opacity = "1")}
                onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.opacity = "0.4")}
              />
            ))}
          </div>
        </div>
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

      {/* ═══ AI FIRST ═══ */}
      <section style={{ background: "#050510", padding: "8rem 2rem", borderTop: "1px solid rgba(0,113,227,.15)", borderBottom: "1px solid rgba(0,113,227,.15)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,113,227,.07) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3" }}>AI-First Practice</p>
              <span style={{ padding: ".15rem .6rem", background: "rgba(0,113,227,.15)", border: "1px solid rgba(0,113,227,.3)", borderRadius: 100, fontSize: ".65rem", color: "#0071e3", fontWeight: 600, letterSpacing: ".08em" }}>NEW</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              Prototyping at<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>production quality.</em>
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 680, marginBottom: "4rem" }}>
              I prototype with AI tools that generate near-production-quality interfaces — collapsing validation cycles from weeks to days. Less time in Figma limbo, more time testing with real users on something that actually looks and behaves like the product. It also changes how I think: AI-first design means designing for models as collaborators, not just features.
            </p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(0,113,227,.12)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,113,227,.15)" }}>
            {aiSkills.map(({ svg, title, desc }, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ background: "#050510", padding: "2.5rem", height: "100%", transition: "background .3s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#0a0a1a")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#050510")}
                >
                  <div style={{ marginBottom: "1.25rem" }}>{svg}</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: ".75rem", letterSpacing: "-.01em" }}>{title}</h3>
                  <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.45)", lineHeight: 1.7 }}>{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
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
                  <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)" }}>{e.year}</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: "1.2rem", color: "#fff", marginBottom: ".5rem", letterSpacing: "-.01em" }}>{e.role}</h3>
                  <p style={{ color: e.c, fontSize: ".9rem", fontWeight: 500, marginBottom: "1.5rem" }}>{e.company}</p>
                  <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.5rem" }}>{e.story}</p>
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
        @keyframes logoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
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
