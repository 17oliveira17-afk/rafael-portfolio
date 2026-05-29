"use client";
import { useEffect, useRef } from "react";

const phases = [
  {
    tag: "Challenge",
    title: "The problem was deeper than performance.",
    body: "CVC's app had a 2.0 ★ rating — crashes, slow loading, and broken flows. The root cause? The entire booking experience ran on a webview, with no native features, no reason to install over the website.",
    detail: [
      { label: "App Rating", value: "2.0 ★", after: "→ 4.6 ★" },
      { label: "Root Cause", value: "Webview", after: "→ Native" },
    ],
    color: "#ff6b6b",
  },
  {
    tag: "Discovery",
    title: "Leveraging existing research to move fast.",
    body: "UX Audit + Benchmark analysis across top flight apps (Hopper, Skyscanner, Kayak). The pattern was clear: guided single-step flow, one flight at a time, fully native. CVC was doing the opposite on all three.",
    detail: [
      { label: "Apps Analyzed", value: "5 competitors", after: "" },
      { label: "Key Finding", value: "Outbound + Return", after: "must split" },
    ],
    color: "var(--accent)",
  },
  {
    tag: "Solution",
    title: "Webview → Native. One key architectural decision.",
    body: "Split outbound and return into sequential screens. Introduced a loading animation that cross-sold hotels. Linear 3-step search with confirmation before checkout — not inside it.",
    detail: [
      { label: "Flow Before", value: "4+ back steps", after: "" },
      { label: "Flow After", value: "Linear", after: "3 steps" },
    ],
    color: "#a0ff6e",
  },
  {
    tag: "Impact",
    title: "Numbers that speak for themselves.",
    body: "Within one month of partial rollout, the app rating jumped from 2.0 to 3.2. After full rollout: 4.6 stars. Conversion tripled — from 6.4% to 20%. Cross-sell revenue increased by 23%.",
    detail: [
      { label: "Conversion", value: "6.4%", after: "→ 20%" },
      { label: "Cross-sell", value: "+23%", after: "revenue" },
    ],
    color: "var(--yellow)",
  },
];

function PhaseCard({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        opacity: 0,
        transform: "translateY(60px)",
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
        direction: isEven ? "ltr" : "rtl",
      }}
    >
      {/* Text */}
      <div style={{ direction: "ltr" }}>
        <span
          className="label"
          style={{
            color: phase.color,
            display: "inline-block",
            marginBottom: "1rem",
            padding: "0.3rem 0.8rem",
            border: `1px solid ${phase.color}30`,
            borderRadius: "100px",
            background: `${phase.color}10`,
          }}
        >
          {phase.tag}
        </span>
        <h3
          className="display-lg"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)", marginBottom: "1.5rem", lineHeight: 1.1 }}
        >
          {phase.title}
        </h3>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "1rem", fontWeight: 300, maxWidth: "420px" }}>
          {phase.body}
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          direction: "ltr",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, ${phase.color}, transparent)`,
          }}
        />
        <div
          className="label"
          style={{ marginBottom: "2rem", color: "var(--text-muted)" }}
        >
          Key metrics
        </div>
        {phase.detail.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.25rem 0",
              borderBottom: i < phase.detail.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{d.label}</span>
            <div style={{ textAlign: "right" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: phase.color,
                }}
              >
                {d.value}
              </span>
              {d.after && (
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginLeft: "0.5rem" }}>
                  {d.after}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            right: "-40px",
            width: "150px",
            height: "150px",
            background: `radial-gradient(circle, ${phase.color}15 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
}

export default function CVCCase() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
        }
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      style={{
        padding: "8rem 3rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          marginBottom: "6rem",
          opacity: 0,
          transform: "translateY(40px)",
          transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p className="label" style={{ marginBottom: "1rem" }}>Case Study · 01</p>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#f5e642",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  color: "#000",
                  fontSize: "1rem",
                }}
              >
                CVC
              </div>
              <h2
                className="display-lg"
                style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
              >
                Flight Booking<br />Redesign
              </h2>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["B2C", "Mobile App", "Product Designer", "Solo Designer"].map((tag) => (
                <span
                  key={tag}
                  className="label"
                  style={{
                    padding: "0.3rem 0.8rem",
                    border: "1px solid var(--border)",
                    borderRadius: "100px",
                    color: "var(--text-muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p className="label" style={{ marginBottom: "0.5rem" }}>Company</p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "260px", lineHeight: 1.5 }}>
              Brazil&apos;s largest travel company. 1,600 stores, 30M customers, R$17B in annual bookings.
            </p>
          </div>
        </div>

        <div
          className="hr"
          style={{ marginTop: "3rem" }}
        />
      </div>

      {/* Phases */}
      <div style={{ display: "flex", flexDirection: "column", gap: "7rem" }}>
        {phases.map((phase, i) => (
          <PhaseCard key={i} phase={phase} index={i} />
        ))}
      </div>

      {/* Result banner */}
      <div
        style={{
          marginTop: "7rem",
          padding: "3rem",
          background: "linear-gradient(135deg, rgba(74,250,138,0.08), rgba(160,255,110,0.04))",
          border: "1px solid rgba(74,250,138,0.2)",
          borderRadius: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          textAlign: "center",
        }}
      >
        {[
          { v: "6.4% → 20%", l: "Conversion Rate" },
          { v: "2.0 → 4.6 ★", l: "App Store Rating" },
          { v: "+23%", l: "Cross-sell Revenue" },
        ].map((r, i) => (
          <div key={i}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 800,
                color: "var(--accent)",
                letterSpacing: "-0.02em",
              }}
            >
              {r.v}
            </p>
            <p className="label" style={{ marginTop: "0.5rem" }}>{r.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
