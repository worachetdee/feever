import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
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
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
