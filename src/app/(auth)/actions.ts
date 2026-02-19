"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const emailSchema = z.string().email("Please enter a valid email address");

export async function signInWithGitHub(formData: FormData) {
  const supabase = await createClient();
  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? headerStore.get("x-forwarded-proto") + "://" + headerStore.get("host");
  const next = formData.get("next") as string | null;

  const redirectTo = next
    ? `${origin}/callback?next=${encodeURIComponent(next)}`
    : `${origin}/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  });

  if (error || !data.url) {
    redirect("/login?error=auth");
  }

  redirect(data.url);
}

export async function signInWithMagicLink(formData: FormData) {
  const email = formData.get("email") as string;

  const result = emailSchema.safeParse(email);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const supabase = await createClient();
  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? headerStore.get("x-forwarded-proto") + "://" + headerStore.get("host");

  const { error } = await supabase.auth.signInWithOtp({
    email: result.data,
    options: {
      emailRedirectTo: `${origin}/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
