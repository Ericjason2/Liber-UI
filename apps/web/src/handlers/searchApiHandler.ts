import { type NextRequest, NextResponse } from "next/server";
import { searchCatalog } from "../lib/search";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const limitParam = Number(searchParams.get("limit") || "8");
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(1, limitParam), 25) : 8;

  const results = searchCatalog(q, limit);
  return NextResponse.json({ results });
}

