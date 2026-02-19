import { getPublishedProducts } from "@/lib/supabase/queries";
import { ExploreClient } from "./explore-client";

export const metadata = {
  title: "Explore Products | feever.co",
  description:
    "Browse production-ready AI products across all categories — starters, workflow kits, and extensions.",
};

export default async function ExplorePage() {
  const products = await getPublishedProducts({ limit: 20 });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Explore Products
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse production-ready AI products across all categories
        </p>
      </div>
      <ExploreClient initialProducts={products} />
    </div>
  );
}
