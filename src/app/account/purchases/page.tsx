import { redirect } from "next/navigation";
import Link from "next/link";
import { Download, ExternalLink, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserPurchases } from "@/lib/supabase/queries";
import { formatPrice, formatDate } from "@/lib/utils/format";
import { CATEGORIES } from "@/lib/utils/constants";
import { DownloadButton } from "@/components/product/download-button";

export const metadata = {
  title: "My Purchases | feever.co",
};

export default async function PurchasesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const purchases = await getUserPurchases(user.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Purchases</h1>
        <p className="mt-2 text-muted-foreground">
          View your purchased products and download files
        </p>
      </div>

      {purchases.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <Package className="mb-4 size-12 text-muted-foreground/50" />
          <p className="text-lg font-medium text-muted-foreground">
            No purchases yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse the marketplace to find production-ready AI systems.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((purchase) => {
            const product = purchase.product;
            const category = CATEGORIES[product.category];

            return (
              <div
                key={purchase.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {category.label}
                  </div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="group inline-flex items-center gap-2"
                  >
                    <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {product.title}
                    </h3>
                    <ExternalLink className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>
                      by{" "}
                      <span className="text-foreground">
                        {product.seller.display_name ??
                          product.seller.username}
                      </span>
                    </span>
                    <span>{formatDate(purchase.created_at)}</span>
                    <span className="font-medium text-foreground">
                      {formatPrice(purchase.amount)}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 sm:w-44">
                  <PurchaseDownloadButton
                    productId={product.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

async function PurchaseDownloadButton({
  productId,
}: {
  productId: string;
}) {
  const supabase = await createClient();
  const { data: files } = await supabase
    .from("product_files")
    .select("id, file_name, file_path")
    .eq("product_id", productId)
    .order("created_at", { ascending: true });

  if (!files || files.length === 0) {
    return (
      <span className="text-xs text-muted-foreground">No files available</span>
    );
  }

  return (
    <DownloadButton
      productId={productId}
      files={files}
    />
  );
}
