import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SAMPLE_COMPONENTS } from "@/lib/catalog-components";
import ComponentDetailView from "@/views/ComponentDetailView";

export const dynamicParams = true;

export function generateStaticParams() {
  return SAMPLE_COMPONENTS.slice(0, 40).map((comp) => ({
    slug: comp.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = SAMPLE_COMPONENTS.find((c) => c.slug === slug);
  if (!component) {
    return { title: "Component Not Found — Liber UI" };
  }
  return {
    title: `${component.name} — Prévisualisation Live & Code (${component.author}) | Liber UI`,
    description: `${component.description} — Créé par ${component.author}. Prévisualisation interactive Tailwind CSS, code HTML exact et composant React TSX.`,
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = SAMPLE_COMPONENTS.find((c) => c.slug === slug);

  if (!component) {
    notFound();
  }

  const relatedComponents = SAMPLE_COMPONENTS.filter(
    (c) =>
      c.slug !== component.slug &&
      (c.tags.some((t) => component.tags.includes(t)) ||
        c.category === component.category)
  ).slice(0, 6);

  return (
    <ComponentDetailView
      component={component}
      relatedComponents={relatedComponents}
    />
  );
}

