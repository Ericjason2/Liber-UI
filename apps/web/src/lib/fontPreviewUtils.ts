export function extractFontTtf(font: { previewImg?: string; slug: string }): string {
  if (!font.previewImg) return font.slug;
  const match = font.previewImg.match(/\/([^/]+)\.png$/);
  return match && match[1] ? match[1] : font.slug;
}

export function getFontPreviewUrl(
  font: { previewImg?: string; slug: string },
  text?: string,
  size = 48
): string {
  const ttf = extractFontTtf(font);
  if (!text || text.trim() === "") {
    return font.previewImg || "";
  }
  return `/api/font-preview?text=${encodeURIComponent(text.trim())}&ttf=${encodeURIComponent(ttf)}&size=${size}`;
}

export function getFontCharmapUrl(font: { previewImg?: string }): string | null {
  if (!font.previewImg) return null;
  return font.previewImg.replace("/preview/", "/charmap/");
}
