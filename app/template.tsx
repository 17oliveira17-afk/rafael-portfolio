"use client";

/* Re-mounts on every route change, so each page cross-fades in.
   Opacity-only (no transform) to avoid breaking sticky/fixed sections. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
