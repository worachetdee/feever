# CLAUDE.md — feever.co

> The curated marketplace for production-ready AI products. Not prompts. Systems.

## Project Overview

feever.co is an AI products marketplace where creators sell and buyers discover production-ready AI systems — workflow kits, AI-ready starters, MCP extensions, and complete launchables for the vibe coding era.

This is a Next.js 16 full-stack application with Supabase (auth + database + storage), Stripe Connect (marketplace payments), and Meilisearch (search). The UI is dark-themed with orange/amber heat-gradient accents using Tailwind CSS + shadcn/ui.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Server Components, Server Actions)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + shadcn/ui (dark theme default, orange/amber accent palette)
- **Database:** PostgreSQL via Supabase (use Supabase client SDK, not raw SQL in app code)
- **Auth:** Supabase Auth (GitHub OAuth primary, magic link secondary)
- **Payments:** Stripe Connect (marketplace mode — seller onboarding, split payments, subscriptions)
- **Search:** Meilisearch (product search with facets: category, compatibility, quality tier, price)
- **Storage:** Supabase Storage (product files, avatars, screenshots) + Cloudflare R2 (large files)
- **Email:** Resend (transactional emails, waitlist)
- **Analytics:** PostHog (product analytics, funnels, feature flags)
- **Deployment:** Vercel

## Project Structure

Files marked with `✓` exist. Files marked with `·` are planned but not yet created.

