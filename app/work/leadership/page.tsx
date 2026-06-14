"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect, ReactNode, CSSProperties } from "react";
import ScrollReveal from "../../components/ScrollReveal";
import useIsMobile from "../../components/useIsMobile";
import RevealText from "../../components/RevealText";
import LoopVideo from "../../components/LoopVideo";
import CaseHero from "../../components/CaseHero";

/* ── Scroll progress: 0 as the element enters from the bottom, 1 once it reaches the upper third ── */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh;          // element top at bottom of viewport
      const end = vh * 0.32;     // element top near the upper third
      const raw = (start - r.top) / (start - end);
      setP(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p] as const;
}

const easeOut = (p: number) => 1 - Math.pow(1 - p, 2);

/* ── SVG Icons ── */
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconMap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconAward = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconBot = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);
const IconLink = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);
const IconLock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

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
  return <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.1) 50%, transparent 100%)", margin: "0 2rem" }} />;
}
function Tag({ children, bg = "rgba(0,113,227,.15)", border = "rgba(0,113,227,.3)", color = "#0071e3" }: { children: ReactNode; bg?: string; border?: string; color?: string }) {
  return <span style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: ".35rem .85rem", borderRadius: 100, background: bg, border: `1px solid ${border}`, color }}>{children}</span>;
}
function Metric({ before, after, label }: { before: string; after: string; label: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "1.75rem" }}>
      <p style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: ".85rem" }}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: ".6rem", flexWrap: "wrap" }}>
        <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "rgba(255,255,255,.28)", textDecoration: "line-through" }}>{before}</span>
        <span style={{ color: "#0071e3" }}>→</span>
        <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em" }}>{after}</span>
      </div>
    </div>
  );
}
function Quote({ text, author, role }: { text: string; author: string; role: string }) {
  return (
    <div style={{ background: "rgba(0,113,227,.06)", border: "1px solid rgba(0,113,227,.18)", borderRadius: 20, padding: "2.25rem" }}>
      <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,.78)", fontStyle: "italic", fontWeight: 300 }}>{text}</p>
      <div style={{ marginTop: "1.25rem" }}>
        <span style={{ fontSize: ".88rem", fontWeight: 600, color: "#f5f5f7", display: "block" }}>{author}</span>
        <span style={{ fontSize: ".75rem", color: "rgba(255,255,255,.38)" }}>{role}</span>
      </div>
    </div>
  );
}

/* ── Icon box ── */
function IconBox({ icon, color = "rgba(0,113,227,.2)" }: { icon: ReactNode; color?: string }) {
  return (
    <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {icon}
    </div>
  );
}

