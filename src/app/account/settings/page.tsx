import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/queries";
import { SettingsForm } from "./settings-form";

export const metadata = {
  title: "Account Settings | feever.co",
};

export default async function UserSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getUserProfile(user.id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Account Settings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your profile and account preferences
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-bold text-foreground">Profile</h2>
        <SettingsForm
          initialData={{
            display_name: profile?.display_name ?? "",
            bio: profile?.bio ?? "",
            website: profile?.website ?? "",
          }}
        />
      </div>
    </div>
  );
}
