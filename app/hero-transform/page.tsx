"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────
   HERO TRANSFORM — test page, NOT linked anywhere.
   Scroll-driven three-act hero:
     1. the real photo, alone and minimal
     2. code runs *through the silhouette* while the photo
        disintegrates and the 3D avatar materialises
     3. only the avatar remains, ecosystem settled around it
   Every frame is tied to scroll — nothing plays on its own.
   ────────────────────────────────────────────── */

const PHOTO = "/photos/rafael-real.jpg";
const AVATAR = "/photos/rafael-avatar.jpg";

const CODE = [
  '<section className="hero">',
  'const system = useDesignTokens()',
  '.btn { border-radius: 100px; }',
  'export default function Product() {',
  'await ai.generate({ intent: "ship" })',
  'grid-template-columns: repeat(12, 1fr);',
  'if (conversion > baseline) ship()',
  '--accent: #0071e3; --radius: 20px;',
  'type Journey = { step: number }',
  '<Component variant="primary" />',
  'transform: translateY(-3px);',
  'return <Insight data={research} />',
  'const { data } = useResearch()',
  '@media (min-width: 768px) {',
];
/* neutral only — greys and blues, no accent colours */
const CODE_TINT = ["#8ea6c4", "#6d87a8", "#a6b4c6", "#5d7ea6", "#93a3b8", "#7b93b0"];

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (e0: number, e1: number, x: number) => { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };

/* ecosystem cards — [side, top%, content, appear, vanish] */
const CARDS = [
  { side: "l", top: 16, w: 176, a: 0.20, o: 0.98, title: "Design tokens", kind: "tokens" },
  { side: "l", top: 46, w: 168, a: 0.30, o: 0.98, title: "User flow", kind: "flow" },
  { side: "l", top: 74, w: 190, a: 0.42, o: 0.98, title: "Research insight", kind: "quote" },
  { side: "r", top: 14, w: 180, a: 0.26, o: 0.98, title: "Component", kind: "component" },
  { side: "r", top: 44, w: 166, a: 0.36, o: 0.98, title: "Checkout conversion", kind: "metric" },
  { side: "r", top: 72, w: 196, a: 0.48, o: 0.98, title: "AI pipeline", kind: "ai" },
] as const;