```
feever/
├── CLAUDE.md                    # ✓ This file — project context for Claude Code
├── .env.local                   # · Local environment variables (never commit)
├── .env.example                 # · Template for env vars
├── next.config.ts               # ✓
├── tailwind.config.ts           # ✓
├── tsconfig.json                # ✓
├── package.json                 # ✓
│
├── supabase/
│   ├── config.toml              # · Supabase project config
│   ├── migrations/              # ✓ SQL migrations (sequential, timestamped)
│   │   ├── 00001_create_users_profile.sql  # ✓
│   │   ├── 00002_create_products.sql       # ✓
│   │   ├── 00003_create_purchases.sql      # ✓
│   │   ├── 00004_create_reviews.sql        # ✓
│   │   ├── 00005_create_forks.sql          # ✓
│   │   ├── 00006_create_quality_checks.sql # ✓
│   │   └── 00007_create_credit_transactions.sql # ✓
│   └── seed.sql                 # · Seed data for development
│
├── src/
│   ├── proxy.ts                 # ✓ Auth proxy (Next.js 16 convention, replaces middleware.ts)
│   ├── app/
│   │   ├── layout.tsx           # ✓ Root layout (dark theme, Geist Sans, providers)
│   │   ├── page.tsx             # ✓ Homepage — featured products, categories, hero
│   │   ├── globals.css          # ✓ Tailwind imports + custom CSS variables
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx       # ✓
│   │   │   ├── signup/page.tsx      # ✓
│   │   │   └── callback/route.ts    # ✓ Supabase OAuth callback
│   │   │
│   │   ├── (marketplace)/
│   │   │   ├── explore/page.tsx         # ✓ Browse all products with search + filters
│   │   │   ├── category/
│   │   │   │   └── [slug]/page.tsx      # ✓ Category pages (starters, kits, extensions)
│   │   │   └── product/
│   │   │       └── [slug]/
│   │   │           ├── page.tsx         # ✓ Product detail page
│   │   │           └── playground/page.tsx  # · Live testing playground (v0.2)
│   │   │
│   │   ├── seller/                      # Note: plain route, not (seller)/ route group
│   │   │   ├── dashboard/page.tsx       # ✓ Seller dashboard — sales, analytics
│   │   │   ├── products/
│   │   │   │   ├── page.tsx             # ✓ Manage listings
│   │   │   │   ├── new/page.tsx         # ✓ Create new product
│   │   │   │   └── [id]/edit/page.tsx   # ✓ Edit product
│   │   │   └── settings/page.tsx        # ✓ Seller settings, Stripe Connect onboarding
│   │   │
│   │   ├── account/                     # Note: plain route, not (user)/ route group
│   │   │   ├── purchases/page.tsx       # ✓ My purchases + downloads
│   │   │   ├── credits/page.tsx         # ✓ Credit balance + purchase credits
│   │   │   └── settings/page.tsx        # ✓ Account settings
│   │   │
│   │   └── api/
│   │       ├── stripe/
│   │       │   ├── connect/route.ts     # ✓ Stripe Connect onboarding
│   │       │   ├── checkout/route.ts    # ✓ Create checkout session
│   │       │   └── webhook/route.ts     # ✓ Stripe webhook handler
│   │       ├── search/route.ts          # ✓ Meilisearch proxy
│   │       └── playground/route.ts      # · AI model proxy for playground (v0.2)
│   │
│   ├── components/
│   │   ├── ui/                  # ✓ shadcn/ui components (button, card, input, badge, etc.)
│   │   ├── layout/
│   │   │   ├── header.tsx       # ✓ Nav with search, user menu, credits display
│   │   │   ├── footer.tsx       # ✓
│   │   │   └── sidebar.tsx      # · Category navigation
│   │   ├── product/
│   │   │   ├── product-card.tsx         # · Card for grid/list views
│   │   │   ├── product-detail.tsx       # · Full product page content
│   │   │   ├── product-playground.tsx   # · Interactive testing component (v0.2)
│   │   │   ├── compatibility-badges.tsx # · AI tool compatibility tags
│   │   │   ├── quality-badge.tsx        # · Trust tier badge (verified/pick/gold)
│   │   │   ├── fork-tree.tsx            # · Visual fork ancestry (v0.2)
│   │   │   └── review-list.tsx          # · Reviews with verified purchase tags (v0.2)
│   │   ├── seller/
│   │   │   ├── product-form.tsx         # · Create/edit product form
│   │   │   ├── file-uploader.tsx        # · Product file upload with drag/drop
│   │   │   ├── analytics-chart.tsx      # · Sales/views charts
│   │   │   └── stripe-connect-button.tsx # ·
│   │   ├── search/
│   │   │   ├── search-bar.tsx           # · Global search with autocomplete
│   │   │   ├── search-filters.tsx       # · Faceted filters sidebar
│   │   │   └── search-results.tsx       # · Results grid with pagination
│   │   └── shared/
│   │       ├── hero.tsx                 # · Homepage hero with heat gradient
│   │       ├── category-grid.tsx        # · Category navigation cards
│   │       ├── credit-display.tsx       # · Credits balance indicator
│   │       └── loading-skeleton.tsx     # ·
│   │
│   ├── lib/
│   │   ├── utils.ts             # ✓ cn() utility (shadcn/ui)
│   │   ├── supabase/
│   │   │   ├── client.ts        # ✓ Browser Supabase client
│   │   │   ├── server.ts        # ✓ Server-side Supabase client (cookies-based)
│   │   │   ├── admin.ts         # ✓ Service role client for admin operations
│   │   │   └── middleware.ts    # ✓ Auth middleware helper (used by src/proxy.ts)
│   │   ├── stripe/
│   │   │   ├── client.ts        # ✓ Stripe SDK instance
│   │   │   ├── connect.ts       # · Connect account helpers
│   │   │   └── checkout.ts      # · Checkout session creation
│   │   ├── meilisearch/
│   │   │   ├── client.ts        # ✓ Meilisearch SDK instance
│   │   │   └── sync.ts          # · Sync products to search index
│   │   ├── ai/
│   │   │   ├── playground.ts    # · Multi-model testing (v0.2)
│   │   │   └── quality.ts       # · Automated quality scoring (v0.2)
│   │   └── utils/
│   │       ├── format.ts        # ✓ Price formatting, date helpers
│   │       ├── slugify.ts       # ✓ URL slug generation
│   │       └── constants.ts     # ✓ Categories, compatibility tags, quality tiers
│   │
│   ├── hooks/
│   │   ├── use-user.ts          # ✓ Current user hook
│   │   ├── use-credits.ts       # · Credit balance hook
│   │   └── use-search.ts        # ✓ Search with debounce
│   │
│   └── types/
│       ├── database.ts          # · Generated Supabase types (supabase gen types)
│       ├── product.ts           # ✓ Product-related types
│       ├── stripe.ts            # · Stripe-related types
│       └── index.ts             # ✓ Re-exports
│
├── scripts/
│   ├── seed-products.ts         # · Seed feever Labs products for development
│   └── sync-search.ts          # · One-off Meilisearch index sync
│
└── public/
    ├── logo.svg                 # ·
    ├── og-image.png             # · Social share image
    └── favicon.ico              # ✓
```

