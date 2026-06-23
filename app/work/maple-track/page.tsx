"use client";
import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import RevealText from "../../components/RevealText";
import useIsMobile from "../../components/useIsMobile";
import Icon from "../../components/Icon";
import CaseHero from "../../components/CaseHero";
import FloatingProjectNav from "../../components/FloatingProjectNav";
import SideShotShared from "../../components/SideShotShared";

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

/* ── MacBook mockup (pre-composited from Figma) ── */
function BrowserFrame({ src, alt }: { src: string; alt: string; url?: string }) {
  return (
    <div style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,.5))" }}>
      <Image src={src} alt={alt} width={1408} height={853} sizes="(max-width:768px) 90vw, 62vw" style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  );
}

/* ── small eyebrow to title a device group (so it never feels orphaned) ── */
function DeviceTag({ children }: { children: ReactNode }) {
  return (
    <p style={{ textAlign: "center", fontSize: ".64rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: ACC, marginBottom: "1.5rem" }}>
      {children}
    </p>
  );
}

/* ── tabbed browser viewer — one notebook at a time, never side by side ── */
function BrowserTabs({ items, isMobile }: { items: { src: string; alt: string; label: string }[]; isMobile: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", marginBottom: isMobile ? "1.5rem" : "2rem", flexWrap: "wrap" }}>
        {items.map((s, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: ".4rem .95rem", borderRadius: 100,
            border: `1px solid ${i === active ? a(0.5) : "rgba(255,255,255,.12)"}`,
            background: i === active ? a(0.12) : "transparent",
            color: i === active ? ACC : "rgba(255,255,255,.45)",
            fontSize: ".74rem", fontWeight: 600, cursor: "pointer", transition: "all .3s ease",
          }}>{s.label}</button>
        ))}
      </div>
      <div style={{ position: "relative", aspectRatio: "1408 / 853", filter: "drop-shadow(0 40px 80px rgba(0,0,0,.5))" }}>
        {items.map((s, i) => (
          <Image key={i} src={s.src} alt={s.alt} width={1408} height={853} sizes="(max-width:768px) 90vw, 62vw"
            style={{
              position: i === 0 ? "relative" : "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "contain", display: "block",
              opacity: i === active ? 1 : 0, transition: "opacity .5s ease",
            }} />
        ))}
      </div>
    </div>
  );
}

