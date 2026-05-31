"use client";
import Link from "next/link";
import { useRef, useState, useEffect, ReactNode } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import useIsMobile from "../../components/useIsMobile";

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

function Label({ children }: { children: ReactNode }) {
  return (
    <p style={{
      fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em",
      textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem",
    }}>{children}</p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "0 2rem" }} />;
}

/* ── Metric card ── */
function Metric({ before, after, label, unit = "" }: { before: string; after: string; label: string; unit?: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
      borderRadius: 20, padding: "2rem", display: "flex", flexDirection: "column", gap: ".75rem",
    }}>
      <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,255,255,.4)" }}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: ".75rem", flexWrap: "wrap" }}>
        <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgba(255,255,255,.35)", textDecoration: "line-through", letterSpacing: "-.02em" }}>{before}</span>
        <span style={{ color: "#0071e3", fontSize: "1.1rem" }}>→</span>
        <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em" }}>{after}{unit}</span>
      </div>
    </div>
  );
}

/* ── Quote card ── */
function Quote({ text, author, role }: { text: string; author: string; role: string }) {
  return (
    <div style={{
      background: "rgba(0,113,227,.06)", border: "1px solid rgba(0,113,227,.2)",
      borderRadius: 20, padding: "2.5rem", position: "relative",
    }}>
      <div style={{
        position: "absolute", top: "1.5rem", left: "2rem",
        fontSize: "3rem", lineHeight: 1, color: "rgba(0,113,227,.3)", fontFamily: "Georgia, serif",
      }}>&ldquo;</div>
      <p style={{
        fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,.82)",
        marginTop: "2rem", fontStyle: "italic", fontWeight: 300,
      }}>{text}</p>
      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: ".25rem" }}>
        <span style={{ fontSize: ".9rem", fontWeight: 600, color: "#f5f5f7" }}>{author}</span>
        <span style={{ fontSize: ".78rem", color: "rgba(255,255,255,.45)" }}>{role}</span>
      </div>
    </div>
  );
}

/* ── Timeline step ── */
function TimelineStep({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
      <div style={{
        flexShrink: 0, width: 48, height: 48, borderRadius: "50%",
        background: "rgba(0,113,227,.15)", border: "1px solid rgba(0,113,227,.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: ".8rem", fontWeight: 700, color: "#0071e3", letterSpacing: ".05em",
      }}>{number}</div>
      <div style={{ paddingTop: ".5rem" }}>
        <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f5f5f7", marginBottom: ".75rem", letterSpacing: "-.01em" }}>{title}</h4>
        <div style={{ fontSize: ".97rem", color: "rgba(255,255,255,.65)", lineHeight: 1.75 }}>{children}</div>
      </div>
    </div>
  );
}

/* ── Tag ── */
function Tag({ children }: { children: ReactNode }) {
  return (
    <span style={{
      fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase",
      padding: ".35rem .85rem", borderRadius: 100,
      background: "rgba(0,113,227,.15)", border: "1px solid rgba(0,113,227,.3)", color: "#0071e3",
    }}>{children}</span>
  );
}

/* ══════════════════════════════════════════
   LEADERSHIP CASE STUDY
   ══════════════════════════════════════════ */
