"use client";
import { useEffect, useRef, ElementType, CSSProperties, ReactNode, Fragment } from "react";

/* Apple-style headline reveal: words rise + fade in, staggered, when scrolled into view.
   Pass plain text (supports "\n" for line breaks). For rich/styled fragments, use `lines`. */
type Props = {
  text?: string;
  lines?: ReactNode[];          // each entry = one line; rises as a block (use for gradient words etc.)
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  stagger?: number;             // ms between words/lines
  once?: boolean;
};

export default function RevealText({
  text, lines, as: Tag = "h2", className = "", style = {}, stagger = 55, once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("visible");
        if (once) obs.unobserve(el);
      } else if (!once) {
        el.classList.remove("visible");
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  // Build the staggered children
  let i = 0;
  const content = lines
    ? lines.map((ln, li) => (
        <span key={li} style={{ display: "block", overflow: "hidden", paddingBottom: ".12em", marginBottom: "-.12em" }}>
          <span className="word-rise" style={{ display: "block", transitionDelay: `${li * stagger}ms` }}>{ln}</span>
        </span>
      ))
    : (text ?? "").split("\n").map((line, li) => (
        <span key={li} style={{ display: "block" }}>
          {line.split(" ").map((w, wi) => (
            <Fragment key={wi}>
              <span className="word-rise" style={{ display: "inline-block", transitionDelay: `${i++ * stagger}ms` }}>{w}</span>
              {wi < line.split(" ").length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ));

  return (
    <Tag ref={ref} className={className} style={style}>
      {content}
    </Tag>
  );
}
