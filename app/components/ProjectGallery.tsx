"use client";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

/* ── Project data ── */
export type Project = {
  href: string;
  eyebrow: string;
  company: string;
  title: string;
  blurb: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  grad: string;        // header gradient
  glow: string;        // accent for the metric / hover ring
};

export const PROJECTS: Project[] = [
  {
    href: "/work/cvc",
    eyebrow: "B2C · Travel",
    company: "CVC",
    title: "Redesign Flights App",
    blurb: "A 1-month A/B bet that beat a 6-month rebuild — native flight booking for Brazil's largest travel app.",
    metric: "2.0★ → 4.6★",
    metricLabel: "App Store rating",
    tags: ["Mobile App", "A/B tested", "Solo designer"],
    grad: "linear-gradient(135deg, #6e4a00 0%, #e3a008 55%, #ffce1f 100%)",
    glow: "#d99400",
  },
  {
    href: "/work/rappi",
    eyebrow: "Growth · Fintech",
    company: "Rappi",
    title: "Restaurants Onboarding",
    blurb: "Merchant onboarding and fintech product design for one of LATAM's largest super-apps.",
    metric: "25M+",
    metricLabel: "Users · 9 countries",
    tags: ["Onboarding", "Fintech", "LATAM"],
    grad: "linear-gradient(135deg, #7a1f00 0%, #e2400d 55%, #ff6a2b 100%)",
    glow: "#ff5a1f",
  },
  {
    href: "/work/design-system",
    eyebrow: "Design Systems",
    company: "Rappi · CVC",
    title: "Creating Design Systems",
    blurb: "Bootstrapping a system from nothing at Rappi, and building CVC's native mobile layer.",
    metric: "0 → 1",
    metricLabel: "Systems bootstrapped",
    tags: ["Components", "Mobile DS", "Governance"],
    grad: "linear-gradient(135deg, #08362e 0%, #029e80 55%, #00c8a0 100%)",
    glow: "#00c8a0",
  },
  {
    href: "/work/leadership",
    eyebrow: "Design Leadership",
    company: "Thoughtworks",
    title: "Implementing Process",
    blurb: "Rebuilt a fractured design practice at a LATAM bank — process, roadmap, ceremonies, AI.",
    metric: "8w → 3w",
    metricLabel: "Delivery cycle",
    tags: ["Leadership", "Process", "NDA"],
    grad: "linear-gradient(135deg, #5e1430 0%, #c0395b 55%, #ec6b86 100%)",
    glow: "#e1607c",
  },
  {
    href: "/work/maple-track",
    eyebrow: "0 → 1 · Product",
    company: "MapleTrack",
    title: "Your GPS to Canada",
    blurb: "A self-initiated 0→1 product — designed and built solo — guiding a couple through every step of Canadian immigration.",
    metric: "0 → 1",
    metricLabel: "Greenfield · web + app",
    tags: ["0→1 Product", "Web + Mobile", "Founder"],
    grad: "linear-gradient(135deg, #5e0a28 0%, #c81e4e 55%, #ff385c 100%)",
    glow: "#e31c5f",
  },
];

