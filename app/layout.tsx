import type { Metadata } from "next";
import "./globals.css";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";

export const metadata: Metadata = {
  title: "Rafael Guimarães — Product Design Lead",
  description: "Product Design Lead specializing in Fintech & B2B. Turning complex systems into experiences that drive conversion, activation, and retention.",
  keywords: ["product design", "UX", "fintech", "B2B", "Rafael Guimarães", "design lead"],
  openGraph: {
    title: "Rafael Guimarães — Product Design Lead",
    description: "Fintech & B2B Product Designer. 8+ years of experience.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
