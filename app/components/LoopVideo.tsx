"use client";
import { useEffect, useRef, useState, CSSProperties } from "react";

/* Apple-style silent autoplay loop. Plays only while in view (saves battery / data).
   If `src` is missing or fails, shows an elegant placeholder so the layout never breaks. */
type Props = {
  src?: string;            // e.g. "/videos/cvc-flight.mp4"
  poster?: string;        // fallback still image
  label?: string;         // shown on the placeholder
  aspect?: string;         // CSS aspect-ratio, default 9/19.5 (phone)
  radius?: number;
  style?: CSSProperties;
};

export default function LoopVideo({ src, poster, label = "Video coming soon", aspect = "9 / 19.5", radius = 28, style = {} }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    const v = ref.current;
    if (!v || failed) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    obs.observe(v);
    return () => obs.disconnect();
  }, [failed]);

  const wrap: CSSProperties = {
    aspectRatio: aspect, borderRadius: radius, overflow: "hidden",
    background: "#0c0c0f", position: "relative", ...style,
  };

  if (failed) {
    return (
      <div style={wrap}>
        {poster && <img src={poster} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .5 }} />}
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: ".75rem",
          color: "rgba(255,255,255,.5)", textAlign: "center", padding: "1.5rem",
          background: "linear-gradient(135deg, rgba(0,113,227,.12), rgba(126,72,255,.10))",
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span style={{ fontSize: ".72rem", letterSpacing: ".06em", fontWeight: 600 }}>{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <video
        ref={ref} muted loop playsInline preload="metadata" poster={poster}
        onError={() => setFailed(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
