"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* On every route change: kill the browser's scroll restoration and jump to the
   top instantly (bypassing the global smooth-scroll), so each page starts at 0
   and its ScrollReveal animations replay from the top. */
export default function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    // Second reset on the next frame catches late layout shifts (images/fonts
    // finishing after the initial jump) that would otherwise nudge the page down.
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      root.style.scrollBehavior = prev;
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);
  return null;
}
