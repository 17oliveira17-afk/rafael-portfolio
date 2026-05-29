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
    const expand = () => el.classList.add("expand");
    const shrink = () => el.classList.remove("expand");
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-cur]").forEach(n => {
      n.addEventListener("mouseenter", expand);
      n.addEventListener("mouseleave", shrink);
    });
    return () => document.removeEventListener("mousemove", move);
  }, []);
  return <div id="cur" className="cursor" />;
}
