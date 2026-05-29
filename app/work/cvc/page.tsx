"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

/* ─── Types ─────────────────────────────────────────────── */
type PhoneProps = { src: string; alt: string; w?: number; h?: number; style?: React.CSSProperties };
type MacProps   = { src: string; alt: string; caption?: string };
type CardProps  = { icon: string; title: string; desc: string; n: number };
type MetricProps= { before: string; num: string; label: string; sub: string };

/* ─── iPhone component — real Apple mockup PNG ─────────── */
function Phone({ src, alt, w = 260, h = 532, style = {} }: PhoneProps) {
  return (
    <div style={{ position: "relative", width: w, height: h, flexShrink: 0, ...style }}>
      {/* app screen — sits behind the frame */}
      <Image src={src} alt={alt} fill
        style={{ objectFit: "cover", objectPosition: "top", borderRadius: "10.5% / 5%" }} />
      {/* iPhone frame on top */}
      <Image src="/iphone-mockup.png" alt="" fill
        style={{ objectFit: "fill", position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }} />
    </div>
  );
}

/* ─── MacBook component ─────────────────────────────────── */
function MacBook({ src, alt, caption }: MacProps) {
  return (
    <div style={{ width: "100%" }}>
      <div style={{
        borderRadius: 20, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "#0a0a0a",
      }}>
        <Image src={src} alt={alt} width={2200} height={1340}
          style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      {caption && (
        <p style={{ marginTop: 12, fontSize: 13, color: "#555", textAlign: "center" }}>{caption}</p>
      )}
    </div>
  );
}

/* ─── Section label ─────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 600,
      letterSpacing: "0.2em", textTransform: "uppercase",
      color: "#f5c842", marginBottom: 20,
    }}>{children}</span>
  );
}

/* ─── Problem card ──────────────────────────────────────── */
function ProblemCard({ icon, title, desc, n }: CardProps) {
  return (
    <div style={{ background: "#111", padding: "32px", position: "relative", overflow: "hidden" }}
      onMouseEnter={e => (e.currentTarget.style.background = "#1a1a1a")}
      onMouseLeave={e => (e.currentTarget.style.background = "#111")}
    >
      <div style={{
        position: "absolute", top: 20, right: 24,
        fontFamily: "'Playfair Display', serif", fontSize: 64, fontWeight: 900,
        color: "rgba(255,255,255,0.04)", lineHeight: 1,
      }}>{n}</div>
      <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 10, color: "#fff" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

/* ─── Big metric ────────────────────────────────────────── */
function Metric({ before, num, label, sub }: MetricProps) {
  return (
    <div style={{ background: "#111", padding: "56px 32px", transition: "background 0.3s" }}
      onMouseEnter={e => (e.currentTarget.style.background = "#1a1a1a")}
      onMouseLeave={e => (e.currentTarget.style.background = "#111")}
    >
      <div style={{ fontSize: 13, color: "#555", marginBottom: 12 }}>{before}</div>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(48px, 5vw, 76px)", fontWeight: 900,
        color: "#f5c842", lineHeight: 1, letterSpacing: "-0.03em", margin: "8px 0",
      }}>{num}</div>
      <div style={{ fontSize: 13, color: "#666", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      <div style={{ fontSize: 12, color: "#444", marginTop: 6 }}>{sub}</div>
    </div>
  );
}

/* ─── Divider ───────────────────────────────────────────── */
function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "0 48px" }} />;
}

