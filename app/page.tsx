"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./components/ScrollReveal";

function useCounter(target: number, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const dur = 1800; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target]);
  return val;
}

function StatCounter({ n, label, suffix = "+" }: { n: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  const val = useCounter(n, go);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.unobserve(e.target); } }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="stat-block">
      <div className="t-num grad-green">{val}{suffix}</div>
      <p className="t-label" style={{ marginTop: "1rem" }}>{label}</p>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Hero parallax fade on scroll
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.opacity = String(Math.max(0, 1 - y / 400));
      heroRef.current.style.transform = `translateY(${y * 0.25}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stagger hero lines in
  useEffect(() => {
    document.querySelectorAll(".hero-in").forEach((el, i) => {
      setTimeout(() => { (el as HTMLElement).style.opacity = "1"; (el as HTMLElement).style.transform = "translateY(0)"; }, 200 + i * 150);
    });
  }, []);

  return (
    <main className="page-in">

      {/* ══════ HERO — full black ══════ */}
      <section className="section-dark" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 2.5rem 6rem", position: "relative", overflow: "hidden" }}>

        {/* Subtle gradient bg */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 60% 20%, rgba(74,250,138,.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div ref={heroRef} style={{ position: "relative", zIndex: 1, maxWidth: 1200, transition: "opacity .1s ease" }}>
          <p className="t-label hero-in" style={{ marginBottom: "2rem", opacity: 0, transform: "translateY(20px)", transition: "opacity .7s ease, transform .7s ease" }}>
            Product Design Lead · Fintech & B2B
          </p>
          <h1 className="t-hero hero-in" style={{ opacity: 0, transform: "translateY(50px)", transition: "opacity .9s ease, transform .9s ease", marginBottom: "3.5rem" }}>
            Designing<br />
            complex<br />
            <span className="grad-green">systems.</span>
          </h1>
          <div className="hero-in" style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity .8s ease, transform .8s ease", display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link href="/#work" className="btn-white">View Work</Link>
            <Link href="/about" className="btn-outline">About me</Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem" }}>
          <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,.3))" }} />
          <p className="t-label" style={{ fontSize: ".6rem" }}>Scroll</p>
        </div>
      </section>

      {/* ══════ STATEMENT 1 — dark ══════ */}
      <section className="section-dark" style={{ padding: "12rem 2.5rem", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <ScrollReveal>
          <div style={{ maxWidth: 900 }}>
            <p className="t-label" style={{ marginBottom: "2rem" }}>What I do</p>
            <h2 className="t-statement">
              I turn complex systems into experiences that drive{" "}
              <span className="grad-green">conversion, activation,</span>{" "}
              and retention.
            </h2>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════ TICKER ══════ */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", borderBottom: "1px solid rgba(255,255,255,.07)", padding: "1rem 0", overflow: "hidden" }}>
        <div className="ticker-inner" style={{ display: "flex", gap: "4rem" }}>
          {["Thoughtworks", "Rappi", "CVC Corp", "MiBanco", "Home Collection", "Fintech", "B2B", "Growth", "Mobile", "Thoughtworks", "Rappi", "CVC Corp", "MiBanco", "Home Collection", "Fintech", "B2B", "Growth", "Mobile"].map((t, i) => (
            <span key={i} className="t-label" style={{ flexShrink: 0 }}>{t} <span style={{ color: "var(--accent)", marginLeft: "1rem" }}>×</span></span>
          ))}
        </div>
      </div>

      {/* ══════ STATS — dark ══════ */}
      <section className="section-dark" style={{ padding: "10rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-label" style={{ marginBottom: "5rem" }}>By the numbers</p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "3rem" }}>
            {[
              { n: 14, l: "Years in Digital Design" },
              { n: 8, l: "Years in Product Design" },
              { n: 7, l: "Years in Global Teams" },
              { n: 12, l: "Countries Served" },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <StatCounter n={s.n} label={s.l} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ WORK — dark ══════ */}
      <section id="work" className="section-dark" style={{ padding: "4rem 2.5rem 10rem", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "5rem" }}>
              <div>
                <p className="t-label" style={{ marginBottom: "1.25rem" }}>Selected Work</p>
                <h2 className="t-statement" style={{ fontSize: "clamp(2rem,5vw,5rem)" }}>Case Studies</h2>
              </div>
              <Link href="/work/cvc" className="btn-outline" style={{ fontSize: ".75rem" }}>See case →</Link>
            </div>
          </ScrollReveal>

          {/* CVC Card — Apple product card style */}
          <ScrollReveal>
            <Link href="/work/cvc" style={{ textDecoration: "none", display: "block" }} data-cur>
              <div style={{
                background: "#111", borderRadius: 24,
                overflow: "hidden", position: "relative",
                border: "1px solid rgba(255,255,255,.07)",
                transition: "transform .4s cubic-bezier(.16,1,.3,1), border-color .3s ease",
                cursor: "none",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.01)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.15)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.07)";
              }}>
                {/* Yellow top bar */}
                <div style={{ height: 4, background: "linear-gradient(90deg, #f5e642, #ffd60a)" }} />

                <div style={{ padding: "4rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                        <div style={{ width: 40, height: 40, background: "#f5e642", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 900, color: "#000" }}>CVC</div>
                        <p className="t-label">Case Study · 01</p>
                      </div>
                      <h3 className="t-headline" style={{ marginBottom: "1.25rem", maxWidth: 500 }}>
                        Flight Booking Redesign
                      </h3>
                      <p className="t-sub" style={{ maxWidth: 420, marginBottom: "2.5rem" }}>
                        Turned a 2.0 ★ webview app into a native 4.6 ★ experience. Tripled conversion. Grew cross-sell revenue by 23%.
                      </p>
                      <div style={{ display: "flex", gap: ".6rem" }}>
                        {["B2C", "Mobile App", "Solo Designer"].map(t => (
                          <span key={t} className="t-label" style={{ padding: ".3rem .75rem", border: "1px solid rgba(255,255,255,.12)", borderRadius: 100, fontSize: ".6rem" }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Impact numbers */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", textAlign: "right", flexShrink: 0, paddingLeft: "4rem" }}>
                      {[
                        { v: "20%", l: "Conversion (from 6.4%)" },
                        { v: "4.6★", l: "App Rating (from 2.0)" },
                        { v: "+23%", l: "Cross-sell Revenue" },
                      ].map((r, i) => (
                        <div key={i} className="stat-block" style={{ borderColor: "rgba(255,255,255,.1)" }}>
                          <div style={{ fontWeight: 700, fontSize: "clamp(2rem,3.5vw,3.2rem)", letterSpacing: "-.04em", color: "#f5e642", lineHeight: 1 }}>{r.v}</div>
                          <p className="t-label" style={{ marginTop: ".5rem", fontSize: ".6rem" }}>{r.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "flex-end" }}>
                    <span style={{ color: "rgba(255,255,255,.4)", fontSize: ".85rem", fontWeight: 500 }}>Read full case study →</span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Coming soon */}
          <ScrollReveal delay={100} style={{ marginTop: "1.5rem" }}>
            <div style={{ padding: "3rem 4rem", background: "#0a0a0a", borderRadius: 24, border: "1px dashed rgba(255,255,255,.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p className="t-label" style={{ marginBottom: ".75rem" }}>Coming soon</p>
                <h3 className="t-headline" style={{ fontSize: "clamp(1.2rem,2vw,2rem)", color: "rgba(255,255,255,.25)" }}>MiBanco · Rappi · and more</h3>
              </div>
              <p className="t-label" style={{ fontSize: ".6rem" }}>In progress</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════ STATEMENT 2 — LIGHT ══════ */}
      <section className="section-light" style={{ padding: "12rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-label" style={{ marginBottom: "2rem" }}>About</p>
            <h2 className="t-statement" style={{ color: "#000", marginBottom: "3rem" }}>
              Brazilian Product Designer.<br />Working globally.
            </h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <ScrollReveal>
              <p style={{ fontSize: "clamp(1rem,1.5vw,1.25rem)", lineHeight: 1.7, color: "#444", fontWeight: 300, marginBottom: "2.5rem" }}>
                Currently at <strong style={{ color: "#000", fontWeight: 600 }}>Thoughtworks Brasil</strong>, designing URPI PRO — a B2B credit origination platform for MiBanco. 8+ years turning complex financial systems into clear, conversion-driven experiences.
              </p>
              <Link href="/about" className="btn-black">Full story →</Link>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                {[
                  { label: "Design Systems", sub: "Scalable, token-based" },
                  { label: "User Research", sub: "Tests & interviews" },
                  { label: "Prototyping", sub: "Figma, high-fidelity" },
                  { label: "Cross-functional", sub: "Eng, PM, stakeholders" },
                  { label: "Fintech", sub: "8+ years" },
                  { label: "AI First", sub: "Thoughtworks pillar" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "1.5rem", background: "#f0f0f2", borderRadius: 16 }}>
                    <p style={{ fontWeight: 600, fontSize: ".9rem", color: "#000", marginBottom: ".3rem" }}>{s.label}</p>
                    <p className="t-label" style={{ fontSize: ".6rem" }}>{s.sub}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════ CTA — dark ══════ */}
      <section className="section-dark" style={{ padding: "12rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(74,250,138,.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <ScrollReveal style={{ position: "relative", zIndex: 1 }}>
          <p className="t-label" style={{ marginBottom: "2rem" }}>Open to opportunities</p>
          <h2 className="t-statement" style={{ marginBottom: "1.5rem" }}>
            Got a project<span className="grad-green">?</span>
          </h2>
          <p className="t-sub" style={{ maxWidth: 420, margin: "0 auto 3rem" }}>
            Open to Product Design Lead roles in fintech and B2B. Currently pursuing opportunities in Canada.
          </p>
          <Link href="/contact" className="btn-white">Let's talk →</Link>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer style={{ padding: "2rem 2.5rem", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="t-label" style={{ fontSize: ".6rem" }}>© 2025 Rafael Guimarães</span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[{ l: "LinkedIn", h: "https://linkedin.com/in/rafaelgdesign" }, { l: "Email", h: "mailto:rafael@rafaelgdesign.com" }].map(lk => (
            <a key={lk.l} href={lk.h} target="_blank" className="t-label" style={{ textDecoration: "none", fontSize: ".6rem", transition: "color .2s ease" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--accent)"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--gray)"}
            >{lk.l}</a>
          ))}
        </div>
      </footer>

    </main>
  );
}
