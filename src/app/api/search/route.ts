import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Proxy search requests to Meilisearch
  return NextResponse.json({ hits: [], query: "" });
}
