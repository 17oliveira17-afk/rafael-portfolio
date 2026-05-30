"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, ReactNode } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import IPhone from "../../components/IPhone";
import MacBook from "../../components/MacBook";
import useIsMobile from "../../components/useIsMobile";
import HorizontalCarousel from "../../components/HorizontalCarousel";
import BigImageReveal from "../../components/BigImageReveal";

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

/* ── Pull Quote ── */
function PullQuote({ children }: { children: ReactNode }) {
  return (
    <section style={{ background: "#000", padding: "10rem 2rem", textAlign: "center" }}>
      <ScrollReveal>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontSize: "clamp(1.8rem,3.6vw,3.4rem)", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-.02em", color: "#fff" }}>
            {children}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ── Apple-style Side-by-Side: text + phone ── */
function PhoneFeature({
  eyebrow, title, body, phoneSrc, phoneAlt = "", flip = false,
}: {
  eyebrow: string; title: ReactNode; body: ReactNode; phoneSrc: string; phoneAlt?: string; flip?: boolean;
}) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <section style={{ background: "#000", padding: "6rem 1.5rem" }}>
        <ScrollReveal>
          <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1rem" }}>{eyebrow}</p>
          <h2 style={{ fontSize: "clamp(2rem,7vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>{title}</h2>
          <div style={{ fontSize: "1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: "3rem" }}>{body}</div>
        </ScrollReveal>
        <ScrollReveal type="scale">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IPhone src={phoneSrc} alt={phoneAlt} width={260} />
          </div>
        </ScrollReveal>
      </section>
    );
  }

  const textCol = (
    <ScrollReveal>
      <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.25rem" }}>{eyebrow}</p>
      <h2 style={{ fontSize: "clamp(2.2rem,3.5vw,3.8rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.75rem" }}>{title}</h2>
      <div style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.75 }}>{body}</div>
    </ScrollReveal>
  );

  const phoneCol = (
    <ScrollReveal type="scale" delay={100}>
      <div style={{ display: "flex", justifyContent: "center", filter: "drop-shadow(0 60px 100px rgba(0,113,227,0.15)) drop-shadow(0 30px 60px rgba(0,0,0,0.5))" }}>
        <IPhone src={phoneSrc} alt={phoneAlt} width={320} />
      </div>
    </ScrollReveal>
  );

  return (
    <section style={{ background: "#000", padding: "8rem 2rem", borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        {flip ? <>{phoneCol}{textCol}</> : <>{textCol}{phoneCol}</>}
      </div>
    </section>
  );
}

/* ── Apple-style Side-by-Side: text + macbook ── */
function MacFeature({
  eyebrow, title, body, macSrc, macAlt = "", caption = "", flip = false,
}: {
  eyebrow: string; title: ReactNode; body: ReactNode; macSrc: string; macAlt?: string; caption?: string; flip?: boolean;
}) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <section style={{ background: "#000", padding: "6rem 1.5rem", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <ScrollReveal>
          <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1rem" }}>{eyebrow}</p>
          <h2 style={{ fontSize: "clamp(1.8rem,7vw,2.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.025em", lineHeight: 1.1, marginBottom: "1.25rem" }}>{title}</h2>
          <div style={{ fontSize: "1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: "2.5rem" }}>{body}</div>
        </ScrollReveal>
        <ScrollReveal type="scale">
          <MacBook src={macSrc} alt={macAlt} />
          {caption && <p style={{ marginTop: "1rem", fontSize: ".78rem", color: "rgba(255,255,255,.45)", textAlign: "center" }}>{caption}</p>}
        </ScrollReveal>
      </section>
    );
  }

  const textCol = (
    <ScrollReveal>
      <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.25rem" }}>{eyebrow}</p>
      <h2 style={{ fontSize: "clamp(2rem,3vw,3.2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.75rem" }}>{title}</h2>
      <div style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.65)", lineHeight: 1.75 }}>{body}</div>
    </ScrollReveal>
  );

  const macCol = (
    <ScrollReveal type="scale" delay={100}>
      <MacBook src={macSrc} alt={macAlt} />
      {caption && <p style={{ marginTop: "1rem", fontSize: ".78rem", color: "rgba(255,255,255,.45)", textAlign: "center" }}>{caption}</p>}
    </ScrollReveal>
  );

  return (
    <section style={{ background: "#000", padding: "8rem 2rem", borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: flip ? "1.6fr 1fr" : "1fr 1.6fr", gap: "5rem", alignItems: "center" }}>
        {flip ? <>{macCol}{textCol}</> : <>{textCol}{macCol}</>}
      </div>
    </section>
  );
}

/* ── Cinematic Hero ── */
function CinematicHero() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const total = ref.current.offsetHeight - window.innerHeight;
      setP(Math.max(0, Math.min(1, -r.top / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (isMobile) {
    return (
      <section style={{ minHeight: "100vh", background: "#000", display: "flex", flexDirection: "column", padding: "8rem 1.5rem 3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 50% at 50% 50%, rgba(0,113,227,.18) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ textAlign: "center", position: "relative", zIndex: 2, marginBottom: "3rem" }}>
          <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.25rem", opacity: 0, animation: "fadeUp .9s ease .2s forwards" }}>Case Study · CVC Corp · 2021—2022</p>
          <h1 style={{ fontSize: "clamp(2.5rem,11vw,4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.035em", lineHeight: 1, marginBottom: "1.25rem", opacity: 0, animation: "fadeUp 1.1s ease .4s forwards" }}>
            From <em style={{ color: "#0071e3", fontStyle: "italic" }}>two stars</em><br />to category-defining.
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.6, opacity: 0, animation: "fadeUp .9s ease .6s forwards" }}>
            Brazil&apos;s largest travel company. A flight booking app rebuilt from the architecture up.
          </p>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", opacity: 0, animation: "fadeUp 1.2s ease .9s forwards" }}>
          <div style={{ filter: "drop-shadow(0 40px 80px rgba(0,113,227,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.7))" }}>
            <IPhone src="/screens-mobile/ip-resultado.png" alt="CVC flight results" width={260} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginTop: "2rem", padding: "1.5rem 0", borderTop: "1px solid rgba(255,255,255,.08)", opacity: 0, animation: "fadeUp .9s ease 1.1s forwards" }}>
          {[{ v: "4.6★", l: "Rating" }, { v: "+212%", l: "Conversion" }, { v: "6s", l: "Load time" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>{s.v}</div>
              <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.5)", marginTop: ".3rem", textTransform: "uppercase", letterSpacing: ".1em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} style={{ height: "220vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,113,227,${.18 - p * .12}) 0%, transparent 65%)` }} />

        {/* Floating phones — mix-blend-mode:lighten removes black background */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 + p * 0.4}) translateY(${-p * 80}px)`, opacity: 1 - p * 0.7 }}>
          <div style={{ position: "absolute", transform: `translate(-300px, 40px) rotate(-14deg) translateY(${p * -30}px)`, opacity: 0.5, filter: "blur(1.5px)", mixBlendMode: "lighten" }}><IPhone src="/screens-mobile/ip-calendar.png" alt="" width={220} /></div>
          <div style={{ position: "absolute", transform: `translate(300px, 50px) rotate(14deg) translateY(${p * -30}px)`, opacity: 0.5, filter: "blur(1.5px)", mixBlendMode: "lighten" }}><IPhone src="/screens-mobile/ip-upgrade.png" alt="" width={220} /></div>
          <div style={{ position: "absolute", transform: `translate(-165px, 0px) rotate(-7deg)`, opacity: 0.75, mixBlendMode: "lighten" }}><IPhone src="/screens-mobile/ip-search.png" alt="" width={260} /></div>
          <div style={{ position: "absolute", transform: `translate(165px, 0px) rotate(7deg)`, opacity: 0.75, mixBlendMode: "lighten" }}><IPhone src="/screens-mobile/ip-filters.png" alt="" width={260} /></div>
          <div style={{ position: "relative", zIndex: 10, filter: "drop-shadow(0 60px 100px rgba(0,113,227,0.35))" }}>
            <IPhone src="/screens-mobile/ip-resultado.png" alt="CVC flight results" width={300} />
          </div>
        </div>

        {/* Headline — bottom of screen, não compete com phones */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20, textAlign: "center", padding: "0 2rem 6rem", opacity: 1 - p * 1.8, transform: `translateY(${p * -40}px)`, pointerEvents: p > 0.5 ? "none" : "auto", background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}>
          <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1rem", opacity: 0, animation: "fadeUp .9s ease .3s forwards" }}>Case Study · CVC Corp · 2021—2022</p>
          <h1 style={{ fontSize: "clamp(2.2rem,5.5vw,6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.035em", lineHeight: 1, marginBottom: "1.25rem", opacity: 0, animation: "fadeUp 1.1s ease .55s forwards", textShadow: "0 2px 40px rgba(0,0,0,0.8)" }}>
            From <em style={{ color: "#0071e3", fontStyle: "italic" }}>two stars</em><br />to category-defining.
          </h1>
          <p style={{ fontSize: "clamp(.9rem,1.2vw,1.1rem)", color: "rgba(255,255,255,.8)", maxWidth: 540, margin: "0 auto", lineHeight: 1.6, opacity: 0, animation: "fadeUp .9s ease .8s forwards", textShadow: "0 1px 20px rgba(0,0,0,0.9)" }}>
            Brazil&apos;s largest travel company needed a mobile flight booking experience that actually worked. I rebuilt it from the architecture up.
          </p>
        </div>


      </div>
    </div>
  );
}

/* ── Impact Strip ── */
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
            <div style={{ fontSize: "clamp(3.5rem,8vw,6rem)", fontWeight: 700, letterSpacing: "-.04em", color: m.color, lineHeight: 1 }}>
              {m.num === 4.6 ? <><Counter to={4} />.<Counter to={6} />★</> : <Counter to={m.num} prefix={m.prefix || ""} suffix={m.suffix || ""} />}
            </div>
            <p style={{ fontSize: ".95rem", color: "#fff", marginTop: "1rem", fontWeight: 500 }}>{m.label}</p>
            <p style={{ fontSize: ".78rem", color: "#86868b", marginTop: ".35rem" }}>{m.sub}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */
export default function CVCPage() {
  const isMobile = useIsMobile();
  useEffect(() => {
    document.body.classList.add("dark-cursor");
    return () => document.body.classList.remove("dark-cursor");
  }, []);

  return (
    <main className="page-in" style={{ background: "#000" }}>

      {/* HERO */}
      <CinematicHero />

      {/* CINEMATIC IMAGE */}
      <BigImageReveal
        src="/cinematic/airport-sunset.jpg"
        alt="Airplane wing at sunset"
        minHeight="80vh"
        overlay={
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.85)", marginBottom: "1.25rem" }}>30 million customers</p>
            <h2 style={{ fontSize: "clamp(2rem,6vw,5rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.05, color: "#fff", maxWidth: 900, margin: "0 auto" }}>
              Built for the people who actually travel.
            </h2>
          </ScrollReveal>
        }
      />

      {/* IMPACT */}
      <ImpactStrip />

      {/* PULL QUOTE 1 */}
      <PullQuote>
        It started with a <em style={{ color: "#0071e3", fontStyle: "italic" }}>2-star rating</em>, 40-second loads,<br />and a checkout conversion stuck at 6%.
      </PullQuote>

      {/* ═══ 01 · CONTEXT ═══ */}
      <section style={{ background: "#000", padding: "10rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: "6rem", alignItems: "start", marginBottom: "6rem" }}>
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

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            {[
              { n: "01", title: "Webview wrapped as native", desc: "Entire booking flow lived in a webview. 40-second loads, layout shifts on every scroll, no native gestures." },
              { n: "02", title: "Combined outbound + return", desc: "Both directions in one card. Users processed two decisions simultaneously — cognitive overload before commitment." },
              { n: "03", title: "Search engine everywhere", desc: "The search form reappeared between every step. Users navigated back 4+ times to change a single field." },
              { n: "04", title: "Zero native capabilities", desc: "No haptics, no GPS, no push notifications. A product that felt like it didn't belong on a phone." },
            ].map((c, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{ background: "#0a0a0a", padding: "3rem 2.5rem", height: "100%", transition: "background .3s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#111")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}
                >
                  <p style={{ fontSize: ".7rem", color: "#0071e3", fontWeight: 600, letterSpacing: ".12em", marginBottom: "1.25rem" }}>{c.n}</p>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "#fff", fontWeight: 600 }}>{c.title}</h3>
                  <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE 2 */}
      <PullQuote>
        Every top travel app shared three patterns.<br />
        <em style={{ color: "#0071e3", fontStyle: "italic" }}>CVC was doing the opposite of all three.</em>
      </PullQuote>

      {/* ═══ 02 · DISCOVERY ═══ */}
      <MacFeature
        eyebrow="02 — Discovery"
        title={<>I studied the<br />best in the world.</>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Hopper 4.8. Kayak 4.8. Skyscanner 4.8. AvisaSales 4.7. Every category leader shared three structural decisions — separated outbound/return, native search, and smart progressive disclosure.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>I mapped every screen of the top 4 competitors and identified where CVC diverged from patterns users already knew.</p>
        </>}
        macSrc="/screens-desktop/mac-benchmark.png"
        macAlt="Competitive benchmark"
        caption="Competitive benchmark · The 4 top-rated travel apps in 2021"
      />

      <MacFeature
        eyebrow="02 — Discovery"
        title={<>Pain points mapped.<br />Opportunities ranked.</>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>The team had existing usability test recordings. Rather than restart research, I synthesized what already existed — impediments in red, suggestions in yellow, open opportunities in green.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>Three critical pain points emerged clearly: the search flow, result card density, and the absence of upgrade/upsell in the native journey.</p>
        </>}
        macSrc="/screens-desktop/mac-heuristica.png"
        macAlt="Heuristic analysis"
        caption="Heuristic analysis · Impediments · Suggestions · Opportunities"
        flip
      />

      {/* PULL QUOTE 3 */}
      <PullQuote>
        Seven interruptions before seeing a single flight result.<br />
        <em style={{ color: "#0071e3", fontStyle: "italic" }}>That was the old flow.</em>
      </PullQuote>

      {/* ═══ 03 · ARCHITECTURE ═══ */}
      <MacFeature
        eyebrow="03 — Architecture"
        title={<>Fluxo atual vs.<br />Fluxo ideal.</>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>The old flow bounced users through the search engine after every input. The new flow collapses search into a single guided native step — departure, destination, dates, passengers. One screen. One decision.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>Then outbound and return are presented as two separate decisions, with the chosen outbound pinned at the top. Loading time becomes a cross-sell moment.</p>
        </>}
        macSrc="/screens-desktop/mac-flow.png"
        macAlt="Navigation flow"
        caption="Navigation flow · Current vs ideal · Mapped from usability tests"
      />

      <MacFeature
        eyebrow="03 — Architecture"
        title={<>Wireframes:<br />The full journey.</>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Every screen of the new flow wireframed before a single pixel of final UI was drawn. Home → Search → Calendar → Passengers → Loading → Outbound → Return → Upsell → Confirmation.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>The wireframe phase revealed two decisions that nearly didn&apos;t make it in: the filters drawer and the inline itinerary expansion. Both ended up being differentiators in the A/B test.</p>
        </>}
        macSrc="/screens-desktop/mac-wireframes.png"
        macAlt="Wireframe flow"
        caption="Wireframe flow · All 9 screens before visual design began"
        flip
      />

      <MacFeature
        eyebrow="03 — Architecture"
        title={<>Dynamics:<br />The prototype.</>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>With the architecture locked, I built a high-fidelity prototype covering the complete booking flow. This became the primary artifact for stakeholder alignment and the usability test stimulus.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>The prototype revealed one critical issue before development: the return selection needed the outbound always visible. A change that saved us weeks of post-launch iteration.</p>
        </>}
        macSrc="/screens-desktop/mac-dynamics.png"
        macAlt="High fidelity prototype"
        caption="High-fidelity prototype · Used for usability testing and dev handoff"
      />

      {/* ═══ 04 · SOLUTION — Apple-style phone features ═══ */}
      <PhoneFeature
        eyebrow="04 — Solution · Search"
        title={<>One field.<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>One decision.</em></>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Native autocomplete. Ida e volta or só ida. Departure and destination on a single screen with real-time suggestions — no bouncing through a web search engine.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>The swap button (⇄) lets users reverse origin and destination in one tap. Small detail, big NPS impact.</p>
        </>}
        phoneSrc="/screens-mobile/ip-search.png"
        phoneAlt="Search screen"
      />

      <PhoneFeature
        eyebrow="04 — Solution · Calendar"
        title={<>A calendar<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>that feels native.</em></>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Range selection with proper visual highlighting. Multiple months rendered ahead so scrolling never breaks. Limpar to reset. The CTA is always visible with live context of dates selected.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>The calendar replaced a webview date picker that loaded in 8 seconds and had no range selection at all.</p>
        </>}
        phoneSrc="/screens-mobile/ip-calendar.png"
        phoneAlt="Calendar screen"
        flip
      />

      <PhoneFeature
        eyebrow="04 — Solution · Passengers"
        title={<>Passengers<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>and class. Native.</em></>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Adults, children, infants — with proper age groupings. Economy vs Executive with clear visual selection. Stops filter baked in. Continuar always visible.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>Previously this was three separate webview screens. Now it&apos;s one native screen. Search setup time dropped from 45s to under 12s.</p>
        </>}
        phoneSrc="/screens-mobile/ip-passengers.png"
        phoneAlt="Passengers screen"
      />

      <PhoneFeature
        eyebrow="04 — Solution · Results"
        title={<>Compact cards.<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>Fast decisions.</em></>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Smart labels — Mais barato, Mala grande, Voo direto — surfaced at card level so users never need to open a flight to understand it. Price, airline, stops and time in one glance.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>The live search refresh counter (Sua pesquisa atualiza em 19:32) creates urgency and reassures users prices are real-time.</p>
        </>}
        phoneSrc="/screens-mobile/ip-resultado.png"
        phoneAlt="Results screen"
        flip
      />

      <PhoneFeature
        eyebrow="04 — Solution · Filters"
        title={<>Filters that<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>actually work.</em></>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Price histogram with dual-handle range. Flight duration slider. Stops filter with visual icons. Live result count on the CTA — "Ver 60 resultados" — so users always know what they&apos;ll get.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>Filter usage in the first month: 43% of users. The old webview filters were used by less than 8%.</p>
        </>}
        phoneSrc="/screens-mobile/ip-filters.png"
        phoneAlt="Filters screen"
      />

      <PhoneFeature
        eyebrow="04 — Solution · Card detail"
        title={<>Expand a card.<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>See everything.</em></>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Tapping a card expands inline — no new screen. Voos de volta shown immediately. Itinerary, baggage policy, class, and CTA in one glance. Escolher ida commits to outbound.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>The inline expansion pattern was the most A/B tested feature. It reduced back-navigation by 62% compared to the previous full-screen detail page.</p>
        </>}
        phoneSrc="/screens-mobile/ip-detail.png"
        phoneAlt="Card detail"
        flip
      />

      <PhoneFeature
        eyebrow="04 — Solution · Return"
        title={<>Return flight.<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>Context always visible.</em></>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>The chosen outbound is pinned at the top with price. Choosing a return shows the running total immediately. Two decisions, one coherent flow — no second search engine, no state reset.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>Separating outbound and return into two sequential decisions was the single biggest driver of the +212% conversion improvement.</p>
        </>}
        phoneSrc="/screens-mobile/ip-volta.png"
        phoneAlt="Return flight selection"
      />

      <PhoneFeature
        eyebrow="04 — Solution · Upsell"
        title={<>Upgrade moment.<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>Built for conversion.</em></>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Sem upgrades, Básico, Intermediário, Premium — each with clear feature differentiators and running total. The Recomendado badge surfaces the highest-revenue option without hard-selling.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>The upsell screen was the stakeholder&apos;s biggest ask. We made it native and non-intrusive. Upgrade rate exceeded the webview version by 3.1×.</p>
        </>}
        phoneSrc="/screens-mobile/ip-upgrade.png"
        phoneAlt="Upgrade screen"
        flip
      />

      <PhoneFeature
        eyebrow="04 — Solution · Confirmation"
        title={<>Confirmation.<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>Clear itinerary.</em></>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Every leg of the journey shown in timeline format. Airline, flight number, class, layover time — all visible before committing. Confirmar is the final action.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>Booking abandonment at the confirmation step dropped from 34% to 11% after this redesign.</p>
        </>}
        phoneSrc="/screens-mobile/ip-confirma.png"
        phoneAlt="Confirmation screen"
      />

      {/* ═══ FULL GALLERY ═══ */}
      <section style={{ background: "#000", padding: "10rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "6rem", maxWidth: 700, margin: "0 auto 6rem" }}>
              <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>All screens</p>
              <h2 style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.035em", lineHeight: 1.02, marginBottom: "1.5rem" }}>
                Nine screens.<br />One native flow.
              </h2>
            </div>
          </ScrollReveal>

          {isMobile ? (
            <HorizontalCarousel
              itemWidth={240}
              gap={16}
              items={[
                { src: "/screens-mobile/ip-search.png", label: "Search", desc: "Native autocomplete" },
                { src: "/screens-mobile/ip-calendar.png", label: "Calendar", desc: "Range selection" },
                { src: "/screens-mobile/ip-passengers.png", label: "Passengers", desc: "Class + stops" },
                { src: "/screens-mobile/ip-resultado.png", label: "Results", desc: "Smart labels" },
                { src: "/screens-mobile/ip-filters.png", label: "Filters", desc: "Live count" },
                { src: "/screens-mobile/ip-detail.png", label: "Detail", desc: "Inline expand" },
                { src: "/screens-mobile/ip-volta.png", label: "Return", desc: "Pinned outbound" },
                { src: "/screens-mobile/ip-upgrade.png", label: "Upsell", desc: "3 tiers" },
                { src: "/screens-mobile/ip-confirma.png", label: "Confirm", desc: "Full itinerary" },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", color: "#fff" }}>
                  <IPhone src={p.src} alt={p.label} width={210} />
                  <p style={{ fontSize: ".9rem", color: "#fff", marginTop: "1rem", fontWeight: 500 }}>{p.label}</p>
                  <p style={{ fontSize: ".75rem", color: "rgba(255,255,255,.5)", marginTop: ".3rem" }}>{p.desc}</p>
                </div>
              ))}
            />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
              {[
                { src: "/screens-mobile/ip-search.png", label: "Search", desc: "Native autocomplete" },
                { src: "/screens-mobile/ip-calendar.png", label: "Calendar", desc: "Range selection" },
                { src: "/screens-mobile/ip-passengers.png", label: "Passengers", desc: "Class + stops" },
                { src: "/screens-mobile/ip-resultado.png", label: "Results", desc: "Smart labels" },
                { src: "/screens-mobile/ip-filters.png", label: "Filters", desc: "Live count" },
                { src: "/screens-mobile/ip-detail.png", label: "Detail", desc: "Inline expand" },
                { src: "/screens-mobile/ip-volta.png", label: "Return", desc: "Pinned outbound" },
                { src: "/screens-mobile/ip-upgrade.png", label: "Upsell", desc: "3 tiers" },
                { src: "/screens-mobile/ip-confirma.png", label: "Confirm", desc: "Full itinerary" },
              ].map((ph, i) => (
                <ScrollReveal key={i} delay={(i % 3) * 80}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div style={{ transition: "transform .4s cubic-bezier(.16,1,.3,1), filter .4s", filter: "drop-shadow(0 40px 60px rgba(0,113,227,0.08)) drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-10px)"; (e.currentTarget as HTMLElement).style.filter = "drop-shadow(0 60px 80px rgba(0,113,227,0.18)) drop-shadow(0 30px 50px rgba(0,0,0,0.5))"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.filter = "drop-shadow(0 40px 60px rgba(0,113,227,0.08)) drop-shadow(0 20px 40px rgba(0,0,0,0.4))"; }}
                    >
                      <IPhone src={ph.src} alt={ph.label} width={290} />
                    </div>
                    <p style={{ fontSize: "1rem", color: "#fff", marginTop: "1.5rem", fontWeight: 500 }}>{ph.label}</p>
                    <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.5)", marginTop: ".35rem" }}>{ph.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PULL QUOTE 4 */}
      <PullQuote>
        The A/B test on card density was the project&apos;s hinge.<br />
        <em style={{ color: "#0071e3", fontStyle: "italic" }}>Compact cards won big enough to skip round 2.</em>
      </PullQuote>

      {/* ═══ 05 · VALIDATION ═══ */}
      <MacFeature
        eyebrow="05 — Validation"
        title={<>We tested it.<br />The data decided.</>}
        body={<>
          <p style={{ marginBottom: "1rem" }}>Three rounds of Maze testing. 45 participants. The most contested decision was card density — product wanted more information above the fold. Compact cards won on time-to-select and conversion rate.</p>
          <p style={{ color: "rgba(255,255,255,.5)" }}>The loading animation cross-sell was the surprise. We expected resistance. Users engaged with it — +23% hotel revenue from the same session.</p>
        </>}
        macSrc="/screens-desktop/mac-abtest.png"
        macAlt="A/B test results"
        caption="A/B test · Maze · 45 participants · 3 rounds"
      />

      {/* CINEMATIC IMAGE */}
      <BigImageReveal
        src="/cinematic/traveler-window.jpg"
        alt="Traveler looking out window"
        minHeight="75vh"
        overlay={
          <ScrollReveal>
            <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", marginBottom: "1.25rem" }}>Shipped in 4 months</p>
            <h2 style={{ fontSize: "clamp(1.8rem,5vw,4.5rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.05, color: "#fff", maxWidth: 900, margin: "0 auto" }}>
              The journey starts<br />with one tap.
            </h2>
          </ScrollReveal>
        }
      />

      {/* ═══ 06 · IMPACT ═══ */}
      <section style={{ background: "#000", padding: "12rem 2rem", borderTop: "1px solid rgba(255,255,255,.06)", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>06 — Impact</p>
            <h2 style={{ fontSize: "clamp(2.5rem,6vw,6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.035em", lineHeight: 1.02, marginBottom: "5rem" }}>The numbers, in full.</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            {[
              { label: "App Store Rating", num: "4.6★", sub: "from 2.0", detail: "+130% improvement" },
              { label: "Checkout Conversion", num: "+212%", sub: "from 6% → 20%", detail: "shipped in 4 months" },
              { label: "Hotel cross-sell", num: "+23%", sub: "same session", detail: "loading-screen bet" },
              { label: "Load time", num: "6s", sub: "from 40s", detail: "85% reduction" },
              { label: "Booking abandonment", num: "-68%", sub: "at confirmation", detail: "from 34% → 11%" },
              { label: "Filter usage", num: "+435%", sub: "vs webview", detail: "43% of users" },
            ].map((m, i) => (
              <ScrollReveal key={i} delay={(i % 3) * 100}>
                <div style={{ background: "#0a0a0a", padding: "4rem 2rem", textAlign: "center", height: "100%", transition: "background .3s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#111")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}
                >
                  <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", marginBottom: "1rem", letterSpacing: ".05em" }}>{m.label}</p>
                  <div style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 700, letterSpacing: "-.04em", color: "#0071e3", margin: ".5rem 0", lineHeight: 1 }}>{m.num}</div>
                  <p style={{ fontSize: ".95rem", color: "#fff", fontWeight: 500, marginTop: "1rem" }}>{m.sub}</p>
                  <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.4)", marginTop: ".35rem" }}>{m.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 07 · REFLECTION ═══ */}
      <section style={{ background: "#0a0a0a", padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: "5rem", alignItems: "start" }}>
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
                <strong style={{ color: "#fff" }}>Use research that already exists.</strong> The team had mapped the pain points. The temptation is to restart everything. That would have cost six weeks and revealed nothing new.
              </p>
              <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.45)", lineHeight: 1.7 }}>
                If I were doing this again, I&apos;d push for a price-alert notification strategy on day one. We built a native app with no meaningful push layer. Users told us price-drop alerts were their most-wanted feature. Real revenue left on the table.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ background: "#000", padding: "12rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,113,227,.15) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "2rem" }}>What&apos;s next</p>
            <h2 style={{ fontSize: "clamp(2.5rem,6vw,6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.035em", lineHeight: 1.02, marginBottom: "2.5rem", maxWidth: 900, margin: "0 auto 2.5rem" }}>
              Let&apos;s build something<br /><em style={{ color: "#0071e3", fontStyle: "italic" }}>worth shipping.</em>
            </h2>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-blue" style={{ fontSize: "1rem", padding: ".9rem 2.5rem" }}>Get in touch</Link>
              <Link href="/" className="btn-white-ghost" style={{ fontSize: "1rem", padding: ".9rem 2.5rem" }}>← All work</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

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
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
          [style*="grid-template-columns: 1fr 1.6fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
          [style*="grid-template-columns: 1.6fr 1fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
          [style*="grid-template-columns: 1fr 1.4fr"] { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
