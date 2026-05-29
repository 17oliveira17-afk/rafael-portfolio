"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./components/ScrollReveal";

/* ── Phone SVG mockup ─────────────────── */
function PhoneMockup({ screen, style }: { screen: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: 260, ...style }}>
      <div className="phone-frame" style={{ aspectRatio: "9/19.5", position: "relative" }}>
        <div className="phone-notch" />
        <div style={{ position: "absolute", inset: 0, background: "#fff", borderRadius: 44, overflow: "hidden", padding: "40px 0 0" }}>
          {screen}
        </div>
        {/* Side buttons */}
        <div style={{ position: "absolute", left: -3, top: 80, width: 3, height: 30, background: "#333", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: -3, top: 120, width: 3, height: 50, background: "#333", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: -3, top: 180, width: 3, height: 50, background: "#333", borderRadius: 2 }} />
        <div style={{ position: "absolute", right: -3, top: 130, width: 3, height: 70, background: "#333", borderRadius: 2 }} />
      </div>
    </div>
  );
}

/* ── Laptop SVG mockup ────────────────── */
function LaptopMockup({ screen }: { screen: React.ReactNode }) {
  return (
    <div style={{ width: "100%", maxWidth: 720 }}>
      <div className="laptop-frame" style={{ paddingBottom: 0 }}>
        <div className="laptop-notch" />
        <div className="laptop-screen" style={{ aspectRatio: "16/10" }}>
          {screen}
        </div>
      </div>
      <div className="laptop-base" />
    </div>
  );
}

/* ── Counter ───────────────────────────── */
function Counter({ n, suffix = "+" }: { n: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 1800; const s = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - s) / dur, 1);
          setV(Math.round((1 - Math.pow(1 - p, 3)) * n));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [n]);
  return <div ref={ref}>{v}{suffix}</div>;
}

