import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SAMPLE_FONTS } from "@/lib/catalog-fonts";
import { FontDetailClient as FontDetailView } from "@/views/FontDetailView";

export const dynamicParams = true;

export function generateStaticParams() {
  return SAMPLE_FONTS.slice(0, 100).map((font) => ({
    slug: font.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const font = SAMPLE_FONTS.find((f) => f.slug === slug);
  if (!font) {
    return { title: "Font Not Found — Liber UI" };
  }
  return {
    title: `${font.name} Font Specimen, Charmap & @font-face — Liber UI`,
    description: `Preview ${font.name} typeface live, inspect its full character map and glyphs, download the .zip or install via @liber-ui/cli.`,
  };
}

export default async function FontDetailRoute({
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

  return <FontDetailView font={font} relatedFonts={relatedFonts} />;
}
