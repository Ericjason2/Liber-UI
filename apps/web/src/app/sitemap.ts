import type { MetadataRoute } from "next";
import { OFFICIAL_LOGOS } from "@/lib/catalog-logos";
import { SAMPLE_COMPONENTS } from "@/lib/catalog-components";
import { BASE_FONTS } from "@/lib/catalog-fonts-base";

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
    "/legal/mentions-legales",
    "/legal/terms",
    "/legal/cookies",
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

  const componentRoutes = SAMPLE_COMPONENTS.map((comp) => ({
    url: `${BASE_URL}/components/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const fontRoutes = BASE_FONTS.map((font) => ({
    url: `${BASE_URL}/fonts/${font.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...logoRoutes, ...componentRoutes, ...fontRoutes];
}
