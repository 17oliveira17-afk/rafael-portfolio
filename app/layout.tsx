import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rafael Guimarães — Product Design Lead",
  description: "Product Design Lead specializing in Fintech & B2B. I turn complex systems into experiences that drive conversion, activation, and retention.",
  keywords: ["product design", "UX", "fintech", "B2B", "Rafael Guimarães"],
  openGraph: {
    title: "Rafael Guimarães — Product Design Lead",
    description: "Fintech & B2B Product Designer with 8+ years of experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
