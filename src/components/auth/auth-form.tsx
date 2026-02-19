"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithGitHub, signInWithMagicLink } from "@/app/(auth)/actions";

interface AuthFormProps {
  mode: "login" | "signup";
  next?: string;
}

export function AuthForm({ mode, next }: AuthFormProps) {
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleMagicLink(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await signInWithMagicLink(formData);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setMagicLinkSent(true);
    }
  }

  if (magicLinkSent) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="size-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Check your email</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We sent you a magic link. Click the link in your email to sign in.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMagicLinkSent(false)}
        >
          Try a different email
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form action={signInWithGitHub}>
        <input type="hidden" name="next" value={next ?? ""} />
        <Button type="submit" variant="outline" className="w-full">
          <Github className="size-4" />
          Continue with GitHub
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with email
          </span>
        </div>
      </div>

      <form action={handleMagicLink} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={loading}
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          Send magic link
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href={next ? `/signup?next=${encodeURIComponent(next)}` : "/signup"}
              className="text-primary hover:text-primary/80"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href={next ? `/login?next=${encodeURIComponent(next)}` : "/login"}
              className="text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
