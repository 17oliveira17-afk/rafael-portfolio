import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://rafael-portfolio-m275.vercel.app/sitemap.xml",
  };
}