## Database Schema

The database uses Supabase (PostgreSQL). All tables use `id uuid DEFAULT gen_random_uuid() PRIMARY KEY` and include `created_at timestamptz DEFAULT now()` and `updated_at timestamptz DEFAULT now()`.

### Core Tables

**profiles** — extends Supabase auth.users
- `id uuid REFERENCES auth.users PRIMARY KEY`
- `username text UNIQUE NOT NULL`
- `display_name text`
- `avatar_url text`
- `bio text`
- `website text`
- `role text DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'both'))`
- `seller_tier text DEFAULT 'free' CHECK (seller_tier IN ('free', 'pro', 'team'))`
- `stripe_connect_id text`
- `stripe_connect_onboarded boolean DEFAULT false`
- `credit_balance integer DEFAULT 50` — new users get 50 free credits

**products**
- `id uuid PRIMARY KEY`
- `seller_id uuid REFERENCES profiles NOT NULL`
- `title text NOT NULL`
- `slug text UNIQUE NOT NULL`
- `description_md text NOT NULL` — markdown description
- `short_description text` — max 160 chars, for cards
- `category text NOT NULL CHECK (category IN ('starter', 'workflow_kit', 'extension', 'launchable', 'context_pack', 'blueprint'))`
- `price integer NOT NULL` — in cents (e.g., 2900 = $29.00)
- `currency text DEFAULT 'usd'`
- `license_type text DEFAULT 'personal' CHECK (license_type IN ('personal', 'commercial', 'team'))`
- `compatibility_tags text[] DEFAULT '{}'` — array: ['claude_4.5', 'cursor', 'gpt_4.5', ...]
- `version text DEFAULT '1.0.0'`
- `changelog jsonb DEFAULT '[]'`
- `forked_from uuid REFERENCES products`
- `fork_revenue_share_pct integer DEFAULT 10` — % of sales shared with parent
- `quality_tier text DEFAULT 'unverified' CHECK (quality_tier IN ('unverified', 'verified', 'pick', 'gold'))`
- `trust_score numeric DEFAULT 0`
- `avg_rating numeric DEFAULT 0`
- `review_count integer DEFAULT 0`
- `purchase_count integer DEFAULT 0`
- `view_count integer DEFAULT 0`
- `status text DEFAULT 'draft' CHECK (status IN ('draft', 'in_review', 'published', 'archived'))`
- `preview_config jsonb` — playground settings per category
- `last_tested_at timestamptz`
- `featured boolean DEFAULT false`

**product_files**
- `id uuid PRIMARY KEY`
- `product_id uuid REFERENCES products NOT NULL`
- `file_name text NOT NULL`
- `file_path text NOT NULL` — Supabase storage path
- `file_size integer`
- `file_type text`
- `is_preview boolean DEFAULT false` — if true, visible to non-buyers

**purchases**
- `id uuid PRIMARY KEY`
- `buyer_id uuid REFERENCES profiles NOT NULL`
- `product_id uuid REFERENCES products NOT NULL`
- `amount integer NOT NULL` — cents
- `platform_fee integer NOT NULL` — cents
- `seller_payout integer NOT NULL` — cents
- `fork_royalty integer DEFAULT 0` — cents, paid to parent product seller
- `stripe_payment_id text`
- `stripe_transfer_id text`
- `credits_used integer DEFAULT 0`
- `UNIQUE(buyer_id, product_id)` — one purchase per product per user

**reviews**
- `id uuid PRIMARY KEY`
- `buyer_id uuid REFERENCES profiles NOT NULL`
- `product_id uuid REFERENCES products NOT NULL`
- `rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5)`
- `text text`
- `works_confirmation boolean DEFAULT false` — quick "it worked for me" flag
- `verified_purchase boolean DEFAULT true`
- `UNIQUE(buyer_id, product_id)`

