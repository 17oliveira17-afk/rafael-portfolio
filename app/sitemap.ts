import type { MetadataRoute } from "next";

const BASE = "https://rafael-portfolio-m275.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/work",
    "/work/cvc",
    "/work/rappi",
    "/work/design-system",
    "/work/leadership",
    "/about",
    "/contact",
  ];
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : r.startsWith("/work") ? 0.8 : 0.6,
  }));
}
