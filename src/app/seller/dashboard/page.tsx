import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  getUserProfile,
  getUserProducts,
  getSellerStats,
} from "@/lib/supabase/queries";
import { formatPrice, formatDate, formatCompact } from "@/lib/utils/format";
import { CATEGORIES } from "@/lib/utils/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StripeConnectButton } from "@/components/seller/stripe-connect-button";
import {
  Package,
  DollarSign,
  ShoppingCart,
  Eye,
  ArrowRight,
  CreditCard,
} from "lucide-react";

export default async function SellerDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [profile, products, stats] = await Promise.all([
    getUserProfile(user.id),
    getUserProducts(user.id),
    getSellerStats(user.id),
  ]);

  const recentProducts = products.slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Manage your products and track sales
      </p>

      {/* Stats cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <ShoppingCart className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="text-2xl font-bold">{stats.totalSales}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">
                {formatPrice(stats.totalRevenue)}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Eye className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold">
                {formatCompact(stats.totalViews)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent products */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Products</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/seller/products">
                View all
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {recentProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
                <Package className="size-10 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">
                  No products yet
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/seller/products/new">Create your first product</Link>
                </Button>
              </div>
            ) : (
              recentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/seller/products/${product.id}/edit`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-sm font-medium">
                        {product.title}
                      </h3>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {CATEGORIES[product.category]?.label ??
                          product.category}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(product.created_at)}
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    {formatPrice(product.price)}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Stripe Connect CTA */}
        {!profile?.stripe_connect_onboarded && (
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-transparent" />
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Connect Stripe</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Set up your Stripe account to receive payouts when customers
                purchase your products.
              </p>
              <div className="mt-4">
                <StripeConnectButton isConnected={false} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
