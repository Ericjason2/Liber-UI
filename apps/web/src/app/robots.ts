import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/sign-in", "/sign-up", "/forgot-password", "/verify-email"],
    },
    sitemap: "https://liber-ui-delta.vercel.app/sitemap.xml",
  };
}