/* ─── Callout ───────────────────────────────────────────── */
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      margin: "64px 0", padding: "48px 56px", background: "#111",
      borderRadius: 20, borderLeft: "4px solid #f5c842",
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(20px, 2.5vw, 30px)", fontStyle: "italic", lineHeight: 1.5, color: "#ccc",
    }}>{children}</div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function CVCPage() {
  const phonesRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      if (phonesRef.current && y < window.innerHeight)
        phonesRef.current.style.transform = `translateY(calc(-50% + ${y * 0.25}px))`;
      if (heroTextRef.current)
        heroTextRef.current.style.opacity = String(Math.max(0, 1 - y / 600));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const sec = { padding: "120px 48px", maxWidth: 1200, margin: "0 auto" };
  const twoCol: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" };
  const prose: React.CSSProperties = { fontSize: 17, lineHeight: 1.8, color: "#999" };
  const h2: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(34px, 4.5vw, 60px)", fontWeight: 900,
    letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 28, color: "#fff",
  };

  return (
    <main style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>

      {/* ── NAV ────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px", background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff", textDecoration: "none" }}>Rafael.</Link>
        <Link href="/" style={{ fontSize: 14, color: "#666", textDecoration: "none" }}>← All work</Link>
      </nav>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 88px", position: "relative", overflow: "hidden" }}>

        {/* BG glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 50% at 68% 55%, rgba(245,200,66,0.07) 0%, transparent 60%)" }} />

        {/* Text */}
        <div ref={heroTextRef} style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f5c842", marginBottom: 24 }}>
            Case Study · CVC Corp · 2021 – 2022
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 7.5vw, 100px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 32, color: "#fff" }}>
            A 2.0-star app,<br />
            <em style={{ color: "#f5c842" }}>brought back<br />to life.</em>
          </h1>
          <p style={{ fontSize: 18, fontWeight: 300, color: "#777", maxWidth: 480, marginBottom: 52, lineHeight: 1.7 }}>
            Brazil's largest travel company. 30M customers. A flight booking flow that ran in a webview, took 40 seconds to load, and had a 2-star App Store rating. I rebuilt it from scratch.
          </p>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { num: "2.0 → 4.6★", label: "App Store Rating" },
              { num: "+212%",       label: "Checkout conversion" },
              { num: "40s → 6s",   label: "Load time" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating iPhones — real screens */}
        <div ref={phonesRef} style={{
          position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)",
          width: "46%", display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none", willChange: "transform",
        }}>
          <div style={{ position: "relative", height: 620, width: 580 }}>
            <div style={{ position: "absolute", left: 20, top: 0, transform: "rotate(-4deg)", animation: "pIn1 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s both" }}>
              <Phone src="/cvc-phone-resultado.png" alt="Flight results" w={260} h={532} />
            </div>
            <div style={{ position: "absolute", right: 0, top: 90, transform: "rotate(3deg)", animation: "pIn2 1.2s cubic-bezier(0.16,1,0.3,1) 0.7s both" }}>
              <Phone src="/cvc-phone-filters.png" alt="Filters" w={230} h={470} />
            </div>
            {/* glow */}
            <div style={{ position: "absolute", bottom: -80, left: "50%", transform: "translateX(-50%)", width: 500, height: 200, background: "radial-gradient(ellipse, rgba(245,200,66,0.1) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, right: 48, display: "flex", alignItems: "center", gap: 10, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#333" }}>
          <div style={{ width: 40, height: 1, background: "#333" }} /> Scroll
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          01 · CONTEXT
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <div style={sec}>
          <div style={twoCol}>
            <div>
              <Label>01 — Context</Label>
              <h2 style={h2}>The problem was deeper than <em style={{ color: "#f5c842" }}>performance.</em></h2>
            </div>
            <div style={prose}>
              <p style={{ marginBottom: "1.2em" }}>
                CVC is Brazil's largest travel company — 30 million customers, thousands of physical stores, and a digital product that hadn't caught up. The mobile flights experience was an afterthought: a webview wrapped inside a native shell, optimised for desktop and ported over.
              </p>
              <p>
                The result was a <strong style={{ color: "#fff" }}>2.0 App Store rating</strong>, 40-second load times, and a checkout conversion rate sitting around 6%. Mobile was responsible for an increasing share of sessions — but barely any revenue.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 64, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { icon: "🐢", n: 1, title: "Webview wrapped as native",   desc: "The entire booking flow lived in a webview. 40-second loads, layout shifts on every scroll, no native gestures." },
              { icon: "🧩", n: 2, title: "Combined outbound + return",  desc: "Both directions in a single card forced users to process two decisions simultaneously — cognitive overload before they committed." },
              { icon: "🔁", n: 3, title: "Search engine everywhere",    desc: "The search form reappeared between every step. Users navigated back 4+ times to change a single field. No saved state." },
              { icon: "📵", n: 4, title: "Zero native capabilities",    desc: "No haptics, no GPS, no push notifications. A product that felt like it didn't belong on a phone at all." },
            ].map(c => <ProblemCard key={c.n} {...c} />)}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          02 · DISCOVERY
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#000", padding: "120px 0" }}>
        <div style={sec}>
          <div style={twoCol}>
            <div>
              <Label>02 — Discovery</Label>
              <h2 style={h2}>Benchmarked the best. Found <em style={{ color: "#f5c842" }}>the pattern.</em></h2>
            </div>
            <div style={prose}>
              <p style={{ marginBottom: "1.2em" }}>
                I analysed <strong style={{ color: "#fff" }}>Hopper 4.8, Kayak 4.8, Skyscanner 4.8, AvisaSales 4.7</strong> and Decolar. Every top-rated travel app shared three structural decisions that CVC was doing the opposite of.
              </p>
              <p>
                I layered that benchmark against existing CVC research — usability tests, analytics, and a pain/opportunity matrix the team had built but hadn't acted on. The biggest friction clusters were <strong style={{ color: "#fff" }}>card density and price transparency</strong>.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 64 }}>
            <MacBook src="/mbp-benchmark.png" alt="Competitive benchmark — Hopper, Kayak, Skyscanner, AvisaSales"
              caption="Competitive benchmark · Hopper 4.8 · Kayak 4.8 · Skyscanner 4.8 · AvisaSales 4.7 · All top apps shared the same three structural patterns" />
          </div>
          <div style={{ marginTop: 24 }}>
            <MacBook src="/mbp-dynamics.png" alt="Research synthesis — Dores do Usuário vs Oportunidades"
              caption="Research synthesis · Pain/opportunity matrix built from CVC usability tests, heuristic analysis, and existing analytics · Card density and price clarity were the biggest clusters" />
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          03 · INFORMATION ARCHITECTURE
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <div style={sec}>
          <div style={twoCol}>
            <div>
              <Label>03 — Information Architecture</Label>
              <h2 style={h2}>Before vs After. <em style={{ color: "#f5c842" }}>One decision at a time.</em></h2>
            </div>
            <div style={prose}>
              <p style={{ marginBottom: "1.2em" }}>
                The old flow bounced users through the search engine after <em>every single input</em>. Departure → search engine → destination → search engine → dates → search engine. Seven interruptions before seeing a single result.
              </p>
              <p>
                The new flow collapses search into a single <strong style={{ color: "#fff" }}>guided native step</strong>, then presents outbound and return as separate decisions. Loading time becomes a cross-sell moment. Every action is purposeful.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 64 }}>
            <MacBook src="/mbp-before-after.png" alt="Before vs After flow diagram"
              caption="Before · 9 steps through the search engine to reach results · After · Guided search → Loading cross-sell → Outbound results → Return results → Upsell → Details" />
          </div>
          <div style={{ marginTop: 24 }}>
            <MacBook src="/mbp-wireframes.png" alt="Full wireframe flow"
              caption="Wireframe flow · Home → Search → Passengers → Calendar → Loading → Outbound → Return → Upsell → Confirmation · 7 screens, linear, no back-navigation required" />
          </div>

          <Callout>
            Every back-navigation is a signal of failure.{" "}
            <em style={{ color: "#fff", fontStyle: "normal" }}>The new architecture made going back unnecessary.</em>
          </Callout>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          04 · SOLUTION — iPhone gallery
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#000", padding: "120px 0" }}>
        <div style={sec}>
          <Label>04 — Solution</Label>
          <h2 style={h2}>The native flight experience, <em style={{ color: "#f5c842" }}>screen by screen.</em></h2>
          <p style={{ ...prose, maxWidth: 640, marginBottom: 0 }}>
            Eight screens. One cohesive, native booking flow. Each one tested, iterated, and shipped to production.
          </p>
        </div>

        {/* Row 1: Search + Calendar + Passengers */}
        <div style={{ padding: "64px 48px 0", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end", marginBottom: 12 }}>

            <div style={{ flex: 1 }}>
              <Phone src="/cvc-phone-search.png" alt="Search — Ida e volta" w={undefined as unknown as number} h={540}
                style={{ width: "100%", height: 540 }} />
              <div style={{ marginTop: 14, fontSize: 13, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", marginBottom: 4 }}>1 · Busca</strong>
                Ida e volta / Só ida · Destino com autocomplete nativo
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <Phone src="/cvc-phone-cal.png" alt="Calendar — escolha as datas" w={undefined as unknown as number} h={540}
                style={{ width: "100%", height: 540 }} />
              <div style={{ marginTop: 14, fontSize: 13, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", marginBottom: 4 }}>2 · Calendário</strong>
                Range nativo · Datas selecionadas com highlight · CTA contextual
              </div>
            </div>

            <div style={{ flex: 1, marginBottom: 40 }}>
              <Phone src="/cvc-phone-bagagem.png" alt="Passageiros e detalhes" w={undefined as unknown as number} h={480}
                style={{ width: "100%", height: 480 }} />
              <div style={{ marginTop: 14, fontSize: 13, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", marginBottom: 4 }}>3 · Passageiros</strong>
                Adultos, crianças, bebês · Classe · Quantidade de paradas
              </div>
            </div>

          </div>

          {/* Row 2: Results (outbound) + Results with tags + Return */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end", marginBottom: 12 }}>

            <div style={{ flex: 1 }}>
              <Phone src="/cvc-phone-resultado.png" alt="Resultados — voo de ida" w={undefined as unknown as number} h={560}
                style={{ width: "100%", height: 560 }} />
              <div style={{ marginTop: 14, fontSize: 13, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", marginBottom: 4 }}>4 · Resultados — Ida</strong>
                Compact cards · Mais barato destacado · Real-time ticker · Filtros em chips
              </div>
            </div>

            <div style={{ flex: 1, marginBottom: 48 }}>
              <Phone src="/cvc-phone-resultado2.png" alt="Resultados com labels" w={undefined as unknown as number} h={510}
                style={{ width: "100%", height: 510 }} />
              <div style={{ marginTop: 14, fontSize: 13, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", marginBottom: 4 }}>5 · Smart labels</strong>
                Mais barato · Mala grande · Voo direto · Context-aware per card
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <Phone src="/cvc-phone-volta.png" alt="Resultados — voo de volta" w={undefined as unknown as number} h={560}
                style={{ width: "100%", height: 560 }} />
              <div style={{ marginTop: 14, fontSize: 13, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", marginBottom: 4 }}>6 · Resultados — Volta</strong>
                Voo de ida fixado no topo · Valor acumulado · Uma decisão de cada vez
              </div>
            </div>

          </div>

          {/* Row 3: Filters + Detail + Upgrade */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>

            <div style={{ flex: 1 }}>
              <Phone src="/cvc-phone-filters.png" alt="Filtros" w={undefined as unknown as number} h={560}
                style={{ width: "100%", height: 560 }} />
              <div style={{ marginTop: 14, fontSize: 13, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", marginBottom: 4 }}>7 · Filtros</strong>
                Price histogram · Duração · Quantidade de paradas · CTA com contagem de resultados
              </div>
            </div>

            <div style={{ flex: 1, marginBottom: 40 }}>
              <Phone src="/cvc-phone-detail.png" alt="Detalhes do voo expandido" w={undefined as unknown as number} h={520}
                style={{ width: "100%", height: 520 }} />
              <div style={{ marginTop: 14, fontSize: 13, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", marginBottom: 4 }}>8 · Card expandido</strong>
                Voos de volta inline · Itinerário · Classe · Companhias · CTA Escolher ida
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <Phone src="/cvc-phone-upgrade.png" alt="Upsell — melhore seu voo" w={undefined as unknown as number} h={560}
                style={{ width: "100%", height: 560 }} />
              <div style={{ marginTop: 14, fontSize: 13, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", marginBottom: 4 }}>9 · Upsell nativo</strong>
                Upgrade Básico · Intermediário · Premium · Sem upgrades como opção principal
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          05 · VALIDATION — A/B + heuristics
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <div style={sec}>
          <div style={twoCol}>
            <div>
              <Label>05 — Validation</Label>
              <h2 style={h2}>We tested everything. <em style={{ color: "#f5c842" }}>The data decided.</em></h2>
            </div>
            <div style={prose}>
              <p style={{ marginBottom: "1.2em" }}>
                The most contested call was card density. The product team wanted more information above the fold. The data disagreed. <strong style={{ color: "#fff" }}>Compact cards won on time-to-select and conversion — by a margin big enough to ship without a second round.</strong>
              </p>
              <p>
                The loading animation cross-sell was the surprise. We expected it to feel intrusive. Users didn't skip it. They engaged with it. That became <strong style={{ color: "#fff" }}>+23% hotel revenue</strong> from the same session.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 64 }}>
            <MacBook src="/mbp-heuristica.png" alt="Heuristic analysis and dynamics"
              caption="Dinâmicas · Wireframe flow por etapa · Impedimentos (vermelho) · Sugestões (amarelo) · Possível/Tempo (verde) · Informações úteis · 7 etapas mapeadas" />
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          06 · IMPACT
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#000", padding: "120px 0", textAlign: "center" }}>
        <div style={sec}>
          <Label>06 — Impact</Label>
          <h2 style={h2}>Numbers that <em style={{ color: "#f5c842" }}>speak for themselves.</em></h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, margin: "80px 0", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <Metric before="App Store Rating"    num="4.6★"  label="from 2.0"            sub="+130% improvement" />
            <Metric before="Checkout Conversion" num="+212%" label="conversion rate"      sub="from ~6.4% to ~20%" />
            <Metric before="Hotel Cross-sell"    num="+23%"  label="same-session revenue" sub="loading animation bet" />
          </div>

          <Callout>
            Load time dropped from <em style={{ color: "#fff", fontStyle: "normal" }}>40 seconds to 6.</em> Not because we optimised the webview. Because we replaced it entirely.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          07 · REFLECTION
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <div style={sec}>
          <div style={twoCol}>
            <div>
              <Label>07 — Reflection</Label>
              <h2 style={h2}>What I'd do <em style={{ color: "#f5c842" }}>differently.</em></h2>
            </div>
            <div style={prose}>
              <p style={{ marginBottom: "1.2em" }}>
                <strong style={{ color: "#fff" }}>The architectural call was everything.</strong> Going native wasn't a design decision — it was a product strategy decision. Getting cross-functional alignment on it early was the highest-leverage action I took on this project.
              </p>
              <p style={{ marginBottom: "1.2em" }}>
                <strong style={{ color: "#fff" }}>Use research that already exists.</strong> The team had mapped the pain points. The temptation is to restart everything and call it discovery. That would have cost six weeks and revealed nothing new. I used what was there and moved.
              </p>
              <p style={{ fontSize: 15, color: "#444" }}>
                If I were doing this again: I'd push for a price-alert notification strategy on day one. We built a native app with no meaningful push layer. Users told us price-drop alerts were their most-wanted feature. That was real revenue left on the table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT ─────────────────────────────────────── */}
      <div style={{ padding: "80px 48px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "#000", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#333", marginBottom: 16 }}>Next case study</div>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 50px)", fontWeight: 900, letterSpacing: "-0.03em" }}>
              The onboarding nobody could <em style={{ color: "#f5c842" }}>finish.</em>
            </div>
          </Link>
          <div style={{ fontSize: 14, color: "#444", marginTop: 8 }}>Rappi · LATAM · +53% E2E conversion</div>
        </div>
        <Link href="/" style={{ fontSize: 48, color: "#f5c842", textDecoration: "none", transition: "transform 0.3s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "translateX(12px)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "translateX(0)")}
        >→</Link>
      </div>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer style={{ padding: "40px 48px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "#444", flexWrap: "wrap", gap: 16 }}>
        <span>© 2025 Rafael Guimarães</span>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="https://linkedin.com/in/rafaelgdesign" target="_blank" style={{ color: "#444", textDecoration: "none" }}>LinkedIn</a>
          <a href="mailto:rafael@rafaelgdesign.com" style={{ color: "#444", textDecoration: "none" }}>Email</a>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
        @keyframes pIn1 { from { opacity:0; transform: rotate(-4deg) translateY(70px); } to { opacity:1; transform: rotate(-4deg) translateY(0); } }
        @keyframes pIn2 { from { opacity:0; transform: rotate(3deg) translateY(90px);  } to { opacity:1; transform: rotate(3deg) translateY(0);  } }
        * { box-sizing: border-box; }
        @media (max-width: 860px) {
          nav { padding: 18px 24px !important; }
          section { padding: 80px 24px !important; }
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
