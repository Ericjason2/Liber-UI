import type { Metadata } from "next";
import { SAMPLE_COMPONENTS } from "@/lib/catalog-components";
import ComponentsView from "@/views/ComponentsView";

export const metadata: Metadata = {
  title: "UI Components — Liber UI",
  description:
    "1,525 open-source UI components ready to use with interactive live preview, CLI installation, and direct React TSX / Tailwind CSS download.",
};

export default function ComponentsRoute() {
  const initialItems = SAMPLE_COMPONENTS.slice(0, 12);
  return <ComponentsView initialItems={initialItems} />;
}
