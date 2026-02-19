"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  createProductSchema,
  updateProductSchema,
  type CreateProductInput,
  type UpdateProductInput,
} from "@/lib/validations/product";
import { slugify } from "@/lib/utils/slugify";

export async function createProduct(input: CreateProductInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const parsed = createProductSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;
  const baseSlug = slugify(data.title);

  // Ensure unique slug by appending random suffix
  const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 8)}`;

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      seller_id: user.id,
      title: data.title,
      slug,
      description_md: data.description_md,
      short_description: data.short_description || null,
      category: data.category,
      price: data.price,
      license_type: data.license_type,
      compatibility_tags: data.compatibility_tags,
      status: "draft",
    })
    .select("id, slug")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/seller/products");
  return { data: product };
}

export async function updateProduct(
  productId: string,
  input: UpdateProductInput,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const parsed = updateProductSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  // Verify ownership
  const { data: existing } = await supabase
    .from("products")
    .select("seller_id")
    .eq("id", productId)
    .single();

  if (!existing || existing.seller_id !== user.id) {
    return { error: "Product not found or not authorized" };
  }

  const { data: product, error } = await supabase
    .from("products")
    .update({
      ...parsed.data,
      short_description: parsed.data.short_description || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId)
    .select("id, slug")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/seller/products");
  revalidatePath(`/product/${product.slug}`);
  return { data: product };
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Verify ownership
  const { data: existing } = await supabase
    .from("products")
    .select("seller_id, status")
    .eq("id", productId)
    .single();

  if (!existing || existing.seller_id !== user.id) {
    return { error: "Product not found or not authorized" };
  }

  if (existing.status === "published") {
    return { error: "Cannot delete a published product. Archive it first." };
  }

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) return { error: error.message };

  revalidatePath("/seller/products");
  return { data: { success: true } };
}

export async function submitForReview(productId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data: existing } = await supabase
    .from("products")
    .select("seller_id, status, title, description_md, price")
    .eq("id", productId)
    .single();

  if (!existing || existing.seller_id !== user.id) {
    return { error: "Product not found or not authorized" };
  }

  if (existing.status !== "draft") {
    return { error: "Only draft products can be submitted for review" };
  }

  // Basic completeness check
  if (!existing.title || !existing.description_md || !existing.price) {
    return { error: "Product must have a title, description, and price" };
  }

  const { error } = await supabase
    .from("products")
    .update({ status: "in_review", updated_at: new Date().toISOString() })
    .eq("id", productId);

  if (error) return { error: error.message };

  revalidatePath("/seller/products");
  return { data: { success: true } };
}

export async function uploadProductFile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const productId = formData.get("productId") as string;
  const file = formData.get("file") as File;
  const isPreview = formData.get("isPreview") === "true";

  if (!productId || !file) {
    return { error: "Product ID and file are required" };
  }

  // Verify ownership
  const { data: existing } = await supabase
    .from("products")
    .select("seller_id")
    .eq("id", productId)
    .single();

  if (!existing || existing.seller_id !== user.id) {
    return { error: "Product not found or not authorized" };
  }

  const filePath = `products/${productId}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("product-files")
    .upload(filePath, file);

  if (uploadError) return { error: uploadError.message };

  const { data: fileRecord, error: dbError } = await supabase
    .from("product_files")
    .insert({
      product_id: productId,
      file_name: file.name,
      file_path: filePath,
      file_size: file.size,
      file_type: file.type,
      is_preview: isPreview,
    })
    .select()
    .single();

  if (dbError) return { error: dbError.message };

  return { data: fileRecord };
}

export async function deleteProductFile(fileId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Get file record with product ownership check
  const { data: file } = await supabase
    .from("product_files")
    .select("*, product:products!product_files_product_id_fkey(seller_id)")
    .eq("id", fileId)
    .single();

  if (
    !file ||
    (file.product as unknown as { seller_id: string })?.seller_id !== user.id
  ) {
    return { error: "File not found or not authorized" };
  }

  // Delete from storage
  await supabase.storage.from("product-files").remove([file.file_path]);

  // Delete record
  const { error } = await supabase
    .from("product_files")
    .delete()
    .eq("id", fileId);

  if (error) return { error: error.message };

  return { data: { success: true } };
}
