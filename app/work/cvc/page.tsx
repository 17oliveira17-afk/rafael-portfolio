"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ScrollReveal from "../../components/ScrollReveal";

const phases = [
  {
    tag: "Context", num: "01",
    title: "Brazil's largest travel company.",
    body: "CVC is Brazil's largest travel operator with 1,600 stores, around 30 million customers, and almost R$17B in annual bookings. I joined as the solo designer on a mobile squad with 25 engineers, 2 PMs, and 2 Tech Leads.",
    items: ["Solo designer on project, +1 in squad", "Working with 25 engineers, 2 PMs, 2 TLs", "Existing research about current problems", "Stakeholders unsure how to improve app satisfaction"],
    accent: "#aaa",
    metric: null,
  },
  {
    tag: "Challenge", num: "02",
    title: "The problem was deeper than performance.",
    body: "The app had a 2.0 ★ rating. Crashes, slow loading, broken flows — but the root cause wasn't bugs. The entire booking experience ran on a webview. The mobile team was treated as a backup to the website, not a first-class product.",
    items: ["Entire booking flow on webview", "Mobile team but was treated as backup", "No native experience, no mobile features", "No reason to install over the website"],
    accent: "#ff6b6b",
    metric: { value: "2.0 ★", label: "Starting app rating" },
  },
  {
    tag: "Discovery", num: "03",
    title: "Leveraging existing research to move fast.",
    body: "I ran a full end-to-end UX Audit, testing the live experience screen by screen and mapping every usability issue. Then benchmarked the top 5 flight apps: Hopper, Skyscanner, Kayak, AvisaSales, and Decolar.",
    items: [
      "Flight cards too complex — outbound + return combined → Opportunity: separate by journey",
      "Search engine fragmented — users navigate back 4+ times → Opportunity: single guided flow",
      "No native features — no GPS, notifications, not fluid → Opportunity: native",
      "Webview crashes — most 1-star reviews → Opportunity: native rendering",
    ],
    accent: "var(--accent)",
    metric: { value: "5 apps", label: "Competitors analyzed" },
  },
  {
    tag: "Structure", num: "04",
    title: "One architectural decision changed everything.",
    body: "The key insight: split outbound and return flights into sequential screens. Before, users navigated back and forth 4+ times. After: a linear 3-step flow with a loading animation that cross-sold hotels, and confirmation before checkout — not inside it.",
    items: [
      "Before: Search engine → Flight results (combined/slow) → Upselling → Checkout → Flight details",
      "After: Loading + cross-sell animation → Flight results (outbound) → Flight results (return) → Upselling → Flight details → Checkout → Thank you",
    ],
    accent: "#a0ff6e",
    metric: { value: "3 steps", label: "New linear flow" },
  },
  {
    tag: "Validation", num: "05",
    title: "Validated before going hi-fi.",
    body: "Before any high-fidelity work, I validated wireframes with Engineering and Product to de-risk feasibility and scope. Cross-functional validation early means no surprises in development.",
    items: ["Wireframes validated with Engineering and Product", "Feasibility and scope de-risked before hi-fi", "Stakeholder alignment before visual design"],
    accent: "#c9a0ff",
    metric: null,
  },
  {
    tag: "Impact", num: "06",
    title: "Numbers that speak for themselves.",
    body: "Within one month of partial rollout, the app rating jumped from 2.0 to 3.2. After full rollout: 4.6 stars. Conversion tripled. Cross-sell revenue grew by 23%.",
    items: [
      "Conversion: 6.4% → 20%",
      "App rating: 2.0 → 3.2 (1 month partial) → 4.6 (full rollout)",
      "Cross-sell revenue: +23%",
      "User retention significantly improved",
    ],
    accent: "var(--yellow)",
    metric: { value: "+23%", label: "Cross-sell revenue" },
  },
];

