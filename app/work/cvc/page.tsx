"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

/* ─── iPhone 15 Pro Mockup ─────────────────────────────── */
function iPhone({ src, alt, width = 260, height = 532, style = {} }: {
  src: string; alt: string; width?: number; height?: number; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      width, height,
      position: "relative",
      borderRadius: 44,
      background: "#1a1a1a",
      boxShadow: "0 0 0 1.5px #333, 0 0 0 3px #111, 0 40px 120px rgba(0,0,0,0.9), 0 20px 60px rgba(0,0,0,0.6)",
      overflow: "hidden",
      ...style,
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
        width: 88, height: 26, background: "#000", borderRadius: 20, zIndex: 10,
      }} />
      {/* Screen */}
      <Image src={src} alt={alt} fill style={{ objectFit: "cover", borderRadius: 40 }} />
      {/* Glass glare */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 44,
        background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)",
        pointerEvents: "none", zIndex: 5,
      }} />
    </div>
  );
}

/* ─── Section label ─────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
      textTransform: "uppercase", color: "#f5c842",
      marginBottom: 20,
    }}>{children}</span>
  );
}

/* ─── Full-width image block ────────────────────────────── */
function ImageBlock({ src, alt, caption }: { src: string; alt: string; caption: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 20, overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      marginTop: 56,
    }}>
      <Image src={src} alt={alt} width={1400} height={800}
        style={{ width: "100%", height: "auto", display: "block" }} />
      <div style={{
        padding: "14px 24px", background: "#111",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontSize: 13, color: "#666",
      }}>{caption}</div>
    </div>
  );
}

