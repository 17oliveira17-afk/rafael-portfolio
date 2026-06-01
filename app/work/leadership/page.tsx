"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect, ReactNode } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import useIsMobile from "../../components/useIsMobile";

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 2400, s = performance.now();
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
  return <span ref={ref}>{v}{suffix}</span>;
}

function Label({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem" }}>{children}</p>;
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "0 2rem" }} />;
}

function Tag({ children, color = "#0071e3", bg = "rgba(0,113,227,.15)", border = "rgba(0,113,227,.3)" }: { children: ReactNode; color?: string; bg?: string; border?: string }) {
  return (
    <span style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: ".35rem .85rem", borderRadius: 100, background: bg, border: `1px solid ${border}`, color }}>{children}</span>
  );
}

/* ── Full-bleed photo placeholder ── */
function PhotoBlock({ src, alt, height = "60vh", caption }: { src: string; alt: string; height?: string; caption?: string }) {
  return (
    <div style={{ position: "relative", width: "100%", minHeight: height, background: "rgba(255,255,255,.04)", overflow: "hidden" }}>
      <Image src={src} alt={alt} fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="100vw" />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,.5) 100%)" }} />
      {caption && (
        <p style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", fontSize: ".75rem", color: "rgba(255,255,255,.5)", letterSpacing: ".08em", whiteSpace: "nowrap" }}>{caption}</p>
      )}
    </div>
  );
}

/* ── Big stat ── */
function BigStat({ value, label, sub }: { value: ReactNode; label: string; sub?: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.05em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "1rem", fontWeight: 600, color: "#0071e3", marginTop: ".5rem", letterSpacing: "-.01em" }}>{label}</div>
      {sub && <div style={{ fontSize: ".8rem", color: "rgba(255,255,255,.4)", marginTop: ".25rem" }}>{sub}</div>}
    </div>
  );
}

/* ── Before → After metric ── */
function Metric({ before, after, label }: { before: string; after: string; label: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "2rem" }}>
      <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: "1rem" }}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: ".75rem", flexWrap: "wrap" }}>
        <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "rgba(255,255,255,.3)", textDecoration: "line-through" }}>{before}</span>
        <span style={{ color: "#0071e3" }}>→</span>
        <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em" }}>{after}</span>
      </div>
    </div>
  );
}

