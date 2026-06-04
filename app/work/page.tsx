"use client";
import Link from "next/link";
import { useState, CSSProperties } from "react";
import ScrollReveal from "../components/ScrollReveal";
import RevealText from "../components/RevealText";
import useIsMobile from "../components/useIsMobile";
import { PROJECTS, type Project } from "../components/ProjectGallery";

const ArrowR = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* glowing hover wrapper — lifts + rings in the project's accent colour.
   `active` is driven by a single shared key in the parent, so entering a
   new card un-lifts the previous one even if its mouse-leave was missed. */
function Hoverable({ glow, active, onEnter, children, style }: {
  glow: string; active: boolean; onEnter: () => void;
  children: React.ReactNode; style?: CSSProperties;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      style={{
        transition: "transform .45s cubic-bezier(.16,1,.3,1), box-shadow .45s ease, border-color .45s ease",
        transform: active ? "translateY(-8px)" : "translateY(0)",
        boxShadow: active ? `0 36px 80px ${glow}30, 0 12px 30px rgba(0,0,0,.5)` : "0 1px 2px rgba(0,0,0,.4)",
        border: `1px solid ${active ? glow + "66" : "rgba(255,255,255,.08)"}`,
        borderRadius: 28,
        overflow: "hidden",
        background: "#1c1c1f",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Creative, modern project header — no photos: a mesh-gradient base with
   soft light/shadow orbs, a masked dot-grid for texture, a diagonal sheen
   and a big ghost-outline index number. Shared by all project cards. */
function Plate({ p, index, big = false }: { p: Project; index: number; big?: boolean }) {
  return (
    <div style={{ position: "relative", height: "100%", background: p.grad, padding: big ? "2.25rem" : "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", isolation: "isolate" }}>
      {/* mesh-gradient orbs: a bright highlight + a deep shadow for depth */}
      <div aria-hidden style={{ position: "absolute", width: "75%", aspectRatio: "1", borderRadius: "50%", top: "-28%", right: "-16%", background: "radial-gradient(circle at center, rgba(255,255,255,.55), transparent 62%)", filter: "blur(8px)", mixBlendMode: "soft-light", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", width: "80%", aspectRatio: "1", borderRadius: "50%", bottom: "-34%", left: "-22%", background: "radial-gradient(circle at center, rgba(0,0,0,.4), transparent 62%)", filter: "blur(14px)", pointerEvents: "none" }} />
      {/* fine dot-grid texture, masked to fade out */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.55) 1px, transparent 1.4px)", backgroundSize: big ? "20px 20px" : "16px 16px", opacity: 0.13, WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 72% 28%, #000, transparent 78%)", maskImage: "radial-gradient(ellipse 85% 80% at 72% 28%, #000, transparent 78%)", pointerEvents: "none" }} />
      {/* diagonal sheen sweep */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,.14) 48%, transparent 60%)", pointerEvents: "none" }} />
      {/* big ghost-outline index number */}
      <div aria-hidden style={{ position: "absolute", right: big ? "1.5rem" : "0.55rem", bottom: big ? "-2.4rem" : "-1.7rem", fontSize: big ? "14rem" : "9rem", fontWeight: 800, lineHeight: 1, color: "transparent", WebkitTextStroke: `${big ? 2 : 1.5}px rgba(255,255,255,.32)`, letterSpacing: "-.06em", pointerEvents: "none" }}>
        0{index + 1}
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".75rem" }}>
        <span style={{ fontSize: ".66rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.88)" }}>{p.eyebrow}</span>
        <span style={{ fontSize: ".66rem", fontWeight: 700, letterSpacing: ".06em", color: "#fff", padding: ".28rem .6rem", borderRadius: 100, background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.3)", backdropFilter: "blur(6px)", whiteSpace: "nowrap" }}>{p.company}</span>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: big ? "clamp(2.6rem,5vw,4rem)" : "clamp(2rem,5vw,2.7rem)", fontWeight: 700, letterSpacing: "-.04em", color: "#fff", lineHeight: 1, textShadow: "0 2px 20px rgba(0,0,0,.18)" }}>{p.metric}</div>
        <div style={{ fontSize: ".74rem", color: "rgba(255,255,255,.8)", marginTop: ".4rem", letterSpacing: ".04em" }}>{p.metricLabel}</div>
      </div>
    </div>
  );
}

function Body({ p, big = false }: { p: Project; big?: boolean }) {
  return (
    <div style={{ padding: big ? "2.5rem" : "1.6rem", display: "flex", flexDirection: "column", flex: 1 }}>
      <h3 style={{ fontSize: big ? "clamp(1.6rem,2.4vw,2.1rem)" : "1.3rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.02em", marginBottom: ".7rem", lineHeight: 1.1 }}>{p.title}</h3>
      <p style={{ fontSize: big ? "1rem" : ".9rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: "1.3rem", flex: 1, maxWidth: big ? 460 : undefined }}>{p.blurb}</p>
      <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap", marginBottom: "1.4rem" }}>
        {p.tags.map(t => (
          <span key={t} style={{ fontSize: ".66rem", fontWeight: 600, padding: ".25rem .65rem", borderRadius: 100, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.6)" }}>{t}</span>
        ))}
      </div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", fontSize: ".9rem", fontWeight: 600, color: p.glow }}>
        Read case study <ArrowR size={15} />
      </span>
    </div>
  );
}

export default function WorkPage() {
  const isMobile = useIsMobile();
  const [featured, ...rest] = PROJECTS;
  const [hovered, setHovered] = useState<string | null>(null);
  const pad = isMobile ? "7rem 1.5rem 5rem" : "10rem 6rem 7rem";

  return (
    <main className="page-in" style={{ background: "#000", minHeight: "100vh" }}>
      {/* radial accent */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,113,227,.12) 0%, transparent 60%)", pointerEvents: "none" }} />

      <section style={{ padding: pad, position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          {/* ── Hero ── */}
          <ScrollReveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", marginBottom: isMobile ? "3rem" : "5rem" }}>
              <div>
                <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem" }}>Selected work</p>
                <RevealText
                  lines={["Four bets.", <em key="o" className="text-gradient" style={{ fontStyle: "italic" }}>Four outcomes.</em>]}
                  style={{ fontSize: "clamp(2.4rem,6vw,4.6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.02 }}
                />
              </div>
              <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 360 }}>
                A focused set of case studies — product redesigns, design systems and design leadership across LATAM&apos;s largest apps. Depth over volume.
              </p>
            </div>
          </ScrollReveal>

          {/* All cards share one hovered key; leaving the whole area clears it,
              so a card can never get stuck lifted on a fast pointer move. */}
          <div onMouseLeave={() => setHovered(null)}>
            {/* ── Featured flagship ── */}
            <ScrollReveal delay={80}>
              <Link href={featured.href} style={{ textDecoration: "none", display: "block", marginBottom: isMobile ? "1.5rem" : "2rem" }}>
                <Hoverable glow={featured.glow} active={hovered === featured.href} onEnter={() => setHovered(featured.href)}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr" }}>
                    <div style={{ minHeight: isMobile ? 260 : 380 }}>
                      <Plate p={featured} index={0} big />
                    </div>
                    <Body p={featured} big />
                  </div>
                </Hoverable>
              </Link>
            </ScrollReveal>

            {/* ── The other three ── */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "1.5rem" : "2rem" }}>
              {rest.map((p, i) => (
                <ScrollReveal key={p.href} delay={120 + i * 80}>
                  <Link href={p.href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                    <Hoverable glow={p.glow} active={hovered === p.href} onEnter={() => setHovered(p.href)} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                      <div style={{ aspectRatio: "16 / 11" }}>
                        <Plate p={p} index={i + 1} />
                      </div>
                      <Body p={p} />
                    </Hoverable>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ── Footer CTA ── */}
          <ScrollReveal delay={120}>
            <div style={{ marginTop: isMobile ? "4rem" : "7rem", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: isMobile ? "3rem" : "4.5rem" }}>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", marginBottom: "1.5rem" }}>
                Want the rest of the story?
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 2.25rem" }}>
                These are the public ones. There&apos;s more under NDA — happy to walk you through it.
              </p>
              <Link href="/contact" className="btn-blue" style={{ padding: ".9rem 2.5rem", fontSize: ".95rem" }}>
                Get in touch →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
