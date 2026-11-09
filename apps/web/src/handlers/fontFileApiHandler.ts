import { type NextRequest, NextResponse } from "next/server";
import { inflateRawSync } from "node:zlib";
import { SAMPLE_FONTS } from "../lib/catalog-fonts";

export function extractFontFromZipBuffer(
  zipBuffer: Buffer
): { data: Buffer; ext: "ttf" | "otf" } | null {
  // Locate End of Central Directory (EOCD) signature: 0x06054b50
  let eocdOffset = -1;
  const minEocdOffset = Math.max(0, zipBuffer.length - 65557);
  for (let i = zipBuffer.length - 22; i >= minEocdOffset; i--) {
    if (zipBuffer.readUInt32LE(i) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }

  if (eocdOffset === -1) {
    return null;
  }

  const totalEntries = zipBuffer.readUInt16LE(eocdOffset + 10);
  const cdOffset = zipBuffer.readUInt32LE(eocdOffset + 16);

  interface ZipFontCandidate {
    fileName: string;
    compressionMethod: number;
    compressedSize: number;
    localHeaderOffset: number;
    ext: "ttf" | "otf";
    score: number;
  }

  const candidates: ZipFontCandidate[] = [];
  let pos = cdOffset;

  for (let idx = 0; idx < totalEntries; idx++) {
    if (pos + 46 > zipBuffer.length) break;
    const sig = zipBuffer.readUInt32LE(pos);
    if (sig !== 0x02014b50) break;

    const compressionMethod = zipBuffer.readUInt16LE(pos + 10);
    const compressedSize = zipBuffer.readUInt32LE(pos + 20);
    const nameLen = zipBuffer.readUInt16LE(pos + 28);
    const extraLen = zipBuffer.readUInt16LE(pos + 30);
    const commentLen = zipBuffer.readUInt16LE(pos + 32);
    const localHeaderOffset = zipBuffer.readUInt32LE(pos + 42);

    const fileName = zipBuffer
      .subarray(pos + 46, pos + 46 + nameLen)
      .toString("utf8");
    pos += 46 + nameLen + extraLen + commentLen;

    const lower = fileName.toLowerCase();
    if (lower.includes("__macosx") || lower.endsWith("/")) continue;

    if (lower.endsWith(".ttf") || lower.endsWith(".otf")) {
      const ext: "ttf" | "otf" = lower.endsWith(".otf") ? "otf" : "ttf";
      let score = ext === "ttf" ? 10 : 8;
      if (lower.includes("regular") || lower.includes("normal")) score += 5;
      if (lower.includes("italic") || lower.includes("bold")) score -= 2;

      candidates.push({
        fileName,
        compressionMethod,
        compressedSize,
        localHeaderOffset,
        ext,
        score,
      });
    }
  }

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort((a, b) => b.score - a.score);
  const chosen = candidates[0];
  if (!chosen) return null;

  const lh = chosen.localHeaderOffset;
  if (lh + 30 > zipBuffer.length || zipBuffer.readUInt32LE(lh) !== 0x04034b50) {
    return null;
  }

  const localNameLen = zipBuffer.readUInt16LE(lh + 26);
  const localExtraLen = zipBuffer.readUInt16LE(lh + 28);
  const dataStart = lh + 30 + localNameLen + localExtraLen;
  const dataEnd = dataStart + chosen.compressedSize;

  if (dataEnd > zipBuffer.length) {
    return null;
  }

  const compressedSlice = zipBuffer.subarray(dataStart, dataEnd);

  if (chosen.compressionMethod === 0) {
    return { data: compressedSlice, ext: chosen.ext };
  }
  if (chosen.compressionMethod === 8) {
    const inflated = inflateRawSync(compressedSlice);
    return { data: inflated, ext: chosen.ext };
  }

  return null;
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug: rawParam } = await context.params;
  const cleanSlug = rawParam
    .replace(/\.(ttf|otf|woff2|woff)$/i, "")
    .replace(/^font-/, "")
    .trim()
    .toLowerCase();

  const font = SAMPLE_FONTS.find((f) => f.slug.toLowerCase() === cleanSlug);
  if (!font) {
    return NextResponse.json(
      { error: `Font "${cleanSlug}" not found in Liber UI catalog.` },
      { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  if (!font.downloadUrl) {
    if (font.googleFontsFamily) {
      try {
        const cssRes = await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.googleFontsFamily)}`,
          {
            headers: {
              // Classic desktop User-Agent ensures Google Fonts returns a direct .ttf URL
              "User-Agent": "Mozilla/5.0 (Windows NT 6.1; rv:10.0) Gecko/20100101 Firefox/10.0",
            },
          }
        );
        if (cssRes.ok) {
          const cssText = await cssRes.text();
          const urlMatch = cssText.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
          if (urlMatch && urlMatch[1]) {
            const ttfRes = await fetch(urlMatch[1]);
            if (ttfRes.ok) {
              const ttfBuffer = await ttfRes.arrayBuffer();
              return new NextResponse(new Uint8Array(ttfBuffer), {
                status: 200,
                headers: {
                  "Content-Type": "font/ttf",
                  "Content-Disposition": `inline; filename="${font.slug}.ttf"`,
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET, OPTIONS",
                  "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
                },
              });
            }
          }
        }
      } catch {
        // Fall through to informative error
      }
    }

    return NextResponse.json(
      {
        error: `Font "${font.name}" uses Google Fonts stylesheet (/api/font-css/${font.slug}).`,
      },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  try {
    const response = await fetch(font.downloadUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Referer: "https://www.dafont.com/",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream archive unavailable (${response.status}).` },
        { status: 502, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const extracted = extractFontFromZipBuffer(Buffer.from(arrayBuffer));

    if (!extracted) {
      return NextResponse.json(
        { error: `No .ttf or .otf file found inside archive for "${font.name}".` },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const contentType = extracted.ext === "otf" ? "font/otf" : "font/ttf";

    return new NextResponse(new Uint8Array(extracted.data), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${font.slug}.${extracted.ext}"`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to stream font file: ${(err as Error).message}` },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
