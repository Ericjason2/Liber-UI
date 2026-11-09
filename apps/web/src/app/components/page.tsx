import type { Metadata } from "next";
import ComponentsView from "@/views/ComponentsView";

export const metadata: Metadata = {
  title: "UI Primitives & Components — Liber UI",
  description:
    "10 accessible React & Tailwind CSS UI primitives with live interactive previews and copy-pasteable TypeScript source code.",
};

export default function ComponentsRoute() {
  return <ComponentsView />;
}
