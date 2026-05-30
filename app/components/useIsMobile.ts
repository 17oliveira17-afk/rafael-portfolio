"use client";
import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 860) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const fn = () => setM(window.innerWidth <= breakpoint);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [breakpoint]);
  return m;
}