export default function CVCCasePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-enter">

      {/* ── Hero ── */}
      <section style={{ minHeight: "75vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 3rem 5rem", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(245,230,66,.07) 0%, transparent 70%)", top: -80, right: -80 }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <Link href="/" className="label" style={{ textDecoration: "none", color: "var(--text-muted)", transition: "color .2s ease" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--text-muted)"; }}>
              ← Back
            </Link>
            <span style={{ color: "var(--border)" }}>·</span>
            <span className="label">Case Study 01</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.75rem" }}>
            <div style={{
              width: 56, height: 56, background: "#f5e642", borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 900, color: "#000", fontSize: "1rem",
            }}>CVC</div>
            <h1 className="display-xl">
              Flight Booking<br />Redesign
            </h1>
          </div>

          <div style={{ display: "flex", gap: ".75rem", marginBottom: "3rem" }}>
            {["B2C", "Mobile App", "Product Designer", "Solo Designer"].map(t => (
              <span key={t} className="label" style={{ padding: ".3rem .8rem", border: "1px solid var(--border)", borderRadius: 100 }}>{t}</span>
            ))}
          </div>

          {/* Result bar */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem",
            padding: "2.5rem", background: "linear-gradient(135deg, rgba(74,250,138,.07), rgba(160,255,110,.03))",
            border: "1px solid rgba(74,250,138,.15)", borderRadius: 20,
            maxWidth: 800,
          }}>
            {[
              { v: "6.4% → 20%", l: "Conversion Rate" },
              { v: "2.0 → 4.6 ★", l: "App Store Rating" },
              { v: "+23%", l: "Cross-sell Revenue" },
            ].map((r, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-.025em", color: "var(--accent)", lineHeight: 1 }}>{r.v}</p>
                <p className="label" style={{ marginTop: ".5rem" }}>{r.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Phase sections ── */}
      <section style={{ padding: "4rem 3rem 8rem", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {phases.map((ph, i) => (
            <ScrollReveal key={i} delay={0} style={{ marginBottom: "6rem" }}>
              <div>
                {/* phase header */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
                  <span style={{
                    padding: ".3rem .8rem",
                    background: `${ph.accent}15`,
                    border: `1px solid ${ph.accent}35`,
                    borderRadius: 100, fontSize: ".65rem", fontWeight: 600,
                    letterSpacing: ".15em", textTransform: "uppercase",
                    color: ph.accent,
                  }}>
                    {ph.num} — {ph.tag}
                  </span>
                </div>

                {/* title + metric */}
                <div style={{ display: "grid", gridTemplateColumns: ph.metric ? "1fr auto" : "1fr", gap: "3rem", alignItems: "start", marginBottom: "1.5rem" }}>
                  <h2 className="display-md">{ph.title}</h2>
                  {ph.metric && (
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-.03em", color: ph.accent, lineHeight: 1 }}>
                        {ph.metric.value}
                      </div>
                      <p className="label" style={{ marginTop: ".4rem" }}>{ph.metric.label}</p>
                    </div>
                  )}
                </div>

                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1rem", fontWeight: 300, marginBottom: "2rem", maxWidth: 680 }}>
                  {ph.body}
                </p>

                {/* items */}
                <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                  {ph.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: ph.accent, marginTop: ".45rem", flexShrink: 0 }} />
                      <p style={{ color: "var(--text-muted)", fontSize: ".9rem", lineHeight: 1.6, fontWeight: 300 }}>{item}</p>
                    </div>
                  ))}
                </div>

                {/* divider */}
                {i < phases.length - 1 && (
                  <div style={{ marginTop: "4rem", height: 1, background: `linear-gradient(90deg, ${ph.accent}40, transparent)` }} />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Footer nav ── */}
      <section style={{ padding: "4rem 3rem 6rem", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" className="btn-ghost">← Back to Home</Link>
          <Link href="/contact" className="btn-primary">Let&apos;s talk →</Link>
        </div>
      </section>

    </main>
  );
}