/* ── Quote ── */
function Quote({ text, author, role }: { text: string; author: string; role: string }) {
  return (
    <div style={{ background: "rgba(0,113,227,.06)", border: "1px solid rgba(0,113,227,.2)", borderRadius: 20, padding: "2.5rem", position: "relative" }}>
      <div style={{ position: "absolute", top: "1.5rem", left: "2rem", fontSize: "3rem", lineHeight: 1, color: "rgba(0,113,227,.25)", fontFamily: "Georgia, serif" }}>&ldquo;</div>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,.82)", marginTop: "1.5rem", fontStyle: "italic", fontWeight: 300 }}>{text}</p>
      <div style={{ marginTop: "1.5rem" }}>
        <span style={{ fontSize: ".9rem", fontWeight: 600, color: "#f5f5f7", display: "block" }}>{author}</span>
        <span style={{ fontSize: ".78rem", color: "rgba(255,255,255,.4)" }}>{role}</span>
      </div>
    </div>
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

      {/* ═══ NAV ═══ */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, padding: isMobile ? "1.25rem 1.5rem" : "2rem 6rem", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 50, background: "rgba(0,0,0,.7)", backdropFilter: "blur(20px)" }}>
        <Link href="/" style={{ fontSize: ".85rem", color: "rgba(255,255,255,.55)", textDecoration: "none" }}>← Back</Link>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/work/cvc" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.4)", textDecoration: "none" }}>CVC</Link>
          <Link href="/work/rappi" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.4)", textDecoration: "none" }}>Rappi</Link>
        </div>
      </div>

      {/* ═══ 01 · HERO ═══ */}
      <section style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isMobile ? "6rem 1.5rem 3.5rem" : "10rem 6rem 6rem", position: "relative", overflow: "hidden" }}>
        {/* Hero photo */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/cinematic/design-system.jpg" alt="Design leadership" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,.7) 60%, rgba(0,0,0,.95) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <Tag>Design Leadership</Tag>
            <Tag>Process & Ops</Tag>
            <Tag bg="rgba(255,255,255,.08)" border="rgba(255,255,255,.15)" color="rgba(255,255,255,.5)">Bank · NDA 🔒</Tag>
          </div>

          <h1 style={{
            fontSize: isMobile ? "clamp(2.4rem,10vw,3.2rem)" : "clamp(3rem,6vw,6rem)",
            fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1, color: "#f5f5f7", maxWidth: 900, marginBottom: "1.25rem",
          }}>
            From <em style={{ color: "#0071e3", fontStyle: "italic" }}>8 weeks</em><br />to 3 weeks.
          </h1>

          <p style={{ fontSize: isMobile ? ".95rem" : "1.2rem", color: "rgba(255,255,255,.6)", maxWidth: 540, lineHeight: 1.75, fontWeight: 300, marginBottom: ".75rem" }}>
            How I restructured a fractured design team at a Latin American bank — introducing planning, roadmaps, AI automation, and governance — cutting delivery by more than half.
          </p>
          <p style={{ fontSize: ".75rem", color: "rgba(255,255,255,.25)", marginBottom: "2.5rem" }}>Client name under NDA.</p>

          {/* Stats — 2x2 on mobile, 4 cols on desktop */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, auto)",
            gap: "1rem",
            maxWidth: isMobile ? "100%" : 680,
          }}>
            {[
              { v: "8w → 3w", l: "Delivery cycle" },
              { v: "3", l: "Designers led" },
              { v: "0 → 7", l: "Ceremonies" },
              { v: "< 2mo", l: "To Lead role" },
            ].map((s, i) => (
              <div key={i} style={{ borderLeft: "2px solid rgba(0,113,227,.4)", paddingLeft: ".85rem" }}>
                <div style={{ fontSize: isMobile ? "1.1rem" : "1.4rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.38)", marginTop: ".3rem", letterSpacing: ".05em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 02 · CONTEXT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>The situation</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "2rem", lineHeight: 1.1 }}>
              No process. No roadmap.<br />No ceremonies. Just fire.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.65)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
              When I joined the project at a major Latin American bank, the design team was operating in pure survival mode. Deliveries took 8 weeks on average. Scope changed constantly mid-sprint. The client was frustrated and trust had eroded completely. There was no planning structure, no roadmap visible to anyone, and no design ceremonies connecting the team.
            </p>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.65)", lineHeight: 1.85 }}>
              My goal wasn't to redesign the product. It was to redesign how the team worked — and make the results speak for themselves.
            </p>
          </ScrollReveal>

          {/* Chaos grid */}
          <ScrollReveal delay={120}>
            <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1rem" }}>
              {[
                "Delivery cycles of 8+ weeks with no predictability",
                "No sprint planning — work was reactive, not intentional",
                "Constant mid-sprint scope changes with no governance",
                "No design roadmap shared with PMs or stakeholders",
                "Skill mismatch inside the team causing bottlenecks",
                "Client trust completely eroded — leaving meetings mid-session",
              ].map((label, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.1rem 1.4rem", background: "rgba(255,60,60,.04)", border: "1px solid rgba(255,60,60,.1)", borderRadius: 12 }}>
                  <span style={{ color: "rgba(255,80,80,.6)", fontSize: "1rem", flexShrink: 0, marginTop: ".1rem" }}>✕</span>
                  <span style={{ fontSize: ".93rem", color: "rgba(255,255,255,.58)", lineHeight: 1.55 }}>{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PHOTO BREAK 1 ═══ */}
      <ScrollReveal type="scale">
        <PhotoBlock
          src="/cinematic/design-system.jpg"
          alt="Team working on process"
          height={isMobile ? "50vh" : "55vh"}
          caption="Design operations · Bank project (NDA)"
        />
      </ScrollReveal>

      {/* ═══ 03 · THE BIG NUMBER ═══ */}
      <section style={{ padding: pad, background: "rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>The headline result</Label>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: isMobile ? "3rem 0" : "5rem 0", gap: "1.5rem" }}>
              <div style={{ fontSize: isMobile ? "1rem" : "1.1rem", color: "rgba(255,255,255,.4)", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 600 }}>
                Design delivery cycle
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "1.5rem" : "3rem", flexWrap: "wrap", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: isMobile ? "4rem" : "7rem", fontWeight: 700, color: "rgba(255,255,255,.2)", letterSpacing: "-.05em", lineHeight: 1, textDecoration: "line-through" }}>8w</div>
                  <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.25)", marginTop: ".5rem", letterSpacing: ".1em", textTransform: "uppercase" }}>Before</div>
                </div>
                <div style={{ fontSize: isMobile ? "2.5rem" : "4rem", color: "#0071e3", fontWeight: 300 }}>→</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: isMobile ? "5rem" : "9rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.06em", lineHeight: 1 }}>
                    <Counter to={3} suffix="w" />
                  </div>
                  <div style={{ fontSize: ".75rem", color: "#0071e3", marginTop: ".5rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600 }}>After</div>
                </div>
              </div>
              <p style={{ fontSize: isMobile ? "1.1rem" : "1.3rem", color: "rgba(255,255,255,.5)", fontWeight: 300, maxWidth: 480, lineHeight: 1.7 }}>
                More than <strong style={{ color: "#f5f5f7", fontWeight: 700 }}>60% reduction</strong> in delivery cycle — through planning, governance, and a stable sprint structure.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 04 · WHAT I BUILT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>The intervention</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "1rem", lineHeight: 1.1 }}>
              Four systems that changed everything.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.55)", lineHeight: 1.75, marginBottom: "3.5rem" }}>
              I didn't just redesign screens. I redesigned how the team planned, communicated, and delivered.
            </p>
          </ScrollReveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* 01 — Sprint planning */}
            <ScrollReveal delay={0}>
              <div style={{ padding: "2.5rem", background: "rgba(0,113,227,.05)", border: "1px solid rgba(0,113,227,.18)", borderRadius: 24 }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(0,113,227,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📅</div>
                  <div>
                    <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".5rem" }}>01 — Sprint Planning</p>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".75rem", letterSpacing: "-.01em" }}>Planning to eliminate overwork</h3>
                    <p style={{ fontSize: ".97rem", color: "rgba(255,255,255,.62)", lineHeight: 1.8 }}>
                      I introduced structured sprint planning sessions — something the team had never had. Each cycle started with explicit capacity planning: what we could actually commit to, what was out of scope, and what moved to the next sprint. This single change stopped the pattern of constant overload and made delivery predictable for the first time.
                    </p>
                    <div style={{ display: "flex", gap: ".75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
                      {["Weekly planning", "Capacity mapping", "Scope protection", "3-week sprint cadence"].map((t, i) => (
                        <span key={i} style={{ fontSize: ".72rem", fontWeight: 600, padding: ".3rem .85rem", borderRadius: 8, background: "rgba(0,113,227,.12)", border: "1px solid rgba(0,113,227,.25)", color: "#0071e3" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 02 — Roadmap */}
            <ScrollReveal delay={60}>
              <div style={{ padding: "2.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 24 }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🗺️</div>
                  <div>
                    <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".5rem" }}>02 — Design Roadmap</p>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".75rem", letterSpacing: "-.01em" }}>Roadmap visible to all PMs and stakeholders</h3>
                    <p style={{ fontSize: ".97rem", color: "rgba(255,255,255,.62)", lineHeight: 1.8 }}>
                      I created and maintained the first design roadmap in the project's history — and made it a shared artifact. Every Product Manager could see what design was working on, what was coming next, and how design decisions connected to product delivery. This eliminated the "what is design doing?" friction and turned design into a predictable, strategic partner instead of a reactive service.
                    </p>
                    <div style={{ display: "flex", gap: ".75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
                      {["Shared with all PMs", "Delivery milestones", "Design dependencies visible", "Quarterly view"].map((t, i) => (
                        <span key={i} style={{ fontSize: ".72rem", fontWeight: 600, padding: ".3rem .85rem", borderRadius: 8, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 03 — AI + Jira */}
            <ScrollReveal delay={100}>
              <div style={{ padding: "2.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 24 }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>⚡</div>
                  <div>
                    <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".5rem" }}>03 — AI & Design Jira</p>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".75rem", letterSpacing: "-.01em" }}>AI-powered cards to standardize every process</h3>
                    <p style={{ fontSize: ".97rem", color: "rgba(255,255,255,.62)", lineHeight: 1.8 }}>
                      I built a dedicated Design Jira board with AI-generated ticket templates for each design phase. Instead of writing cards from scratch every sprint, the team used structured templates — automatically populated with the right fields, acceptance criteria, and definition of done for that type of task. This standardized how we documented work, reduced back-and-forth with Engineering, and made handoffs predictable and consistent across the entire team.
                    </p>
                    <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: ".75rem" }}>
                      {[
                        { icon: "🤖", title: "AI card templates", desc: "Auto-populated per design phase" },
                        { icon: "📋", title: "Standardized handoff", desc: "Same format every sprint" },
                        { icon: "🔗", title: "Engineering alignment", desc: "No more 'what does this mean?'" },
                      ].map((item, i) => (
                        <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,.06)" }}>
                          <div style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>{item.icon}</div>
                          <div style={{ fontSize: ".85rem", fontWeight: 600, color: "#f5f5f7", marginBottom: ".25rem" }}>{item.title}</div>
                          <div style={{ fontSize: ".78rem", color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 04 — Ceremonies */}
            <ScrollReveal delay={140}>
              <div style={{ padding: "2.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 24 }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🗓</div>
                  <div>
                    <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".5rem" }}>04 — 7 Ceremonies</p>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".75rem", letterSpacing: "-.01em" }}>7 alignment spaces where there were zero</h3>
                    <p style={{ fontSize: ".97rem", color: "rgba(255,255,255,.62)", lineHeight: 1.8 }}>
                      I established the full ceremony stack: sprint planning, design critique, usability test review, cross-team alignment with Product and Engineering, weekly client sync, desk checks, and retrospectives. Each ceremony had a clear owner, agenda, and outcome. The 3-week sprint cadence gave everyone — including the client — a rhythm they could count on.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4, 1fr)", gap: "1rem", marginTop: "1.5rem" }}>
                      {[{ n: "0 → 7", l: "Ceremonies" }, { n: "3-wk", l: "Sprint cadence" }, { n: "0×", l: "Rework post-gov." }, { n: "100%", l: "Team alignment" }].map((m, i) => (
                        <div key={i} style={{ padding: "1.1rem", background: "rgba(255,255,255,.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,.06)", textAlign: "center" }}>
                          <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em" }}>{m.n}</div>
                          <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.38)", marginTop: ".2rem", textTransform: "uppercase", letterSpacing: ".05em" }}>{m.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ═══ PHOTO BREAK 2 ═══ */}
      <ScrollReveal type="scale">
        <PhotoBlock
          src="/rafael-working.jpg"
          alt="Design process in action"
          height={isMobile ? "50vh" : "60vh"}
        />
      </ScrollReveal>

      {/* ═══ 05 · TEAM ═══ */}
      <section style={{ padding: pad, background: "rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Team & people</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "1rem", lineHeight: 1.1 }}>
              Built and led a team of 3.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.55)", lineHeight: 1.75, marginBottom: "3rem" }}>
              Managing people and the process at the same time — while working in Spanish, not my native language.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" }}>
              {[
                { track: "Discovery Track", role: "Research, usability testing, future-sprint preparation", icon: "🔍", color: "rgba(0,200,150,.08)", border: "rgba(0,200,150,.2)", label: "rgba(0,200,150,.8)" },
                { track: "Delivery Track", role: "UI design, handoff to Engineering, client alignment", icon: "🚀", color: "rgba(0,113,227,.08)", border: "rgba(0,113,227,.25)", label: "#0071e3" },
              ].map((t, i) => (
                <div key={i} style={{ padding: "2rem", borderRadius: 20, background: t.color, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: ".75rem" }}>{t.icon}</div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".4rem" }}>{t.track}</h4>
                  <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.5)", lineHeight: 1.65 }}>{t.role}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div style={{ padding: "2rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20 }}>
              <p style={{ fontSize: ".97rem", color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>
                Beyond the workflow split, I led recruitment — personally interviewing and onboarding a third designer — and managed the full transition plan: roll-off for the outgoing designer, onboarding structure for the new hire. All of this while protecting the account's delivery continuity and maintaining client confidence through the transition.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 06 · ALL OUTCOMES ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Results</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "3rem", lineHeight: 1.1 }}>
              Team efficiency. Process health.<br />Client trust rebuilt.
            </h2>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1.25rem", marginBottom: "3rem" }}>
            <ScrollReveal delay={0}><Metric before="8 weeks" after="3 weeks" label="Design delivery cycle" /></ScrollReveal>
            <ScrollReveal delay={60}><Metric before="0 ceremonies" after="7" label="Alignment spaces created" /></ScrollReveal>
            <ScrollReveal delay={100}><Metric before="Reactive" after="Planned" label="Sprint structure" /></ScrollReveal>
            <ScrollReveal delay={140}><Metric before="No roadmap" after="Shared roadmap" label="Visibility across all PMs" /></ScrollReveal>
            <ScrollReveal delay={180}><Metric before="Manual cards" after="AI templates" label="Jira standardization" /></ScrollReveal>
            <ScrollReveal delay={220}><Metric before="High conflict" after="100% trust" label="Client relationship" /></ScrollReveal>
          </div>

          {/* Big stat highlight */}
          <ScrollReveal delay={80}>
            <div style={{ padding: isMobile ? "2.5rem" : "4rem", background: "linear-gradient(135deg, rgba(0,113,227,.12) 0%, rgba(0,113,227,.03) 100%)", border: "1px solid rgba(0,113,227,.25)", borderRadius: 28, textAlign: "center" }}>
              <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(0,113,227,.8)", marginBottom: "2rem" }}>Delivery cycle reduction</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? "1.5rem" : "3rem", flexWrap: "wrap" }}>
                <BigStat value={<Counter to={8} suffix="w" />} label="Before" sub="Avg. delivery cycle" />
                <div style={{ fontSize: "2rem", color: "rgba(0,113,227,.5)" }}>→</div>
                <BigStat value={<Counter to={3} suffix="w" />} label="After" sub="Stable sprint structure" />
                <div style={{ width: 1, height: 60, background: "rgba(255,255,255,.1)", display: isMobile ? "none" : "block" }} />
                <BigStat value={<><Counter to={60} suffix="%" /></>} label="Reduction" sub="In delivery cycle time" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PHOTO BREAK 3 ═══ */}
      <ScrollReveal type="scale">
        <PhotoBlock
          src="/cinematic/design-system.jpg"
          alt="Leadership and team"
          height={isMobile ? "45vh" : "50vh"}
        />
      </ScrollReveal>

      {/* ═══ 07 · RECOGNITION ═══ */}
      <section style={{ padding: pad, background: "rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Recognition</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "1rem", lineHeight: 1.1 }}>
              Validated from every direction.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.5)", lineHeight: 1.75, marginBottom: "3rem" }}>
              Formally designated <strong style={{ color: "#f5f5f7" }}>Leader of the UX Front</strong> and added to the Extended Client Leadership Team — in under two months.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { icon: "🏆", title: "Designated Leader of the UX Front", by: "Formally by delivery principal" },
                { icon: "📋", title: "Extended Client Leadership Team (CLT)", by: "Rare for a designer at Senior grade" },
                { icon: "⭐", title: "Consistently Exceeded Expectations", by: "Annual assessment 2025–2026" },
                { icon: "🌐", title: "All negotiations conducted in Spanish", by: "Not my native language — Portuguese" },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.4rem 1.5rem", borderRadius: 16, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
                  <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{b.icon}</span>
                  <div>
                    <h4 style={{ fontSize: ".95rem", fontWeight: 600, color: "#f5f5f7", marginBottom: ".3rem", lineHeight: 1.4 }}>{b.title}</h4>
                    <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.35)" }}>{b.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <ScrollReveal delay={0}>
              <Quote
                text="You didn't just identify the chaos — you solved it. The 5-phase plan, the sprint structure, the roadmap — the most important part was how you built it: by involving PMs, Tech Leads, and the client for validation. That isn't the work of an executor; it's the work of a leader."
                author="Mafer Escudero"
                role="Delivery Principal · Thoughtworks"
              />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <Quote
                text="Your performance doesn't just meet — it consistently exceeds the expectations of the Senior grade. You are unequivocally operating at a Lead level. Your formal designation as Leader of the UX front is the obvious and deserved recognition of that fact."
                author="Pamela Nunez"
                role="Principal PM · Thoughtworks"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ 08 · NEXT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem" }}>Next case study</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "2.5rem" }}>
              From <em style={{ color: "#0071e3", fontStyle: "italic" }}>two stars</em><br />to category-defining.
            </h2>
            <Link href="/work/cvc" className="btn-blue" style={{ padding: ".85rem 2.5rem", fontSize: ".95rem" }}>
              CVC · Flights App →
            </Link>
          </ScrollReveal>
        </div>
        <footer style={{ marginTop: "6rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)", textDecoration: "none" }}>Home</Link>
          <Link href="/work/cvc" style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)", textDecoration: "none" }}>CVC</Link>
          <Link href="/work/rappi" style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)", textDecoration: "none" }}>Rappi</Link>
          <Link href="/about" style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)", textDecoration: "none" }}>About</Link>
        </footer>
      </section>

    </main>
  );
}
