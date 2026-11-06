import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "Preview";
  const ttf = searchParams.get("ttf");
  const size = searchParams.get("size") || "48";

  if (!ttf) {
    return new NextResponse("Missing 'ttf' parameter", { status: 400 });
  }

  // Exact Dafont preview generator URL with verified parameters
  const dafontUrl = `https://img.dafont.com/preview.php?text=${encodeURIComponent(
    text
  )}&ttf=${encodeURIComponent(ttf)}&ext=1&size=${size}&psize=m&y=50`;

  try {
    const res = await fetch(dafontUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://www.dafont.com/",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return new NextResponse("Failed to fetch preview from upstream", { status: res.status });
    }

    const buffer = await res.arrayBuffer();

    // Verify valid PNG header (89 50 4E 47)
    const header = new Uint8Array(buffer.slice(0, 4));
    if (header[0] !== 0x89 || header[1] !== 0x50 || header[2] !== 0x4e || header[3] !== 0x47) {
      return new NextResponse("Upstream did not return a valid PNG image", { status: 502 });
    }

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Font preview proxy error:", error);
    return new NextResponse("Internal server error fetching font preview", { status: 500 });
  }
}
