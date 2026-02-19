# feever.co — Master Plan v2.0

**The curated marketplace for production-ready AI products. Not prompts. Systems.**
*Updated February 2026*

---

## 1. Vision & Positioning

**feever.co** is a curated marketplace where creators sell and buyers discover production-ready AI systems — workflow kits, AI-ready starters, extensions, and complete launchables designed for the vibe coding era.

The name "feever" captures the cultural energy of AI-native building: contagious, urgent, spreading fast. The `.co` domain signals commerce and community.

**Core thesis:** As AI tools become the primary interface for building software and creating content, the value shifts from raw prompts to *systems around AI* — the scaffolding, context, configurations, and multi-step workflows that make AI outputs 10x better. Simple prompts get commoditized as models improve. Systems get *more* valuable. feever.co sells systems.

**One-line pitch:** The App Store for AI products — curated, testable, production-ready.

> *Reference: Initial product brief, naming, and landing page — [Previous conversation](https://claude.ai/chat/60dfcd35-e928-4dd8-803d-b9fc666e6c6a)*

---

## 2. Product Categories

### Launch Categories (v1.0 — 3 categories)

**2.1 AI-Ready Starters**
Scaffolded codebases optimized for AI-assisted continuation. Includes cursor rules, Claude project instructions, copilot configs, and context files that make AI tools immediately productive on the codebase.

- Price range: $29–$99
- Examples: Next.js SaaS Starter, Chrome Extension Kit, CLI Tool Scaffold, API Boilerplate
- Why first: Highest AOV, strongest lock-in, clear value prop, developers will pay for quality

**2.2 AI Workflow Kits**
Multi-step, context-rich prompt systems that produce repeatable, professional-grade results. Not standalone prompts — packaged toolkits with prompt chains, context files, example outputs, and usage guides.

- Price range: $9–$49
- Examples: B2B Cold Outreach System, Content Marketing Pipeline, Code Review Framework, Investor Pitch Builder
- Why first: Broadest appeal, easiest to create, widens buyer pool beyond developers
- Minimum standard: No $1.99 standalone prompts. Every listing must be a system, not a string.

**2.3 AI Extensions**
Plug-and-play capabilities that add new superpowers to AI tools — MCP server configs, Claude Skills, custom GPT configurations, tool-use definitions, and agent behavior modules.

- Price range: $19–$59
- Examples: Database Query Extension, Browser Automation Agent, File Processing Toolkit, Deployment Pipeline
- Why first: Riding the MCP wave, cursor.directory proves demand at 250K+ monthly visitors, Cursor just launched its own plugin marketplace validating the category

### Quarter 2 Expansion

**2.4 Launchables**
Complete, deployed products you can customize and own. Full-stack apps, landing pages, dashboards, automation flows — sold as turnkey or customizable.

- Price range: $49–$149
- Requires: Sandbox deployment infrastructure, more complex quality testing

**2.5 Context Packs**
Domain-specific knowledge bundles that make AI an expert in your field — documentation sets, RAG-ready datasets, industry-specific reference files.

- Price range: $15–$39

### Quarter 3 Expansion

**2.6 Automation Blueprints**
Tested multi-step pipelines connecting multiple AI tools, APIs, and services. Zapier meets prompt engineering — shareable and sellable.

- Price range: $19–$69
- Requires: Integration testing infrastructure, multi-service sandbox

---

## 3. Marketplace Model: Hybrid Curated → Open

### Phase 1: Curated Store (Months 1–4)
- Every product manually reviewed before listing (by founder + founding creators)
- Max ~200 products. Quality over quantity.
- "Apply to sell" model — creators submit, founder approves
- Builds quality reputation and premium positioning
- Think early App Store: exclusive, high-bar, trusted

### Phase 2: Verified Open (Months 5–8)
- Open listings with mandatory automated testing gates
- Products start as "Unverified" → earn "Verified" after automated + community checks
- Curated "feever Picks" collection highlighted on homepage
- Reviewer guild (founding creators) cross-review new submissions

### Phase 3: Full Open Marketplace (Months 9+)
- Anyone can list with automated quality gates
- Quality tiers: Unverified → Verified → feever Pick → feever Gold (top 5%)
- Community moderation handles edge cases
- Creator response requirement: respond to quality reports within 48 hours or face delisting

---

## 4. Core Platform Features

### 4.1 Buy / Support / Fork
Every product supports three interaction modes:

- **Buy** — One-time purchase or subscription. Buyer gets the product with updates.
- **Support** — Tip jar or recurring support for creators of free products.
- **Fork** — Buyers fork a product, remix it, and optionally re-list. Original creator gets attribution + optional revenue share. Each fork adds value, grows the catalog, and creates compounding network effects.

Fork economics example:
- Creator A: Next.js + Supabase Starter ($49)
- Creator B forks, adds Stripe + deployment → "SaaS Starter" ($79)
- Creator C forks B, specializes for healthcare HIPAA → ($129)
- Creator A earns attribution + rev share on every derivative

### 4.2 Live Playground (Key Differentiator)
The playground is the product, not just a feature. Buyers test before they buy:

- **Workflow Kits** → Paste your own use case, see AI output with the kit vs. without
- **AI-Ready Starters** → Browse file tree, see README, run dev server in browser sandbox
- **AI Extensions** → Watch the extension handle tasks in a sandboxed environment
- **Cross-model testing** → See how products perform across Claude, GPT, Gemini

This solves the #1 marketplace trust problem and is what separates feever from "Gumroad for text files."

Playground is powered by feever Credits:
- New users get 50 free credits
- Credit packs: $5/100, $20/500
- Pro sellers' buyers get bonus credits

### 4.3 Cross-Platform Compatibility System
feever's structural moat — no platform builds this:

- Every product tagged with exact compatible AI tools + versions
- Compatibility badges: Claude / GPT / Gemini / Cursor / Windsurf / v0 / Bolt / Lovable / Replit
- Version-specific: "Optimized for Claude 4.5 Sonnet" / "Cursor 0.45+ required"
- Products supporting more platforms rank higher in search
- Playground tests against multiple models automatically

### 4.4 Tiered Trust & Quality System

**Layer 1 — Automated Baseline (every product):**
Structural validation, completeness check, plagiarism detection, freshness check

**Layer 2 — Category-specific automated tests:**

| Category | Automated Test |
|---|---|
| Workflow Kits | Run against 3 AI models, score output with evaluator LLM |
| AI Extensions | Verify server starts, tools register, basic function calls succeed |
| AI-Ready Starters | `npm install` + `npm run build` pass, `npm audit` clean |
| Launchables | Deploy to sandbox, verify app loads, accessibility check |
| Context Packs | Validate format, check for hallucinations, LLM relevance scoring |

**Layer 3 — Human curation:**
Founding creators cross-review → "feever Verified" badge

**Layer 4 — Community validation:**
Buyer reviews (verified purchase), "It worked for me" quick confirm, report/flag system

**Quality tiers:** Unverified → Verified → feever Pick → feever Gold

### 4.5 Version Control & Updates
Sellers push updates. Buyers receive notifications and pull new versions. Freshness scoring tracks when products were last tested against current AI model versions.

---

## 5. Business Model

### 5.1 Seller Tiers

| Tier | Price | Platform Fee | Features |
|---|---|---|---|
| **Free** | $0/mo | 20% | 5 listings, basic analytics |
| **Pro** | $19/mo | 12% | Unlimited listings, detailed analytics, priority support, custom storefront |
| **Team** | $49/mo | 8% | All Pro + team management, shared revenue, API access |

### 5.2 Five Revenue Layers

| Layer | What | Margin | Timeline |
|---|---|---|---|
| **1. Transactions** | 8–20% of each sale, target $25 AOV | Medium | Day 1 |
| **2. Seller Subscriptions** | Pro $19/mo, Team $49/mo | High | Day 1 |
| **3. feever Credits** | Playground testing currency, credit packs $5–$20 | High | Month 2 |
| **4. Promoted Listings** | Sponsored/featured placement, CPC or flat rate | Very High | Month 6 |
| **5. Enterprise / Teams** | Volume licensing, private marketplaces, SSO | Very High | Month 12 |

### 5.3 Revenue Projections (Bootstrapped)

| Metric | Month 6 | Month 12 | Month 24 |
|---|---|---|---|
| Monthly active buyers | 1,000 | 5,000 | 20,000 |
| Avg order value | $25 | $30 | $35 |
| GMV | $37,500 | $270,000 | $1,400,000 |
| **Total monthly revenue** | **$9,125** | **$65,500** | **$350,000** |
| **Annual run rate** | **$109K** | **$786K** | **$4.2M** |

---

## 6. Cold Start Strategy

### Strategy 1: Be Your Own First Seller
Create 25+ products under "feever Labs" brand across all 3 launch categories:
- 8 AI-Ready Starters (Next.js SaaS, Chrome Extension, CLI Tool, API, Landing Page, Dashboard, Mobile App, VS Code Extension)
- 8 AI Workflow Kits (cold outreach, content marketing, code review, product spec, investor pitch, hiring, customer support, SEO)
- 8 AI Extensions (database querying, browser automation, file processing, API testing, deployment, monitoring, email, scheduling)

Sets quality bar + ensures day-one inventory.

### Strategy 2: Single-Player Tool as Funnel
Build a free tool that's useful without the marketplace:

**feever Playground** (free, standalone)
- Paste any prompt/workflow → test across multiple AI models side by side
- Share results with a link
- No account required for basic usage
- Creates awareness + drives signups → funnels into marketplace

**feever Starter CLI** (free, npm)
- `npx create-feever-app` scaffolds AI-ready project with cursor rules, Claude config, context files
- Starters come from the marketplace catalog
- Drives developer awareness through npm downloads

### Strategy 3: Hyper-Target Cursor Community First
The atomic network: Cursor / vibe coding power users.

Why this community:
- Tool-obsessed, high engagement on X/Twitter, Reddit, YouTube
- Already sharing cursor rules and repos for free — feever lets them monetize
- cursor.directory has 250K+ monthly visitors proving demand
- Densely connected community, easy to saturate

Execution:
1. Build the best cursor rules collection on the internet (free, SEO play)
2. Sponsor 3–5 Cursor/vibe coding YouTubers for "built with feever" content
3. Engage genuinely in r/cursor, r/vibecoding, r/ChatGPTCoding
4. Partner with cursor.directory for cross-promotion
5. Discord community for feever creators in Cursor ecosystem

### Strategy 4: Sellers as Marketing Team
- Creator referral: 5% of referred creator's first 6 months of sales
- Buyer referral: Earn feever credits for every buyer brought
- Social sharing: One-click "Share on X" with preview card
- Embed widget: Product card for personal sites, blogs, GitHub READMEs

---

## 7. Platform Defense Strategy

**Moat: Be the cross-platform Switzerland**

Cursor's marketplace serves Cursor. Claude serves Claude. feever serves everyone.

**What platforms won't build (feever's exclusive territory):**
1. Commercial licensing with creator payouts
2. Quality-tested product bundles / "Stacks"
3. Fork/remix economics with attribution + revenue sharing
4. Buyer-focused discovery (not developer-listing-focused)
5. Cross-model playground testing

