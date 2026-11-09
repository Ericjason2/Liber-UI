import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OFFICIAL_LOGOS } from "@/lib/catalog-logos";
import { LogoDetailClient as LogoDetailView } from "@/views/LogoDetailView";

export function generateStaticParams() {
  return OFFICIAL_LOGOS.map((logo) => ({
    slug: logo.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const logo = OFFICIAL_LOGOS.find((l) => l.slug === slug);
  if (!logo) {
    return { title: "Logo Not Found — Liber UI" };
  }
  return {
    title: `${logo.name} SVG Logo & React Component — Liber UI`,
    description: `${logo.description} Download or install ${logo.name} vector logo in Color, Monochrome, and Wordmark variants.`,
  };
}

export default async function LogoDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const logo = OFFICIAL_LOGOS.find((l) => l.slug === slug);

  if (!logo) {
    notFound();
  }

  const relatedLogos = OFFICIAL_LOGOS.filter(
    (l) =>
      l.slug !== logo.slug &&
      (l.category === logo.category || l.tags.some((t) => logo.tags.includes(t)))
  ).slice(0, 6);

  return <LogoDetailView logo={logo} relatedLogos={relatedLogos} />;
}
