import scrapedFontsData from "../data/scraped-fonts.json";
import { BASE_FONTS, TOTAL_FONTS_COUNT, type FontItem } from "./catalog-fonts-base";

export { BASE_FONTS, TOTAL_FONTS_COUNT, type FontItem };

const baseSlugs = new Set(BASE_FONTS.map((f) => f.slug));
const uniqueScrapedFonts = (scrapedFontsData as FontItem[]).filter(
  (f) => !baseSlugs.has(f.slug)
);

export const SAMPLE_FONTS: FontItem[] = [
  ...BASE_FONTS,
  ...uniqueScrapedFonts,
];

