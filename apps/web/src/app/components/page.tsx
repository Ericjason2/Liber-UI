import type { Metadata } from "next";
import { SAMPLE_COMPONENTS } from "@/lib/catalog-components";
import ComponentsView from "@/views/ComponentsView";

export const metadata: Metadata = {
  title: "UI Primitives & Components — Liber UI",
  description:
    "1525 accessible React & Tailwind CSS UI primitives with live interactive previews and copy-pasteable TypeScript source code.",
};

export default function ComponentsRoute() {
  const initialItems = SAMPLE_COMPONENTS.slice(0, 12);
  return <ComponentsView initialItems={initialItems} />;
}
