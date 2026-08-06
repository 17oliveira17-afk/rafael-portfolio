"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect, ReactNode } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import useIsMobile from "../../components/useIsMobile";
import RevealText from "../../components/RevealText";
import CaseHero from "../../components/CaseHero";
import FloatingProjectNav from "../../components/FloatingProjectNav";
import SegmentedTabs from "../../components/SegmentedTabs";
import LoopVideo from "../../components/LoopVideo";

/* ── Animated counter ── */
function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 2200, s = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - s) / dur, 1);
          setV(Math.round((1 - Math.pow(1 - p, 4)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

/* ── Small icons ── */
const IconLayers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconSeed = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20s-3-3-3-8a8 8 0 0 1 16 0c0 5-3 8-3 8"/><path d="M12 12v8"/><path d="M9 16h6"/>
  </svg>
);
const IconMobile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/>
  </svg>
);
const IconBox = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

/* ── Shared bits ── */
function Label({ children, color = "#00c8a0" }: { children: ReactNode; color?: string }) {
  return <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color, marginBottom: "1.5rem" }}>{children}</p>;
}
function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.1) 50%, transparent 100%)", margin: "0 2rem" }} />;
}
function Tag({ children, color = "#00c8a0" }: { children: ReactNode; color?: string }) {
  return <span style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".06em", padding: ".3rem .9rem", borderRadius: 100, background: `${color}22`, border: `1px solid ${color}55`, color }}>{children}</span>;
}

/* ── Auto-cycling DS viewer (shared by Rappi + CVC) ── */
type DSSlide = { src: string; label: string; video?: boolean };

const DS_CVC_SLIDES: DSSlide[] = [
  { src: "/work/ds-cvc/ds-overview.png", label: "Button" },
  { src: "/work/ds-cvc/ds-native.png", label: "Native Elements" },
  { src: "/work/ds-cvc/ds-checkbox.png", label: "Checkbox" },
  { src: "/work/ds-cvc/ds-switch.png", label: "Switch" },
  { src: "/work/ds-cvc/ds-stepper.png", label: "Stepper" },
  { src: "/work/ds-cvc/ds-dialog.png", label: "Dialog" },
  { src: "/work/ds-cvc/ds-carousel.png", label: "Carousel" },
  { src: "/work/ds-cvc/ds-avatar.png", label: "Avatar" },
  { src: "/work/ds-cvc/ds-bottomsheet.png", label: "Bottom Sheet" },
  { src: "/work/ds-cvc/ds-sheet-rules.png", label: "Do / Don't" },
  { src: "/work/ds-cvc/ds-alert.png", label: "Alert + Docs" },
  { src: "/work/ds-cvc/ds-tooltip.png", label: "Tooltip + Docs" },
];

const DS_RAPPI_SLIDES: DSSlide[] = [
  { src: "/work/ds-rappi/solution-component.mp4", label: "Component", video: true },
  { src: "/work/ds-rappi/solution-variations.mp4", label: "Variations", video: true },
  { src: "/work/ds-rappi/solution-docs.mp4", label: "Documentation", video: true },
  { src: "/work/ds-rappi/solution-usage.mp4", label: "Usage rules", video: true },
  { src: "/work/ds-rappi/discovery-competitors.png", label: "Benchmarks" },
  { src: "/work/ds-rappi/discovery-rappi-teams.png", label: "Team audit" },
  { src: "/work/ds-rappi/definition-anatomy.png", label: "Anatomy" },
  { src: "/work/ds-rappi/definition-states.png", label: "States" },
];

