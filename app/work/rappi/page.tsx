"use client";
import Link from "next/link";
import { useRef, useState, useEffect, ReactNode } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import useIsMobile from "../../components/useIsMobile";
import Icon from "../../components/Icon";
import RevealText from "../../components/RevealText";
import LoopVideo from "../../components/LoopVideo";
import Image from "next/image";
import CaseHero from "../../components/CaseHero";
import FloatingProjectNav from "../../components/FloatingProjectNav";
import SideShotShared from "../../components/SideShotShared";
import SegmentedTabs from "../../components/SegmentedTabs";

/* ── Counter ── */
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

/* ── Media Placeholder ── */
function MediaPlaceholder({
  label,
  filename,
  hint,
  aspect = "16/9",
  height,
}: {
  label: string;
  filename: string;
  hint?: string;
  aspect?: string;
  height?: number;
}) {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      aspectRatio: height ? undefined : aspect,
      height: height ? height : undefined,
      background: "rgba(255,106,43,.06)",
      border: "2px dashed rgba(255,106,43,.4)",
      borderRadius: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      padding: "2rem",
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6a2b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
      <p style={{ fontSize: ".9rem", fontWeight: 700, color: "#ff6a2b", textAlign: "center", letterSpacing: "-.01em" }}>
        {label}
      </p>
      <code style={{ fontSize: ".75rem", color: "rgba(255,106,43,.7)", background: "rgba(255,106,43,.1)", padding: ".25rem .6rem", borderRadius: 6 }}>
        /public/{filename}
      </code>
      {hint && (
        <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", textAlign: "center", maxWidth: 360, lineHeight: 1.5 }}>
          {hint}
        </p>
      )}
    </div>
  );
}

/* ── Section label ── */
function Label({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#ff6a2b", marginBottom: "1.5rem" }}>
      {children}
    </p>
  );
}

/* ── Divider ── */
function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.1) 50%, transparent 100%)", margin: "0 2rem" }} />;
}

