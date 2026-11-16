import type { Metadata } from "next";
import { SAMPLE_COMPONENTS } from "@/lib/catalog-components";
import ComponentsView from "@/views/ComponentsView";

export const metadata: Metadata = {
  title: "UI Components — Liber UI",
  description:
    "1 525 composants UI open-source prêts à l'emploi avec prévisualisation interactive, installation CLI et téléchargement direct React TSX / Tailwind CSS.",
};

export default function ComponentsRoute() {
  const initialItems = SAMPLE_COMPONENTS.slice(0, 12);
  return <ComponentsView initialItems={initialItems} />;
}