export default function CVCPage() {
  const phonesRef = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLDivElement>(null);

  /* Parallax phones */
  useEffect(() => {
    const fn = () => {
      if (!phonesRef.current) return;
      const y = window.scrollY;
      if (y < window.innerHeight) {
        phonesRef.current.style.transform = `translateY(calc(-52% + ${y * 0.28}px))`;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Hero fade out on scroll */
  useEffect(() => {
    const fn = () => {
      if (!heroRef.current) return;
      heroRef.current.style.opacity = String(Math.max(0, 1 - window.scrollY / 700));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const sec: React.CSSProperties = {
    padding: "120px 48px",
    maxWidth: 1200,
    margin: "0 auto",
  };
  const twoCol: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "start",
  };
  const h2Style: React.CSSProperties = {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 900,
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    marginBottom: 28,
    color: "#fff",
  };
  const prose: React.CSSProperties = {
    fontSize: 17, lineHeight: 1.8, color: "#999",
  };

  return (
    <main style={{ background: "#000", color: "#fff", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <Link href="/" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20, fontWeight: 700, color: "#fff", textDecoration: "none",
        }}>Rafael.</Link>
        <Link href="/" style={{
          fontSize: 14, color: "#888", textDecoration: "none",
          display: "flex", alignItems: "center", gap: 8,
        }}>← All work</Link>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        minHeight: "100svh",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 48px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* BG radial */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 70% 50% at 70% 60%, rgba(245,200,66,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 20% 80%, rgba(61,107,255,0.06) 0%, transparent 50%)
          `,
        }} />

        <div ref={heroRef} style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#f5c842",
            marginBottom: 24,
          }}>Case Study · CVC Corp · 2021–2022</div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(52px, 8vw, 108px)",
            fontWeight: 900, lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: 32, color: "#fff",
          }}>
            A 2.0-star app,<br />
            <em style={{ color: "#f5c842", fontStyle: "italic" }}>brought back<br />to life.</em>
          </h1>

          <p style={{
            fontSize: 18, fontWeight: 300, color: "#888",
            maxWidth: 520, marginBottom: 48,
          }}>
            Brazil's largest travel company. 30M customers. The flights product ran in a webview,
            loaded in 40 seconds, and shipped with a 2-star rating. I rebuilt it from scratch.
          </p>

          <div style={{ display: "flex", gap: 48 }}>
            {[
              { num: "2.0 → 4.6★", label: "App Store Rating" },
              { num: "+212%",       label: "Checkout Conversion" },
              { num: "40s → 6s",   label: "Load Time" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 32, fontWeight: 900, color: "#fff",
                  letterSpacing: "-0.02em", lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontSize: 11, color: "#555", marginTop: 4,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating iPhones */}
        <div ref={phonesRef} style={{
          position: "absolute", right: "-2%", top: "50%",
          transform: "translateY(-52%)",
          width: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
          willChange: "transform",
        }}>
          <div style={{ position: "relative", height: 600, width: 620 }}>
            <iPhone
              src="/cvc-screen-results.png"
              alt="Flight results"
              width={270} height={550}
              style={{
                position: "absolute", left: 50, top: 0,
                transform: "rotate(-3deg)",
                animation: "phoneIn1 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s both",
              }}
            />
            <iPhone
              src="/cvc-screen-filters.png"
              alt="Flight filters"
              width={240} height={490}
              style={{
                position: "absolute", right: 0, top: 80,
                transform: "rotate(2deg)",
                animation: "phoneIn2 1.2s cubic-bezier(0.16,1,0.3,1) 0.8s both",
              }}
            />
            {/* Glow */}
            <div style={{
              position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)",
              width: 500, height: 200,
              background: "radial-gradient(ellipse, rgba(245,200,66,0.1) 0%, transparent 70%)",
              filter: "blur(30px)",
              pointerEvents: "none",
            }} />
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 32, right: 48,
          display: "flex", alignItems: "center", gap: 10,
          fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#444",
        }}>
          <div style={{ width: 40, height: 1, background: "#444" }} />
          Scroll to read
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "0 48px" }} />

      {/* ── 01 CHALLENGE ────────────────────────────────── */}
      <section style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <div style={sec}>
          <div style={twoCol}>
            <div>
              <Label>01 — Challenge</Label>
              <h2 style={h2Style}>
                The problem was deeper than <em style={{ color: "#f5c842" }}>performance.</em>
              </h2>
            </div>
            <div style={prose}>
              <p style={{ marginBottom: "1.2em" }}>
                The app had a <strong style={{ color: "#fff" }}>2.0 App Store rating</strong>. Crashes, slow loading, broken flows. The entire booking experience ran on a webview — no native performance, no GPS, no real interactions.
              </p>
              <p>
                The mobile team was treated as a backup to the website. Every decision optimized for desktop, then ported over. The result was a product that felt like it didn't belong on a phone.
              </p>
            </div>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2,
            marginTop: 56, borderRadius: 20, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            {[
              { icon: "🐢", title: "Webview booking",      desc: "Entire flow in a webview — no native performance, 40+ second loads, layout shifts on every tap." },
              { icon: "🧩", title: "Combined flight cards", desc: "Outbound and return in one card. Two decisions at once — too much cognitive load to commit." },
              { icon: "🔁", title: "Fragmented search",    desc: "Users navigated back 4+ times to change a single selection. No saved state, start over." },
              { icon: "📵", title: "No native features",   desc: "GPS, push notifications, haptics, fluid transitions — none of it. A wrapped website." },
            ].map((c, i) => (
              <div key={i} style={{
                background: "#111", padding: "32px",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 20, right: 24,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 64, fontWeight: 900,
                  color: "rgba(255,255,255,0.04)", lineHeight: 1,
                }}>{i + 1}</div>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 10, color: "#fff" }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "0 48px" }} />

      {/* ── 02 DISCOVERY ────────────────────────────────── */}
      <section style={{ background: "#000", padding: "120px 0" }}>
        <div style={sec}>
          <div style={twoCol}>
            <div>
              <Label>02 — Discovery</Label>
              <h2 style={h2Style}>Benchmarked the best. Found <em style={{ color: "#f5c842" }}>the pattern.</em></h2>
            </div>
            <div style={prose}>
              <p style={{ marginBottom: "1.2em" }}>
                I analyzed <strong style={{ color: "#fff" }}>Hopper, Skyscanner, Kayak, AvisaSales, and Decolar</strong>. Every top-rated travel app did three things CVC wasn't doing.
              </p>
              <p>
                I layered that against existing CVC research — a pain/opportunity matrix the team had built but hadn't yet acted on. The biggest pain points clustered around <strong style={{ color: "#fff" }}>card density and pricing transparency</strong>.
              </p>
            </div>
          </div>

          <ImageBlock
            src="/cvc-screen-2.png"
            alt="Research matrix — Dores do Usuário vs Oportunidades"
            caption={<><strong style={{ color: "#888" }}>Research synthesis</strong> — Dores do Usuário (left) vs Oportunidades (right) · Built from existing CVC usability tests, interviews, and analytics. The biggest clusters mapped directly to card density and price clarity.</>}
          />

          <ImageBlock
            src="/cvc-screen-3.png"
            alt="Competitive benchmark — Hopper, Kayak, Skyscanner, AvisaSales"
            caption={<><strong style={{ color: "#888" }}>Competitive benchmark</strong> — Hopper 4.8, Kayak 4.8, Skyscanner 4.8, AvisaSales 4.7 · All top apps shared the same three patterns. CVC was doing the opposite on all three.</>}
          />
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "0 48px" }} />

      {/* ── 03 BETS ─────────────────────────────────────── */}
      <section style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <div style={sec}>
          <div style={twoCol}>
            <div>
              <Label>03 — Definition</Label>
              <h2 style={h2Style}>Four bets that <em style={{ color: "#f5c842" }}>changed everything.</em></h2>
            </div>
            <div style={prose}>
              <p>Instead of a wide redesign, I made four focused bets — each one testable, each one reversible. The A/B test on card density was the hinge point.</p>
            </div>
          </div>

          <div style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { num: "BET 01", title: "Native, not web",            desc: "Leave the webview entirely. Load times had to fall by an order of magnitude. This unlocked everything else." },
              { num: "BET 02", title: "Outbound first, then return", desc: "End the combinatorial explosion of round-trip cards. One decision at a time." },
              { num: "BET 03", title: "Compact, filterable cards",   desc: "Price, time, airline, stops, baggage. Nothing else above the fold. A/B tested — compact won big enough to ship without a second test." },
              { num: "BET 04", title: "Branded loading = cross-sell", desc: "Unavoidable wait time became a hotel suggestion. The loading animation drove +23% cross-sell lift." },
            ].map((bet, i) => (
              <div key={i} style={{
                display: "flex", gap: 32, alignItems: "flex-start",
                padding: "36px 40px", background: "#111",
                borderRadius: i === 0 ? "20px 20px 4px 4px" : i === 3 ? "4px 4px 20px 20px" : 4,
                borderLeft: "3px solid transparent",
                transition: "border-color 0.3s",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderLeftColor = "#f5c842")}
                onMouseLeave={e => (e.currentTarget.style.borderLeftColor = "transparent")}
              >
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                  color: "#f5c842", whiteSpace: "nowrap", paddingTop: 4, minWidth: 60,
                }}>{bet.num}</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 500, marginBottom: 8, color: "#fff" }}>{bet.title}</h3>
                  <p style={{ fontSize: 15, color: "#555", lineHeight: 1.6, maxWidth: 560 }}>{bet.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "0 48px" }} />

      {/* ── 04 SOLUTION ─────────────────────────────────── */}
      <section style={{ background: "#000", padding: "120px 0" }}>
        <div style={sec}>
          <Label>04 — Solution</Label>
          <h2 style={h2Style}>The native <em style={{ color: "#f5c842" }}>flight experience.</em></h2>
          <p style={{ ...prose, maxWidth: 620, marginBottom: 0 }}>
            We built the new app screen by screen, A/B testing the controversial calls. The cover below is the real shipped product.
          </p>

          {/* Hero cover — two phones */}
          <div style={{
            marginTop: 56, borderRadius: 20, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#0a0a0a",
          }}>
            <Image src="/cover-cvc-flights.png" alt="CVC native app — shipped product"
              width={1080} height={1080}
              style={{ maxWidth: 720, width: "100%", display: "block", margin: "0 auto", padding: 40 }}
            />
            <div style={{ padding: "14px 24px", background: "#111", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 13, color: "#555", textAlign: "center" }}>
              <strong style={{ color: "#888" }}>Shipped product</strong> · Left: flight results with compact cards, smart price labels, real-time ticker · Right: advanced filters with histogram
            </div>
          </div>

          {/* Callout */}
          <div style={{
            margin: "64px 0",
            padding: "48px 64px",
            background: "#111",
            borderRadius: 20,
            borderLeft: "4px solid #f5c842",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(22px, 3vw, 32px)",
            fontStyle: "italic",
            lineHeight: 1.4,
            color: "#ccc",
          }}>
            The A/B test on card density was the project's hinge.{" "}
            <em style={{ color: "#fff", fontStyle: "normal" }}>Compact cards won by a margin big enough to ship without a second test.</em>
          </div>

          {/* Three iPhones */}
          <div style={{
            display: "flex", gap: 32,
            alignItems: "flex-end", justifyContent: "center",
            padding: "40px 0",
            position: "relative",
          }}>
            <div style={{ position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)", width: 600, height: 200, background: "radial-gradient(ellipse, rgba(245,200,66,0.08) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />

            <div style={{ textAlign: "center" }}>
              <iPhone src="/cvc-screen-results.png" alt="Results screen" width={220} height={450} />
              <div style={{ marginTop: 16, fontSize: 12, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 4 }}>Results</strong>
                Compact cards · outbound first
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <iPhone src="/cover-cvc-flights.png" alt="Full app" width={260} height={532}
                style={{ transform: "translateY(-20px)" }}
              />
              <div style={{ marginTop: 16, fontSize: 12, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 4 }}>Full flow</strong>
                Search → Results → Checkout
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <iPhone src="/cvc-screen-filters.png" alt="Filters screen" width={220} height={450} />
              <div style={{ marginTop: 16, fontSize: 12, color: "#555" }}>
                <strong style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 4 }}>Filters</strong>
                Price histogram · stops · airlines
              </div>
            </div>
          </div>

          {/* Wireframe flow */}
          <ImageBlock
            src="/cvc-screen-8.png"
            alt="Wireframe flow — search to confirmation"
            caption={<><strong style={{ color: "#888" }}>Wireframe flow</strong> · Home → Search → Passengers → Calendar → Results (outbound) → Results (return) → Upsell → Confirmation</>}
          />
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "0 48px" }} />

      {/* ── 05 A/B TEST ─────────────────────────────────── */}
      <section style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <div style={sec}>
          <div style={twoCol}>
            <div>
              <Label>05 — Validation</Label>
              <h2 style={h2Style}>We tested everything. <em style={{ color: "#f5c842" }}>The data decided.</em></h2>
            </div>
            <div style={prose}>
              <p style={{ marginBottom: "1.2em" }}>
                The most contested call was card density. The product team wanted more information per card. The data disagreed. <strong style={{ color: "#fff" }}>Compact cards won on both time-to-select and conversion rate.</strong>
              </p>
              <p>
                The loading animation cross-sell was the surprise. We expected it to feel intrusive. Users didn't skip it — they engaged with it. That became +23% in hotel revenue on the same session.
              </p>
            </div>
          </div>

          <ImageBlock
            src="/ab-test.png"
            alt="A/B test results"
            caption={<><strong style={{ color: "#888" }}>A/B test</strong> · Compact card vs full-detail card · The winner was clear enough to skip a second round and ship directly.</>}
          />
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "0 48px" }} />

      {/* ── 06 IMPACT ───────────────────────────────────── */}
      <section style={{ background: "#000", padding: "120px 0", textAlign: "center" }}>
        <div style={sec}>
          <Label>06 — Impact</Label>
          <h2 style={h2Style}>Numbers that <em style={{ color: "#f5c842" }}>speak for themselves.</em></h2>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2,
            margin: "80px 0",
            borderRadius: 24, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            {[
              { before: "App Store Rating",    num: "4.6★",  label: "from 2.0",        sub: "+130% improvement" },
              { before: "Checkout Conversion", num: "+212%", label: "conversion rate",  sub: "from 6.4% to ~20%" },
              { before: "Cross-sell Revenue",  num: "+23%",  label: "hotel cross-sell", sub: "same session, loading moment" },
            ].map((m, i) => (
              <div key={i} style={{ background: "#111", padding: "56px 32px", transition: "background 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1a1a1a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#111")}
              >
                <div style={{ fontSize: 13, color: "#555", marginBottom: 12 }}>{m.before}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(52px, 6vw, 80px)",
                  fontWeight: 900, color: "#f5c842", lineHeight: 1,
                  letterSpacing: "-0.03em", margin: "8px 0",
                }}>{m.num}</div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</div>
                <div style={{ fontSize: 12, color: "#444", marginTop: 6 }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Load time callout */}
          <div style={{
            padding: "48px 64px",
            background: "#111",
            borderRadius: 20,
            borderLeft: "4px solid #f5c842",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(22px, 3vw, 32px)",
            fontStyle: "italic",
            lineHeight: 1.4,
            color: "#ccc",
            textAlign: "left",
          }}>
            Load time dropped from{" "}
            <em style={{ color: "#fff", fontStyle: "normal" }}>40 seconds to ~6 seconds.</em>{" "}
            Not because we optimised the webview — because we replaced it entirely.
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "0 48px" }} />

      {/* ── 07 REFLECTION ───────────────────────────────── */}
      <section style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <div style={sec}>
          <div style={twoCol}>
            <div>
              <Label>07 — Reflection</Label>
              <h2 style={h2Style}>What I'd do <em style={{ color: "#f5c842" }}>differently.</em></h2>
            </div>
            <div style={prose}>
              <p style={{ marginBottom: "1.2em" }}>
                <strong style={{ color: "#fff" }}>The architectural call was everything.</strong> Going native wasn't a design decision — it was a product strategy call. Getting alignment on it early was the most leveraged thing I did on this project.
              </p>
              <p style={{ marginBottom: "1.2em" }}>
                <strong style={{ color: "#fff" }}>Build on research that already exists.</strong> The team had mapped the pain points. The temptation is to redo everything from scratch. That would have burned six weeks and added nothing.
              </p>
              <p style={{ fontSize: 15, color: "#555" }}>
                If I were doing this again: I'd push harder for a notification strategy from day one. We built a native app with no meaningful push layer — price-drop alerts were the feature users wanted most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT ────────────────────────────────────────── */}
      <div style={{
        padding: "80px 48px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#444", marginBottom: 16 }}>Next case study</div>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 900, letterSpacing: "-0.03em",
            }}>
              The onboarding nobody could <em style={{ color: "#f5c842" }}>finish.</em>
            </div>
          </Link>
          <div style={{ fontSize: 14, color: "#444", marginTop: 8 }}>Rappi · LATAM · +53% E2E conversion</div>
        </div>
        <Link href="/" style={{
          fontSize: 48, color: "#f5c842", textDecoration: "none",
          transition: "transform 0.3s",
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = "translateX(12px)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "translateX(0)")}
        >→</Link>
      </div>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer style={{
        padding: "48px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 13, color: "#444",
      }}>
        <span>© 2025 Rafael Guimarães</span>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="https://linkedin.com/in/rafaelgdesign" target="_blank" style={{ color: "#444", textDecoration: "none" }}>LinkedIn</a>
          <a href="mailto:rafael@rafaelgdesign.com" style={{ color: "#444", textDecoration: "none" }}>Email</a>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
        @keyframes phoneIn1 { from { opacity: 0; transform: rotate(-3deg) translateY(60px); } to { opacity: 1; transform: rotate(-3deg) translateY(0); } }
        @keyframes phoneIn2 { from { opacity: 0; transform: rotate(2deg) translateY(80px); } to { opacity: 1; transform: rotate(2deg) translateY(0); } }
        * { box-sizing: border-box; }
        @media (max-width: 900px) {
          nav { padding: 20px 24px !important; }
        }
      `}</style>
    </main>
  );
}
