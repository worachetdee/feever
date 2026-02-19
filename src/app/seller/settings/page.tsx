import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/supabase/queries";
import { StripeConnectButton } from "@/components/seller/stripe-connect-button";
import { Separator } from "@/components/ui/separator";
import { SellerSettingsForm } from "./settings-form";

export default async function SellerSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const profile = await getUserProfile(user.id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Seller Settings</h1>
      <p className="mt-2 text-muted-foreground">
        Manage your seller profile and Stripe Connect account
      </p>

      {/* Stripe Connect section */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Stripe Connect</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect your Stripe account to receive payouts from product sales.
        </p>
        <div className="mt-4">
          <StripeConnectButton
            isConnected={profile?.stripe_connect_onboarded ?? false}
          />
        </div>
        {profile?.stripe_connect_id && !profile.stripe_connect_onboarded && (
          <p className="mt-2 text-sm text-muted-foreground">
            Your Stripe account is linked but onboarding is not yet complete.
            Click the button above to finish setup.
          </p>
        )}
      </div>

      <Separator className="my-8" />

      {/* Profile section */}
      <div>
        <h2 className="text-lg font-semibold">Seller Profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This information is shown on your product pages.
        </p>
        <div className="mt-6">
          <SellerSettingsForm
            displayName={profile?.display_name ?? ""}
            bio={profile?.bio ?? ""}
            website={profile?.website ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
