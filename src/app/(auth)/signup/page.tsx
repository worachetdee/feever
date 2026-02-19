import type { Metadata } from "next";
import { Flame } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Create Account",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 p-6">
        <div className="text-center">
          <Flame className="mx-auto mb-4 size-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join feever to discover and sell AI products
          </p>
        </div>
        <AuthForm mode="signup" next={next} />
      </div>
    </div>
  );
}
