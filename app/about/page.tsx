"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import useIsMobile from "../components/useIsMobile";
import RevealText from "../components/RevealText";

const exp = [
  {
    year: "2025 —",
    role: "Product Design Lead",
    company: "Thoughtworks",
    story: "Joined into one of the most turbulent design fronts I've seen — a team delivering 1–2 months late, no defined process, bad design decisions, and endless uncontrolled changes. In under two months, I replaced that chaos with a structured 3-week sprint cadence covering all 5 design phases with quality gates — a 62% reduction in cycle time. I also introduced an AI-first prototyping workflow that cut operational overhead and accelerated validation. The same client who walked out of meetings later described the new plan as 'solid and leading to excellent results.' Formally designated Leader of the UX Front, added to the Client Leadership Team, rated Consistently Exceeded Expectations — performing at Lead grade. All navigated in Spanish.",
    tags: ["B2B", "Fintech", "Regulated", "Leadership", "LatAm"],
    c: "#ec6b86",
    logo: "/logos/logo-thoughtworks.png",
    companyInfo: {
      tagline: "Global technology consultancy",
      about: "One of the world's most influential tech consultancies — pioneered Agile, Continuous Delivery and Evolutionary Architecture. Partners with Fortune 500 enterprises to solve their hardest engineering and design challenges at scale.",
      industry: "Tech Consulting",
      hq: "Chicago, USA",
      founded: "1993",
      stats: [{ n: "10,000+", l: "Employees" }, { n: "48", l: "Offices worldwide" }, { n: "18", l: "Countries" }],
    },
  },
  {
    year: "2022 — 25",
    role: "Senior Product Designer",
    company: "Rappi",
    story: "Three years designing fintech and growth products at one of Latin America's most demanding tech companies. I led the full redesign of restaurant onboarding — a product used by hundreds of thousands of merchants — driving +53% conversion and +135% lead verification. Alongside that, I shaped the activation and retention experience for Rappi's financial products, built and evolved Design System components adopted across multiple squads, and collaborated with PMs and engineering on concurrent workstreams under real pressure.",
    tags: ["Fintech", "Growth", "Design System", "LatAm"],
    c: "#ff6a2b",
    logo: "/logos/logo-rappi.png",
    companyInfo: {
      tagline: "Latin America's leading super-app",
      about: "The dominant on-demand platform across Latin America — delivery, fintech, travel and commerce unified in one app. Backed by SoftBank, serving over 25 million monthly users from Colombia to Brazil.",
      industry: "Super-app · Fintech",
      hq: "Bogotá, Colombia",
      founded: "2015",
      stats: [{ n: "25M+", l: "Monthly active users" }, { n: "9", l: "Countries" }, { n: "$5.25B", l: "Peak valuation" }, { n: "4,000+", l: "Employees" }],
    },
  },
  {
    year: "2018 — 22",
    role: "Product Designer",
    company: "CVC Corp",
    story: "I inherited a mobile app with a 2.0★ App Store rating, a 40-second load time, and a checkout that converted at 6%. What followed was a full native redesign of the flight booking experience — from research and architecture to UI and launch. Within one month of the flights redesign going live, the rating jumped to 3.2★. After rolling out across all products, it reached 4.6★. Checkout conversion went from 6% to 20% (+212%), load time dropped from 40s to 6s.",
    tags: ["Travel", "Mobile", "Design System", "Conversion"],
    c: "#eab308",
    logo: "/logos/logo-cvc.png",
    companyInfo: {
      tagline: "Brazil's largest travel company",
      about: "The largest travel corporation in Latin America — publicly traded (B3: CVCB3), operating across flights, hotels, cruises and packages. Over 1,600 retail stores nationwide and R$17 billion in annual bookings.",
      industry: "Travel · E-commerce",
      hq: "São Paulo, Brazil",
      founded: "1972",
      stats: [{ n: "30M+", l: "Customers" }, { n: "1,600+", l: "Retail stores" }, { n: "R$17B", l: "Annual bookings" }, { n: "B3", l: "Publicly traded" }],
    },
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
  { quote: "Rafael's dedication, strong design process, and proactive mindset consistently led to exceptional results. A top-tier designer.", name: "Allan Cardozo", role: "Design Manager, Delivery Hero · Ex-Rappi Director", photo: "/photos/leaders/allan-cardozo.jpg" },
  { quote: "Rafa led a major revamp of restaurant onboarding, pushing the team toward first-principles thinking and delivering real impact.", name: "Nima Zahedi", role: "Product Director, Monzo", photo: "/photos/leaders/nima-zahedi.jpg" },
  { quote: "Rafa's user-centered approach, adaptability, and high-quality solutions made him an invaluable asset to the team.", name: "Diego Villarroel", role: "Head of Design, Rappi", photo: "/photos/leaders/diego-villarroel.jpg" },
  { quote: "Rafael's designs significantly improved usability and boosted conversion rates, aligning perfectly with business goals.", name: "German Sotelo", role: "Engineering Manager, Rappi", photo: "/photos/leaders/german-sotelo.jpg" },
  { quote: "Rafa kept a complex project on track despite shifting deadlines, showing resilience and delivering outstanding results.", name: "Santiago Martinez", role: "Product Manager, Rappi", photo: "/photos/leaders/santiago-martinez.jpg" },
  { quote: "Rafael played a key role in redesigning the Merchants Onboarding process, simplifying the flow and improving the user experience.", name: "Daniel Isael", role: "Product Manager, Scopely", photo: "/photos/leaders/daniel-isael.jpg" },
  { quote: "Rafael is not only an exceptional designer but also a fantastic teammate — proactive, detail-oriented, and always raising the bar.", name: "Paula Lenis", role: "Design Lead, Rappi", photo: "/photos/leaders/paula-lenis.jpg" },
  { quote: "From the moment I interviewed Rafa, I knew he had incredible potential. Seeing his growth and contributions over time has been inspiring.", name: "Carolina Ledesma", role: "Design Manager, CVC Corp", photo: "/photos/leaders/carolina-ledesma.jpg" },
  { quote: "I brought Rafa to Rappi for his strong work ethic and ability to turn complex challenges into impactful design solutions.", name: "Luis Alegria", role: "Founder & CEO, Storytime", photo: "/photos/leaders/luis-alegria.jpg" },
];

const metrics = [
  { n: "14+", label: "Years in design" },
  { n: "8+", label: "Years in product design" },
  { n: "12+", label: "Countries served" },
  { n: "7+", label: "Years in global teams" },
  { n: "+212%", label: "Checkout conversion at CVC" },
  { n: "+53%", label: "Onboarding conversion at Rappi" },
];

function CompanyInline({ name, logo, accent, info, isMobile }: {
  name: string; logo: string; accent: string;
  info: { tagline: string; about: string; industry: string; hq: string; founded: string; stats: { n: string; l: string }[] };
  isMobile: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      {/* Company name row — always visible */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: ".75rem", width: "100%",
          background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={name} style={{ height: 30, width: "auto", filter: open ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(1.8)", opacity: open ? 1 : 0.6, transition: "all .3s ease" }} />
        <span style={{ color: open ? "#fff" : "rgba(255,255,255,.55)", fontSize: ".95rem", fontWeight: 600, transition: "color .3s ease" }}>{name}</span>
        <span className="co-pill" style={{
          marginLeft: "auto",
          display: "inline-flex", alignItems: "center", gap: ".35rem",
          fontSize: ".66rem", fontWeight: 600, letterSpacing: ".04em",
          padding: ".3rem .75rem", borderRadius: 100,
          background: open ? `${accent}1a` : `${accent}0d`,
          border: `1px solid ${open ? accent + "50" : accent + "30"}`,
          color: open ? accent : accent + "aa",
          transition: "all .35s ease",
          whiteSpace: "nowrap",
        }}>
          {open ? "Hide details" : "About the company"}
          <span style={{ fontSize: ".7rem", transition: "transform .3s ease", display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
        </span>
      </button>

      {/* Expandable company card */}
      <div style={{
        maxHeight: open ? 500 : 0,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition: "max-height .55s cubic-bezier(.16,1,.3,1), opacity .4s ease",
      }}>
        <div style={{
          marginTop: ".9rem",
          borderRadius: 18,
          border: `1px solid ${accent}35`,
          background: `linear-gradient(135deg, ${accent}08 0%, transparent 60%)`,
          overflow: "hidden",
          position: "relative",
        }}>
          {/* Accent glow */}
          <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%", background: `radial-gradient(ellipse at 100% 0%, ${accent}15, transparent 70%)`, pointerEvents: "none" }} />

          {/* Top row: tagline + meta */}
          <div style={{ padding: isMobile ? "1.25rem 1.25rem .75rem" : "1.5rem 1.75rem 1rem", position: "relative" }}>
            <p style={{ fontSize: isMobile ? ".9rem" : ".95rem", color: "rgba(255,255,255,.7)", fontWeight: 500, marginBottom: ".75rem" }}>{info.tagline}</p>
            <p style={{ fontSize: ".84rem", color: "rgba(255,255,255,.45)", lineHeight: 1.7, maxWidth: 560 }}>{info.about}</p>
            <div style={{ display: "flex", gap: isMobile ? "1rem" : "1.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
              {[
                { icon: "◆", label: "Industry", value: info.industry },
                { icon: "◉", label: "HQ", value: info.hq },
                { icon: "✦", label: "Founded", value: info.founded },
              ].map(m => (
                <div key={m.label} style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                  <span style={{ fontSize: ".5rem", color: accent }}>{m.icon}</span>
                  <span style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)" }}>{m.label}:</span>
                  <span style={{ fontSize: ".72rem", color: "rgba(255,255,255,.7)", fontWeight: 600 }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid", gridTemplateColumns: `repeat(${info.stats.length}, 1fr)`,
            gap: "1px", background: `${accent}18`,
            borderTop: `1px solid ${accent}20`,
          }}>
            {info.stats.map((s) => (
              <div key={s.l} style={{ padding: isMobile ? "1rem" : "1.25rem 1.5rem", background: "#0a0a0c", textAlign: "center" }}>
                <p style={{ fontSize: isMobile ? "clamp(1.1rem,4vw,1.4rem)" : "1.5rem", fontWeight: 700, color: accent, letterSpacing: "-.03em", lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontSize: ".62rem", color: "rgba(255,255,255,.4)", marginTop: ".4rem", letterSpacing: ".06em", textTransform: "uppercase" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PRINCIPLE_ICONS = ["◎", "⬡", "◈", "⊕"];

function PrincipleCards({ principles, isMobile }: { principles: { n: string; title: string; desc: string }[]; isMobile: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: isMobile ? "1rem" : "1.25rem" }}
    >
      {principles.map((p, i) => {
        const isActive = hovered === i;
        const isDimmed = hovered !== null && hovered !== i;
        return (
          <ScrollReveal key={i} delay={i * 80}>
            <div
              onMouseEnter={() => setHovered(i)}
              style={{
                position: "relative",
                padding: isMobile ? "1.75rem" : "2.25rem",
                borderRadius: 22,
                border: `1px solid ${isActive ? "rgba(0,113,227,.4)" : "rgba(255,255,255,.07)"}`,
                background: isActive ? "rgba(0,113,227,.05)" : "#0a0a0a",
                cursor: "default",
                transition: "all .4s cubic-bezier(.16,1,.3,1)",
                transform: isActive ? "translateY(-4px)" : "translateY(0)",
                opacity: isDimmed ? 0.4 : 1,
                boxShadow: isActive ? "0 24px 60px rgba(0,113,227,.12)" : "none",
                overflow: "hidden",
                minHeight: isMobile ? undefined : 200,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* accent glow on hover */}
              {isActive && (
                <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "60%", background: "radial-gradient(ellipse at 100% 0%, rgba(0,113,227,.12), transparent 70%)", pointerEvents: "none" }} />
              )}

              {/* number + icon row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", position: "relative" }}>
                <span style={{
                  fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-.04em",
                  color: isActive ? "#0071e3" : "rgba(255,255,255,.08)",
                  transition: "color .3s ease",
                  lineHeight: 1,
                }}>
                  {p.n}
                </span>
                <span style={{
                  fontSize: "1.5rem",
                  color: isActive ? "#0071e3" : "rgba(255,255,255,.12)",
                  transition: "color .3s ease",
                }}>
                  {PRINCIPLE_ICONS[i] || "◎"}
                </span>
              </div>

              {/* title */}
              <h3 style={{
                fontSize: isMobile ? "1.1rem" : "1.25rem",
                fontWeight: 700, color: "#f5f5f7",
                letterSpacing: "-.02em", lineHeight: 1.2,
                marginBottom: ".85rem",
              }}>
                {p.title}
              </h3>

              {/* description */}
              <p style={{
                fontSize: isMobile ? ".88rem" : ".92rem",
                color: "rgba(255,255,255,.5)",
                lineHeight: 1.75,
                flex: 1,
              }}>
                {p.desc}
              </p>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

const FEATURED_COMPANIES = [
  {
    name: "Thoughtworks",
    logo: "/logos/logo-thoughtworks.png",
    accent: "#ec6b86",
    tagline: "Global technology consultancy",
    stats: [
      { n: "10,000+", l: "Employees" },
      { n: "48", l: "Offices worldwide" },
      { n: "18", l: "Countries" },
    ],
    blurb: "One of the world's most influential technology consultancies — pioneering Agile, Continuous Delivery and Evolutionary Architecture. Thoughtworks partners with enterprises to solve their hardest engineering and design challenges at scale.",
  },
  {
    name: "Rappi",
    logo: "/logos/logo-rappi.png",
    accent: "#ff6a2b",
    tagline: "Latin America's super-app",
    stats: [
      { n: "25M+", l: "Monthly users" },
      { n: "9", l: "Countries" },
      { n: "$5.25B", l: "Valuation" },
    ],
    blurb: "The leading on-demand super-app in Latin America — delivery, fintech, travel and commerce in one platform. Rappi serves over 25 million users across 9 countries, from Colombia to Brazil.",
  },
  {
    name: "CVC Corp",
    logo: "/logos/logo-cvc.png",
    accent: "#eab308",
    tagline: "Brazil's largest travel company",
    stats: [
      { n: "30M+", l: "Customers" },
      { n: "1,600+", l: "Retail stores" },
      { n: "R$17B", l: "Annual bookings" },
    ],
    blurb: "The largest travel company in Latin America — 1,600+ stores, 30 million customers, and R$17 billion in annual bookings. CVC is publicly traded (B3: CVCB3) and operates across flights, hotels, cruises and packages.",
  },
];

function CompanyShowcase({ isMobile }: { isMobile: boolean }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1rem", maxWidth: 1100, margin: "0 auto" }}>
      {FEATURED_COMPANIES.map((c) => {
        const isOpen = active === c.name;
        return (
          <div
            key={c.name}
            onClick={() => setActive(isOpen ? null : c.name)}
            onMouseEnter={() => { if (!isMobile) setActive(c.name); }}
            onMouseLeave={() => { if (!isMobile) setActive(null); }}
            style={{
              position: "relative",
              borderRadius: 20,
              border: `1px solid ${isOpen ? c.accent + "55" : "rgba(255,255,255,.08)"}`,
              background: isOpen ? c.accent + "0d" : "#0a0a0a",
              padding: isMobile ? "1.5rem" : "1.75rem",
              cursor: "pointer",
              transition: "all .4s cubic-bezier(.16,1,.3,1)",
              overflow: "hidden",
              transform: isOpen ? "translateY(-4px)" : "translateY(0)",
              boxShadow: isOpen ? `0 20px 60px ${c.accent}20` : "none",
            }}
          >
            {/* Logo + tagline */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: isOpen ? "1.25rem" : ".75rem", transition: "margin .3s ease" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo} alt={c.name}
                style={{
                  height: 42, width: "auto",
                  filter: isOpen ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(2)",
                  opacity: isOpen ? 1 : 0.5,
                  transition: "filter .4s ease, opacity .4s ease",
                }}
              />
              <div>
                <p style={{ fontSize: ".92rem", fontWeight: 700, color: isOpen ? "#fff" : "rgba(255,255,255,.7)", transition: "color .3s ease" }}>{c.name}</p>
                <p style={{ fontSize: ".72rem", color: isOpen ? c.accent : "rgba(255,255,255,.35)", transition: "color .3s ease" }}>{c.tagline}</p>
              </div>
            </div>

            {/* Expandable content */}
            <div style={{
              maxHeight: isOpen ? 300 : 0,
              opacity: isOpen ? 1 : 0,
              overflow: "hidden",
              transition: "max-height .5s cubic-bezier(.16,1,.3,1), opacity .4s ease",
            }}>
              {/* Stats row */}
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
                {c.stats.map((s) => (
                  <div key={s.l} style={{ flex: 1 }}>
                    <p style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 700, color: c.accent, letterSpacing: "-.03em", lineHeight: 1 }}>{s.n}</p>
                    <p style={{ fontSize: ".64rem", color: "rgba(255,255,255,.4)", marginTop: ".35rem", letterSpacing: ".04em", textTransform: "uppercase" }}>{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Blurb */}
              <p style={{ fontSize: ".84rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{c.blurb}</p>
            </div>

            {/* Hint when closed */}
            {!isOpen && (
              <p style={{ fontSize: ".68rem", color: "rgba(255,255,255,.2)", marginTop: ".25rem", transition: "opacity .3s ease" }}>
                {isMobile ? "Tap" : "Hover"} to see company size →
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

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
              <div key={copy} aria-hidden={copy === 1} style={{ display: "flex", gap: "3rem", alignItems: "center", animation: "logoScroll 22s linear infinite", flexShrink: 0 }}>
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
            <RevealText
              lines={["I specialize in making", <>the complex feel <em key="o" style={{ color: "#0071e3", fontStyle: "italic" }}>obvious.</em></>]}
              style={{ fontSize: isMobile ? "clamp(2rem,8vw,2.8rem)" : "clamp(2.5rem,5vw,5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "2rem" }}
            />
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
            <RevealText
              lines={["Prototyping at", <em key="p" style={{ color: "#0071e3", fontStyle: "italic" }}>production quality.</em>]}
              style={{ fontSize: isMobile ? "clamp(1.8rem,7vw,2.5rem)" : "clamp(2rem,4vw,4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "1.25rem" }}
            />
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

      {/* ═══ EDUCATION & LANGUAGES ═══ */}
      <section style={{ background: "#000", padding: padSection, borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "4rem" : "5rem" }}>

            {/* Education */}
            <div>
              <ScrollReveal>
                <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1rem" }}>Education</p>
                <RevealText
                  text="Academic foundation."
                  style={{ fontSize: isMobile ? "clamp(1.5rem,6vw,2rem)" : "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: "2rem" }}
                />
              </ScrollReveal>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { year: "Now", school: "McKinsey · Forward Program", degree: "Leadership & Management", current: true },
                  { year: "Now", school: "UX Unicornio", degree: "AI for Product Design", current: true },
                  { year: "2025", school: "IxDF · Interaction Design Foundation", degree: "AI for Designers — Top 10% Distinction", current: false },
                  { year: "2020", school: "UX Unicornio", degree: "Master-Level Product Design", current: false },
                  { year: "2019", school: "Belas Artes", degree: "Post-Graduation · Digital Design", current: false },
                  { year: "2016", school: "Universidade Anhembi Morumbi", degree: "Graduation · Digital Design", current: false },
                ].map((e, i) => (
                  <ScrollReveal key={i} delay={i * 60}>
                    <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                      <span style={{ fontSize: ".72rem", fontWeight: 700, color: e.current ? "#0071e3" : "rgba(255,255,255,.35)", letterSpacing: ".04em", flexShrink: 0, paddingTop: ".15rem", minWidth: 36 }}>{e.year}</span>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".2rem" }}>
                          <p style={{ fontSize: ".95rem", fontWeight: 600, color: "#fff" }}>{e.degree}</p>
                          {e.current && <span style={{ fontSize: ".58rem", fontWeight: 600, padding: ".12rem .5rem", borderRadius: 100, background: "rgba(0,113,227,.14)", border: "1px solid rgba(0,113,227,.3)", color: "#0071e3", letterSpacing: ".06em" }}>IN PROGRESS</span>}
                        </div>
                        <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.4)" }}>{e.school}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <ScrollReveal>
                <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1rem" }}>Languages</p>
                <RevealText
                  text="Working across LATAM."
                  style={{ fontSize: isMobile ? "clamp(1.5rem,6vw,2rem)" : "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: "2rem" }}
                />
              </ScrollReveal>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { lang: "Portuguese", level: "Native", pct: 100, flag: "🇧🇷" },
                  { lang: "Spanish", level: "Professional · C1", pct: 88, flag: "🇨🇴" },
                  { lang: "English", level: "Professional · C1", pct: 88, flag: "🇨🇦" },
                ].map((l, i) => (
                  <ScrollReveal key={i} delay={i * 80}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".5rem" }}>
                        <span style={{ fontSize: ".95rem", fontWeight: 600, color: "#fff" }}>{l.lang}</span>
                        <span style={{ fontSize: ".78rem", color: "rgba(255,255,255,.5)" }}>{l.level}</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 3, background: l.pct === 100 ? "#0071e3" : "rgba(0,113,227,.6)", width: `${l.pct}%`, transition: "width 1s ease" }} />
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Skills summary */}
              <ScrollReveal delay={120}>
                <div style={{ marginTop: "2.5rem" }}>
                  <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.25rem" }}>Core tools</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                    {["Figma", "Maze", "Hotjar", "Dovetail", "Mixpanel", "Jira", "Notion", "Claude Code", "ChatGPT", "Cursor", "Midjourney"].map(t => (
                      <span key={t} style={{ fontSize: ".72rem", fontWeight: 500, padding: ".3rem .75rem", borderRadius: 100, border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.6)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRINCIPLES ═══ */}
      <section style={{ background: "#0a0a0a", padding: padSection, borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1rem" }}>Design principles</p>
            <RevealText
              text="How I think."
              style={{ fontSize: isMobile ? "clamp(1.8rem,7vw,2.5rem)" : "clamp(2rem,4vw,4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "3rem" }}
            />
          </ScrollReveal>
          <PrincipleCards principles={principles} isMobile={isMobile} />
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
          <div className="timeline">
            {exp.map((e, i) => (
              <ScrollReveal key={i} delay={i * 70}>
                <div className="tl-item">
                  <div className="tl-rail"><span className={i === 0 ? "tl-dot tl-dot-now" : "tl-dot"} style={e.c !== "#6e6e73" ? { background: e.c, borderColor: e.c } : undefined} /></div>
                  <div className="tl-body">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", fontSize: ".8rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: e.c, marginBottom: ".7rem" }}>
                      {e.year}{i === 0 && <span style={{ fontSize: ".58rem", padding: ".12rem .5rem", borderRadius: 100, background: `${e.c}24`, border: `1px solid ${e.c}4d`, letterSpacing: ".08em" }}>NOW</span>}
                    </span>
                    <h3 style={{ fontWeight: 700, fontSize: isMobile ? "1.1rem" : "1.35rem", color: "#fff", letterSpacing: "-.02em", marginBottom: ".2rem" }}>{e.role}</h3>

                    {/* Company name + expandable info for big companies */}
                    {e.companyInfo ? (
                      <CompanyInline name={e.company} logo={e.logo!} accent={e.c} info={e.companyInfo} isMobile={isMobile} />
                    ) : (
                      <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".95rem", fontWeight: 500, marginBottom: "1rem" }}>{e.company}</p>
                    )}

                    <p style={{ fontSize: isMobile ? ".88rem" : ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.25rem", maxWidth: 680 }}>{e.story}</p>
                    <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                      {e.tags.map(t => (
                        <span key={t} style={{ padding: ".2rem .7rem", border: `1px solid ${e.c !== "#6e6e73" ? e.c + "30" : "rgba(255,255,255,.12)"}`, borderRadius: 100, fontSize: ".68rem", color: "rgba(255,255,255,.4)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: "#0a0a0a", padding: padLarge, borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1rem" }}>Recognized by</p>
            <RevealText
              text="What leaders say."
              style={{ fontSize: isMobile ? "clamp(1.8rem,7vw,2.5rem)" : "clamp(2rem,4vw,4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "3rem" }}
            />
          </ScrollReveal>
          <div className="tgrid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={(i % 3) * 80}>
                <div className="tcard" style={{
                  position: "relative", background: "#0a0a0a", padding: isMobile ? "1.75rem 1.5rem" : "2.25rem",
                  borderRadius: 18, border: "1px solid rgba(255,255,255,.08)", height: "100%",
                  display: "flex", flexDirection: "column",
                }}>
                  <span className="t-quote-mark" aria-hidden>&rdquo;</span>
                  <p style={{ fontSize: isMobile ? ".9rem" : ".95rem", color: "rgba(255,255,255,.72)", lineHeight: 1.75, marginBottom: "1.75rem", flex: 1, position: "relative" }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                    {(t as {photo?: string}).photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={(t as {photo?: string}).photo!} alt={t.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid rgba(0,113,227,.35)" }} />
                    ) : (
                      <span className="t-avatar" aria-hidden>{t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
                    )}
                    <div>
                      <p style={{ fontSize: ".85rem", color: "#fff", fontWeight: 600 }}>{t.name}</p>
                      <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", marginTop: ".15rem" }}>{t.role}</p>
                    </div>
                  </div>
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
            <RevealText
              lines={["Based in São Paulo.", <em key="c" style={{ color: "#0071e3", fontStyle: "italic" }}>Open to Canada</em>, "or remote."]}
              style={{ fontSize: isMobile ? "clamp(2rem,8vw,3rem)" : "clamp(2.5rem,6vw,6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "1.25rem" }}
            />
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
        .tcard { opacity: .82; transition: opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1), border-color .35s ease, box-shadow .35s ease, background .35s ease; }
        .tgrid:hover .tcard { opacity: .4; }
        .tcard:hover { opacity: 1 !important; transform: translateY(-6px) scale(1.015); border-color: rgba(0,113,227,.5); box-shadow: 0 28px 60px rgba(0,0,0,.5); }
        @media (hover: none) { .tcard { opacity: 1; } }

        /* Testimonial details */
        .t-quote-mark { position: absolute; top: .9rem; right: 1.4rem; font-size: 3.6rem; line-height: 1; color: rgba(0,113,227,.16); font-family: Georgia, "Times New Roman", serif; transition: color .35s ease; pointer-events: none; }
        .tcard:hover .t-quote-mark { color: rgba(0,113,227,.5); }
        .t-avatar { width: 38px; height: 38px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: .78rem; font-weight: 700; color: #fff; background: linear-gradient(135deg, #0071e3, #4aa3ff); flex-shrink: 0; }

        /* Principles — a real table (header row + aligned columns) */
        .ptable { border-top: 1px solid rgba(255,255,255,.12); }
        .prow { position: relative; display: grid; grid-template-columns: 64px minmax(170px, 1fr) 1.5fr; gap: 1.5rem 2rem; align-items: baseline; padding: 1.75rem 1rem; border-bottom: 1px solid rgba(255,255,255,.08); overflow: hidden; transition: padding-left .45s cubic-bezier(.16,1,.3,1); }
        .phead { padding-top: 0; padding-bottom: .9rem; border-bottom: 1px solid rgba(255,255,255,.14); }
        .phead span { font-size: .64rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.32); font-weight: 600; }
        .prow:not(.phead)::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,113,227,.13), transparent 72%); transform: translateX(-101%); transition: transform .55s cubic-bezier(.16,1,.3,1); pointer-events: none; }
        .prow:not(.phead):hover::before { transform: translateX(0); }
        .prow:not(.phead):hover { padding-left: 1.75rem; }
        .pnum { position: relative; font-size: 1.35rem; font-weight: 800; color: rgba(255,255,255,.22); letter-spacing: -.03em; transition: color .4s ease; }
        .prow:not(.phead):hover .pnum { color: #0071e3; }
        .ptitle { position: relative; font-size: 1.15rem; font-weight: 700; color: #fff; letter-spacing: -.01em; }
        .pdesc { position: relative; font-size: .92rem; color: rgba(255,255,255,.55); line-height: 1.65; }
        @media (max-width: 768px) {
          .phead { display: none; }
          .prow { grid-template-columns: 38px 1fr; gap: .4rem 1rem; padding: 1.5rem .5rem; }
          .pdesc { grid-column: 1 / -1; margin-top: .5rem; }
          .ptitle { font-size: 1.05rem; }
          .prow:not(.phead):hover { padding-left: 1.25rem; }
        }

        /* Experience — vertical timeline */
        .tl-item { position: relative; display: grid; grid-template-columns: 26px 1fr; gap: 1.6rem; padding-bottom: 3.25rem; }
        .tl-item:last-child { padding-bottom: 0; }
        .tl-rail { position: relative; }
        .tl-rail::before { content: ""; position: absolute; left: 50%; top: 16px; bottom: -3.25rem; width: 1px; background: linear-gradient(180deg, rgba(0,113,227,.5), rgba(255,255,255,.06)); transform: translateX(-50%); }
        .tl-item:last-child .tl-rail::before { display: none; }
        .tl-dot { position: absolute; left: 50%; top: 6px; width: 13px; height: 13px; border-radius: 50%; transform: translateX(-50%); background: #000; border: 2px solid rgba(255,255,255,.28); transition: border-color .35s ease, background .35s ease, box-shadow .35s ease, transform .35s ease; }
        .tl-item:hover .tl-dot { border-color: #0071e3; background: #0071e3; box-shadow: 0 0 0 6px rgba(0,113,227,.14); transform: translateX(-50%) scale(1.15); }
        .tl-dot-now { background: #0071e3; border-color: #0071e3; box-shadow: 0 0 0 5px rgba(0,113,227,.16); animation: tlPulse 2.4s ease-in-out infinite; }
        @keyframes tlPulse { 0%,100% { box-shadow: 0 0 0 5px rgba(0,113,227,.16); } 50% { box-shadow: 0 0 0 9px rgba(0,113,227,.04); } }
        .tl-body { padding: .25rem .75rem 1.25rem .25rem; border-radius: 14px; transition: background .35s ease; }
        .tl-item:hover .tl-body { background: rgba(255,255,255,.025); }
      `}</style>
    </main>
  );
}
