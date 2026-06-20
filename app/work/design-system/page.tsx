"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect, ReactNode } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import useIsMobile from "../../components/useIsMobile";
import RevealText from "../../components/RevealText";
import LoopVideo from "../../components/LoopVideo";
import CaseHero from "../../components/CaseHero";

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

      {/* ═══ NAV ═══ */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, padding: isMobile ? "1.25rem 1.5rem" : "1.75rem 6rem", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 50, background: "rgba(0,0,0,.75)", backdropFilter: "blur(20px)" }}>
        <Link href="/" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", textDecoration: "none" }}>← Back</Link>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/work/cvc" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.38)", textDecoration: "none" }}>CVC</Link>
          <Link href="/work/rappi" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.38)", textDecoration: "none" }}>Rappi</Link>
          <Link href="/work/leadership" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.38)", textDecoration: "none" }}>Leadership</Link>
        </div>
      </div>

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

      {/* ═══ FULL-BLEED DESIGNERS VIDEO ═══ */}
      <section style={{ width: "100%", position: "relative" }}>
        <LoopVideo
          src="/videos/stock/designers-working.mp4"
          label="Designers working at their computers"
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

      {/* ═══ 03 · CONTEXT A — RAPPI (zero to one) ═══ */}
      <section style={{ padding: pad, background: "#050505", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(0,200,160,.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <Label color="#00c8a0">Context A · Rappi — zero to one</Label>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(0,200,160,.16)", border: "1px solid rgba(0,200,160,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c8a0" }}><IconSeed /></div>
              <h2 style={{ fontSize: isMobile ? "clamp(1.5rem,6vw,2.2rem)" : "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", lineHeight: 1.1 }}>
                A fragmented system, no DS team.<br />So we built it collaboratively.
              </h2>
            </div>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.25rem" }}>
              On Rappi&apos;s <strong style={{ color: "#fff" }}>B2B Design team</strong> — spanning 9 countries — the design system was fragmented and inconsistent. Essential components were missing, and teams worked independently, slowly diluting one brand into many. There was no dedicated design-system team and no investment to spin one up.
            </p>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "2.5rem" }}>
              So we adopted a <strong style={{ color: "#fff" }}>collaborative model</strong>: one product designer led the effort while individual designers contributed components. As Sr. Product Designer I led the <strong style={{ color: "#fff" }}>text field</strong> — the most-used, most-inconsistent atom in the product. Done thoroughly, one foundational component becomes the template for how every component after it gets made.
            </p>
          </ScrollReveal>

          {/* Text field as the seed */}
          <ScrollReveal delay={80}>
            <div style={{ marginBottom: "2.5rem" }}>
              <MediaPlaceholder accent="#00c8a0"
                label="Text field — single main component, every variation inside"
                filename="ds/rappi-text-field-variants.png"
                hint="Board do text field: anatomia + todos os estados (default, hover, focus, focus w/ placeholder, filling, filled, disabled, disabled filled, error) e tipos (ícone esquerda/direita/ambos, text area, code validation, chips). Exporte do Figma."
                aspect="16/9" />
            </div>
          </ScrollReveal>

          {/* Discovery → Definition → Solution */}
          <ScrollReveal delay={120}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1rem" }}>
              {[
                { k: "Discovery", t: "Benchmarked the best, audited our own.", d: "Studied Google Material, Airbnb, Uber Eats and Apple's web & iOS, then asked every Rappi team to hand over their own text fields — mapping each team's identity and needs before drawing a line." },
                { k: "Definition", t: "One anatomy, many variations.", d: "A Material-based anatomy with an outline that makes every state legible — extended with support messages, states, icons, large text, code validation and chips, tuned for desktop and responsive web." },
                { k: "Solution", t: "Everything in one component + docs.", d: "Consolidated all states and types into a single main component, then wrote full documentation — intro, anatomy, specs, usage rules and max-width guidance — so the whole team applied it consistently." },
              ].map((c, i) => (
                <div key={i} style={{ padding: "1.75rem", borderRadius: 16, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
                  <p style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#00c8a0", marginBottom: ".9rem" }}>{c.k}</p>
                  <h4 style={{ fontSize: ".98rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".5rem", lineHeight: 1.25 }}>{c.t}</h4>
                  <p style={{ fontSize: ".86rem", color: "rgba(255,255,255,.5)", lineHeight: 1.65 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Rappi impact */}
          <ScrollReveal delay={150}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)", marginTop: "1rem" }}>
              {[
                { n: "Faster", l: "Delivery time", sub: "Reusable components cut build time" },
                { n: "Higher", l: "User engagement", sub: "A more intuitive, consistent system" },
                { n: "Unified", l: "Brand consistency", sub: "Strengthened across B2B products" },
              ].map((m, i) => (
                <div key={i} style={{ padding: "2rem 1.5rem", background: "#0a0a0a" }}>
                  <p style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 700, color: "#00c8a0", letterSpacing: "-.03em", lineHeight: 1, marginBottom: ".5rem" }}>{m.n}</p>
                  <p style={{ fontSize: ".86rem", fontWeight: 600, color: "#fff", marginBottom: ".3rem" }}>{m.l}</p>
                  <p style={{ fontSize: ".76rem", color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{m.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={170}>
            <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.42)", marginTop: "1.5rem", fontStyle: "italic", maxWidth: 680, lineHeight: 1.7 }}>
              Built for desktop and responsive web — deliberately excluding mobile apps. That boundary is exactly where the next chapter, CVC, begins.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 04 · CONTEXT B — CVC (mobile app DS) ═══ */}
      <section style={{ padding: pad, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 20% 25%, rgba(0,200,160,.09) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <Label>Context B · CVC — the mobile layer</Label>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(0,200,160,.16)", border: "1px solid rgba(0,200,160,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c8a0" }}><IconMobile /></div>
              <h2 style={{ fontSize: isMobile ? "clamp(1.5rem,6vw,2.2rem)" : "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", lineHeight: 1.1 }}>
                CVC had a design system.<br />It just wasn&apos;t built for the app.
              </h2>
            </div>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1.25rem" }}>
              CVC had a fresh design system — but it was web-first. The mobile app was running on web-ported components that never felt native. To deliver a genuinely <strong style={{ color: "#fff" }}>unique app experience</strong> and fix usability at the root, I built a <strong style={{ color: "#fff" }}>mobile app design system</strong> — and I was deliberate about scope: I only created the components that <em style={{ color: "#00c8a0" }}>actually make a difference on mobile.</em>
            </p>
            <p style={{ fontSize: isMobile ? ".95rem" : "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.85, maxWidth: 680, marginBottom: "2.5rem" }}>
              Native inputs, gesture-driven patterns, mobile navigation, loading and feedback states — the pieces a responsive web component simply can&apos;t replicate well. Everything else stayed shared with the web system, so the app felt native without fragmenting the brand.
            </p>
          </ScrollReveal>

          {/* The lean component set */}
          <ScrollReveal delay={80}>
            <div style={{ marginBottom: "2.5rem" }}>
              <MediaPlaceholder
                label="Mobile component library — the pieces that matter on mobile"
                filename="ds/cvc-mobile-ds-overview.png"
                hint="Imagem/board do design system mobile do CVC: componentes nativos (inputs, navegação, estados de loading, feedback, etc.). Exporte do Figma."
                aspect="16/9" />
            </div>
          </ScrollReveal>

          {/* Why mobile-only components */}
          <ScrollReveal delay={120}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { t: "Native-only by design", d: "I built mobile-specific components only where a web-ported one fell short — native inputs, gestures, mobile nav, loading & feedback states." },
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

          {/* Impact metrics — placeholders */}
          <ScrollReveal delay={140}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
              {[
                { n: "[ +__% ]", l: "Usability / conversion", sub: "Tie to the CVC app uplift the system enabled" },
                { n: "[ __ ]", l: "Components shipped", sub: "Size of the mobile component set" },
                { n: "[ __ teams ]", l: "Adopting the system", sub: "App + web teams using it" },
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
            <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginTop: "2rem", padding: "1.5rem 1.75rem", borderRadius: 16, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
              The result compounded: the mobile design system was a direct lever in lifting the CVC app&apos;s numbers, it left a <strong style={{ color: "#fff" }}>lasting foundation for the mobile app team</strong>, and the mobile-first patterns became <strong style={{ color: "#fff" }}>best practices the web teams adopted</strong> in their responsive builds. <Link href="/work/cvc" style={{ color: "#00c8a0", textDecoration: "none" }}>See it in production — CVC Flights →</Link>
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