**Embed inside platforms, don't compete:**
- feever MCP server → browse and install feever products from any IDE
- Cursor plugin → surfaces relevant feever products for your current project
- "Publish to feever" GitHub button → convert any repo into a listing
- Claude Project integration → import feever Context Packs directly

---

## 8. Technical Architecture

### 8.1 Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend** | Next.js 15 + React 19 | SSR for SEO, App Router, RSC |
| **Styling** | Tailwind CSS + shadcn/ui | Dark theme, rapid iteration |
| **Backend** | Next.js API Routes + tRPC | Type-safe, lightweight |
| **Database** | PostgreSQL via Supabase | Auth + DB + Storage unified |
| **Auth** | Supabase Auth | GitHub OAuth, magic link, org management |
| **Payments** | Stripe Connect | Marketplace payouts, subscriptions |
| **Storage** | Supabase Storage + Cloudflare R2 | Product files, assets |
| **Search** | Meilisearch | Fast, typo-tolerant, faceted |
| **AI Playground** | Anthropic + OpenAI + Google APIs | Multi-model testing |
| **Sandbox** | Sandpack / WebContainers | Browser-based code preview |
| **Hosting** | Vercel | Edge deployment |
| **Analytics** | PostHog | Product analytics, funnels |
| **Email** | Resend | Transactional + waitlist |

