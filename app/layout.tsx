import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";

const SITE = "https://rafael-portfolio-m275.vercel.app";
const TITLE = "Rafael Guimarães — Product Design Lead";
const DESCRIPTION =
  "Product Design Lead. Fintech & B2B. Turning complex systems into experiences that drive conversion, activation, and retention.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["Product Design Lead", "UX", "Product Designer", "Design Systems", "Fintech", "Rafael Guimarães"],
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
        <ScrollProgress />
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
