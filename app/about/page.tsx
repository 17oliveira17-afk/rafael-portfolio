"use client";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";
import useIsMobile from "../components/useIsMobile";

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
    story: "Three years designing fintech and growth products at one of Latin America's most demanding tech companies. I led the full redesign of restaurant onboarding — a product used by hundreds of thousands of merchants — driving +53% conversion and +135% lead verification. Alongside that, I shaped the activation and retention experience for Rappi's financial products, built and evolved Design System components adopted across multiple squads, and collaborated with PMs and engineering on concurrent workstreams under real pressure.",
    tags: ["Fintech", "Growth", "Design System", "LatAm"],
    c: "#0071e3",
  },
  {
    year: "2018 — 22",
    role: "Product Designer",
    company: "CVC Corp",
    story: "I inherited a mobile app with a 2.0★ App Store rating, a 40-second load time, and a checkout that converted at 6%. What followed was a full native redesign of the flight booking experience — from research and architecture to UI and launch. Within one month of the flights redesign going live, the rating jumped to 3.2★. After rolling out across all products, it reached 4.6★. Checkout conversion went from 6% to 20% (+212%), load time dropped from 40s to 6s.",
    tags: ["Travel", "Mobile", "Design System", "Conversion"],
    c: "#0071e3",
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
    title: "Prototype at production speed",
    desc: "I use AI tools to build high-fidelity, near-production prototypes — collapsing weeks of validation cycles into days.",
  },
  {
    title: "Automate the operational layer",
    desc: "AI takes the busywork off the team — generating Jira cards and ticket templates, drafting documentation, and trimming the operational process so designers spend their time on design, not overhead.",
  },
  {
    title: "Faster, sharper research",
    desc: "AI-assisted synthesis cuts research and pattern-recognition time dramatically — surfacing insights manual affinity mapping misses. Less groupthink, more signal, in a fraction of the time.",
  },
  {
    title: "AI-first product thinking",
    desc: "Designing for AI features — copilots, smart forms, recommendation surfaces — where the UX has to make the model feel trustworthy and useful.",
  },
];

const principles = [
  { n: "01", title: "Impact over output.", desc: "I measure success by results, not deliverables. Every design decision traces back to a metric — conversion, retention, satisfaction, revenue." },
  { n: "02", title: "Systems, not screens.", desc: "I design reusable components and scalable frameworks. A screen is temporary. A design system compounds across every product decision after me." },
  { n: "03", title: "Clarity from complexity.", desc: "Fintech, credit, compliance — I turn regulatory and technical constraints into experiences that feel obvious. The harder the domain, the more design earns its seat." },
  { n: "04", title: "Cross-functional by default.", desc: "I sit at the intersection of product, engineering, and business. I speak their languages. That's what makes execution actually happen." },
];

const testimonials = [
  { quote: "Rafael's dedication, strong design process, and proactive mindset consistently led to exceptional results. A top-tier designer.", name: "Allan Cardozo", role: "Design Manager, Delivery Hero · Ex-Rappi Director" },
  { quote: "Rafa led a major revamp of restaurant onboarding, pushing the team toward first-principles thinking and delivering real impact.", name: "Nima Zahedi", role: "Product Director, Monzo" },
  { quote: "Rafael's designs significantly improved usability and boosted conversion rates, aligning perfectly with business goals.", name: "German Sotelo", role: "Engineering Manager, Rappi" },
  { quote: "Rafa kept a complex project on track despite shifting deadlines, showing resilience and delivering outstanding results.", name: "Santiago Martinez", role: "Product Manager, Rappi" },
  { quote: "Rafael is not only an exceptional designer but also a fantastic teammate — proactive, detail-oriented, and always raising the bar.", name: "Paula Lenis", role: "Design Lead, Rappi" },
  { quote: "From the moment I interviewed Rafa, I knew he had incredible potential. Seeing his growth and contributions over time has been inspiring.", name: "Carolina Ledesma", role: "Design Manager, CVC Corp" },
];

