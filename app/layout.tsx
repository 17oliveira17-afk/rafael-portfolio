import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";

export const metadata: Metadata = {
  title: "Rafael Guimarães — Product Design Lead",
  description: "Product Design Lead. Fintech & B2B. Turning complex systems into experiences that drive conversion, activation, and retention.",
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
