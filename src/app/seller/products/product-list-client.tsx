"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteProduct, submitForReview } from "@/app/seller/actions";
import { formatPrice, formatDate } from "@/lib/utils/format";
import { CATEGORIES } from "@/lib/utils/constants";
import {
  Plus,
  Pencil,
  Trash2,
  Send,
  Loader2,
  Package,
} from "lucide-react";
import type { Product, ProductStatus } from "@/types";

const STATUS_STYLES: Record<ProductStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  in_review: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  published: "bg-green-500/10 text-green-600 dark:text-green-400",
  archived: "bg-muted text-muted-foreground",
};

const STATUS_LABELS: Record<ProductStatus, string> = {
  draft: "Draft",
  in_review: "In Review",
  published: "Published",
  archived: "Archived",
};

interface ProductListClientProps {
  products: Product[];
}

export function ProductListClient({ products }: ProductListClientProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteProduct(deleteTarget.id);
      if (result.error) {
        alert(result.error);
      }
      setDeleteTarget(null);
      router.refresh();
    });
  }

  function handleSubmitForReview(productId: string) {
    startTransition(async () => {
      const result = await submitForReview(productId);
      if (result.error) {
        alert(result.error);
      }
      router.refresh();
    });
  }

  const filterProducts = (status?: ProductStatus) =>
    status ? products.filter((p) => p.status === status) : products;

  function renderProductRows(list: Product[]) {
    if (list.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <Package className="size-10 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">
            No products found
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {list.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-medium">{product.title}</h3>
                <Badge variant="outline" className="shrink-0 text-xs">
                  {CATEGORIES[product.category]?.label ?? product.category}
                </Badge>
                <Badge className={`shrink-0 text-xs ${STATUS_STYLES[product.status]}`}>
                  {STATUS_LABELS[product.status]}
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                <span>{formatPrice(product.price)}</span>
                <span>{formatDate(product.created_at)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {product.status === "draft" && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => handleSubmitForReview(product.id)}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Send />
                  )}
                  Submit
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link href={`/seller/products/${product.id}/edit`}>
                  <Pencil />
                  Edit
                </Link>
              </Button>
              {product.status !== "published" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteTarget(product)}
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Products</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your product listings
          </p>
        </div>
        <Button asChild>
          <Link href="/seller/products/new">
            <Plus />
            Create New Product
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="mt-8">
        <TabsList>
          <TabsTrigger value="all">All ({products.length})</TabsTrigger>
          <TabsTrigger value="draft">
            Draft ({filterProducts("draft").length})
          </TabsTrigger>
          <TabsTrigger value="in_review">
            In Review ({filterProducts("in_review").length})
          </TabsTrigger>
          <TabsTrigger value="published">
            Published ({filterProducts("published").length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {renderProductRows(products)}
        </TabsContent>
        <TabsContent value="draft" className="mt-6">
          {renderProductRows(filterProducts("draft"))}
        </TabsContent>
        <TabsContent value="in_review" className="mt-6">
          {renderProductRows(filterProducts("in_review"))}
        </TabsContent>
        <TabsContent value="published" className="mt-6">
          {renderProductRows(filterProducts("published"))}
        </TabsContent>
      </Tabs>

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deleteTarget?.title}
              &rdquo;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
