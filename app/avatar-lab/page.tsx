"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────
   AVATAR LAB — test page, NOT linked anywhere.
   Scroll-driven "decode": the real photo dissolves into a
   live ASCII/binary matrix (sampled from the photo itself,
   tinted with the brand palette) and recomposes into a
   second portrait — the avatar slot.
   Swap AVATAR_SRC for a real 3D avatar render when ready.
   View at /avatar-lab.
   ────────────────────────────────────────────── */

const PHOTO_SRC = "/photos/rafael-2026.png";
const AVATAR_SRC = "/photos/rafael-profile.jpg"; // ← drop the 3D avatar render here

const RAMP = "01";                                  // binary = "encoded"
const TINT = ["#0071e3", "#00c8a0", "#e31c5f", "#eab308", "#ff6a2b"];

const SKILLS = [
  "analysing the funnel", "mapping the journey", "running the A/B test",
  "building the design system", "shipping with AI", "aligning the squad",
];

export default function AvatarLab() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);      // 0 real · 1 decoding · 2 avatar
  const [skill, setSkill] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSkill((s) => (s + 1) % SKILLS.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, COLS = 0, ROWS = 0, cell = 0;
    let dataA: Uint8ClampedArray | null = null;
    let dataB: Uint8ClampedArray | null = null;
    let noise: Float32Array | null = null;
    let raf = 0, progress = 0, shown = 0;

    const imgA = new Image(); const imgB = new Image();
    imgA.crossOrigin = "anonymous"; imgB.crossOrigin = "anonymous";
    let loaded = 0;

    const sample = (img: HTMLImageElement) => {
      const off = document.createElement("canvas");
      off.width = COLS; off.height = ROWS;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return null;
      // cover-fit the square-ish portrait into the grid
      const ar = img.width / img.height, gr = COLS / ROWS;
      let sw = img.width, sh = img.height, sx = 0, sy = 0;
      if (ar > gr) { sw = img.height * gr; sx = (img.width - sw) / 2; }
      else { sh = img.width / gr; sy = (img.height - sh) / 2; }
      o.drawImage(img, sx, sy, sw, sh, 0, 0, COLS, ROWS);
      return o.getImageData(0, 0, COLS, ROWS).data;
    };

    const build = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = W < 640 ? 7 : 9;
      COLS = Math.max(8, Math.floor(W / cell));
      ROWS = Math.max(8, Math.floor(H / cell));
      noise = new Float32Array(COLS * ROWS);
      for (let i = 0; i < noise.length; i++) noise[i] = Math.random();
      if (loaded === 2) { dataA = sample(imgA); dataB = sample(imgB); }
    };

    const lum = (d: Uint8ClampedArray, i: number) =>
      (d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114) / 255;

    const draw = () => {
      shown += (progress - shown) * 0.09;
      const p = shown;
      ctx.fillStyle = "#08080b";
      ctx.fillRect(0, 0, W, H);

      if (dataA && dataB && noise) {
        // decode curve: 0 → photo · .5 → full matrix · 1 → avatar
        const decode = 1 - Math.abs(p - 0.5) * 2;      // 0..1..0
        const mixToB = Math.max(0, (p - 0.5) * 2);      // second half → avatar
        ctx.font = `${cell}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        ctx.textBaseline = "top";

        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            const i = y * COLS + x;
            const la = lum(dataA, i), lb = lum(dataB, i);
            const l = la + (lb - la) * mixToB;
            const alpha = dataA[i * 4 + 3] / 255;
            if (alpha < 0.06) continue;

            const px = x * cell, py = y * cell;
            // per-cell threshold makes the decode ripple instead of snapping
            const isCode = decode > noise[i] * 0.95;

            if (isCode) {
              const t = TINT[(x * 7 + y * 3) % TINT.length];
              ctx.fillStyle = t;
              ctx.globalAlpha = (0.25 + l * 0.85) * Math.min(1, decode * 1.4) * alpha;
              const ch = RAMP[(x + y + Math.floor(l * 9)) % RAMP.length];
              ctx.fillText(ch, px, py);
            } else {
              const v = Math.round(l * 255);
              ctx.fillStyle = `rgb(${v},${v},${v})`;
              ctx.globalAlpha = alpha;
              ctx.fillRect(px, py, cell - 0.5, cell - 0.5);
            }
          }
        }
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const raw = total > 0 ? -r.top / total : 0;
      progress = Math.max(0, Math.min(1, raw));
      setPhase(progress < 0.28 ? 0 : progress < 0.72 ? 1 : 2);
    };

    const ready = () => { loaded++; if (loaded === 2) { build(); onScroll(); if (reduce) { shown = progress; } } };
    imgA.onload = ready; imgB.onload = ready;
    imgA.src = PHOTO_SRC; imgB.src = AVATAR_SRC;

    build();
    raf = requestAnimationFrame(draw);
    window.addEventListener("scroll", onScroll, { passive: true });
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { build(); onScroll(); }, 180); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf); clearTimeout(rt);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const COPY = [
    { k: "Human", t: "This is me.", d: "14+ years designing products people actually use — fintech, B2B, travel, mobile." },
    { k: "Decoding", t: "Now decoding…", d: "Every decision, pattern and system I've built — turned into something a machine can work with." },
    { k: "Augmented", t: "AI-augmented.", d: "I design the intent and ship it end-to-end with AI. Same judgement, a fraction of the time." },
  ][phase];

  return (
    <main style={{ background: "#08080b", color: "#fff" }}>
      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 20, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Avatar Lab · scroll to decode
      </div>

      <div ref={wrapRef} style={{ height: "320svh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
          {/* ambient */}
          <div className="orb o1" aria-hidden />
          <div className="orb o2" aria-hidden />

          <div className="stage">
            {/* left copy */}
            <div className="copy">
              <p className="badge" key={COPY.k}>
                <span className="pulse" /> {COPY.k}
              </p>
              <h1 key={COPY.t}>{COPY.t}</h1>
              <p className="lead" key={COPY.d}>{COPY.d}</p>

              {/* ClickUp-style rotating capability pill */}
              <div className="skill">
                <span className="skill-label">Currently</span>
                <span className="skill-track">
                  {SKILLS.map((s, i) => (
                    <span key={s} className="skill-item" style={{ opacity: i === skill ? 1 : 0, transform: i === skill ? "translateY(0)" : "translateY(.6em)" }}>{s}</span>
                  ))}
                </span>
              </div>

              <div className="ctas">
                <Link href="/#work" className="cta-a">View case studies →</Link>
                <Link href="/about" className="cta-b">About me</Link>
              </div>
            </div>

            {/* right canvas */}
            <div className="portrait">
              <canvas ref={canvasRef} />
              <div className="frameline" aria-hidden />
            </div>
          </div>

          <div className="hint" aria-hidden>Scroll ↓</div>
        </div>
      </div>

      <section style={{ minHeight: "60svh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: "1rem" }}>Human judgement. Machine speed.</h2>
          <p style={{ color: "rgba(255,255,255,.55)", maxWidth: 520, margin: "0 auto" }}>That&apos;s the whole thesis — and the rest of this site is the proof.</p>
        </div>
      </section>

      <style jsx>{`
        .stage { position: relative; z-index: 3; height: 100%; max-width: 1250px; margin: 0 auto;
          padding: 0 clamp(1.25rem,4vw,4rem); display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: clamp(1.5rem,4vw,4rem); }
        .portrait { position: relative; width: 100%; aspect-ratio: 1/1; max-height: 76svh; justify-self: center; }
        .portrait canvas { width: 100%; height: 100%; display: block; border-radius: 20px; }
        .frameline { position: absolute; inset: 0; border-radius: 20px; border: 1px solid rgba(255,255,255,.1); pointer-events: none; }
        .copy h1 { font-size: clamp(2.1rem,4.6vw,4rem); font-weight: 800; letter-spacing: -.04em; line-height: 1.02; margin: 0 0 1rem; animation: sw .7s cubic-bezier(.16,1,.3,1); }
        .lead { font-size: clamp(.95rem,1.2vw,1.08rem); font-weight: 300; line-height: 1.75; color: rgba(255,255,255,.6); max-width: 420px; margin: 0 0 1.75rem; animation: sw .7s cubic-bezier(.16,1,.3,1) .05s both; }
        .badge { display: inline-flex; align-items: center; gap: .5rem; font-size: .64rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase;
          color: #fff; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.16); padding: .35rem .8rem; border-radius: 100px; margin: 0 0 1.5rem; animation: sw .7s cubic-bezier(.16,1,.3,1); }
        .pulse { width: 6px; height: 6px; border-radius: 50%; background: #00c8a0; box-shadow: 0 0 10px #00c8a0; animation: bp 1.6s ease-in-out infinite; }
        @keyframes bp { 50% { opacity: .3; transform: scale(.8); } }
        @keyframes sw { from { opacity: 0; transform: translateY(14px); } }
        .skill { display: inline-flex; align-items: center; gap: .6rem; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.04);
          border-radius: 100px; padding: .5rem 1.1rem; margin-bottom: 1.9rem; }
        .skill-label { font-size: .66rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.45); }
        .skill-track { position: relative; display: inline-block; height: 1.3em; min-width: 15ch; overflow: hidden; font-size: .86rem; }
        .skill-item { position: absolute; left: 0; top: 0; white-space: nowrap; color: #fff; transition: opacity .5s ease, transform .5s cubic-bezier(.16,1,.3,1); }
        .ctas { display: flex; gap: .75rem; flex-wrap: wrap; }
        .cta-a, .cta-b { font-size: .9rem; font-weight: 600; padding: .8rem 1.9rem; border-radius: 100px; text-decoration: none; transition: transform .35s cubic-bezier(.16,1,.3,1), background .3s ease; }
        .cta-a { background: #fff; color: #111; }
        .cta-a:hover { transform: translateY(-3px); }
        .cta-b { background: rgba(255,255,255,.07); color: #fff; border: 1px solid rgba(255,255,255,.18); }
        .cta-b:hover { transform: translateY(-3px); background: rgba(255,255,255,.13); }
        .orb { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
        .o1 { width: 45vw; height: 45vw; background: #0071e3; opacity: .16; left: -8%; top: -10%; }
        .o2 { width: 40vw; height: 40vw; background: #e31c5f; opacity: .13; right: -6%; bottom: -12%; }
        .hint { position: absolute; bottom: 1.6rem; left: 50%; transform: translateX(-50%); z-index: 5; font-size: .6rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.4); }
        @media (max-width: 900px) {
          .stage { grid-template-columns: 1fr; gap: 1.5rem; align-content: center; }
          .portrait { max-height: 44svh; order: -1; }
        }
        @media (prefers-reduced-motion: reduce) { .pulse { animation: none; } .copy h1, .lead, .badge { animation: none; } }
      `}</style>
    </main>
  );
}
