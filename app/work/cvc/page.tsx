"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "../../components/ScrollReveal";

function PhoneMockup({ screen }: { screen: React.ReactNode }) {
  return (
    <div style={{ width: 240, margin: "0 auto" }}>
      <div className="phone-frame" style={{ aspectRatio: "9/19.5", position: "relative" }}>
        <div className="phone-notch" />
        <div style={{ position: "absolute", inset: 0, background: "#fff", borderRadius: 44, overflow: "hidden", paddingTop: 40 }}>
          {screen}
        </div>
        <div style={{ position: "absolute", left: -3, top: 80, width: 3, height: 30, background: "#333", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: -3, top: 120, width: 3, height: 50, background: "#333", borderRadius: 2 }} />
        <div style={{ position: "absolute", right: -3, top: 130, width: 3, height: 70, background: "#333", borderRadius: 2 }} />
      </div>
    </div>
  );
}

function LaptopMockup({ screen }: { screen: React.ReactNode }) {
  return (
    <div style={{ width: "100%" }}>
      <div className="laptop-frame">
        <div className="laptop-notch" />
        <div className="laptop-screen" style={{ aspectRatio: "16/10" }}>{screen}</div>
      </div>
      <div className="laptop-base" />
    </div>
  );
}

export default function CVCPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => {
      if (!heroRef.current) return;
      heroRef.current.style.opacity = String(Math.max(0, 1 - window.scrollY / 600));
      heroRef.current.style.transform = `translateY(${window.scrollY * .2}px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main className="page-in">

      {/* ── HERO ── */}
      <section className="section-black" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "8rem 2rem 6rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(245,230,66,.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div ref={heroRef} style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".75rem", marginBottom: "1.5rem" }}>
            <Link href="/" style={{ fontSize: ".78rem", color: "rgba(255,255,255,.5)", textDecoration: "none", transition: "color .15s ease" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.5)"}
            >← Home</Link>
            <span style={{ color: "rgba(255,255,255,.2)" }}>·</span>
            <p className="t-eyebrow">Case Study 01</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 48, height: 48, background: "#f5e642", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#000", fontSize: ".8rem" }}>CVC</div>
            <h1 className="t-hero-white">Flight Booking<br />Redesign</h1>
          </div>
          <p className="t-body-white" style={{ maxWidth: 480, margin: "0 auto 3rem" }}>
            Brazil's largest travel company. 30M customers. I redesigned the entire mobile booking experience from scratch.
          </p>

          {/* Impact bar */}
          <div style={{ display: "inline-grid", gridTemplateColumns: "repeat(3,1fr)", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, overflow: "hidden" }}>
            {[
              { v: "20%", l: "Conversion", sub: "from 6.4%" },
              { v: "4.6 ★", l: "App Rating", sub: "from 2.0 ★" },
              { v: "+23%", l: "Revenue", sub: "cross-sell" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "1.75rem 2.5rem", borderRight: i < 2 ? "1px solid rgba(255,255,255,.1)" : "none", textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.5rem)", letterSpacing: "-.04em", color: "#f5e642", lineHeight: 1 }}>{r.v}</div>
                <div style={{ fontSize: ".75rem", fontWeight: 600, color: "#f5f5f7", marginTop: ".4rem" }}>{r.l}</div>
                <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.4)", marginTop: ".2rem" }}>{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVICE SHOWCASE — white ── */}
      <section className="section-white" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ marginBottom: "1rem" }}>Before & After</p>
            <h2 className="t-headline" style={{ marginBottom: "1.25rem" }}>From webview to native experience</h2>
            <p className="t-body">The old app ran the entire booking flow inside a webview. No native features. No reason to install. 2.0 ★ rating.</p>
          </ScrollReveal>
          <ScrollReveal delay={100} type="scale">
            <PhoneMockup screen={
              <div style={{ padding: "0 12px", height: "100%", background: "#f5f5f7" }}>
                <div style={{ padding: "8px 0 12px", borderBottom: "1px solid #eee" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1d1d1f" }}>Escolha o voo de Ida</div>
                  <div style={{ fontSize: 10, color: "#6e6e73" }}>São Paulo → Dubai · 16 de Abril</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    {["Filtros", "Econômico", "Sem paradas"].map((f,i) => (
                      <div key={i} style={{ padding: "3px 8px", background: i===0?"#1d1d1f":"#fff", borderRadius: 100, fontSize: 9, color: i===0?"#fff":"#1d1d1f", border: "1px solid #d2d2d7" }}>{f}</div>
                    ))}
                  </div>
                </div>
                {[
                  { price: "R$1.640", time: "12:00–7:30+1", stops: "2 paradas · 19h30m", badge: "Mais barato", c: "#34c759" },
                  { price: "R$2.005", time: "4:05–21:15", stops: "1 parada · 17h10m", badge: "Mais grande", c: "#ff9500" },
                  { price: "R$2.307", time: "11:05–2:00+1", stops: "Voo direto", badge: "Voo direto", c: "#0071e3" },
                ].map((f,i) => (
                  <div key={i} style={{ margin: "8px 0", padding: "10px", background: "#fff", borderRadius: 10, boxShadow: "0 1px 6px rgba(0,0,0,.06)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "inline-block", padding: "2px 5px", background: f.c, borderRadius: 4, fontSize: 8, color: "#fff", fontWeight: 600, marginBottom: 4 }}>{f.badge}</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>{f.time}</div>
                        <div style={{ fontSize: 9, color: "#6e6e73" }}>{f.stops}</div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{f.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            } />
          </ScrollReveal>
        </div>
      </section>

      {/* ── CHALLENGE — off white ── */}
      <section className="section-off-white" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ marginBottom: "1rem" }}>01 — Challenge</p>
            <h2 className="t-section-title" style={{ marginBottom: "2rem", maxWidth: 700 }}>
              The problem was deeper than performance.
            </h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <ScrollReveal>
              <p className="t-body" style={{ marginBottom: "2rem" }}>
                The app had a 2.0 ★ rating. Crashes, slow loading, broken flows. The entire booking experience ran on a webview. The mobile team was treated as a backup to the website.
              </p>
              <div style={{ borderTop: "1px solid #d2d2d7", paddingTop: "2rem" }}>
                <div style={{ fontSize: "clamp(4rem,8vw,7rem)", fontWeight: 700, letterSpacing: "-.05em", color: "#ff3b30", lineHeight: 1 }}>2.0★</div>
                <p style={{ fontSize: ".85rem", color: "#6e6e73", marginTop: ".5rem" }}>Starting app store rating</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#d2d2d7" }}>
                {[
                  { t: "Webview booking", d: "Entire flow in a webview — no native performance" },
                  { t: "Combined flights", d: "Outbound + return in one card — too complex to decide" },
                  { t: "Fragmented search", d: "Users navigated back 4+ times to change selections" },
                  { t: "No native features", d: "No GPS, notifications, or fluid interactions" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "1.5rem", background: "#f5f5f7" }}>
                    <p style={{ fontWeight: 600, fontSize: ".9rem", color: "#1d1d1f", marginBottom: ".4rem" }}>{item.t}</p>
                    <p style={{ fontSize: ".82rem", color: "#6e6e73" }}>{item.d}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── DISCOVERY — white ── */}
      <section className="section-white" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ marginBottom: "1rem" }}>02 — Discovery</p>
            <h2 className="t-section-title" style={{ marginBottom: "1.25rem", maxWidth: 600 }}>
              Benchmarked the best.<br />Found the pattern.
            </h2>
            <p className="t-body" style={{ maxWidth: 540, marginBottom: "4rem" }}>
              I analyzed Hopper, Skyscanner, Kayak, AvisaSales, and Decolar. Every top app did three things CVC wasn't.
            </p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#d2d2d7" }}>
            {[
              { n: "01", t: "Single guided flow", d: "No back-and-forth. One direction only." },
              { n: "02", t: "One flight at a time", d: "Separate outbound from return. Simpler decisions." },
              { n: "03", t: "Fully native", d: "No webview. Real performance. Real interactions." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ padding: "2.5rem", background: "#fff" }}>
                  <div style={{ fontSize: ".7rem", fontWeight: 600, color: "#0071e3", marginBottom: "1rem", letterSpacing: ".1em" }}>{item.n}</div>
                  <p style={{ fontWeight: 600, fontSize: "1rem", color: "#1d1d1f", marginBottom: ".75rem" }}>{item.t}</p>
                  <p style={{ fontSize: ".85rem", color: "#6e6e73" }}>{item.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal style={{ marginTop: "1px" }}>
            <div style={{ padding: "2rem", background: "#f5f5f7", borderTop: "3px solid #0071e3" }}>
              <p style={{ fontWeight: 600, color: "#1d1d1f", fontSize: ".95rem" }}>CVC was doing the opposite on all three.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SOLUTION — black ── */}
      <section className="section-black" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1rem" }}>03 — Solution</p>
            <h2 className="t-section-title" style={{ color: "#f5f5f7", marginBottom: "1.5rem" }}>
              One key decision changed everything.
            </h2>
            <p className="t-body-white" style={{ marginBottom: "2.5rem" }}>
              Split outbound and return into sequential screens. A loading animation cross-sold hotels. Linear 3-step search. Confirmation before checkout — not inside it.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {[
                "Loading animation → cross-sell hotels",
                "Flight results (outbound only)",
                "Flight results (return only)",
                "Upselling → Flight details → Checkout",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#0071e3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".65rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontSize: ".88rem", color: "rgba(245,245,247,.8)" }}>{step}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100} type="scale">
            <PhoneMockup screen={
              <div style={{ padding: "0 12px", height: "100%", background: "#fff" }}>
                <div style={{ textAlign: "center", padding: "20px 0 16px" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f5e642", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, color: "#000" }}>CVC</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1d1d1f" }}>Confirmar voo</div>
                  <div style={{ fontSize: 10, color: "#6e6e73" }}>São Paulo → Dubai</div>
                </div>
                <div style={{ background: "#f5f5f7", borderRadius: 12, padding: "12px" }}>
                  {["São Paulo · GRU", "Frankfurt · FRA", "Dubai · DXB"].map((city, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: i < 2 ? "1px solid #e5e5e5" : "none" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? "#34c759" : i === 1 ? "#ff9500" : "#0071e3" }} />
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: "#1d1d1f" }}>{city}</div>
                        <div style={{ fontSize: 9, color: "#6e6e73" }}>{["16 Abr · 12:00", "16 Abr · 23:30", "17 Abr · 7:30"][i]}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, padding: "12px", background: "#f5e642", borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#000" }}>Confirmar · R$1.640</div>
                </div>
              </div>
            } />
          </ScrollReveal>
        </div>
      </section>

      {/* ── IMPACT — white ── */}
      <section className="section-white" style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ marginBottom: "1rem" }}>04 — Impact</p>
            <h2 className="t-section-title" style={{ marginBottom: "5rem" }}>Numbers that speak<br />for themselves.</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#d2d2d7", marginBottom: "1px" }}>
            {[
              { v: "6.4%\n→ 20%", l: "Conversion Rate", c: "#1d1d1f" },
              { v: "2.0 → 4.6★", l: "App Store Rating", c: "#1d1d1f" },
              { v: "+23%", l: "Cross-sell Revenue", c: "#1d1d1f" },
            ].map((r, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{ padding: "3rem 2rem", background: "#fff" }}>
                  <div style={{ fontWeight: 700, fontSize: "clamp(2rem,4vw,4rem)", letterSpacing: "-.04em", color: r.c, lineHeight: 1.1, whiteSpace: "pre-line" }}>{r.v}</div>
                  <p style={{ fontSize: ".82rem", color: "#6e6e73", marginTop: "1rem" }}>{r.l}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nav footer */}
      <section className="section-off-white" style={{ padding: "3rem 2rem", borderTop: "1px solid #d2d2d7" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <Link href="/" className="btn-blue-ghost">← Back to Home</Link>
          <Link href="/contact" className="btn-blue">Let's talk →</Link>
        </div>
      </section>
    </main>
  );
}