### 8.2 Core Data Model

```
User
├── id, email, name, username, avatar, bio, website
├── role: buyer | seller | both
├── seller_tier: free | pro | team
├── stripe_connect_id
├── credit_balance
└── created_at, updated_at

Product
├── id, title, slug, description_md
├── category: starter | workflow_kit | extension | launchable | context_pack | blueprint
├── seller_id → User
├── price, currency, license_type (personal | commercial | team)
├── files[] (encrypted, gated)
├── preview_config (playground settings, sandbox type)
├── compatibility_tags[] (claude_4.5, cursor_0.45, gpt_4.5, etc.)
├── version, changelog[]
├── forked_from → Product (nullable)
├── fork_revenue_share_pct (default 10%)
├── quality_tier: unverified | verified | pick | gold
├── trust_score (composite: automated + community)
├── avg_rating, review_count, purchase_count
├── status: draft | in_review | published | archived
└── created_at, updated_at, last_tested_at

Purchase
├── id, buyer_id → User, product_id → Product
├── amount, platform_fee, seller_payout, fork_royalty
├── stripe_payment_id
├── credits_used
└── created_at

Review
├── id, buyer_id → User, product_id → Product
├── rating (1-5), text, verified_purchase: bool
├── works_confirmation: bool (one-click "it worked")
└── created_at

Fork
├── id, parent_product_id → Product, child_product_id → Product
├── forker_id → User
├── revenue_share_pct
└── created_at

QualityCheck
├── id, product_id → Product
├── check_type: automated | peer_review | community
├── passed: bool, details_json
├── checked_by → User (nullable, for peer review)
└── created_at

CreditTransaction
├── id, user_id → User
├── amount (+/-), type: purchase | playground_use | referral_bonus | welcome
├── related_product_id → Product (nullable)
└── created_at
```

