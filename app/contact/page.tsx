"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import ScrollReveal from "../components/ScrollReveal";
import RevealText from "../components/RevealText";

const EMAIL = "rafael_oliveira17@hotmail.com";

const links = [
  {
    label: "Email",
    value: "rafael_oliveira17@hotmail.com",
    href: "mailto:rafael_oliveira17@hotmail.com",
  },
  {
    label: "WhatsApp",
    value: "+55 11 99852-5386",
    href: "https://wa.me/5511998525386",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rafael-guimaraes-oliveira-br",
    href: "https://www.linkedin.com/in/rafael-guimaraes-oliveira-br/",
  },
  {
    label: "Dribbble",
    value: "dribbble.com/rafaguimaraes",
    href: "https://dribbble.com/rafaguimaraes",
  },
  {
    label: "Medium",
    value: "medium.com/@relieved-space-ferret-293",
    href: "https://medium.com/@relieved-space-ferret-293",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [sent, setSent] = useState(false);
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => setNow(new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: { [k: string]: string } = {};
    if (!form.name.trim()) e.name = "Your name, please.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "A valid email helps me reply.";
    if (form.message.trim().length < 10) e.message = "Tell me a bit more (10+ characters).";
    setErrors(e);
    if (Object.keys(e).length) return;
    const subject = encodeURIComponent(`Portfolio contact — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const fieldStyle = (k: string): React.CSSProperties => ({
    width: "100%", padding: ".9rem 1rem", borderRadius: 12, fontSize: ".95rem",
    background: "rgba(255,255,255,.04)", color: "#fff",
    border: `1px solid ${errors[k] ? "rgba(255,69,58,.6)" : "rgba(255,255,255,.12)"}`,
    outline: "none", transition: "border-color .2s ease", fontFamily: "inherit",
  });
  const labelStyle: React.CSSProperties = { display: "block", fontSize: ".7rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: ".6rem" };
  const errStyle: React.CSSProperties = { fontSize: ".75rem", color: "#ff6b60", marginTop: ".45rem" };

  return (
    <main className="page-in" style={{ background: "#000" }}>

      {/* ═══ HERO — centered, colorful ═══ */}
      <section style={{
        minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "8rem 2rem 6rem", position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>
        {/* multi-color glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: "60%", height: "60%", top: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(0,113,227,.2), transparent 60%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", width: "50%", height: "50%", bottom: "-5%", right: "-5%", background: "radial-gradient(circle, rgba(126,72,255,.15), transparent 60%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", width: "40%", height: "40%", top: "30%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(255,92,138,.1), transparent 60%)", filter: "blur(30px)" }} />
        </div>
        <div className="aurora" style={{ opacity: 0.3, mixBlendMode: "screen" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <ScrollReveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", padding: ".55rem 1.1rem", borderRadius: 100, background: "rgba(52,199,89,.08)", border: "1px solid rgba(52,199,89,.25)", marginBottom: "2.5rem" }}>
              <span className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#34c759", flexShrink: 0 }} />
              <span style={{ fontSize: ".82rem", color: "rgba(255,255,255,.7)" }}>
                Available for new work{now && <span style={{ color: "rgba(255,255,255,.4)" }}> · {now} in São Paulo</span>}
              </span>
            </div>
          </ScrollReveal>
          <RevealText
            as="h1"
            lines={["Let's build", "something great."]}
            stagger={90}
            style={{ fontSize: "clamp(3rem,8vw,7rem)", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1, color: "#fff", marginBottom: "2rem" }}
          />
          <ScrollReveal delay={100}>
            <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,.55)", maxWidth: 520, margin: "0 auto 3rem", lineHeight: 1.7 }}>
              Open to Product Design Lead roles in fintech and B2B. Currently pursuing opportunities in Canada.
            </p>
            <a href="#message" className="btn-blue" style={{ fontSize: "1rem", padding: "1rem 3rem" }}>
              Send a message →
            </a>
          </ScrollReveal>
        </div>

        {/* scroll hint */}
        <div style={{ position: "absolute", bottom: "2.5rem", left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem", opacity: 0.4 }}>
          <p style={{ fontSize: ".62rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#fff" }}>Scroll</p>
          <div style={{ width: 1, height: 28, background: "rgba(255,255,255,.4)" }} />
        </div>
      </section>

      {/* ═══ MESSAGE FORM ═══ */}
      <section id="message" style={{ background: "#000", padding: "5rem 6rem", borderBottom: "1px solid rgba(255,255,255,.08)" }} className="contact-form-section">
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="contact-grid">
          <ScrollReveal>
            <div>
              <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: "1.25rem" }}>Send a message</p>
              <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
                Tell me what<br />you&apos;re building.
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 380 }}>
                Roles, projects, or just to say hi — I read every message and reply within a couple of days.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            {sent ? (
              <div style={{ padding: "2.5rem", borderRadius: 20, background: "rgba(0,113,227,.06)", border: "1px solid rgba(0,113,227,.25)", textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(52,199,89,.15)", border: "1px solid rgba(52,199,89,.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: ".6rem" }}>Almost there.</h3>
                <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>
                  Your mail app should be opening with the message ready to send. If it didn&apos;t, email me directly at{" "}
                  <a href={`mailto:${EMAIL}`} style={{ color: "#4aa3ff", textDecoration: "none" }}>{EMAIL}</a>.
                </p>
                <button onClick={() => setSent(false)} style={{ marginTop: "1.5rem", background: "transparent", border: "none", color: "rgba(255,255,255,.45)", fontSize: ".82rem", cursor: "pointer", textDecoration: "underline" }}>Write another</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label htmlFor="cf-name" style={labelStyle}>Name</label>
                  <input id="cf-name" type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" style={fieldStyle("name")}
                    onFocus={(e) => !errors.name && (e.currentTarget.style.borderColor = "#0071e3")} onBlur={(e) => (e.currentTarget.style.borderColor = errors.name ? "rgba(255,69,58,.6)" : "rgba(255,255,255,.12)")} />
                  {errors.name && <p style={errStyle}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="cf-email" style={labelStyle}>Email</label>
                  <input id="cf-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" style={fieldStyle("email")}
                    onFocus={(e) => !errors.email && (e.currentTarget.style.borderColor = "#0071e3")} onBlur={(e) => (e.currentTarget.style.borderColor = errors.email ? "rgba(255,69,58,.6)" : "rgba(255,255,255,.12)")} />
                  {errors.email && <p style={errStyle}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="cf-message" style={labelStyle}>Message</label>
                  <textarea id="cf-message" rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="A line about the role or project…" style={{ ...fieldStyle("message"), resize: "vertical", minHeight: 120 }}
                    onFocus={(e) => !errors.message && (e.currentTarget.style.borderColor = "#0071e3")} onBlur={(e) => (e.currentTarget.style.borderColor = errors.message ? "rgba(255,69,58,.6)" : "rgba(255,255,255,.12)")} />
                  {errors.message && <p style={errStyle}>{errors.message}</p>}
                </div>
                <button type="submit" className="btn-blue" style={{ alignSelf: "flex-start", fontSize: ".95rem", padding: ".9rem 2.25rem" }}>Send message →</button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ LINKS ═══ */}
      <section style={{ background: "#000" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6rem" }}>
          {links.map((lk, i) => (
            <ScrollReveal key={i}>
              <a href={lk.href} target="_blank" rel="noopener noreferrer" className="contact-link" style={{ textDecoration: "none", display: "block" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "2.75rem 0", borderBottom: "1px solid rgba(255,255,255,.08)",
                }}>
                  <div>
                    <p style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0071e3", marginBottom: ".75rem" }}>{lk.label}</p>
                    <h2 className="contact-link-value" style={{ fontSize: "clamp(1rem,2vw,1.75rem)", fontWeight: 600, color: "#fff", letterSpacing: "-.02em" }}>{lk.value}</h2>
                  </div>
                  <span className="contact-link-arrow" style={{ color: "#0071e3", fontSize: "2rem", fontWeight: 300, flexShrink: 0 }}>↗</span>
                </div>
              </a>
            </ScrollReveal>
          ))}

          {/* Available card */}
          <ScrollReveal>
            <div style={{ padding: "4rem 0 6rem" }}>
              <div style={{ padding: "2.5rem", background: "rgba(255,255,255,.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem" }}>
                    <div className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#34c759" }} />
                    <p style={{ fontSize: ".72rem", fontWeight: 600, color: "#34c759", letterSpacing: ".1em", textTransform: "uppercase" }}>Available</p>
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: "1.1rem", color: "#fff" }}>Open to new opportunities</h3>
                </div>
                <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.45)", textAlign: "right" }}>Fintech · B2B · Canada</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.08)", padding: "2rem 6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)" }}>© {new Date().getFullYear()} Rafael Guimarães. All rights reserved.</p>
        <Link href="/" style={{ fontSize: ".72rem", color: "#0071e3", textDecoration: "none" }}>← Home</Link>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          section[style*="padding: 10rem 6rem"] { padding: 8rem 1.5rem 4rem !important; }
          div[style*="padding: 0 6rem"] { padding: 0 1.5rem !important; }
          footer[style*="padding: 2rem 6rem"] { padding: 2rem 1.5rem !important; }
        }
      `}</style>
    </main>
  );
}
