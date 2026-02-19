import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  getProductBySlug,
  checkPurchase,
  getProductFiles,
} from "@/lib/supabase/queries";
import { ProductDetail } from "@/components/product/product-detail";
import { BuyButton } from "@/components/product/buy-button";
import { DownloadButton } from "@/components/product/download-button";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return {};

  return {
    title: `${product.title} | feever.co`,
    description:
      product.short_description ??
      product.description_md.slice(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || product.status !== "published") {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const hasPurchased = user
    ? await checkPurchase(user.id, product.id)
    : false;

  const files = await getProductFiles(product.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <ProductDetail
        product={product}
        files={files}
        hasPurchased={hasPurchased}
        actions={
          <div className="space-y-3">
            <BuyButton
              productId={product.id}
              price={product.price}
              hasPurchased={hasPurchased}
            />
            {hasPurchased && files.length > 0 && (
              <DownloadButton
                productId={product.id}
                files={files.map((f) => ({
                  id: f.id,
                  file_name: f.file_name,
                  file_path: f.file_path,
                }))}
              />
            )}
          </div>
        }
      />
    </div>
  );
}
