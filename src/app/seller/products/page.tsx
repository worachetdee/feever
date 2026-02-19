import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProducts } from "@/lib/supabase/queries";
import { ProductListClient } from "./product-list-client";

export default async function SellerProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const products = await getUserProducts(user.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <ProductListClient products={products} />
    </div>
  );
}
