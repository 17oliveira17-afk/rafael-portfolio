"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "../../components/ScrollReveal";

/* ───────── Counter ───────── */
function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 2000;
        const s = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - s) / dur, 1);
          setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
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

/* ───────── Phone / Mac wrappers ───────── */
function Phone({ src, alt, w = 280, style = {} }: { src: string; alt: string; w?: number; style?: React.CSSProperties }) {
  const ratio = 1324 / 644; // iPhone mockup ratio
  const h = w * ratio;
  return (
    <div style={{ width: w, height: h, position: "relative", ...style }}>
      <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} priority />
    </div>
  );
}

function MacBook({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <ScrollReveal>
      <div style={{ position: "relative", width: "100%", maxWidth: 1100, margin: "0 auto" }}>
        <Image src={src} alt={alt} width={2200} height={1340}
          style={{ width: "100%", height: "auto", display: "block" }} />
        {caption && (
          <p style={{ marginTop: "1rem", fontSize: ".82rem", color: "#86868b", textAlign: "center", lineHeight: 1.6 }}>{caption}</p>
        )}
      </div>
    </ScrollReveal>
  );
}

/* ═════════════ PAGE ═════════════ */
export default function CVCPage() {
  const phonesRef = useRef<HTMLDivElement>(null);

  /* Parallax hero phones */
  useEffect(() => {
    const fn = () => {
      if (!phonesRef.current) return;
      const y = window.scrollY;
      if (y < window.innerHeight)
        phonesRef.current.style.transform = `translateY(${y * 0.18}px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Dark cursor on dark sections */
  useEffect(() => {
    document.body.classList.add("dark-cursor");
    return () => document.body.classList.remove("dark-cursor");
  }, []);

  return (
    <main className="page-in">

      {/* ══════════════════════════════════════════════
          HERO — black, Apple-style centered
      ══════════════════════════════════════════════ */}
      <section className="section-black" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "10rem 2rem 6rem", position: "relative", overflow: "hidden",
      }}>
        {/* Glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,113,227,.15) 0%, transparent 50%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
          <p className="t-eyebrow hero-line" style={{ color: "#0071e3", marginBottom: "1.5rem", opacity: 0, animation: "fadeUp .8s ease .2s forwards" }}>
            Case Study · CVC Corp · 2021—2022
          </p>
          <h1 className="t-hero-white hero-line" style={{ marginBottom: "1.5rem", opacity: 0, animation: "fadeUp 1s ease .4s forwards" }}>
            A 2-star app,<br />redesigned from zero.
          </h1>
          <p className="t-body-white hero-line" style={{ maxWidth: 540, margin: "0 auto 3rem", opacity: 0, animation: "fadeUp .9s ease .6s forwards" }}>
            How I rebuilt the flight booking experience for Brazil's largest travel company — from a 40-second webview to a native flow that took conversion from 6% to 20%.
          </p>

          {/* Stats inline */}
          <div className="hero-line" style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap", opacity: 0, animation: "fadeUp .8s ease .8s forwards" }}>
            {[
              { num: "4.6★", label: "App Store rating" },
              { num: "+212%", label: "Checkout conversion" },
              { num: "6s", label: "Native load time" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.02em", lineHeight: 1 }}>{s.num}</div>
                <p style={{ fontSize: ".75rem", color: "rgba(255,255,255,.5)", marginTop: ".5rem", letterSpacing: ".05em", textTransform: "uppercase" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating phones — bottom */}
        <div ref={phonesRef} style={{ marginTop: "5rem", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "nowrap", maxWidth: "100%", opacity: 0, animation: "fadeUp 1.2s ease 1s forwards", willChange: "transform" }}>
          <Phone src="/cvc-phone-search.png"    alt="Search screen"  w={200} style={{ transform: "translateY(40px) rotate(-3deg)" }} />
          <Phone src="/cvc-phone-resultado.png" alt="Results screen" w={220} />
          <Phone src="/cvc-phone-filters.png"   alt="Filters screen" w={200} style={{ transform: "translateY(40px) rotate(3deg)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          01 · CONTEXT — white
      ══════════════════════════════════════════════ */}
      <section className="section-white" style={{ padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }}>
            <ScrollReveal>
              <p className="t-eyebrow">01 — Context</p>
              <h2 className="t-section-title" style={{ marginTop: "1rem" }}>
                The problem was deeper<br />than performance.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="t-body" style={{ marginBottom: "1.5rem" }}>
                CVC is Brazil's largest travel company — 30 million customers, thousands of stores, and a digital product that hadn't caught up. The mobile flights experience was an afterthought: a webview wrapped inside a native shell.
              </p>
              <p className="t-body">
                A <strong style={{ color: "#1d1d1f" }}>2-star App Store rating</strong>. 40-second load times. Checkout conversion stuck around 6%. Mobile drove an increasing share of sessions, but barely any revenue.
              </p>
            </ScrollReveal>
          </div>

          {/* Problem cards */}
          <div style={{ marginTop: "6rem", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "#d2d2d7", borderRadius: 20, overflow: "hidden", border: "1px solid #d2d2d7" }}>
            {[
              { n: "01", title: "Webview wrapped as native",  desc: "The entire booking flow lived in a webview. 40-second loads, layout shifts on every scroll, no native gestures." },
              { n: "02", title: "Combined outbound + return", desc: "Both directions in a single card. Users had to process two decisions simultaneously — cognitive overload before they could commit." },
              { n: "03", title: "Search engine everywhere",   desc: "The search form reappeared between every step. Users navigated back 4+ times to change a single field. No saved state." },
              { n: "04", title: "Zero native capabilities",    desc: "No haptics, no GPS, no push notifications. A product that felt like it didn't belong on a phone." },
            ].map((c, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ background: "#fff", padding: "2.5rem", height: "100%" }}>
                  <p style={{ fontSize: ".7rem", color: "#0071e3", fontWeight: 600, letterSpacing: ".12em", marginBottom: "1rem" }}>{c.n}</p>
                  <h3 className="t-headline" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", marginBottom: ".75rem", color: "#1d1d1f" }}>{c.title}</h3>
                  <p style={{ fontSize: ".9rem", color: "#6e6e73", lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          02 · DISCOVERY — off-white
      ══════════════════════════════════════════════ */}
      <section className="section-off-white" style={{ padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <ScrollReveal>
              <p className="t-eyebrow">02 — Discovery</p>
              <h2 className="t-section-title" style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                Benchmarked the best.<br />Found the pattern.
              </h2>
              <p className="t-body" style={{ maxWidth: 600, margin: "0 auto" }}>
                Hopper 4.8, Kayak 4.8, Skyscanner 4.8, AvisaSales 4.7. Every top-rated travel app shared three structural decisions — and CVC was doing the opposite on all of them.
              </p>
            </ScrollReveal>
          </div>

          <MacBook src="/mbp-benchmark.png" alt="Competitive benchmark — Hopper, Kayak, Skyscanner, AvisaSales"
            caption="Competitive benchmark · Hopper 4.8 · Kayak 4.8 · Skyscanner 4.8 · AvisaSales 4.7" />

          <div style={{ height: "4rem" }} />

          <MacBook src="/mbp-dynamics.png" alt="Research synthesis"
            caption="Research synthesis · Pain/opportunity matrix built from CVC usability tests, heuristic analysis, and analytics" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          03 · INFORMATION ARCHITECTURE — white
      ══════════════════════════════════════════════ */}
      <section className="section-white" style={{ padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start", marginBottom: "5rem" }}>
            <ScrollReveal>
              <p className="t-eyebrow">03 — Architecture</p>
              <h2 className="t-section-title" style={{ marginTop: "1rem" }}>
                Before vs after.<br />One decision at a time.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="t-body" style={{ marginBottom: "1.5rem" }}>
                The old flow bounced users through the search engine after every single input — departure, then search engine, then destination, then search engine again. Seven interruptions before seeing a result.
              </p>
              <p className="t-body">
                The new flow collapses search into a single guided native step, then presents outbound and return as separate decisions. Loading time becomes a cross-sell moment. Every action moves forward.
              </p>
            </ScrollReveal>
          </div>

          <MacBook src="/mbp-before-after.png" alt="Before vs after flow"
            caption="Before · 9 steps through the search engine to reach results.  After · Guided search → Loading cross-sell → Outbound → Return → Upsell → Details" />

          <div style={{ height: "4rem" }} />

          <MacBook src="/mbp-wireframes.png" alt="Wireframe flow"
            caption="Wireframe flow · Home → Search → Passengers → Calendar → Loading → Outbound → Return → Upsell → Confirmation" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          04 · SOLUTION — black, gallery of real phones
      ══════════════════════════════════════════════ */}
      <section className="section-black" style={{ padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <ScrollReveal>
              <p className="t-eyebrow" style={{ color: "#0071e3" }}>04 — Solution</p>
              <h2 className="t-hero-white" style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)", marginTop: "1rem", marginBottom: "1.5rem" }}>
                Native, by design.
              </h2>
              <p className="t-body-white" style={{ maxWidth: 600, margin: "0 auto" }}>
                Nine screens. One cohesive native booking flow. Each one tested, iterated, and shipped to production.
              </p>
            </ScrollReveal>
          </div>

          {/* Row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", marginBottom: "3rem" }}>
            {[
              { src: "/cvc-phone-search.png",     label: "1. Search",        desc: "Ida e volta · Native autocomplete · Departure / destination" },
              { src: "/cvc-phone-cal.png",        label: "2. Calendar",      desc: "Native range picker · Selected dates highlighted · Contextual CTA" },
              { src: "/cvc-phone-passageiros.png",label: "3. Passengers",    desc: "Adults · Children · Infants · Class · Stops" },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <Phone src={p.src} alt={p.label} w={260} />
                  <p style={{ fontSize: ".95rem", color: "#fff", marginTop: "1.5rem", fontWeight: 500 }}>{p.label}</p>
                  <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.55)", marginTop: ".5rem", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", marginBottom: "3rem" }}>
            {[
              { src: "/cvc-phone-resultado.png",  label: "4. Results — Outbound", desc: "Compact cards · Cheapest highlighted · Real-time ticker · Filter chips" },
              { src: "/cvc-phone-resultado2.png", label: "5. Smart Labels",       desc: "Mais barato · Mala grande · Voo direto · Context-aware per card" },
              { src: "/cvc-phone-volta.png",      label: "6. Results — Return",   desc: "Outbound pinned to top · Running total · One decision at a time" },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <Phone src={p.src} alt={p.label} w={260} />
                  <p style={{ fontSize: ".95rem", color: "#fff", marginTop: "1.5rem", fontWeight: 500 }}>{p.label}</p>
                  <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.55)", marginTop: ".5rem", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 3 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
            {[
              { src: "/cvc-phone-filters.png",  label: "7. Filters",       desc: "Price histogram · Duration · Stops · CTA with live result count" },
              { src: "/cvc-phone-detail.png",   label: "8. Expanded Card", desc: "Return flights inline · Itinerary · Class · Airlines" },
              { src: "/cvc-phone-upgrade.png",  label: "9. Native Upsell", desc: "Básico · Intermediário · Premium · No-upgrade as default" },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <Phone src={p.src} alt={p.label} w={260} />
                  <p style={{ fontSize: ".95rem", color: "#fff", marginTop: "1.5rem", fontWeight: 500 }}>{p.label}</p>
                  <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.55)", marginTop: ".5rem", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          05 · VALIDATION — off-white
      ══════════════════════════════════════════════ */}
      <section className="section-off-white" style={{ padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start", marginBottom: "5rem" }}>
            <ScrollReveal>
              <p className="t-eyebrow">05 — Validation</p>
              <h2 className="t-section-title" style={{ marginTop: "1rem" }}>
                We tested it all.<br />The data decided.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="t-body" style={{ marginBottom: "1.5rem" }}>
                The most contested decision was card density. The product team wanted more information above the fold. The data disagreed. <strong style={{ color: "#1d1d1f" }}>Compact cards won on time-to-select and conversion</strong> — by a margin big enough to ship without a second round of testing.
              </p>
              <p className="t-body">
                The loading animation cross-sell was the surprise. We expected it to feel intrusive. Users didn't skip it. They engaged with it. That became <strong style={{ color: "#1d1d1f" }}>+23% in hotel revenue</strong> from the same session.
              </p>
            </ScrollReveal>
          </div>

          <MacBook src="/mbp-heuristica.png" alt="Heuristic analysis"
            caption="Dynamics · Wireframe per step · Impediments (red) · Suggestions (yellow) · Possible/Time (green)" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          06 · IMPACT — white with big numbers
      ══════════════════════════════════════════════ */}
      <section className="section-white" style={{ padding: "10rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <p className="t-eyebrow">06 — Impact</p>
            <h2 className="t-section-title" style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
              Numbers that<br />speak for themselves.
            </h2>
          </ScrollReveal>

          <div style={{ marginTop: "5rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#d2d2d7", borderRadius: 20, overflow: "hidden", border: "1px solid #d2d2d7" }}>
            {[
              { before: "App Store Rating",      num: "4.6★",  sub: "from 2.0",      detail: "+130% improvement" },
              { before: "Checkout Conversion",   num: "+212%", sub: "from 6% → 20%", detail: "shipped in 4 months" },
              { before: "Hotel cross-sell",      num: "+23%",  sub: "same session",   detail: "loading-screen bet" },
            ].map((m, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{ background: "#fff", padding: "3.5rem 2rem", textAlign: "center", height: "100%" }}>
                  <p style={{ fontSize: ".72rem", color: "#86868b", marginBottom: "1rem", letterSpacing: ".05em" }}>{m.before}</p>
                  <div className="t-num-giant" style={{ color: "#0071e3", fontSize: "clamp(3rem,6vw,5rem)", margin: ".5rem 0" }}>
                    {m.num}
                  </div>
                  <p style={{ fontSize: ".95rem", color: "#1d1d1f", fontWeight: 500, marginTop: ".75rem" }}>{m.sub}</p>
                  <p style={{ fontSize: ".75rem", color: "#86868b", marginTop: ".25rem" }}>{m.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="t-body" style={{ maxWidth: 640, margin: "5rem auto 0", fontStyle: "italic", color: "#1d1d1f", fontSize: "clamp(1.1rem,2vw,1.5rem)", lineHeight: 1.5 }}>
              "Load time dropped from <strong>40 seconds to 6</strong>. Not because we optimised the webview — because we replaced it entirely."
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          07 · REFLECTION — off-white
      ══════════════════════════════════════════════ */}
      <section className="section-off-white" style={{ padding: "10rem 2rem" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }}>
            <ScrollReveal>
              <p className="t-eyebrow">07 — Reflection</p>
              <h2 className="t-section-title" style={{ marginTop: "1rem" }}>
                What I'd do<br />differently.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="t-body" style={{ marginBottom: "1.5rem" }}>
                <strong style={{ color: "#1d1d1f" }}>The architectural call was everything.</strong> Going native wasn't a design decision — it was a product strategy decision. Getting cross-functional alignment on it early was the highest-leverage action I took.
              </p>
              <p className="t-body" style={{ marginBottom: "1.5rem" }}>
                <strong style={{ color: "#1d1d1f" }}>Use research that already exists.</strong> The team had mapped the pain points. The temptation is to restart everything and call it discovery. That would have cost six weeks and revealed nothing new.
              </p>
              <p className="t-body" style={{ fontSize: ".95rem", color: "#86868b" }}>
                If I were doing this again, I'd push for a price-alert notification strategy on day one. We built a native app with no meaningful push layer. Users told us price-drop alerts were their most-wanted feature. That was real revenue left on the table.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEXT / CTA — black
      ══════════════════════════════════════════════ */}
      <section className="section-black" style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <ScrollReveal>
          <p className="t-eyebrow" style={{ color: "#0071e3", marginBottom: "1.5rem" }}>What's next</p>
          <h2 className="t-hero-white" style={{ fontSize: "clamp(2rem,4.5vw,4rem)", marginBottom: "2rem" }}>
            Let's build something<br />great together.
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-blue" style={{ fontSize: ".95rem", padding: ".75rem 2rem" }}>Get in touch</Link>
            <Link href="/" className="btn-white-ghost" style={{ fontSize: ".95rem", padding: ".75rem 2rem" }}>← All work</Link>
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
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 860px) {
          section[class*="section-"] { padding: 6rem 1.5rem !important; }
          h2.t-section-title { font-size: clamp(1.6rem,7vw,2.5rem) !important; }
        }
      `}</style>
    </main>
  );
}
