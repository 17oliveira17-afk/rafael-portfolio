"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById("cursor-dot")  as HTMLElement | null;
    const ring = document.getElementById("cursor-ring") as HTMLElement | null;
    if (!dot || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      rx = lerp(rx, mx, 0.14);
      ry = lerp(ry, my, 0.14);
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = e.clientX + "px";
      dot.style.top  = e.clientY + "px";
    };

    const enter = () => { dot.classList.add("big"); ring.classList.add("big"); };
    const leave = () => { dot.classList.remove("big"); ring.classList.remove("big"); };

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-hover]").forEach(el => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"  className="cursor" />
      <div id="cursor-ring" className="cursor-ring" />
    </>
  );
}
