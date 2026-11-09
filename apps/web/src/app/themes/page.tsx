import type { Metadata } from "next";
import ThemesView from "@/views/ThemesView";

export const metadata: Metadata = {
  title: "Color Palettes & Themes — Liber UI",
  description:
    "761 curated Coolors-style color palettes and WCAG-compliant themes. Click any swatch to copy HEX codes, CSS variables, or Tailwind tokens.",
};

export default function ThemesRoute() {
  return <ThemesView />;
}
