import Link from "next/link";
import {
  ArrowRight,
  Code,
  FlaskConical,
  ShoppingCart,
  Rocket,
  Star,
  BadgeCheck,
  Terminal,
  Megaphone,
  Puzzle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center px-6 py-20 text-center md:py-32">
        <div className="absolute inset-0 -z-10 grid-bg" />

        {/* Announcement badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Marketplace v1.0 Launching Soon
        </div>

        <h1 className="text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
          Not prompts. <span className="heat-gradient-text">Systems.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-xl font-light text-muted-foreground md:text-2xl">
          The curated marketplace for production-ready AI products.
          <br />
          Stop guessing.{" "}
          <span className="font-medium text-foreground">Catch the fever.</span>
        </p>

        {/* CTAs */}
        <div className="mt-10 flex w-full flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/explore"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-semibold text-white shadow-[0_0_60px_-20px_hsl(4_90%_58%_/_0.5)] transition-all hover:bg-primary/90"
          >
            Browse Marketplace
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/seller/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-8 py-4 font-medium text-foreground transition-all hover:bg-secondary/80"
          >
            <Code className="size-4 text-muted-foreground" />
            Sell Your System
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-8 border-t border-border/50 pt-8 text-center md:grid-cols-4 md:gap-16">
          {[
            { value: "200+", label: "Verified Systems" },
            { value: "3", label: "Core Categories" },
            { value: "100%", label: "Production Ready" },
            { value: "0", label: "Hallucinations" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border/50 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: FlaskConical,
                title: "1. Test in Playground",
                description:
                  "Don't buy blindly. Paste your use case and see how the system performs in our live sandbox environment.",
              },
              {
                icon: ShoppingCart,
                title: "2. Buy & Fork",
                description:
                  "Purchase the system outright or fork it to customize. Get full source code, context files, and guides.",
              },
              {
                icon: Rocket,
                title: "3. Ship Production",
                description:
                  "Deploy immediately. Our products are systems, not prompts. Designed for VS Code, Cursor, and production.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="group flex cursor-default flex-col gap-3 rounded-xl p-6 transition-colors hover:bg-accent"
              >
                <div className="flex size-12 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:border-primary/50">
                  <step.icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Systems</h2>
            <p className="mt-2 text-muted-foreground">
              Hand-picked, verified, and ready to deploy.
            </p>
          </div>
          <Link
            href="/explore"
            className="hidden items-center text-sm font-medium text-primary transition-colors hover:text-primary/80 md:flex"
          >
            View all products
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Terminal,
              iconColor: "text-foreground",
              bgText: "NEXT",
              category: "AI-Ready Starter",
              categoryColor: "text-primary",
              hoverColor: "group-hover:text-primary",
              title: "SaaS Starter for Cursor",
              description:
                "Complete Next.js boilerplate with Supabase auth, Stripe, and pre-configured .cursorrules for vibe coding.",
              tags: ["Cursor", "Next.js 15", "Claude 3.5"],
              price: "$49",
              seller: "DevFlow",
              sellerGradient: "from-purple-500 to-blue-500",
              rating: 5,
            },
            {
              icon: Megaphone,
              iconColor: "text-amber-500",
              bgText: "GROW",
              category: "Workflow Kit",
              categoryColor: "text-amber-500",
              hoverColor: "group-hover:text-amber-400",
              title: "Cold Outreach Architect",
              description:
                "Multi-step prompt chain system. Analyzes LinkedIn profiles, generates personalized hooks, and drafts 3-step sequences.",
              tags: ["GPT-4o", "Claude", "Copywriting"],
              price: "$29",
              seller: "GrowthLabs",
              sellerGradient: "from-green-400 to-cyan-500",
              rating: 4,
            },
            {
              icon: Puzzle,
              iconColor: "text-purple-400",
              bgText: "MCP",
              category: "AI Extension",
              categoryColor: "text-purple-400",
              hoverColor: "group-hover:text-purple-400",
              title: "Postgres MCP Server",
              description:
                "Plug-and-play Model Context Protocol server for secure database querying. Give Claude direct read access to your DB.",
              tags: ["MCP", "PostgreSQL", "Claude Desktop"],
              price: "$39",
              seller: "feever Labs",
              sellerGradient: "from-orange-400 to-red-500",
              rating: 5,
            },
          ].map((product) => (
            <div
              key={product.title}
              className="product-card heat-border-gradient group overflow-hidden rounded-xl bg-card"
            >
              {/* Card image area */}
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-background p-6">
                <div className="pointer-events-none absolute right-4 top-2 select-none text-6xl font-black text-foreground/5">
                  {product.bgText}
                </div>
                <product.icon
                  className={`size-16 ${product.iconColor} transition-transform duration-300 group-hover:scale-110`}
                />
                <div className="absolute left-4 top-4 flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary/80 ring-1 ring-primary/20">
                  <BadgeCheck className="size-3" />
                  Verified
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between">
                  <div className={`text-xs font-semibold uppercase tracking-wide ${product.categoryColor}`}>
                    {product.category}
                  </div>
                  <div className="font-bold text-foreground">{product.price}</div>
                </div>
                <h3
                  className={`mb-2 text-lg font-bold text-foreground transition-colors ${product.hoverColor}`}
                >
                  {product.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-muted px-2 py-1 text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-6 rounded-full bg-gradient-to-tr ${product.sellerGradient}`}
                    />
                    <span className="text-xs text-muted-foreground">
                      by{" "}
                      <span className="cursor-pointer text-foreground hover:underline">
                        {product.seller}
                      </span>
                    </span>
                  </div>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3.5 ${i < product.rating ? "fill-current" : "text-muted-foreground/30 fill-current"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/explore"
            className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View all products
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </div>
      </section>

      {/* CTA / Waitlist */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-muted/50 to-transparent p-12">
          <div className="absolute left-1/2 top-0 h-1 w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to upgrade your workflow?
          </h2>
          <p className="mx-auto mb-8 mt-6 max-w-xl text-muted-foreground">
            Join thousands of developers and creators building with verified AI
            systems. Stop prompting from scratch.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="enter@email.com"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none sm:w-80"
            />
            <button className="whitespace-nowrap rounded-lg bg-foreground px-8 py-3 font-bold text-background transition-colors hover:bg-foreground/90">
              Join Waitlist
            </button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No spam. Only high-quality systems.
          </p>
        </div>
      </section>
    </div>
  );
}
