import { OFFICIAL_LOGOS } from "@/lib/catalog";
import { notFound } from "next/navigation";
import { LogoDetailClient } from "./client";

export function generateStaticParams() {
  return OFFICIAL_LOGOS.map((logo) => ({
    slug: logo.slug,
  }));
}

export default async function LogoDetailPage({
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
    (l) => l.slug !== logo.slug && (l.category === logo.category || l.tags.some((t) => logo.tags.includes(t))),
  ).slice(0, 6);

  return <LogoDetailClient logo={logo} relatedLogos={relatedLogos} />;
}
