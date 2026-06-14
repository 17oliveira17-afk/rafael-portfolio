import Link from "next/link";

export const metadata = { title: "Page not found — Rafael Guimarães" };

export default function NotFound() {
  return (
    <main className="page-in" style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 38%, rgba(0,113,227,.16) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div aria-hidden className="aurora" style={{ opacity: 0.3, mixBlendMode: "screen" }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 560 }}>
        <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.5rem" }}>
          Error 404
        </p>
        <h1 style={{ fontSize: "clamp(3rem,11vw,7rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1, marginBottom: "1.5rem" }}>
          Lost the thread.
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          This page doesn&apos;t exist — but the work does. Let&apos;s get you back to something real.
        </p>
        <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-blue" style={{ fontSize: ".95rem", padding: ".85rem 2rem" }}>Back home</Link>
          <Link href="/work" className="btn-white-ghost" style={{ fontSize: ".95rem", padding: ".85rem 2rem" }}>See the work</Link>
        </div>
      </div>
    </main>
  );
}
