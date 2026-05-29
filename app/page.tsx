"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./components/ScrollReveal";

/* ── Animated counter ─────────────────────────── */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Rotating headline words ──────────────────── */
const WORDS = ["Fintech", "B2B", "Growth", "Mobile", "Systems"];

/* ── Case teaser data ─────────────────────────── */
const cases = [
  {
    slug: "/work/cvc",
    company: "CVC Corp",
    title: "Flight Booking Redesign",
    tags: ["B2C", "Mobile", "Product Designer"],
    stat: "6.4% → 20%",
    statLabel: "Conversion",
    accent: "#f5e642",
    num: "01",
  },
];

/* ── Ticker brands ────────────────────────────── */
const brands = ["Thoughtworks", "Rappi", "CVC Corp", "MiBanco", "Home Collection", "Thoughtworks", "Rappi", "CVC Corp", "MiBanco", "Home Collection"];

export default function Home() {
  /* word rotator */
  const wordRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (!wordRef.current) return;
      wordRef.current.style.opacity = "0";
      wordRef.current.style.transform = "translateY(-18px)";
      setTimeout(() => {
        if (!wordRef.current) return;
        i = (i + 1) % WORDS.length;
        wordRef.current.textContent = WORDS[i];
        wordRef.current.style.opacity = "1";
        wordRef.current.style.transform = "translateY(0)";
      }, 280);
    }, 2400);
    return () => clearInterval(iv);
  }, []);

  /* hero text stagger */
  useEffect(() => {
    document.querySelectorAll(".hero-line").forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "translateY(0)";
      }, 100 + i * 120);
    });
  }, []);

  return (
    <main className="page-enter">

      {/* ══════════ HERO ══════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "0 3rem 5.5rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* bg orbs */}
        <div className="orb" style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(74,250,138,.07) 0%, transparent 70%)", top: -120, right: -80 }} />
        <div className="orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(245,230,66,.04) 0%, transparent 70%)", bottom: 0, left: -40 }} />

        {/* Side label */}
        <div className="label" style={{
          position: "absolute", right: "3rem", top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "center", letterSpacing: ".24em",
        }}>
          Product Design Lead · São Paulo
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2.5rem", left: "3rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: 48, height: 1, background: "var(--accent)", opacity: .5 }} />
          <span className="label">Scroll</span>
        </div>

        {/* Main text */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="label hero-line" style={{
            marginBottom: "2rem", opacity: 0,
            transform: "translateY(30px)", transition: "opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)",
          }}>
            rafaelgdesign.com — 2025
          </p>

          <h1 className="display-hero hero-line" style={{
            opacity: 0, transform: "translateY(50px)",
            transition: "opacity .9s ease, transform .9s cubic-bezier(.16,1,.3,1)",
          }}>
            Designing for{" "}
            <span
              ref={wordRef}
              className="grad-text"
              style={{ display: "inline-block", transition: "opacity .28s ease, transform .28s ease" }}
            >
              Fintech
            </span>
            <br />
            &amp; B2B.
          </h1>

          <div className="hero-line" style={{
            marginTop: "3rem", display: "flex", gap: "2.5rem", alignItems: "center",
            opacity: 0, transform: "translateY(30px)",
            transition: "opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)",
          }}>
            <p style={{ fontSize: "1rem", lineHeight: 1.65, color: "var(--text-muted)", maxWidth: 360, fontWeight: 300 }}>
              I turn complex systems into experiences that drive{" "}
              <em style={{ color: "var(--text)", fontStyle: "italic" }}>conversion, activation, and retention.</em>
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/#work" className="btn-primary">View Work</Link>
              <Link href="/about" className="btn-ghost">About me →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TICKER ══════════ */}
      <div style={{
        overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
        padding: "1.1rem 0", position: "relative",
      }}>
        <div className="ticker-track" style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap", width: "max-content" }}>
          {[...brands, ...brands].map((b, i) => (
            <span key={i} style={{ fontSize: ".7rem", fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              {b} <span style={{ color: "var(--accent)", marginLeft: "1rem" }}>×</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ STATS ══════════ */}
      <section style={{ padding: "7rem 3rem" }}>
        <div className="container">
          <ScrollReveal>
            <p className="label" style={{ marginBottom: "3rem" }}>By the numbers</p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
            {[
              { n: 14, s: "+", l: "Years in Digital Design" },
              { n: 8,  s: "+", l: "Years in Product Design" },
              { n: 7,  s: "+", l: "Years in Global Teams" },
              { n: 12, s: "+", l: "Countries Served" },
            ].map((st, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card-hover" style={{
                  padding: "2rem 1.75rem",
                  background: "var(--surface)",
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontWeight: 800,
                    fontSize: "clamp(2.2rem, 4vw, 3.8rem)", letterSpacing: "-.03em",
                    color: "var(--accent)", lineHeight: 1, marginBottom: ".75rem",
                  }}>
                    <Counter target={st.n} suffix={st.s} />
                  </div>
                  <p className="label">{st.l}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WORK (teaser) ══════════ */}
      <section id="work" style={{ padding: "2rem 3rem 8rem", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", paddingTop: "4rem" }}>
              <div>
                <p className="label" style={{ marginBottom: "1rem" }}>Selected Work</p>
                <h2 className="display-xl" style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}>
                  Case Studies
                </h2>
              </div>
              <Link href="/work/cvc" className="btn-ghost" style={{ alignSelf: "flex-end" }}>
                See full case →
              </Link>
            </div>
          </ScrollReveal>

          {/* Case card */}
          {cases.map((c, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <Link href={c.slug} style={{ textDecoration: "none", display: "block" }}>
                <div
                  className="card-hover"
                  style={{
                    padding: "3rem",
                    background: "var(--surface)",
                    borderRadius: 20,
                    border: "1px solid var(--border)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "3rem",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  data-hover
                >
                  {/* left accent bar */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, bottom: 0,
                    width: 3, background: c.accent, borderRadius: "20px 0 0 20px",
                  }} />

                  <div style={{ paddingLeft: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                      <div style={{
                        padding: ".3rem .75rem",
                        background: `${c.accent}18`,
                        border: `1px solid ${c.accent}40`,
                        borderRadius: 100,
                        fontSize: ".65rem", fontWeight: 600, letterSpacing: ".14em",
                        textTransform: "uppercase", color: c.accent,
                      }}>
                        {c.num}
                      </div>
                      <span className="label">{c.company}</span>
                    </div>
                    <h3 className="display-md" style={{ marginBottom: "1.25rem" }}>{c.title}</h3>
                    <div style={{ display: "flex", gap: ".6rem" }}>
                      {c.tags.map(t => (
                        <span key={t} className="label" style={{
                          padding: ".28rem .7rem",
                          border: "1px solid var(--border)",
                          borderRadius: 100,
                          fontSize: ".6rem",
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{
                      fontFamily: "var(--font-display)", fontWeight: 800,
                      fontSize: "clamp(2rem, 3.5vw, 3.5rem)", letterSpacing: "-.025em",
                      color: c.accent, lineHeight: 1,
                    }}>
                      {c.stat}
                    </div>
                    <p className="label" style={{ marginTop: ".5rem" }}>{c.statLabel}</p>
                    <div style={{
                      marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: ".5rem",
                      color: "var(--text-muted)", fontSize: ".8rem",
                    }}>
                      Read case study <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}

          {/* Coming soon */}
          <ScrollReveal delay={150}>
            <div style={{
              marginTop: "1.5rem", padding: "2.5rem 3rem",
              background: "var(--surface2)",
              borderRadius: 20, border: "1px dashed var(--border)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <p className="label" style={{ marginBottom: ".5rem" }}>Coming soon</p>
                <h3 className="display-md" style={{ fontSize: "1.6rem", color: "var(--text-muted)" }}>
                  More case studies in progress...
                </h3>
              </div>
              <div className="label" style={{ fontSize: ".65rem" }}>MiBanco · Rappi · and more</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════ ABOUT TEASER ══════════ */}
      <section style={{ padding: "6rem 3rem", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(74,250,138,.05) 0%, transparent 70%)", top: "-100px", right: "10%" }} />
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
            <ScrollReveal>
              <p className="label" style={{ marginBottom: "1.25rem" }}>About Me</p>
              <h2 className="display-xl" style={{ fontSize: "clamp(2rem, 4vw, 4.5rem)", marginBottom: "2rem" }}>
                Hi! I&apos;m Rafael<br />
                <span className="grad-text">Guimarães.</span>
              </h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1rem", fontWeight: 300, marginBottom: "2rem" }}>
                A Brazilian Product Designer working globally. Currently at{" "}
                <span style={{ color: "var(--text)" }}>Thoughtworks Brasil</span>, designing a B2B credit platform
                for MiBanco. 8+ years turning complex financial systems into clear, conversion-driven experiences.
              </p>
              <Link href="/about" className="btn-ghost">Full story →</Link>
            </ScrollReveal>

            {/* Skills grid */}
            <ScrollReveal delay={100}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { label: "Design Systems", desc: "Scalable, token-based" },
                  { label: "User Research", desc: "Usability tests, interviews" },
                  { label: "Prototyping", desc: "Figma, high-fidelity" },
                  { label: "Cross-functional", desc: "Eng, PM, stakeholders" },
                  { label: "Fintech", desc: "8+ years in financial UX" },
                  { label: "AI First", desc: "Thoughtworks pillar" },
                ].map((sk, i) => (
                  <div key={i} className="card-hover" style={{
                    padding: "1.25rem",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: ".9rem", marginBottom: ".25rem" }}>
                      {sk.label}
                    </p>
                    <p className="label" style={{ fontSize: ".6rem" }}>{sk.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section style={{ padding: "7rem 3rem", textAlign: "center", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(74,250,138,.05) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <ScrollReveal>
          <p className="label" style={{ marginBottom: "1.5rem" }}>Open to opportunities</p>
          <h2 className="display-xl" style={{ marginBottom: "1.5rem" }}>
            Got a project<span style={{ color: "var(--accent)" }}>?</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 420, margin: "0 auto 2.5rem", fontWeight: 300 }}>
            I&apos;m open to Product Design Lead roles in fintech and B2B. Currently open to opportunities in Canada.
          </p>
          <Link href="/contact" className="btn-primary">Let&apos;s talk →</Link>
        </ScrollReveal>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ padding: "2rem 3rem", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="label" style={{ fontSize: ".62rem" }}>© 2025 Rafael Guimarães</span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {[
              { l: "LinkedIn", h: "https://linkedin.com/in/rafaelgdesign" },
              { l: "Email", h: "mailto:rafael@rafaelgdesign.com" },
            ].map(lk => (
              <a key={lk.l} href={lk.h} target="_blank" className="label" style={{
                textDecoration: "none", transition: "color .2s ease", fontSize: ".62rem",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--text-muted)"; }}>
                {lk.l}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
}
