import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/seller/product-form";

export default async function NewProductPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Create New Product</h1>
      <p className="mt-2 text-muted-foreground">
        List a new AI product on feever
      </p>
      <div className="mt-8">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
