import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";
import { CATEGORIES } from "@/lib/utils/constants";
import { CompatibilityBadges } from "./compatibility-badges";
import { QualityBadge } from "./quality-badge";
import type { ProductWithSeller } from "@/types";

interface ProductCardProps {
  product: ProductWithSeller;
}

export function ProductCard({ product }: ProductCardProps) {
  const category = CATEGORIES[product.category];

  return (
    <Link href={`/product/${product.slug}`} className="block">
      <div className="product-card heat-border-gradient group overflow-hidden rounded-xl bg-card">
        {/* Card header */}
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-background p-6">
          <div className="pointer-events-none absolute right-4 top-2 select-none text-5xl font-black uppercase text-foreground/5">
            {product.category.replace("_", " ").split(" ")[0]}
          </div>
          {product.quality_tier !== "unverified" && (
            <div className="absolute left-4 top-4">
              <QualityBadge tier={product.quality_tier} />
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-5">
          <div className="mb-2 flex items-start justify-between">
            <div className="text-xs font-semibold uppercase tracking-wide text-primary">
              {category.label}
            </div>
            <div className="font-bold text-foreground">
              {formatPrice(product.price)}
            </div>
          </div>
          <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
            {product.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {product.short_description ?? product.description_md.slice(0, 120)}
          </p>
          {product.compatibility_tags.length > 0 && (
            <div className="mb-4">
              <CompatibilityBadges
                tags={product.compatibility_tags}
                max={3}
              />
            </div>
          )}
          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <div className="flex items-center gap-2">
              {product.seller.avatar_url ? (
                <img
                  src={product.seller.avatar_url}
                  alt={product.seller.display_name ?? product.seller.username}
                  className="size-6 rounded-full"
                />
              ) : (
                <div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-amber-500 text-[10px] font-bold text-white">
                  {(
                    product.seller.display_name ?? product.seller.username
                  )[0].toUpperCase()}
                </div>
              )}
              <span className="text-xs text-muted-foreground">
                by{" "}
                <span className="text-foreground">
                  {product.seller.display_name ?? product.seller.username}
                </span>
              </span>
            </div>
            {product.avg_rating > 0 && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="size-3.5 fill-current" />
                <span className="text-xs font-medium">
                  {product.avg_rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
