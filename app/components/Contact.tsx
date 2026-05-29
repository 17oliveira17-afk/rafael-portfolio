"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "8rem 3rem",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="orb"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(74,250,138,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
        <p className="label" style={{ marginBottom: "1.5rem" }}>Let&apos;s work together</p>
        <h2
          className="display-xl"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", marginBottom: "2rem" }}
        >
          Got a project<br />in mind<span style={{ color: "var(--accent)" }}>?</span>
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "3rem", fontWeight: 300 }}>
          I&apos;m open to Product Design Lead roles and senior design positions in fintech and B2B.
          Currently open to opportunities in Canada.
        </p>
        <a
          href="mailto:rafael@rafaelgdesign.com"
          style={{
            display: "inline-block",
            padding: "1.25rem 3.5rem",
            background: "var(--accent)",
            color: "#000",
            borderRadius: "100px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "0.02em",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = "scale(1.06)";
            (e.target as HTMLElement).style.boxShadow = "0 0 50px rgba(74,250,138,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = "scale(1)";
            (e.target as HTMLElement).style.boxShadow = "none";
          }}
        >
          Say Hello →
        </a>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "8rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "8rem auto 0",
          borderTop: "1px solid var(--border)",
          paddingTop: "2rem",
        }}
      >
        <span className="label" style={{ color: "var(--text-muted)" }}>
          © 2025 Rafael Guimarães
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/rafaelgdesign" },
            { label: "Email", href: "mailto:rafael@rafaelgdesign.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              className="label"
              style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
