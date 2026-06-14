"use client";
import { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";
import RevealText from "./RevealText";
import useIsMobile from "./useIsMobile";

export type Stat = { n: string; l: string; sub?: string };

const hexA = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
};

/* A centred, editorial case-study hero shared by every project.
   The project's accent colour drives the glow, eyebrow, tags and stats,
   and a giant ghost index number sits behind the title for scale. */
export default function CaseHero({
  accent,
  index,
  company,
  titleLines,
  subtitle,
  tags,
  stats,
  note,
}: {
  accent: string;
  index: string;          // e.g. "01"
  company: string;        // e.g. "CVC · Travel"
  titleLines: ReactNode[];
  subtitle: ReactNode;
  tags: string[];
  stats: Stat[];
  note?: string;
}) {
  const isMobile = useIsMobile();
  const a = (o: number) => hexA(accent, o);

  return (
    <section style={{
      minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: isMobile ? "7rem 1.5rem 5rem" : "8rem 6rem", position: "relative", overflow: "hidden",
    }}>
      {/* accent glow */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 62% 52% at 50% 36%, ${a(0.20)} 0%, transparent 62%)`, pointerEvents: "none" }} />
      <div aria-hidden className="aurora" style={{ opacity: 0.26, mixBlendMode: "screen" }} />
      {/* faint dot grid */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.5) 1px, transparent 1.3px)", backgroundSize: "26px 26px", opacity: 0.05, WebkitMaskImage: "radial-gradient(ellipse 72% 62% at 50% 42%, #000, transparent 76%)", maskImage: "radial-gradient(ellipse 72% 62% at 50% 42%, #000, transparent 76%)", pointerEvents: "none" }} />
      {/* giant ghost index number */}
      <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-56%)", fontSize: "min(52vw,42rem)", fontWeight: 800, lineHeight: 1, color: "transparent", WebkitTextStroke: `1.5px ${a(0.07)}`, letterSpacing: "-.06em", pointerEvents: "none", zIndex: 0, userSelect: "none" }}>{index}</div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 940 }}>
        <ScrollReveal>
          <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: accent, marginBottom: isMobile ? "1.25rem" : "1.75rem" }}>{index} · {company}</p>
        </ScrollReveal>
        <RevealText
          as="h1"
          lines={titleLines}
          stagger={90}
          style={{ fontSize: isMobile ? "clamp(2.3rem,10vw,3rem)" : "clamp(3rem,7vw,6.5rem)", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1, color: "#fff", marginBottom: "1.75rem" }}
        />
        <ScrollReveal delay={120}>
          <p style={{ fontSize: isMobile ? "1rem" : "1.15rem", color: "rgba(255,255,255,.58)", maxWidth: 600, margin: "0 auto 2.5rem", lineHeight: 1.75 }}>{subtitle}</p>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <div style={{ display: "flex", gap: ".55rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.75rem" }}>
            {tags.map((t) => (
              <span key={t} style={{ padding: ".32rem .9rem", border: `1px solid ${a(0.4)}`, borderRadius: 100, fontSize: ".7rem", color: "rgba(255,255,255,.62)", letterSpacing: ".05em" }}>{t}</span>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div style={{ display: "flex", gap: isMobile ? "1.5rem 1.25rem" : "0", flexWrap: "wrap", justifyContent: "center" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: isMobile ? "0" : "0 1.75rem", borderRight: !isMobile && i < stats.length - 1 ? "1px solid rgba(255,255,255,.12)" : "none", minWidth: isMobile ? 92 : "auto" }}>
                <p style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 700, color: accent, letterSpacing: "-.03em", lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontSize: ".68rem", color: "rgba(255,255,255,.42)", marginTop: ".5rem", letterSpacing: ".08em", textTransform: "uppercase", lineHeight: 1.4 }}>
                  {s.l}{s.sub && <><br /><span style={{ color: "rgba(255,255,255,.25)" }}>{s.sub}</span></>}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
        {note && (
          <ScrollReveal delay={240}>
            <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.25)", marginTop: "1.75rem" }}>{note}</p>
          </ScrollReveal>
        )}
      </div>

      {/* scroll cue */}
      <div aria-hidden style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem", opacity: 0.4 }}>
        <p style={{ fontSize: ".62rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#fff" }}>Scroll</p>
        <div style={{ width: 1, height: 36, background: "rgba(255,255,255,.4)" }} />
      </div>
    </section>
  );
}