function DSCycler({ isMobile, slides, fit = "contain" }: { isMobile: boolean; slides: DSSlide[]; accent?: string; fit?: "contain" | "cover" }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setActive((p) => (p + 1) % slides.length), 4000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, slides.length]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => { if (v) { if (i === active) { v.currentTime = 0; v.play().catch(() => {}); } else { v.pause(); } } });
  }, [active]);

  const go = (i: number) => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 10000); };
  const framed = fit === "cover"; // flat screenshots get a card; MacBook mockups float free on the page

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {/* tabs on top — the floating project nav lives at the bottom of the viewport */}
      <div style={{ marginBottom: "1.5rem" }}>
        <SegmentedTabs labels={slides.map((s) => s.label)} active={active} onChange={go} size="sm" />
      </div>
      <div style={{
        position: "relative", aspectRatio: "1600 / 970", overflow: "hidden",
        ...(framed ? { borderRadius: isMobile ? 14 : 20, background: "#0a0a0c", border: "1px solid rgba(255,255,255,.07)", boxShadow: "0 30px 70px rgba(0,0,0,.45)" } : {}),
      }}>
        {slides.map((s, i) => (
          <div key={i} style={{ position: i === 0 ? "relative" : "absolute", inset: 0, width: "100%", height: "100%", opacity: i === active ? 1 : 0, transition: "opacity .6s ease" }}>
            {s.video ? (
              <video ref={el => { videoRefs.current[i] = el; }} src={s.src} muted loop playsInline
                style={{ width: "100%", height: "100%", objectFit: fit, display: "block" }} />
            ) : (
              <Image src={s.src} alt={s.label} width={1600} height={970}
                style={{ width: "100%", height: "100%", objectFit: fit, display: "block" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Media placeholder (drop a real screenshot here later) ── */
function MediaPlaceholder({ label, filename, hint, aspect = "16/9", accent = "#00c8a0" }:
  { label: string; filename: string; hint?: string; aspect?: string; accent?: string }) {
  return (
    <div style={{
      width: "100%", aspectRatio: aspect, background: `${accent}0d`, border: `2px dashed ${accent}59`,
      borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: ".75rem", padding: "2rem", textAlign: "center",
    }}>
      <div style={{ color: accent }}><IconBox /></div>
      <p style={{ fontSize: ".9rem", fontWeight: 700, color: accent, letterSpacing: "-.01em" }}>{label}</p>
      <code style={{ fontSize: ".72rem", color: accent, background: `${accent}1a`, padding: ".25rem .6rem", borderRadius: 6 }}>/public/{filename}</code>
      {hint && <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", maxWidth: 420, lineHeight: 1.5 }}>{hint}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════
   DESIGN SYSTEMS · RAPPI + CVC
   ══════════════════════════════════════════ */
export default function DesignSystemCasePage() {
  const isMobile = useIsMobile();
  const pad = isMobile ? "5rem 1.5rem" : "8rem 6rem";

  return (
    <main className="page-in dark-cursor" style={{ background: "#000", "--blue": "#00c8a0", "--blue-hover": "#00a885" } as React.CSSProperties}>

      <FloatingProjectNav />

      {/* ═══ 01 · HERO ═══ */}
      <CaseHero
        accent="#00c8a0"
        index="03"
        company="Rappi & CVC · Design Systems"
        titleLines={["Design systems,", <em key="z" style={{ color: "#00c8a0", fontStyle: "italic" }}>from zero to scale.</em>]}
        subtitle={<>Two companies, two starting points. At <strong style={{ color: "#fff", fontWeight: 600 }}>Rappi</strong> I helped a team bootstrap a system from nothing — no budget, no dedicated DS team. At <strong style={{ color: "#fff", fontWeight: 600 }}>CVC</strong> I built the mobile layer of a system that had none, shipping only the components that genuinely make an app feel native.</>}
        tags={["Design Systems", "Mobile", "B2B & B2C"]}
        stats={[
          { n: "0 → 1", l: "Systems bootstrapped" },
          { n: "2", l: "Companies · 2 contexts" },
          { n: "Web + App", l: "Best practices shared" },
        ]}
      />

      {/* ═══ FULL-BLEED DESIGN SYSTEM VIDEO ═══ */}
      <section style={{ width: "100%", position: "relative" }}>
        <LoopVideo
          src="/videos/ds-components.mp4"
          label="Building the component library, screen by screen"
          aspect={isMobile ? "16 / 12" : "21 / 9"}
          radius={0}
        />
      </section>

      <Divider />

      {/* ═══ 02 · THE THROUGH-LINE ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>How I approach design systems</Label>
            <RevealText
              lines={["A system is only worth it", <>if it <em key="e" style={{ color: "#00c8a0", fontStyle: "italic" }}>earns its keep.</em></>]}
              style={{ fontSize: isMobile ? "clamp(1.6rem,6vw,2.4rem)" : "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}
            />
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              I&apos;ve worked on design systems from both directions — <strong style={{ color: "#fff" }}>contributing to a maturing one</strong> and <strong style={{ color: "#fff" }}>starting one from zero</strong> with no investment behind it. In both, my rule was the same: don&apos;t build a component library for its own sake. Build only what removes real friction, ships faster, and stays consistent at scale.
            </p>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85 }}>
              That discipline is what let a single, well-made text field seed an entire system at Rappi — and what kept the CVC mobile system lean enough that the team actually adopted it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ 03 · RAPPI — ZERO TO ONE ═══ */}
      <section style={{ padding: pad, background: "#050505", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(0,200,160,.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* — CHAPTER OPENER — */}
          <ScrollReveal>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(0,200,160,.16)", border: "1px solid rgba(0,200,160,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c8a0" }}><IconSeed /></div>
              <div>
                <Label color="#00c8a0">Rappi · B2B · 9 countries</Label>
                <h2 style={{ fontSize: isMobile ? "clamp(1.5rem,6vw,2.2rem)" : "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", lineHeight: 1.1 }}>
                  Nine countries, one brand —<br /><em style={{ color: "#00c8a0", fontStyle: "italic" }}>nine different text fields.</em>
                </h2>
              </div>
            </div>
          </ScrollReveal>

          {/* — THE SITUATION — */}
          <ScrollReveal delay={60}>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.25rem" }}>
              When I joined Rappi&apos;s <strong style={{ color: "#fff" }}>B2B Design team</strong>, the design system was already fragmenting. The team spanned 9 countries, but there was no dedicated DS squad and no budget to create one. Each country&apos;s designers built their own components. The same text field looked different in Colombia, Mexico and Brazil — and nobody was wrong, because there was no standard to be right against.
            </p>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.25rem" }}>
              The consequence wasn&apos;t just visual. Every time a team needed a component that didn&apos;t exist, they built it from scratch — their own states, their own anatomy, their own documentation (or none). Shipping slowed down, reviews got longer, and the brand was quietly dissolving.
            </p>
          </ScrollReveal>

          {/* — THE INSIGHT — */}
          <ScrollReveal delay={80}>
            <div style={{ borderLeft: "3px solid #00c8a0", paddingLeft: "1.5rem", margin: "2rem 0 2.5rem", maxWidth: 680 }}>
              <p style={{ fontSize: isMobile ? "1rem" : "1.1rem", color: "#f5f5f7", lineHeight: 1.8, fontStyle: "italic" }}>
                We didn&apos;t need a design system team. We needed one component done so well that it became the template for everything after it.
              </p>
            </div>
          </ScrollReveal>

          {/* — WHAT I DID — */}
          <ScrollReveal delay={100}>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "2.5rem" }}>
              We adopted a <strong style={{ color: "#fff" }}>collaborative model</strong> — one designer led the system, and individual designers each owned a component. I chose the <strong style={{ color: "#fff" }}>text field</strong>: the most-used, most-inconsistent atom in the entire product. If I could get this one right — benchmarked, documented, governed — it would set the pattern for every component that followed.
            </p>
          </ScrollReveal>

          {/* — THE PROCESS — */}
          <ScrollReveal delay={110}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { k: "01 · Discovery", t: "Benchmarked the best, audited our own.", d: "I studied Google Material, Airbnb, Uber Eats and Apple — then asked every Rappi team to hand over their own text fields. Mapping each team's identity and needs before drawing a single line." },
                { k: "02 · Definition", t: "One anatomy, many variations.", d: "A Material-based anatomy with an outline that makes every state legible — extended with support messages, states, icons, large text, code validation and chips, tuned for desktop and responsive web." },
                { k: "03 · Solution", t: "One component + full documentation.", d: "All states and types consolidated into a single main component. Then full documentation — intro, anatomy, specs, usage rules and max-width guidance — so any designer in any country could apply it without asking." },
              ].map((c, i) => (
                <div key={i} style={{ padding: "1.75rem", borderRadius: 16, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
                  <p style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#00c8a0", marginBottom: ".9rem" }}>{c.k}</p>
                  <h4 style={{ fontSize: ".98rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".5rem", lineHeight: 1.25 }}>{c.t}</h4>
                  <p style={{ fontSize: ".86rem", color: "rgba(255,255,255,.5)", lineHeight: 1.65 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* — THE WORK — */}
          <ScrollReveal delay={120}>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.75rem" }}>
              The result was a single main component containing <strong style={{ color: "#fff" }}>every variation</strong> — default, hover, focus, filling, filled, disabled, error — across every type: icons on either side, text areas, code validation fields and chips. One component, one source of truth, with documentation thorough enough that any designer could use it day one.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={130}>
            <div style={{ marginBottom: "2.5rem" }}>
              <DSCycler isMobile={isMobile} slides={DS_RAPPI_SLIDES} accent="#00c8a0" fit="cover" />
            </div>
          </ScrollReveal>

          {/* — WHAT CHANGED — */}
          <ScrollReveal delay={140}>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.75rem" }}>
              The text field shipped — and something unexpected happened. The <strong style={{ color: "#fff" }}>process</strong> mattered as much as the component. Discovery → definition → solution became the workflow every designer followed when contributing their own component. The system wasn&apos;t growing because of a DS team; it was growing because the <em style={{ color: "#00c8a0" }}>process was now embedded in how the team worked</em>.
            </p>
          </ScrollReveal>

          {/* — THE IMPACT — */}
          <ScrollReveal delay={150}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)", marginTop: ".5rem" }}>
              {[
                { n: "Unified", l: "Brand consistency", sub: "One component standard adopted across all B2B teams in 9 countries" },
                { n: "Faster", l: "Component creation", sub: "Reusable foundations cut the time to ship every new component" },
                { n: "Process", l: "Alignment before building", sub: "Discovery → definition → solution became the workflow for every new component" },
              ].map((m, i) => (
                <div key={i} style={{ padding: "2rem 1.5rem", background: "#0a0a0a" }}>
                  <p style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 700, color: "#00c8a0", letterSpacing: "-.03em", lineHeight: 1, marginBottom: ".5rem" }}>{m.n}</p>
                  <p style={{ fontSize: ".86rem", fontWeight: 600, color: "#fff", marginBottom: ".3rem" }}>{m.l}</p>
                  <p style={{ fontSize: ".76rem", color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{m.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.42)", marginTop: "2rem", fontStyle: "italic", maxWidth: 680, lineHeight: 1.7 }}>
              Built for desktop and responsive web — deliberately excluding mobile apps. That boundary is exactly where the next chapter begins.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 04 · CVC — THE MOBILE LAYER ═══ */}
      <section style={{ padding: pad, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 20% 25%, rgba(0,200,160,.09) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* — CHAPTER OPENER — */}
          <ScrollReveal>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(0,200,160,.16)", border: "1px solid rgba(0,200,160,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c8a0" }}><IconMobile /></div>
              <div>
                <Label>CVC · Mobile App</Label>
                <h2 style={{ fontSize: isMobile ? "clamp(1.5rem,6vw,2.2rem)" : "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", lineHeight: 1.1 }}>
                  CVC had a design system.<br /><em style={{ color: "#00c8a0", fontStyle: "italic" }}>It just wasn&apos;t built for the app.</em>
                </h2>
              </div>
            </div>
          </ScrollReveal>

          {/* — THE SITUATION — */}
          <ScrollReveal delay={60}>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.25rem" }}>
              CVC had just launched a fresh design system — but it was built for the website. The mobile app inherited web-ported components that never felt native: buttons that didn&apos;t respond to gestures, navigation that ignored platform conventions, loading states that felt like an afterthought. The app had a <strong style={{ color: "#fff" }}>2.0-star rating</strong>, and fixing individual screens wasn&apos;t going to solve it. The problem was foundational.
            </p>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.25rem" }}>
              I was already redesigning the CVC flight booking flow (the project that would eventually <Link href="/work/cvc" style={{ color: "#00c8a0", textDecoration: "none" }}>drive a +212% conversion lift</Link>), and I realized that building great screens on top of web-ported components was like painting on wet sand. The experience would never feel right unless the <em style={{ color: "#00c8a0" }}>foundation</em> was right.
            </p>
          </ScrollReveal>

          {/* — THE DECISION — */}
          <ScrollReveal delay={80}>
            <div style={{ borderLeft: "3px solid #00c8a0", paddingLeft: "1.5rem", margin: "2rem 0 2.5rem", maxWidth: 680 }}>
              <p style={{ fontSize: isMobile ? "1rem" : "1.1rem", color: "#f5f5f7", lineHeight: 1.8, fontStyle: "italic" }}>
                Don&apos;t rebuild the whole DS. Build only the components where web falls short on mobile — and make the set small enough that the team actually adopts it.
              </p>
            </div>
          </ScrollReveal>

          {/* — WHAT I BUILT — */}
          <ScrollReveal delay={100}>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.75rem" }}>
              I scoped the mobile design system to the components that <strong style={{ color: "#fff" }}>genuinely can&apos;t be ported from web</strong>: native inputs with platform-specific keyboards, gesture-driven bottom sheets, mobile navigation bars, progress steppers, loading and feedback states, and dialog patterns that respect iOS and Android conventions. Everything else stayed shared with the web system — so the app felt native without fragmenting the brand.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={110}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { t: "Native-only by design", d: "Mobile-specific components only where a web-ported one fell short — native inputs, gestures, mobile nav, loading & feedback states." },
                { t: "Lean, so it got adopted", d: "No bloat. A small, opinionated set the app team could actually pick up and ship with — which is why adoption stuck." },
                { t: "A legacy for the app team", d: "The system outlived the project — it became the foundation the mobile team kept building on after I rolled off." },
                { t: "Best practices for web too", d: "The mobile patterns fed back upstream — guidance the web teams adopted for their responsive versions." },
              ].map((c, i) => (
                <div key={i} style={{ padding: "1.75rem", borderRadius: 16, background: "rgba(0,200,160,.05)", border: "1px solid rgba(0,200,160,.18)" }}>
                  <div style={{ color: "#00c8a0", marginBottom: ".9rem" }}><IconLayers /></div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".5rem" }}>{c.t}</h4>
                  <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* — THE COMPONENTS — */}
          <ScrollReveal delay={120}>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.75rem" }}>
              Every component followed the same rigor I&apos;d established at Rappi: master component with all variants inside, full documentation (anatomy, specs, when to use, do/don&apos;t rules), and a clear owner. Over 20 components shipped — each one documented and governed from day one.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={130}>
            <div style={{ marginBottom: "2.5rem" }}>
              <DSCycler isMobile={isMobile} slides={DS_CVC_SLIDES} accent="#00c8a0" />
            </div>
          </ScrollReveal>

          {/* — WHAT HAPPENED — */}
          <ScrollReveal delay={140}>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.75rem" }}>
              The mobile design system became the foundation that made the <strong style={{ color: "#fff" }}>CVC flight booking redesign</strong> possible. The native components gave the app the feel users had been asking for in their 1-star reviews — and the +212% conversion lift proved it. But the system outlived the project: the app team kept building on it after I rolled off, and the mobile-first patterns <em style={{ color: "#00c8a0" }}>fed back upstream</em> as best practices the web teams adopted too.
            </p>
          </ScrollReveal>

          {/* — THE IMPACT — */}
          <ScrollReveal delay={150}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)", marginTop: ".5rem" }}>
              {[
                { n: "+212%", l: "Checkout conversion", sub: "The mobile DS enabled the native experience that drove the CVC app's numbers" },
                { n: "20+", l: "Mobile components", sub: "Native inputs, gestures, navigation, loading & feedback — each with full docs" },
                { n: "2 teams", l: "Adopting the system", sub: "App team built on it; web team adopted mobile-first patterns upstream" },
              ].map((m, i) => (
                <div key={i} style={{ padding: "2.25rem 1.75rem", background: "#0a0a0a" }}>
                  <p style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#00c8a0", letterSpacing: "-.04em", lineHeight: 1, marginBottom: ".6rem" }}>{m.n}</p>
                  <p style={{ fontSize: ".88rem", fontWeight: 600, color: "#fff", marginBottom: ".3rem" }}>{m.l}</p>
                  <p style={{ fontSize: ".76rem", color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{m.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.42)", marginTop: "2rem", padding: "1.25rem 1.5rem", borderRadius: 12, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", maxWidth: 680, lineHeight: 1.7 }}>
              <Link href="/work/cvc" style={{ color: "#00c8a0", textDecoration: "none", fontWeight: 600 }}>See the product this system powered — CVC Flights →</Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 05 · PRINCIPLES ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>What I take into any system</Label>
            <h2 style={{ fontSize: isMobile ? "clamp(1.6rem,6vw,2.4rem)" : "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: "2.5rem" }}>
              Principles, not just components.
            </h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "1rem" }}>
            {[
              { n: "01", t: "Earn every component.", d: "Build only what removes real friction. A lean system gets adopted; a bloated one gets bypassed." },
              { n: "02", t: "Start from the atom.", d: "One foundational component, done thoroughly, becomes the template for everything that follows." },
              { n: "03", t: "Accessibility is a property.", d: "Contrast, targets, labels and semantics live inside the component — never bolted on per screen." },
              { n: "04", t: "Systems are adopted, not shipped.", d: "Documentation, governance and enablement decide whether a system lives after you leave." },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div style={{ padding: "2rem", borderRadius: 16, border: "1px solid rgba(255,255,255,.07)", height: "100%" }}>
                  <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".15em", color: "#00c8a0", textTransform: "uppercase", marginBottom: "1rem" }}>{p.n}</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: ".75rem", letterSpacing: "-.01em" }}>{p.t}</h3>
                  <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{p.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ CTA ═══ */}
      <section className="aurora-wrap" style={{ padding: isMobile ? "6rem 1.5rem" : "10rem 6rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,200,160,.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="aurora aurora-soft" style={{ mixBlendMode: "screen" }} />
        <ScrollReveal className="aurora-content">
          <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#00c8a0", marginBottom: "1.5rem" }}>See it in product</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,4.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.02, marginBottom: "3rem" }}>
            The systems behind<br /><em style={{ color: "#00c8a0", fontStyle: "italic" }}>the products.</em>
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/work/cvc" className="btn-blue">CVC Flights →</Link>
            <Link href="/work/rappi" className="btn-white-ghost">Rappi Onboarding →</Link>
            <Link href="/contact" className="btn-white-ghost">Get in touch</Link>
          </div>
        </ScrollReveal>
      </section>

      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.08)", padding: "2rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)" }}>© 2025 Rafael Guimarães</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[["Home", "/"], ["CVC", "/work/cvc"], ["Rappi", "/work/rappi"], ["Leadership", "/work/leadership"]].map(([l, h]) => (
            <Link key={h} href={h} style={{ fontSize: ".72rem", color: "#00c8a0", textDecoration: "none" }}>{l}</Link>
          ))}
        </div>
      </footer>
    </main>
  );
}
