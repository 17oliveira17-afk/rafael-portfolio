"use client";
import Link from "next/link";
import { useRef, useState, useEffect, ReactNode } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import useIsMobile from "../../components/useIsMobile";
import Icon from "../../components/Icon";
import RevealText from "../../components/RevealText";
import LoopVideo from "../../components/LoopVideo";
import DeviceSwitcher from "../../components/DeviceSwitcher";
import FeatureCarousel from "../../components/FeatureCarousel";
import SideShot from "../../components/SideShot";
import PhoneSpotlight from "../../components/PhoneSpotlight";
import PhoneTabs from "../../components/PhoneTabs";
import CaseHero from "../../components/CaseHero";
import FloatingProjectNav from "../../components/FloatingProjectNav";

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
      background: "rgba(234,179,8,.05)", border: "2px dashed rgba(234,179,8,.35)",
      borderRadius: 16, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: ".75rem", padding: "2rem",
    }}>
      <div style={{ color: "#eab308", display: "flex" }}><Icon name="folder" size={32} /></div>
      <p style={{ fontSize: ".9rem", fontWeight: 700, color: "#eab308", textAlign: "center", letterSpacing: "-.01em" }}>{label}</p>
      <code style={{ fontSize: ".75rem", color: "rgba(234,179,8,.8)", background: "rgba(234,179,8,.1)", padding: ".25rem .6rem", borderRadius: 6 }}>
        /public/{filename}
      </code>
      {hint && <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", textAlign: "center", maxWidth: 380, lineHeight: 1.5 }}>{hint}</p>}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#eab308", marginBottom: "1.5rem" }}>{children}</p>;
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
    <main className="page-in dark-cursor" style={{ background: "#000", "--blue": "#eab308", "--blue-hover": "#d99400" } as React.CSSProperties}>

      {/* ═══ 01 · HERO ═══ */}
      <CaseHero
        accent="#eab308"
        index="01"
        company="CVC · Travel"
        titleLines={["CVC Flight", <em key="br" style={{ color: "#eab308", fontStyle: "italic" }}>Booking Redesign.</em>]}
        subtitle="Brazil's largest travel app had a 2.0★ rating, 40-second loads, and 6% checkout conversion. I proposed a 1-month A/B bet instead of a 6-month redesign — and delivered results in the first month."
        tags={["B2C", "Mobile App", "Travel", "Solo designer"]}
        stats={[
          { n: "2.0 → 4.6★", l: "App Store rating" },
          { n: "+212%", l: "Checkout conversion" },
          { n: "+23%", l: "Cross-sell revenue" },
        ]}
      />

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
              The problem was<br /><em style={{ color: "#eab308", fontStyle: "italic" }}>deeper than performance.</em>
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
                  <p style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "#eab308", letterSpacing: "-.04em", lineHeight: 1 }}>{s.n}</p>
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
              Webview treated as backup.<br /><em style={{ color: "#eab308", fontStyle: "italic" }}>No reason to install the app.</em>
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
              I proposed a 1-month bet<br />instead of a <em style={{ color: "#eab308", fontStyle: "italic" }}>6-month rebuild.</em>
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
                  <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".15em", color: "#eab308", textTransform: "uppercase", marginBottom: "1.25rem" }}>{s.n}</p>
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
                  Separate outbound and return.<br /><em style={{ color: "#eab308", fontStyle: "italic" }}>Stakeholders were against it.</em>
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
                  <div style={{ padding: "1.5rem", border: "1px solid rgba(234,179,8,.3)", borderRadius: 12, background: "rgba(234,179,8,.05)" }}>
                    <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".1em", color: "#eab308", textTransform: "uppercase", marginBottom: ".75rem", display: "inline-flex", alignItems: "center", gap: ".4rem" }}>A — Separated <Icon name="trophy" size={14} /></p>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", letterSpacing: "-.03em" }}>9.4s</p>
                    <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.5)", marginTop: ".4rem" }}>Score: 97–100</p>
                    <p style={{ fontSize: ".78rem", color: "#eab308", marginTop: ".5rem", fontStyle: "italic" }}>&ldquo;Practical, no back and forth&rdquo;</p>
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
                  bare
                  height={520}
                  heightMobile={420}
                  items={[
                    { label: "B — Combined", src: "/screens-mobile/ip-resultado-old.png", caption: "Outbound + return on one card. 18.9s to choose. “Too much info.”" },
                    { label: "A — Separated", src: "/screens-mobile/ip-resultado.png", caption: "One flight at a time. 9.4s to choose — 101% faster. “Practical, no back and forth.”" },
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
              lines={["Guided search. One flight at a time.", <em key="c" style={{ color: "#eab308", fontStyle: "italic" }}>Confirmation before checkout.</em>]}
              style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 700 }}
            />
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 660, marginBottom: "4rem" }}>
              The new flow replaced a fragmented multi-step search with a linear 3-step guided experience — destination, details, dates. Results show one flight at a time, outbound then return. Flight details expand inline without leaving the list. Confirmation appears before checkout, not inside it.
            </p>
          </ScrollReveal>

          {/* Guided search · Flight results · Confirmation — three phones each */}
          <ScrollReveal delay={100}>
            <div style={{ marginBottom: "4rem" }}>
              <PhoneTabs
                isMobile={isMobile}
                groups={[
                  {
                    label: "Search",
                    items: [
                      { src: "/screens-mobile/ip-guided-1.png", alt: "Destination search", caption: "Destination — type a city, pick an airport. No fragmented multi-step form." },
                      { src: "/screens-mobile/ip-guided-2.png", alt: "Trip details", caption: "Details — passengers, cabin class and stops in one native step." },
                      { src: "/screens-mobile/ip-guided-3.png", alt: "Date selection", caption: "Dates — outbound and return on a single, clear calendar." },
                    ],
                  },
                  {
                    label: "Results",
                    items: [
                      { src: "/screens-mobile/ip-results-1.png", alt: "Choose outbound", caption: "Outbound first — smart badges (cheapest, non-stop, more baggage) surface the trade-offs." },
                      { src: "/screens-mobile/ip-results-2.png", alt: "Expanded flight detail", caption: "Tap to expand inline — return options, full itinerary and fare class, without leaving the list." },
                      { src: "/screens-mobile/ip-results-3.png", alt: "Choose return", caption: "Then the return — outbound locked at the top, return chosen separately. 101% faster." },
                    ],
                  },
                  {
                    label: "Confirmation",
                    items: [
                      { src: "/screens-mobile/ip-confirm-1.png", alt: "Trip summary", caption: "Outbound and return summarised — dates, airline and baggage — before you commit." },
                      { src: "/screens-mobile/ip-confirm-2.png", alt: "Full itinerary", caption: "The full itinerary — every leg and layover, with operating carrier and fare class." },
                      { src: "/screens-mobile/ip-confirm-3.png", alt: "Important notices", caption: "Important notices — COVID rules, delay and cancellation stats — surfaced before checkout." },
                    ],
                  },
                ]}
              />
            </div>
          </ScrollReveal>

          {/* Hi-fi prototype — the whole app, usability-tested end to end */}
          <ScrollReveal delay={150}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "5rem", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.25rem", display: "inline-flex", alignItems: "center", gap: ".5rem" }}><Icon name="video" size={15} /> Hi-fi prototype</p>
                <h3 style={{ fontSize: "clamp(1.6rem,2.6vw,2.2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.02em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
                  The whole app, prototyped<br />and tested end to end.
                </h3>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.1rem" }}>
                  I built the entire experience as a clickable hi-fi prototype — guided search, results, flight details, baggage, passengers and confirmation — not just isolated screens.
                </p>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>
                  That let me run real usability tests on the full journey before a single line of code — validating the one-flight-at-a-time decision and handing engineering a flow already proven to work.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: isMobile ? 260 : 320, filter: "drop-shadow(0 40px 80px rgba(0,0,0,.55))" }}>
                  <LoopVideo
                    src="/videos/cvc-prototype.mp4"
                    label="CVC flight booking — full prototype walkthrough"
                    aspect="720 / 1488"
                    radius={28}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 06.5 · PROCESS — THE THINKING (desktop artifacts) ═══ */}
      <section style={{ padding: isMobile ? "5rem 0" : "8rem 0", background: "#050505", overflow: "hidden" }}>
        {/* heading */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 1.5rem" : "0 6rem" }}>
          <ScrollReveal>
            <Label>Behind the screens — the process</Label>
            <RevealText
              lines={["Rigor before pixels.", <em key="p" style={{ color: "#eab308", fontStyle: "italic" }}>The work behind the work.</em>]}
              style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: isMobile ? "3rem" : "5rem", maxWidth: 700 }}
            />
          </ScrollReveal>
        </div>

        {/* huge side-bleed laptops — enter from the page edge on scroll */}
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "5rem" : "clamp(6rem,11vw,10rem)", padding: isMobile ? "0 1.5rem" : 0, marginTop: isMobile ? "2rem" : "3rem" }}>
          <SideShot
            isMobile={isMobile}
            side="right"
            glow="gold"
            src="/screens-desktop/mac-benchmark.png"
            alt="Competitive benchmark of leading flight apps"
            eyebrow="01 · The evidence"
            title="It started with the whole market."
            body="Hopper, Skyscanner, Kayak, AvisaSales, Decolar — every leading flight app, mapped screen by screen. Three principles kept repeating: guided flow, one flight at a time, fully native. CVC was breaking all three."
            metric={{ n: "5 apps", l: "benchmarked end-to-end" }}
          />
          <SideShot
            isMobile={isMobile}
            side="left"
            glow="amber"
            src="/screens-desktop/mac-user-flow.png"
            alt="Navigation flow remapped — current vs ideal"
            eyebrow="02 · The architecture"
            title="Then I remapped the flow."
            body="The current webview sitemap, mapped against an ideal one — a linear, guided architecture with one decision per screen, outbound then return, and a confirmation before checkout instead of inside it."
            metric={{ n: "Current → ideal", l: "navigation flow remapped" }}
          />
        </div>

        {/* Supporting craft — peers you skim, in a carousel */}
        <div style={{ maxWidth: 1100, margin: isMobile ? "4rem auto 0" : "6rem auto 0", padding: isMobile ? "0 1.5rem" : "0 6rem" }}>
          <ScrollReveal delay={80}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: "1.5rem" }}>
              03 · More from the process
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <FeatureCarousel
              slides={[
                { src: "/screens-desktop/process-ux-audit.png", title: "UX audit", body: "Every friction point in the legacy webview flow, annotated screen by screen.", ratio: "1142 / 742", position: "center" },
                { src: "/screens-desktop/process-wireframes.png", title: "Wireframes", body: "Lo-fi structure for the whole flow before committing to a single hi-fi pixel.", ratio: "1142 / 742", position: "center" },
                { src: "/screens-desktop/process-wireframe-validation.png", title: "Wireframe cross-validation", body: "Impediments, suggestions and effort scored per screen with the team.", ratio: "1142 / 742", position: "center" },
                { src: "/screens-desktop/process-usability-test.png", title: "Usability test — Maze A/B", body: "The outbound/return split, validated. Variant A won 97–100 vs 40.", ratio: "1142 / 742", position: "center" },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 07 · MORE OF THE PRODUCT — one pinned phone ═══ */}
      <section style={{ padding: isMobile ? "5rem 1.5rem" : "8rem 6rem 4rem", background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>06 — More of the product</Label>
            <RevealText
              lines={["Five more screens.", <em key="o" style={{ color: "#eab308", fontStyle: "italic" }}>One focused device.</em>]}
              style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 700 }}
            />
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 620 }}>
              {isMobile ? "Scroll through the supporting screens." : "Scroll — the device stays, the screen changes."}
            </p>
          </ScrollReveal>
        </div>
        <div style={{ maxWidth: 1100, margin: isMobile ? "3rem auto 0" : "0 auto" }}>
          <PhoneSpotlight
            isMobile={isMobile}
            finish="desert"
            baked
            items={[
              { src: "/screens-mobile/ip-bag-details.png", title: "Baggage details on search", body: "Personal item, carry-on and checked-bag rules surfaced right in the search filters — answered before the results, not after booking." },
              { src: "/screens-mobile/ip-resultado-filtros.png", title: "Quick filters", body: "One-tap chips — cheapest, economy, non-stop — let users jump straight to what they want without opening the full filter sheet." },
              { src: "/screens-mobile/ip-search-edit.png", title: "Fast search edit", body: "Origin, dates and passengers editable inline from the results header — no trip back to the start of the flow." },
              { src: "/screens-mobile/ip-filters-sheet.png", title: "Filters", body: "Price range, duration and stops on a clean sheet, with a live price histogram — no modal interruption." },
              { src: "/screens-mobile/ip-upgrade.png", title: "Baggage & fare upselling", body: "Tiered upgrades framed as a clear choice at the right moment in the flow.", metric: "+23% cross-sell" },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* ═══ 08 · OUTCOMES ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>07 — Outcomes</Label>
            <RevealText
              lines={["Results after 1 month live.", <em key="ab" style={{ color: "#eab308", fontStyle: "italic" }}>A/B tested 50/50 in production.</em>]}
              style={{ fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1rem", maxWidth: 700 }}
            />
            <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.3)", marginBottom: "4rem", letterSpacing: ".06em" }}>Tracked via Mixpanel</p>
          </ScrollReveal>

          {/* Big conversion metric */}
          <ScrollReveal delay={80}>
            <div style={{ padding: "3rem", border: "1px solid rgba(234,179,8,.3)", borderRadius: 20, background: "rgba(234,179,8,.05)", marginBottom: "2rem", textAlign: "center" }}>
              <p style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".15em", color: "#eab308", textTransform: "uppercase", marginBottom: "1rem" }}>Checkout conversion rate — end-to-end flight booking</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontSize: "clamp(3rem,8vw,7rem)", fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: "-.05em", lineHeight: 1 }}>6.4%</p>
                  <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.3)", marginTop: ".5rem" }}>Before</p>
                </div>
                <p style={{ fontSize: "clamp(2rem,5vw,4rem)", color: "#eab308" }}>→</p>
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
                  <p style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, color: "#eab308", letterSpacing: "-.04em", lineHeight: 1, marginBottom: ".75rem" }}>{m.n}</p>
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
              {([
                { n: "01", icon: "target", title: "Define metrics before pixels.", body: "Setting success metrics upfront aligned PM, Engineering, and gave me clear go/no-go criteria. It's what made the A/B test decisive instead of debatable." },
                { n: "02", icon: "flask", title: "Test the riskiest decision first.", body: "Testing the outbound/return split before investing in hi-fi gave me the evidence to challenge stakeholder assumptions confidently." },
                { n: "03", icon: "zap", title: "Sell a bet, not a vision.", body: "1-month A/B test instead of 6-month full rebuild. Smaller scope, contained risk, metrics upfront. That's what got the yes." },
                { n: "04", icon: "layers", title: "Native DS compounds.", body: "Investing in mobile-specific components improved usability in ways that web-ported components never would have. The experience felt like a different product." },
              ] as const).map((l, i) => (
                <div key={i} style={{ padding: "2rem", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".85rem", marginBottom: "1.25rem" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(234,179,8,.1)", border: "1px solid rgba(234,179,8,.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#eab308", flexShrink: 0 }}>
                      <Icon name={l.icon} size={20} />
                    </div>
                    <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".15em", color: "#eab308", textTransform: "uppercase" }}>{l.n}</p>
                  </div>
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
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(234,179,8,.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="aurora aurora-soft" style={{ mixBlendMode: "screen" }} />
        <ScrollReveal className="aurora-content">
          <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#eab308", marginBottom: "1.5rem" }}>See it in product</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,4.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.02, marginBottom: "3rem" }}>
            The systems behind<br /><em style={{ color: "#eab308", fontStyle: "italic" }}>the products.</em>
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/work/rappi" className="btn-blue">Rappi Onboarding →</Link>
            <Link href="/work/design-system" className="btn-white-ghost">Design Systems →</Link>
            <Link href="/contact" className="btn-white-ghost">Get in touch</Link>
          </div>
        </ScrollReveal>
      </section>

      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.08)", padding: "2rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)" }}>© 2025 Rafael Guimarães</p>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="/work/rappi" style={{ fontSize: ".72rem", color: "#eab308", textDecoration: "none" }}>Rappi Case →</Link>
          <Link href="/" style={{ fontSize: ".72rem", color: "#eab308", textDecoration: "none" }}>Home</Link>
        </div>
      </footer>
      <FloatingProjectNav />
    </main>
  );
}
