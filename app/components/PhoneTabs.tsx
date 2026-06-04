"use client";
import { useState, CSSProperties } from "react";
import PhoneRow, { RowItem } from "./PhoneRow";

/* A segmented control (Search / Results / Confirmation …) that switches
   between groups of three phone screenshots. Each group is rendered with
   PhoneRow — three phones side by side on desktop, a horizontal swipe strip
   on mobile — directly on the section's black background with a blue glow,
   no card box. The control sits both above and below the phones. */

export type PhoneGroup = { label: string; items: RowItem[] };

export default function PhoneTabs({
  groups,
  isMobile = false,
}: {
  groups: PhoneGroup[];
  isMobile?: boolean;
}) {
  const [active, setActive] = useState(0);
  const n = groups.length;

  const control = (margin: CSSProperties["margin"]) => (
    <div
      style={{
        position: "relative",
        display: "flex",
        margin,
        maxWidth: n > 2 ? 460 : 360,
        padding: 5,
        borderRadius: 100,
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.09)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 5,
          bottom: 5,
          left: 5,
          width: `calc((100% - 10px) / ${n})`,
          transform: `translateX(${active * 100}%)`,
          borderRadius: 100,
          background: "#fff",
          transition: "transform .45s cubic-bezier(.4,0,.2,1)",
          boxShadow: "0 2px 12px rgba(0,0,0,.35)",
        }}
      />
      {groups.map((g, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          style={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            padding: ".7rem .5rem",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: ".82rem",
            fontWeight: 600,
            letterSpacing: "-.01em",
            color: i === active ? "#08080a" : "rgba(255,255,255,.65)",
            transition: "color .35s ease",
            whiteSpace: "nowrap",
          }}
        >
          {g.label}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      {control("0 auto 2.75rem")}

      {isMobile ? (
        <div key={active} className="pt-pane">
          <PhoneRow items={groups[active].items} isMobile />
        </div>
      ) : (
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              width: `${n * 100}%`,
              transform: `translateX(-${active * (100 / n)}%)`,
              transition: "transform .7s cubic-bezier(.16,1,.3,1)",
            }}
          >
            {groups.map((g, i) => (
              <div key={i} style={{ width: `${100 / n}%`, flexShrink: 0 }} aria-hidden={i !== active}>
                <PhoneRow items={g.items} />
              </div>
            ))}
          </div>
        </div>
      )}

      {control(isMobile ? "2.5rem auto 0" : "3rem auto 0")}

      <style jsx>{`
        .pt-pane {
          animation: pt-fade 0.5s ease;
        }
        @keyframes pt-fade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
