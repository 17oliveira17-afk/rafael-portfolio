"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./components/ScrollReveal";

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

/* ══════════════════════════════════════════════════════════
   Phone helper
   ══════════════════════════════════════════════════════════ */
function Phone({ src, alt, w = 280, style = {} }: { src: string; alt: string; w?: number; style?: React.CSSProperties }) {
  const ratio = 1324 / 644;
  return (
    <div style={{ width: w, height: w * ratio, position: "relative", ...style }}>
      <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} priority />
    </div>
  );
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
   CINEMATIC CVC SHOWCASE
   3-phase sticky scroll: zoom in → reveal full product → present stats
   ══════════════════════════════════════════════════════════ */
function CVCShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref);

  // Phase 0: 0–0.33 — Single phone zooms in from far
  // Phase 1: 0.33–0.66 — More phones fan out from sides
  // Phase 2: 0.66–1.0 — Stats fade in, CTA appears

  const phase0 = Math.min(1, p / 0.33);            // 0 to 1 in first third
  const phase1 = Math.max(0, Math.min(1, (p - 0.33) / 0.33)); // fanout phase
  const phase2 = Math.max(0, Math.min(1, (p - 0.66) / 0.34)); // stats phase

  const heroScale = 0.4 + phase0 * 0.6;            // 0.4 → 1.0
  const heroRotate = 15 - phase0 * 15;             // 15° → 0°
  const heroOpacity = 0.3 + phase0 * 0.7;

  return (
    <div ref={ref} style={{ height: "350vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Massive animated radial gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,113,227,${.08 + phase1 * .1}) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 30% 80%, rgba(0,113,227,${phase2 * .08}) 0%, transparent 50%),
            radial-gradient(ellipse 50% 80% at 70% 80%, rgba(0,113,227,${phase2 * .08}) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }} />

        {/* Grain */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.35, mixBlendMode: "overlay", pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")",
        }} />

        {/* Eyebrow + title — fade out as phones appear */}
        <div style={{
          position: "absolute", top: "12%", left: 0, right: 0, textAlign: "center", zIndex: 5,
          opacity: Math.max(0, 1 - p * 2.5),
          transform: `translateY(${p * -40}px)`,
        }}>
          <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".75rem" }}>
            Featured Case Study
          </p>
          <h2 style={{
            fontSize: "clamp(2.2rem,5vw,5rem)", fontWeight: 700, letterSpacing: "-.035em",
            color: "#f5f5f7", lineHeight: 1.03,
          }}>
            From <em style={{ color: "#0071e3", fontStyle: "italic" }}>two stars</em><br />
            to category-defining.
          </h2>
        </div>

        {/* SIDE PHONES (phase 1) — fan out from center */}
        {/* Far left */}
        <div style={{
          position: "absolute",
          transform: `translate(${-100 - phase1 * 280}px, ${20 + phase1 * 30}px) rotate(${-phase1 * 14}deg) scale(${0.7 + phase1 * 0.15})`,
          opacity: phase1 * 0.8,
          filter: `blur(${(1 - phase1) * 4}px) drop-shadow(0 30px 60px rgba(0,0,0,.5))`,
          zIndex: 1,
          willChange: "transform",
        }}>
          <Phone src="/cvc-phone-cal.png" alt="" w={240} />
        </div>
        {/* Near left */}
        <div style={{
          position: "absolute",
          transform: `translate(${-50 - phase1 * 160}px, ${10 - phase1 * 10}px) rotate(${-phase1 * 7}deg) scale(${0.8 + phase1 * 0.1})`,
          opacity: phase1 * 0.95,
          filter: `blur(${(1 - phase1) * 2}px) drop-shadow(0 40px 70px rgba(0,113,227,0.15)) drop-shadow(0 20px 40px rgba(0,0,0,.5))`,
          zIndex: 2,
          willChange: "transform",
        }}>
          <Phone src="/cvc-phone-search.png" alt="" w={260} />
        </div>

        {/* Near right */}
        <div style={{
          position: "absolute",
          transform: `translate(${50 + phase1 * 160}px, ${10 - phase1 * 10}px) rotate(${phase1 * 7}deg) scale(${0.8 + phase1 * 0.1})`,
          opacity: phase1 * 0.95,
          filter: `blur(${(1 - phase1) * 2}px) drop-shadow(0 40px 70px rgba(0,113,227,0.15)) drop-shadow(0 20px 40px rgba(0,0,0,.5))`,
          zIndex: 2,
          willChange: "transform",
        }}>
          <Phone src="/cvc-phone-filters.png" alt="" w={260} />
        </div>
        {/* Far right */}
        <div style={{
          position: "absolute",
          transform: `translate(${100 + phase1 * 280}px, ${20 + phase1 * 30}px) rotate(${phase1 * 14}deg) scale(${0.7 + phase1 * 0.15})`,
          opacity: phase1 * 0.8,
          filter: `blur(${(1 - phase1) * 4}px) drop-shadow(0 30px 60px rgba(0,0,0,.5))`,
          zIndex: 1,
          willChange: "transform",
        }}>
          <Phone src="/cvc-phone-confirma.png" alt="" w={240} />
        </div>

        {/* HERO PHONE (phase 0) — center, big, with intense shadow */}
        <div style={{
          position: "relative", zIndex: 3,
          transform: `scale(${heroScale}) perspective(1500px) rotateY(${heroRotate}deg)`,
          opacity: heroOpacity,
          filter: `drop-shadow(0 60px 100px rgba(0,113,227,${0.15 + phase1 * 0.15})) drop-shadow(0 40px 80px rgba(0,0,0,${0.5 + phase2 * 0.2}))`,
          willChange: "transform",
        }}>
          <Phone src="/cvc-phone-resultado.png" alt="CVC native flight booking" w={320} />
        </div>

        {/* STATS (phase 2) — fade in from bottom */}
        <div style={{
          position: "absolute", bottom: "12%", left: 0, right: 0,
          display: "flex", justifyContent: "center", gap: "clamp(2rem, 6vw, 5rem)",
          opacity: phase2,
          transform: `translateY(${(1 - phase2) * 40}px)`,
          zIndex: 5,
          flexWrap: "wrap", padding: "0 2rem",
        }}>
          {[
            { v: "2.0 → 4.6★", l: "App Store Rating" },
            { v: "+212%", l: "Checkout Conversion" },
            { v: "+23%", l: "Hotel Cross-sell" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(1.4rem,2.6vw,2.4rem)", fontWeight: 700, letterSpacing: "-.03em", color: "#f5f5f7", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.5)", marginTop: ".5rem", letterSpacing: ".08em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* CTA (phase 2 late) */}
        <div style={{
          position: "absolute", bottom: "3.5%", left: "50%", transform: "translateX(-50%)",
          opacity: Math.max(0, (phase2 - 0.3) * 1.5), zIndex: 6,
        }}>
          <Link href="/work/cvc" className="btn-blue" style={{ padding: ".85rem 2.25rem", fontSize: ".95rem" }}>
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
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <main className="page-in">

      {/* ══════════════════════════════════════════════════
          HERO — cinematic with floating phones
      ══════════════════════════════════════════════════ */}
      <section className="section-black" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "8rem 2rem 6rem",
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

        {/* Grain */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.3, mixBlendMode: "overlay", pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")",
        }} />

        {/* Floating phones — background ambient */}
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
            <Phone src="/cvc-phone-search.png" alt="" w={300} />
          </div>
          {/* Far right phone — subtle bg */}
          <div style={{
            position: "absolute", right: "-5%", top: "10%",
            opacity: 0.18, filter: "blur(3px)",
            transform: "rotate(18deg) scale(0.95)",
          }}>
            <Phone src="/cvc-phone-filters.png" alt="" w={300} />
          </div>
          {/* Bottom left */}
          <div style={{
            position: "absolute", left: "8%", bottom: "-10%",
            opacity: 0.12, filter: "blur(4px)",
            transform: "rotate(-8deg)",
          }}>
            <Phone src="/cvc-phone-cal.png" alt="" w={240} />
          </div>
          {/* Bottom right */}
          <div style={{
            position: "absolute", right: "8%", bottom: "-10%",
            opacity: 0.12, filter: "blur(4px)",
            transform: "rotate(8deg)",
          }}>
            <Phone src="/cvc-phone-confirma.png" alt="" w={240} />
          </div>
        </div>

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
            fontSize: "clamp(3rem, 9vw, 8.5rem)", fontWeight: 700,
            letterSpacing: "-.035em", lineHeight: 0.95, color: "#fff",
            marginBottom: "2rem",
            opacity: 0, animation: "fadeUp 1.1s ease .5s forwards",
          }}>
            I design products<br />
            <em style={{ color: "#0071e3", fontStyle: "italic" }}>that move the needle.</em>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "#d2d2d7", borderRadius: 20, overflow: "hidden" }}>
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
      <section id="work" style={{ background: "#000", padding: "10rem 2rem 0", borderTop: "1px solid rgba(255,255,255,.06)" }}>
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
          MORE WORK
      ══════════════════════════════════════════════════ */}
      <section className="section-off-white" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ marginBottom: "3rem", textAlign: "center" }}>
              <p className="t-eyebrow" style={{ marginBottom: "1rem" }}>More case studies</p>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-.02em" }}>
                Coming soon
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[
              { brand: "MiBanco", project: "URPI PRO · Credit origination", tag: "Fintech B2B" },
              { brand: "Rappi", project: "LATAM onboarding redesign", tag: "Growth" },
              { brand: "Thoughtworks", project: "Banking platform design system", tag: "Systems" },
            ].map((c, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{
                  padding: "2.5rem 2rem", background: "#fff", borderRadius: 20,
                  border: "1px solid #d2d2d7", height: "100%",
                  transition: "transform .3s ease, box-shadow .3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                  <p style={{ fontSize: ".7rem", color: "#0071e3", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1rem" }}>{c.tag}</p>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#1d1d1f", marginBottom: ".5rem", letterSpacing: "-.01em" }}>{c.brand}</h3>
                  <p style={{ fontSize: ".95rem", color: "#86868b", lineHeight: 1.55 }}>{c.project}</p>
                  <p style={{ fontSize: ".75rem", color: "#c0c0c0", marginTop: "2rem" }}>In progress</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ABOUT — black with photo
      ══════════════════════════════════════════════════ */}
      <section className="section-black" style={{ padding: "10rem 2rem", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 40% at 80% 30%, rgba(0,113,227,.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "5rem", alignItems: "center", position: "relative", zIndex: 1 }}>
          <ScrollReveal type="scale">
            <div style={{ borderRadius: 24, overflow: "hidden", position: "relative" }}>
              <Image src="/rafael.jpg" alt="Rafael Guimarães" width={600} height={750}
                style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(0.15)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,.7) 100%)" }} />
              <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>Rafael Guimarães</p>
                <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.65)", marginTop: ".25rem" }}>São Paulo, Brazil</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>About</p>
            <h2 style={{
              fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: "#fff",
              letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "2rem",
            }}>
              Brazilian designer.<br />
              <em style={{ color: "#0071e3", fontStyle: "italic" }}>Working globally.</em>
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.7)", lineHeight: 1.7, marginBottom: "1rem" }}>
              Currently Product Design Lead at <span style={{ color: "#fff", fontWeight: 500 }}>Thoughtworks Brasil</span>, designing URPI PRO — a B2B credit origination platform for MiBanco.
            </p>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Previously at Rappi (fintech/growth) and CVC Corp (travel). I love snowboarding, road trips, and building things that matter.
            </p>
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
            <em style={{ color: "#0071e3", fontStyle: "italic" }}>worth shipping.</em>
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
        @media (max-width: 860px) {
          section { padding: 5rem 1.5rem !important; }
          [style*="grid-template-columns: 1fr 1.2fr"] { grid-template-columns: 1fr !important; gap: 2rem !important; }
          [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
