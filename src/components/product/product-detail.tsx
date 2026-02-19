import { Eye, ShoppingBag, Tag, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CompatibilityBadges } from "./compatibility-badges";
import { QualityBadge } from "./quality-badge";
import { formatPrice, formatCompact, formatDate } from "@/lib/utils/format";
import { CATEGORIES } from "@/lib/utils/constants";
import type { ProductWithSeller, ProductFile } from "@/types";

interface ProductDetailProps {
  product: ProductWithSeller;
  files: ProductFile[];
  hasPurchased: boolean;
  actions?: React.ReactNode;
}

export function ProductDetail({
  product,
  files,
  hasPurchased,
  actions,
}: ProductDetailProps) {
  const category = CATEGORIES[product.category];
  const previewFiles = files.filter((f) => f.is_preview);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Left column - main content */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
            {category.label}
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            {product.title}
          </h1>
          {product.short_description && (
            <p className="text-lg text-muted-foreground">
              {product.short_description}
            </p>
          )}
        </div>

        <Separator className="mb-8" />

        {/* Markdown description */}
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-8 prose-h2:text-xl prose-h3:mt-6 prose-h3:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-li:text-muted-foreground">
          <ReactMarkdown>{product.description_md}</ReactMarkdown>
        </div>

        {/* Version & changelog */}
        {product.version && (
          <div className="mt-8">
            <Separator className="mb-6" />
            <h2 className="mb-4 text-lg font-bold text-foreground">
              Version History
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary">v{product.version}</Badge>
              <span>Current version</span>
            </div>
            {product.changelog && product.changelog.length > 0 && (
              <ul className="mt-4 space-y-2">
                {product.changelog.map((entry, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground"
                  >
                    {Object.entries(entry).map(([version, note]) => (
                      <span key={version}>
                        <span className="font-medium text-foreground">
                          v{version}
                        </span>{" "}
                        &mdash; {note}
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Preview files */}
        {previewFiles.length > 0 && (
          <div className="mt-8">
            <Separator className="mb-6" />
            <h2 className="mb-4 text-lg font-bold text-foreground">
              Included Files
            </h2>
            <div className="space-y-2">
              {previewFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
                >
                  <Tag className="size-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {file.file_name}
                  </span>
                  {file.file_size && (
                    <span className="text-xs text-muted-foreground">
                      ({(file.file_size / 1024).toFixed(1)} KB)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right column - sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          {/* Price & buy */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 text-3xl font-bold text-foreground">
              {formatPrice(product.price)}
            </div>
            {actions}
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <ShoppingBag className="size-3.5" />
                {formatCompact(product.purchase_count)} sales
              </div>
              <div className="flex items-center gap-1">
                <Eye className="size-3.5" />
                {formatCompact(product.view_count)} views
              </div>
            </div>
          </div>

          {/* Seller info */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Seller
            </h3>
            <div className="flex items-center gap-3">
              {product.seller.avatar_url ? (
                <img
                  src={product.seller.avatar_url}
                  alt={
                    product.seller.display_name ?? product.seller.username
                  }
                  className="size-10 rounded-full"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-amber-500 text-sm font-bold text-white">
                  {(
                    product.seller.display_name ?? product.seller.username
                  )[0].toUpperCase()}
                </div>
              )}
              <div>
                <div className="font-medium text-foreground">
                  {product.seller.display_name ?? product.seller.username}
                </div>
                <div className="text-xs text-muted-foreground">
                  @{product.seller.username}
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Details
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Category</dt>
                <dd>
                  <Badge variant="secondary">{category.label}</Badge>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">License</dt>
                <dd className="capitalize text-foreground">
                  {product.license_type}
                </dd>
              </div>
              {product.quality_tier !== "unverified" && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Quality</dt>
                  <dd>
                    <QualityBadge tier={product.quality_tier} />
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Updated</dt>
                <dd className="text-foreground">
                  {formatDate(product.updated_at)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Compatibility */}
          {product.compatibility_tags.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Compatible With
              </h3>
              <CompatibilityBadges tags={product.compatibility_tags} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
