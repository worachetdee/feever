import Link from "next/link";
import { Flame, Github, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="size-5 text-primary" />
            <span className="text-lg font-bold">feever.co</span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            The App Store for AI products.
            <br />
            Curated, testable, production-ready.
          </p>
          <div className="mt-2 flex gap-4">
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <Twitter className="size-5" />
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <Github className="size-5" />
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <MessageCircle className="size-5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Marketplace</h4>
            <Link href="/category/starters" className="text-sm text-muted-foreground transition-colors hover:text-primary">Starters</Link>
            <Link href="/category/workflow-kits" className="text-sm text-muted-foreground transition-colors hover:text-primary">Workflow Kits</Link>
            <Link href="/category/extensions" className="text-sm text-muted-foreground transition-colors hover:text-primary">Extensions</Link>
            <Link href="/explore" className="text-sm text-muted-foreground transition-colors hover:text-primary">New Arrivals</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">About</Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Manifesto</Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Careers</Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contact</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Licenses</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border/50 px-6 pt-8 md:flex-row">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} feever.co Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted px-3 py-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-primary" />
          Powered by feever Credits
        </div>
      </div>
    </footer>
  );
}