### 8.3 Key Integrations
- **Stripe Connect** — Seller onboarding, payouts, fork royalties, subscription billing
- **GitHub OAuth** — Import repos, verify identity, fork workflows, "Publish to feever" button
- **Anthropic / OpenAI / Google APIs** — Playground multi-model testing, automated quality scoring
- **Sandpack / WebContainers** — Browser-based code preview for starters
- **Meilisearch** — Faceted search by category, compatibility, quality tier, price range
- **Resend** — Transactional emails, update notifications, waitlist drip
- **PostHog** — Funnel analytics, feature flags, A/B testing

---

## 9. Go-to-Market Timeline

### Phase 1: Pre-Launch (Weeks 1–4)
- Deploy landing page to feever.co with waitlist (Resend)
- Set up socials: @feever on X, GitHub org, Discord
- Build feever Playground (standalone free tool) as funnel
- Create first 10 feever Labs products
- Recruit 30 founding creators via DMs, communities, referrals
- Ship `create-feever-app` CLI to npm
- Start building in public on X

### Phase 2: Curated Beta (Weeks 5–8)
- Invite founding creators → they list products
- Invite waitlist buyers in batches
- Core flow: browse → playground test → buy → download → review
- Manual curation of every listing
- Iterate on quality scoring and search
- Target: 50+ curated products, 500+ beta buyers

