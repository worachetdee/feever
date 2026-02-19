import { createClient } from "./server";
import type {
  Product,
  ProductWithSeller,
  ProductFile,
  PurchaseWithProduct,
  Profile,
} from "@/types";

const PRODUCT_WITH_SELLER =
  "*, seller:profiles!products_seller_id_fkey(id, username, display_name, avatar_url)";

const PURCHASE_WITH_PRODUCT =
  "*, product:products!purchases_product_id_fkey(*, seller:profiles!products_seller_id_fkey(id, username, display_name, avatar_url))";

export async function getPublishedProducts(options?: {
  category?: string;
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<ProductWithSeller[]> {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select(PRODUCT_WITH_SELLER)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (options?.category) {
    query = query.eq("category", options.category);
  }
  if (options?.search) {
    query = query.ilike("title", `%${options.search}%`);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  if (options?.offset) {
    query = query.range(
      options.offset,
      options.offset + (options?.limit ?? 20) - 1,
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("getPublishedProducts error:", error);
    return [];
  }
  return (data ?? []) as unknown as ProductWithSeller[];
}

export async function getFeaturedProducts(
  limit = 6,
): Promise<ProductWithSeller[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_WITH_SELLER)
    .eq("status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getFeaturedProducts error:", error);
    return [];
  }

  // If no featured products, fall back to newest published
  if (!data || data.length === 0) {
    const { data: newest, error: newestError } = await supabase
      .from("products")
      .select(PRODUCT_WITH_SELLER)
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (newestError) {
      console.error("getFeaturedProducts fallback error:", newestError);
      return [];
    }
    return (newest ?? []) as unknown as ProductWithSeller[];
  }

  return data as unknown as ProductWithSeller[];
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductWithSeller | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_WITH_SELLER)
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("getProductBySlug error:", error);
    return null;
  }
  return (data as unknown as ProductWithSeller) ?? null;
}

export async function getProductById(
  id: string,
): Promise<ProductWithSeller | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_WITH_SELLER)
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("getProductById error:", error);
    return null;
  }
  return (data as unknown as ProductWithSeller) ?? null;
}

export async function getUserProducts(
  userId: string,
): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getUserProducts error:", error);
    return [];
  }
  return (data ?? []) as Product[];
}

export async function getUserPurchases(
  userId: string,
): Promise<PurchaseWithProduct[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("purchases")
    .select(PURCHASE_WITH_PRODUCT)
    .eq("buyer_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getUserPurchases error:", error);
    return [];
  }
  return (data ?? []) as unknown as PurchaseWithProduct[];
}

export async function checkPurchase(
  userId: string,
  productId: string,
): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("purchases")
    .select("id")
    .eq("buyer_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) {
    console.error("checkPurchase error:", error);
    return false;
  }
  return !!data;
}

export async function getProductFiles(
  productId: string,
): Promise<ProductFile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_files")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getProductFiles error:", error);
    return [];
  }
  return (data ?? []) as ProductFile[];
}

export async function getSellerStats(userId: string) {
  const supabase = await createClient();

  // Get all products for this seller
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, status, purchase_count, view_count")
    .eq("seller_id", userId);

  if (productsError) {
    console.error("getSellerStats products error:", productsError);
    return {
      totalProducts: 0,
      publishedProducts: 0,
      totalViews: 0,
      totalSales: 0,
      totalRevenue: 0,
    };
  }

  const productList = products ?? [];
  const productIds = productList.map((p) => p.id);

  const totalProducts = productList.length;
  const publishedProducts = productList.filter(
    (p) => p.status === "published",
  ).length;
  const totalViews = productList.reduce(
    (sum, p) => sum + (p.view_count ?? 0),
    0,
  );
  const totalSales = productList.reduce(
    (sum, p) => sum + (p.purchase_count ?? 0),
    0,
  );

  // Get revenue from purchases of this seller's products
  let totalRevenue = 0;
  if (productIds.length > 0) {
    const { data: purchases } = await supabase
      .from("purchases")
      .select("seller_payout")
      .in("product_id", productIds);

    totalRevenue = (purchases ?? []).reduce(
      (sum, p) => sum + (p.seller_payout ?? 0),
      0,
    );
  }

  return {
    totalProducts,
    publishedProducts,
    totalViews,
    totalSales,
    totalRevenue,
  };
}

export async function getUserProfile(
  userId: string,
): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("getUserProfile error:", error);
    return null;
  }
  return (data as Profile) ?? null;
}