/* ── Scroll-driven device scale ─────── */
function ScrollDevice() {
  const ref = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const total = ref.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProg(Math.max(0, Math.min(1, scrolled / total)));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scale = 0.55 + prog * 0.45;
  const opacity = 0.4 + prog * 0.6;
  const yOffset = 60 - prog * 60;

  return (
    <div ref={ref} style={{ height: "250vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Text left */}
        <div style={{
          position: "absolute", left: "8%", top: "50%",
          transform: `translateY(calc(-50% + ${yOffset}px))`,
          opacity: prog < .5 ? 1 - prog * 1.5 : 0,
          transition: "none", maxWidth: 340, zIndex: 2,
        }}>
          <p className="t-eyebrow" style={{ marginBottom: "1rem" }}>CVC Corp · Case Study</p>
          <h2 className="t-section-title" style={{ fontSize: "clamp(1.8rem,3.5vw,3.2rem)", marginBottom: "1.25rem" }}>
            Flight Booking<br />Redesign
          </h2>
          <p className="t-body" style={{ marginBottom: "2rem" }}>
            Turned a 2.0★ webview app into a native experience. Tripled conversion rate.
          </p>
          <Link href="/work/cvc" className="btn-blue">See the case →</Link>
        </div>

        {/* Phone center */}
        <div style={{
          transform: `scale(${scale}) translateY(${20 - prog * 20}px)`,
          opacity,
          transition: "none",
          zIndex: 1,
          filter: `drop-shadow(0 ${40 + prog * 40}px ${80 + prog * 40}px rgba(0,0,0,${0.1 + prog * 0.15}))`,
        }}>
          <PhoneMockup screen={
            <div style={{ padding: "0 12px", height: "100%", background: "linear-gradient(180deg, #f5f5f7 0%, #fff 100%)" }}>
              {/* App UI mockup */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 0 16px", borderBottom: "1px solid #eee" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f5e642", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#000" }}>CVC</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#1d1d1f" }}>São Paulo → Dubai</div>
                  <div style={{ fontSize: 9, color: "#6e6e73" }}>16 Abr · 2 passageiros</div>
                </div>
              </div>
              {/* Flight cards */}
              {[
                { price: "R$1.640", time: "12:00–7:30", stops: "2 paradas", badge: "Mais barato", badgeColor: "#34c759" },
                { price: "R$2.005", time: "4:05–21:15", stops: "1 parada", badge: "Mais grande", badgeColor: "#ff9500" },
                { price: "R$2.307", time: "11:05–2:00", stops: "Voo direto", badge: "Voo direto", badgeColor: "#0071e3" },
              ].map((f, i) => (
                <div key={i} style={{ margin: "10px 0", padding: "10px", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,.06)", border: "1px solid #f0f0f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "inline-block", padding: "2px 6px", background: f.badgeColor, borderRadius: 4, fontSize: 8, fontWeight: 600, color: "#fff", marginBottom: 5 }}>{f.badge}</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#1d1d1f" }}>{f.time}</div>
                      <div style={{ fontSize: 9, color: "#6e6e73" }}>{f.stops}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1d1d1f" }}>{f.price}</div>
                  </div>
                </div>
              ))}
            </div>
          } />
        </div>

        {/* Stats right */}
        <div style={{
          position: "absolute", right: "8%", top: "50%",
          transform: `translateY(calc(-50% + ${yOffset}px))`,
          opacity: prog > .4 ? (prog - .4) * 2 : 0,
          transition: "none", zIndex: 2,
        }}>
          {[
            { v: "20%", l: "Conversion", sub: "was 6.4%" },
            { v: "4.6★", l: "App Rating", sub: "was 2.0★" },
            { v: "+23%", l: "Cross-sell", sub: "revenue" },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: "2rem", borderTop: "1px solid #d2d2d7", paddingTop: "1.25rem" }}>
              <div style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, letterSpacing: "-.04em", color: "#1d1d1f", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#1d1d1f", marginTop: ".3rem" }}>{s.l}</div>
              <div style={{ fontSize: ".72rem", color: "#6e6e73" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero parallax
  useEffect(() => {
    const fn = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * 0.3}px)`;
      heroRef.current.style.opacity = String(Math.max(0, 1 - y / 500));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Stagger hero lines
  useEffect(() => {
    document.querySelectorAll(".hero-line").forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "translateY(0)";
      }, 300 + i * 180);
    });
  }, []);

  return (
    <main className="page-in">

      {/* ══════ HERO — black ══════ */}
      <section className="section-black" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "8rem 2rem 6rem", position: "relative", overflow: "hidden" }}>

        {/* Subtle gradient */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,113,227,.12) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div ref={heroRef} style={{ position: "relative", zIndex: 1, maxWidth: 900, transition: "transform .1s linear, opacity .1s linear" }}>
          <p className="hero-line t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem", opacity: 0, transform: "translateY(20px)", transition: "opacity .6s ease, transform .6s ease" }}>
            Product Design Lead · Fintech & B2B
          </p>
          <h1 className="hero-line t-hero-white" style={{ marginBottom: "1.5rem", opacity: 0, transform: "translateY(40px)", transition: "opacity .8s ease, transform .8s ease" }}>
            Designing experiences<br />that drive results.
          </h1>
          <p className="hero-line t-body-white" style={{ maxWidth: 520, margin: "0 auto 2.5rem", opacity: 0, transform: "translateY(30px)", transition: "opacity .7s ease, transform .7s ease" }}>
            8+ years turning complex fintech and B2B systems into clear, conversion-driven experiences.
          </p>
          <div className="hero-line" style={{ display: "flex", gap: "1rem", justifyContent: "center", opacity: 0, transform: "translateY(20px)", transition: "opacity .7s ease, transform .7s ease" }}>
            <Link href="/#work" className="btn-blue">View Work</Link>
            <Link href="/about" className="btn-white-ghost">About me</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem" }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,.3))" }} />
        </div>
      </section>

      {/* ══════ STATEMENT — white ══════ */}
      <section className="section-white" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ marginBottom: "1.5rem" }}>What I do</p>
            <h2 className="t-section-title" style={{ color: "#1d1d1f", marginBottom: "1.5rem" }}>
              I turn complex systems into experiences that drive conversion, activation, and retention.
            </h2>
            <p className="t-body" style={{ maxWidth: 540, fontSize: "1.1rem" }}>
              Currently at Thoughtworks Brasil, designing a B2B credit origination platform. Previously at Rappi and CVC Corp.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════ TICKER ══════ */}
      <div style={{ background: "#f5f5f7", padding: ".85rem 0", overflow: "hidden", borderTop: "1px solid #d2d2d7", borderBottom: "1px solid #d2d2d7" }}>
        <div className="ticker-track" style={{ gap: "5rem" }}>
          {["Thoughtworks", "Rappi", "CVC Corp", "MiBanco", "Fintech", "B2B", "Product Design", "Growth", "Mobile", "Thoughtworks", "Rappi", "CVC Corp", "MiBanco", "Fintech", "B2B", "Product Design", "Growth", "Mobile"].map((t, i) => (
            <span key={i} style={{  fontSize: ".7rem", fontWeight: 400, color: "#6e6e73", flexShrink: 0, letterSpacing: ".05em" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ══════ STATS — off-white ══════ */}
      <section className="section-off-white" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ marginBottom: "5rem", textAlign: "center" }}>By the numbers</p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "#d2d2d7" }}>
            {[
              { n: 14, l: "Years in digital design" },
              { n: 8, l: "Years in product design" },
              { n: 7, l: "Years in global teams" },
              { n: 12, l: "Countries served" },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ background: "#f5f5f7", padding: "3rem 2.5rem" }}>
                  <div className="t-num-giant" style={{ color: "#1d1d1f", marginBottom: "1rem" }}>
                    <Counter n={s.n} />
                  </div>
                  <p style={{ fontSize: ".85rem", color: "#6e6e73", lineHeight: 1.4 }}>{s.l}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CASE CVC — scroll driven ══════ */}
      <section id="work" className="section-white" style={{ paddingTop: "6rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 2rem 4rem" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ marginBottom: "1rem" }}>Selected Work</p>
            <h2 className="t-section-title" style={{ marginBottom: ".5rem" }}>Case Studies</h2>
            <p className="t-body" style={{ marginBottom: "4rem" }}>Real projects. Real results.</p>
          </ScrollReveal>
        </div>
        <ScrollDevice />
      </section>

      {/* ══════ ABOUT TEASER — black ══════ */}
      <section className="section-black" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>About</p>
            <h2 className="t-section-title" style={{ color: "#f5f5f7", marginBottom: "1.5rem" }}>
              Brazilian designer.<br />Working globally.
            </h2>
            <p className="t-body-white" style={{ marginBottom: "2.5rem" }}>
              14+ years in digital design. I lead design for fintech and growth products, turning complex financial systems into clear, conversion-driven experiences.
            </p>
            <Link href="/about" className="btn-blue">Full story →</Link>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,.1)" }}>
              {[
                { l: "Design Systems", s: "Scalable, token-based" },
                { l: "User Research", s: "Tests & interviews" },
                { l: "Prototyping", s: "Figma, high-fidelity" },
                { l: "Fintech", s: "8+ years deep" },
                { l: "B2B Platforms", s: "Credit, payments" },
                { l: "AI First", s: "Thoughtworks pillar" },
              ].map((sk, i) => (
                <div key={i} style={{ padding: "2rem 1.5rem", background: "#1d1d1f" }}>
                  <p style={{ fontWeight: 600, fontSize: ".9rem", color: "#f5f5f7", marginBottom: ".4rem" }}>{sk.l}</p>
                  <p style={{ fontSize: ".78rem", color: "#6e6e73" }}>{sk.s}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════ CTA — white ══════ */}
      <section className="section-white" style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <ScrollReveal>
          <p className="t-eyebrow" style={{ marginBottom: "1.5rem" }}>Open to opportunities</p>
          <h2 className="t-section-title" style={{ marginBottom: "1rem", maxWidth: 600, margin: "0 auto 1rem" }}>
            Let's build something great together.
          </h2>
          <p className="t-body" style={{ maxWidth: 440, margin: "0 auto 2.5rem" }}>
            Open to Product Design Lead roles in fintech and B2B. Pursuing opportunities in Canada.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/contact" className="btn-blue">Get in touch</Link>
            <Link href="/work/cvc" className="btn-blue-ghost">See my work</Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer style={{ background: "#f5f5f7", borderTop: "1px solid #d2d2d7", padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "100%" }}>
        <p style={{ fontSize: ".72rem", color: "#6e6e73" }}>Copyright © 2025 Rafael Guimarães. All rights reserved.</p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[{ l: "LinkedIn", h: "https://linkedin.com/in/rafaelgdesign" }, { l: "Email", h: "mailto:rafael@rafaelgdesign.com" }].map(lk => (
            <a key={lk.l} href={lk.h} target="_blank" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>{lk.l}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}
