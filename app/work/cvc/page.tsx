"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ScrollReveal from "../../components/ScrollReveal";

export default function CVCPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => {
      if (!heroRef.current) return;
      heroRef.current.style.opacity = String(Math.max(0, 1 - window.scrollY / 500));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main className="page-in">

      {/* ── HERO ── */}
      <section className="section-dark" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 2.5rem 6rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(245,230,66,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div ref={heroRef} style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
            <Link href="/" className="t-label" style={{ textDecoration: "none", color: "var(--gray)", transition: "color .2s ease" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--gray)"}
            >← Back</Link>
            <span style={{ color: "rgba(255,255,255,.15)" }}>·</span>
            <span className="t-label">Case Study 01</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ width: 52, height: 52, background: "#f5e642", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#000", fontSize: ".85rem" }}>CVC</div>
            <h1 className="t-hero" style={{ fontSize: "clamp(3rem,8vw,9rem)" }}>Flight Booking<br />Redesign</h1>
          </div>
          <div style={{ display: "flex", gap: ".6rem", marginBottom: "4rem" }}>
            {["B2C", "Mobile App", "Product Designer", "Solo Designer"].map(t => (
              <span key={t} className="t-label" style={{ padding: ".3rem .8rem", border: "1px solid rgba(255,255,255,.12)", borderRadius: 100, fontSize: ".6rem" }}>{t}</span>
            ))}
          </div>

          {/* Impact bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0", maxWidth: 700, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20 }}>
            {[
              { v: "20%", l: "Conversion", sub: "from 6.4%" },
              { v: "4.6 ★", l: "App Rating", sub: "from 2.0" },
              { v: "+23%", l: "Cross-sell", sub: "revenue" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "2rem 2.5rem", borderRight: i < 2 ? "1px solid rgba(255,255,255,.08)" : "none", textAlign: i === 1 ? "center" : i === 2 ? "right" : "left" }}>
                <div style={{ fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.8rem)", letterSpacing: "-.04em", color: "#f5e642", lineHeight: 1 }}>{r.v}</div>
                <p className="t-label" style={{ marginTop: ".4rem" }}>{r.l}</p>
                <p className="t-label" style={{ fontSize: ".55rem", marginTop: ".2rem" }}>{r.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: Context ── */}
      <section className="section-dark" style={{ padding: "10rem 2.5rem", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-label" style={{ marginBottom: "2rem", color: "#aaa" }}>01 — Context</p>
            <h2 className="t-statement" style={{ marginBottom: "3rem" }}>
              Brazil's largest<br />travel company.
            </h2>
            <p className="t-sub" style={{ maxWidth: 580, marginBottom: "4rem" }}>
              CVC is Brazil's largest travel operator — 1,600 stores, 30 million customers, R$17B in annual bookings. I joined as the solo product designer on a mobile squad with 25 engineers, 2 PMs, and 2 Tech Leads.
            </p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "rgba(255,255,255,.07)", borderRadius: 20, overflow: "hidden" }}>
            {["Solo designer on project, +1 in squad", "Working with 25 engineers, 2 PMs, 2 TLs", "Existing research about current problems", "Stakeholders unsure how to improve satisfaction"].map((item, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div style={{ padding: "2.5rem", background: "#0a0a0a" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gray)", marginBottom: "1rem" }} />
                  <p style={{ color: "var(--gray-light)", fontSize: ".95rem", lineHeight: 1.6, fontWeight: 300 }}>{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: Challenge — LIGHT ── */}
      <section className="section-light" style={{ padding: "10rem 2.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-label" style={{ marginBottom: "2rem" }}>02 — Challenge</p>
            <h2 className="t-statement" style={{ color: "#000", marginBottom: "3rem" }}>
              The problem was deeper<br />than performance.
            </h2>
            <p style={{ fontSize: "clamp(1rem,1.5vw,1.2rem)", lineHeight: 1.75, color: "#444", fontWeight: 300, maxWidth: 580, marginBottom: "5rem" }}>
              The app had a 2.0 ★ rating. Crashes, slow loading, broken flows — but the root cause wasn't bugs. The entire booking experience ran on a webview. The mobile team was treated as a backup to the website, not a first-class product.
            </p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            <ScrollReveal>
              <div className="stat-block-light">
                <div className="t-num" style={{ color: "#ff3b30", fontSize: "clamp(3rem,7vw,8rem)" }}>2.0★</div>
                <p className="t-label" style={{ marginTop: "1rem" }}>Starting App Rating</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div>
                <p className="t-label" style={{ marginBottom: "1.5rem" }}>The root cause</p>
                {["Entire booking flow on webview", "Mobile team treated as backup", "No native experience, no mobile features", "No reason to install over the website"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: ".75rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ff3b30", marginTop: ".45rem", flexShrink: 0 }} />
                    <p style={{ color: "#444", fontSize: ".95rem", lineHeight: 1.6, fontWeight: 300 }}>{item}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION: Discovery — DARK ── */}
      <section className="section-dark" style={{ padding: "10rem 2.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-label" style={{ marginBottom: "2rem" }}>03 — Discovery</p>
            <h2 className="t-statement" style={{ marginBottom: "3rem" }}>
              Leveraging research<br />to move fast.
            </h2>
            <p className="t-sub" style={{ maxWidth: 580, marginBottom: "5rem" }}>
              I ran a full end-to-end UX Audit and benchmarked 5 top flight apps: Hopper, Skyscanner, Kayak, AvisaSales, and Decolar. The pattern was clear.
            </p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
            {[
              { title: "Flight cards too complex", body: "Outbound + return combined → Opportunity: separate by journey", color: "var(--accent)" },
              { title: "Search engine fragmented", body: "Users navigate back 4+ times → Opportunity: single guided flow", color: "var(--accent)" },
              { title: "No native features", body: "No GPS, no notifications, not fluid → Opportunity: native", color: "var(--accent)" },
              { title: "Webview crashes", body: "Most 1-star reviews = freezing → Opportunity: native rendering", color: "var(--accent)" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 70}>
                <div style={{ padding: "2.5rem", background: "#111", borderRadius: 20, border: "1px solid rgba(255,255,255,.07)" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, marginBottom: "1.25rem" }} />
                  <p style={{ fontWeight: 600, fontSize: "1rem", marginBottom: ".75rem" }}>{item.title}</p>
                  <p className="t-sub" style={{ fontSize: ".88rem" }}>{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={200} style={{ marginTop: "3rem" }}>
            <div style={{ padding: "2rem 2.5rem", background: "rgba(74,250,138,.06)", border: "1px solid rgba(74,250,138,.15)", borderRadius: 16 }}>
              <p style={{ fontWeight: 600, color: "var(--accent)" }}>CVC was doing the opposite on all three competitor benchmarks.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION: Solution — LIGHT ── */}
      <section className="section-light" style={{ padding: "10rem 2.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-label" style={{ marginBottom: "2rem" }}>04 — Solution</p>
            <h2 className="t-statement" style={{ color: "#000", marginBottom: "3rem" }}>
              One key decision<br />changed everything.
            </h2>
            <p style={{ fontSize: "clamp(1rem,1.5vw,1.2rem)", lineHeight: 1.75, color: "#444", fontWeight: 300, maxWidth: 580, marginBottom: "5rem" }}>
              Split outbound and return flights into sequential screens. A loading animation cross-sold hotels. Linear 3-step search with confirmation before checkout — not inside it.
            </p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <ScrollReveal>
              <div>
                <p className="t-label" style={{ marginBottom: "1.5rem", color: "#888" }}>Before</p>
                <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                  {["Search Engine (many steps)", "Slow-loading results", "Combined flights (outbound + return)", "Confirmation inside checkout"].map((step, i) => (
                    <div key={i} style={{ padding: "1rem 1.25rem", background: "#f5f5f7", borderRadius: 10, display: "flex", alignItems: "center", gap: ".75rem" }}>
                      <span style={{ color: "#ff3b30", fontSize: ".7rem" }}>✗</span>
                      <p style={{ fontSize: ".88rem", color: "#444" }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div>
                <p className="t-label" style={{ marginBottom: "1.5rem", color: "#888" }}>After</p>
                <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                  {["Loading + cross-sell animation", "Flight results (outbound)", "Flight results (return)", "Upselling → Flight details → Checkout"].map((step, i) => (
                    <div key={i} style={{ padding: "1rem 1.25rem", background: "rgba(74,250,138,.08)", border: "1px solid rgba(74,250,138,.2)", borderRadius: 10, display: "flex", alignItems: "center", gap: ".75rem" }}>
                      <span style={{ color: "#34c759", fontSize: ".7rem" }}>✓</span>
                      <p style={{ fontSize: ".88rem", color: "#000" }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION: Impact — DARK, CINEMATIC ── */}
      <section className="section-dark" style={{ padding: "12rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245,230,66,.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-label" style={{ marginBottom: "2rem" }}>06 — Impact</p>
            <h2 className="t-statement" style={{ marginBottom: "5rem" }}>
              Numbers that speak<br />for themselves.
            </h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "4rem" }}>
            {[
              { v: "6.4%\n→ 20%", l: "Conversion Rate", c: "#f5e642" },
              { v: "2.0\n→ 4.6★", l: "App Store Rating", c: "#f5e642" },
              { v: "+23%", l: "Cross-sell Revenue", c: "#f5e642" },
            ].map((r, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="stat-block">
                  <div style={{ fontWeight: 700, fontSize: "clamp(2rem,4vw,4rem)", letterSpacing: "-.04em", color: r.c, lineHeight: 1.1, whiteSpace: "pre-line" }}>{r.v}</div>
                  <p className="t-label" style={{ marginTop: "1rem" }}>{r.l}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <section className="section-dark" style={{ padding: "4rem 2.5rem 6rem", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" className="btn-outline">← Back to Home</Link>
          <Link href="/contact" className="btn-white">Let's talk →</Link>
        </div>
      </section>

    </main>
  );
}
