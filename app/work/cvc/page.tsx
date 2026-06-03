"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect, ReactNode } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import IPhone from "../../components/IPhone";
import useIsMobile from "../../components/useIsMobile";
import Icon from "../../components/Icon";
import RevealText from "../../components/RevealText";
import LoopVideo from "../../components/LoopVideo";
import DeviceSwitcher from "../../components/DeviceSwitcher";
import FeatureCarousel from "../../components/FeatureCarousel";

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
  label, filename, hint, aspect = "16/9", height,
}: {
  label: string; filename: string; hint?: string; aspect?: string; height?: number;
}) {
  return (
    <div style={{
      width: "100%", aspectRatio: height ? undefined : aspect, height: height ?? undefined,
      background: "rgba(0,113,227,.05)", border: "2px dashed rgba(0,113,227,.35)",
      borderRadius: 16, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: ".75rem", padding: "2rem",
    }}>
      <div style={{ color: "#0071e3", display: "flex" }}><Icon name="folder" size={32} /></div>
      <p style={{ fontSize: ".9rem", fontWeight: 700, color: "#0071e3", textAlign: "center", letterSpacing: "-.01em" }}>{label}</p>
      <code style={{ fontSize: ".75rem", color: "rgba(0,113,227,.8)", background: "rgba(0,113,227,.1)", padding: ".25rem .6rem", borderRadius: 6 }}>
        /public/{filename}
      </code>
      {hint && <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", textAlign: "center", maxWidth: 380, lineHeight: 1.5 }}>{hint}</p>}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem" }}>{children}</p>;
}

function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.1) 50%, transparent 100%)", margin: "0 2rem" }} />;
}

/* ══════════════════════════════════════════
   CVC FLIGHT BOOKING REDESIGN
   ══════════════════════════════════════════ */
