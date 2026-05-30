"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, ReactNode } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import IPhone from "../../components/IPhone";
import MacBookSvg from "../../components/MacBook";
import useIsMobile from "../../components/useIsMobile";
import HorizontalCarousel from "../../components/HorizontalCarousel";
import BigImageReveal from "../../components/BigImageReveal";

/* ════════════════════════════════════════════════════════
   Hook: scroll progress within a sticky section
   ════════════════════════════════════════════════════════ */
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const total = ref.current.offsetHeight - window.innerHeight;
      setP(Math.max(0, Math.min(1, -r.top / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
  return p;
}

/* ════════════════════════════════════════════════════════
   Counter
   ════════════════════════════════════════════════════════ */
function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 2200;
        const s = performance.now();
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

/* Phone wraps the SVG IPhone mockup */
function Phone({ src, alt, w = 280, style = {} }: { src: string; alt: string; w?: number; style?: React.CSSProperties }) {
  return <IPhone src={src} alt={alt} width={w} style={style} />;
}

/* MacBook wraps the SVG MacBook mockup */
function MacBook({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
      <MacBookSvg src={src} alt={alt} width={1200} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Cinematic Hero — full-bleed with floating phones
   ════════════════════════════════════════════════════════ */
function CinematicHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const pDesktop = useScrollProgress(ref);
  const p = isMobile ? 0 : pDesktop; // disable parallax on mobile

  // ───────── MOBILE HERO — simpler, one phone, big text, no sticky ─────────
  if (isMobile) {
    return (
      <section style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        background: "#000",
        display: "flex", flexDirection: "column",
        padding: "8rem 1.5rem 3rem",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 90% 50% at 50% 50%, rgba(0,113,227,.18) 0%, transparent 60%)",
        }} />

        {/* Text block */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 2, marginBottom: "3rem" }}>
          <p className="t-eyebrow" style={{
            color: "#0071e3", marginBottom: "1.25rem",
            opacity: 0, animation: "fadeUp .9s ease .2s forwards",
          }}>
            Case Study · CVC · 2021
          </p>
          <h1 style={{
            fontSize: "clamp(2.5rem, 11vw, 4rem)", fontWeight: 700,
            color: "#fff", letterSpacing: "-.035em", lineHeight: 1,
            marginBottom: "1.25rem",
            opacity: 0, animation: "fadeUp 1.1s ease .4s forwards",
          }}>
            From <em style={{ color: "#0071e3", fontStyle: "italic" }}>two stars</em><br />
            to category-defining.
          </h1>
          <p style={{
            fontSize: "1rem", color: "rgba(255,255,255,.65)",
            lineHeight: 1.6, fontWeight: 300, padding: "0 .5rem",
            opacity: 0, animation: "fadeUp .9s ease .6s forwards",
          }}>
            Brazil&apos;s largest travel company. A flight booking app that actually works.
          </p>
        </div>

        {/* Single big centered phone */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", zIndex: 1,
          opacity: 0, animation: "fadeUp 1.2s ease .9s forwards",
        }}>
          <div style={{ filter: "drop-shadow(0 40px 80px rgba(0,113,227,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.7))" }}>
            <Phone src="/screens-mobile/resultado.png" alt="CVC flight results" w={260} />
          </div>
        </div>

        {/* Stats row at bottom */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem",
          marginTop: "2rem", padding: "1.5rem 0",
          borderTop: "1px solid rgba(255,255,255,.08)",
          opacity: 0, animation: "fadeUp .9s ease 1.1s forwards",
        }}>
          {[
            { v: "4.6★", l: "Rating" },
            { v: "+212%", l: "Conversion" },
            { v: "6s", l: "Load time" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", letterSpacing: "-.02em" }}>{s.v}</div>
              <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.5)", marginTop: ".3rem", textTransform: "uppercase", letterSpacing: ".1em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ───────── DESKTOP HERO — original cinematic ─────────
  return (
    <div ref={ref} style={{ height: "200vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,113,227,${.18 - p * .12}) 0%, transparent 65%),
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,113,227,${.12 - p * .08}) 0%, transparent 50%)
          `,
        }} />

        <div style={{
          position: "absolute", inset: 0, opacity: 0.4, mixBlendMode: "overlay",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `scale(${1 + p * 0.4}) translateY(${-p * 80}px)`,
          opacity: 1 - p * 0.7,
        }}>
          <div style={{ position: "absolute", transform: `translate(-220px, 40px) rotate(-12deg) translateY(${p * -30}px)`, opacity: 0.4 + p * 0.2, filter: "blur(2px)" }}>
            <Phone src="/screens-mobile/calendar.png" alt="" w={240} />
          </div>
          <div style={{ position: "absolute", transform: `translate(220px, 50px) rotate(12deg) translateY(${p * -30}px)`, opacity: 0.4 + p * 0.2, filter: "blur(2px)" }}>
            <Phone src="/screens-mobile/confirma.png" alt="" w={240} />
          </div>
          <div style={{ position: "absolute", transform: `translate(-140px, 0px) rotate(-6deg)`, opacity: 0.85 }}>
            <Phone src="/screens-mobile/search.png" alt="" w={280} />
          </div>
          <div style={{ position: "absolute", transform: `translate(140px, 0px) rotate(6deg)`, opacity: 0.85 }}>
            <Phone src="/screens-mobile/filters.png" alt="" w={280} />
          </div>
          <div style={{ position: "relative", zIndex: 10, filter: `drop-shadow(0 60px 100px rgba(0,113,227,0.3)) drop-shadow(0 30px 60px rgba(0,0,0,0.6))` }}>
            <Phone src="/screens-mobile/resultado.png" alt="CVC flight results" w={320} />
          </div>
        </div>

        <div style={{
          position: "relative", zIndex: 20, textAlign: "center", maxWidth: 900, padding: "0 2rem",
          opacity: 1 - p * 1.4, transform: `translateY(${p * -60}px)`,
          pointerEvents: p > 0.5 ? "none" : "auto",
        }}>
          <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem", opacity: 0, animation: "fadeUp .9s ease .3s forwards" }}>
            Case Study · CVC Corp · 2021—2022
          </p>
          <h1 style={{ fontSize: "clamp(3rem,8vw,8rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.035em", lineHeight: 0.95, marginBottom: "1.75rem", opacity: 0, animation: "fadeUp 1.1s ease .55s forwards" }}>
            From <em style={{ color: "#0071e3", fontStyle: "italic" }}>two stars</em><br />to category-defining.
          </h1>
          <p style={{ fontSize: "clamp(1rem,1.4vw,1.2rem)", color: "rgba(255,255,255,.65)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7, fontWeight: 300, opacity: 0, animation: "fadeUp .9s ease .8s forwards" }}>
            Brazil&apos;s largest travel company needed a mobile flight booking experience that actually worked. I rebuilt it from the architecture up.
          </p>
        </div>

        <div style={{ position: "absolute", bottom: "3rem", left: 0, right: 0, display: "flex", justifyContent: "center", opacity: 1 - p * 3 }}>
          <div style={{ width: 24, height: 40, border: "1.5px solid rgba(255,255,255,.4)", borderRadius: 12, position: "relative" }}>
            <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 3, height: 8, background: "rgba(255,255,255,.7)", borderRadius: 2, animation: "scrollMouse 2s ease infinite" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   IMPACT STRIP — big numbers on dark
   ════════════════════════════════════════════════════════ */
function ImpactStrip() {
  return (
    <section style={{ background: "#000", padding: "6rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3rem", textAlign: "center" }}>
        {[
          { num: 4.6, label: "App Store rating", sub: "from 2.0 ★", color: "#0071e3" },
          { num: 212, label: "Checkout conversion", sub: "from 6% → 20%", color: "#0071e3", prefix: "+", suffix: "%" },
          { num: 23, label: "Hotel cross-sell", sub: "same-session revenue", color: "#0071e3", prefix: "+", suffix: "%" },
        ].map((m, i) => (
          <ScrollReveal key={i} delay={i * 120}>
            <div style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", fontWeight: 700, letterSpacing: "-.04em", color: m.color, lineHeight: 1 }}>
              {m.prefix === "+" ? <><Counter to={m.num} prefix="+" suffix="%" /></> : <Counter to={m.num} suffix={m.num === 4.6 ? "" : (m.suffix || "")} />}
              {m.num === 4.6 && <span>.6★</span>}
            </div>
            <p style={{ fontSize: ".95rem", color: "#fff", marginTop: "1rem", fontWeight: 500 }}>{m.label}</p>
            <p style={{ fontSize: ".78rem", color: "#86868b", marginTop: ".35rem" }}>{m.sub}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   Pull Quote — cinematic between sections
   ════════════════════════════════════════════════════════ */
function PullQuote({ children, dark = true }: { children: ReactNode; dark?: boolean }) {
  return (
    <section style={{
      background: dark ? "#000" : "#fff",
      padding: "10rem 2rem", textAlign: "center",
    }}>
      <ScrollReveal>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{
            fontSize: "clamp(1.8rem, 3.6vw, 3.4rem)",
            fontWeight: 600, lineHeight: 1.2, letterSpacing: "-.02em",
            color: dark ? "#fff" : "#1d1d1f",
          }}>
            {children}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   Sticky Phone Reveal — phone scales up as user scrolls
   ════════════════════════════════════════════════════════ */
function StickyPhoneReveal({
  phoneSrc, eyebrow, title, body,
}: { phoneSrc: string; eyebrow: string; title: ReactNode; body: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const pDesktop = useScrollProgress(ref);
  const p = isMobile ? 0 : pDesktop;

  // MOBILE: simple stacked layout, no sticky, no 3D
  if (isMobile) {
    return (
      <section style={{ background: "#000", padding: "5rem 1.5rem", textAlign: "center" }}>
        <ScrollReveal>
          <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1rem" }}>{eyebrow}</p>
          <h2 style={{ fontSize: "clamp(1.8rem,7vw,2.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.025em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            {title}
          </h2>
          <div style={{ fontSize: ".95rem", color: "rgba(255,255,255,.65)", lineHeight: 1.65, marginBottom: "2.5rem" }}>{body}</div>
        </ScrollReveal>
        <ScrollReveal type="scale">
          <div style={{ display: "inline-block", filter: "drop-shadow(0 30px 60px rgba(0,113,227,0.2)) drop-shadow(0 15px 30px rgba(0,0,0,0.5))" }}>
            <Phone src={phoneSrc} alt="" w={240} />
          </div>
        </ScrollReveal>
      </section>
    );
  }

  // DESKTOP: original sticky scaling
  return (
    <div ref={ref} style={{ height: "200vh", position: "relative", background: "#000" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,113,227,.12) 0%, transparent 60%)" }} />
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: `translate(-50%, -50%) scale(${0.5 + p * 0.7}) perspective(1500px) rotateY(${15 - p * 15}deg)`,
          filter: `drop-shadow(0 ${40 + p * 40}px ${60 + p * 40}px rgba(0,0,0,.5))`,
          willChange: "transform",
        }}>
          <Phone src={phoneSrc} alt="" w={380} />
        </div>
        <div style={{ position: "relative", zIndex: 5, padding: "0 2rem", maxWidth: 1200, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div style={{ opacity: 1 - p * 0.5 }}>
            <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1rem" }}>{eyebrow}</p>
            <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>{title}</h2>
            <div style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.65)", lineHeight: 1.7 }}>{body}</div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
export default function CVCPage() {
  const isMobile = useIsMobile();

  /* Dark cursor */
  useEffect(() => {
    document.body.classList.add("dark-cursor");
    return () => document.body.classList.remove("dark-cursor");
  }, []);

  return (
    <main className="page-in" style={{ background: "#000" }}>

      {/* ═══════════ CINEMATIC HERO ═══════════ */}
      <CinematicHero />

      {/* ═══════════ CINEMATIC IMAGE — airport sunset ═══════════ */}
      <BigImageReveal
        src="/cinematic/airport-sunset.jpg"
        alt="Airplane wing at sunset"
        minHeight="80vh"
        overlay={
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.85)", marginBottom: "1.25rem" }}>
              30 million customers
            </p>
            <h2 style={{
              fontSize: "clamp(2rem, 6vw, 5rem)", fontWeight: 700,
              letterSpacing: "-.03em", lineHeight: 1.05, color: "#fff",
              maxWidth: 900, margin: "0 auto",
            }}>
              Built for the people who actually travel.
            </h2>
          </ScrollReveal>
        }
      />

      {/* ═══════════ IMPACT STRIP — big numbers ═══════════ */}
      <ImpactStrip />

      {/* ═══════════ PULL QUOTE 1 ═══════════ */}
      <PullQuote>
        It started with a <em style={{ color: "#0071e3", fontStyle: "italic" }}>2-star rating</em>, 40-second loads, and a checkout conversion stuck at 6%.
      </PullQuote>

      {/* ═══════════ 01 · CONTEXT ═══════════ */}
      <section style={{ background: "#000", padding: "10rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "6rem", alignItems: "start", marginBottom: "6rem" }}>
            <ScrollReveal>
              <p className="t-eyebrow" style={{ color: "#0071e3" }}>01 — Context</p>
              <h2 style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginTop: "1rem" }}>
                The problem<br />was the architecture.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,.7)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                CVC is Brazil&apos;s largest travel company — 30 million customers, thousands of stores, and a digital product that hadn&apos;t caught up.
              </p>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>
                The mobile flights experience ran inside a webview wrapped in a native shell. Every decision was optimized for desktop, then ported over. The result felt like a product that didn&apos;t belong on a phone.
              </p>
            </ScrollReveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            {[
              { n: "01", title: "Webview wrapped as native", desc: "Entire booking flow lived in a webview. 40-second loads, layout shifts on every scroll, no native gestures." },
              { n: "02", title: "Combined outbound + return", desc: "Both directions in one card. Users processed two decisions simultaneously — cognitive overload before commitment." },
              { n: "03", title: "Search engine everywhere", desc: "The search form reappeared between every step. Users navigated back 4+ times to change a single field." },
              { n: "04", title: "Zero native capabilities", desc: "No haptics, no GPS, no push notifications. A product that felt like it didn&apos;t belong on a phone." },
            ].map((c, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{ background: "#0a0a0a", padding: "3rem 2.5rem", height: "100%", transition: "background .3s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#111")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}
                >
                  <p style={{ fontSize: ".7rem", color: "#0071e3", fontWeight: 600, letterSpacing: ".12em", marginBottom: "1.25rem" }}>{c.n}</p>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "#fff", fontWeight: 600, letterSpacing: "-.01em" }}>{c.title}</h3>
                  <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PULL QUOTE 2 ═══════════ */}
      <PullQuote>
        Every top travel app shared three patterns.<br />
        <em style={{ color: "#0071e3", fontStyle: "italic" }}>CVC was doing the opposite of all three.</em>
      </PullQuote>

      {/* ═══════════ 02 · DISCOVERY — MacBook on black ═══════════ */}
      <section style={{ background: "#000", padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "5rem", maxWidth: 700, margin: "0 auto 5rem" }}>
              <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>02 — Discovery</p>
              <h2 style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                I studied the<br />best in the world.
              </h2>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.6)", lineHeight: 1.7 }}>
                Hopper 4.8. Kayak 4.8. Skyscanner 4.8. AvisaSales 4.7. Every category leader shared three structural decisions.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal type="scale">
            <MacBook src="/screens-desktop/mac-benchmark.png" alt="Benchmark" />
            <p style={{ marginTop: "1.5rem", fontSize: ".82rem", color: "rgba(255,255,255,.5)", textAlign: "center" }}>
              Competitive benchmark · The 4 top-rated travel apps in 2021
            </p>
          </ScrollReveal>

          <div style={{ height: "5rem" }} />

          <ScrollReveal type="scale">
            <MacBook src="/screens-desktop/mac-dynamics.png" alt="Research" />
            <p style={{ marginTop: "1.5rem", fontSize: ".82rem", color: "rgba(255,255,255,.5)", textAlign: "center" }}>
              Pain/opportunity matrix · Built from existing CVC usability tests and analytics
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ PULL QUOTE 3 ═══════════ */}
      <PullQuote>
        Seven interruptions before seeing a single flight result.<br />
        <em style={{ color: "#0071e3", fontStyle: "italic" }}>That was the old flow.</em>
      </PullQuote>

      {/* ═══════════ 03 · ARCHITECTURE — Before/After ═══════════ */}
      <section style={{ background: "#000", padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "6rem", alignItems: "start", marginBottom: "5rem" }}>
            <ScrollReveal>
              <p className="t-eyebrow" style={{ color: "#0071e3" }}>03 — Architecture</p>
              <h2 style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginTop: "1rem" }}>
                One decision<br />at a time.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                The old flow bounced users through the search engine after every input — departure, then search engine, then destination, then search engine again.
              </p>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>
                The new flow collapses search into a single guided native step, then presents outbound and return as separate decisions. Loading time becomes a cross-sell moment.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal type="scale">
            <MacBook src="/screens-desktop/mac-flow.png" alt="Before/after" />
          </ScrollReveal>

          <div style={{ height: "5rem" }} />

          <ScrollReveal type="scale">
            <MacBook src="/screens-desktop/mac-wireframes.png" alt="Wireframes" />
            <p style={{ marginTop: "1.5rem", fontSize: ".82rem", color: "rgba(255,255,255,.5)", textAlign: "center" }}>
              Wireframe flow · Home → Search → Calendar → Loading → Outbound → Return → Upsell → Confirmation
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ STICKY PHONE REVEAL — Search ═══════════ */}
      <StickyPhoneReveal
        phoneSrc="/screens-mobile/search.png"
        eyebrow="Solution · 01"
        title={<>One field. <em style={{ color: "#0071e3", fontStyle: "italic" }}>One decision.</em></>}
        body={<>Native autocomplete. Ida e volta or só ida. Departure, destination — that&apos;s it. No bouncing between screens, no losing state.</>}
      />

      {/* ═══════════ STICKY PHONE REVEAL — Calendar ═══════════ */}
      <StickyPhoneReveal
        phoneSrc="/screens-mobile/calendar.png"
        eyebrow="Solution · 02"
        title={<>A calendar<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>that feels native.</em></>}
        body={<>Range selection with proper highlighting. Months rendered ahead so scroll never breaks. CTA stays glued to the bottom with live context.</>}
      />

      {/* ═══════════ FULL GALLERY — phone grid cinematic ═══════════ */}
      <section style={{ background: "#000", padding: "10rem 2rem", overflow: "hidden" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "6rem", maxWidth: 700, margin: "0 auto 6rem" }}>
              <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>04 — Solution</p>
              <h2 style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.035em", lineHeight: 1.02, marginBottom: "1.5rem" }}>
                Native, by design.
              </h2>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.6)", lineHeight: 1.7 }}>
                Nine production screens. One cohesive native flow. A complete rewrite shipped in four months.
              </p>
            </div>
          </ScrollReveal>

          {/* Phone gallery — carousel on mobile, grid on desktop */}
          {isMobile ? (
            <HorizontalCarousel
              itemWidth={260}
              gap={20}
              items={[
                { src: "/screens-mobile/search.png",      label: "Search",            desc: "Native autocomplete" },
                { src: "/screens-mobile/calendar.png",    label: "Calendar",          desc: "Range with context CTA" },
                { src: "/screens-mobile/passengers.png",  label: "Passengers",        desc: "Adults · Children · Class" },
                { src: "/screens-mobile/resultado.png",   label: "Results — Outbound", desc: "Compact cards · Smart labels" },
                { src: "/screens-mobile/resultado2.png",  label: "Smart Labels",      desc: "Context-aware per card" },
                { src: "/screens-mobile/volta.png",       label: "Results — Return",  desc: "Outbound pinned · Running total" },
                { src: "/screens-mobile/filters.png",     label: "Filters",           desc: "Price histogram · Live count" },
                { src: "/screens-mobile/detail.png",      label: "Expanded Card",     desc: "Return inline · Itinerary" },
                { src: "/screens-mobile/upgrade.png",     label: "Native Upsell",     desc: "Básico · Intermediário · Premium" },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", color: "#fff" }}>
                  <div style={{ filter: "drop-shadow(0 30px 60px rgba(0,113,227,0.12)) drop-shadow(0 15px 30px rgba(0,0,0,0.5))" }}>
                    <Phone src={p.src} alt={p.label} w={220} />
                  </div>
                  <p style={{ fontSize: ".95rem", color: "#fff", marginTop: "1.25rem", fontWeight: 500 }}>{p.label}</p>
                  <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.55)", marginTop: ".35rem" }}>{p.desc}</p>
                </div>
              ))}
            />
          ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3rem 2rem" }}>
            {[
              { src: "/screens-mobile/search.png",      label: "Search",          desc: "Native autocomplete" },
              { src: "/screens-mobile/calendar.png",         label: "Calendar",        desc: "Range with context CTA" },
              { src: "/screens-mobile/passengers.png", label: "Passengers",      desc: "Adults · Children · Class" },
              { src: "/screens-mobile/resultado.png",   label: "Results — Outbound", desc: "Compact cards · Smart labels" },
              { src: "/screens-mobile/resultado2.png",  label: "Smart Labels",    desc: "Context-aware per card" },
              { src: "/screens-mobile/volta.png",       label: "Results — Return", desc: "Outbound pinned · Running total" },
              { src: "/screens-mobile/filters.png",     label: "Filters",         desc: "Price histogram · Live count" },
              { src: "/screens-mobile/detail.png",      label: "Expanded Card",   desc: "Return inline · Itinerary" },
              { src: "/screens-mobile/upgrade.png",     label: "Native Upsell",   desc: "Básico · Intermediário · Premium" },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={(i % 3) * 100}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div style={{
                    transition: "transform .5s cubic-bezier(.16,1,.3,1), filter .5s",
                    cursor: "pointer",
                    filter: "drop-shadow(0 40px 60px rgba(0,113,227,0.08)) drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-12px)";
                    (e.currentTarget as HTMLElement).style.filter = "drop-shadow(0 60px 80px rgba(0,113,227,0.18)) drop-shadow(0 30px 50px rgba(0,0,0,0.5))";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.filter = "drop-shadow(0 40px 60px rgba(0,113,227,0.08)) drop-shadow(0 20px 40px rgba(0,0,0,0.4))";
                  }}
                  >
                    <Phone src={p.src} alt={p.label} w={300} />
                  </div>
                  <p style={{ fontSize: "1rem", color: "#fff", marginTop: "1.75rem", fontWeight: 500 }}>{p.label}</p>
                  <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", marginTop: ".4rem" }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* ═══════════ PULL QUOTE 4 ═══════════ */}
      <PullQuote>
        The A/B test on card density was the project&apos;s hinge.<br />
        <em style={{ color: "#0071e3", fontStyle: "italic" }}>Compact cards won big enough to skip round 2.</em>
      </PullQuote>

      {/* ═══════════ 05 · VALIDATION ═══════════ */}
      <section style={{ background: "#000", padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "6rem", alignItems: "start", marginBottom: "5rem" }}>
            <ScrollReveal>
              <p className="t-eyebrow" style={{ color: "#0071e3" }}>05 — Validation</p>
              <h2 style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginTop: "1rem" }}>
                We tested it all.<br />The data decided.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                The most contested decision was card density. Product wanted more information above the fold. The data disagreed — <strong style={{ color: "#fff" }}>compact cards won on time-to-select and conversion</strong>.
              </p>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>
                The loading animation cross-sell was the surprise. We expected resistance. Users engaged with it instead — <strong style={{ color: "#fff" }}>+23% hotel revenue</strong> from the same session.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal type="scale">
            <MacBook src="/screens-desktop/mac-heuristica.png" alt="Heuristic" />
            <p style={{ marginTop: "1.5rem", fontSize: ".82rem", color: "rgba(255,255,255,.5)", textAlign: "center" }}>
              Dynamics analysis · Impediments (red) · Suggestions (yellow) · Possible (green)
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ CINEMATIC IMAGE — traveler ═══════════ */}
      <BigImageReveal
        src="/cinematic/traveler-window.jpg"
        alt="Traveler looking out window"
        minHeight="75vh"
        overlay={
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", marginBottom: "1.25rem" }}>
              Shipped in 4 months
            </p>
            <h2 style={{
              fontSize: "clamp(1.8rem, 5vw, 4.5rem)", fontWeight: 700,
              letterSpacing: "-.03em", lineHeight: 1.05, color: "#fff",
              maxWidth: 900, margin: "0 auto",
            }}>
              The journey starts<br />
              with one tap.
            </h2>
          </ScrollReveal>
        }
      />

      {/* ═══════════ FINAL IMPACT — massive numbers ═══════════ */}
      <section style={{ background: "#000", padding: "12rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>06 — Impact</p>
            <h2 style={{ fontSize: "clamp(2.5rem,6vw,6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.035em", lineHeight: 1.02, marginBottom: "5rem" }}>
              The numbers, in full.
            </h2>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            {[
              { before: "App Store Rating",    num: "4.6★",  sub: "from 2.0",      detail: "+130% improvement" },
              { before: "Checkout Conversion", num: "+212%", sub: "from 6% → 20%", detail: "shipped in 4 months" },
              { before: "Hotel cross-sell",    num: "+23%",  sub: "same session",   detail: "loading-screen bet" },
              { before: "Load time",           num: "6s",    sub: "from 40s",       detail: "85% reduction" },
              { before: "Tap-to-result",       num: "2.1s",  sub: "first paint",   detail: "vs 12s previously" },
              { before: "Daily active users",  num: "+47%",  sub: "post launch",   detail: "in 90 days" },
            ].map((m, i) => (
              <ScrollReveal key={i} delay={(i % 3) * 100}>
                <div style={{ background: "#0a0a0a", padding: "4rem 2rem", textAlign: "center", height: "100%", transition: "background .3s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#111")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}
                >
                  <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", marginBottom: "1rem", letterSpacing: ".05em" }}>{m.before}</p>
                  <div style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 700, letterSpacing: "-.04em", color: "#0071e3", margin: ".5rem 0", lineHeight: 1 }}>
                    {m.num}
                  </div>
                  <p style={{ fontSize: ".95rem", color: "#fff", fontWeight: 500, marginTop: "1rem" }}>{m.sub}</p>
                  <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.4)", marginTop: ".35rem" }}>{m.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p style={{
              maxWidth: 800, margin: "6rem auto 0",
              fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "rgba(255,255,255,.9)",
              fontWeight: 500, fontStyle: "italic", lineHeight: 1.4,
            }}>
              &ldquo;Load time dropped from 40 seconds to 6.<br />
              <span style={{ color: "#0071e3", fontStyle: "normal", fontWeight: 600 }}>Not because we optimized the webview — because we replaced it entirely.</span>&rdquo;
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ 07 · REFLECTION ═══════════ */}
      <section style={{ background: "#0a0a0a", padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }}>
            <ScrollReveal>
              <p className="t-eyebrow" style={{ color: "#0071e3" }}>07 — Reflection</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginTop: "1rem" }}>
                What I&apos;d do<br />differently.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.7)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                <strong style={{ color: "#fff" }}>The architectural call was everything.</strong> Going native wasn&apos;t a design decision — it was a product strategy decision. Getting cross-functional alignment on it early was the highest-leverage action I took.
              </p>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                <strong style={{ color: "#fff" }}>Use research that already exists.</strong> The team had mapped the pain points. The temptation is to restart everything and call it discovery. That would have cost six weeks and revealed nothing new.
              </p>
              <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.45)", lineHeight: 1.7 }}>
                If I were doing this again, I&apos;d push for a price-alert notification strategy on day one. We built a native app with no meaningful push layer. Users told us price-drop alerts were their most-wanted feature. That was real revenue left on the table.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section style={{ background: "#000", padding: "12rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,113,227,.15) 0%, transparent 60%)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "2rem" }}>What&apos;s next</p>
            <h2 style={{
              fontSize: "clamp(2.5rem,6vw,6rem)", fontWeight: 700,
              color: "#fff", letterSpacing: "-.035em", lineHeight: 1.02,
              marginBottom: "2.5rem", maxWidth: 900, margin: "0 auto 2.5rem",
            }}>
              Let&apos;s build something<br />
              <em style={{ color: "#0071e3", fontStyle: "italic" }}>worth shipping.</em>
            </h2>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-blue" style={{ fontSize: "1rem", padding: ".9rem 2.5rem" }}>Get in touch</Link>
              <Link href="/" className="btn-white-ghost" style={{ fontSize: "1rem", padding: ".9rem 2.5rem" }}>← All work</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.08)", padding: "2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)" }}>Copyright © 2025 Rafael Guimarães. All rights reserved.</p>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="https://linkedin.com/in/rafaelgdesign" target="_blank" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>LinkedIn</a>
            <a href="mailto:rafael@rafaelgdesign.com" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>Email</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollMouse {
          0% { opacity: 1; transform: translate(-50%, 0); }
          50% { opacity: 0.3; transform: translate(-50%, 14px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (max-width: 860px) {
          section { padding: 5rem 1.5rem !important; }
          [style*="grid-template-columns"] { grid-template-columns: 1fr !important; gap: 2rem !important; }
          [style*="grid-template-columns:repeat(2"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns:repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
