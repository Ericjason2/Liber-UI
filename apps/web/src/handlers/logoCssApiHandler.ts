import { type NextRequest, NextResponse } from "next/server";
import { OFFICIAL_LOGOS, type LogoItem } from "../lib/catalog-logos";

function buildLogoCssRules(logo: LogoItem, origin: string): string {
  const colorUrl = `${origin}/svg/${logo.slug}/color.svg`;
  const monoUrl = `${origin}/svg/${logo.slug}/mono.svg`;

  return `/* ${logo.name} (${logo.slug}) */
.logo-${logo.slug} {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-image: url('${colorUrl}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  vertical-align: middle;
}
.logo-${logo.slug}-mono {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: currentColor;
  -webkit-mask-image: url('${monoUrl}');
  mask-image: url('${monoUrl}');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
  vertical-align: middle;
}`;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug: rawParam } = await context.params;
  const cleanSlug = rawParam
    .replace(/\.css$/i, "")
    .replace(/^logo-/, "")
    .trim()
    .toLowerCase();

  const urlObj = new URL(req.url);
  const origin = `${urlObj.protocol}//${urlObj.host}`;

  if (cleanSlug === "all" || cleanSlug === "logos") {
    const allRules = OFFICIAL_LOGOS.map((l) => buildLogoCssRules(l, origin)).join("\n\n");
    const css = `/* Liber UI Logos CDN Stylesheet — All ${OFFICIAL_LOGOS.length} Logos */\n${allRules}\n`;
    return new NextResponse(css, {
      status: 200,
      headers: {
        "Content-Type": "text/css; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  }

  const logo = OFFICIAL_LOGOS.find((l) => l.slug.toLowerCase() === cleanSlug);
  if (!logo) {
    return new NextResponse(`/* Logo "${cleanSlug}" not found in Liber UI */`, {
      status: 404,
      headers: {
        "Content-Type": "text/css; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const css = `/* Liber UI Logo CDN Stylesheet — ${logo.name} */\n${buildLogoCssRules(logo, origin)}\n`;
  return new NextResponse(css, {
    status: 200,
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

