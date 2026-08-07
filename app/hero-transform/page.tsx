"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────
   HERO TRANSFORM — test page, NOT linked anywhere.
   ClickUp-style composition with Rafael's identity:
     · giant type sitting BEHIND the figure
     · large centred portrait, fading out at the bottom
     · headline + two compact pill buttons over the lower figure
     · on scroll the figure stays, side columns build around it
   Act 1 photo → Act 2 code writes itself through the silhouette
   while the photo disintegrates → Act 3 the 3D avatar remains.
   ────────────────────────────────────────────── */

const PHOTO = "/photos/rafael-real-cut.png";     // transparent cutout
const AVATAR = "/photos/rafael-avatar-cut.png";  // transparent cutout

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
/* neutral only — greys and blues */
const CODE_TINT = ["#8ea6c4", "#6d87a8", "#a6b4c6", "#5d7ea6", "#93a3b8", "#7b93b0"];

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (e0: number, e1: number, x: number) => { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };

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
    let loaded = 0, raf = 0, target = 0, cur = 0;
    const t0 = performance.now();
    let W = 0, H = 0, cell = 10, COLS = 0, ROWS = 0;
    let mask: Uint8Array | null = null, noise: Float32Array | null = null;
    const offA = document.createElement("canvas"), offB = document.createElement("canvas"), offC = document.createElement("canvas");

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
      // the cutout has a real alpha channel — the silhouette is exact
      for (let i = 0; i < COLS * ROWS; i++) mask[i] = d[i * 4 + 3] > 90 ? 1 : 0;
    };

    const build = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      [offA, offB, offC].forEach((o) => { o.width = W; o.height = H; });
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
      const dissolve = smooth(0.16, 0.62, q);
      const reveal = smooth(0.42, 0.88, q);

      ctx.clearRect(0, 0, W, H);
      if (loaded === 2 && mask && noise) {
        // photo, disintegrating
        const ca = offA.getContext("2d")!;
        ca.clearRect(0, 0, W, H); ca.globalAlpha = 1;
        fit(imgA, ca, W, H);
        if (dissolve > 0) {
          ca.globalCompositeOperation = "destination-out";
          for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
            if (noise[y * COLS + x] < dissolve) { ca.fillStyle = "#000"; ca.fillRect(x * cell, y * cell, cell + 1, cell + 1); }
          }
          ca.globalCompositeOperation = "source-over";
        }
        ctx.globalAlpha = 1 - smooth(0.68, 0.9, q);
        ctx.drawImage(offA, 0, 0);

        // avatar, materialising
        if (reveal > 0) {
          const cb = offB.getContext("2d")!;
          cb.clearRect(0, 0, W, H);
          fit(imgB, cb, W, H);
          cb.globalCompositeOperation = "destination-out";
          for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
            if (noise[y * COLS + x] > reveal) { cb.fillStyle = "#000"; cb.fillRect(x * cell, y * cell, cell + 1, cell + 1); }
          }
          cb.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1;
          ctx.drawImage(offB, 0, 0);
        }

        // code writing itself through the silhouette, leaving with blur
        const codeIn = smooth(0.10, 0.58, q);
        const codeOut = smooth(0.60, 0.94, q);
        const layer = clamp(codeIn) * (1 - codeOut);
        if (layer > 0.01) {
          const cc = offC.getContext("2d")!;
          cc.clearRect(0, 0, W, H);
          cc.font = `${cell}px ui-monospace, SFMono-Regular, Menlo, monospace`;
          cc.textBaseline = "top";
          const speed = reduce ? 0 : t * 9;
          for (let y = 0; y < ROWS; y++) {
            const rowT = ROWS > 1 ? y / (ROWS - 1) : 0;
            const rowIn = clamp((codeIn * 1.35 - rowT) * 3.2);
            if (rowIn < 0.02) continue;
            const line = CODE[y % CODE.length];
            const dir = y % 2 === 0 ? 1 : -1;
            const off = Math.floor(speed * dir + y * 3);
            const tint = CODE_TINT[y % CODE_TINT.length];
            const typed = Math.floor(COLS * clamp(rowIn * 1.15));
            for (let x = 0; x < COLS; x++) {
              if (x > typed) break;
              if (!mask[y * COLS + x]) continue;
              const local = clamp(rowIn * (0.5 + noise[y * COLS + x] * 0.85));
              if (local < 0.05) continue;
              const ch = line[((x + off) % line.length + line.length) % line.length];
              if (ch === " ") continue;
              cc.fillStyle = tint; cc.globalAlpha = local * 0.9;
              cc.fillText(ch, x * cell, y * cell);
            }
          }
          cc.globalAlpha = 1;
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

  // act 1 chrome fades out as the side columns build
  const intro = 1 - smooth(0.06, 0.24, p);
  const sideIn = smooth(0.18, 0.42, p);
  const sideOut = 1 - smooth(0.9, 1, p);
  const side = sideIn * sideOut;

  return (
    <main style={{ background: "#06060a", color: "#fff" }}>
      <div style={{ position: "fixed", top: "5.5rem", left: "1.5rem", zIndex: 40, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 100, padding: ".3rem .7rem" }}>
        Hero Transform · scroll
      </div>

      <div ref={wrapRef} style={{ height: "420svh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
          <div className="orb o1" aria-hidden />
          <div className="orb o2" aria-hidden />

          {/* GIANT TYPE BEHIND THE FIGURE */}
          {/* rises as you scroll, so the page feels like it's travelling down past it */}
          <div className="behind" aria-hidden style={{ opacity: 0.55 + p * 0.45, transform: `translate(-50%, calc(-50% - ${p * 52}vh)) scale(${1 + p * 0.1})` }}>
            <span>PRODUCT</span>
            <span>DESIGN</span>
          </div>

          {/* CENTRE FIGURE */}
          <div className="stage">
            <div className="portrait">
              <canvas ref={canvasRef} />
              <div className="halo" aria-hidden style={{ opacity: 0.22 + smooth(0.3, 1, p) * 0.45 }} />
            </div>
          </div>

          {/* ACT 1 — headline + pill buttons over the lower figure */}
          <div className="intro" style={{ opacity: intro, pointerEvents: intro < 0.3 ? "none" : "auto" }}>
            <h1>I design products that move the needle —<br /><em>and now I ship them with AI.</em></h1>
            <div className="btns">
              <Link href="/#work" className="b-primary">View case studies</Link>
              <Link href="/about" className="b-ghost">About me</Link>
            </div>
          </div>

          {/* SIDE COLUMNS — build around the figure on scroll */}
          <div className="col left" style={{ opacity: side, transform: `translateX(${(1 - sideIn) * -26}px)` }}>
            <p className="eyebrow">The human part</p>
            <h2>Judgement doesn&apos;t come from a model.</h2>
            <p className="body">14+ years deciding what to build and why — research, architecture and systems for fintech, B2B and mobile products used by millions.</p>
            <hr />
            <p className="label">Craft</p>
            <div className="pills">
              {["Research", "Design systems", "Prototyping", "Leading teams"].map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
          </div>

          <div className="col right" style={{ opacity: side, transform: `translateX(${(1 - sideIn) * 26}px)` }}>
            <p className="eyebrow r">The proof</p>
            <p className="label r">Outcomes</p>
            <div className="quote">
              <strong>+212%</strong> checkout conversion on Brazil&apos;s largest travel app — 2.0★ to 4.6★ after the rebuild.
            </div>
            <div className="pills r">
              {["2 weeks → 2 days", "8-week cycle → 3", "30M+ users"].map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
            <hr />
            <p className="label r">Toolkit</p>
            <div className="pills r">
              {["Figma", "Claude Code", "Mixpanel", "Maze"].map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
          </div>

          <div className="prog" aria-hidden><span style={{ transform: `scaleX(${p})` }} /></div>
          <div className="hint" aria-hidden style={{ opacity: intro }}>Scroll to transform ↓</div>
        </div>
      </div>

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
        .behind { position: absolute; left: 50%; top: 46%; z-index: 1; display: flex; flex-direction: column; align-items: center;
          font-weight: 900; letter-spacing: -.05em; line-height: .82; color: rgba(255,255,255,.055); white-space: nowrap;
          font-size: clamp(4rem, 17vw, 17rem); pointer-events: none; will-change: transform;
          transition: opacity .4s ease, transform .18s linear; }

        .stage { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: center; z-index: 3; }
        .portrait { position: relative; width: min(96vh, 68vw, 840px); aspect-ratio: 1/1; margin-bottom: -12vh;
          -webkit-mask-image: linear-gradient(to bottom, #000 74%, rgba(0,0,0,.6) 90%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 74%, rgba(0,0,0,.6) 90%, transparent 100%); }
        .portrait canvas { position: relative; z-index: 2; width: 100%; height: 100%; display: block; }
        .halo { position: absolute; inset: -18%; z-index: 1; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(0,113,227,.30), rgba(227,28,95,.14) 46%, transparent 68%); filter: blur(52px); }

        .intro { position: absolute; left: 0; right: 0; bottom: clamp(2.4rem,7vh,5rem); z-index: 8; text-align: center; padding: 0 1.5rem; transition: opacity .5s ease; }
        .intro h1 { font-size: clamp(1.5rem,3.1vw,2.6rem); font-weight: 700; letter-spacing: -.03em; line-height: 1.18; margin: 0 0 1.5rem;
          text-shadow: 0 4px 40px rgba(0,0,0,.75); }
        .intro h1 :global(em) { font-style: italic; font-weight: 500; background-image: linear-gradient(100deg,#7fb6ff,#a6b4c6 55%,#e31c5f); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .btns { display: flex; gap: .6rem; justify-content: center; flex-wrap: wrap; }
        .b-primary, .b-ghost { font-size: .84rem; font-weight: 600; padding: .62rem 1.5rem; border-radius: 100px; text-decoration: none;
          transition: transform .3s cubic-bezier(.16,1,.3,1), background .3s ease; }
        .b-primary { background: rgba(255,255,255,.92); color: #111; }
        .b-primary:hover { transform: translateY(-2px); background: #fff; }
        .b-ghost { background: rgba(255,255,255,.08); color: rgba(255,255,255,.85); border: 1px solid rgba(255,255,255,.16); backdrop-filter: blur(10px); }
        .b-ghost:hover { transform: translateY(-2px); background: rgba(255,255,255,.14); }

        .col { position: absolute; top: 50%; z-index: 7; width: min(27vw, 330px); transform-origin: center;
          transition: opacity .5s ease, transform .6s cubic-bezier(.16,1,.3,1); }
        .left { left: clamp(1.5rem, 5vw, 5.5rem); margin-top: -8vh; transform: translateY(-50%); }
        .right { right: clamp(1.5rem, 5vw, 5.5rem); margin-top: -8vh; text-align: right; }
        .col :global(h2), .col h2 { font-size: clamp(1.1rem,1.9vw,1.7rem); font-weight: 700; letter-spacing: -.025em; line-height: 1.15; margin: 0 0 .7rem; }
        .eyebrow { font-size: .58rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #7fb6ff; margin: 0 0 .8rem; }
        .eyebrow.r { margin-bottom: 1.1rem; }
        .body { font-size: .8rem; font-weight: 300; line-height: 1.7; color: rgba(255,255,255,.55); margin: 0; }
        .label { font-size: .56rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.38); margin: 0 0 .75rem; }
        .col hr { border: none; border-top: 1px solid rgba(255,255,255,.1); margin: 1.4rem 0 1.1rem; }
        .pills { display: flex; flex-wrap: wrap; gap: .4rem; }
        .pills.r { justify-content: flex-end; }
        .quote { font-size: .8rem; line-height: 1.65; color: rgba(255,255,255,.7); background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.09); border-radius: 12px; padding: .85rem .95rem; margin-bottom: .8rem; text-align: left; }
        .quote strong { color: #fff; font-weight: 700; }
        @media (max-width: 1180px) { .col { display: none; } }

        .orb { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
        .o1 { width: 46vw; height: 46vw; background: #0071e3; opacity: .14; left: -10%; top: -12%; }
        .o2 { width: 42vw; height: 42vw; background: #e31c5f; opacity: .10; right: -8%; bottom: -16%; }
        .prog { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: rgba(255,255,255,.07); z-index: 10; }
        .prog span { display: block; height: 100%; transform-origin: left; background: linear-gradient(90deg,#7fb6ff,#a6b4c6,#e31c5f); }
        .hint { position: absolute; bottom: 1.2rem; left: 50%; transform: translateX(-50%); z-index: 10; font-size: .56rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.4); transition: opacity .4s ease; }

        .outro { min-height: 88svh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 5rem 1.5rem; }
        .o-eyebrow { font-size: .62rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.45); margin-bottom: 1.2rem; }
        .outro h2 { font-size: clamp(2rem,6vw,4.4rem); font-weight: 800; letter-spacing: -.04em; line-height: 1.02; margin: 0 0 1.2rem; }
        .outro h2 :global(em) { font-style: italic; font-weight: 500; background-image: linear-gradient(100deg,#7fb6ff,#a6b4c6 50%,#e31c5f); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .o-lead { color: rgba(255,255,255,.55); max-width: 500px; margin: 0 auto 3rem; line-height: 1.7; }
        .o-stats { display: flex; gap: clamp(1.5rem,5vw,4rem); flex-wrap: wrap; justify-content: center; }
        .o-stats div { display: flex; flex-direction: column; gap: .3rem; }
        .o-stats strong { font-size: clamp(1.4rem,3vw,2.2rem); font-weight: 800; letter-spacing: -.03em; }
        .o-stats span { font-size: .72rem; color: rgba(255,255,255,.42); letter-spacing: .06em; }
      `}</style>
    </main>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", fontSize: ".72rem", fontWeight: 500,
      color: "rgba(255,255,255,.78)", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.11)",
      borderRadius: 100, padding: ".32rem .7rem", whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(127,182,255,.75)", flexShrink: 0 }} />
      {children}
    </span>
  );
}
