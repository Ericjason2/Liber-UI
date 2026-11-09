import type { MetadataRoute } from "next";
import { OFFICIAL_LOGOS } from "@/lib/catalog";

const BASE_URL = "https://liber-ui-delta.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/logos",
    "/animations",
    "/components",
    "/themes",
    "/fonts",
    "/docs",
    "/legal",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const logoRoutes = OFFICIAL_LOGOS.map((logo) => ({
    url: `${BASE_URL}/logos/${logo.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...logoRoutes];
}