**credit_transactions**
- `id uuid PRIMARY KEY`
- `user_id uuid REFERENCES profiles NOT NULL`
- `amount integer NOT NULL` — positive = credit, negative = debit
- `type text NOT NULL CHECK (type IN ('welcome', 'purchase', 'playground_use', 'referral_bonus', 'refund'))`
- `related_product_id uuid REFERENCES products`
- `description text`

**quality_checks**
- `id uuid PRIMARY KEY`
- `product_id uuid REFERENCES products NOT NULL`
- `check_type text NOT NULL CHECK (check_type IN ('automated', 'peer_review', 'community'))`
- `passed boolean NOT NULL`
- `details jsonb`
- `checked_by uuid REFERENCES profiles` — null for automated

### Row Level Security (RLS)

Enable RLS on all tables. Key policies:
- **profiles:** Users can read all profiles. Users can update their own profile.
- **products:** Anyone can read published products. Sellers can CRUD their own products.
- **purchases:** Users can read their own purchases. System creates purchases via service role.
- **reviews:** Anyone can read reviews. Buyers can create reviews for products they purchased.
- **product_files:** Preview files readable by all. Non-preview files only by purchasers.
- **credit_transactions:** Users can read their own transactions.

## Design System

### Theme
Dark-first design. The brand is heat/fever — warm, energetic, premium.

```
Background:     hsl(0, 0%, 4%)       -- near-black (#0a0a0a)
Surface:        hsl(0, 0%, 7%)       -- dark card (#121212)
Surface Hover:  hsl(0, 0%, 10%)      -- hover state (#1a1a1a)
Border:         hsl(0, 0%, 15%)      -- subtle borders (#262626)
Text Primary:   hsl(0, 0%, 95%)      -- white-ish (#f2f2f2)
Text Secondary: hsl(0, 0%, 55%)      -- muted (#8c8c8c)
Accent:         hsl(25, 95%, 53%)    -- feever orange (#f97316)
Accent Hover:   hsl(25, 95%, 45%)    -- darker orange
Accent Glow:    hsl(25, 95%, 53% / 0.2) -- glow effect
Success:        hsl(142, 71%, 45%)   -- green
Warning:        hsl(48, 96%, 53%)    -- amber
Error:          hsl(0, 84%, 60%)     -- red
```

### Typography
- Font: Geist Sans (primary), Geist Mono (code)
- Headings: font-bold, tracking-tight
- Body: font-normal, leading-relaxed

### Components
Use shadcn/ui with the dark theme. Override accent color to feever orange. Key components:
- Card with subtle border glow on hover (orange/amber gradient)
- Badges for quality tiers (color-coded: unverified=gray, verified=blue, pick=orange, gold=amber)
- Compatibility badges (pill-shaped, monochrome icons)
- Heat-gradient backgrounds for hero sections and CTAs

## Key Conventions

### Code Style
- Use server components by default. Add `'use client'` only when needed (interactivity, hooks).
- Use Server Actions for mutations (form submissions, purchases). Never use API routes for things Server Actions can handle.
- API routes only for: Stripe webhooks, search proxy, playground AI proxy, external integrations.
- Use `async/await` everywhere. No `.then()` chains.
- Error handling: try/catch in server actions, return `{ error: string } | { data: T }` pattern.
- Use Zod for all input validation (form data, API inputs, webhook payloads).

### Routing
- Auth proxy lives at `src/proxy.ts` (Next.js 16 convention, replaces `middleware.ts`)
- Seller routes use `seller/` (plain route segment, not `(seller)/` route group) — URL: `/seller/...`
- Account routes use `account/` (plain route segment, not `(user)/` route group) — URL: `/account/...`
- Auth and marketplace still use route groups: `(auth)/`, `(marketplace)/`

### File Naming
- Components: `kebab-case.tsx` (e.g., `product-card.tsx`)
- Utilities: `kebab-case.ts` (e.g., `format.ts`)
- Types: `kebab-case.ts` in `types/` directory
- Pages: `page.tsx` inside route directories (Next.js App Router convention)

