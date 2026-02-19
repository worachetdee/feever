import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/supabase/queries";
import { ProductGrid } from "@/components/product/product-grid";
import { CATEGORIES } from "@/lib/utils/constants";
import type { Category } from "@/types";

const SLUG_TO_CATEGORY: Record<string, Category> = {
  starters: "starter",
  "workflow-kits": "workflow_kit",
  extensions: "extension",
};

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SLUG_TO_CATEGORY).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = SLUG_TO_CATEGORY[slug];
  if (!category) return {};

  const info = CATEGORIES[category];
  return {
    title: `${info.label} | feever.co`,
    description: info.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = SLUG_TO_CATEGORY[slug];

  if (!category) {
    notFound();
  }

  const info = CATEGORIES[category];
  const products = await getPublishedProducts({ category });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{info.label}</h1>
        <p className="mt-2 text-muted-foreground">{info.description}</p>
      </div>
      <ProductGrid
        products={products}
        emptyMessage={`No ${info.label.toLowerCase()} available yet`}
      />
    </div>
  );
}
