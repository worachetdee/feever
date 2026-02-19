"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FileUploader } from "@/components/seller/file-uploader";
import { createProduct, updateProduct } from "@/app/seller/actions";
import {
  CATEGORIES,
  LAUNCH_CATEGORIES,
  COMPATIBILITY_TAGS,
} from "@/lib/utils/constants";
import { Loader2 } from "lucide-react";
import type { Product, ProductFile, Category, CompatibilityTag, LicenseType } from "@/types";

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
  files?: ProductFile[];
}

export function ProductForm({ mode, product, files }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [title, setTitle] = useState(product?.title ?? "");
  const [descriptionMd, setDescriptionMd] = useState(
    product?.description_md ?? "",
  );
  const [shortDescription, setShortDescription] = useState(
    product?.short_description ?? "",
  );
  const [category, setCategory] = useState<Category>(
    product?.category ?? "starter",
  );
  const [priceDollars, setPriceDollars] = useState(
    product ? (product.price / 100).toFixed(2) : "",
  );
  const [licenseType, setLicenseType] = useState<LicenseType>(
    product?.license_type ?? "personal",
  );
  const [compatibilityTags, setCompatibilityTags] = useState<
    CompatibilityTag[]
  >(product?.compatibility_tags ?? []);

  const [createdProductId, setCreatedProductId] = useState<string | null>(
    product?.id ?? null,
  );

  function toggleTag(tag: CompatibilityTag) {
    setCompatibilityTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const priceInCents = Math.round(parseFloat(priceDollars) * 100);

    if (isNaN(priceInCents) || priceInCents < 100) {
      setError("Minimum price is $1.00");
      return;
    }
    if (priceInCents > 99900) {
      setError("Maximum price is $999.00");
      return;
    }

    const input = {
      title,
      description_md: descriptionMd,
      short_description: shortDescription,
      category,
      price: priceInCents,
      license_type: licenseType,
      compatibility_tags: compatibilityTags,
    };

    startTransition(async () => {
      if (mode === "create") {
        const result = await createProduct(input);
        if (result.error) {
          setError(result.error);
        } else if (result.data) {
          setCreatedProductId(result.data.id);
          setSuccess("Product created! You can now upload files below.");
          router.push(`/seller/products/${result.data.id}/edit`);
        }
      } else if (product) {
        const result = await updateProduct(product.id, input);
        if (result.error) {
          setError(result.error);
        } else {
          setSuccess("Changes saved.");
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. SaaS Starter Kit for Cursor"
          required
          minLength={3}
          maxLength={100}
        />
      </div>

      {/* Short description */}
      <div className="space-y-2">
        <Label htmlFor="short_description">Short Description</Label>
        <Input
          id="short_description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="Brief summary for product cards (max 160 characters)"
          maxLength={160}
        />
        <p className="text-xs text-muted-foreground">
          {shortDescription.length}/160
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description_md">Description (Markdown)</Label>
        <Textarea
          id="description_md"
          value={descriptionMd}
          onChange={(e) => setDescriptionMd(e.target.value)}
          placeholder="Describe your product in detail. Markdown is supported."
          required
          minLength={20}
          rows={12}
          className="font-mono text-sm"
        />
      </div>

      <Separator />

      {/* Category & Price row */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={category}
            onValueChange={(v) => setCategory(v as Category)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LAUNCH_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {CATEGORIES[cat].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)</Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <Input
              id="price"
              type="number"
              min="1"
              max="999"
              step="0.01"
              value={priceDollars}
              onChange={(e) => setPriceDollars(e.target.value)}
              placeholder="29.00"
              required
              className="pl-7"
            />
          </div>
        </div>
      </div>

      {/* License type */}
      <div className="space-y-2">
        <Label>License Type</Label>
        <Select
          value={licenseType}
          onValueChange={(v) => setLicenseType(v as LicenseType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="team">Team</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Compatibility tags */}
      <div className="space-y-3">
        <Label>Compatibility</Label>
        <p className="text-sm text-muted-foreground">
          Select the AI tools and models your product works with.
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            Object.entries(COMPATIBILITY_TAGS) as [
              CompatibilityTag,
              { label: string },
            ][]
          ).map(([tag, { label }]) => {
            const active = compatibilityTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground/50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* File upload — only show in edit mode or after create */}
      {(mode === "edit" && product) || createdProductId ? (
        <div className="space-y-3">
          <Label>Product Files</Label>
          <p className="text-sm text-muted-foreground">
            Upload the files buyers will receive. Toggle the eye icon to make a
            file visible as a preview.
          </p>
          <FileUploader
            productId={(product?.id ?? createdProductId)!}
            files={files ?? []}
          />
        </div>
      ) : mode === "create" ? (
        <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Save the product first to upload files.
        </div>
      ) : null}

      {/* Error / Success */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
      )}

      {/* Submit */}
      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {mode === "create" ? "Create Product" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/seller/products")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