### Database Access
- Browser: Use `createBrowserClient()` from `@supabase/ssr`
- Server Components: Use `createServerClient()` with cookie adapter
- Server Actions / API Routes: Use `createServerClient()` with cookie adapter
- Admin operations (webhooks, background jobs): Use `createClient()` with service role key
- Never expose service role key to the browser.

### Payments Flow
1. Seller onboards via Stripe Connect (Express accounts)
2. Buyer clicks "Buy" → creates Stripe Checkout Session with `payment_intent_data.transfer_data` pointing to seller's connect account
3. Stripe webhook `checkout.session.completed` → create purchase record, transfer funds, deduct platform fee
4. For forked products: split transfer — seller gets (100% - platform_fee - fork_royalty), parent seller gets fork_royalty

### Search Integration
- Products are synced to Meilisearch on create/update/delete via a Supabase database webhook or in the server action.
- Search index includes: title, description, category, compatibility_tags, quality_tier, price, avg_rating
- Faceted search on: category, compatibility_tags, quality_tier, price range
- Search API is proxied through `/api/search` to keep Meilisearch API key server-side.

## v0.1 Scope (MVP — Build This First)

The minimum viable product to validate the marketplace:

### Must Have
1. **Auth** — GitHub OAuth login/signup via Supabase
2. **Browse** — Homepage with featured products + category pages
3. **Search** — Text search with category + compatibility filters
4. **Product Page** — Full detail view with description, compatibility badges, quality tier, reviews
5. **Buy Flow** — Stripe Checkout → purchase recorded → file download unlocked
6. **Seller Dashboard** — List product (title, description, category, price, files, compatibility) → submit for review
7. **My Purchases** — View purchased products, download files
8. **Seller Onboarding** — Stripe Connect Express setup

### Nice to Have (v0.2)
- Playground (multi-model testing)
- Fork/remix system
- Credit system
- Quality automated testing
- Review system (ratings + text)

### Deferred (v0.3+)
- Promoted listings
- Team/enterprise accounts
- feever MCP server
- Cursor plugin
- `create-feever-app` CLI

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Meilisearch
MEILISEARCH_HOST=
MEILISEARCH_ADMIN_KEY=
NEXT_PUBLIC_MEILISEARCH_HOST=
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY=

# AI Playground (v0.2)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_AI_API_KEY=

# Email
RESEND_API_KEY=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Commands

```bash
# Development
npm run dev                    # Start Next.js dev server
npx supabase start            # Start local Supabase (Docker)
npx supabase db push           # Apply migrations to local DB
npx supabase gen types typescript --local > src/types/database.ts  # Generate types

# Database
npx supabase migration new <name>   # Create new migration
npx supabase db reset               # Reset local DB + re-run migrations + seed

# Search
npx tsx scripts/sync-search.ts      # Sync products to Meilisearch

# Seed
npx tsx scripts/seed-products.ts    # Seed feever Labs products

# Build & Deploy
npm run build                  # Production build
npm run lint                   # ESLint
npm run typecheck              # TypeScript type checking
```

## Important Context

- **This is a marketplace.** Every feature decision should prioritize buyer trust and seller success. If buyers don't trust product quality, nothing else matters.
- **Dark theme is not optional.** The brand is built on the heat/fever aesthetic. All UI must look great on dark backgrounds.
- **Quality is the brand.** During v0.1, every product is manually reviewed. The curated store model comes before scale.
- **The three launch categories are:** AI-Ready Starters, AI Workflow Kits, AI Extensions. Do not build features for other categories yet.
- **Stripe Connect Express** is the payment model. Sellers connect their Stripe accounts. Platform takes a fee. This is non-negotiable for marketplace compliance.
- **Fork system is a v0.2 feature.** For v0.1, products are standalone. Don't over-engineer the data model for forks yet, but keep `forked_from` in the schema so it's ready.
- **The playground is a v0.2 feature.** For v0.1, product pages show static descriptions, screenshots, and file previews. Don't build the AI testing sandbox yet.
