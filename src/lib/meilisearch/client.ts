import { MeiliSearch } from "meilisearch";

const host = process.env.MEILISEARCH_HOST || "http://localhost:7700";

export const searchClient = new MeiliSearch({
  host,
  apiKey: process.env.MEILISEARCH_ADMIN_KEY,
});

export const PRODUCTS_INDEX = "products";
