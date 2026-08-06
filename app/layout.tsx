import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";

const SITE = "https://rafael-portfolio-m275.vercel.app";
const TITLE = "Rafael Guimarães — AI-First Product Design Lead";
const DESCRIPTION =
  "AI-first Product Design Lead. Fintech & B2B. I turn complex systems into experiences that drive conversion, activation and retention — and ship production-grade products end-to-end with AI (Claude Code). Working globally.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["AI-First Product Design", "AI Product Designer", "Claude Code", "Generative AI Design", "Product Design Lead", "UX", "Design Systems", "Fintech", "Rafael Guimarães"],
  authors: [{ name: "Rafael Guimarães" }],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Rafael Guimarães",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rafael Guimarães — Product Design Lead" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        <ScrollProgress />
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
