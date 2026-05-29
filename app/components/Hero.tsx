"use client";
import { useEffect, useRef } from "react";

const words = ["Fintech", "B2B", "Growth", "Mobile", "Systems"];

export default function Hero() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (!wordRef.current) return;
      wordRef.current.style.opacity = "0";
      wordRef.current.style.transform = "translateY(-20px)";
      setTimeout(() => {
        if (!wordRef.current) return;
        i = (i + 1) % words.length;
        wordRef.current.textContent = words[i];
        wordRef.current.style.opacity = "1";
        wordRef.current.style.transform = "translateY(0)";
      }, 300);
    }, 2200);

    // Parallax on mouse
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouse);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 3rem 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        className="orb"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(74,250,138,0.08) 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
        }}
      />
      <div
        className="orb"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(245,230,66,0.05) 0%, transparent 70%)",
          bottom: "100px",
          left: "-50px",
        }}
      />

      {/* Vertical text */}
      <div
        className="label"
        style={{
          position: "absolute",
          right: "3rem",
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "center",
          letterSpacing: "0.25em",
        }}
      >
        Product Design Lead
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, transparent, var(--accent))",
            animation: "scrollLine 2s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes scrollLine {
            0%, 100% { opacity: 0.3; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.3); }
          }
        `}</style>
      </div>

      <div ref={containerRef} style={{ transition: "transform 0.3s ease", maxWidth: "1200px" }}>
        <p
          className="label reveal"
          style={{ marginBottom: "1.5rem", animationDelay: "0.1s" }}
        >
          rafaelgdesign.com — 2025
        </p>

        <h1
          className="display-xl reveal"
          style={{ animationDelay: "0.2s", marginBottom: "0" }}
        >
          Designing for{" "}
          <span
            ref={wordRef}
            className="grad-text"
            style={{
              transition: "opacity 0.3s ease, transform 0.3s ease",
              display: "inline-block",
            }}
          >
            Fintech
          </span>
          <br />& B2B.
        </h1>

        <div
          className="reveal"
          style={{
            animationDelay: "0.5s",
            marginTop: "3rem",
            display: "flex",
            gap: "3rem",
            alignItems: "flex-end",
          }}
        >
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "var(--text-muted)",
              maxWidth: "380px",
              fontWeight: 300,
            }}
          >
            I turn complex systems into experiences that drive{" "}
            <em>conversion, activation, and retention.</em>
          </p>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a
              href="#work"
              style={{
                padding: "1rem 2.5rem",
                background: "var(--accent)",
                color: "#000",
                borderRadius: "100px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = "scale(1.05)";
                (e.target as HTMLElement).style.boxShadow = "0 0 30px rgba(74,250,138,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "scale(1)";
                (e.target as HTMLElement).style.boxShadow = "none";
              }}
            >
              View Work
            </a>
            <a
              href="https://www.linkedin.com/in/rafaelgdesign/"
              target="_blank"
              style={{
                padding: "1rem 2rem",
                border: "1px solid var(--border)",
                borderRadius: "100px",
                textDecoration: "none",
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = "var(--text-muted)";
                (e.target as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = "var(--border)";
                (e.target as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