const metrics = [
  { n: "14+", label: "Years in design" },
  { n: "8+", label: "Years in product design" },
  { n: "12+", label: "Countries served" },
  { n: "7+", label: "Years in global teams" },
  { n: "+212%", label: "Checkout conversion at CVC" },
  { n: "+53%", label: "Onboarding conversion at Rappi" },
];

export default function AboutPage() {
  const isMobile = useIsMobile();
  const padSection = isMobile ? "5rem 1.5rem" : "8rem 2rem";
  const padLarge = isMobile ? "6rem 1.5rem" : "10rem 2rem";

  return (
    <main className="page-in" style={{ background: "#000" }}>

      {/* ═══ HERO — desktop: split (text left, photo right, no overlay) | mobile: full-bleed with overlay ═══ */}
      {isMobile ? (
        <section style={{ minHeight: "100svh", background: "#000", position: "relative", overflow: "hidden", display: "flex", alignItems: "stretch" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <Image
              src="https://raw.githubusercontent.com/17oliveira17-afk/rafael-portfolio/main/public/photos/rafael-profile.jpg"
              unoptimized alt="Rafael Guimarães" fill
              style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.55 }} priority
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,.65) 50%, rgba(0,0,0,.96) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,.9) 0%, rgba(0,0,0,.6) 45%, transparent 70%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "5rem 1.5rem 3rem", maxWidth: 680 }}>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1rem", opacity: 0, animation: "fadeUp .9s ease .2s forwards" }}>
              Product Design Lead · São Paulo, Brazil
            </p>
            <h1 style={{ fontSize: "clamp(2.6rem,10vw,3.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1, marginBottom: "1.25rem", opacity: 0, animation: "fadeUp 1.1s ease .4s forwards" }}>
              Rafael<br />Guimarães.
            </h1>
            <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.65)", lineHeight: 1.75, maxWidth: 420, marginBottom: "2rem", opacity: 0, animation: "fadeUp .9s ease .6s forwards" }}>
              14+ years designing digital products. I turn complexity into clarity — fintech, B2B platforms, and mobile experiences that actually move metrics.
            </p>
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", opacity: 0, animation: "fadeUp .9s ease .8s forwards" }}>
              <Link href="/contact" className="btn-blue" style={{ fontSize: ".9rem" }}>Get in touch</Link>
              <a href="/CV-Rafael_Guimaraes-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn-white-ghost" style={{ fontSize: ".9rem" }}>Download CV</a>
            </div>
          </div>
        </section>
      ) : (
        /* Desktop: text left, clean photo right — no dark overlay */
        <section style={{ minHeight: "100svh", background: "#000", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "10rem 4rem 6rem 6rem" }}>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem", opacity: 0, animation: "fadeUp .9s ease .2s forwards" }}>
              Product Design Lead · São Paulo, Brazil
            </p>
            <h1 style={{ fontSize: "clamp(3rem,5vw,6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1, marginBottom: "1.75rem", opacity: 0, animation: "fadeUp 1.1s ease .4s forwards" }}>
              Rafael<br />Guimarães.
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.75, maxWidth: 420, marginBottom: "2.5rem", opacity: 0, animation: "fadeUp .9s ease .6s forwards" }}>
              14+ years designing digital products. I turn complexity into clarity — fintech, B2B platforms, and mobile experiences that actually move metrics.
            </p>
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", opacity: 0, animation: "fadeUp .9s ease .8s forwards" }}>
              <Link href="/contact" className="btn-blue" style={{ fontSize: ".9rem" }}>Get in touch</Link>
              <a href="/CV-Rafael_Guimaraes-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn-white-ghost" style={{ fontSize: ".9rem" }}>Download CV</a>
            </div>
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            {/* Blurred backdrop — stretched copy of the photo to extend the background
                behind Rafael toward the centre without moving the subject */}
            <Image
              src="https://raw.githubusercontent.com/17oliveira17-afk/rafael-portfolio/main/public/photos/rafael-profile.jpg"
              unoptimized alt="" fill aria-hidden
              style={{
                objectFit: "cover", objectPosition: "left top",
                transform: "scaleX(1.6) translateX(-22%)", transformOrigin: "left center",
                filter: "blur(38px) brightness(0.7)",
              }}
            />
            {/* Sharp foreground — Rafael; left edge dissolves into the blurred backdrop */}
            <Image
              src="https://raw.githubusercontent.com/17oliveira17-afk/rafael-portfolio/main/public/photos/rafael-profile.jpg"
              unoptimized alt="Rafael Guimarães" fill
              style={{
                objectFit: "cover", objectPosition: "center top",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 18%, rgba(0,0,0,0.75) 34%, #000 50%)",
                maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 18%, rgba(0,0,0,0.75) 34%, #000 50%)",
              }}
              priority
            />
            {/* Gentle darkening over the seam so it melts into the black left column */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(to right, #000 0%, rgba(0,0,0,0.55) 14%, transparent 42%)",
            }} />
          </div>
        </section>
      )}

      {/* ═══ LOGOS ═══ */}
      <section style={{ background: "#000", padding: "3.5rem 0", borderTop: "1px solid rgba(255,255,255,.06)", overflow: "hidden" }}>
        <p style={{ fontSize: ".62rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.25)", textAlign: "center", marginBottom: "2rem" }}>Companies</p>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right, #000, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left, #000, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ display: "flex", overflow: "hidden" }}>
            {[0, 1].map(copy => (
              <div key={copy} aria-hidden={copy === 1} style={{ display: "flex", gap: "3rem", alignItems: "center", animation: "logoScroll 28s linear infinite", flexShrink: 0 }}>
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
                  { src: "/logos/logo-trend.png", alt: "Trend" },
                ].map((logo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={logo.src} alt={logo.alt}
                    style={{ height: isMobile ? 60 : 80, width: "auto", opacity: 0.4, filter: "grayscale(1) brightness(2)", flexShrink: 0 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ METRICS ═══ */}
      <section style={{ background: "#0a0a0a", padding: padSection, borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
          {metrics.map((m, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div style={{ background: "#0a0a0a", padding: isMobile ? "1.75rem 1.25rem" : "2.5rem 2rem", textAlign: "center" }}>
                <div style={{ fontSize: isMobile ? "clamp(1.6rem,6vw,2.2rem)" : "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: "#0071e3", letterSpacing: "-.04em", lineHeight: 1 }}>{m.n}</div>
                <p style={{ fontSize: isMobile ? ".72rem" : ".78rem", color: "rgba(255,255,255,.5)", marginTop: ".6rem", lineHeight: 1.4 }}>{m.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ STATEMENT ═══ */}
      <section style={{ background: "#000", padding: padLarge }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem" }}>What I do</p>
            <h2 style={{ fontSize: isMobile ? "clamp(2rem,8vw,2.8rem)" : "clamp(2.5rem,5vw,5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "2rem" }}>
              I specialize in making<br />the complex feel <em style={{ color: "#0071e3", fontStyle: "italic" }}>obvious.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p style={{ fontSize: isMobile ? ".97rem" : "1.1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.8 }}>
                Fintech, B2B credit platforms, mobile commerce — these are domains where users face real stakes and real friction. My job is to remove that friction without losing the nuance that makes the product work.
              </p>
              <p style={{ fontSize: isMobile ? ".93rem" : "1.05rem", color: "rgba(255,255,255,.45)", lineHeight: 1.8 }}>
                I&apos;ve led design end-to-end at Thoughtworks, Rappi, and CVC Corp. I write briefs, run research, build systems, present to executives, and ship with engineers. I don&apos;t hand things off — I see them through.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ AI FIRST ═══ */}
      <section style={{ background: "#050510", padding: padSection, borderTop: "1px solid rgba(0,113,227,.15)", borderBottom: "1px solid rgba(0,113,227,.15)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,113,227,.07) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3" }}>AI-First Practice</p>
              <span style={{ padding: ".15rem .6rem", background: "rgba(0,113,227,.15)", border: "1px solid rgba(0,113,227,.3)", borderRadius: 100, fontSize: ".62rem", color: "#0071e3", fontWeight: 600 }}>NEW</span>
            </div>
            <h2 style={{ fontSize: isMobile ? "clamp(1.8rem,7vw,2.5rem)" : "clamp(2rem,4vw,4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              Prototyping at<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>production quality.</em>
            </h2>
            <p style={{ fontSize: isMobile ? ".93rem" : "1.05rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 680, marginBottom: "3rem" }}>
              I prototype with AI tools that generate near-production-quality interfaces — collapsing validation cycles from weeks to days. Less time in Figma limbo, more time testing with real users on something that looks and behaves like the product.
            </p>
          </ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(0,113,227,.12)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,113,227,.15)" }}>
            {aiSkills.map(({ title, desc }, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ background: "#050510", padding: isMobile ? "1.75rem 1.5rem" : "2.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: "rgba(0,113,227,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".75rem", fontWeight: 700, color: "#0071e3", marginTop: ".1rem" }}>0{i + 1}</div>
                  <div>
                    <h3 style={{ fontSize: isMobile ? ".97rem" : "1rem", fontWeight: 600, color: "#fff", marginBottom: ".5rem" }}>{title}</h3>
                    <p style={{ fontSize: isMobile ? ".85rem" : ".88rem", color: "rgba(255,255,255,.45)", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRINCIPLES ═══ */}
      <section style={{ background: "#0a0a0a", padding: padSection, borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "3rem" }}>Design principles</p>
          </ScrollReveal>
          <div className="pgrid" style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            {principles.map((p, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="pcard" style={{ background: "#0a0a0a", padding: isMobile ? "2rem 1.5rem" : "3rem 3.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <p style={{ fontSize: ".7rem", color: "#0071e3", fontWeight: 700, letterSpacing: ".1em", flexShrink: 0, marginTop: ".35rem" }}>{p.n}</p>
                  <div>
                    <h3 style={{ fontSize: isMobile ? "1.1rem" : "1.4rem", fontWeight: 700, color: "#fff", marginBottom: ".75rem", letterSpacing: "-.02em" }}>{p.title}</h3>
                    <p style={{ fontSize: isMobile ? ".88rem" : ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHOTO BREAK ═══ */}
      <section style={{ position: "relative", height: isMobile ? "50vh" : "60vh", overflow: "hidden" }}>
        <Image src="/rafael-working.jpg" alt="Rafael working" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, padding: "0 1.5rem" }}>
          <ScrollReveal>
            <p style={{ fontSize: isMobile ? "clamp(1.2rem,5vw,1.6rem)" : "clamp(1.5rem,4vw,3.5rem)", fontWeight: 700, color: "#fff", textAlign: "center", letterSpacing: "-.03em", lineHeight: 1.3, textShadow: "0 2px 40px rgba(0,0,0,0.8)", maxWidth: 800 }}>
              &ldquo;A top-tier designer with a strong process<br />and a proactive mindset.&rdquo;
            </p>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,.5)", fontSize: isMobile ? ".75rem" : ".85rem", marginTop: "1.25rem" }}>Allan Cardozo · Design Manager, Delivery Hero</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section style={{ background: "#000", padding: padLarge }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "3rem" }}>Experience</p>
          </ScrollReveal>
          {exp.map((e, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div style={{ padding: isMobile ? "2rem 0" : "3rem 0", borderBottom: i < exp.length - 1 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
                {/* Year on top on mobile */}
                <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", marginBottom: ".6rem" }}>{e.year}</p>
                <h3 style={{ fontWeight: 600, fontSize: isMobile ? "1.05rem" : "1.2rem", color: "#fff", marginBottom: ".35rem", letterSpacing: "-.01em" }}>{e.role}</h3>
                <p style={{ color: e.c, fontSize: ".9rem", fontWeight: 500, marginBottom: "1rem" }}>{e.company}</p>
                <p style={{ fontSize: isMobile ? ".88rem" : ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>{e.story}</p>
                <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                  {e.tags.map(t => (
                    <span key={t} style={{ padding: ".2rem .7rem", border: "1px solid rgba(255,255,255,.12)", borderRadius: 100, fontSize: ".68rem", color: "rgba(255,255,255,.4)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: "#0a0a0a", padding: padLarge, borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1rem" }}>Recognized by</p>
            <h2 style={{ fontSize: isMobile ? "clamp(1.8rem,7vw,2.5rem)" : "clamp(2rem,4vw,4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "3rem" }}>
              What leaders say.
            </h2>
          </ScrollReveal>
          <div className="tgrid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={(i % 3) * 80}>
                <div className="tcard" style={{
                  background: "#0a0a0a", padding: isMobile ? "1.75rem 1.5rem" : "2.25rem",
                  borderRadius: 18, border: "1px solid rgba(255,255,255,.08)", height: "100%",
                  display: "flex", flexDirection: "column",
                }}>
                  <p style={{ fontSize: isMobile ? ".9rem" : ".95rem", color: "rgba(255,255,255,.72)", lineHeight: 1.75, marginBottom: "1.5rem", fontStyle: "italic", flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
                  <p style={{ fontSize: ".85rem", color: "#fff", fontWeight: 600 }}>{t.name}</p>
                  <p style={{ fontSize: ".75rem", color: "rgba(255,255,255,.4)", marginTop: ".3rem" }}>{t.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ background: "#000", padding: isMobile ? "7rem 1.5rem" : "12rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,113,227,.12) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem" }}>Open to opportunities</p>
            <h2 style={{ fontSize: isMobile ? "clamp(2rem,8vw,3rem)" : "clamp(2.5rem,6vw,6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              Based in São Paulo.<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>Open to Canada</em><br />or remote.
            </h2>
            <p style={{ fontSize: isMobile ? ".93rem" : "1.1rem", color: "rgba(255,255,255,.55)", maxWidth: 440, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
              Design Lead looking for high-impact product teams. Fintech, B2B, and complex domains preferred.
            </p>
            <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-blue" style={{ fontSize: isMobile ? ".9rem" : "1rem", padding: ".85rem 2rem" }}>Let&apos;s talk</Link>
              <a href="https://www.linkedin.com/in/rafael-guimaraes-oliveira-br/" target="_blank" rel="noopener noreferrer" className="btn-white-ghost" style={{ fontSize: isMobile ? ".9rem" : "1rem", padding: ".85rem 2rem" }}>LinkedIn</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.08)", padding: "1.75rem 1.5rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)" }}>© 2025 Rafael Guimarães. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>← Home</Link>
            <Link href="/work/cvc" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>CVC Case Study</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes logoScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        .tcard, .pcard { opacity: .6; transition: opacity .35s ease, transform .35s cubic-bezier(.16,1,.3,1), border-color .35s ease, box-shadow .35s ease, background .35s ease; }
        .tgrid:hover .tcard, .pgrid:hover .pcard { opacity: .32; }
        .tcard:hover { opacity: 1; transform: translateY(-6px); border-color: rgba(0,113,227,.45); box-shadow: 0 24px 50px rgba(0,0,0,.45); }
        .pcard:hover { opacity: 1; background: #101014 !important; }
        @media (hover: none) { .tcard, .pcard { opacity: 1; } }
      `}</style>
    </main>
  );
}
