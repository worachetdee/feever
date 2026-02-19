import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-orange-500">f</span>eever
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link
              href="/explore"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Explore
            </Link>
            <Link
              href="/category/starters"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Starters
            </Link>
            <Link
              href="/category/workflow-kits"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Workflow Kits
            </Link>
            <Link
              href="/category/extensions"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Extensions
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
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
                className="bg-orange-500 hover:bg-orange-600"
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
