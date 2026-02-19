import { Package } from "lucide-react";
import { ProductCard } from "./product-card";
import type { ProductWithSeller } from "@/types";

interface ProductGridProps {
  products: ProductWithSeller[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No products found",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <Package className="mb-4 size-12 text-muted-foreground/50" />
        <p className="text-lg font-medium text-muted-foreground">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