/* ── Apple-style floating device mockup (transparent PNG on dark bg) ── */
const GLOWS: Record<string, string> = {
  blue:   "radial-gradient(ellipse 60% 58% at 50% 42%, rgba(0,113,227,.42), transparent 68%)",
  violet: "radial-gradient(ellipse 60% 58% at 50% 42%, rgba(126,72,255,.40), transparent 68%)",
  green:  "radial-gradient(ellipse 60% 58% at 50% 42%, rgba(0,200,160,.38), transparent 68%)",
  pink:   "radial-gradient(ellipse 60% 58% at 50% 42%, rgba(255,82,140,.38), transparent 68%)",
};
function Shot({
  src, alt, eyebrow, caption, priority = false, glow,
}: { src: string; alt: string; eyebrow?: string; caption?: string; priority?: boolean; glow?: keyof typeof GLOWS | boolean }) {
  const glowBg = glow === true ? GLOWS.blue : glow ? GLOWS[glow] : null;
  return (
    <ScrollReveal type="scale">
      <figure style={{ margin: 0, position: "relative" }}>
        {glowBg && (
          <div aria-hidden style={{
            position: "absolute", inset: "-10% 0 12% 0", zIndex: 0,
            background: glowBg, filter: "blur(55px)", pointerEvents: "none",
          }} />
        )}
        <Image src={src} alt={alt} width={1430} height={866} unoptimized priority={priority}
          sizes="(max-width: 768px) 100vw, 1100px"
          style={{
            width: "100%", height: "auto", display: "block", position: "relative", zIndex: 1,
            filter: "drop-shadow(0 34px 55px rgba(0,0,0,.5))",
          }} />
        {(eyebrow || caption) && (
          <figcaption style={{ marginTop: ".7rem", textAlign: "center", maxWidth: 620, marginLeft: "auto", marginRight: "auto", position: "relative", zIndex: 1 }}>
            {eyebrow && <span style={{ display: "block", fontSize: ".62rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".4rem" }}>{eyebrow}</span>}
            {caption && <span style={{ display: "block", fontSize: ".82rem", color: "rgba(255,255,255,.4)", lineHeight: 1.6 }}>{caption}</span>}
          </figcaption>
        )}
      </figure>
    </ScrollReveal>
  );
}

/* ── Apple-style colorful aurora stage with a floating hero device ── */
function FullBleedShot({ src, alt, eyebrow, headline, caption }: { src: string; alt: string; eyebrow?: string; headline?: ReactNode; caption?: string }) {
  const [zoomRef, zp] = useScrollProgress<HTMLDivElement>();
  const scale = 0.82 + 0.18 * easeOut(zp);
  return (
    <section className="aurora-wrap" style={{ padding: "clamp(4rem,9vw,8rem) 1.5rem clamp(3rem,6vw,5rem)", background: "#040406" }}>
      <div className="aurora" />
      <div className="aurora-content" style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        {eyebrow && (
          <ScrollReveal type="up">
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.65)", marginBottom: "1rem" }}>{eyebrow}</p>
          </ScrollReveal>
        )}
        {headline && (
          <ScrollReveal type="up" delay={60}>
            <h2 style={{ fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1.02, color: "#fff", margin: "0 auto 2.5rem", maxWidth: 900 }}>{headline}</h2>
          </ScrollReveal>
        )}
        <div ref={zoomRef} style={{ transform: `scale(${scale})`, transformOrigin: "center top", willChange: "transform" }}>
          <div className="floaty">
            <Image src={src} alt={alt} width={1430} height={866} unoptimized
              sizes="100vw" style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 50px 90px rgba(0,0,0,.6))" }} />
          </div>
        </div>
        {caption && (
          <ScrollReveal type="in" delay={120}>
            <p style={{ marginTop: "1.25rem", fontSize: ".9rem", color: "rgba(255,255,255,.55)", maxWidth: 640, margin: "1.25rem auto 0", lineHeight: 1.6 }}>{caption}</p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

/* ── Editorial side-bleed device: huge notebook entering from one page edge, text in the open space ── */
function SideShot({ src, alt, side, eyebrow, title, body, glow, isMobile }:
  { src: string; alt: string; side: "left" | "right"; eyebrow: string; title: ReactNode; body: string; glow?: keyof typeof GLOWS; isMobile: boolean }) {
  const glowBg = glow ? GLOWS[glow] : null;
  const [slideRef, sp] = useScrollProgress<HTMLDivElement>();
  const e = easeOut(sp);
  const dir = side === "left" ? -1 : 1;
  const slideStyle: CSSProperties = isMobile
    ? {}
    : { transform: `translateX(${(1 - e) * dir * 28}%)`, opacity: 0.25 + 0.75 * e, willChange: "transform, opacity" };
  const img = (
    <div ref={slideRef} style={{ position: "relative", zIndex: 0, ...slideStyle }}>
      {glowBg && <div aria-hidden style={{ position: "absolute", inset: "-14%", background: glowBg, filter: "blur(65px)", pointerEvents: "none" }} />}
      <Image src={src} alt={alt} width={1430} height={866} unoptimized sizes="70vw"
        style={{ width: "100%", height: "auto", display: "block", position: "relative", filter: "drop-shadow(0 40px 70px rgba(0,0,0,.55))" }} />
    </div>
  );
  const txt = (
    <div style={{ maxWidth: 430 }}>
      <p style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".9rem" }}>{eyebrow}</p>
      <h3 style={{ fontSize: isMobile ? "1.5rem" : "clamp(1.6rem,2.6vw,2.4rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", lineHeight: 1.12, marginBottom: "1rem" }}>{title}</h3>
      <p style={{ fontSize: isMobile ? ".92rem" : "1.02rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>{body}</p>
    </div>
  );

  if (isMobile) {
    return (
      <ScrollReveal type="up">
        <div style={{ padding: "0 1.5rem" }}>
          {txt}
          <div style={{ marginTop: "1.75rem", marginRight: side === "right" ? "-1.5rem" : 0, marginLeft: side === "left" ? "-1.5rem" : 0 }}>{img}</div>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal type="up">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "clamp(2rem,5vw,5rem)", maxWidth: 1400, margin: "0 auto" }}>
        {side === "left" ? (
          <>
            <div style={{ marginLeft: "-15%", marginRight: "-3%" }}>{img}</div>
            <div style={{ paddingRight: "clamp(1rem,4vw,4rem)" }}>{txt}</div>
          </>
        ) : (
          <>
            <div style={{ paddingLeft: "clamp(1rem,4vw,4rem)", display: "flex", justifyContent: "flex-end" }}>{txt}</div>
            <div style={{ marginRight: "-15%", marginLeft: "-3%" }}>{img}</div>
          </>
        )}
      </div>
    </ScrollReveal>
  );
}

/* ── Elegant NDA placeholder — used where a real screenshot would be illegible ── */
function Artifact({ icon, title, note }: { icon?: ReactNode; title: string; note: string }) {
  return (
    <ScrollReveal type="in">
      <div style={{
        position: "relative", height: "100%", borderRadius: 20, overflow: "hidden",
        border: "1px solid rgba(255,255,255,.1)",
        background: "linear-gradient(135deg, rgba(255,255,255,.045), rgba(255,255,255,.012))",
        padding: "clamp(2.25rem,5vw,3.5rem) 1.75rem", minHeight: 200,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: ".85rem", textAlign: "center",
      }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, #000, transparent 75%)", maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, #000, transparent 75%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", width: 46, height: 46, borderRadius: 12, background: "rgba(0,113,227,.14)", border: "1px solid rgba(0,113,227,.28)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0071e3" }}>{icon}</div>
        <h4 style={{ position: "relative", fontSize: "1.08rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.02em" }}>{title}</h4>
        <p style={{ position: "relative", fontSize: ".82rem", color: "rgba(255,255,255,.42)", lineHeight: 1.6, maxWidth: 420 }}>{note}</p>
        <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: ".4rem", fontSize: ".6rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginTop: ".25rem" }}><IconLock /> Protected under NDA</span>
      </div>
    </ScrollReveal>
  );
}

export default function LeadershipCasePage() {
  const isMobile = useIsMobile();
  const pad = isMobile ? "5rem 1.5rem" : "8rem 6rem";
  const padNarrow = isMobile ? "5rem 1.5rem" : "8rem max(6rem, calc(50% - 430px))";

  return (
    <main className="page-in dark-cursor" style={{ background: "#000" }}>

      {/* ═══ NAV ═══ */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, padding: isMobile ? "1.25rem 1.5rem" : "1.75rem 6rem", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 50, background: "rgba(0,0,0,.75)", backdropFilter: "blur(20px)" }}>
        <Link href="/" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", textDecoration: "none" }}>← Back</Link>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/work/cvc" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.38)", textDecoration: "none" }}>CVC</Link>
          <Link href="/work/rappi" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.38)", textDecoration: "none" }}>Rappi</Link>
        </div>
      </div>

      {/* ═══ 01 · HERO ═══ */}
      <CaseHero
        accent="#ec6b86"
        index="04"
        company="Thoughtworks · Design Leadership"
        titleLines={[<>From <em key="w" style={{ color: "#ec6b86", fontStyle: "italic" }}>8 weeks</em></>, "to 3 weeks."]}
        subtitle="How I restructured a fractured design team at a Latin American bank — introducing planning, roadmaps, AI automation, and governance — cutting delivery by more than half."
        tags={["Design Leadership", "Process & Ops", "Bank · NDA"]}
        stats={[
          { n: "8w → 3w", l: "Delivery cycle" },
          { n: "3 designers", l: "Team led" },
          { n: "0 → 7", l: "Ceremonies" },
          { n: "< 2 months", l: "To Lead role" },
        ]}
        note="Client name under NDA."
      />

      {/* ═══ FULL-BLEED TEAM VIDEO ═══ */}
      <section style={{ width: "100%", position: "relative" }}>
        <LoopVideo
          src="/videos/stock/team-working.mp4"
          label="Design team working together"
          aspect={isMobile ? "16 / 12" : "21 / 9"}
          radius={0}
        />
      </section>

      {/* ═══ 02 · CONTEXT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>The situation</Label>
            <RevealText
              lines={["No process. No roadmap.", "No ceremonies. Just fire."]}
              style={{ fontSize: isMobile ? "clamp(1.6rem,6vw,2.4rem)" : "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "1.5rem", lineHeight: 1.1 }}
            />
            <p style={{ fontSize: isMobile ? ".93rem" : "1.05rem", color: "rgba(255,255,255,.62)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              When I joined the project at a major Latin American bank, the design team was operating in pure survival mode. Deliveries took 8 weeks on average. Scope changed constantly mid-sprint. The client was frustrated and trust had eroded completely. There was no planning structure, no roadmap visible to anyone, and no design ceremonies connecting the team.
            </p>
            <p style={{ fontSize: isMobile ? ".93rem" : "1.05rem", color: "rgba(255,255,255,.62)", lineHeight: 1.85 }}>
              My goal wasn't to redesign the product. It was to redesign how the team worked — and make the results speak for themselves.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {[
                "Delivery cycles of 8+ weeks with no predictability",
                "No sprint planning — work was reactive, not intentional",
                "Constant mid-sprint scope changes with no governance",
                "No design roadmap shared with PMs or stakeholders",
                "Skill mismatch inside the team causing bottlenecks",
                "Client trust completely eroded",
              ].map((label, i) => (
                <div key={i} style={{ display: "flex", gap: ".85rem", alignItems: "flex-start", padding: "1rem 1.25rem", background: "rgba(255,40,40,.04)", border: "1px solid rgba(255,40,40,.1)", borderRadius: 12 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,80,80,.5)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: ".15rem" }}>
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  <span style={{ fontSize: isMobile ? ".88rem" : ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.55 }}>{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ BIG NUMBER ═══ */}
      <section style={{ padding: isMobile ? "4rem 1.5rem" : "7rem 6rem", background: "rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>The headline result</Label>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.25rem" }}>
              <div style={{ fontSize: isMobile ? ".85rem" : ".95rem", color: "rgba(255,255,255,.38)", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 600 }}>Design delivery cycle</div>
              <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "1.25rem" : "3rem", flexWrap: "wrap", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: isMobile ? "3.5rem" : "7rem", fontWeight: 700, color: "rgba(255,255,255,.18)", letterSpacing: "-.05em", lineHeight: 1, textDecoration: "line-through" }}>8w</div>
                  <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.22)", marginTop: ".4rem", letterSpacing: ".1em", textTransform: "uppercase" }}>Before</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", color: "#0071e3" }}><IconArrow /></div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: isMobile ? "5rem" : "9rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.06em", lineHeight: 1 }}>
                    <Counter to={3} suffix="w" />
                  </div>
                  <div style={{ fontSize: ".7rem", color: "#0071e3", marginTop: ".4rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600 }}>After</div>
                </div>
              </div>
              <p style={{ fontSize: isMobile ? ".95rem" : "1.1rem", color: "rgba(255,255,255,.45)", fontWeight: 300, maxWidth: 420, lineHeight: 1.75 }}>
                More than <strong style={{ color: "#f5f5f7", fontWeight: 700 }}>60% reduction</strong> in delivery cycle — through planning, governance, and a stable sprint structure.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ WHAT I BUILT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>The intervention</Label>
            <h2 style={{ fontSize: isMobile ? "clamp(1.6rem,6vw,2.4rem)" : "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "1rem", lineHeight: 1.1 }}>
              Four systems that changed everything.
            </h2>
            <p style={{ fontSize: isMobile ? ".9rem" : "1.05rem", color: "rgba(255,255,255,.48)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
              I didn't just redesign screens. I redesigned how the team planned, communicated, and delivered.
            </p>
          </ScrollReveal>

          <div style={{ marginBottom: "3.5rem" }}>
            <Shot src="/work/tw/workflow.png" alt="Design workflow — components of our process"
              eyebrow="The system" caption="The end-to-end design workflow I introduced — from discovery to handoff, anchored in user-centric design." glow />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* 01 */}
            <ScrollReveal delay={0}>
              <div style={{ padding: isMobile ? "2rem 1.5rem" : "2.5rem", background: "rgba(0,113,227,.05)", border: "1px solid rgba(0,113,227,.18)", borderRadius: 24 }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <IconBox icon={<IconCalendar />} color="rgba(0,113,227,.2)" />
                  <div>
                    <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".5rem" }}>01 — Sprint Planning</p>
                    <h3 style={{ fontSize: isMobile ? "1.05rem" : "1.2rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".75rem" }}>Planning to eliminate overwork</h3>
                    <p style={{ fontSize: isMobile ? ".88rem" : ".97rem", color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>
                      I introduced structured sprint planning sessions — something the team had never had. Each cycle started with explicit capacity planning: what we could actually commit to, what was out of scope, and what moved to the next sprint. This single change stopped the pattern of constant overload and made delivery predictable for the first time.
                    </p>
                    <div style={{ display: "flex", gap: ".6rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
                      {["Weekly planning", "Capacity mapping", "Scope protection", "3-week cadence"].map((t, i) => (
                        <span key={i} style={{ fontSize: ".68rem", fontWeight: 600, padding: ".28rem .8rem", borderRadius: 8, background: "rgba(0,113,227,.12)", border: "1px solid rgba(0,113,227,.25)", color: "#0071e3" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 02 */}
            <ScrollReveal delay={60}>
              <div style={{ padding: isMobile ? "2rem 1.5rem" : "2.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 24 }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <IconBox icon={<IconMap />} color="rgba(255,255,255,.06)" />
                  <div>
                    <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".5rem" }}>02 — Design Roadmap</p>
                    <h3 style={{ fontSize: isMobile ? "1.05rem" : "1.2rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".75rem" }}>Roadmap visible to all PMs and stakeholders</h3>
                    <p style={{ fontSize: isMobile ? ".88rem" : ".97rem", color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>
                      I created and maintained the first design roadmap in the project's history — and made it a shared artifact. Every Product Manager could see what design was working on, what was coming next, and how design decisions connected to product delivery. This eliminated the "what is design doing?" friction and turned design into a predictable, strategic partner instead of a reactive service.
                    </p>
                    <div style={{ display: "flex", gap: ".6rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
                      {["Shared with all PMs", "Delivery milestones", "Quarterly view", "Design dependencies"].map((t, i) => (
                        <span key={i} style={{ fontSize: ".68rem", fontWeight: 600, padding: ".28rem .8rem", borderRadius: 8, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.48)" }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: "1.75rem" }}>
                      <Shot src="/work/tw/roadmap-sprint.png" alt="Sprint roadmap — design and dev tracks across 3 phases"
                        caption="The shared sprint roadmap: design and dev tracks running in parallel across three phases, with a continuous discovery track." />
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                      <Artifact icon={<IconMap />} title="Plan de Entregas 2026"
                        note="Underneath the roadmap sat a granular, quarter-by-quarter delivery Gantt — every design and dev dependency mapped for the year. The detailed plan stays condensed here to respect the client agreement." />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 03 */}
            <ScrollReveal delay={100}>
              <div style={{ padding: isMobile ? "2rem 1.5rem" : "2.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 24 }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <IconBox icon={<IconZap />} color="rgba(255,255,255,.06)" />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".5rem" }}>03 — AI & Design Jira</p>
                    <h3 style={{ fontSize: isMobile ? "1.05rem" : "1.2rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".75rem" }}>AI-powered cards to standardize every process</h3>
                    <p style={{ fontSize: isMobile ? ".88rem" : ".97rem", color: "rgba(255,255,255,.6)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                      I built a dedicated Design Jira board with AI-generated ticket templates for each design phase. Instead of writing cards from scratch every sprint, the team used structured templates — automatically populated with the right fields, acceptance criteria, and definition of done for that type of task. This standardized how we documented work, reduced back-and-forth with Engineering, and made handoffs predictable and consistent across the entire team.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: ".75rem" }}>
                      {[
                        { icon: <IconBot />, title: "AI card templates", desc: "Auto-populated per design phase" },
                        { icon: <IconCheck />, title: "Standardized handoff", desc: "Same format every sprint" },
                        { icon: <IconLink />, title: "Engineering alignment", desc: "No more ambiguous specs" },
                      ].map((item, i) => (
                        <div key={i} style={{ padding: "1rem 1.1rem", background: "rgba(255,255,255,.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,.06)", display: "flex", gap: ".75rem", alignItems: "flex-start" }}>
                          <div style={{ marginTop: ".1rem", flexShrink: 0 }}>{item.icon}</div>
                          <div>
                            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#f5f5f7", marginBottom: ".2rem" }}>{item.title}</div>
                            <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.38)", lineHeight: 1.5 }}>{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: "1.75rem" }}>
                      <Shot src="/work/tw/design-jira.png" alt="Design Jira board with AI-generated ticket templates"
                        caption="The dedicated Design Jira board — every card spun up from an AI-generated template per design phase." />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 04 */}
            <ScrollReveal delay={140}>
              <div style={{ padding: isMobile ? "2rem 1.5rem" : "2.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 24 }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <IconBox icon={<IconGrid />} color="rgba(255,255,255,.06)" />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".5rem" }}>04 — 7 Ceremonies</p>
                    <h3 style={{ fontSize: isMobile ? "1.05rem" : "1.2rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".75rem" }}>7 alignment spaces where there were zero</h3>
                    <p style={{ fontSize: isMobile ? ".88rem" : ".97rem", color: "rgba(255,255,255,.6)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                      I established the full ceremony stack: sprint planning, design critique, usability test review, cross-team alignment with Product and Engineering, weekly client sync, desk checks, and retrospectives. Each ceremony had a clear owner, agenda, and outcome. The 3-week sprint cadence gave everyone — including the client — a rhythm they could count on.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: ".75rem" }}>
                      {[{ n: "0 → 7", l: "Ceremonies" }, { n: "3-wk", l: "Sprint cadence" }, { n: "0×", l: "Rework" }, { n: "100%", l: "Alignment" }].map((m, i) => (
                        <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,.06)", textAlign: "center" }}>
                          <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em" }}>{m.n}</div>
                          <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.35)", marginTop: ".2rem", textTransform: "uppercase", letterSpacing: ".05em" }}>{m.l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginTop: "1.75rem", alignItems: "stretch" }}>
                      <Artifact icon={<IconUsers />} title="Design critique"
                        note="A recurring ceremony where the team pressure-tested each other's work against user needs — before anything reached handoff." />
                      <Shot src="/work/tw/handoff.png" alt="Engineering handoff board" caption="Ready-for-dev handoff — every screen approved, annotated, and linked to its Jira card." />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ═══ HERO DEVICE — chaos to clarity ═══ */}
      <FullBleedShot src="/work/tw/system-board.png" alt="System-level design board — the full credit flow mapped end to end"
        eyebrow="System thinking"
        headline={<>From chaos<br />to <span className="text-gradient">clarity.</span></>}
        caption="The entire credit platform mapped end-to-end on a single board — every flow, state, and dependency in one place." />

      {/* ═══ WHAT I DELIVERED — process gallery ═══ */}
      <section className="aurora-wrap" style={{ padding: isMobile ? "5rem 0" : "8rem 0", background: "#040406", overflow: "hidden" }}>
        <div className="aurora aurora-soft" />
        <div className="aurora-content">
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 1.5rem" : "0 6rem" }}>
            <ScrollReveal>
              <Label>What I delivered</Label>
              <h2 style={{ fontSize: isMobile ? "clamp(1.6rem,6vw,2.4rem)" : "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "1rem", lineHeight: 1.1 }}>
                System thinking,<br /><span className="text-gradient">made visible.</span>
              </h2>
              <p style={{ fontSize: isMobile ? ".9rem" : "1.05rem", color: "rgba(255,255,255,.5)", lineHeight: 1.75, maxWidth: 640 }}>
                Process artifacts and screen evolution across every stage of the credit platform — benchmark to handoff.
              </p>
            </ScrollReveal>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "5rem" : "clamp(6rem,11vw,10rem)", marginTop: isMobile ? "3.5rem" : "6rem" }}>
            <SideShot isMobile={isMobile} side="right" glow="violet" src="/work/tw/benchmark.png" alt="Competitive benchmark of lending apps"
              eyebrow="01 · Benchmark" title={<>Started by studying<br />the whole market.</>}
              body="Before a single screen, I benchmarked how leading banks and fintechs structure their credit flows. It became the shared reference point the team measured every later decision against." />
            <SideShot isMobile={isMobile} side="left" glow="blue" src="/work/tw/user-journey.png" alt="End-to-end user journey board"
              eyebrow="02 · User journey" title={<>Mapped the full<br />field-advisor journey.</>}
              body="From client search to credit simulation, transfer and collections — the entire end-to-end journey laid out in one board so every gap and hand-off was visible to the team and the client." />
            <SideShot isMobile={isMobile} side="right" glow="green" src="/work/tw/wireframes.png" alt="Low-fidelity wireframes board"
              eyebrow="03 · Wireframes" title={<>Validated in low-fi,<br />before any pixel.</>}
              body="Rapid low-fidelity wireframes let us test structure and flow with users early — so we committed to UI only once the underlying experience was proven to work." />
            <SideShot isMobile={isMobile} side="left" glow="pink" src="/work/tw/evolution.png" alt="Screen evolution across iterations"
              eyebrow="04 · Evolution" title={<>Every iteration,<br />documented.</>}
              body="Screen evolution across iterations — each design rationale captured and traceable, so the reasoning behind every change stayed legible long after the decision was made." />
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ TEAM ═══ */}
      <section style={{ padding: pad, background: "rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Team & people</Label>
            <h2 style={{ fontSize: isMobile ? "clamp(1.6rem,6vw,2.4rem)" : "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "1rem", lineHeight: 1.1 }}>
              Built and led a team of 3.
            </h2>
            <p style={{ fontSize: isMobile ? ".9rem" : "1.05rem", color: "rgba(255,255,255,.48)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
              Managing people and the process at the same time — while working in Spanish, not my native language.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
              {[
                { track: "Discovery Track", role: "Research, usability testing, future-sprint preparation", icon: <IconSearch />, color: "rgba(0,200,150,.07)", border: "rgba(0,200,150,.18)" },
                { track: "Delivery Track", role: "UI design, handoff to Engineering, client alignment", icon: <IconArrow />, color: "rgba(0,113,227,.07)", border: "rgba(0,113,227,.22)" },
              ].map((t, i) => (
                <div key={i} style={{ padding: isMobile ? "1.5rem" : "2rem", borderRadius: 20, background: t.color, border: `1px solid ${t.border}`, display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.icon}</div>
                  <div>
                    <h4 style={{ fontSize: ".97rem", fontWeight: 700, color: "#f5f5f7", marginBottom: ".3rem" }}>{t.track}</h4>
                    <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.48)", lineHeight: 1.6 }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div style={{ padding: isMobile ? "1.5rem" : "2rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20 }}>
              <p style={{ fontSize: isMobile ? ".88rem" : ".97rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>
                Beyond the workflow split, I led recruitment — personally interviewing and onboarding a third designer — and managed the full transition plan: roll-off for the outgoing designer, onboarding structure for the new hire. All while protecting the account's delivery continuity and maintaining client confidence through the transition.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ OUTCOMES ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Results</Label>
            <h2 style={{ fontSize: isMobile ? "clamp(1.6rem,6vw,2.4rem)" : "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "3rem", lineHeight: 1.1 }}>
              Team efficiency. Process health.<br />Client trust rebuilt.
            </h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
            <ScrollReveal delay={0}><Metric before="8 weeks" after="3 weeks" label="Design delivery cycle" /></ScrollReveal>
            <ScrollReveal delay={60}><Metric before="0 ceremonies" after="7" label="Alignment spaces created" /></ScrollReveal>
            <ScrollReveal delay={100}><Metric before="Reactive" after="Planned" label="Sprint structure" /></ScrollReveal>
            <ScrollReveal delay={140}><Metric before="No roadmap" after="Shared roadmap" label="Visibility across all PMs" /></ScrollReveal>
            <ScrollReveal delay={180}><Metric before="Manual cards" after="AI templates" label="Jira standardization" /></ScrollReveal>
            <ScrollReveal delay={220}><Metric before="High conflict" after="100% trust" label="Client relationship" /></ScrollReveal>
          </div>
          <ScrollReveal delay={80}>
            <div style={{ padding: isMobile ? "2.5rem 1.5rem" : "4rem", background: "linear-gradient(135deg, rgba(0,113,227,.1) 0%, rgba(0,113,227,.03) 100%)", border: "1px solid rgba(0,113,227,.22)", borderRadius: 28, textAlign: "center" }}>
              <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(0,113,227,.75)", marginBottom: "2rem" }}>Delivery cycle reduction</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? "1.5rem" : "3.5rem", flexWrap: "wrap" }}>
                {[{ n: <Counter to={8} suffix="w" />, l: "Before" }, { n: <Counter to={3} suffix="w" />, l: "After" }, { n: <><Counter to={60} suffix="%" /></>, l: "Reduction" }].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: isMobile ? "3rem" : "5rem", fontWeight: 700, color: i === 0 ? "rgba(255,255,255,.25)" : "#f5f5f7", letterSpacing: "-.05em", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: ".7rem", color: i === 0 ? "rgba(255,255,255,.3)" : "#0071e3", marginTop: ".5rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ═══ RECOGNITION ═══ */}
      <section style={{ padding: pad, background: "rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <Label>Recognition</Label>
            <h2 style={{ fontSize: isMobile ? "clamp(1.6rem,6vw,2.4rem)" : "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.03em", marginBottom: "1rem", lineHeight: 1.1 }}>
              Validated from every direction.
            </h2>
            <p style={{ fontSize: isMobile ? ".88rem" : "1.05rem", color: "rgba(255,255,255,.45)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
              Formally designated <strong style={{ color: "#f5f5f7" }}>Leader of the UX Front</strong> and added to the Extended Client Leadership Team — in under two months.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: ".85rem", marginBottom: "2.5rem" }}>
              {[
                { icon: <IconAward />, title: "Designated Leader of the UX Front", by: "Formally by delivery principal" },
                { icon: <IconCheck />, title: "Extended Client Leadership Team", by: "Rare for a designer at Senior grade" },
                { icon: <IconStar />, title: "Consistently Exceeded Expectations", by: "Annual assessment 2025–2026" },
                { icon: <IconGlobe />, title: "All negotiations in Spanish", by: "Not my native language — Portuguese" },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: isMobile ? "1.25rem" : "1.5rem", borderRadius: 16, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
                  <div style={{ flexShrink: 0, marginTop: ".1rem" }}>{b.icon}</div>
                  <div>
                    <h4 style={{ fontSize: isMobile ? ".88rem" : ".95rem", fontWeight: 600, color: "#f5f5f7", lineHeight: 1.4, marginBottom: ".3rem" }}>{b.title}</h4>
                    <p style={{ fontSize: ".75rem", color: "rgba(255,255,255,.32)" }}>{b.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <ScrollReveal delay={0}>
              <Quote text="You didn't just identify the chaos — you solved it. The 5-phase plan, the sprint structure, the roadmap — the most important part was how you built it: by involving PMs, Tech Leads, and the client for validation. That isn't the work of an executor; it's the work of a leader." author="Mafer Escudero" role="Delivery Principal · Thoughtworks" />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <Quote text="Your performance doesn't just meet — it consistently exceeds the expectations of the Senior grade. You are unequivocally operating at a Lead level. Your formal designation as Leader of the UX front is the obvious and deserved recognition of that fact." author="Pamela Nunez" role="Principal PM · Thoughtworks" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ NEXT ═══ */}
      <section style={{ padding: pad }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal>
            <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem" }}>Next case study</p>
            <h2 style={{ fontSize: isMobile ? "clamp(1.8rem,7vw,2.8rem)" : "clamp(2rem,5vw,4rem)", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "2.5rem" }}>
              From two stars<br />to <em className="text-gradient" style={{ fontStyle: "italic" }}>category-defining.</em>
            </h2>
            <Link href="/work/cvc" className="btn-blue" style={{ padding: ".85rem 2.5rem", fontSize: ".92rem" }}>CVC · Flights App →</Link>
          </ScrollReveal>
        </div>
        <footer style={{ marginTop: "5rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[["Home", "/"], ["CVC", "/work/cvc"], ["Rappi", "/work/rappi"], ["About", "/about"]].map(([l, h]) => (
            <Link key={h} href={h} style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", textDecoration: "none" }}>{l}</Link>
          ))}
        </footer>
      </section>

    </main>
  );
}