/* ── Arrow button ── */
function Arrow({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Previous projects" : "Next projects"}
      style={{
        width: 44, height: 44, borderRadius: "50%", border: "none",
        background: disabled ? "rgba(0,0,0,.04)" : "rgba(0,0,0,.06)",
        color: disabled ? "rgba(0,0,0,.2)" : "#1d1d1f",
        cursor: disabled ? "default" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background .25s ease, transform .15s ease",
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "rgba(0,0,0,.12)"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "rgba(0,0,0,.06)"; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
}

export default function ProjectGallery({ exclude = [] }: { exclude?: string[] }) {
  const projects = PROJECTS.filter(p => !exclude.includes(p.href));
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);
  const [totalDots, setTotalDots] = useState(projects.length);

  const CARD = 360, GAP = 20, STEP = CARD + GAP;

  const update = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setAtStart(t.scrollLeft < 8);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 8);
    const visibleCards = Math.floor(t.clientWidth / STEP) || 1;
    const dots = Math.max(1, projects.length - visibleCards + 1);
    setTotalDots(dots);
    setActive(Math.min(Math.round(t.scrollLeft / STEP), dots - 1));
  }, [STEP, projects.length]);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    update();
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { t.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * STEP, behavior: "smooth" });
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Header row with arrows */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <p className="t-eyebrow" style={{ marginBottom: "1rem" }}>Selected work</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3.4vw,2.8rem)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-.03em", lineHeight: 1.05 }}>
            Case studies.
          </h2>
        </div>
        <div className="pg-arrows" style={{ display: "flex", gap: ".6rem" }}>
          <Arrow dir="left" onClick={() => scrollBy(-1)} disabled={atStart} />
          <Arrow dir="right" onClick={() => scrollBy(1)} disabled={atEnd} />
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="pg-track"
        style={{
          display: "flex", gap: GAP, overflowX: "auto",
          scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", padding: "1rem 1.5rem 1.5rem", margin: "0 -1.5rem",
        }}
      >
        {projects.map((p, i) => (
          <Link
            key={p.href}
            href={p.href}
            className="pg-card"
            style={{
              flexShrink: 0, width: CARD, maxWidth: "82vw", scrollSnapAlign: "center",
              textDecoration: "none", borderRadius: 28, overflow: "hidden",
              background: "#fff", border: "1px solid #e3e3e8",
              boxShadow: "0 1px 2px rgba(0,0,0,.04)",
              transition: "transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s ease",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* Visual header — mesh-gradient treatment, consistent with /work */}
            <div style={{
              position: "relative", aspectRatio: "16/11", background: p.grad,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              padding: "1.5rem", overflow: "hidden", isolation: "isolate",
            }}>
              <div aria-hidden style={{ position: "absolute", width: "70%", aspectRatio: "1", borderRadius: "50%", top: "-30%", right: "-14%", background: "radial-gradient(circle at center, rgba(255,255,255,.55), transparent 62%)", filter: "blur(8px)", mixBlendMode: "soft-light", pointerEvents: "none" }} />
              <div aria-hidden style={{ position: "absolute", width: "78%", aspectRatio: "1", borderRadius: "50%", bottom: "-34%", left: "-22%", background: "radial-gradient(circle at center, rgba(0,0,0,.38), transparent 62%)", filter: "blur(14px)", pointerEvents: "none" }} />
              <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.5) 1px, transparent 1.3px)", backgroundSize: "15px 15px", opacity: .12, WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 72% 26%, #000, transparent 78%)", maskImage: "radial-gradient(ellipse 85% 80% at 72% 26%, #000, transparent 78%)", pointerEvents: "none" }} />
              <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, transparent 36%, rgba(255,255,255,.13) 48%, transparent 60%)", pointerEvents: "none" }} />
              <div aria-hidden style={{ position: "absolute", right: ".5rem", bottom: "-1.4rem", fontSize: "7.5rem", fontWeight: 800, lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,.3)", letterSpacing: "-.06em", pointerEvents: "none" }}>0{PROJECTS.findIndex(x => x.href === p.href) + 1}</div>
              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".75rem" }}>
                <span style={{ fontSize: ".66rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.88)" }}>{p.eyebrow}</span>
                <span style={{ fontSize: ".66rem", fontWeight: 700, letterSpacing: ".06em", color: "#fff", padding: ".28rem .6rem", borderRadius: 100, background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.3)", backdropFilter: "blur(6px)", whiteSpace: "nowrap" }}>{p.company}</span>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 700, letterSpacing: "-.04em", color: "#fff", lineHeight: 1, textShadow: "0 2px 18px rgba(0,0,0,.18)" }}>{p.metric}</div>
                <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.78)", marginTop: ".35rem", letterSpacing: ".04em" }}>{p.metricLabel}</div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-.02em", marginBottom: ".5rem" }}>{p.title}</h3>
              <p style={{ fontSize: ".9rem", color: "#6e6e73", lineHeight: 1.6, marginBottom: "1.25rem", flex: 1 }}>{p.blurb}</p>
              <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontSize: ".66rem", fontWeight: 600, padding: ".25rem .6rem", borderRadius: 100, background: "#f1f1f4", color: "#6e6e73" }}>{t}</span>
                ))}
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", fontSize: ".88rem", fontWeight: 600, color: p.glow }}>
                Read case study
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: ".5rem" }}>
        {Array.from({ length: totalDots }).map((_, i) => (
          <button
            key={i}
            onClick={() => trackRef.current?.scrollTo({ left: i * STEP, behavior: "smooth" })}
            aria-label={`Go to project ${i + 1}`}
            style={{
              width: i === active ? 22 : 8, height: 8, borderRadius: 4, border: "none", padding: 0, cursor: "pointer",
              background: i === active ? "#1d1d1f" : "rgba(0,0,0,.18)", transition: "width .3s ease, background .3s ease",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .pg-track::-webkit-scrollbar { display: none; }
        .pg-card:hover { transform: translateY(-6px); box-shadow: 0 28px 60px rgba(0,0,0,.14); }
        @media (max-width: 767px) { .pg-arrows { display: none !important; } }
      `}</style>
    </div>
  );
}
