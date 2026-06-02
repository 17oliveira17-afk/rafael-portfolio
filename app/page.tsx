"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./components/ScrollReveal";
import useIsMobile from "./components/useIsMobile";
import IPhone from "./components/IPhone";
import BigImageReveal from "./components/BigImageReveal";

/* ══════════════════════════════════════════════════════════
   Counter
   ══════════════════════════════════════════════════════════ */
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

/* Phone wraps the SVG IPhone mockup */
function Phone({ src, alt, w = 280, style = {} }: { src: string; alt: string; w?: number; style?: React.CSSProperties }) {
  return <IPhone src={src} alt={alt} width={w} style={style} />;
}

/* ══════════════════════════════════════════════════════════
   Scroll progress hook
   ══════════════════════════════════════════════════════════ */
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const total = ref.current.offsetHeight - window.innerHeight;
      setP(Math.max(0, Math.min(1, -r.top / total)));
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [ref]);
  return p;
}

/* ══════════════════════════════════════════════════════════
   CVC SHOWCASE
   Phase 0: headline centered
   Phase 1: phone rises + scales up from below
   Phase 2: phone lifts to top-center, 3 stats + CTA fade in below
   ══════════════════════════════════════════════════════════ */
function CVCShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref);
  const isMobile = useIsMobile();

  const ph0 = Math.min(1, p / 0.3);
  const ph1 = Math.max(0, Math.min(1, (p - 0.3) / 0.35));
  const ph2 = Math.max(0, Math.min(1, (p - 0.65) / 0.35));

  /* Mobile: simplified showcase, no sticky scroll */
  if (isMobile) {
    return (
      <section style={{ background: "#000", padding: "5rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 100% 60% at 50% 40%, rgba(0,113,227,.12) 0%, transparent 60%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".75rem" }}>
              Featured Case Study
            </p>
            <h2 style={{
              fontSize: "clamp(2rem,11vw,3rem)", fontWeight: 700, letterSpacing: "-.035em",
              color: "#f5f5f7", lineHeight: 1.03, marginBottom: "2.5rem",
            }}>
              From <em style={{ color: "#0071e3", fontStyle: "italic" }}>two stars</em><br />
              to category-defining.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem", filter: "drop-shadow(0 30px 60px rgba(0,113,227,.25)) drop-shadow(0 20px 40px rgba(0,0,0,.5))" }}>
              <Phone src="/screens-mobile/ip-resultado.png" alt="" w={240} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={250}>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              {[
                { v: "2 → 4.6★", l: "App rating" },
                { v: "+212%", l: "Conversion" },
                { v: "+23%", l: "Cross-sell" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center", minWidth: 90 }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", letterSpacing: "-.02em", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.5)", marginTop: ".35rem", letterSpacing: ".08em", textTransform: "uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <Link href="/work/cvc" className="btn-blue">
                See full case study →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // Phone: starts below+small, rises and grows in ph1, lifts in ph2
  const phoneScale = 0.3 + easeOut(ph0) * 0.4 + easeOut(ph1) * 0.35 - ph2 * 0.15;
  const phoneY     = 120 - easeOut(ph0) * 60 - easeOut(ph1) * 80 - ph2 * 100;

  // Stats stagger bottom
  const s0 = Math.max(0, Math.min(1, (ph2 - 0.0) / 0.4));
  const s1 = Math.max(0, Math.min(1, (ph2 - 0.2) / 0.4));
  const s2 = Math.max(0, Math.min(1, (ph2 - 0.4) / 0.4));
  const ct = Math.max(0, Math.min(1, (ph2 - 0.65) / 0.35));

  return (
    <div ref={ref} style={{ height: "380vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: "#000", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,113,227,${0.05 + ph1 * 0.12}) 0%, transparent 65%)`,
        }} />

        {/* Headline — fades out as phone grows */}
        <div style={{
          position: "absolute", top: "10%", left: 0, right: 0,
          textAlign: "center", zIndex: 5, pointerEvents: "none",
          opacity: Math.max(0, 1 - easeOut(ph1) * 2.5),
          transform: `translateY(${-easeOut(ph1) * 28}px)`,
        }}>
          <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1rem" }}>
            Featured Case Study
          </p>
          <h2 style={{ fontSize: "clamp(2.2rem,5vw,5rem)", fontWeight: 700, letterSpacing: "-.04em", color: "#fff", lineHeight: 1.04 }}>
            From <em style={{ color: "#0071e3", fontStyle: "italic" }}>two stars</em><br />to category-defining.
          </h2>
        </div>

        {/* Phone — rises and grows from below */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: `translate(-50%, calc(-50% + ${phoneY}px)) scale(${phoneScale})`,
          transformOrigin: "center bottom",
          zIndex: 3,
          filter: `drop-shadow(0 60px 100px rgba(0,113,227,${0.08 + ph1 * 0.2})) drop-shadow(0 30px 60px rgba(0,0,0,.7))`,
          willChange: "transform",
        }}>
          <Phone src="/screens-mobile/ip-resultado.png" alt="CVC flight booking" w={320} />
        </div>

        {/* Stats — centered bottom, staggered fade up */}
        <div style={{
          position: "absolute", bottom: "12%", left: 0, right: 0,
          display: "flex", justifyContent: "center",
          gap: "clamp(3rem, 8vw, 8rem)",
          zIndex: 5, padding: "0 2rem",
          pointerEvents: ph2 > 0.5 ? "auto" : "none",
        }}>
          {[
            { v: "2.0 → 4.6★", l: "App Store Rating",    op: s0 },
            { v: "+212%",       l: "Checkout Conversion",  op: s1 },
            { v: "+23%",        l: "Hotel Cross-sell",     op: s2 },
          ].map((s, i) => (
            <div key={i} style={{
              textAlign: "center",
              opacity: s.op,
              transform: `translateY(${(1 - s.op) * 24}px)`,
            }}>
              <div style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 700, letterSpacing: "-.04em", color: "#fff", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.45)", marginTop: ".75rem", letterSpacing: ".12em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          position: "absolute", bottom: "2%", left: "50%", transform: "translateX(-50%)",
          opacity: ct, zIndex: 6,
          pointerEvents: ct > 0.5 ? "auto" : "none",
        }}>
          <Link href="/work/cvc" className="btn-blue" style={{ padding: ".85rem 2.5rem", fontSize: ".95rem", whiteSpace: "nowrap" }}>
            See full case study →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════════ */
export default function Home() {
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return; // skip parallax on mobile (perf + visual)
    const fn = () => {
      const y = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${y * .25}px)`;
        heroRef.current.style.opacity = String(Math.max(0, 1 - y / 600));
      }
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${y * .4}px)`;
      }
      if (phonesRef.current) {
        phonesRef.current.style.transform = `translateY(${y * .15}px)`;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [isMobile]);

  return (
    <main className="page-in">

      {/* ══════════════════════════════════════════════════
          HERO — cinematic with floating phones
      ══════════════════════════════════════════════════ */}
      <section className="section-black" style={{
        height: "100svh", minHeight: 600, maxHeight: 1200, display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "clamp(5rem,10vh,9rem) 2rem clamp(4rem,8vh,6rem)",
      }}>
        {/* Background gradient layer */}
        <div ref={heroBgRef} style={{
          position: "absolute", inset: 0, willChange: "transform", pointerEvents: "none",
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,113,227,.18) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 20% 100%, rgba(0,113,227,.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 80% 100%, rgba(0,113,227,.08) 0%, transparent 50%)
          `,
        }} />

        {/* Colorful aurora glow — breaks the black, Apple-style */}
        <div className="aurora" style={{ opacity: 0.4, mixBlendMode: "screen" }} />

        {/* Grain */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.3, mixBlendMode: "overlay", pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")",
        }} />

        {/* Floating phones — background ambient (desktop only) */}
        {!isMobile && (
        <div ref={phonesRef} style={{
          position: "absolute", inset: 0, pointerEvents: "none", willChange: "transform",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Far left phone — subtle bg */}
          <div style={{
            position: "absolute", left: "-5%", top: "20%",
            opacity: 0.18, filter: "blur(3px)",
            transform: "rotate(-18deg) scale(0.9)",
          }}>
            <Phone src="/screens-mobile/ip-search.png" alt="" w={300} />
          </div>
          {/* Far right phone — subtle bg */}
          <div style={{
            position: "absolute", right: "-5%", top: "10%",
            opacity: 0.18, filter: "blur(3px)",
            transform: "rotate(18deg) scale(0.95)",
          }}>
            <Phone src="/screens-mobile/ip-filters.png" alt="" w={300} />
          </div>
          {/* Bottom left */}
          <div style={{
            position: "absolute", left: "8%", bottom: "-10%",
            opacity: 0.12, filter: "blur(4px)",
            transform: "rotate(-8deg)",
          }}>
            <Phone src="/screens-mobile/ip-calendar.png" alt="" w={240} />
          </div>
          {/* Bottom right */}
          <div style={{
            position: "absolute", right: "8%", bottom: "-10%",
            opacity: 0.12, filter: "blur(4px)",
            transform: "rotate(8deg)",
          }}>
            <Phone src="/screens-mobile/ip-confirma.png" alt="" w={240} />
          </div>
        </div>
        )}

        {/* MOBILE: single floating phone with depth */}
        {isMobile && (
          <div style={{
            position: "absolute", left: "50%", top: "60%",
            transform: "translateX(-50%)",
            opacity: 0.22, filter: "blur(2px)",
            pointerEvents: "none",
          }}>
            <Phone src="/screens-mobile/ip-resultado.png" alt="" w={300} />
          </div>
        )}

        {/* Hero content */}
        <div ref={heroRef} style={{ position: "relative", zIndex: 1, maxWidth: 920, textAlign: "center", willChange: "transform" }}>
          <p style={{
            fontSize: ".75rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase",
            color: "#0071e3", marginBottom: "2rem",
            opacity: 0, animation: "fadeUp .9s ease .3s forwards",
          }}>
            Product Design Lead · São Paulo → Globally
          </p>
          <h1 style={{
            fontSize: "clamp(2.8rem, 7.5vw, 7.5rem)", fontWeight: 700,
            letterSpacing: "-.035em", lineHeight: 0.95, color: "#fff",
            marginBottom: "2rem",
            opacity: 0, animation: "fadeUp 1.1s ease .5s forwards",
          }}>
            I design products<br />
            <em className="text-gradient" style={{ fontStyle: "italic" }}>that move the needle.</em>
          </h1>
          <p style={{
            fontSize: "clamp(1rem,1.4vw,1.2rem)", fontWeight: 300, lineHeight: 1.7,
            color: "rgba(255,255,255,.65)", maxWidth: 580, margin: "0 auto 3rem",
            opacity: 0, animation: "fadeUp .9s ease .75s forwards",
          }}>
            8+ years turning complex fintech and B2B systems into experiences that drive measurable conversion, activation, and retention.
          </p>
          <div style={{
            display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap",
            opacity: 0, animation: "fadeUp .8s ease .95s forwards",
          }}>
            <Link href="/#work" className="btn-blue" style={{ fontSize: ".95rem", padding: ".85rem 2.25rem" }}>View case studies</Link>
            <Link href="/about" className="btn-white-ghost" style={{ fontSize: ".95rem", padding: ".85rem 2.25rem" }}>About me</Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: "2.5rem", left: 0, right: 0,
          display: "flex", justifyContent: "center", pointerEvents: "none",
        }}>
          <div style={{
            width: 24, height: 40, border: "1.5px solid rgba(255,255,255,.3)",
            borderRadius: 12, position: "relative",
            animation: "fadeIn 1s ease 1.5s both",
          }}>
            <div style={{
              position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)",
              width: 3, height: 8, background: "rgba(255,255,255,.6)", borderRadius: 2,
              animation: "scrollMouse 2s ease infinite",
            }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CINEMATIC IMAGE — design at scale
      ══════════════════════════════════════════════════ */}
      <BigImageReveal
        src="/cinematic/design-system.jpg"
        alt="Design at scale"
        minHeight="70vh"
        overlay={
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.85)", marginBottom: "1.25rem" }}>
              Design at scale
            </p>
            <h2 style={{
              fontSize: "clamp(1.8rem, 5vw, 4.5rem)", fontWeight: 700,
              letterSpacing: "-.03em", lineHeight: 1.05, color: "#fff",
              maxWidth: 900, margin: "0 auto",
            }}>
              Where strategy<br />
              meets the craft.
            </h2>
          </ScrollReveal>
        }
      />

      {/* ══════════════════════════════════════════════════
          INTRO — white, statement
      ══════════════════════════════════════════════════ */}
      <section className="section-white" style={{ padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ marginBottom: "2rem" }}>The work</p>
            <h2 style={{
              fontSize: "clamp(2.2rem,5vw,5rem)", fontWeight: 700, letterSpacing: "-.03em",
              lineHeight: 1.05, color: "#1d1d1f", marginBottom: "2rem",
            }}>
              Complex systems.<br />
              <em style={{ color: "#0071e3", fontStyle: "italic" }}>Clear experiences.</em>
            </h2>
            <p className="t-body" style={{ maxWidth: 580, margin: "0 auto", fontSize: "1.15rem" }}>
              I lead design for fintech, travel, and growth products — turning architectural decisions into outcomes that ship and scale.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════ */}
      <section className="section-off-white" style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: "1px", background: "#d2d2d7", borderRadius: 20, overflow: "hidden" }}>
            {[
              { n: 14, l: "Years in\ndigital design" },
              { n: 8,  l: "Years in\nproduct design" },
              { n: 7,  l: "Years in\nglobal teams" },
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

      {/* ══════════════════════════════════════════════════
          WORK INTRO — building anticipation
      ══════════════════════════════════════════════════ */}
      <section id="work" style={{ background: "#000", padding: isMobile ? "4rem 0 0" : "10rem 2rem 0", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal>
            <p style={{
              fontSize: ".75rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase",
              color: "#0071e3", marginBottom: "2rem",
            }}>Selected work · 01</p>
            <h2 style={{
              fontSize: "clamp(2.5rem,6vw,5.5rem)", fontWeight: 700, letterSpacing: "-.035em",
              lineHeight: 1.02, color: "#fff", marginBottom: "2rem",
            }}>
              CVC Corp · <em style={{ color: "#0071e3", fontStyle: "italic" }}>Flight Booking</em>
            </h2>
            <p style={{
              fontSize: "1.1rem", color: "rgba(255,255,255,.6)", maxWidth: 620, margin: "0 auto",
              lineHeight: 1.7, fontWeight: 300,
            }}>
              Brazil&apos;s largest travel company. 30M customers. A flight booking app stuck at 2 stars. Rebuilt from architecture up.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CINEMATIC CVC SHOWCASE
      ══════════════════════════════════════════════════ */}
      <CVCShowcase />

      {/* ══════════════════════════════════════════════════
          MORE WORK — Rappi + Leadership
      ══════════════════════════════════════════════════ */}
      <section className="section-off-white" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ marginBottom: "3rem" }}>
              <p className="t-eyebrow" style={{ marginBottom: "1rem" }}>More case studies</p>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-.02em" }}>
                More work.
              </h2>
            </div>
          </ScrollReveal>

          {/* ── Rappi card ── */}
          <ScrollReveal delay={80}>
            <div style={{
              background: "#fff", borderRadius: 24, border: "1px solid #d2d2d7",
              overflow: "hidden", marginBottom: "1.5rem",
              transition: "transform .3s ease, box-shadow .3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ padding: "3rem" }}>
                <div style={{ display: "flex", gap: ".75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  {["Growth · Fintech", "LATAM", "Rappi"].map((t, i) => (
                    <span key={i} style={{
                      fontSize: ".68rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                      padding: ".3rem .85rem", borderRadius: 100,
                      background: "rgba(0,113,227,.15)", border: "1px solid rgba(0,113,227,.3)", color: "#0071e3",
                    }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: "1rem" }}>
                  Rappi · <em style={{ color: "#0071e3", fontStyle: "italic" }}>Growth & Fintech</em>
                </h3>
                <p style={{ fontSize: "1rem", color: "#86868b", lineHeight: 1.75, maxWidth: 580, marginBottom: "2rem" }}>
                  Onboarding redesign and fintech product design for one of Latin America&apos;s largest super-apps — 25M+ users across 9 countries.
                </p>
                <Link href="/work/rappi" className="btn-blue" style={{ display: "inline-block", padding: ".85rem 2.5rem", fontSize: ".95rem" }}>
                  See full case study →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Leadership card ── */}
          <ScrollReveal delay={140}>
            <div style={{
              background: "#000", borderRadius: 24, border: "1px solid rgba(255,255,255,.08)",
              overflow: "hidden", position: "relative",
              transition: "transform .3s ease, box-shadow .3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,113,227,.1) 0%, transparent 60%)", pointerEvents: "none" }} />
              <div style={{ padding: "3rem", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", gap: ".75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  {["Design Leadership", "B2B · Fintech", "Bank · NDA"].map((t, i) => (
                    <span key={i} style={{
                      fontSize: ".68rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                      padding: ".3rem .85rem", borderRadius: 100,
                      background: "rgba(0,113,227,.15)", border: "1px solid rgba(0,113,227,.3)", color: "#0071e3",
                    }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.035em", lineHeight: 1.1, marginBottom: "1rem" }}>
                  From chaos to<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>high-performing team.</em>
                </h3>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.75, maxWidth: 580, marginBottom: "2rem" }}>
                  How I stepped into a fractured design practice at a Latin American bank — no process, no ceremonies, 3–4× rework — and rebuilt it from scratch, leading a team of 3 designers to formal recognition in under 2 months.
                </p>
                <Link href="/work/leadership" className="btn-blue" style={{ display: "inline-block", padding: ".85rem 2.5rem", fontSize: ".95rem" }}>
                  See full case study →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Design System card ── */}
          <ScrollReveal delay={200}>
            <div style={{
              background: "#000", borderRadius: 24, border: "1px solid rgba(255,255,255,.08)",
              overflow: "hidden", position: "relative", marginTop: "1.5rem",
              transition: "transform .3s ease, box-shadow .3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(126,72,255,.12) 0%, transparent 60%)", pointerEvents: "none" }} />
              <div style={{ padding: "3rem", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", gap: ".75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  {["Design Systems", "Mobile + Web", "Rappi · CVC"].map((t, i) => (
                    <span key={i} style={{
                      fontSize: ".68rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                      padding: ".3rem .85rem", borderRadius: 100,
                      background: "rgba(0,113,227,.15)", border: "1px solid rgba(0,113,227,.3)", color: "#0071e3",
                    }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.035em", lineHeight: 1.1, marginBottom: "1rem" }}>
                  Design systems,<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>from zero to scale.</em>
                </h3>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.75, maxWidth: 580, marginBottom: "2rem" }}>
                  Two starting points: bootstrapping a B2B system with no DS team at Rappi, and building the mobile-app layer that lifted the CVC app — leaving a legacy for the app team and best practices for web.
                </p>
                <Link href="/work/design-system" className="btn-blue" style={{ display: "inline-block", padding: ".85rem 2.5rem", fontSize: ".95rem" }}>
                  See full case study →
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          THE PROCESS — full-bleed working photo
      ══════════════════════════════════════════════════ */}
      <BigImageReveal
        src="/rafael-working.jpg"
        alt="Rafael designing"
        minHeight="85vh"
        overlay={
          <ScrollReveal>
            <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.25rem" }}>
              The process
            </p>
            <h2 style={{
              fontSize: "clamp(2rem, 6vw, 5.5rem)", fontWeight: 700,
              letterSpacing: "-.035em", lineHeight: 1.02, color: "#fff",
              maxWidth: 1000, margin: "0 auto",
            }}>
              Strategy. Research.<br />
              <em style={{ color: "#0071e3", fontStyle: "italic" }}>Pixels that ship.</em>
            </h2>
            <p style={{
              fontSize: "clamp(1rem,1.3vw,1.15rem)", color: "rgba(255,255,255,.75)",
              maxWidth: 580, margin: "2rem auto 0", lineHeight: 1.7, fontWeight: 300,
            }}>
              Every decision tied to an outcome. Every screen tested before it shipped. Every team aligned on the same north star.
            </p>
          </ScrollReveal>
        }
      />

      {/* ══════════════════════════════════════════════════
          ABOUT — cinematic portrait
      ══════════════════════════════════════════════════ */}
      <section className="section-black" style={{ padding: isMobile ? "5rem 1.5rem" : "10rem 2rem", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 25% 50%, rgba(0,113,227,.18) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 80% 20%, rgba(0,113,227,.08) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }} />

        {/* Subtle grain */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.25, mixBlendMode: "overlay", pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr", gap: isMobile ? "3rem" : "5rem", alignItems: "center", position: "relative", zIndex: 1 }}>

          {/* Portrait — cinematic frame */}
          <ScrollReveal type="scale">
            <div style={{ position: "relative" }}>
              {/* Blue glow behind */}
              <div style={{
                position: "absolute",
                inset: "-30px",
                background: "radial-gradient(ellipse 70% 70% at 30% 50%, rgba(0,113,227,.4) 0%, transparent 60%)",
                filter: "blur(40px)",
                pointerEvents: "none",
                zIndex: 0,
              }} />

              <div style={{
                borderRadius: 24,
                overflow: "hidden",
                position: "relative",
                zIndex: 1,
                aspectRatio: isMobile ? "4 / 5" : undefined,
                boxShadow: "0 60px 120px rgba(0,0,0,.6), 0 30px 60px rgba(0,113,227,.15)",
              }}>
                <Image
                  src="https://raw.githubusercontent.com/17oliveira17-afk/rafael-portfolio/main/public/photos/rafael-2026.png"
                  alt="Rafael Guimarães"
                  width={1600}
                  height={1600}
                  style={{ width: "100%", height: isMobile ? "100%" : "auto", objectFit: "cover", objectPosition: "center top", display: "block" }}
                  unoptimized
                  priority
                />
                {/* Gradient overlay for legibility */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,.85) 100%)",
                  pointerEvents: "none",
                }} />
                {/* Caption on photo */}
                <div style={{ position: "absolute", bottom: isMobile ? "3.75rem" : "2rem", left: "2rem", right: "2rem" }}>
                  <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", letterSpacing: "-.01em" }}>
                    Rafael Guimarães
                  </p>
                  <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.65)", marginTop: ".25rem", letterSpacing: ".02em" }}>
                    Product Design Lead · São Paulo, Brazil
                  </p>
                </div>
              </div>

              {/* Floating stat card */}
              <div style={{
                position: "absolute",
                bottom: isMobile ? "-18px" : "-30px",
                right: isMobile ? "8px" : "-20px",
                background: "rgba(20,20,22,.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 16,
                padding: "1rem 1.4rem",
                zIndex: 2,
                boxShadow: "0 20px 40px rgba(0,0,0,.4)",
              }}>
                <p style={{ fontSize: ".65rem", color: "rgba(255,255,255,.5)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".25rem" }}>
                  Currently
                </p>
                <p style={{ fontSize: ".95rem", color: "#fff", fontWeight: 600 }}>
                  Lead @ Thoughtworks
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Bio content */}
          <ScrollReveal delay={150}>
            <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>About</p>
            <h2 style={{
              fontSize: "clamp(2.2rem,4.5vw,4rem)", fontWeight: 700, color: "#fff",
              letterSpacing: "-.035em", lineHeight: 1.02, marginBottom: "2rem",
            }}>
              Brazilian designer.<br />
              <em style={{ color: "#0071e3", fontStyle: "italic" }}>Working globally.</em>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.75)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Currently Product Design Lead at <span style={{ color: "#fff", fontWeight: 500 }}>Thoughtworks Brasil</span>, designing URPI PRO — a B2B credit origination platform for MiBanco.
            </p>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: "2rem" }}>
              Previously at Rappi (fintech/growth) and CVC Corp (travel). I love snowboarding, road trips, and building things that matter.
            </p>

            {/* Quick-fact cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", marginBottom: "2.5rem", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden" }}>
              {[
                { num: "14", label: "Years in design" },
                { num: "12", label: "Countries served" },
                { num: "30M+", label: "Users impacted" },
                { num: "8", label: "Years cross-cultural" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#0a0a0a", padding: "1.25rem 1rem" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0071e3", letterSpacing: "-.02em", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.5)", marginTop: ".4rem", letterSpacing: ".05em" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-blue">Full story →</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA — white finale
      ══════════════════════════════════════════════════ */}
      <section className="section-white" style={{ padding: "12rem 2rem", textAlign: "center" }}>
        <ScrollReveal>
          <p className="t-eyebrow" style={{ marginBottom: "2rem" }}>Open to opportunities</p>
          <h2 style={{
            fontSize: "clamp(2.5rem,6vw,6rem)", fontWeight: 700, letterSpacing: "-.035em",
            lineHeight: 1.02, color: "#1d1d1f", marginBottom: "2rem", maxWidth: 800, margin: "0 auto 2rem",
          }}>
            Let&apos;s build something<br />
            <em className="text-gradient" style={{ fontStyle: "italic" }}>worth shipping.</em>
          </h2>
          <p className="t-body" style={{ maxWidth: 480, margin: "0 auto 3rem" }}>
            Open to Product Design Lead roles in fintech and B2B. Pursuing opportunities in Canada.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-blue" style={{ fontSize: ".95rem", padding: ".85rem 2.25rem" }}>Get in touch</Link>
            <Link href="/work/cvc" className="btn-blue-ghost" style={{ fontSize: ".95rem", padding: ".85rem 2.25rem" }}>See my work</Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer style={{ background: "#f5f5f7", borderTop: "1px solid #d2d2d7", padding: "1.5rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: ".72rem", color: "#86868b" }}>Copyright © 2025 Rafael Guimarães. All rights reserved.</p>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="https://linkedin.com/in/rafaelgdesign" target="_blank" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>LinkedIn</a>
            <a href="mailto:rafael@rafaelgdesign.com" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>Email</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scrollMouse {
          0% { opacity: 1; transform: translate(-50%, 0); }
          50% { opacity: 0.3; transform: translate(-50%, 14px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </main>
  );
}
