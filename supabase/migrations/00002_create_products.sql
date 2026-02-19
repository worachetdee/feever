-- Create products table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles not null,
  title text not null,
  slug text unique not null,
  description_md text not null,
  short_description text,
  category text not null check (category in ('starter', 'workflow_kit', 'extension', 'launchable', 'context_pack', 'blueprint')),
  price integer not null,
  currency text default 'usd',
  license_type text default 'personal' check (license_type in ('personal', 'commercial', 'team')),
  compatibility_tags text[] default '{}',
  version text default '1.0.0',
  changelog jsonb default '[]',
  forked_from uuid references public.products,
  fork_revenue_share_pct integer default 10,
  quality_tier text default 'unverified' check (quality_tier in ('unverified', 'verified', 'pick', 'gold')),
  trust_score numeric default 0,
  avg_rating numeric default 0,
  review_count integer default 0,
  purchase_count integer default 0,
  view_count integer default 0,
  status text default 'draft' check (status in ('draft', 'in_review', 'published', 'archived')),
  preview_config jsonb,
  last_tested_at timestamptz,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes
create index products_seller_id_idx on public.products (seller_id);
create index products_category_idx on public.products (category);
create index products_status_idx on public.products (status);
create index products_slug_idx on public.products (slug);
create index products_featured_idx on public.products (featured) where featured = true;

-- Auto-update updated_at
create trigger products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

-- RLS
alter table public.products enable row level security;

create policy "Published products are viewable by everyone"
  on public.products for select
  using (status = 'published');

create policy "Sellers can view their own products"
  on public.products for select
  using (auth.uid() = seller_id);

create policy "Sellers can insert their own products"
  on public.products for insert
  with check (auth.uid() = seller_id);

create policy "Sellers can update their own products"
  on public.products for update
  using (auth.uid() = seller_id);

create policy "Sellers can delete their own products"
  on public.products for delete
  using (auth.uid() = seller_id);

-- Product files table
create table public.product_files (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products on delete cascade not null,
  file_name text not null,
  file_path text not null,
  file_size integer,
  file_type text,
  is_preview boolean default false,
  created_at timestamptz default now()
);

create index product_files_product_id_idx on public.product_files (product_id);

-- RLS for product files
alter table public.product_files enable row level security;

create policy "Preview files are viewable by everyone"
  on public.product_files for select
  using (is_preview = true);

create policy "Purchased files are viewable by buyers"
  on public.product_files for select
  using (
    exists (
      select 1 from public.purchases
      where purchases.product_id = product_files.product_id
        and purchases.buyer_id = auth.uid()
    )
  );

create policy "Sellers can manage their product files"
  on public.product_files for all
  using (
    exists (
      select 1 from public.products
      where products.id = product_files.product_id
        and products.seller_id = auth.uid()
    )
  );
