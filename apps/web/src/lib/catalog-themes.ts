import colorhuntThemesData from "../data/colorhunt-themes.json";
import { BASE_THEMES, TOTAL_THEMES_COUNT, type ThemeItem } from "./catalog-themes-base";

export { BASE_THEMES, TOTAL_THEMES_COUNT, type ThemeItem };

const baseThemeSlugs = new Set(BASE_THEMES.map((t) => t.slug));
const seenThemeSlugs = new Set<string>(baseThemeSlugs);
const uniqueColorHuntThemes: ThemeItem[] = [];
for (const t of colorhuntThemesData as ThemeItem[]) {
  if (!seenThemeSlugs.has(t.slug)) {
    seenThemeSlugs.add(t.slug);
    uniqueColorHuntThemes.push(t);
  }
}

export const SAMPLE_THEMES: ThemeItem[] = [
  ...BASE_THEMES,
  ...uniqueColorHuntThemes,
];