export default function CVCCasePage() {
  const isMobile = useIsMobile();
  const pad = isMobile ? "5rem 1.5rem" : "8rem 6rem";

  return (
    <main className="page-in dark-cursor" style={{ background: "#000" }}>

      {/* ═══ 01 · HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: isMobile ? "8rem 1.5rem 4rem" : "10rem 6rem 6rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 20% 70%, rgba(0,113,227,.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div className="aurora" style={{ opacity: 0.38, mixBlendMode: "screen" }} />
        <div style={{ maxWidth: 900, position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {["B2C", "Mobile App", "Travel", "Solo designer"].map(t => (
                <span key={t} style={{ padding: ".3rem .9rem", border: "1px solid rgba(0,113,227,.3)", borderRadius: 100, fontSize: ".7rem", color: "rgba(255,255,255,.5)", letterSpacing: ".06em" }}>{t}</span>
              ))}
            </div>
            <RevealText
              as="h1"
              lines={["CVC Flight", <em key="br" className="text-gradient" style={{ fontStyle: "italic" }}>Booking Redesign.</em>]}
              stagger={90}
              style={{ fontSize: isMobile ? "2.8rem" : "clamp(3rem,7vw,6.5rem)", fontWeight: 700, letterSpacing: "-.04em", lineHeight: .98, color: "#fff", marginBottom: "2rem" }}
            />
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.55)", maxWidth: 560, lineHeight: 1.75, marginBottom: "3rem" }}>
              Brazil's largest travel app had a 2.0★ rating, 40-second loads, and 6% checkout conversion. I proposed a 1-month A/B bet instead of a 6-month redesign — and delivered results in the first month.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { n: "2.0 → 4.6★", l: "App Store rating" },
                { n: "+212%", l: "Checkout conversion" },
                { n: "+23%", l: "Cross-sell revenue" },
              ].map((s, i) => (
                <div key={i} style={{ paddingRight: i < 2 ? "1.5rem" : 0, borderRight: i < 2 ? "1px solid rgba(255,255,255,.1)" : "none" }}>
                  <p style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 700, color: "#0071e3", letterSpacing: "-.04em", lineHeight: 1 }}>{s.n}</p>
                  <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", marginTop: ".5rem", letterSpacing: ".1em", textTransform: "uppercase" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem", opacity: .4 }}>
          <p style={{ fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#fff" }}>Scroll</p>
          <div style={{ width: 1, height: 40, background: "rgba(255,255,255,.4)" }} />
        </div>
      </section>

      {/* ═══ FULL-BLEED TRAVEL VIDEO ═══ */}
      <section style={{ width: "100%", position: "relative" }}>
        <LoopVideo
          src="/videos/stock/travel-window.mp4"
          label="Travel — booking a flight on the go"
          aspect={isMobile ? "16 / 12" : "21 / 9"}
          radius={0}
        />
      </section>

      <Divider />

      {/* ═══ 02 · CONTEXT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <ScrollReveal>
            <Label>01 — Context</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              The problem was<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>deeper than performance.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              CVC is Brazil's largest travel company — 1,600 stores, 30M customers, R$17B in annual bookings. The app had a 2.0★ rating and the mobile team was treated as a backup to the website. No native experience, no GPS, no fluid interactions. The entire booking flow ran on webview.
            </p>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>
              I was the solo designer on the project, working with 25 engineers, 2 PMs, and 2 Tech Leads. Existing research pointed to the symptoms. My job was to find the root cause and propose a plan stakeholders would actually say yes to.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
              {[
                { n: "25", l: "Engineers" },
                { n: "1", l: "Designer (me)" },
                { n: "40s", l: "Old load time" },
                { n: "2.0★", l: "App Store rating" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "2rem 1.5rem", background: "#0a0a0a" }}>
                  <p style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "#0071e3", letterSpacing: "-.04em", lineHeight: 1 }}>{s.n}</p>
                  <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", marginTop: ".6rem", letterSpacing: ".1em", textTransform: "uppercase" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 03 · ROOT CAUSE ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <ScrollReveal>
            <Label>02 — Root cause</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              Webview treated as backup.<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>No reason to install the app.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Most 1-star reviews cited freezing — not design. The entire booking flow ran on webview inside a native shell. No GPS, no haptics, no native rendering. Users had the same experience as the website but worse. There was no reason to install the app at all.
            </p>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>
              Benchmarked Hopper, Skyscanner, Kayak, AvisaSales, and Decolar. All three principles — guided flow, one flight at a time, fully native — CVC was doing the opposite on all three.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { symptom: "2.0★ app rating", cause: "Webview crashes on low-end devices" },
                { symptom: "40s loading time", cause: "Webview rendering, no native optimization" },
                { symptom: "6% checkout conversion", cause: "Combined outbound+return cards — too much cognitive load" },
                { symptom: "No reason to install", cause: "Same experience as desktop website, but worse" },
              ].map((r, i) => (
                <div key={i} style={{ padding: "1.25rem 1.5rem", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, background: "#0a0a0a" }}>
                  <p style={{ fontSize: ".78rem", fontWeight: 600, color: "rgba(255,69,0,.8)", marginBottom: ".4rem", display: "inline-flex", alignItems: "center", gap: ".4rem" }}><Icon name="close" size={15} /> {r.symptom}</p>
                  <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>→ {r.cause}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 04 · THE BET ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>03 — The strategy</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 700 }}>
              I proposed a 1-month bet<br />instead of a <em style={{ color: "#0071e3", fontStyle: "italic" }}>6-month rebuild.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 660, marginBottom: "4rem" }}>
              Go native on flights first — the most profitable product. Run a 50/50 A/B test in production for 1 month with metrics defined upfront. If it works, scale to hotels, packages, car rental. That's how I got stakeholders to say yes: smaller scope, contained risk, clear go/no-go criteria.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
              {[
                { n: "01", title: "Go native", body: "Webview was the root cause. Build a fully native, unique experience — not a port of the website." },
                { n: "02", title: "Start with flights", body: "Most profitable product. Prove the concept here, then scale to hotels, packages, and car rental." },
                { n: "03", title: "Validate first", body: "Usability test the riskiest decision. A/B test 50/50 in production for 1 month with clear success metrics." },
              ].map((s, i) => (
                <div key={i} style={{ padding: "2.5rem 2rem", background: "#0a0a0a" }}>
                  <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".15em", color: "#0071e3", textTransform: "uppercase", marginBottom: "1.25rem" }}>{s.n}</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: ".75rem" }}>{s.title}</h3>
                  <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 05 · KEY DECISION ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>04 — The riskiest decision</Label>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "5rem", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                  Separate outbound and return.<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>Stakeholders were against it.</em>
                </h2>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  The combined outbound+return card was the default. Everyone assumed it was correct. I ran a Maze A/B test with 10 users before committing to hi-fi.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                  <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, background: "#0a0a0a" }}>
                    <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".1em", color: "rgba(255,255,255,.3)", textTransform: "uppercase", marginBottom: ".75rem" }}>B — Combined</p>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "rgba(255,255,255,.5)", letterSpacing: "-.03em" }}>18.9s</p>
                    <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.35)", marginTop: ".4rem" }}>Score: 40</p>
                    <p style={{ fontSize: ".78rem", color: "rgba(255,69,0,.7)", marginTop: ".5rem", fontStyle: "italic" }}>&ldquo;Too much info&rdquo;</p>
                  </div>
                  <div style={{ padding: "1.5rem", border: "1px solid rgba(0,113,227,.3)", borderRadius: 12, background: "rgba(0,113,227,.05)" }}>
                    <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".1em", color: "#0071e3", textTransform: "uppercase", marginBottom: ".75rem", display: "inline-flex", alignItems: "center", gap: ".4rem" }}>A — Separated <Icon name="trophy" size={14} /></p>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", letterSpacing: "-.03em" }}>9.4s</p>
                    <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.5)", marginTop: ".4rem" }}>Score: 97–100</p>
                    <p style={{ fontSize: ".78rem", color: "#0071e3", marginTop: ".5rem", fontStyle: "italic" }}>&ldquo;Practical, no back and forth&rdquo;</p>
                  </div>
                </div>
                <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.4)", marginTop: "1.25rem", fontStyle: "italic" }}>
                  101% faster. Evidence &gt; opinion. We moved to hi-fi with confidence.
                </p>
              </div>
              {/* Before/After — interactive toggle */}
              <ScrollReveal delay={100}>
                <DeviceSwitcher
                  isMobile={isMobile}
                  height={620}
                  heightMobile={460}
                  items={[
                    { label: "B — Combined", src: "/screens-mobile/ip-resultado-old.png", badge: "Before", caption: "Outbound + return on one card. 18.9s to choose. “Too much info.”" },
                    { label: "A — Separated", src: "/screens-mobile/ip-resultado.png", badge: "After", caption: "One flight at a time. 9.4s to choose — 101% faster. “Practical, no back and forth.”" },
                  ]}
                />
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 06 · THE PRODUCT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>05 — The product</Label>
            <RevealText
              lines={["Guided search. One flight at a time.", <em key="c" className="text-gradient" style={{ fontStyle: "italic" }}>Confirmation before checkout.</em>]}
              style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 700 }}
            />
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 660, marginBottom: "4rem" }}>
              The new flow replaced a fragmented multi-step search with a linear 3-step guided experience — destination, details, dates. Results show one flight at a time, outbound then return. Flight details expand inline without leaving the list. Confirmation appears before checkout, not inside it.
            </p>
          </ScrollReveal>

          {/* Lens-slider step scrubber — the guided flow */}
          <ScrollReveal delay={100}>
            <div style={{ marginBottom: "4rem" }}>
              <DeviceSwitcher
                isMobile={isMobile}
                items={[
                  { label: "Search", src: "/screens-mobile/ip-search.png", caption: "Guided 3-step search — destination, details, dates. No fragmented multi-step form." },
                  { label: "Results", src: "/screens-mobile/ip-resultado.png", caption: "One flight at a time, outbound then return. Details expand inline without leaving the list." },
                  { label: "Confirmation", src: "/screens-mobile/ip-confirma.png", caption: "A clear confirmation appears before checkout — not buried inside it." },
                ]}
              />
            </div>
          </ScrollReveal>

          {/* GIF: Usability test */}
          <ScrollReveal delay={150}>
            <div style={{ marginBottom: "4rem" }}>
              <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: ".5rem" }}><Icon name="video" size={15} /> Full flow — usability test in hi-fi prototype</p>
              <LoopVideo
                src="/videos/stock/travel-window.mp4"
                label="Usability test — full flow walkthrough"
                aspect="16 / 9"
                radius={16}
              />
            </div>
          </ScrollReveal>

          {/* GIF: Loading animation */}
          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "4rem", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#fff", letterSpacing: "-.02em", marginBottom: "1rem" }}>
                  40–55s of "dancing cards"<br />→ clear loading state + cross-sell.
                </h3>
                <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.5)", lineHeight: 1.75 }}>
                  The old search refresh caused 40–55 seconds of cards jumping around — users mis-tapped constantly. I replaced it with a clear loading state and used the wait time to show contextual cross-sell for hotels and cars. Resolved the wrong-click problem and contributed +23% cross-sell revenue.
                </p>
              </div>
              <div>
                <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: ".5rem" }}><Icon name="film" size={15} /> Loading animation — before vs after</p>
                <LoopVideo
                  src="/videos/stock/travel-sky.mp4"
                  label="Loading animation — before vs after"
                  aspect="9 / 16"
                  radius={20}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 06.5 · PROCESS — CLOSER LOOK ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Behind the screens — the process</Label>
            <RevealText
              lines={["From benchmark to hi-fi.", <em key="p" className="text-gradient" style={{ fontStyle: "italic" }}>Swipe through the work.</em>]}
              style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "3rem", maxWidth: 700 }}
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FeatureCarousel
              slides={[
                { src: "/screens-desktop/mac-benchmark.png", title: "Competitive benchmark", body: "Hopper, Skyscanner, Kayak, Decolar — three shared principles CVC was breaking on all of them." },
                { src: "/screens-desktop/mac-heuristica.png", title: "Heuristic evaluation", body: "Mapped every friction point in the legacy webview flow before redrawing a single pixel." },
                { src: "/screens-desktop/mac-flow.png", title: "Redesigned flow", body: "A linear, guided architecture — one decision per screen, outbound then return." },
                { src: "/screens-desktop/mac-wireframes.png", title: "Wireframes", body: "Low-fi structure validated with a Maze A/B test before committing to hi-fi." },
                { src: "/screens-desktop/mac-dynamics.png", title: "Motion & dynamics", body: "Native transitions replacing the 40–55s of “dancing cards.”" },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 07 · MORE SCREENS ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>06 — More of the product</Label>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "3rem", marginBottom: "3rem" }}>
              {[
                { src: "/screens-mobile/ip-filters.png", title: "Filters", body: "Price range, duration, stops — clean sheet without modal interruption." },
                { src: "/screens-mobile/ip-detail.png", title: "Flight detail", body: "Expanded inline — no page navigation. Return suggestions shown before commitment." },
              ].map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "auto 1fr", gap: isMobile ? "1.5rem" : "2rem", alignItems: "center" }}>
                  <IPhone src={item.src} alt={item.title} width={180} />
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: ".75rem" }}>{item.title}</h3>
                    <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "2rem" }}>
              {[
                { src: "/screens-mobile/ip-upgrade.png", label: "Baggage upselling" },
                { src: "/screens-mobile/ip-volta.png", label: "Return flight selection" },
                { src: "/screens-mobile/ip-passengers.png", label: "Passengers" },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                  <IPhone src={p.src} alt={p.label} width={220} />
                  <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)", letterSpacing: ".08em", textAlign: "center", textTransform: "uppercase" }}>{p.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 08 · OUTCOMES ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>07 — Outcomes</Label>
            <RevealText
              lines={["Results after 1 month live.", <em key="ab" className="text-gradient" style={{ fontStyle: "italic" }}>A/B tested 50/50 in production.</em>]}
              style={{ fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1rem", maxWidth: 700 }}
            />
            <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.3)", marginBottom: "4rem", letterSpacing: ".06em" }}>Tracked via Mixpanel</p>
          </ScrollReveal>

          {/* Big conversion metric */}
          <ScrollReveal delay={80}>
            <div style={{ padding: "3rem", border: "1px solid rgba(0,113,227,.3)", borderRadius: 20, background: "rgba(0,113,227,.05)", marginBottom: "2rem", textAlign: "center" }}>
              <p style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".15em", color: "#0071e3", textTransform: "uppercase", marginBottom: "1rem" }}>Checkout conversion rate — end-to-end flight booking</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontSize: "clamp(3rem,8vw,7rem)", fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: "-.05em", lineHeight: 1 }}>6.4%</p>
                  <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.3)", marginTop: ".5rem" }}>Before</p>
                </div>
                <p style={{ fontSize: "clamp(2rem,5vw,4rem)", color: "#0071e3" }}>→</p>
                <div>
                  <p style={{ fontSize: "clamp(3rem,8vw,7rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.05em", lineHeight: 1 }}>20%</p>
                  <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.5)", marginTop: ".5rem" }}>After</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Other metrics */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            {[
              { n: "4.6★", l: "App Store rating", sub: "2.0★ → 3.2★ (1 month) → 4.6★ (full rollout)" },
              { n: "+23%", l: "Cross-sell revenue", sub: "Baggage tier upselling" },
              { n: "−60%", l: "Support tickets", sub: '"Navigation doesn\'t work!" complaints' },
            ].map((m, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ padding: "2.5rem 2rem", background: "#0a0a0a", height: "100%" }}>
                  <p style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, color: "#0071e3", letterSpacing: "-.04em", lineHeight: 1, marginBottom: ".75rem" }}>{m.n}</p>
                  <p style={{ fontSize: ".9rem", fontWeight: 600, color: "#fff", marginBottom: ".4rem" }}>{m.l}</p>
                  <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{m.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ 09 · LEARNINGS ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>08 — What I learned</Label>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "2rem" }}>
              {[
                { n: "01", title: "Define metrics before pixels.", body: "Setting success metrics upfront aligned PM, Engineering, and gave me clear go/no-go criteria. It's what made the A/B test decisive instead of debatable." },
                { n: "02", title: "Test the riskiest decision first.", body: "Testing the outbound/return split before investing in hi-fi gave me the evidence to challenge stakeholder assumptions confidently." },
                { n: "03", title: "Sell a bet, not a vision.", body: "1-month A/B test instead of 6-month full rebuild. Smaller scope, contained risk, metrics upfront. That's what got the yes." },
                { n: "04", title: "Native DS compounds.", body: "Investing in mobile-specific components improved usability in ways that web-ported components never would have. The experience felt like a different product." },
              ].map((l, i) => (
                <div key={i} style={{ padding: "2rem", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16 }}>
                  <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".15em", color: "#0071e3", textTransform: "uppercase", marginBottom: "1rem" }}>{l.n}</p>
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
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,113,227,.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="aurora aurora-soft" style={{ mixBlendMode: "screen" }} />
        <ScrollReveal className="aurora-content">
          <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem" }}>Next case</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.02, marginBottom: "3rem" }}>
            See the Rappi<br /><em className="text-gradient" style={{ fontStyle: "italic" }}>Merchant Onboarding.</em>
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/work/rappi" className="btn-blue">Rappi Case Study →</Link>
            <Link href="/contact" className="btn-white-ghost">Get in touch</Link>
          </div>
        </ScrollReveal>
      </section>

      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.08)", padding: "2rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)" }}>© 2025 Rafael Guimarães</p>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="/work/rappi" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>Rappi Case →</Link>
          <Link href="/" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>Home</Link>
        </div>
      </footer>
    </main>
  );
}
