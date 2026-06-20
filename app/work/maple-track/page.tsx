"use client";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import RevealText from "../../components/RevealText";
import useIsMobile from "../../components/useIsMobile";
import Icon from "../../components/Icon";
import CaseHero from "../../components/CaseHero";

const ACC = "#e31c5f";
const a = (o: number) => `rgba(227,28,95,${o})`;
const SHOT = "/work/maple-track";

/* ── small building blocks ── */
function Label({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: ACC, marginBottom: "1.5rem" }}>{children}</p>;
}
function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.1) 50%, transparent 100%)", margin: "0 2rem" }} />;
}

/* ── browser-window frame around a desktop screenshot ── */
function BrowserFrame({ src, alt, url }: { src: string; alt: string; url: string }) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)", background: "#15151a", boxShadow: "0 40px 90px rgba(0,0,0,.5)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 14px", background: "rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
        <div style={{ flex: 1, marginLeft: 8, height: 22, borderRadius: 7, background: "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.4)" }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          {url}
        </div>
      </div>
      <div style={{ position: "relative", aspectRatio: "1760 / 1100", background: "#0a0a0a" }}>
        <Image src={src} alt={alt} fill sizes="(max-width:768px) 90vw, 62vw" style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}

/* ── phone bezel around a mobile screenshot ── */
function PhoneFrame({ src, alt, width = "100%" }: { src: string; alt: string; width?: number | string }) {
  return (
    <div style={{ width, borderRadius: 38, padding: 7, background: "linear-gradient(160deg,#2c2c33,#0b0b0d)", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 30px 70px rgba(0,0,0,.55)" }}>
      <div style={{ position: "relative", borderRadius: 31, overflow: "hidden", aspectRatio: "693 / 1500", background: "#000" }}>
        <Image src={src} alt={alt} fill sizes="260px" style={{ objectFit: "cover" }} />
        <div aria-hidden style={{ position: "absolute", bottom: 7, left: "50%", transform: "translateX(-50%)", width: "32%", height: 4, borderRadius: 3, background: "rgba(0,0,0,.35)" }} />
      </div>
    </div>
  );
}

/* ── desktop + phone shown together ── */
function DeviceDuo({ desktop, mobile, alt, url, isMobile }: { desktop: string; mobile: string; alt: string; url: string; isMobile: boolean }) {
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem", alignItems: "center" }}>
        <BrowserFrame src={desktop} alt={alt} url={url} />
        <PhoneFrame src={mobile} alt={alt + " — mobile"} width={190} />
      </div>
    );
  }
  return (
    <div style={{ position: "relative", paddingBottom: "2.5rem", paddingRight: "1rem" }}>
      <BrowserFrame src={desktop} alt={alt} url={url} />
      <div style={{ position: "absolute", right: "-1rem", bottom: "-1.5rem", width: "23%", zIndex: 3 }}>
        <PhoneFrame src={mobile} alt={alt + " — mobile"} />
      </div>
    </div>
  );
}

/* ── full-bleed, gently tilted browser showcase ── */
function Showcase({ desktop, url, alt, isMobile, rail }: { desktop: string; url: string; alt: string; isMobile: boolean; rail?: ReactNode }) {
  const frame = <BrowserFrame src={desktop} alt={alt} url={url} />;
  return (
    <div>
      {rail && <div style={{ marginBottom: isMobile ? "2rem" : "3rem" }}>{rail}</div>}
      {isMobile ? frame : (
        <div style={{ width: "min(1300px, 94vw)", marginLeft: "50%", transform: "translateX(-50%)" }}>
          <div style={{ transform: "perspective(2600px) rotateX(4deg)", transformOrigin: "center top" }}>{frame}</div>
        </div>
      )}
    </div>
  );
}

