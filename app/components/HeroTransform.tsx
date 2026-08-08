"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────
   HERO TRANSFORM — the home hero.
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
  const behindRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
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
    // pointer parallax: -1..1 from the centre of the viewport, eased each frame
    const pt = { x: 0, y: 0, tx: 0, ty: 0 };
    const t0 = performance.now();
    let W = 0, H = 0, cell = 10, COLS = 0, ROWS = 0;
    let narrow = false;   // phones: the figure lifts to make room for the copy
    let mask: Uint8Array | null = null, noise: Float32Array | null = null;
    const offA = document.createElement("canvas"), offB = document.createElement("canvas"), offC = document.createElement("canvas");

    /* Both sources are already clean transparent cut-outs — they are drawn
       exactly as delivered, alpha untouched. */
    const fit = (img: HTMLImageElement, c: CanvasRenderingContext2D, w: number, h: number) => {
      const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
      const ar = iw / ih, r = w / h;
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
      narrow = window.innerWidth <= 860;
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

      /* Background type is driven here, off the smoothed value and straight
         onto the node — no React re-render per scroll event, so it glides. */
      // very slow drift toward the target
      pt.x += (pt.tx - pt.x) * 0.012;
      pt.y += (pt.ty - pt.y) * 0.012;

      if (behindRef.current) {
        const rise = clamp(q / 0.74) * 120;
        const fade = 1 - smooth(0.28, 0.70, q);
        // the background type stays put — only the figure follows the pointer
        behindRef.current.style.opacity = String(fade);
        behindRef.current.style.transform =
          `translate(-50%, calc(-50% - ${rise.toFixed(2)}vh)) scale(${(1 + q * 0.1).toFixed(4)})`;
      }
      if (portraitRef.current) {
        // phones: as the avatar resolves, the figure rises and eases back so the
        // columns below get real room instead of fighting it for space
        const lift = narrow ? smooth(0.26, 0.72, q) : 0;
        const sc = 1 - lift * 0.2;
        // moves opposite the cursor: pointer right, figure drifts left
        portraitRef.current.style.transform =
          `translate3d(${(pt.x * -26).toFixed(2)}px, calc(${(pt.y * -16).toFixed(2)}px - ${(lift * 13).toFixed(2)}svh), 0)` +
          ` rotateY(${(pt.x * -4).toFixed(2)}deg) rotateX(${(pt.y * 2.6).toFixed(2)}deg)` +
          ` scale(${sc.toFixed(4)})`;
      }

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
    const onPointer = (e: PointerEvent) => {
      pt.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pt.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLeave = () => { pt.tx = 0; pt.ty = 0; };
    if (!reduce && window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { build(); onScroll(); }, 180); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(rt);
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer); window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // act 1 chrome fades out as the side columns build
  const intro = 1 - smooth(0.06, 0.24, p);
  /* Each block gets its own entrance, alternating left/right, so the two
     columns assemble in a cascade while the avatar materialises — then stay. */
  const blk = (start: number, dir: -1 | 1) => {
    const t = smooth(start, start + 0.11, p);
    return {
      opacity: t,
      transform: `translate(${((1 - t) * 20 * dir).toFixed(2)}px, ${((1 - t) * 16).toFixed(2)}px)`,
      willChange: "transform, opacity",
    } as const;
  };
  // background type must be fully gone and fully travelled up before the
  // avatar finishes materialising (reveal completes at ~0.88)

  return (
    <section style={{ background: "#06060a", color: "#fff" }}>

      {/* nav stays in its at-the-top state for the whole transformation */}
      <div ref={wrapRef} data-nav-transparent className="wrap">
        <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
          <div className="lights" aria-hidden />

          {/* GIANT TYPE BEHIND THE FIGURE */}
          {/* rises as you scroll, so the page feels like it's travelling down past it */}
          <div ref={behindRef} className="behind" aria-hidden>
            <span>PRODUCT</span>
            <span>DESIGNER</span>
          </div>

          {/* CENTRE FIGURE */}
          <div className="stage">
            <div className="portrait" ref={portraitRef}>
              <canvas ref={canvasRef} />
            </div>
          </div>

          {/* ACT 1 — headline + pill buttons over the lower figure */}
          <div className="intro" style={{ opacity: intro, pointerEvents: intro < 0.3 ? "none" : "auto" }}>
            <h1>I design products<br /><em className="text-gradient">that move the needle.</em></h1>
            <div className="btns">
              <Link href="/#work" className="btn-blue">View case studies</Link>
              <Link href="/about" className="btn-white-ghost">About me</Link>
            </div>
          </div>

          {/* SIDE COLUMNS — build around the figure on scroll */}
          <div className="cols">
          {/* LEFT — who I am · blocks 1, 3, 5, 7 of the cascade */}
          <div className="col left">
            <div style={blk(0.30, -1)}>
              <p className="eyebrow">Profile</p>
              <h2>Rafael Guimarães</h2>
              <p className="role">AI-First Product Design Lead</p>
            </div>
            <div style={blk(0.42, -1)}>
              <hr />
              <div className="stats">
                {[["14+", "years in product design"], ["3", "languages · PT / EN / ES"], ["9", "markets shipped to"]].map(([n, l]) => (
                  <div className="stat" key={l}><strong>{n}</strong><span>{l}</span></div>
                ))}
              </div>
            </div>
            <div style={blk(0.54, -1)}>
              <hr />
              <p className="label">Currently</p>
              <div className="pills"><Pill>Design Lead @ Thoughtworks</Pill></div>
              <p className="mini">Designing URPI PRO, a B2B credit platform for MiBanco — previously Rappi and CVC Corp.</p>
            </div>
            <div className="cta-block" style={blk(0.66, -1)}>
              <Link href="/about" className="full-story">Full story <span aria-hidden>→</span></Link>
            </div>
          </div>

          {/* RIGHT — where I've been and what I do · blocks 2, 4, 6 */}
          <div className="col right">
            <div style={blk(0.36, 1)}>
              <p className="eyebrow r">Track record</p>
              <div className="firms">
                {[["Thoughtworks", "2025 —"], ["Rappi", "2022 – 25"], ["CVC Corp", "2018 – 22"]].map(([c, y]) => (
                  <div className="firm" key={c}><span className="f-name">{c}</span><span className="f-year">{y}</span></div>
                ))}
              </div>
            </div>
            <div style={blk(0.48, 1)}>
              <hr />
              <p className="label r">Impact</p>
              <div className="pills r">
                {["30M+ users", "+212% conversion", "8 weeks → 3"].map((s) => <Pill key={s}>{s}</Pill>)}
              </div>
            </div>
            <div style={blk(0.60, 1)}>
              <hr />
              <p className="label r">Skills</p>
              <div className="pills r">
                {["Product strategy", "Design systems", "Research", "AI-first delivery"].map((s) => <Pill key={s}>{s}</Pill>)}
              </div>
            </div>
          </div>
          </div>

          <div className="hint" aria-hidden style={{ opacity: intro }}>
            <span className="mouse"><span className="wheel" /></span>
          </div>
        </div>
      </div>


      <style jsx>{`
        /* dark grey type sitting in front of the lights — reads as a shape
           blocking the wash rather than a coloured headline */
        .behind { position: absolute; left: 50%; top: 46%; z-index: 1; display: flex; flex-direction: column; align-items: center;
          font-weight: 900; letter-spacing: -.05em; line-height: .82; color: #171a20; white-space: nowrap;
          font-size: clamp(2.6rem, 12.5vw, 13rem); pointer-events: none; will-change: transform, opacity;
          transform: translate(-50%, -50%); }
        /* second line runs larger so the two lines don't read as one block */
        .behind span:last-child { font-size: 1.16em; }

        .stage { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: center; z-index: 3; perspective: 1400px; }
        .portrait { position: relative; width: min(96vh, 68vw, 840px); aspect-ratio: 1/1; margin-bottom: -12vh; will-change: transform;
          -webkit-mask-image: linear-gradient(to bottom, #000 74%, rgba(0,0,0,.6) 90%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 74%, rgba(0,0,0,.6) 90%, transparent 100%); }
        .portrait canvas { position: relative; z-index: 2; width: 100%; height: 100%; display: block; }

        .intro { position: absolute; left: 0; right: 0; bottom: clamp(5.6rem,11vh,8.5rem); z-index: 8; text-align: center; padding: 0 1.5rem;
          transition: opacity .5s ease; isolation: isolate; }
        /* soft shadow pooled behind the copy so it reads over the figure,
           with no visible box — just a blurred falloff */
        .intro::before { content: ""; position: absolute; left: 50%; top: 48%; transform: translate(-50%,-50%);
          width: min(980px, 94vw); height: 235%; z-index: -1; pointer-events: none; filter: blur(22px);
          background: radial-gradient(ellipse 52% 50% at 50% 50%, rgba(0,0,0,.80), rgba(0,0,0,.52) 42%, rgba(0,0,0,.22) 62%, transparent 78%); }
        .intro h1 { font-size: clamp(1.9rem,4.2vw,3.6rem); font-weight: 800; letter-spacing: -.038em; line-height: 1.06; margin: 0 0 1.6rem;
          text-shadow: 0 2px 12px rgba(0,0,0,.65), 0 6px 46px rgba(0,0,0,.8); }
        /* italic line uses the site's own vivid gradient */
        .intro h1 :global(em) { font-style: italic; font-weight: 800; text-shadow: none; }
        .btns { display: flex; gap: .6rem; justify-content: center; flex-wrap: wrap; }

        /* one row holding both columns: they share a top line so the two
           groups read as aligned, and the row itself is centred on the figure */
        .cols { position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%); z-index: 7;
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 5.5rem); pointer-events: none; }
        .col { width: min(27vw, 330px); pointer-events: auto;
          transition: opacity .5s ease, transform .6s cubic-bezier(.16,1,.3,1); }
        .right { text-align: right; }
        .col :global(h2), .col h2 { font-size: clamp(1.2rem,2.05vw,1.85rem); font-weight: 800; letter-spacing: -.032em; line-height: 1.1; margin: 0 0 .45rem; }
        /* eyebrow gets a short accent rule, matching the section labels used
           across the rest of the site */
        .eyebrow { display: inline-flex; align-items: center; gap: .5rem; font-size: .58rem; font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase; color: #7fb6ff; margin: 0 0 .95rem; }
        .eyebrow::before { content: ""; width: 16px; height: 1px; background: currentColor; opacity: .7; }
        .right .eyebrow { flex-direction: row-reverse; }
        .eyebrow.r { margin-bottom: 1.15rem; }
        .body { font-size: .8rem; font-weight: 300; line-height: 1.7; color: rgba(255,255,255,.55); margin: 0; }
        .label { font-size: .56rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.45); margin: 0 0 .8rem; }
        /* dividers fade out toward the page edge, like the rest of the site */
        .col hr { border: none; height: 1px; margin: 1.5rem 0 1.2rem; }
        .left hr { background: linear-gradient(90deg, rgba(255,255,255,.16), transparent); }
        .right hr { background: linear-gradient(270deg, rgba(255,255,255,.16), transparent); }
        .pills { display: flex; flex-wrap: wrap; gap: .4rem; }
        .pills.r { justify-content: flex-end; }
        .col :global(.ht-pill) { display: inline-flex; align-items: center; gap: .4rem; font-size: .72rem; font-weight: 500;
          color: rgba(255,255,255,.78); background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.11);
          border-radius: 100px; padding: .32rem .7rem; white-space: nowrap; cursor: default;
          transition: background .25s ease, border-color .25s ease, color .25s ease, transform .25s cubic-bezier(.16,1,.3,1); }
        .col :global(.ht-pill:hover) { background: rgba(255,255,255,.1); border-color: rgba(127,182,255,.5); color: #fff; transform: translateY(-2px); }
        .col :global(.ht-dot) { width: 5px; height: 5px; border-radius: 50%; background: rgba(127,182,255,.75); flex-shrink: 0; }
        .mini { font-size: .74rem; font-weight: 300; line-height: 1.6; color: rgba(255,255,255,.45); margin: .85rem 0 0; }
        .full-story { display: inline-flex; align-items: center; gap: .45rem; margin-top: 1.35rem;
          font-size: .82rem; font-weight: 600; color: #fff; text-decoration: none;
          background: rgba(0,113,227,.9); border-radius: 100px; padding: .55rem 1.25rem;
          transition: transform .3s cubic-bezier(.16,1,.3,1), background .3s ease; }
        .full-story:hover { transform: translateY(-2px); background: #0071e3; }
        .role { font-size: .76rem; font-weight: 500; letter-spacing: .015em; color: rgba(255,255,255,.58); margin: 0; }
        .stats { display: flex; flex-direction: column; gap: .95rem; }
        .stat { display: flex; align-items: baseline; gap: .7rem; }
        .stat strong { font-size: 1.6rem; font-weight: 800; letter-spacing: -.035em; min-width: 2.8ch;
          font-variant-numeric: tabular-nums; background-image: linear-gradient(160deg,#ffffff,#9fb6d4);
          -webkit-background-clip: text; background-clip: text; color: transparent; }
        .stat span { font-size: .73rem; color: rgba(255,255,255,.5); line-height: 1.4; }
        .firms { display: flex; flex-direction: column; gap: .1rem; }
        .firm { display: flex; align-items: baseline; justify-content: flex-end; gap: .75rem; padding: .42rem 0;
          border-bottom: 1px solid rgba(255,255,255,.06); transition: border-color .25s ease; }
        .firm:last-child { border-bottom: none; }
        .firm:hover { border-color: rgba(127,182,255,.35); }
        .firm:hover .f-name { color: #fff; }
        .f-name { font-size: 1.02rem; font-weight: 700; letter-spacing: -.022em; color: rgba(255,255,255,.92); transition: color .25s ease; }
        .f-year { font-size: .66rem; color: rgba(255,255,255,.35); font-variant-numeric: tabular-nums; letter-spacing: .04em; }
        .wrap { height: 420svh; position: relative; }

        /* ── Tablets: same composition, tighter ───────────────────── */
        @media (max-width: 1180px) {
          .wrap { height: 380svh; }
          .cols { padding: 0 1.25rem; }
          .col { width: 30vw; }
          .col :global(h2), .col h2 { font-size: 1.25rem; }
          .body, .mini { font-size: .72rem; }
          .stat strong { font-size: 1.25rem; }
          .f-name { font-size: .88rem; }
          .col :global(.ht-pill) { font-size: .66rem; padding: .28rem .6rem; }
          .portrait { width: min(80vh, 56vw); }
        }

        /* ── Phones: the same three acts, stacked to fit ───────────────
           The figure keeps the stage; the two columns become one centred
           column that sits under it, so the story reads the same as on
           desktop rather than turning into a different page. */
        @media (max-width: 860px) {
          .wrap { height: 400svh; }
          .portrait { width: min(94vw, 52svh); margin-bottom: 0; }
          .stage { align-items: flex-start; padding-top: 12svh; }
          .behind { font-size: clamp(2.4rem, 17vw, 7rem); top: 26%; }
          .intro { bottom: clamp(4.6rem, 9vh, 6rem); }
          .intro h1 { font-size: clamp(1.5rem, 6.6vw, 2.1rem); line-height: 1.14; margin-bottom: 1.1rem; }
          .intro::before { width: 124vw; height: 200%; }
          .btns :global(.btn-blue), .btns :global(.btn-white-ghost) { font-size: .82rem; padding: .58rem 1.3rem; }
          .hint { bottom: 1.1rem; }

          .cols { top: auto; bottom: 0; transform: none; flex-direction: column;
            align-items: stretch; gap: 1rem; padding: 0 1.4rem 2rem; }
          .col { width: 100%; text-align: left; }
          .right { text-align: left; }
          .right .eyebrow { flex-direction: row; }
          .firm { justify-content: flex-start; }
          .pills, .pills.r { justify-content: flex-start; }
          .col :global(h2), .col h2 { font-size: 1.4rem; }
          .col hr { margin: .9rem 0 .8rem; }
          .stats { flex-direction: row; gap: 1.1rem; flex-wrap: wrap; }
          .stat { flex-direction: column; gap: .1rem; align-items: flex-start; }
          .stat strong { font-size: 1.3rem; min-width: 0; }
          .stat span { font-size: .66rem; }
          /* trim to what fits: identity + CTA on the left, impact on the right */
          .left  > div:nth-child(2) { display: none; }
          .right > div:nth-child(3) { display: none; }
          .mini { display: none; }
          .full-story { margin-top: .9rem; }
        }

        /* ── Short/landscape phones ───────────────────────────────── */
        @media (max-width: 860px) and (orientation: landscape) {
          .portrait { width: min(46vw, 76svh); }
          .stage { align-items: center; padding-top: 0; }
          .cols { max-height: 70svh; }
        }

        /* Studio lights painted as one full-viewport layer. Two radial
           gradients pinned to the far edges — blue key on the left, hot
           pink-red on the right — both falling to transparent well before
           the centre, so behind the figure the stage stays black. Drawn as
           background on a single full-bleed element (not blurred boxes), so
           there is no element edge that can show up as a rectangle. */
        .lights { position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background:
            /* a soft black pool at the centre, painted last-on-top, so the two
               washes dissolve into blackness as they meet behind the figure */
            radial-gradient(ellipse 44% 66% at 50% 50%, rgba(6,6,10,.72), rgba(6,6,10,.34) 48%, transparent 82%),
            /* long, very gradual falloff — the light reaches toward the middle
               but is all but gone by the time it gets there */
            radial-gradient(ellipse 72% 104% at 0% 50%, rgba(30,106,236,.58), rgba(23,82,190,.33) 18%, rgba(17,56,132,.17) 34%, rgba(12,36,88,.075) 52%, rgba(10,26,66,.025) 68%, transparent 88%),
            radial-gradient(ellipse 72% 104% at 100% 50%, rgba(222,26,94,.52), rgba(178,21,77,.30) 18%, rgba(130,16,60,.15) 34%, rgba(80,10,40,.065) 52%, rgba(58,7,29,.022) 68%, transparent 88%); }
        /* same animated mouse cue the home hero used */
        .hint { position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%); z-index: 10; transition: opacity .4s ease; }
        .mouse { display: block; width: 24px; height: 40px; border: 1.5px solid rgba(255,255,255,.3); border-radius: 12px; position: relative; }
        .wheel { position: absolute; top: 6px; left: 50%; margin-left: -1.5px; width: 3px; height: 8px;
          background: rgba(255,255,255,.6); border-radius: 2px; animation: htScrollMouse 2s ease infinite; }
        @keyframes htScrollMouse { 0% { opacity: 0; transform: translateY(0); } 40% { opacity: 1; } 80% { opacity: 0; transform: translateY(14px); } 100% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .wheel { animation: none; } }

      `}</style>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="ht-pill">
      <span className="ht-dot" />
      {children}
    </span>
  );
}
