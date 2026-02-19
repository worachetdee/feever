import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/5" />
        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Not prompts.{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Systems.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The curated marketplace for production-ready AI products — workflow
            kits, AI-ready starters, and MCP extensions for the vibe coding era.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/explore">Explore Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">Start Selling</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-2xl font-bold tracking-tight">Browse by Category</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "AI-Ready Starters",
              description: "Scaffolded codebases optimized for AI-assisted continuation",
              href: "/category/starters",
              price: "$29–$99",
            },
            {
              title: "AI Workflow Kits",
              description: "Multi-step prompt systems that produce repeatable results",
              href: "/category/workflow-kits",
              price: "$9–$49",
            },
            {
              title: "AI Extensions",
              description: "MCP servers, Claude Skills, and plug-and-play AI capabilities",
              href: "/category/extensions",
              price: "$19–$59",
            },
          ].map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-orange-500/50 hover:shadow-[0_0_30px_-5px] hover:shadow-orange-500/20"
            >
              <h3 className="text-lg font-semibold group-hover:text-orange-500">
                {category.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
              <p className="mt-4 text-sm font-medium text-orange-500">
                {category.price}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