/* ── desktop browser with numbered annotation pills (+ optional phone inset) ── */
function Annotated({ desktop, url, alt, notes, phone, isMobile }: { desktop: string; url: string; alt: string; notes: { x: number; y: number; t: string }[]; phone?: string; isMobile: boolean }) {
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
        <BrowserFrame src={desktop} alt={alt} url={url} />
        <div style={{ display: "flex", flexDirection: "column", gap: ".7rem", width: "100%" }}>
          {notes.map((n, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: ".7rem", fontSize: ".88rem", color: "rgba(255,255,255,.72)" }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: a(0.15), border: `1px solid ${a(0.5)}`, color: ACC, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
              {n.t}
            </div>
          ))}
        </div>
        {phone && <PhoneFrame src={phone} alt={alt + " — mobile"} width={180} />}
      </div>
    );
  }
  return (
    <div style={{ position: "relative", paddingBottom: phone ? "2rem" : 0 }}>
      <BrowserFrame src={desktop} alt={alt} url={url} />
      {notes.map((n, i) => (
        <div key={i} style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", zIndex: 4, display: "flex", alignItems: "center", gap: ".45rem", padding: ".4rem .75rem", borderRadius: 100, background: "rgba(10,10,12,.82)", border: `1px solid ${a(0.55)}`, backdropFilter: "blur(6px)", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(0,0,0,.45)" }}>
          <span style={{ width: 16, height: 16, borderRadius: "50%", background: ACC, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".62rem", fontWeight: 700 }}>{i + 1}</span>
          <span style={{ fontSize: ".74rem", color: "#fff", fontWeight: 500 }}>{n.t}</span>
        </div>
      ))}
      {phone && (
        <div style={{ position: "absolute", left: "-1.25rem", bottom: "-1.5rem", width: "16%", zIndex: 5 }}>
          <PhoneFrame src={phone} alt={alt + " — mobile"} />
        </div>
      )}
    </div>
  );
}

/* ── three phones fanned out ── */
function PhoneFan({ items, isMobile }: { items: { src: string; alt: string }[]; isMobile: boolean }) {
  const W = isMobile ? 116 : 200;
  const ov = isMobile ? -32 : -60;
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
      <div style={{ width: W, transform: "rotate(-8deg)", marginRight: ov, marginTop: isMobile ? 18 : 34, zIndex: 1 }}><PhoneFrame src={items[0].src} alt={items[0].alt} /></div>
      <div style={{ width: W, zIndex: 3 }}><PhoneFrame src={items[1].src} alt={items[1].alt} /></div>
      <div style={{ width: W, transform: "rotate(8deg)", marginLeft: ov, marginTop: isMobile ? 18 : 34, zIndex: 1 }}><PhoneFrame src={items[2].src} alt={items[2].alt} /></div>
    </div>
  );
}

/* ── the 10-step onboarding stepper, rebuilt ── */
function OnboardingSteps() {
  const steps = ["Boas-vindas", "Perfil", "Educação", "Experiência", "Idiomas", "Cônjuge", "Finanças", "Filhos", "Preferências", "Resultado"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", justifyContent: "center", marginTop: "2.75rem" }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: ".5rem", padding: ".38rem .8rem", borderRadius: 100, border: `1px solid ${i < 1 ? a(0.5) : "rgba(255,255,255,.1)"}`, background: i < 1 ? a(0.08) : "transparent" }}>
          <span style={{ width: 18, height: 18, borderRadius: "50%", background: i < 1 ? ACC : "rgba(255,255,255,.1)", color: i < 1 ? "#fff" : "rgba(255,255,255,.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".62rem", fontWeight: 700 }}>{i + 1}</span>
          <span style={{ fontSize: ".72rem", color: i < 1 ? "#fff" : "rgba(255,255,255,.5)" }}>{s}</span>
        </div>
      ))}
    </div>
  );
}

