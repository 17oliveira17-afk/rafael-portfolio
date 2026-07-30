"use client";
import { useRef, useState, useEffect } from "react";

/* Shared segmented control — the CVC style: a dark rounded track with a
   sliding white pill marking the active tab. The pill is measured from the
   active button so it works for any number of tabs and variable label widths.
   Overflows scroll horizontally (scrollbar hidden) instead of wrapping. */
export default function SegmentedTabs({
  labels,
  active,
  onChange,
  size = "md",
}: {
  labels: string[];
  active: number;
  onChange: (i: number) => void;
  size?: "sm" | "md";
}) {
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = btnRefs.current[active];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    let cancelled = false;
    const fonts = (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts;
    if (fonts?.ready) fonts.ready.then(() => { if (!cancelled) measure(); });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [active, labels.length]);

  const fs = size === "sm" ? ".74rem" : ".8rem";
  const py = size === "sm" ? ".5rem" : ".62rem";
  const px = size === "sm" ? ".9rem" : "1.1rem";

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div className="seg-scroll" style={{ maxWidth: "100%", overflowX: "auto" }}>
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            padding: 5,
            borderRadius: 100,
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.09)",
            whiteSpace: "nowrap",
          }}
        >
          {pill && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 5,
                bottom: 5,
                left: pill.left,
                width: pill.width,
                borderRadius: 100,
                background: "#fff",
                boxShadow: "0 2px 12px rgba(0,0,0,.35)",
                transition: "left .45s cubic-bezier(.4,0,.2,1), width .45s cubic-bezier(.4,0,.2,1)",
              }}
            />
          )}
          {labels.map((l, i) => (
            <button
              key={i}
              ref={(el) => { btnRefs.current[i] = el; }}
              onClick={() => onChange(i)}
              style={{
                position: "relative",
                zIndex: 1,
                padding: `${py} ${px}`,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: fs,
                fontWeight: 600,
                letterSpacing: "-.01em",
                color: i === active ? "#08080a" : "rgba(255,255,255,.65)",
                transition: "color .35s ease",
                whiteSpace: "nowrap",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .seg-scroll::-webkit-scrollbar { display: none; }
        .seg-scroll { scrollbar-width: none; }
      `}</style>
    </div>
  );
}