### Phase 3: Public Launch (Weeks 9–12)
- Open buyer registration
- Seller applications open (still curated approval)
- Product Hunt launch
- Press: TechCrunch, The Verge, AI newsletters (Ben's Bites, The Rundown, Superhuman)
- Creator referral program live
- Target: 150+ products, 1,000+ buyers

### Phase 4: Growth (Months 4–6)
- Transition to Verified Open model
- Launch fork/remix features
- Launch promoted listings (revenue layer 4)
- Expand to Launchables + Context Packs categories
- feever MCP server for IDE integration
- Cursor plugin for in-editor product discovery
- Target: 500+ products, 5,000+ monthly active buyers

### Phase 5: Scale (Months 7–12)
- Full open marketplace with quality guardrails
- Automation Blueprints category
- feever for Teams / Enterprise
- "Publish to feever" GitHub integration
- API access for programmatic browsing/purchasing
- Partnership conversations with Anthropic, Cursor, Vercel

---

## 10. Brand & Design

### Visual Identity
Built around heat, energy, and contagion — the "fever" metaphor:

- **Palette:** Deep black/charcoal base, orange/red/amber accents, glowing gradients
- **Typography:** Inter or Geist — bold, modern sans-serif
- **Motion:** Animated glows, heat shimmer, pulse animations
- **Tone:** Confident, energetic, slightly rebellious. Premium but not corporate.
- **Quality signal:** Clean, minimal UI that communicates curation (App Store, not flea market)

### Taglines
- "Catch the fever" (primary)
- "Not prompts. Systems." (positioning)
- "Test. Buy. Ship." (functional)
- "AI products that actually work." (trust)

---

## 11. Competitive Positioning

| Competitor | Their Model | feever's Advantage |
|---|---|---|
| **PromptBase** | $1.99 prompt listings | Higher-value systems, live playground, fork model |
| **cursor.directory** | Free cursor rules directory | Monetization layer, broader categories, quality curation |
| **Cursor Marketplace** | Cursor-only plugins | Cross-platform, commercial licensing, full product types |
| **MCP.so / mcpmarket** | MCP server directories | Commercial marketplace with payments, quality testing, bundles |
| **Gumroad** | Generic digital products | AI-native with playground, compatibility badges, quality scoring |
| **GitHub Marketplace** | Dev tools & actions | Buyer-focused UX, AI-specific, lower barrier to sell |
| **ThemeForest** | Themes & code | AI-first, fork/remix economics, live testing |

**Structural moats:**
1. Cross-platform compatibility system (no one else builds this)
2. Fork/remix economics with revenue sharing
3. Live playground for testing before buying
4. Curated quality → trust → willingness to pay premium prices
5. Embedded inside developer tools via MCP server + plugins

---

## 12. Risks & Mitigations (Updated)

| Risk | Mitigation |
|---|---|
| AI commoditizes simple products | Sell systems not strings. Higher-value products get MORE valuable as models improve. |
| Quality flood as marketplace opens | Hybrid curated→open model. Automated gates. Community moderation. 48hr creator response requirement. |
| Cold start / chicken-and-egg | feever Labs products seed supply. Playground as single-player funnel. Cursor community as atomic network. |
| Platform risk (Cursor/Anthropic marketplaces) | Cross-platform Switzerland. Embed inside platforms. Build what they won't (payments, forks, bundles). |
| Low revenue per transaction | $25 target AOV (not $1.99). 5 stacked revenue layers. Promoted listings as high-margin layer. |
| Creator acquisition | Generous rev share, referral program, founding creator program with equity-like upside (rev share on platform growth). |
| IP / licensing ambiguity | Clear license tiers (personal/commercial/team), creator attestation, DMCA process, fork attribution system. |

---

## 13. Success Metrics

| Metric | Month 3 | Month 6 | Month 12 |
|---|---|---|---|
| Curated products listed | 100+ | 300+ | 1,000+ |
| Monthly active buyers | 500 | 1,000 | 5,000 |
| Average order value | $20 | $25 | $30 |
| Monthly GMV | $15,000 | $37,500 | $270,000 |
| Monthly revenue (all layers) | $4,000 | $9,125 | $65,500 |
| Creator retention (active/month) | 70% | 60% | 55% |
| Playground sessions/month | 5,000 | 15,000 | 50,000 |
| Average product rating | 4.2+ | 4.0+ | 4.0+ |
| feever Verified % of catalog | 80% | 60% | 40% |

---

## 14. Immediate Next Steps (Priority Order)

1. **Deploy landing page** — feever.co with waitlist capture via Resend
2. **Scaffold codebase** — Next.js + Supabase + Stripe Connect + Meilisearch
3. **Build core flow** — Auth → Browse → Product Page → Buy → Download
4. **Build playground MVP** — Workflow Kit testing against Claude API (single model first)
5. **Create first 10 feever Labs products** — 4 Starters, 3 Workflow Kits, 3 Extensions
6. **Set up socials + Discord** — @feever on X, GitHub org, community server
7. **Ship `create-feever-app` CLI** — Free tool, npm distribution, funnel
8. **Recruit 30 founding creators** — Personal outreach to Cursor/vibe coding community
9. **Build in public** — Daily/weekly updates on X, document the journey

---

*feever.co — Catch the fever 🔥*