/* ── two desktop browsers side by side, optional phone on the seam ── */
function TwoUp({ left, right, phone, alt, isMobile }: { left: { src: string; url: string }; right: { src: string; url: string }; phone?: string; alt: string; isMobile: boolean }) {
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
        <BrowserFrame src={left.src} alt={alt} url={left.url} />
        <BrowserFrame src={right.src} alt={alt + " — compare"} url={right.url} />
        {phone && <PhoneFrame src={phone} alt={alt + " — mobile"} width={180} />}
      </div>
    );
  }
  return (
    <div style={{ position: "relative", paddingBottom: phone ? "1.5rem" : 0 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>
        <BrowserFrame src={left.src} alt={alt} url={left.url} />
        <BrowserFrame src={right.src} alt={alt + " — compare"} url={right.url} />
      </div>
      {phone && (
        <div style={{ position: "absolute", left: "50%", bottom: "-1.5rem", transform: "translateX(-50%)", width: "14%", zIndex: 5 }}>
          <PhoneFrame src={phone} alt={alt + " — mobile"} />
        </div>
      )}
    </div>
  );
}

/* ── Plan A/B/C, rebuilt from the data ── */
function PlanColumns({ isMobile }: { isMobile: boolean }) {
  const plans = [
    { tag: "Plan A", kind: "Primary path", title: "Atlantic Immigration Program", rows: [["Processing", "~12 mo"], ["Min. CLB", "4"]], hi: true },
    { tag: "Plan B", kind: "Complements A", title: "Express Entry — FSWP", rows: [["Processing", "~6 mo"], ["Min. CLB", "7"], ["Min. CRS", "470"], ["Funds", "CAD 13,757"]], hi: false },
    { tag: "Plan C", kind: "Fallback", title: "Study Permit → PGWP → PR", rows: [["Processing", "~36 mo"], ["Min. CLB", "6"], ["Funds", "CAD 20,000"]], hi: false },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1rem" }}>
      {plans.map((p) => (
        <div key={p.tag} style={{ padding: "1.5rem", borderRadius: 16, border: `1px solid ${p.hi ? a(0.4) : "rgba(255,255,255,.1)"}`, background: p.hi ? a(0.06) : "#0a0a0a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: ".64rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#fff", background: p.hi ? ACC : "rgba(255,255,255,.14)", padding: ".25rem .6rem", borderRadius: 100 }}>{p.tag}</span>
            <span style={{ fontSize: ".7rem", color: "rgba(255,255,255,.4)" }}>{p.kind}</span>
          </div>
          <h3 style={{ fontSize: "1.02rem", fontWeight: 600, color: "#fff", marginBottom: "1.25rem", letterSpacing: "-.01em", lineHeight: 1.25, minHeight: isMobile ? undefined : "2.5em" }}>{p.title}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: ".55rem" }}>
            {p.rows.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: ".8rem", borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: ".55rem" }}>
                <span style={{ color: "rgba(255,255,255,.4)" }}>{k}</span>
                <span style={{ color: "rgba(255,255,255,.85)", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── progress rail (Início → Cidadania) ── */
function ProgressRail({ isMobile }: { isMobile: boolean }) {
  return (
    <div style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: isMobile ? "1.25rem" : "1.5rem 2rem", background: "#0a0a0a" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".9rem" }}>
        <span style={{ fontSize: ".8rem", color: "#fff", fontWeight: 600 }}>Plano A — 3 of 27 steps</span>
        <span style={{ fontSize: ".85rem", color: ACC, fontWeight: 700 }}>11%</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i === 0 ? ACC : i === 1 ? a(0.4) : "rgba(255,255,255,.1)" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".7rem", fontSize: ".7rem", color: "rgba(255,255,255,.4)" }}>
        <span>Início</span>
        <span style={{ color: "rgba(255,255,255,.7)" }}>Fase 2 · Testes de Idioma</span>
        <span>Cidadania</span>
      </div>
    </div>
  );
}

/* ── phone + magnified loupe of the real UI ── */
function DetailZoom({ phone, zoomSrc, zoomPos, caption, alt, isMobile }: { phone: string; zoomSrc: string; zoomPos: string; caption: string; alt: string; isMobile: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "2.5rem" : "4rem", alignItems: "center", justifyContent: "center" }}>
      <PhoneFrame src={phone} alt={alt} width={isMobile ? 200 : 235} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: isMobile ? 210 : 300, height: isMobile ? 210 : 300, borderRadius: 24, border: `2px solid ${a(0.6)}`, boxShadow: "0 30px 70px rgba(0,0,0,.5)", backgroundImage: `url(${zoomSrc})`, backgroundSize: "300%", backgroundPosition: zoomPos, backgroundRepeat: "no-repeat", backgroundColor: "#0a0a0a" }} />
        <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.45)", letterSpacing: ".03em", maxWidth: 300, textAlign: "center", lineHeight: 1.5 }}>{caption}</p>
      </div>
    </div>
  );
}

