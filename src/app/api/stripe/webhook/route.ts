import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      if (!metadata?.product_id || !metadata?.buyer_id) {
        break;
      }

      const productId = metadata.product_id;
      const buyerId = metadata.buyer_id;
      const sellerId = metadata.seller_id;
      const platformFee = parseInt(metadata.platform_fee ?? "0", 10);
      const amount = session.amount_total ?? 0;
      const sellerPayout = amount - platformFee;

      // Insert purchase record
      const { error: purchaseError } = await supabase
        .from("purchases")
        .insert({
          buyer_id: buyerId,
          product_id: productId,
          amount,
          platform_fee: platformFee,
          seller_payout: sellerPayout,
          stripe_payment_id: session.payment_intent as string,
        });

      if (purchaseError && purchaseError.code !== "23505") {
        // 23505 = unique violation (duplicate purchase) — ignore
        console.error("Failed to create purchase:", purchaseError);
      }

      // Increment purchase_count on product
      const { data: product } = await supabase
        .from("products")
        .select("purchase_count")
        .eq("id", productId)
        .single();

      if (product) {
        await supabase
          .from("products")
          .update({
            purchase_count: (product.purchase_count ?? 0) + 1,
          })
          .eq("id", productId);
      }

      break;
    }

    case "account.updated": {
      const account = event.data.object as Stripe.Account;

      if (account.charges_enabled && account.details_submitted) {
        // Mark seller as fully onboarded
        await supabase
          .from("profiles")
          .update({ stripe_connect_onboarded: true })
          .eq("stripe_connect_id", account.id);
      }

      break;
    }
  }

  return NextResponse.json({ received: true });
}
