"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search/search-bar";
import { SearchFilters } from "@/components/search/search-filters";
import { ProductGrid } from "@/components/product/product-grid";
import type { ProductWithSeller } from "@/types";

interface ExploreClientProps {
  initialProducts: ProductWithSeller[];
}

export function ExploreClient({ initialProducts }: ExploreClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const fetchProducts = useCallback(
    async (filterCategories: string[], filterTags: string[]) => {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filterCategories.length > 0) {
          params.set("category", filterCategories.join(","));
        }
        if (filterTags.length > 0) {
          params.set("tags", filterTags.join(","));
        }

        const res = await fetch(`/api/search?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setProducts(data.hits ?? []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        // On error, keep current products
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleFilterChange = useCallback(
    (filters: { categories: string[]; tags: string[] }) => {
      setCategories(filters.categories);
      setTags(filters.tags);
      fetchProducts(filters.categories, filters.tags);
    },
    [fetchProducts],
  );

  const hasFilters = categories.length > 0 || tags.length > 0;

  return (
    <div>
      {/* Search bar */}
      <div className="mb-8 max-w-xl">
        <SearchBar />
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar - desktop */}
        <aside className="hidden w-56 shrink-0 md:block">
          <SearchFilters
            categories={categories}
            tags={tags}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Mobile filter toggle */}
        <div className="mb-4 md:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <Filter className="mr-2 size-4" />
            Filters
            {hasFilters && (
              <span className="ml-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {categories.length + tags.length}
              </span>
            )}
          </Button>
        </div>

        {/* Main content area */}
        <div className="min-w-0 flex-1">
          {/* Mobile filters panel */}
          {mobileFiltersOpen && (
            <div className="mb-6 rounded-xl border border-border bg-card p-4 md:hidden">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">Filters</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="h-auto p-1"
                >
                  <X className="size-4" />
                </Button>
              </div>
              <SearchFilters
                categories={categories}
                tags={tags}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          <ProductGrid
            products={products}
            emptyMessage={
              hasFilters
                ? "No products match your filters"
                : "No products found"
            }
          />
        </div>
      </div>
    </div>
  );
}