function Title({ lines, mb }: { lines: ReactNode[]; mb?: string }) {
  return (
    <RevealText
      lines={lines}
      style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: mb ?? "1.5rem", maxWidth: 760 }}
    />
  );
}
function Lead({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 660 }}>{children}</p>;
}

const em = (t: string) => <em style={{ color: ACC, fontStyle: "italic" }}>{t}</em>;

/* ══════════════════════════════════════════
   MAPLETRACK — 0→1 IMMIGRATION PRODUCT
   ══════════════════════════════════════════ */
export default function MapleTrackCasePage() {
  const isMobile = useIsMobile();
  const pad = isMobile ? "5rem 1.5rem" : "8rem 6rem";
  const wrap = (children: ReactNode, bg?: string) => (
    <section style={{ padding: pad, background: bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
    </section>
  );

  return (
    <main className="page-in dark-cursor" style={{ background: "#000" }}>

      {/* ═══ 05 · HERO ═══ */}
      <CaseHero
        accent={ACC}
        index="05"
        company="Personal Product · 0 → 1"
        titleLines={["MapleTrack —", <em key="t" style={{ color: ACC, fontStyle: "italic" }}>your GPS to Canada.</em>]}
        subtitle="No tool guides a couple through Canadian immigration end to end — so I designed and built one. A responsive product that scores your profile, ranks your pathways, and shows the next step every single day, from profile analysis to citizenship."
        tags={["0 → 1 Product", "Web + Mobile", "Founder · Solo build", "Built with Claude Code"]}
        stats={[
          { n: "0 → 1", l: "Greenfield product" },
          { n: "9 phases", l: "Research → citizenship" },
          { n: "Web + App", l: "Fully responsive" },
          { n: "~2 weeks", l: "Design to ship, solo" },
        ]}
      />

      {/* ═══ OPENING VISUAL — the cockpit ═══ */}
      <section style={{ padding: isMobile ? "1rem 1.5rem 4rem" : "0 6rem 6rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <ScrollReveal type="scale">
            <Showcase isMobile={isMobile} desktop={`${SHOT}/dashboard-desktop.png`} url="app.mapletrack.io/dashboard" alt="MapleTrack dashboard" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p style={{ textAlign: "center", fontSize: ".8rem", color: "rgba(255,255,255,.35)", marginTop: isMobile ? "1.5rem" : "3rem", letterSpacing: ".04em" }}>
              One product, every screen — the daily cockpit that always answers “what do we do next?”
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 01 · THE PROBLEM ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <ScrollReveal>
            <Label>01 — The problem</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              Nobody could guide them.<br />{em("So nobody did.")}
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              My wife Luana and I decided to immigrate to Canada. Every consultancy we found ran a closed back-office: we’d pay, we’d wait, and we’d never actually know where we stood. No clarity on the path, no idea of our score, no sense of what came next.
            </p>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>
              And immigration law was tightening by the month. Every week without a plan was a week lost. There was no self-service product that simply <span style={{ color: "#fff" }}>guided a family through it</span> — so I decided to design and build the one I wished existed.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                ["Where are we in the process?", "No single source of truth"],
                ["What’s our CRS score?", "Never actually calculated"],
                ["Who’s the stronger applicant?", "Rafael or Luana — unknown"],
                ["Which path fits us?", "And what if the law changes?"],
                ["What do we do today?", "No clear daily next step"],
              ].map(([q, sub], i) => (
                <div key={i} style={{ padding: "1.15rem 1.4rem", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, background: "#0a0a0a" }}>
                  <p style={{ fontSize: ".92rem", fontWeight: 600, color: "#fff", marginBottom: ".3rem", display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
                    <span style={{ color: ACC, display: "flex" }}><Icon name="close" size={15} /></span> {q}
                  </p>
                  <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.4)", paddingLeft: "1.55rem" }}>{sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 02 · THE APPROACH ═══ */}
      {wrap(
        <>
          <ScrollReveal>
            <Label>02 — The approach</Label>
            <Title lines={["One product.", em("Built solo in two weeks.")]} mb="1.5rem" />
            <Lead>
              Instead of waiting on a consultancy, I gave myself a Shape-Up appetite — two weeks — and shipped a real, responsive product end to end: design system, front-end and data model, pair-programming the whole build with <span style={{ color: "#fff" }}>Claude Code</span>, Anthropic’s AI. Three rules drove every decision.
            </Lead>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)", margin: "3.5rem 0" }}>
              {([
                { icon: "compass", title: "Guide, don’t inform", body: "Every screen ends in a next step — never a wall of text. The product always knows what to do today." },
                { icon: "layers", title: "Plan A, B and C", body: "Run parallel pathways at once and switch the moment a law shifts. The strategy never rests on one bet." },
                { icon: "globe", title: "A couple, not a user", body: "Two applicants, one household, shared progress and separate logins. Designed for a family, not an account." },
              ] as const).map((s, i) => (
                <div key={i} style={{ padding: "2.5rem 2rem", background: "#0a0a0a" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: a(0.1), border: `1px solid ${a(0.25)}`, display: "flex", alignItems: "center", justifyContent: "center", color: ACC, marginBottom: "1.25rem" }}>
                    <Icon name={s.icon} size={21} />
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: ".75rem" }}>{s.title}</h3>
                  <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120} type="scale">
            <DeviceDuo isMobile={isMobile} desktop={`${SHOT}/landing-desktop.png`} mobile={`${SHOT}/landing-mobile.png`} alt="MapleTrack landing page" url="mapletrack.io" />
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ textAlign: "center", fontSize: ".8rem", color: "rgba(255,255,255,.32)", marginTop: isMobile ? "1.5rem" : "3rem", letterSpacing: ".04em" }}>
              Built in Portuguese for a Brazilian audience — “Seu GPS para imigrar para o Canadá.”
            </p>
          </ScrollReveal>
        </>
      )}

      <Divider />

      {/* ═══ 03 · ONBOARDING — DEFINE THE PROFILE ═══ */}
      {wrap(
        <Feature
          isMobile={isMobile}
          label="03 — Define the profile"
          titleLines={["Ten questions", em("that set the whole strategy.")]}
          body="Everything downstream — the score, the ranked programs, the plans — rests on one thing: a profile that truly reflects the applicant. A guided 10-step onboarding walks each person through age, education, work history, language, family, finances and goals — so MapleTrack can recommend the right pathways from the very first session."
          chips={["10 guided steps", "Per applicant", "Powers every recommendation", "Minutes, not forms"]}
          visual={
            <>
              <PhoneFan
                isMobile={isMobile}
                items={[
                  { src: `${SHOT}/onb-welcome-mobile.png`, alt: "Onboarding — welcome" },
                  { src: `${SHOT}/onb-personal-mobile.png`, alt: "Onboarding — personal profile" },
                  { src: `${SHOT}/onb-education-mobile.png`, alt: "Onboarding — education" },
                ]}
              />
              <OnboardingSteps />
            </>
          }
        />,
        "#050505"
      )}

      <Divider />

      {/* ═══ 04 · SIMULATOR ═══ */}
      {wrap(
        <Feature
          isMobile={isMobile}
          label="04 — Score the profile"
          titleLines={["A CRS simulator", em("for two.")]}
          body="The Comprehensive Ranking System decides who gets invited. MapleTrack scores Rafael and Luana separately across the full 1,200-point model — age, education, language, experience — then layers in spouse factors to surface the strongest principal applicant. Change one input and the whole breakdown recalculates live."
          chips={["1,200-point model", "Both applicants", "Spouse factors", "Live recalculation"]}
          visual={
            <Annotated
              isMobile={isMobile}
              desktop={`${SHOT}/simulator-desktop.png`}
              url="app.mapletrack.io/simulator"
              alt="CRS simulator"
              phone={`${SHOT}/simulator-mobile.png`}
              notes={[
                { x: 75, y: 27, t: "Live CRS score" },
                { x: 78, y: 56, t: "Factor breakdown" },
                { x: 41, y: 64, t: "Add the spouse" },
              ]}
            />
          }
        />,
        "#050505"
      )}

      <Divider />

      {/* ═══ 04 · JOURNEY ═══ */}
      {wrap(
        <Feature
          isMobile={isMobile}
          label="05 — Map the path"
          titleLines={["Nine phases, twenty-seven steps,", em("one clear next move.")]}
          body="The entire route — research and eligibility, language tests, documents, application, landing — broken into 9 phases and 27 tracked steps. Each task is assigned to Rafael or Luana, tagged to a plan, and checked off as the couple advances. The progress bar runs the whole way from Início to Cidadania."
          chips={["9 phases", "27 tracked steps", "Per-person tasks", "Início → Cidadania"]}
          visual={<Showcase isMobile={isMobile} desktop={`${SHOT}/journey-desktop.png`} url="app.mapletrack.io/journey" alt="Immigration journey" rail={<ProgressRail isMobile={isMobile} />} />}
        />
      )}

      <Divider />

      {/* ═══ 05 · PROGRAMS ═══ */}
      {wrap(
        <Feature
          isMobile={isMobile}
          label="06 — Choose the route"
          titleLines={["Thirteen pathways,", em("ranked by fit.")]}
          body="Express Entry (FSWP, CEC, FST), category-based draws, every major Provincial Nominee Program, family sponsorship — 13 programs in the knowledge base, each with processing time, CRS cut-off, required funds and language minimums. Compare them side by side, then open any one for the full breakdown."
          chips={["13 programs", "Ranked by fit", "Side-by-side compare", "Full detail view"]}
          visual={
            <TwoUp
              isMobile={isMobile}
              left={{ src: `${SHOT}/programs-desktop.png`, url: "app.mapletrack.io/programs" }}
              right={{ src: `${SHOT}/programs-compare-desktop.png`, url: "app.mapletrack.io/programs/compare" }}
              phone={`${SHOT}/program-detail-mobile.png`}
              alt="Immigration programs"
            />
          }
        />,
        "#050505"
      )}

      <Divider />

      {/* ═══ 06 · PLANS ═══ */}
      {wrap(
        <Feature
          isMobile={isMobile}
          label="07 — Hedge the bet"
          titleLines={["Plan A, B and C —", em("running in parallel.")]}
          body="Immigration law changes without warning, so the strategy never rests on one path. Plan A is the Atlantic Immigration Program; Plan B, Express Entry FSWP; Plan C, a Study Permit → PGWP → PR route. Each carries its own timeline, costs and language targets — and the couple can promote any plan to primary at any time."
          chips={["3 parallel plans", "Switch anytime", "Costs & timelines", "Risk-hedged"]}
          visual={
            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "2rem" : "2.5rem" }}>
              <PlanColumns isMobile={isMobile} />
              <BrowserFrame src={`${SHOT}/plans-desktop.png`} alt="Plans" url="app.mapletrack.io/plans" />
            </div>
          }
        />
      )}

      <Divider />

      {/* ═══ 07 · LANGUAGES ═══ */}
      {wrap(
        <Feature
          isMobile={isMobile}
          label="08 — Hit the targets"
          titleLines={["Language scores,", em("tracked to the point.")]}
          body="Language is the biggest CRS lever, so it gets its own cockpit. Each applicant’s CELPIP/IELTS scores are tracked skill by skill against the exact benchmark every plan requires — “Plano A: atingido”, “Plano B: faltam 1 pt” — with test dates counting down to the booking."
          chips={["CELPIP · IELTS · TEF", "Skill-by-skill", "Target per plan", "Test countdowns"]}
          visual={<DetailZoom isMobile={isMobile} phone={`${SHOT}/languages-mobile.png`} zoomSrc={`${SHOT}/languages-desktop.png`} zoomPos="26% 56%" caption="CELPIP — every skill scored against each plan’s exact target" alt="Language preparation" />}
        />,
        "#050505"
      )}

      <Divider />

      {/* ═══ 08 · DOCUMENTS ═══ */}
      {wrap(
        <Feature
          isMobile={isMobile}
          label="09 — Stay ready"
          titleLines={["Every document,", em("every deadline.")]}
          body="A document hub organised by category — identity, education, language, finances, legal — that tracks status (submitted, translation pending), flags what’s expired, and keeps the couple’s paperwork audit-ready for whichever plan goes live first."
          chips={["By category", "Status tracking", "Translation flags", "Expiry alerts"]}
          visual={<Showcase isMobile={isMobile} desktop={`${SHOT}/documents-desktop.png`} url="app.mapletrack.io/documents" alt="Document hub" />}
        />
      )}

      <Divider />

      {/* ═══ 09 · MOMENTUM ═══ */}
      {wrap(
        <>
          <ScrollReveal>
            <Label>10 — Keep the momentum</Label>
            <Title lines={["A process this long", em("needs motivation.")]} />
            <Lead>
              Immigration takes years, so MapleTrack is built to keep a couple moving — XP and achievements for each milestone, gentle nudges and notifications, and a household where Rafael and Luana share one journey under separate logins.
            </Lead>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div style={{ display: "flex", gap: isMobile ? "1.25rem" : "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "3.5rem" }}>
              {[
                ["achievements-mobile", "Achievements & XP"],
                ["notifications-mobile", "Smart notifications"],
                ["settings-mobile", "Household & profile"],
              ].map(([file, cap]) => (
                <div key={file} style={{ width: isMobile ? 150 : 220, display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                  <PhoneFrame src={`${SHOT}/${file}.png`} alt={cap} />
                  <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.4)", letterSpacing: ".04em" }}>{cap}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </>,
        "#050505"
      )}

      <Divider />

      {/* ═══ 10 · CRAFT / DESIGN SYSTEM ═══ */}
      {wrap(
        <>
          <ScrollReveal>
            <Label>11 — The craft</Label>
            <Title lines={["One design system.", em("Every breakpoint.")]} />
            <Lead>
              The whole product runs on a single token set — the MapleTrack rose, Airbnb-grade spacing and type — with shadcn/ui primitives, keyboard and contrast accessibility, and layouts that hold from a 390px phone to a widescreen desktop. The same product, everywhere.
            </Lead>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "3rem" }}>
              {([
                ["#E31C5F", "Rose / primary"],
                ["#FF385C", "Rose light"],
                ["#C81E4E", "Rose dark"],
                ["#16A34A", "Success"],
                ["#E07912", "Warning"],
                ["#0A0A0A", "Ink"],
              ] as const).map(([hex, name]) => (
                <div key={hex} style={{ flex: isMobile ? "1 1 40%" : "1", minWidth: 120, border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, overflow: "hidden", background: "#0a0a0a" }}>
                  <div style={{ height: 64, background: hex }} />
                  <div style={{ padding: ".75rem .9rem" }}>
                    <p style={{ fontSize: ".78rem", fontWeight: 600, color: "#fff" }}>{name}</p>
                    <code style={{ fontSize: ".68rem", color: "rgba(255,255,255,.4)" }}>{hex}</code>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)", marginTop: "1rem" }}>
              {[
                ["Claude Code", "AI pair-builder", true],
                ["Next.js 16", "App Router · RSC", false],
                ["shadcn/ui", "Accessible primitives", false],
                ["Drizzle + Neon", "Type-safe Postgres", false],
                ["Auth.js", "Household sessions", false],
              ].map(([n, l, hi]) => (
                <div key={n as string} style={{ padding: "1.75rem 1.5rem", background: hi ? a(0.08) : "#0a0a0a" }}>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700, color: hi ? ACC : "#fff", letterSpacing: "-.02em" }}>{n}</p>
                  <p style={{ fontSize: ".74rem", color: "rgba(255,255,255,.4)", marginTop: ".4rem" }}>{l}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </>
      )}

      <Divider />

      {/* ═══ 11 · WHERE IT STANDS ═══ */}
      {wrap(
        <>
          <ScrollReveal>
            <Label>12 — Where it stands</Label>
            <Title lines={["A working product —", em("the first of its kind.")]} mb="1rem" />
            <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.3)", marginBottom: "3.5rem", letterSpacing: ".06em" }}>Live MVP · in daily use by the household</p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
            {[
              { n: "0 → 1", l: "A product where none existed" },
              { n: "13", l: "Immigration pathways modelled" },
              { n: "27", l: "Journey steps, end to end" },
              { n: "2 logins", l: "One shared household" },
            ].map((m, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ padding: "2.5rem 1.75rem", background: "#0a0a0a", height: "100%" }}>
                  <p style={{ fontSize: "clamp(1.8rem,3.2vw,2.8rem)", fontWeight: 700, color: ACC, letterSpacing: "-.04em", lineHeight: 1, marginBottom: ".75rem" }}>{m.n}</p>
                  <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", lineHeight: 1.5 }}>{m.l}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </>,
        "#050505"
      )}

      <Divider />

      {/* ═══ 12 · WHAT I LEARNED ═══ */}
      {wrap(
        <ScrollReveal>
          <Label>13 — What I learned</Label>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "2rem" }}>
            {([
              { icon: "compass", title: "Designing for yourself is the ultimate brief.", body: "Being user zero meant every gap in the experience was a gap in my own life. The feedback loop was instant and ruthless — the best research I’ve ever had." },
              { icon: "zap", title: "A designer can ship production code now.", body: "Pair-programming with Claude Code, I took this from Figma thinking to a deployed, database-backed product — solo. The design-to-build handoff simply disappeared." },
              { icon: "layers", title: "A design system pays off even at n=1.", body: "One token set and a small component library made ten feature areas feel like one product — and let me move at two-week speed without the UI drifting." },
              { icon: "target", title: "Guidance beats information.", body: "Consultancies hand you data and a bill. The unlock wasn’t more information — it was always showing the single next step. Direction is the product." },
            ] as const).map((l, i) => (
              <div key={i} style={{ padding: "2rem", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: a(0.1), border: `1px solid ${a(0.25)}`, display: "flex", alignItems: "center", justifyContent: "center", color: ACC, marginBottom: "1.25rem" }}>
                  <Icon name={l.icon} size={20} />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: ".75rem", letterSpacing: "-.01em" }}>{l.title}</h3>
                <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{l.body}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>,
        "#050505"
      )}

      <Divider />

      {/* ═══ CTA ═══ */}
      <section className="aurora-wrap" style={{ padding: isMobile ? "6rem 1.5rem" : "10rem 6rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${a(0.1)} 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div className="aurora aurora-soft" style={{ mixBlendMode: "screen" }} />
        <ScrollReveal className="aurora-content">
          <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: ACC, marginBottom: "1.5rem" }}>More work</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.02, marginBottom: "3rem" }}>
            See how I redesigned<br /><em className="text-gradient" style={{ fontStyle: "italic" }}>CVC’s flight app.</em>
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/work/cvc" className="btn-blue">CVC Case Study →</Link>
            <Link href="/contact" className="btn-white-ghost">Get in touch</Link>
          </div>
        </ScrollReveal>
      </section>

      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.08)", padding: isMobile ? "2rem 1.5rem" : "2rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)" }}>© {new Date().getFullYear()} Rafael Guimarães</p>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="/work" style={{ fontSize: ".72rem", color: ACC, textDecoration: "none" }}>All work →</Link>
          <Link href="/" style={{ fontSize: ".72rem", color: ACC, textDecoration: "none" }}>Home</Link>
        </div>
      </footer>
    </main>
  );
}

/* ── one feature: heading + lead + chips, then a pluggable visual ── */
function Feature({
  isMobile, label, titleLines, body, chips, visual,
}: {
  isMobile: boolean; label: string; titleLines: ReactNode[]; body: string; chips: string[]; visual: ReactNode;
}) {
  return (
    <>
      <ScrollReveal>
        <Label>{label}</Label>
        <Title lines={titleLines} />
        <Lead>{body}</Lead>
        <div style={{ display: "flex", gap: ".55rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
          {chips.map((c) => (
            <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".34rem .85rem", border: `1px solid ${a(0.3)}`, borderRadius: 100, fontSize: ".74rem", color: "rgba(255,255,255,.7)" }}>
              <span style={{ color: ACC, display: "flex" }}><Icon name="check" size={13} /></span> {c}
            </span>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal delay={120} type="scale">
        <div style={{ marginTop: isMobile ? "3rem" : "4.5rem" }}>{visual}</div>
      </ScrollReveal>
    </>
  );
}
