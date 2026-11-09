import { SAMPLE_FONTS } from "@/lib/catalog-fonts";
import { notFound } from "next/navigation";
import { FontDetailClient } from "./client";

export const dynamicParams = true;

export function generateStaticParams() {
  // Pre-render the top fonts for instant SSG load; others are rendered dynamically on demand
  return SAMPLE_FONTS.slice(0, 100).map((font) => ({
    slug: font.slug,
  }));
}

export default async function FontDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const font = SAMPLE_FONTS.find((f) => f.slug === slug);

  if (!font) {
    notFound();
  }

  const relatedFonts = SAMPLE_FONTS.filter(
    (f) =>
      f.slug !== font.slug &&
      (f.theme === font.theme ||
        (f.subtheme && f.subtheme === font.subtheme) ||
        f.category === font.category)
  ).slice(0, 6);

  return <FontDetailClient font={font} relatedFonts={relatedFonts} />;
}