/* ── Tab switcher for catalog screens ── */
function CatalogSwitcher() {
  const [active, setActive] = useState(0);
  const slides = [
    { src: "/work/rappi-screens/catalog-detail.png", label: "Product detail" },
    { src: "/work/rappi-screens/product-image.png", label: "Image preview" },
    { src: "/work/rappi-screens/menu-creation.png", label: "Menu creation" },
  ];
  return (
    <ScrollReveal delay={100}>
      <div>
        <div style={{ marginBottom: "1.75rem" }}>
          <SegmentedTabs labels={slides.map((s) => s.label)} active={active} onChange={setActive} />
        </div>
        <div style={{ position: "relative", aspectRatio: "1460 / 885", filter: "drop-shadow(0 30px 60px rgba(0,0,0,.4))" }}>
          {slides.map((s, i) => (
            <Image key={i} src={s.src} alt={s.label} width={1460} height={885}
              style={{
                position: i === 0 ? "relative" : "absolute", inset: 0,
                width: "100%", height: "100%", objectFit: "contain", display: "block",
                opacity: i === active ? 1 : 0, transition: "opacity .5s ease",
              }} />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ══════════════════════════════════════════
   RAPPI ONBOARDING CASE STUDY
   ══════════════════════════════════════════ */
export default function RappiCasePage() {
  const isMobile = useIsMobile();
  const pad = isMobile ? "5rem 1.5rem" : "8rem 6rem";
  const padNarrow = isMobile ? "5rem 1.5rem" : "8rem max(6rem, calc(50% - 560px))";

  return (
    <main className="page-in" style={{ background: "#000", "--blue": "#ff6a2b", "--blue-hover": "#e55a1f" } as React.CSSProperties}>

      {/* ═══ 01 · HERO ═══ */}
      <CaseHero
        accent="#ff6a2b"
        index="02"
        company="Rappi · Growth"
        titleLines={["Rappi Merchant", <em key="o" style={{ color: "#ff6a2b", fontStyle: "italic" }}>Onboarding.</em>]}
        subtitle="The onboarding was losing 30% of merchants at the menu step alone. 2 weeks to open a store. I changed the roadmap, shipped 3 releases, and cut that to 2 days."
        tags={["B2B", "Onboarding", "9 markets", "Solo designer"]}
        stats={[
          { n: "2d", l: "To open a store", sub: "Was 2 weeks" },
          { n: "+53%", l: "Conversion", sub: "Onboarding" },
          { n: "+135%", l: "Lead verify" },
        ]}
      />

      <Divider />

      {/* ═══ 02 · CONTEXT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <ScrollReveal>
            <Label>01 — Context</Label>
            <h2 style={{ fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              30% of merchants<br />never made it past<br /><em style={{ color: "#ff6a2b", fontStyle: "italic" }}>the menu step.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Rappi operates across 9 countries, 250 cities, 100M app downloads. The merchant onboarding was the front door for every restaurant partner — and it was broken. 30% dropped at the menu step, 20% at documents, and the full process took 2 weeks from sign-up to first order.
            </p>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>
              I was the solo designer, working with 8 engineers, 1 PM, and 1 Tech Lead across Colombia, Mexico, and Brazil. The roadmap already existed — and it was wrong.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "1fr 1fr", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
              {[
                { n: "9", l: "Countries" },
                { n: "8", l: "Engineers" },
                { n: "144", l: "Problems mapped" },
                { n: "3", l: "Releases shipped" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "2rem 1.5rem", background: "#0a0a0a" }}>
                  <p style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "#ff6a2b", letterSpacing: "-.04em", lineHeight: 1 }}>{s.n}</p>
                  <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", marginTop: ".6rem", letterSpacing: ".1em", textTransform: "uppercase" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 03 · THE DIAGNOSIS ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>02 — The diagnosis</Label>
            <RevealText
              lines={["144 problems. But the", <em key="r" style={{ color: "#ff6a2b", fontStyle: "italic" }}>roadmap was the real problem.</em>]}
              style={{ fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 700 }}
            />
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 660, marginBottom: "4rem" }}>
              I mapped every friction point in production and ranked them by severity. 144 problems total — categorized by impact across 30%/33%/37% severity tiers. The original plan was a full 6-month redesign delivering zero value until month 3. I proposed the opposite: fix the highest-impact bugs first and ship value from week 1.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,.4))" }}>
              <Image src="/work/rappi-screens/impact-effort.png" alt="Impact vs effort matrix — 144 problems categorized" width={1460} height={885} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 04 · THE BET ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>03 — How I changed the plan</Label>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "5rem", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                  I showed the cost<br />of <em style={{ color: "#ff6a2b", fontStyle: "italic" }}>waiting 6 months.</em>
                </h2>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  With a 30% drop-off at the menu step, every month of waiting was merchants lost permanently. I quantified the cost and proposed splitting into 3 releases — fix first, redesign after — delivering value from week 1 instead of month 3.
                </p>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>
                  That's how I got buy-in. Not with a vision deck. With a cost of inaction calculation.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { tag: "Release 1", label: "Fix highest-impact bugs", sub: "Menu & Documents · Week 1 value", active: true },
                  { tag: "Release 2", label: "Discovery + partial redesign", sub: "E2E experience · Research-first", active: false },
                  { tag: "Release 3", label: "Full redesign", sub: "New architecture · Dashboard flow", active: false },
                ].map((r, i) => (
                  <div key={i} style={{
                    padding: "1.5rem",
                    border: `1px solid ${r.active ? "rgba(255,106,43,.4)" : "rgba(255,255,255,.08)"}`,
                    borderRadius: 12,
                    background: r.active ? "rgba(255,106,43,.06)" : "transparent",
                  }}>
                    <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".12em", color: r.active ? "#ff6a2b" : "rgba(255,255,255,.3)", textTransform: "uppercase", marginBottom: ".5rem" }}>{r.tag}</p>
                    <p style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: ".3rem" }}>{r.label}</p>
                    <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.4)" }}>{r.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 05 · RELEASE 1 — THE FIX ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>04 — Release 1: Fix first</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 600 }}>
              Broken stepper, duplicate buttons,<br /><em style={{ color: "#ff6a2b", fontStyle: "italic" }}>no patterns, no guidance.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 660, marginBottom: "4rem" }}>
              Release 1 targeted the highest-impact, lowest-effort problems. Fixed the broken stepper, removed duplicate actions, reduced cognitive load, and added guidance where there was none. Then ran a usability test with 6 users to validate and discover what to redesign next.
            </p>
          </ScrollReveal>

          {/* Figma overview — the full workspace */}
          <ScrollReveal delay={100}>
            <div style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,.4))" }}>
              <Image src="/work/rappi-screens/figma-overview.png" alt="Figma workspace — the full onboarding redesign" width={1460} height={885} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <p style={{ textAlign: "center", fontSize: ".78rem", color: "rgba(255,255,255,.3)", marginTop: "1.25rem", letterSpacing: ".04em" }}>
              The full Figma workspace — every screen, flow and variant for Release 1
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 04.5 · THE PROCESS — alternating side-bleed laptops ═══ */}
      <section style={{ padding: isMobile ? "5rem 0" : "8rem 0", overflow: "hidden", background: "linear-gradient(165deg, rgba(255,106,43,.12) 0%, #070707 36%, #070707 64%, rgba(255,106,43,.09) 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 1.5rem" : "0 6rem" }}>
          <ScrollReveal>
            <Label>Behind the screens — the process</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 700 }}>
              Rigor before pixels.<br /><em style={{ color: "#ff6a2b", fontStyle: "italic" }}>The work behind the work.</em>
            </h2>
          </ScrollReveal>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "5rem" : "clamp(6rem,11vw,9rem)", marginTop: isMobile ? "3.5rem" : "6rem", padding: isMobile ? "0 1.5rem" : 0 }}>
          <SideShotShared side="right" accent="#ff6a2b" dims={{ w: 1460, h: 885 }}
            src="/work/rappi-screens/roadmap.png" alt="Product roadmap — 3 releases prioritized by impact"
            eyebrow="01 · Roadmap"
            title="Three releases, prioritized by impact."
            body="Instead of a six-month redesign that delivered nothing until month three, I sequenced the work into three releases — fixing the highest-impact problems first, so value shipped from week one." />
          <SideShotShared side="left" accent="#ff6a2b" dims={{ w: 1460, h: 885 }}
            src="/work/rappi-screens/sketches.png" alt="Early sketches — dashboard vs. stepper exploration"
            eyebrow="02 · Exploration"
            title="Dashboard vs. stepper, explored on paper."
            body="Before committing to hi-fi, I sketched the two competing structures — a forced linear stepper against a free-order dashboard — and pressure-tested both against the friction the data had surfaced." />
          <SideShotShared side="right" accent="#ff6a2b" dims={{ w: 1460, h: 885 }}
            src="/work/rappi-screens/partner-stats.png" alt="Partner analytics — tracking merchant activation"
            eyebrow="03 · Measurement"
            title="Tracking activation, market by market."
            body="A partner analytics view tracked merchant activation across Colombia, Mexico and Brazil — so every release could be measured against the real funnel, not assumptions." />
          <SideShotShared side="left" accent="#ff6a2b" dims={{ w: 1460, h: 885 }}
            src="/work/rappi-screens/multi-language.png" alt="Multi-language — one product across 9 markets"
            eyebrow="04 · Scale"
            title="One product, nine markets."
            body="Every screen was built to localize cleanly across nine countries — language, currency and legal copy — so the redesign scaled without forking the product per market." />
        </div>
      </section>

      <Divider />

      {/* ═══ 06 · RESEARCH ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>05 — Research across 3 markets</Label>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "5rem", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                  CO ≠ MX ≠ BR.<br /><em style={{ color: "#ff6a2b", fontStyle: "italic" }}>Testing all three prevented rework.</em>
                </h2>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  Interviewed 10 merchants across Colombia (5), Mexico (3), and Brazil (2). The usability test revealed the architecture itself needed redesigning — not just the bugs. Key insight: restaurants with human support performed better, validating the dashboard concept.
                </p>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>
                  Benchmarked 6 onboarding flows: Airbnb, iFood, UberEats, DidiFood, PedidosYa, DoorDash. Best flows use free task ordering — not forced sequences. This validated the dashboard direction.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { country: "Colombia", n: 5, insight: "Large restaurants with human support performed best" },
                  { country: "Mexico", n: 3, insight: "Mobile-first was critical — stakeholders assumed desktop" },
                  { country: "Brazil", n: 2, insight: "Menu management was the #1 time sink" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,106,43,.15)", border: "1px solid rgba(255,106,43,.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: ".9rem", fontWeight: 700, color: "#ff6a2b" }}>{c.n}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: ".8rem", fontWeight: 600, color: "#fff", marginBottom: ".3rem" }}>{c.country}</p>
                      <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>{c.insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 07 · THE REDESIGN ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>06 — The redesign</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 700 }}>
              4 domains → 1.<br />Linear and forced → <em style={{ color: "#ff6a2b", fontStyle: "italic" }}>free dashboard.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 660, marginBottom: "4rem" }}>
              The old flow forced merchants through 4 separate platforms with broken transitions between them. The redesign unified everything into one domain, replaced the forced linear sequence with a free-order dashboard, and introduced qualified lead capture from sign-up — meaning we knew who was serious from day one.
            </p>
          </ScrollReveal>

          {/* Before / After flow */}
          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem", marginBottom: "4rem" }}>
              <div style={{ padding: "2rem", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, background: "#0a0a0a" }}>
                <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".12em", color: "rgba(255,255,255,.3)", textTransform: "uppercase", marginBottom: "1.25rem" }}>Before</p>
                {["DOMAIN 1 · Landing", "DOMAIN 2 · Lead capture + Account", "DOMAIN 3 · Legal, Plan, Docs, Menu", "DOMAIN 4 · Platform onboarding"].map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.2)", flexShrink: 0 }} />
                    <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.4)" }}>{step}</p>
                  </div>
                ))}
                <p style={{ fontSize: ".8rem", color: "rgba(255,69,0,.7)", marginTop: "1.25rem", fontStyle: "italic" }}>Broken transitions between each domain</p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid rgba(255,106,43,.25)", borderRadius: 16, background: "rgba(255,106,43,.04)" }}>
                <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".12em", color: "#ff6a2b", textTransform: "uppercase", marginBottom: "1.25rem" }}>After</p>
                {["Sign up · Qualified lead · 5 min", "Dashboard · merchants choose any order", "Bank · Hours · Logo · Docs · Menu", "Platform onboarding · Store live"].map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff6a2b", flexShrink: 0 }} />
                    <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.65)" }}>{step}</p>
                  </div>
                ))}
                <p style={{ fontSize: ".8rem", color: "#ff6a2b", marginTop: "1.25rem", fontStyle: "italic" }}>1 unified domain · no transitions</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,.4))" }}>
              <Image src="/work/rappi-screens/menu-creation.png" alt="Menu creation — merchant portal" width={1460} height={885} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 08 · LOGIN ANIMATION — before/after ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>07 — One of my favorite decisions</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem", textAlign: "center" }}>
              4 broken pages → <em style={{ color: "#ff6a2b", fontStyle: "italic" }}>1 seamless animation.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 660, margin: "0 auto 1.5rem", textAlign: "center" }}>
              Account creation, login, and the transition to the dashboard used to span 4 separate pages with hard redirects. Merchants would lose their state, get confused, and abandon. I collapsed all of it into a single animated transition — sign-up flows directly into the dashboard with no interruption.
            </p>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, textAlign: "center", marginBottom: isMobile ? "2.5rem" : "4rem" }}>
              Result: <span style={{ color: "#ff6a2b", fontWeight: 600 }}>−60% support tickets</span> about &ldquo;navigation not working.&rdquo;
            </p>
          </ScrollReveal>

          {/* Before / After comparison */}
          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "3rem", alignItems: "start" }}>
              {/* Before — broken pages stacked */}
              <div>
                <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,69,0,.7)", marginBottom: "1rem", textAlign: "center" }}>Before — 4 broken pages</p>
                <div style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,.4))" }}>
                  <Image src="/work/rappi-screens/broken-pages.png" alt="Before — 4 broken pages with hard redirects" width={1325} height={803} style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }} />
                </div>
              </div>
              {/* After — seamless animation */}
              <div>
                <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#ff6a2b", marginBottom: "1rem", textAlign: "center" }}>After — 1 seamless flow</p>
                <div style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,.4))", borderRadius: 12, overflow: "hidden" }}>
                  <video src="/work/rappi-screens/new-version.mp4" autoPlay loop muted playsInline
                    style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 09 · CATALOG ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>08 — The catalog problem</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 700 }}>
              Menu management went from<br /><em style={{ color: "#ff6a2b", fontStyle: "italic" }}>days to a few hours.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 660, marginBottom: "4rem" }}>
              The old catalog was a flat list with no category overview, no bulk actions, and editing opened a modal that hid everything else. Inspired by iFood's reusable complement groups and DoorDash's side panel, I redesigned it: collapsible categories, drag-to-reorder, a side panel that keeps the full menu visible while editing, and complement groups created once and linked to multiple products. The last one was the key driver of going from 2 weeks to 2 days.
            </p>
          </ScrollReveal>

          <CatalogSwitcher />
        </div>
      </section>

      <Divider />

      {/* ═══ 10 · OUTCOMES ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>09 — Outcomes</Label>
            <RevealText
              lines={["3 releases. 3 markets.", <em key="n" style={{ color: "#ff6a2b", fontStyle: "italic" }}>Numbers that moved the business.</em>]}
              style={{ fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1rem", maxWidth: 700 }}
            />
            <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.3)", marginBottom: "4rem", letterSpacing: ".06em" }}>Tracked via Amplitude conversion funnels</p>
          </ScrollReveal>

          {/* Big metric */}
          <ScrollReveal delay={100}>
            <div style={{ padding: "3rem", border: "1px solid rgba(255,106,43,.3)", borderRadius: 20, background: "rgba(255,106,43,.05)", marginBottom: "2rem", textAlign: "center" }}>
              <p style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".15em", color: "#ff6a2b", textTransform: "uppercase", marginBottom: "1rem" }}>Time to open a store</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
                <p style={{ fontSize: "clamp(3rem,8vw,7rem)", fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: "-.05em", lineHeight: 1 }}>2 weeks</p>
                <p style={{ fontSize: "clamp(2rem,5vw,4rem)", color: "#ff6a2b" }}>→</p>
                <p style={{ fontSize: "clamp(3rem,8vw,7rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.05em", lineHeight: 1 }}>2 days</p>
              </div>
              <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.4)", marginTop: "1rem" }}>From sign-up to first order, across all 3 markets</p>
            </div>
          </ScrollReveal>

          {/* Other metrics */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            {[
              { n: "+53.4%", l: "Onboarding conversion", sub: "10.3% → 15.8% across releases" },
              { n: "+135%", l: "Lead verification", sub: "500 → 1,177 qualified leads/week" },
              { n: "+11.5%", l: "Catalog completion", sub: "Store setup dashboard" },
            ].map((m, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ padding: "2.5rem 2rem", background: "#0a0a0a", height: "100%" }}>
                  <p style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, color: "#ff6a2b", letterSpacing: "-.04em", lineHeight: 1, marginBottom: ".75rem" }}>{m.n}</p>
                  <p style={{ fontSize: ".9rem", fontWeight: 600, color: "#fff", marginBottom: ".4rem" }}>{m.l}</p>
                  <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{m.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ 11 · LEARNINGS ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>10 — What I learned</Label>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "2rem" }}>
              {[
                { n: "01", title: "Segment your metrics.", body: "E2E conversion masked the real issue. Segmenting by step revealed the menu as the bottleneck — without that, we'd have optimized the wrong thing." },
                { n: "02", title: "Fix first, redesign later.", body: "3 releases instead of a 6-month redesign. Value from week 1. Shipping taught us more than planning ever would have." },
                { n: "03", title: "Mobile-first wasn't obvious.", body: "Stakeholders assumed desktop. 50% of merchants used phones. Mobile-first closed a gap that would have undermined the whole redesign." },
                { n: "04", title: "Multi-country research was non-negotiable.", body: "CO ≠ MX ≠ BR. Testing across all three upfront prevented building for one market and reworking for the others." },
              ].map((l, i) => (
                <div key={i} style={{ padding: "2rem", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16 }}>
                  <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".15em", color: "#ff6a2b", textTransform: "uppercase", marginBottom: "1rem" }}>{l.n}</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: ".75rem", letterSpacing: "-.01em" }}>{l.title}</h3>
                  <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{l.body}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ CTA ═══ */}
      <section className="aurora-wrap" style={{ padding: isMobile ? "6rem 1.5rem" : "10rem 6rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,106,43,.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="aurora aurora-soft" style={{ mixBlendMode: "screen" }} />
        <ScrollReveal className="aurora-content">
          <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#ff6a2b", marginBottom: "1.5rem" }}>See it in product</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,4.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.02, marginBottom: "3rem" }}>
            The systems behind<br /><em style={{ color: "#ff6a2b", fontStyle: "italic" }}>the products.</em>
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/work/cvc" className="btn-blue">CVC Flights →</Link>
            <Link href="/work/design-system" className="btn-white-ghost">Design Systems →</Link>
            <Link href="/contact" className="btn-white-ghost">Get in touch</Link>
          </div>
        </ScrollReveal>
      </section>

      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.08)", padding: "2rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)" }}>© 2025 Rafael Guimarães</p>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="/work/cvc" style={{ fontSize: ".72rem", color: "#ff6a2b", textDecoration: "none" }}>← CVC</Link>
          <Link href="/" style={{ fontSize: ".72rem", color: "#ff6a2b", textDecoration: "none" }}>Home</Link>
        </div>
      </footer>
      <FloatingProjectNav />
    </main>
  );
}
