import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getProductById, getProductFiles } from "@/lib/supabase/queries";
import { ProductForm } from "@/components/seller/product-form";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const product = await getProductById(id);

  if (!product || product.seller_id !== user.id) {
    notFound();
  }

  const files = await getProductFiles(id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
      <p className="mt-2 text-muted-foreground">
        Update your product listing
      </p>
      <div className="mt-8">
        <ProductForm mode="edit" product={product} files={files} />
      </div>
    </div>
  );
}
