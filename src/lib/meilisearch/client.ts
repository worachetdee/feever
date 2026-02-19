import { MeiliSearch } from "meilisearch";

export const searchClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST ?? "http://localhost:7700",
  apiKey: process.env.MEILISEARCH_ADMIN_KEY,
});

export const PRODUCTS_INDEX = "products";
