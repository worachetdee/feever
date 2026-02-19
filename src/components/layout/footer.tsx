import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight">
              <span className="text-orange-500">f</span>eever
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              The curated marketplace for production-ready AI products.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Categories</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/starters" className="hover:text-foreground">AI-Ready Starters</Link></li>
              <li><Link href="/category/workflow-kits" className="hover:text-foreground">Workflow Kits</Link></li>
              <li><Link href="/category/extensions" className="hover:text-foreground">Extensions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Sellers</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
              <li><Link href="/products/new" className="hover:text-foreground">List a Product</Link></li>
              <li><Link href="/settings" className="hover:text-foreground">Settings</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">About</Link></li>
              <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
              <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} feever. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
