import { searchClient, PRODUCTS_INDEX } from "./client";
import type { Product } from "@/types";

export async function syncProductToSearch(product: Product) {
  try {
    await searchClient.index(PRODUCTS_INDEX).addDocuments([
      {
        id: product.id,
        title: product.title,
        slug: product.slug,
        description:
          product.short_description ?? product.description_md.slice(0, 300),
        category: product.category,
        compatibility_tags: product.compatibility_tags,
        quality_tier: product.quality_tier,
        price: product.price,
        avg_rating: product.avg_rating,
        purchase_count: product.purchase_count,
        seller_id: product.seller_id,
      },
    ]);
  } catch {
    /* Meilisearch may not be configured */
  }
}

export async function removeProductFromSearch(productId: string) {
  try {
    await searchClient.index(PRODUCTS_INDEX).deleteDocument(productId);
  } catch {
    /* Meilisearch may not be configured */
  }
}
