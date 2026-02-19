import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/client";
import { PLATFORM_FEE_PCT } from "@/lib/utils/constants";
import type { SellerTier } from "@/types";

const checkoutSchema = z.object({
  productId: z.string().uuid(),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 },
    );
  }

  const { productId } = parsed.data;

  // Fetch product with seller profile
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*, seller:profiles!products_seller_id_fkey(*)")
    .eq("id", productId)
    .eq("status", "published")
    .single();

  if (productError || !product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 },
    );
  }

  // Check if already purchased
  const { data: existingPurchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("buyer_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (existingPurchase) {
    return NextResponse.json(
      { error: "You already own this product" },
      { status: 400 },
    );
  }

  const seller = product.seller as { stripe_connect_id: string | null; seller_tier: SellerTier; stripe_connect_onboarded: boolean };

  if (!seller.stripe_connect_id || !seller.stripe_connect_onboarded) {
    return NextResponse.json(
      { error: "Seller has not completed Stripe setup" },
      { status: 400 },
    );
  }

  // Calculate fees
  const feePct = PLATFORM_FEE_PCT[seller.seller_tier] ?? PLATFORM_FEE_PCT.free;
  const platformFee = Math.round(product.price * (feePct / 100));

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email!,
      line_items: [
        {
          price_data: {
            currency: product.currency ?? "usd",
            product_data: {
              name: product.title,
              description:
                product.short_description ?? `AI product on feever.co`,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: seller.stripe_connect_id,
        },
        metadata: {
          product_id: productId,
          buyer_id: user.id,
          seller_id: product.seller_id,
          platform_fee: platformFee.toString(),
        },
      },
      metadata: {
        product_id: productId,
        buyer_id: user.id,
        seller_id: product.seller_id,
        platform_fee: platformFee.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/purchases?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/product/${product.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
