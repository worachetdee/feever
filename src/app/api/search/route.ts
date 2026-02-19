import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const tags = searchParams.get("tags") ?? "";

  // Build filter strings for Meilisearch
  const filters: string[] = [];
  if (category) {
    const cats = category.split(",").map((c) => c.trim()).filter(Boolean);
    if (cats.length === 1) {
      filters.push(`category = "${cats[0]}"`);
    } else if (cats.length > 1) {
      filters.push(
        `(${cats.map((c) => `category = "${c}"`).join(" OR ")})`,
      );
    }
  }
  if (tags) {
    const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
    for (const tag of tagList) {
      filters.push(`compatibility_tags = "${tag}"`);
    }
  }

  // Try Meilisearch first (dynamic import to avoid build-time errors)
  try {
    const { searchClient, PRODUCTS_INDEX } = await import(
      "@/lib/meilisearch/client"
    );
    const result = await searchClient.index(PRODUCTS_INDEX).search(q, {
      filter: filters.length > 0 ? filters.join(" AND ") : undefined,
      limit: 20,
    });

    return NextResponse.json({
      hits: result.hits,
      query: result.query,
      totalHits: result.estimatedTotalHits ?? result.hits.length,
    });
  } catch {
    // Meilisearch not available, fall back to Supabase
  }

  // Supabase fallback
  try {
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select(
        `*, seller:profiles!products_seller_id_fkey (id, username, display_name, avatar_url)`,
      )
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(20);

    if (q) {
      query = query.ilike("title", `%${q}%`);
    }
    if (category) {
      const cats = category.split(",").map((c) => c.trim()).filter(Boolean);
      if (cats.length === 1) {
        query = query.eq("category", cats[0]);
      } else if (cats.length > 1) {
        query = query.in("category", cats);
      }
    }
    if (tags) {
      const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
      query = query.contains("compatibility_tags", tagList);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({
      hits: data ?? [],
      query: q,
      totalHits: data?.length ?? 0,
    });
  } catch {
    return NextResponse.json({ hits: [], query: q, totalHits: 0 });
  }
}
