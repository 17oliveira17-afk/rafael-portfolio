"use client";
import { useEffect } from "react";
export default function Cursor() {
  useEffect(() => {
    const el = document.getElementById("cur") as HTMLElement;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-cur]").forEach(n => {
      n.addEventListener("mouseenter", () => el.classList.add("expand"));
      n.addEventListener("mouseleave", () => el.classList.remove("expand"));
    });
    return () => document.removeEventListener("mousemove", move);
  }, []);
  return <div id="cur" className="cursor" />;
}