export default function HeroTransform() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const imgA = new Image(), imgB = new Image();
    let loaded = 0, raf = 0, target = 0, cur = 0, t0 = performance.now();
    let W = 0, H = 0, cell = 10, COLS = 0, ROWS = 0;
    let mask: Uint8Array | null = null, noise: Float32Array | null = null;
    const offA = document.createElement("canvas"), offB = document.createElement("canvas");
    const offC = document.createElement("canvas"); // code layer (blurred + faded on exit)

    const fit = (img: HTMLImageElement, c: CanvasRenderingContext2D, w: number, h: number) => {
      const ar = img.width / img.height, r = w / h;
      let dw = w, dh = h, dx = 0, dy = 0;
      if (ar > r) { dh = h; dw = h * ar; dx = (w - dw) / 2; } else { dw = w; dh = w / ar; dy = (h - dh) / 2; }
      c.drawImage(img, dx, dy, dw, dh);
    };

    const buildMask = () => {
      const o = document.createElement("canvas");
      o.width = COLS; o.height = ROWS;
      const c = o.getContext("2d", { willReadFrequently: true });
      if (!c) return;
      fit(imgA, c, COLS, ROWS);
      const d = c.getImageData(0, 0, COLS, ROWS).data;
      mask = new Uint8Array(COLS * ROWS);
      for (let y = 0; y < ROWS; y++) {
        let lo = -1, hi = -1, count = 0;
        for (let x = 0; x < COLS; x++) {
          const i = y * COLS + x;
          const l = (d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114) / 255;
          if (l > 0.085) { if (lo < 0) lo = x; hi = x; count++; }
        }
        // fill between the outer lit edges so dark clothing counts as body
        if (count > 2 && lo >= 0) for (let x = lo; x <= hi; x++) mask[y * COLS + x] = 1;
      }
    };

    const build = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offA.width = W; offA.height = H; offB.width = W; offB.height = H; offC.width = W; offC.height = H;
      cell = W < 620 ? 9 : 11;
      COLS = Math.max(10, Math.ceil(W / cell)); ROWS = Math.max(10, Math.ceil(H / cell));
      noise = new Float32Array(COLS * ROWS);
      for (let i = 0; i < noise.length; i++) noise[i] = Math.random();
      if (loaded === 2) buildMask();
    };

    const draw = (now: number) => {
      cur += (target - cur) * (reduce ? 1 : 0.085);
      const t = (now - t0) / 1000;
      const q = cur;

      // act curves
      const dissolve = smooth(0.16, 0.62, q);   // photo breaks apart
      const reveal = smooth(0.42, 0.88, q);     // avatar materialises

      ctx.clearRect(0, 0, W, H);

      if (loaded === 2 && mask && noise) {
        // ── photo, disintegrating
        const ca = offA.getContext("2d")!;
        ca.clearRect(0, 0, W, H);
        ca.globalAlpha = 1;
        fit(imgA, ca, W, H);
        if (dissolve > 0) {
          ca.globalCompositeOperation = "destination-out";
          for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
            const i = y * COLS + x;
            if (noise[i] < dissolve) { ca.fillStyle = "#000"; ca.fillRect(x * cell, y * cell, cell + 1, cell + 1); }
          }
          ca.globalCompositeOperation = "source-over";
        }
        ctx.globalAlpha = 1 - smooth(0.68, 0.9, q);
        ctx.drawImage(offA, 0, 0);

        // ── avatar, materialising
        if (reveal > 0) {
          const cb = offB.getContext("2d")!;
          cb.clearRect(0, 0, W, H);
          fit(imgB, cb, W, H);
          cb.globalCompositeOperation = "destination-out";
          for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
            const i = y * COLS + x;
            if (noise[i] > reveal) { cb.fillStyle = "#000"; cb.fillRect(x * cell, y * cell, cell + 1, cell + 1); }
          }
          cb.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1;
          ctx.drawImage(offB, 0, 0);
        }

        // ── code through the silhouette: rows type in one by one, then
        //    the whole layer leaves with transparency + blur
        const codeIn = smooth(0.10, 0.58, q);   // how many rows have arrived
        const codeOut = smooth(0.60, 0.94, q);  // fade + blur out
        const layer = clamp(codeIn) * (1 - codeOut);
        if (layer > 0.01) {
          const cc = offC.getContext("2d")!;
          cc.clearRect(0, 0, W, H);
          cc.font = `${cell}px ui-monospace, SFMono-Regular, Menlo, monospace`;
          cc.textBaseline = "top";
          const speed = reduce ? 0 : t * 9;
          for (let y = 0; y < ROWS; y++) {
            // staggered per-row arrival — the code writes itself top to bottom
            const rowT = ROWS > 1 ? y / (ROWS - 1) : 0;
            const rowIn = clamp((codeIn * 1.35 - rowT) * 3.2);
            if (rowIn < 0.02) continue;
            const line = CODE[y % CODE.length];
            const dir = y % 2 === 0 ? 1 : -1;
            const off = Math.floor(speed * dir + y * 3);
            const tint = CODE_TINT[y % CODE_TINT.length];
            // the row types in left→right as it arrives
            const typed = Math.floor(COLS * clamp(rowIn * 1.15));
            for (let x = 0; x < COLS; x++) {
              if (x > typed) break;
              if (!mask[y * COLS + x]) continue;
              const n = noise[y * COLS + x];
              const local = clamp(rowIn * (0.5 + n * 0.85));
              if (local < 0.05) continue;
              const ch = line[((x + off) % line.length + line.length) % line.length];
              if (ch === " ") continue;
              cc.fillStyle = tint;
              cc.globalAlpha = local * 0.9;
              cc.fillText(ch, x * cell, y * cell);
            }
          }
          cc.globalAlpha = 1;
          // composite the whole code layer with a growing blur as it leaves
          const blur = codeOut * 7;
          ctx.save();
          if (blur > 0.15) ctx.filter = `blur(${blur.toFixed(2)}px)`;
          ctx.globalAlpha = layer;
          ctx.drawImage(offC, 0, 0);
          ctx.restore();
          ctx.globalAlpha = 1;
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      target = total > 0 ? clamp(-r.top / total) : 0;
      setP(target);
    };

    const ready = () => { loaded++; if (loaded === 2) { buildMask(); onScroll(); if (reduce) cur = target; } };
    imgA.onload = ready; imgB.onload = ready;
    imgA.src = PHOTO; imgB.src = AVATAR;

    build(); onScroll();
    raf = requestAnimationFrame(draw);
    window.addEventListener("scroll", onScroll, { passive: true });
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { build(); onScroll(); }, 180); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(rt);
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize);
    };
  }, []);

  const act = p < 0.3 ? 0 : p < 0.72 ? 1 : 2;
  const COPY = [
    { k: "Product Designer", t: <>I design products<br /><em>that move the needle.</em></>, d: "14+ years shaping fintech, B2B and mobile products used by millions." },
    { k: "Decoding", t: <>Intent, turned<br /><em>into systems.</em></>, d: "Research, architecture, design systems — the craft behind every screen." },
    { k: "AI-Augmented", t: <>Designed by me.<br /><em>Shipped with AI.</em></>, d: "Same judgement, a fraction of the time — production products, end to end." },
  ][act];

  return (
    <main style={{ background: "#06060a", color: "#fff" }}>
      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 30, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Hero Transform · scroll
      </div>

      <div ref={wrapRef} style={{ height: "420svh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
          <div className="orb o1" aria-hidden style={{ opacity: 0.16 + p * 0.12 }} />
          <div className="orb o2" aria-hidden style={{ opacity: 0.10 + p * 0.16 }} />
          <div className="grid-bg" aria-hidden style={{ opacity: 0.15 + smooth(0.1, 0.6, p) * 0.35 }} />

          {/* ecosystem cards */}
          {CARDS.map((c, i) => {
            const inn = smooth(c.a, c.a + 0.14, p);
            const out = 1 - smooth(c.o, 1, p);
            const o = inn * out;
            const dx = (1 - inn) * (c.side === "l" ? -40 : 40);
            return (
              <div key={i} className={`card ${c.side}`} style={{ top: `${c.top}%`, width: c.w, opacity: o, transform: `translate(${dx}px, -50%)` }}>
                <p className="card-t">{c.title}</p>
                <CardBody kind={c.kind} />
              </div>
            );
          })}

          {/* centre stage */}
          <div className="stage">
            <div className="portrait" style={{ transform: `scale(${0.97 + smooth(0, 1, p) * 0.06})` }}>
              <canvas ref={canvasRef} />
              <div className="halo" aria-hidden style={{ opacity: 0.25 + smooth(0.3, 1, p) * 0.5 }} />
            </div>
          </div>

          {/* copy */}
          <div className="copy">
            <p className="badge" key={COPY.k}><span className="dot" /> {COPY.k}</p>
            <h1 key={act}>{COPY.t}</h1>
            <p className="lead" key={COPY.d + act}>{COPY.d}</p>
            <div className="ctas" style={{ opacity: smooth(0.8, 0.95, p), pointerEvents: p > 0.85 ? "auto" : "none" }}>
              <Link href="/#work" className="cta-a">View case studies →</Link>
              <Link href="/about" className="cta-b">About me</Link>
            </div>
          </div>

          {/* progress */}
          <div className="prog" aria-hidden>
            <span style={{ transform: `scaleX(${p})` }} />
          </div>
          <div className="hint" aria-hidden style={{ opacity: 1 - smooth(0.02, 0.16, p) }}>Scroll to transform ↓</div>
        </div>
      </div>

      {/* cinematic outro — then the site goes back to normal */}
      <section className="outro">
        <p className="o-eyebrow">The thesis</p>
        <h2>Human judgement.<br /><em>Machine speed.</em></h2>
        <p className="o-lead">Everything below is the proof — real products, real numbers, real teams.</p>
        <div className="o-stats">
          {[["30M+", "users reached"], ["+212%", "checkout conversion"], ["5", "case studies"], ["3", "languages"]].map(([n, l]) => (
            <div key={l}><strong>{n}</strong><span>{l}</span></div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .stage { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 3; }
        .portrait { position: relative; width: min(46vh, 44vw, 470px); aspect-ratio: 1/1; transition: transform .2s linear; }
        .portrait canvas { position: relative; z-index: 2; width: 100%; height: 100%; display: block; }
        .halo { position: absolute; inset: -22%; z-index: 1; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(0,113,227,.34), rgba(227,28,95,.16) 45%, transparent 68%); filter: blur(48px); }
        .copy { position: absolute; left: 0; right: 0; bottom: clamp(3.2rem,7vh,5.5rem); z-index: 6; text-align: center; padding: 0 1.5rem; pointer-events: none; }
        .copy :global(.cta-a), .copy :global(.cta-b) { pointer-events: auto; }
        .badge { display: inline-flex; align-items: center; gap: .5rem; font-size: .6rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase;
          color: #fff; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.16); backdrop-filter: blur(10px);
          padding: .34rem .8rem; border-radius: 100px; margin: 0 0 1rem; animation: sw .6s cubic-bezier(.16,1,.3,1); }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: #00c8a0; box-shadow: 0 0 10px #00c8a0; }
        .copy h1 { font-size: clamp(1.7rem,3.6vw,3.1rem); font-weight: 800; letter-spacing: -.035em; line-height: 1.05; margin: 0 0 .8rem;
          text-shadow: 0 4px 40px rgba(0,0,0,.6); animation: sw .7s cubic-bezier(.16,1,.3,1); }
        .copy h1 :global(em) { font-style: italic; font-weight: 500; background-image: linear-gradient(100deg,#7fb6ff,#00c8a0 45%,#e31c5f); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .lead { font-size: clamp(.85rem,1.1vw,1rem); font-weight: 300; color: rgba(255,255,255,.6); max-width: 430px; margin: 0 auto 1.4rem; line-height: 1.7; animation: sw .7s cubic-bezier(.16,1,.3,1) .04s both; }
        @keyframes sw { from { opacity: 0; transform: translateY(12px); } }
        .ctas { display: flex; gap: .7rem; justify-content: center; flex-wrap: wrap; transition: opacity .5s ease; }
        .cta-a, .cta-b { font-size: .86rem; font-weight: 600; padding: .72rem 1.7rem; border-radius: 100px; text-decoration: none; transition: transform .35s cubic-bezier(.16,1,.3,1), background .3s ease; }
        .cta-a { background: #fff; color: #111; }
        .cta-a:hover { transform: translateY(-3px); }
        .cta-b { background: rgba(255,255,255,.08); color: #fff; border: 1px solid rgba(255,255,255,.2); backdrop-filter: blur(10px); }
        .cta-b:hover { transform: translateY(-3px); background: rgba(255,255,255,.15); }

        .card { position: absolute; z-index: 5; padding: .8rem .9rem; border-radius: 14px;
          background: rgba(16,17,22,.62); border: 1px solid rgba(255,255,255,.11); backdrop-filter: blur(16px);
          box-shadow: 0 18px 44px rgba(0,0,0,.45); transition: opacity .5s ease, transform .6s cubic-bezier(.16,1,.3,1); }
        .card.l { left: clamp(1rem, 5vw, 5.5rem); }
        .card.r { right: clamp(1rem, 5vw, 5.5rem); }
        .card-t { font-size: .56rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.42); margin: 0 0 .55rem; }
        @media (max-width: 1080px) { .card { display: none; } }

        .orb { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; transition: opacity .4s ease; }
        .o1 { width: 46vw; height: 46vw; background: #0071e3; left: -10%; top: -12%; }
        .o2 { width: 42vw; height: 42vw; background: #e31c5f; right: -8%; bottom: -14%; }
        .grid-bg { position: absolute; inset: 0; pointer-events: none; transition: opacity .4s ease;
          background-image: linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
          background-size: 54px 54px; mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000, transparent 75%); }
        .prog { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: rgba(255,255,255,.08); z-index: 8; }
        .prog span { display: block; height: 100%; transform-origin: left; background: linear-gradient(90deg,#7fb6ff,#00c8a0,#e31c5f); }
        .hint { position: absolute; bottom: 1.4rem; left: 50%; transform: translateX(-50%); z-index: 8; font-size: .58rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.45); transition: opacity .4s ease; }

        .outro { min-height: 88svh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 5rem 1.5rem; }
        .o-eyebrow { font-size: .62rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.45); margin-bottom: 1.2rem; }
        .outro h2 { font-size: clamp(2rem,6vw,4.4rem); font-weight: 800; letter-spacing: -.04em; line-height: 1.02; margin: 0 0 1.2rem; }
        .outro h2 :global(em) { font-style: italic; font-weight: 500; background-image: linear-gradient(100deg,#7fb6ff,#00c8a0 50%,#e31c5f); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .o-lead { color: rgba(255,255,255,.55); max-width: 500px; margin: 0 auto 3rem; line-height: 1.7; }
        .o-stats { display: flex; gap: clamp(1.5rem,5vw,4rem); flex-wrap: wrap; justify-content: center; }
        .o-stats div { display: flex; flex-direction: column; gap: .3rem; }
        .o-stats strong { font-size: clamp(1.4rem,3vw,2.2rem); font-weight: 800; letter-spacing: -.03em; }
        .o-stats span { font-size: .72rem; color: rgba(255,255,255,.42); letter-spacing: .06em; }
        @media (prefers-reduced-motion: reduce) { .copy h1, .lead, .badge { animation: none; } }
      `}</style>
    </main>
  );
}

/* ── tiny ecosystem card bodies ── */
function CardBody({ kind }: { kind: string }) {
  if (kind === "tokens") return (
    <div style={{ display: "flex", gap: 5 }}>
      {["#0071e3", "#00c8a0", "#e31c5f", "#eab308", "#ff6a2b"].map((c) => (
        <span key={c} style={{ width: 20, height: 20, borderRadius: 6, background: c, boxShadow: `0 0 12px ${c}55` }} />
      ))}
    </div>
  );
  if (kind === "flow") return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 26, height: 16, borderRadius: 4, border: "1px solid rgba(255,255,255,.3)", background: i === 1 ? "rgba(0,113,227,.3)" : "transparent" }} />
          {i < 2 && <span style={{ width: 10, height: 1, background: "rgba(255,255,255,.28)" }} />}
        </span>
      ))}
    </div>
  );
  if (kind === "quote") return (
    <p style={{ fontSize: ".72rem", lineHeight: 1.5, color: "rgba(255,255,255,.72)", margin: 0, fontStyle: "italic" }}>
      &ldquo;Too much info on one card.&rdquo;
      <span style={{ display: "block", fontStyle: "normal", fontSize: ".6rem", color: "rgba(255,255,255,.35)", marginTop: 4 }}>User · session 07</span>
    </p>
  );
  if (kind === "component") return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: ".62rem", padding: ".3rem .7rem", borderRadius: 100, background: "#0071e3", color: "#fff", fontWeight: 600, alignSelf: "flex-start" }}>Primary</span>
      <span style={{ fontSize: ".62rem", padding: ".3rem .7rem", borderRadius: 100, border: "1px solid rgba(255,255,255,.28)", color: "rgba(255,255,255,.75)", alignSelf: "flex-start" }}>Ghost</span>
    </div>
  );
  if (kind === "metric") return (
    <div>
      <p style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-.03em", color: "#00c8a0" }}>+212%</p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 22, marginTop: 6 }}>
        {[30, 42, 38, 60, 78, 100].map((h, i) => (
          <span key={i} style={{ width: 8, height: `${h}%`, borderRadius: 2, background: i === 5 ? "#00c8a0" : "rgba(255,255,255,.2)" }} />
        ))}
      </div>
    </div>
  );
  return (
    <p style={{ fontSize: ".68rem", fontFamily: "ui-monospace, Menlo, monospace", color: "rgba(255,255,255,.7)", margin: 0, lineHeight: 1.5 }}>
      <span style={{ color: "#00c8a0" }}>ai</span>.ship(<span style={{ color: "#ffd166" }}>&quot;design&quot;</span>)
      <span style={{ display: "inline-block", width: 6, height: 11, background: "#00c8a0", marginLeft: 3, verticalAlign: -1 }} />
    </p>
  );
}