export default function LeadershipCasePage() {
  const isMobile = useIsMobile();
  const pad = isMobile ? "5rem 1.5rem" : "8rem 6rem";

  return (
    <main className="page-in dark-cursor" style={{ background: "#000" }}>

      {/* ═══ 01 · HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: isMobile ? "8rem 1.5rem 4rem" : "10rem 6rem 6rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 60% 70% at 80% 20%, rgba(0,113,227,.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 10% 80%, rgba(0,113,227,.07) 0%, transparent 55%)
          `,
          pointerEvents: "none",
        }} />

        {/* Nav */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          padding: isMobile ? "2rem 1.5rem" : "2.5rem 6rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          zIndex: 10,
        }}>
          <Link href="/" style={{ fontSize: ".85rem", color: "rgba(255,255,255,.55)", textDecoration: "none", letterSpacing: "-.01em" }}>
            ← Rafael Guimarães
          </Link>
          <div style={{ display: "flex", gap: "2rem" }}>
            <Link href="/work/cvc" style={{ fontSize: ".85rem", color: "rgba(255,255,255,.4)", textDecoration: "none" }}>CVC</Link>
            <Link href="/work/rappi" style={{ fontSize: ".85rem", color: "rgba(255,255,255,.4)", textDecoration: "none" }}>Rappi</Link>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <Tag>Design Leadership</Tag>
            <Tag>B2B · Fintech</Tag>
            <Tag>Banking · NDA</Tag>
          </div>

          <h1 style={{
            fontSize: isMobile ? "clamp(2.4rem,11vw,3.5rem)" : "clamp(3rem,6vw,6rem)",
            fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1,
            color: "#f5f5f7", maxWidth: 900,
          }}>
            From <em style={{ color: "#0071e3", fontStyle: "italic" }}>chaos</em> to<br />
            high-performing team.
          </h1>

          <p style={{
            marginTop: "2rem", fontSize: isMobile ? "1.05rem" : "1.25rem",
            color: "rgba(255,255,255,.6)", maxWidth: 620, lineHeight: 1.7, fontWeight: 300,
          }}>
            How I stepped into a fractured design practice at a Latin American bank, rebuilt the entire operation from scratch — and got formally recognized as Design Lead in under two months.
          </p>

          {/* NDA note */}
          <p style={{
            marginTop: "1.25rem", fontSize: ".78rem", color: "rgba(255,255,255,.3)",
            display: "flex", alignItems: "center", gap: ".5rem",
          }}>
            <span>🔒</span> Client name under NDA — referred to as <strong style={{ color: "rgba(255,255,255,.45)" }}>"the bank"</strong> throughout this case.
          </p>

          {/* Hero stats */}
          <div style={{
            marginTop: "4rem", display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, auto)",
            gap: isMobile ? "1.5rem" : "4rem", maxWidth: 800,
          }}>
            {[
              { value: "< 2", unit: " mo", label: "to formal Lead designation" },
              { value: "~100×", unit: "", label: "faster credit disbursement" },
              { value: "3", unit: " designers", label: "team I built & led" },
              { value: "0", unit: " rework", label: "after governance rollout" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.04em", lineHeight: 1 }}>
                  {s.value}<span style={{ color: "#0071e3" }}>{s.unit}</span>
                </div>
                <p style={{ marginTop: ".4rem", fontSize: ".78rem", color: "rgba(255,255,255,.45)", letterSpacing: ".02em" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ 02 · CONTEXT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Context</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "2rem", lineHeight: 1.15 }}>
              A design team in freefall.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.65)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
              I joined a project at a major Latin American bank where the design practice had collapsed. 47 people across 3 squads, only 2 with any design coverage — and the designers were lost, with no direction, no process, and no roadmap. The client was frustrated. Product scope was shifting weekly. Nothing was shipping.
            </p>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.65)", lineHeight: 1.85 }}>
              There were 7 disconnected legacy systems for the credit origination flow. Loan disbursement took 2–4 days in the field. The team had no wireframes, no user testing, no alignment ceremonies, and constant scope changes. Every sprint ended in rework.
            </p>
          </ScrollReveal>

          {/* The chaos grid */}
          <ScrollReveal delay={150}>
            <div style={{
              marginTop: "3rem", display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1rem",
            }}>
              {[
                { icon: "🔥", label: "No design process or governance" },
                { icon: "❌", label: "No wireframes, no usability testing" },
                { icon: "🔄", label: "Constant scope changes, 3–4× rework" },
                { icon: "💬", label: "Client leaving meetings mid-session" },
                { icon: "🧩", label: "7 disconnected legacy systems" },
                { icon: "👥", label: "Skill mismatch inside the design team" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                  padding: "1.25rem 1.5rem",
                  background: "rgba(255,60,60,.04)", border: "1px solid rgba(255,60,60,.12)",
                  borderRadius: 14,
                }}>
                  <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: ".95rem", color: "rgba(255,255,255,.6)", lineHeight: 1.55 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 03 · DIAGNOSIS ═══ */}
      <section style={{ padding: pad, background: "rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Diagnosis</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "2rem", lineHeight: 1.15 }}>
              Three root causes.<br />One clear plan.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.65)", lineHeight: 1.85, marginBottom: "3rem" }}>
              Before proposing any solution, I took time to diagnose properly. The chaos wasn't random — it had three systemic root causes.
            </p>
          </ScrollReveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {[
              {
                n: "01", title: "Total process vacuum",
                body: "No defined phases, no sprint structure, no handoff protocol. Designers were making tactical decisions in a strategic void — every day reactive, never proactive.",
              },
              {
                n: "02", title: "Complete client trust breakdown",
                body: "The bank's design leadership had lost confidence in the team. They were escalating constantly, changing scope arbitrarily, and leaving calls early. This wasn't bad intent — it was frustration with unpredictability.",
              },
              {
                n: "03", title: "Critical skill mismatch inside the team",
                body: "The other designer was strong in Discovery but uncomfortable with the fast-paced UI/Delivery demands the project required. Asking her to perform where she wasn't strong was causing both bottlenecks and demotivation.",
              },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <TimelineStep number={s.n} title={s.title}>{s.body}</TimelineStep>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ 04 · WHAT I BUILT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>The Leadership Intervention</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "2rem", lineHeight: 1.15 }}>
              I didn't just redesign screens.<br />
              <em style={{ color: "#0071e3", fontStyle: "italic" }}>I redesigned the operation.</em>
            </h2>
          </ScrollReveal>

          {/* 4a — Design process */}
          <ScrollReveal delay={100}>
            <div style={{
              marginTop: "2.5rem", padding: "2.5rem",
              background: "rgba(0,113,227,.05)", border: "1px solid rgba(0,113,227,.15)",
              borderRadius: 24,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: "rgba(0,113,227,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
                }}>📋</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f5f5f7", letterSpacing: "-.01em" }}>
                  A formal 5-phase design process
                </h3>
              </div>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                I designed a structured 5-phase workflow — Discovery → Ideate → Prototype → Test → Handoff — and presented it collaboratively to PMs, Tech Leads, and the client's design leadership to get buy-in from all functions before rolling out. This wasn't a top-down decree; it was co-created with the team and validated by the client.
              </p>
              {/* Phase pills */}
              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                {["Discovery", "Ideate", "Prototype", "Test", "Handoff"].map((phase, i) => (
                  <div key={i} style={{
                    padding: ".5rem 1.25rem", borderRadius: 100, fontSize: ".8rem", fontWeight: 600,
                    background: `rgba(0,113,227,${0.1 + i * 0.04})`,
                    border: "1px solid rgba(0,113,227,.3)", color: "#0071e3",
                    letterSpacing: ".04em",
                  }}>{phase}</div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 4b — Jira + AI */}
          <ScrollReveal delay={150}>
            <div style={{
              marginTop: "1.5rem", padding: "2.5rem",
              background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 24,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
                }}>⚙️</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f5f5f7", letterSpacing: "-.01em" }}>
                  Design Jira + AI-powered automation
                </h3>
              </div>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                I structured a dedicated Design Jira board from scratch — tickets, swimlanes, status flows, and definition-of-done criteria tailored to design work. I integrated AI automation to generate component documentation, flag missing design tokens, and surface handoff gaps before they hit engineering. This gave the entire team visibility: no more "is that done?" conversations.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {["Design Jira board", "AI doc generation", "Handoff automation", "Token gap detection", "Roadmap visibility"].map((tag, i) => (
                  <span key={i} style={{
                    fontSize: ".75rem", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
                    padding: ".3rem .8rem", borderRadius: 8,
                    background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)",
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 4c — Ceremonies */}
          <ScrollReveal delay={180}>
            <div style={{
              marginTop: "1.5rem", padding: "2.5rem",
              background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 24,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
                }}>🗓</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f5f5f7", letterSpacing: "-.01em" }}>
                  7 design ceremonies where there were 0
                </h3>
              </div>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                I established the full ceremony stack: sprint kickoffs, design critiques, usability test planning sessions, cross-team alignment meetings with Product and Engineering, a weekly client sync, desk checks, and retrospectives. Every ceremony had a clear owner, agenda, and outcome. The 3-week sprint cadence became the heartbeat of a previously chaotic project.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "1rem" }}>
                {[
                  { n: "0 → 7", label: "ceremonies created" },
                  { n: "3-wk", label: "stable sprint cadence" },
                  { n: "0×", label: "rework after rollout" },
                  { n: "100%", label: "team alignment rate" },
                ].map((m, i) => (
                  <div key={i} style={{
                    padding: "1.25rem", background: "rgba(255,255,255,.04)", borderRadius: 14,
                    border: "1px solid rgba(255,255,255,.07)", textAlign: "center",
                  }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em" }}>{m.n}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", marginTop: ".25rem", letterSpacing: ".04em", textTransform: "uppercase" }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 4d — Dual track team */}
          <ScrollReveal delay={200}>
            <div style={{
              marginTop: "1.5rem", padding: "2.5rem",
              background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 24,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
                }}>👥</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f5f5f7", letterSpacing: "-.01em" }}>
                  Building and leading a team of 3 designers
                </h3>
              </div>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.65)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                I diagnosed the skill mismatch on the team and proposed a Dual-Track workflow: one designer focused on Discovery (future needs, research, validated insights), myself owning Delivery (UI, handoff, client-facing work). This leveraged individual strengths instead of forcing people into uncomfortable roles. I then led recruitment, personally interviewed and onboarded a third designer (Carlos), and created both the roll-off plan for the outgoing designer and the onboarding plan for the new hire — protecting the account's operational and financial continuity.
              </p>
              {/* Team diagram */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                {[
                  { track: "Discovery Track", role: "Future needs, research, usability testing calendar", icon: "🔍", color: "rgba(0,200,150,.15)", border: "rgba(0,200,150,.25)" },
                  { track: "Delivery Track", role: "UI design, handoff to engineering, client sync", icon: "🚀", color: "rgba(0,113,227,.12)", border: "rgba(0,113,227,.25)" },
                ].map((t, i) => (
                  <div key={i} style={{
                    padding: "1.5rem", borderRadius: 16,
                    background: t.color, border: `1px solid ${t.border}`,
                  }}>
                    <span style={{ fontSize: "1.5rem" }}>{t.icon}</span>
                    <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#f5f5f7", margin: ".5rem 0 .25rem", letterSpacing: "-.01em" }}>{t.track}</h4>
                    <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>{t.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 05 · OUTCOMES ═══ */}
      <section style={{ padding: pad, background: "rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Outcomes</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "3rem", lineHeight: 1.15 }}>
              Numbers don't lie.
            </h2>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1.25rem" }}>
            <ScrollReveal delay={0}><Metric before="2–4 days" after="30–45 min" label="Credit disbursement in the field" /></ScrollReveal>
            <ScrollReveal delay={80}><Metric before="0 ceremonies" after="7" label="Alignment spaces created" /></ScrollReveal>
            <ScrollReveal delay={120}><Metric before="3–4× rework" after="0×" label="Post-governance rework" /></ScrollReveal>
            <ScrollReveal delay={160}><Metric before="4–8 weeks" after="3 wks" label="Design delivery cycle" /></ScrollReveal>
            <ScrollReveal delay={200}><Metric before="0 days" after="4 wks" label="Structured discovery (net new)" /></ScrollReveal>
            <ScrollReveal delay={240}><Metric before="Chaotic" after="Stable" label="Client trust in design team" /></ScrollReveal>
          </div>

          {/* Big counter */}
          <ScrollReveal delay={100}>
            <div style={{
              marginTop: "3rem", padding: "3rem",
              background: "linear-gradient(135deg, rgba(0,113,227,.1) 0%, rgba(0,113,227,.03) 100%)",
              border: "1px solid rgba(0,113,227,.25)", borderRadius: 24, textAlign: "center",
            }}>
              <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(0,113,227,.8)", marginBottom: "1rem" }}>
                Credit disbursement improvement
              </p>
              <div style={{ fontSize: isMobile ? "5rem" : "8rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.05em", lineHeight: 1 }}>
                ~<Counter to={100} suffix="×" />
              </div>
              <p style={{ marginTop: ".75rem", fontSize: "1rem", color: "rgba(255,255,255,.5)" }}>faster in the field — 2–4 days → 30–45 minutes</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 06 · RECOGNITION ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Formal Recognition</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "1rem", lineHeight: 1.15 }}>
              Validated from every direction.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.55)", lineHeight: 1.75, marginBottom: "3rem" }}>
              The impact was recognized independently by the client, the delivery principal, the principal PM, and my direct manager — before I even self-advocated.
            </p>
          </ScrollReveal>

          {/* Recognition badges */}
          <ScrollReveal delay={80}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1rem", marginBottom: "3rem" }}>
              {[
                { icon: "🏆", title: "Formally designated 'Líder of the UX Front'", by: "By delivery principal Mafer Escudero" },
                { icon: "📋", title: "Added to the Extended Client Leadership Team (CLT)", by: "Rare for a designer at Senior grade" },
                { icon: "⭐", title: "Rated 'Consistently Exceeded Expectations'", by: "Annual assessment · 01/2025–01/2026" },
                { icon: "🌐", title: "Led high-stakes negotiations entirely in Spanish", by: "Not my native language (Portuguese)" },
              ].map((b, i) => (
                <div key={i} style={{
                  display: "flex", gap: "1.25rem", alignItems: "flex-start",
                  padding: "1.5rem", borderRadius: 16,
                  background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)",
                }}>
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{b.icon}</span>
                  <div>
                    <h4 style={{ fontSize: ".97rem", fontWeight: 600, color: "#f5f5f7", lineHeight: 1.45, marginBottom: ".35rem" }}>{b.title}</h4>
                    <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.38)", lineHeight: 1.55 }}>{b.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Quotes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <ScrollReveal delay={0}>
              <Quote
                text="You didn't just identify the chaos — you solved it. The 5-phase plan and the dual-track were exactly the structure we needed. But the most important part was how you did it: by involving PMs, Tech Leads, and the client for validation. That isn't the work of an executor; it's the work of a leader."
                author="Mafer Escudero"
                role="Delivery Principal · Thoughtworks"
              />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <Quote
                text="Your performance doesn't just meet — it consistently exceeds the expectations of the Senior grade. You are unequivocally operating at a Lead level. Your formal designation as 'Líder of the UX front' is the obvious and deserved recognition of that fact. Spectacular work."
                author="Pamela Nunez"
                role="Principal PM · Thoughtworks"
              />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <Quote
                text="You have done all of this — managing chaos, negotiating with stakeholders, presenting strategic plans, and leading a team — in Spanish, which is not your native language. The clarity, professionalism, and resilience you have shown is worthy of total admiration."
                author="Mafer Escudero"
                role="Delivery Principal · Thoughtworks"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ 07 · WHAT I LEARNED ═══ */}
      <section style={{ padding: pad, background: "rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Reflections</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "2rem", lineHeight: 1.15 }}>
              What I'd do differently.
            </h2>
          </ScrollReveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              {
                title: "Move faster on hard people decisions",
                body: "The roll-off decision for an underperforming designer took longer than it should have. Partly because she was senior and long-tenured. But delayed clarity costs the whole team — and the client noticed. A Lead has to separate personal empathy from operational responsibility.",
              },
              {
                title: "Integrate earlier with internal agile rituals",
                body: "I focused on the client-facing ceremonies first, which was the right call. But I should have mapped myself into the engineering team's kickoffs and desk checks from week one. Integrating design into those rituals earlier would have reduced friction with the dev squad.",
              },
              {
                title: "Document the playbook while doing it",
                body: "I plan to publish a 'Mibanco Playbook' — how to turn around a chaotic design practice — to share with other Thoughtworks teams. The insight was earned the hard way. Now it needs to scale beyond this one account.",
              },
            ].map((r, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{
                  padding: "2rem 2.5rem", borderRadius: 20,
                  background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)",
                }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f5f5f7", marginBottom: ".75rem", letterSpacing: "-.01em" }}>{r.title}</h3>
                  <p style={{ fontSize: ".97rem", color: "rgba(255,255,255,.58)", lineHeight: 1.8 }}>{r.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ 08 · FOOTER / NEXT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem" }}>
              Next case study
            </p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "2.5rem" }}>
              From <em style={{ color: "#0071e3", fontStyle: "italic" }}>two stars</em><br />to category-defining.
            </h2>
            <Link href="/work/cvc" className="btn-blue" style={{ padding: ".85rem 2.5rem", fontSize: ".95rem" }}>
              CVC · Flights App →
            </Link>
          </ScrollReveal>
        </div>

        <footer style={{
          marginTop: "6rem", paddingTop: "3rem",
          borderTop: "1px solid rgba(255,255,255,.06)",
          display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap",
        }}>
          <Link href="/" style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)", textDecoration: "none" }}>Home</Link>
          <Link href="/work/cvc" style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)", textDecoration: "none" }}>CVC</Link>
          <Link href="/work/rappi" style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)", textDecoration: "none" }}>Rappi</Link>
          <Link href="/about" style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)", textDecoration: "none" }}>About</Link>
        </footer>
      </section>

    </main>
  );
}
