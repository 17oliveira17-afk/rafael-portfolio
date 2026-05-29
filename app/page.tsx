"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./components/ScrollReveal";

/* ── Counter ── */
function Counter({ n, suffix = "+" }: { n: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 2000; const s = performance.now();
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

/* ── Scroll-driven device showcase ── */
function DeviceShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const total = ref.current.offsetHeight - window.innerHeight;
      setProg(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scale = .5 + prog * .5;
  const rotate = 8 - prog * 8;
  const opacity = .3 + prog * .7;

  return (
    <div ref={ref} style={{ height: "300vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#000" }}>
        {/* Gradient bg */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,113,227,${0.05 + prog * 0.1}) 0%, transparent 60%)`, pointerEvents: "none" }} />

        {/* Text overlay — fades out */}
        <div style={{
          position: "absolute", top: "12%", left: 0, right: 0, textAlign: "center", zIndex: 3,
          opacity: Math.max(0, 1 - prog * 3),
          transform: `translateY(${prog * -40}px)`,
        }}>
          <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".75rem" }}>Case Study</p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,4rem)", fontWeight: 700, letterSpacing: "-.03em", color: "#f5f5f7", lineHeight: 1.05 }}>
            CVC Flight Booking<br />Redesign
          </h2>
        </div>

        {/* Phone mockup — scales up */}
        <div style={{
          transform: `scale(${scale}) perspective(1200px) rotateY(${rotate}deg)`,
          opacity,
          transition: "none",
          filter: `drop-shadow(0 ${30 + prog * 60}px ${60 + prog * 60}px rgba(0,0,0,${.3 + prog * .2}))`,
          zIndex: 2,
        }}>
          <div style={{
            width: 320, background: "#1d1d1f", borderRadius: 52,
            padding: "14px", position: "relative",
            border: "1px solid rgba(255,255,255,.15)",
          }}>
            {/* Notch */}
            <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 100, height: 28, background: "#1d1d1f", borderRadius: "0 0 18px 18px", zIndex: 3 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2a2a2e", position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)" }} />
            </div>
            {/* Screen */}
            <div style={{ borderRadius: 40, overflow: "hidden", background: "#fff", aspectRatio: "9/19.5" }}>
              <div style={{ paddingTop: 40, padding: "40px 16px 16px", height: "100%", background: "linear-gradient(180deg, #fafafa 0%, #fff 30%)" }}>
                {/* Status bar */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px 12px", fontSize: 10, fontWeight: 600, color: "#1d1d1f" }}>
                  <span>9:41</span>
                  <div style={{ display: "flex", gap: 3 }}>
                    <div style={{ width: 14, height: 10, border: "1.5px solid #1d1d1f", borderRadius: 2 }} />
                  </div>
                </div>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f5e642", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#000" }}>CVC</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1d1d1f" }}>São Paulo → Dubai</div>
                    <div style={{ fontSize: 10, color: "#86868b" }}>16 Abr · 2 passageiros</div>
                  </div>
                </div>
                {/* Filters */}
                <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "hidden" }}>
                  {["Filtros", "Econômico", "Sem paradas", "Direto"].map((f, i) => (
                    <div key={i} style={{ padding: "5px 10px", background: i === 0 ? "#1d1d1f" : "#f5f5f7", borderRadius: 100, fontSize: 10, fontWeight: 500, color: i === 0 ? "#fff" : "#1d1d1f", whiteSpace: "nowrap", flexShrink: 0 }}>{f}</div>
                  ))}
                </div>
                {/* Cards */}
                {[
                  { price: "R$1.640", time: "12:00 – 7:30+1", stops: "2 paradas · 19h 30m", airline: "GOL", badge: "Mais barato", c: "#34c759" },
                  { price: "R$2.005", time: "4:05 – 21:15", stops: "1 parada · 17h 10m", airline: "Azul", badge: "Mala grande", c: "#ff9500" },
                  { price: "R$2.307", time: "11:05 – 2:00+1", stops: "Voo direto · 14h 55m", airline: "LATAM", badge: "Voo direto", c: "#0071e3" },
                ].map((f, i) => (
                  <div key={i} style={{ margin: "0 0 8px", padding: "12px", background: "#fff", borderRadius: 14, boxShadow: "0 1px 4px rgba(0,0,0,.06), 0 0 0 1px rgba(0,0,0,.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ display: "inline-block", padding: "2px 7px", background: f.c, borderRadius: 5, fontSize: 9, fontWeight: 600, color: "#fff", marginBottom: 5 }}>{f.badge}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#1d1d1f" }}>{f.time}</div>
                        <div style={{ fontSize: 10, color: "#86868b", marginTop: 2 }}>{f.stops}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1d1d1f" }}>{f.price}</div>
                        <div style={{ fontSize: 9, color: "#86868b", marginTop: 2 }}>{f.airline}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats — fade in late */}
        <div style={{
          position: "absolute", bottom: "8%", left: 0, right: 0,
          display: "flex", justifyContent: "center", gap: "5rem",
          opacity: Math.max(0, (prog - .6) * 2.5),
          transform: `translateY(${Math.max(0, (1 - prog) * 30)}px)`,
          zIndex: 3,
        }}>
          {[
            { v: "6.4% → 20%", l: "Conversion" },
            { v: "2.0 → 4.6★", l: "App Rating" },
            { v: "+23%", l: "Cross-sell" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(1.2rem,2.5vw,2rem)", fontWeight: 700, letterSpacing: "-.03em", color: "#f5f5f7", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.5)", marginTop: ".4rem", letterSpacing: ".06em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* CTA — fade in last */}
        <div style={{
          position: "absolute", bottom: "3%", left: "50%", transform: "translateX(-50%)",
          opacity: Math.max(0, (prog - .8) * 5), zIndex: 4,
        }}>
          <Link href="/work/cvc" className="btn-blue">See full case study →</Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * .35}px)`;
      heroRef.current.style.opacity = String(Math.max(0, 1 - y / 500));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.querySelectorAll(".hero-line").forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "translateY(0)";
      }, 400 + i * 200);
    });
  }, []);

  return (
    <main className="page-in">

      {/* ══════ HERO ══════ */}
      <section className="section-black" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "10rem 2rem 8rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,113,227,.15) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div ref={heroRef} style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <p className="hero-line t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem", opacity: 0, transform: "translateY(20px)", transition: "all .7s ease" }}>
            Product Design Lead
          </p>
          <h1 className="hero-line t-hero-white" style={{ marginBottom: "1.5rem", opacity: 0, transform: "translateY(40px)", transition: "all .9s ease" }}>
            Designing experiences<br />that drive results.
          </h1>
          <p className="hero-line t-body-white" style={{ maxWidth: 480, margin: "0 auto 2.5rem", opacity: 0, transform: "translateY(30px)", transition: "all .8s ease" }}>
            8+ years turning complex fintech and B2B systems into clear, conversion-driven experiences.
          </p>
          <div className="hero-line" style={{ display: "flex", gap: "1rem", justifyContent: "center", opacity: 0, transform: "translateY(20px)", transition: "all .7s ease" }}>
            <Link href="/#work" className="btn-blue" style={{ fontSize: ".95rem", padding: ".75rem 2rem" }}>View Work</Link>
            <Link href="/about" className="btn-white-ghost" style={{ fontSize: ".95rem", padding: ".75rem 2rem" }}>About me</Link>
          </div>
        </div>
      </section>

      {/* ══════ INTRO — white ══════ */}
      <section className="section-white" style={{ padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal>
            <h2 className="t-section-title" style={{ marginBottom: "1.5rem" }}>
              Complex systems.<br />Clear experiences.
            </h2>
            <p className="t-body" style={{ maxWidth: 540, margin: "0 auto", fontSize: "1.15rem" }}>
              I lead design for fintech and growth products, turning complex financial systems into experiences that drive conversion, activation, and retention.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════ STATS — off-white ══════ */}
      <section className="section-off-white" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "#d2d2d7", borderRadius: 20, overflow: "hidden" }}>
            {[
              { n: 14, l: "Years in\ndigital design" },
              { n: 8, l: "Years in\nproduct design" },
              { n: 7, l: "Years in\nglobal teams" },
              { n: 12, l: "Countries\nserved" },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ background: "#f5f5f7", padding: "3.5rem 2rem", textAlign: "center" }}>
                  <div className="t-num-giant" style={{ color: "#1d1d1f", marginBottom: ".75rem", fontSize: "clamp(3.5rem,8vw,7rem)" }}>
                    <Counter n={s.n} />
                  </div>
                  <p style={{ fontSize: ".82rem", color: "#86868b", whiteSpace: "pre-line", lineHeight: 1.4 }}>{s.l}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ DEVICE SHOWCASE — black (scroll driven) ══════ */}
      <section id="work">
        <DeviceShowcase />
      </section>

      {/* ══════ MORE WORK — off-white ══════ */}
      <section className="section-off-white" style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ padding: "3rem", background: "#fff", borderRadius: 20, border: "1px solid #d2d2d7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p className="t-eyebrow" style={{ marginBottom: ".75rem" }}>Coming soon</p>
                <h3 className="t-headline" style={{ color: "#86868b", fontSize: "clamp(1.2rem,2vw,1.8rem)" }}>MiBanco · Rappi · and more case studies</h3>
              </div>
              <p style={{ fontSize: ".8rem", color: "#86868b" }}>In progress</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════ ABOUT — black with photo ══════ */}
      <section className="section-black" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <ScrollReveal type="scale">
            <div style={{ borderRadius: 24, overflow: "hidden", position: "relative" }}>
              <img
                src="/rafael.jpg"
                alt="Rafael Guimarães"
                style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(0.2)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,.6) 100%)" }} />
              <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>Rafael Guimarães</p>
                <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.7)" }}>São Paulo, Brazil</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>About</p>
            <h2 className="t-section-title" style={{ color: "#f5f5f7", marginBottom: "1.5rem", fontSize: "clamp(1.8rem,3.5vw,3.2rem)" }}>
              Brazilian designer.<br />Working globally.
            </h2>
            <p className="t-body-white" style={{ marginBottom: "1rem" }}>
              Currently Product Design Lead at <span style={{ color: "#f5f5f7", fontWeight: 500 }}>Thoughtworks Brasil</span>, designing URPI PRO — a B2B credit origination platform for MiBanco.
            </p>
            <p className="t-body-white" style={{ marginBottom: "2.5rem" }}>
              Previously at Rappi (fintech/growth) and CVC Corp (travel). I love snowboarding, road trips, and building things that matter.
            </p>
            <Link href="/about" className="btn-blue">Full story →</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════ CTA — white ══════ */}
      <section className="section-white" style={{ padding: "10rem 2rem", textAlign: "center" }}>
        <ScrollReveal>
          <p className="t-eyebrow" style={{ marginBottom: "1.5rem" }}>Open to opportunities</p>
          <h2 className="t-section-title" style={{ maxWidth: 600, margin: "0 auto 1.5rem" }}>
            Let's build something great together.
          </h2>
          <p className="t-body" style={{ maxWidth: 420, margin: "0 auto 3rem" }}>
            Open to Product Design Lead roles in fintech and B2B. Pursuing opportunities in Canada.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/contact" className="btn-blue" style={{ fontSize: ".95rem", padding: ".75rem 2rem" }}>Get in touch</Link>
            <Link href="/work/cvc" className="btn-blue-ghost" style={{ fontSize: ".95rem", padding: ".75rem 2rem" }}>See my work</Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer style={{ background: "#f5f5f7", borderTop: "1px solid #d2d2d7", padding: "1.5rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: ".72rem", color: "#86868b" }}>Copyright © 2025 Rafael Guimarães. All rights reserved.</p>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="https://linkedin.com/in/rafaelgdesign" target="_blank" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>LinkedIn</a>
            <a href="mailto:rafael@rafaelgdesign.com" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