/* ── iPhone 16 frame (real PNG overlay) ── */
function PhoneFrame({ src, alt, width = "100%" }: { src: string; alt: string; width?: number | string }) {
  return (
    <div style={{ width, position: "relative", aspectRatio: "908 / 1880", filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
      {/* screenshot fills full frame — bezel masks the edges */}
      <div style={{ position: "absolute", top: "1.8%", left: 0, right: 0, bottom: 0, overflow: "hidden", background: "#fff" }}>
        {/* Status bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4.2%", background: "#fff", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8%" }}>
          <span style={{ fontSize: "clamp(5px,1.2vw,11px)", fontWeight: 600, color: "#000" }}>9:41</span>
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            <svg width="12" height="9" viewBox="0 0 17 11" fill="#000"><rect x="0" y="4" width="3" height="7" rx="0.5"/><rect x="4.5" y="2.5" width="3" height="8.5" rx="0.5"/><rect x="9" y="0.5" width="3" height="10.5" rx="0.5"/><rect x="13.5" y="0" width="3" height="11" rx="0.5" opacity=".3"/></svg>
            <svg width="13" height="9" viewBox="0 0 16 12" fill="#000"><path d="M8 3.2a6.3 6.3 0 0 1 4.4 1.8l1.1-1.1A8 8 0 0 0 8 1.4a8 8 0 0 0-5.5 2.5L3.6 5A6.3 6.3 0 0 1 8 3.2zm0 3a3.6 3.6 0 0 1 2.5 1l1.1-1.1A5.2 5.2 0 0 0 8 4.6a5.2 5.2 0 0 0-3.6 1.5L5.5 7.2A3.6 3.6 0 0 1 8 6.2zm0 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>
            <svg width="18" height="9" viewBox="0 0 25 11" fill="#000"><rect x="0" y="1" width="21" height="9" rx="2" stroke="#000" strokeWidth="1" fill="none"/><rect x="1.5" y="2.5" width="15" height="6" rx="1" fill="#000"/><path d="M23 4v3a1.5 1.5 0 0 0 0-3z"/></svg>
          </div>
        </div>
        {/* Screenshot */}
        <Image src={src} alt={alt} fill sizes="260px" style={{ objectFit: "cover" }} />
        {/* Home indicator */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2.5%", background: "#fff", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "35%", height: 4, borderRadius: 3, background: "#000" }} />
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/devices/iphone-16-frame.png" alt="" aria-hidden style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 2, pointerEvents: "none" }} />
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
        company="SaaS Platform · Claude · Personal Project"
        titleLines={["Immigration", <em key="t" style={{ color: ACC, fontStyle: "italic" }}>Platform.</em>]}
        subtitle="Immigration to Canada is one of the most complex bureaucratic journeys a family can face — and consultancies charge thousands for an opaque back-office. MapleTrack is a full SaaS platform I designed and built solo that guides a couple through every step: profile analysis, CRS simulation, pathway ranking, document management, language prep, job search, and gamified progress — from first assessment to citizenship."
        tags={["SaaS Platform", "Canadian Immigration", "Web + Mobile", "Claude Code", "0 → 1", "End-to-end"]}
        stats={[
          { n: "9", l: "Platform sections" },
          { n: "13", l: "Immigration pathways" },
          { n: "27", l: "Tracked steps" },
          { n: "2 weeks", l: "Designed + shipped, solo" },
        ]}
      />

      {/* ═══ OPENING VISUAL — the cockpit ═══ */}
      <section style={{ padding: isMobile ? "1rem 1.5rem 4rem" : "0 6rem 6rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <ScrollReveal type="scale">
            <BrowserFrame src={`${SHOT}/dashboard-desktop.png`} alt="MapleTrack dashboard" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p style={{ textAlign: "center", fontSize: ".8rem", color: "rgba(255,255,255,.35)", marginTop: isMobile ? "1.5rem" : "3rem", letterSpacing: ".04em" }}>
              A daily cockpit that always answers "what do we do next?"
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 01 · THE CHALLENGE ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>01 — The challenge</Label>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              How to simplify my<br />{em("immigration process?")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "5rem", alignItems: "start", marginTop: "1.5rem" }}>
              <div>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  Canadian immigration is one of the most complex bureaucratic journeys a family can face. Multiple pathways with different requirements, CRS scores that change monthly, documents that expire, language tests with specific benchmarks per program — and laws that tighten without warning.
                </p>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>
                  Consultancies charge thousands but run closed back-offices: you pay, you wait, and you never actually know where you stand. There was <span style={{ color: "#fff" }}>no self-service product</span> that guided a family through it — showing the score, ranking the pathways, tracking every document, and telling you exactly what to do today.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  ["Real family needs", "Documents, deadlines and decisions that affect your entire life"],
                  ["Complex journey", "9 phases, 27 steps, multiple pathways with different risks"],
                  ["Constantly changing laws", "Immigration rules shift monthly — every week without a plan is a week lost"],
                  ["Zero visibility", "No tool shows where you are, what's next, or who's the stronger applicant"],
                ].map(([q, sub], i) => (
                  <div key={i} style={{ padding: "1.15rem 1.4rem", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, background: "#0a0a0a" }}>
                    <p style={{ fontSize: ".92rem", fontWeight: 600, color: "#fff", marginBottom: ".3rem", display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
                      <span style={{ color: ACC, display: "flex" }}><Icon name="close" size={15} /></span> {q}
                    </p>
                    <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.4)", paddingLeft: "1.55rem" }}>{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 02 · THE SOLUTION ═══ */}
      {wrap(
        <>
          <ScrollReveal>
            <Label>02 — The solution</Label>
            <Title lines={["A complete SaaS platform", em("for immigration.")]} mb="1.5rem" />
            <Lead>
              MapleTrack is a full product — not a prototype, not a dashboard. A responsive SaaS platform with 9 integrated sections covering every aspect of the immigration journey: profile analysis, CRS simulation, pathway ranking, multi-plan strategy, document management, language tracking, job search, gamification, and household management.
            </Lead>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)", margin: "3.5rem 0" }}>
              {([
                { icon: "compass", title: "Always shows the next step", body: "Every screen ends in an action — never a wall of text. The product always knows what to do today, for each applicant." },
                { icon: "layers", title: "Plan A, B and C in parallel", body: "Run multiple immigration pathways at once and switch the moment a law shifts. The strategy never rests on one bet." },
                { icon: "globe", title: "Built for a couple, not a user", body: "Two applicants, one household, shared progress and separate logins. Each person's score, documents and tasks tracked individually." },
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
            <BrowserFrame src={`${SHOT}/landing-desktop.png`} alt="MapleTrack landing page" />
          </ScrollReveal>

          {/* HOW IT WAS BUILT — the AI angle */}
          <ScrollReveal delay={140}>
            <div style={{ marginTop: isMobile ? "3rem" : "4.5rem", padding: isMobile ? "1.75rem" : "2.25rem", borderRadius: 20, border: `1px solid ${a(0.25)}`, background: a(0.04) }}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "1.5rem" : "3rem", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: ACC, marginBottom: ".9rem" }}>How it was built</p>
                  <h3 style={{ fontSize: isMobile ? "1.3rem" : "1.6rem", fontWeight: 700, color: "#fff", letterSpacing: "-.02em", lineHeight: 1.15, marginBottom: "1rem" }}>
                    6+ months of work.<br />{em("Shipped in 2 weeks.")}
                  </h3>
                  <p style={{ fontSize: ".92rem", color: "rgba(255,255,255,.5)", lineHeight: 1.75 }}>
                    Using <span style={{ color: "#fff", fontWeight: 600 }}>Claude Code</span> as a design partner — ideation, content strategy, UX writing, frontend and backend code. Every design decision was mine; Claude executed. The result: a complete squad&apos;s output from one designer.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: `${a(0.15)}`, borderRadius: 14, overflow: "hidden" }}>
                  {[
                    { n: "1", l: "Designer", sub: "Full ownership" },
                    { n: "2 weeks", l: "To ship", sub: "End to end" },
                    { n: "9", l: "Sections", sub: "Complete platform" },
                    { n: "Claude", l: "AI partner", sub: "Pair-programming" },
                  ].map((s) => (
                    <div key={s.l} style={{ padding: isMobile ? "1rem" : "1.25rem", background: "#0a0a0c", textAlign: "center" }}>
                      <p style={{ fontSize: "1.15rem", fontWeight: 700, color: ACC, letterSpacing: "-.02em", lineHeight: 1 }}>{s.n}</p>
                      <p style={{ fontSize: ".68rem", color: "rgba(255,255,255,.5)", marginTop: ".35rem", fontWeight: 600 }}>{s.l}</p>
                      <p style={{ fontSize: ".6rem", color: "rgba(255,255,255,.3)", marginTop: ".2rem" }}>{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </>
      )}

      <Divider />

      {/* ═══ 03 · ONBOARDING — side-bleed desktop + 3 phones ═══ */}
      <section style={{ padding: isMobile ? "5rem 0" : "8rem 0", background: "#050505", overflow: "hidden" }}>
        <SideShotShared side="right" accent={ACC}
          src={`${SHOT}/onboarding-desktop.png`} alt="Onboarding wizard"
          eyebrow="03 · Define the profile"
          title="Ten questions that set the whole strategy."
          body="A guided 10-step onboarding walks each person through age, education, work history, language, family, finances and goals — so MapleTrack can recommend the right pathways from the very first session."
        />
        {/* Onboarding mobile showcase */}
        <ScrollReveal delay={100}>
          <div style={{ marginTop: isMobile ? "3.5rem" : "5.5rem", padding: "0 1.5rem" }}>
            <DeviceTag>On mobile</DeviceTag>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: isMobile ? "1rem" : "2.5rem" }}>
              <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                <Image src={`${SHOT}/mobile/onboarding.png`} alt="Onboarding — welcome" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                <Image src={`${SHOT}/mobile/profile.png`} alt="Onboarding — personal profile" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                <Image src={`${SHOT}/mobile/simulator.png`} alt="Onboarding — simulator" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            </div>
            <p style={{ textAlign: "center", fontSize: ".78rem", color: "rgba(255,255,255,.35)", marginTop: "1.75rem", letterSpacing: ".04em" }}>
              Welcome → Profile → Simulator — fully responsive, every step on any device
            </p>
          </div>
        </ScrollReveal>
      </section>

      <Divider />

      {/* ═══ 04 · SIMULATOR — desktop + mobile side by side ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>04 · Score the profile</Label>
            <Title lines={["A CRS simulator", em("for two.")]} />
            <Lead>MapleTrack scores Rafael and Luana separately across the full 1,200-point model — age, education, language, experience — then layers in spouse factors to surface the strongest principal applicant.</Lead>
          </ScrollReveal>
          <ScrollReveal delay={120} type="scale">
            <div style={{ marginTop: isMobile ? "2.5rem" : "4rem" }}>
              <BrowserFrame src={`${SHOT}/simulator-desktop.png`} alt="CRS simulator" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 05 · JOURNEY — side-bleed left ═══ */}
      <section style={{ padding: isMobile ? "5rem 0" : "8rem 0", background: "#050505", overflow: "hidden" }}>
        <SideShotShared side="left" accent={ACC}
          src={`${SHOT}/journey-desktop.png`} alt="Immigration journey"
          eyebrow="05 · Map the path"
          title="Nine phases, twenty-seven steps, one clear next move."
          body="The entire route from research to citizenship — broken into 9 phases and 27 tracked steps. Each task is assigned to Rafael or Luana, tagged to a plan, and checked off as the couple advances."
        />
      </section>

      <Divider />

      {/* ═══ 06–07 · PROGRAMS + PLANS — desktop then 3 phones ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>06–07 · Choose the route, hedge the bet</Label>
            <Title lines={["Thirteen pathways.", em("Three parallel plans.")]} />
            <Lead>Every major Canadian immigration program ranked by fit — then organised into Plan A, B and C running in parallel, so the strategy adapts the moment a law shifts.</Lead>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ marginTop: isMobile ? "2.5rem" : "4rem" }}>
              <DeviceTag>On desktop</DeviceTag>
              <BrowserFrame src={`${SHOT}/programs-desktop.png`} alt="Immigration programs" />
            </div>
          </ScrollReveal>
          {/* Mobile: programs, achievements, plans */}
          <ScrollReveal delay={140}>
            <div style={{ marginTop: isMobile ? "3.5rem" : "5.5rem" }}>
              <DeviceTag>On mobile</DeviceTag>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: isMobile ? ".75rem" : "2rem" }}>
                <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                  <Image src={`${SHOT}/mobile/programs.png`} alt="Programs — mobile" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                  <Image src={`${SHOT}/mobile/achievements.png`} alt="Achievements — mobile" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                  <Image src={`${SHOT}/mobile/plans.png`} alt="Plans — mobile" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
              <p style={{ textAlign: "center", fontSize: ".78rem", color: "rgba(255,255,255,.35)", marginTop: "1.75rem", letterSpacing: ".04em" }}>
                Programs → Achievements → Plans — the full decision flow on mobile
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 08 · LANGUAGES — side-bleed right ═══ */}
      <section style={{ padding: isMobile ? "5rem 0" : "8rem 0", background: "#050505", overflow: "hidden" }}>
        <SideShotShared side="right" accent={ACC}
          src={`${SHOT}/languages-desktop.png`} alt="Language preparation"
          eyebrow="08 · Hit the targets"
          title="Language scores, tracked to the point."
          body="Each applicant's CELPIP/IELTS scores tracked skill by skill against the exact benchmark every plan requires — with test dates counting down to the booking."
        />
      </section>

      <Divider />

      {/* ═══ 09 · DOCUMENTS — full-width centered ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>09 · Stay ready</Label>
            <Title lines={["Every document,", em("every deadline.")]} />
            <Lead>A document hub organised by category — identity, education, language, finances, legal — tracking status, flagging what expired, keeping paperwork audit-ready for whichever plan goes live first.</Lead>
          </ScrollReveal>
          <ScrollReveal delay={120} type="scale">
            <div style={{ marginTop: isMobile ? "2.5rem" : "4rem" }}>
              <BrowserFrame src={`${SHOT}/documents-desktop.png`} alt="Document hub" />
            </div>
          </ScrollReveal>
          {/* Documents mobile */}
          <ScrollReveal delay={160}>
            <div style={{ marginTop: isMobile ? "3.5rem" : "5.5rem" }}>
              <DeviceTag>On mobile</DeviceTag>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: isMobile ? "1rem" : "2.5rem" }}>
                <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                  <Image src={`${SHOT}/mobile/documents.png`} alt="Documents — mobile" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                  <Image src={`${SHOT}/mobile/languages.png`} alt="Languages — mobile" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                  <Image src={`${SHOT}/mobile/settings.png`} alt="Settings — mobile" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
              <p style={{ textAlign: "center", fontSize: ".78rem", color: "rgba(255,255,255,.35)", marginTop: "1.75rem", letterSpacing: ".04em" }}>
                Documents → Languages → Settings — always accessible on mobile
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 10 · JOBS — side-bleed left ═══ */}
      <section style={{ padding: isMobile ? "5rem 0" : "8rem 0", overflow: "hidden" }}>
        <SideShotShared side="left" accent={ACC}
          src={`${SHOT}/jobs-desktop.png`} alt="Job search tracker"
          eyebrow="10 · Land the offer"
          title="Job search, integrated into the journey."
          body="Canadian immigration often requires a valid job offer. MapleTrack tracks applications, interviews and offers — linked directly to the pathway that needs them. No spreadsheet, no guesswork."
        />
      </section>

      <Divider />

      {/* ═══ 11 · PLANS DESKTOP — compare side by side ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>11 · Compare and decide</Label>
            <Title lines={["Compare programs.", em("No hidden trade-offs.")]} />
            <Lead>Every pathway compared head-to-head — processing time, language requirements, CRS thresholds, costs — so the couple can make an informed decision instead of trusting a consultant&apos;s opinion.</Lead>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div style={{ marginTop: isMobile ? "2.5rem" : "4rem" }}>
              <DeviceTag>On desktop · switch between views</DeviceTag>
              <BrowserTabs isMobile={isMobile} items={[
                { src: `${SHOT}/programs-compare-desktop.png`, alt: "Programs comparison", label: "Compare programs" },
                { src: `${SHOT}/plans-desktop.png`, alt: "Plans management", label: "Manage plans" },
              ]} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 12 · HOUSEHOLD — login, settings, notifications ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>12 · One household, two applicants</Label>
            <Title lines={["Shared journey,", em("separate logins.")]} />
            <Lead>Rafael and Luana each have their own session — scores, documents and tasks tracked individually — but share one household, one set of plans, and one immigration timeline. Notifications keep both in sync.</Lead>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ marginTop: isMobile ? "2.5rem" : "4rem" }}>
              <DeviceTag>On desktop · switch between views</DeviceTag>
              <BrowserTabs isMobile={isMobile} items={[
                { src: `${SHOT}/login-desktop.png`, alt: "Login — household access", label: "Login" },
                { src: `${SHOT}/notifications-desktop.png`, alt: "Notifications — stay in sync", label: "Notifications" },
                { src: `${SHOT}/settings-desktop.png`, alt: "Settings — household management", label: "Settings" },
              ]} />
            </div>
          </ScrollReveal>
          {/* Household mobile */}
          <ScrollReveal delay={180}>
            <div style={{ marginTop: isMobile ? "3.5rem" : "5.5rem" }}>
              <DeviceTag>On mobile</DeviceTag>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: isMobile ? "1rem" : "2.5rem" }}>
                <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                  <Image src={`${SHOT}/mobile/login.png`} alt="Login — mobile" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                  <Image src={`${SHOT}/mobile/dashboard.png`} alt="Dashboard — mobile" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ width: isMobile ? 120 : 220, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.5))" }}>
                  <Image src={`${SHOT}/mobile/landing.png`} alt="Landing — mobile" width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
              <p style={{ textAlign: "center", fontSize: ".78rem", color: "rgba(255,255,255,.35)", marginTop: "1.75rem", letterSpacing: ".04em" }}>
                Login → Dashboard → Landing — the household experience on mobile
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 13 · MOMENTUM — achievements desktop + mobile showcase ═══ */}
      <section style={{ padding: pad, background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>13 — Keep the momentum</Label>
            <Title lines={["A process this long", em("needs motivation.")]} />
            <Lead>
              Immigration takes years, so MapleTrack is built to keep a couple moving — XP and achievements for each milestone, gentle nudges and notifications, and a household where Rafael and Luana share one journey under separate logins.
            </Lead>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div style={{ marginTop: isMobile ? "2.5rem" : "4rem" }}>
              <BrowserFrame src={`${SHOT}/achievements-desktop.png`} alt="Achievements & gamification" />
            </div>
          </ScrollReveal>
          {/* Full mobile experience showcase */}
          <ScrollReveal delay={160}>
            <div style={{ marginTop: isMobile ? "3rem" : "5rem", textAlign: "center" }}>
              <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: ACC, marginBottom: "1rem" }}>The full mobile experience</p>
              <h3 style={{ fontSize: isMobile ? "1.3rem" : "1.8rem", fontWeight: 700, color: "#fff", letterSpacing: "-.02em", marginBottom: isMobile ? "2rem" : "3rem" }}>
                Every feature, {em("on every device.")}
              </h3>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: isMobile ? ".5rem" : "1.5rem", flexWrap: "nowrap", overflow: "hidden" }}>
              {[
                { src: "onboarding.png", label: "Onboarding" },
                { src: "simulator.png", label: "Simulator" },
                { src: "programs.png", label: "Programs" },
                { src: "dashboard.png", label: "Dashboard" },
                { src: "achievements.png", label: "Achievements" },
                { src: "plans.png", label: "Plans" },
                { src: "documents.png", label: "Documents" },
                { src: "languages.png", label: "Languages" },
              ].map((p) => (
                <div key={p.src} style={{ width: isMobile ? 90 : 155, flexShrink: 0, filter: "drop-shadow(0 20px 40px rgba(0,0,0,.45))" }}>
                  <Image src={`${SHOT}/mobile/${p.src}`} alt={p.label} width={908} height={1880} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: ".78rem", color: "rgba(255,255,255,.35)", marginTop: "1.75rem", letterSpacing: ".04em" }}>
              8 sections — every feature works on any device
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ 10 · CRAFT / DESIGN SYSTEM ═══ */}
      {wrap(
        <>
          <ScrollReveal>
            <Label>14 — The craft</Label>
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
            <Label>15 — Where it stands</Label>
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
          <Label>16 — What I learned</Label>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "2rem" }}>
            {([
              { icon: "compass", title: "Designing for yourself is the ultimate brief.", body: "Being user zero meant every gap in the experience was a gap in my own life. The feedback loop was instant and ruthless — the best research I've ever had." },
              { icon: "zap", title: "A designer can ship production code now.", body: "Pair-programming with Claude Code, I took this from Figma thinking to a deployed, database-backed product — solo. The design-to-build handoff simply disappeared." },
              { icon: "layers", title: "A design system pays off even at n=1.", body: "One token set and a small component library made ten feature areas feel like one product — and let me move at two-week speed without the UI drifting." },
              { icon: "target", title: "Guidance beats information.", body: "Consultancies hand you data and a bill. The unlock wasn't more information — it was always showing the single next step. Direction is the product." },
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
          <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: ACC, marginBottom: "1.5rem" }}>See it in product</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,4.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.02, marginBottom: "3rem" }}>
            The systems behind<br /><em style={{ color: ACC, fontStyle: "italic" }}>the products.</em>
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/work/cvc" className="btn-blue">CVC Flights →</Link>
            <Link href="/work/rappi" className="btn-white-ghost">Rappi Onboarding →</Link>
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
      <FloatingProjectNav />
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
