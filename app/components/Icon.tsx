import { CSSProperties } from "react";

/**
 * Minimal inline SVG icon set (stroke-based, currentColor).
 * Replaces emoji throughout the site for a cleaner, consistent look.
 */
type IconName = "folder" | "close" | "trophy" | "video" | "film" | "star" | "target" | "flask" | "zap" | "layers" | "compass" | "map" | "check" | "globe" | "flag";

const PATHS: Record<IconName, React.ReactNode> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2.4 5.6L8 16l2.4-5.6L16 8Z" />
    </>
  ),
  map: (
    <>
      <path d="m9 4 6 2 5.3-1.8a1 1 0 0 1 1.7 1V18a1 1 0 0 1-.7 1L15 21l-6-2-5.3 1.8A1 1 0 0 1 2 19.8V6a1 1 0 0 1 .7-1L9 4Z" />
      <path d="M9 4v15M15 6v15" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17M3.5 15h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h11l-1.6 3.4L16 11H5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v5.5L5.2 17a2 2 0 0 0 1.8 3h10a2 2 0 0 0 1.8-3L14 8.5V3" />
      <path d="M7.5 14h9" />
    </>
  ),
  zap: <path d="M13 2 4.5 13.5H11l-1 8.5L18.5 10.5H12l1-8.5Z" />,
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />,
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
    </>
  ),
  video: (
    <>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="m16 10 6-3v10l-6-3" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
    </>
  ),
  star: <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2Z" />,
};

export default function Icon({
  name,
  size = 18,
  style,
  fill = "none",
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  style?: CSSProperties;
  fill?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }}
    >
      {PATHS[name]}
    </svg>
  );
}
