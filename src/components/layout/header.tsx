import Link from "next/link";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { createClient } from "@/lib/supabase/server";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.user_name ??
    user?.email?.split("@")[0];
  const avatarUrl = user?.user_metadata?.avatar_url;
  const email = user?.email;
  const initials = (displayName ?? email ?? "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 glass-effect">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Flame className="size-5 text-primary" />
            <span>feever<span className="text-primary">.co</span></span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              href="/explore"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Marketplace
            </Link>
            <Link
              href="/category/starters"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Categories
            </Link>
            <Link
              href="/seller/products/new"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Sell
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <UserMenu
              user={{ email, displayName, avatarUrl, initials }}
            />
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
