import { type NextRequest, NextResponse } from "next/server";
import { SAMPLE_FONTS } from "../lib/catalog-fonts";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug: rawParam } = await context.params;
  const cleanSlug = rawParam
    .replace(/\.css$/i, "")
    .replace(/^font-/, "")
    .trim()
    .toLowerCase();

  const font = SAMPLE_FONTS.find((f) => f.slug.toLowerCase() === cleanSlug);
  if (!font) {
    return new NextResponse(`/* Font "${cleanSlug}" not found in Liber UI */`, {
      status: 404,
      headers: {
        "Content-Type": "text/css; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const urlObj = new URL(req.url);
  const origin = `${urlObj.protocol}//${urlObj.host}`;
  const fallbackStack =
    font.category === "mono"
      ? "monospace"
      : font.category === "serif"
        ? "serif"
        : "sans-serif";

  let css: string;

  if (font.googleFontsFamily && !font.downloadUrl) {
    const familyParam = encodeURIComponent(font.googleFontsFamily);
    const weightsParam =
      font.weights && font.weights.length > 0
        ? `:wght@${font.weights.join(";")}`
        : "";
    css = `/* Liber UI CDN Stylesheet — ${font.name} (${font.license}) */
@import url('https://fonts.googleapis.com/css2?family=${familyParam}${weightsParam}&display=swap');

:root {
  --font-${font.slug}: '${font.name}', ${fallbackStack};
}

.font-${font.slug} {
  font-family: '${font.name}', ${fallbackStack};
}
`;
  } else {
    const fontFileUrl = `${origin}/api/font-file/${font.slug}.ttf`;
    css = `/* Liber UI CDN Stylesheet — ${font.name} (${font.license}) */
@font-face {
  font-family: '${font.name}';
  src: local('${font.name}'),
       url('${fontFileUrl}') format('truetype');
  font-weight: ${font.weights?.[0] || 400};
  font-style: normal;
  font-display: swap;
}

:root {
  --font-${font.slug}: '${font.name}', ${fallbackStack};
}

.font-${font.slug} {
  font-family: '${font.name}', ${fallbackStack};
}
`;
  }

  return new NextResponse(css, {
    status: 200,
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

