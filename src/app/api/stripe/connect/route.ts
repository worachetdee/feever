import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/client";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get or create profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_connect_id")
    .eq("id", user.id)
    .single();

  let connectId = profile?.stripe_connect_id;

  if (!connectId) {
    const account = await stripe.accounts.create({
      type: "express",
      email: user.email,
      metadata: { user_id: user.id },
    });
    connectId = account.id;

    await supabase
      .from("profiles")
      .update({ stripe_connect_id: connectId })
      .eq("id", user.id);
  }

  const accountLink = await stripe.accountLinks.create({
    account: connectId,
    refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/seller/settings`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/seller/settings`,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: accountLink.url });
}
