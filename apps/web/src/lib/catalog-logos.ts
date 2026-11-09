import catalogData from "../../../../packages/core/index.json";

export interface LogoItem {
  slug: string;
  kind: "logo";
  name: string;
  description: string;
  aliases: string[];
  category: "languages" | "frontend" | "backend" | "devops" | "tools" | "africa";
  tags: string[];
  license: "trademark";
  author: string;
  website: string;
  brandGuidelinesUrl: string;
  source: { url: string; retrievedAt: string };
  variants: {
    color: { file: string; hex: string };
    mono?: { file: string };
    wordmark?: { file: string };
  };
}

export const OFFICIAL_LOGOS: LogoItem[] = (catalogData.items as unknown[]).filter(
  (item): item is LogoItem => {
    const candidate = item as Partial<LogoItem>;
    return candidate.kind === "logo" && candidate.variants !== undefined;
  }
);

