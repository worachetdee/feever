-- ============================================================
-- feever.co — Combined migrations (all tables + RLS)
-- Run this in the Supabase SQL Editor in one go.
-- ============================================================

-- 00001: profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  website text,
  role text default 'buyer' check (role in ('buyer', 'seller', 'both')),
  seller_tier text default 'free' check (seller_tier in ('free', 'pro', 'team')),
  stripe_connect_id text,
  stripe_connect_onboarded boolean default false,
  credit_balance integer default 50,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'user_name', new.raw_user_meta_data ->> 'preferred_username', 'user_' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 00002: products + product_files
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

create index products_seller_id_idx on public.products (seller_id);
create index products_category_idx on public.products (category);
create index products_status_idx on public.products (status);
create index products_slug_idx on public.products (slug);
create index products_featured_idx on public.products (featured) where featured = true;

create trigger products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

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

alter table public.product_files enable row level security;

create policy "Preview files are viewable by everyone"
  on public.product_files for select
  using (is_preview = true);

create policy "Sellers can manage their product files"
  on public.product_files for all
  using (
    exists (
      select 1 from public.products
      where products.id = product_files.product_id
        and products.seller_id = auth.uid()
    )
  );

-- 00003: purchases
create table public.purchases (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles not null,
  product_id uuid references public.products not null,
  amount integer not null,
  platform_fee integer not null,
  seller_payout integer not null,
  fork_royalty integer default 0,
  stripe_payment_id text,
  stripe_transfer_id text,
  credits_used integer default 0,
  created_at timestamptz default now(),
  unique (buyer_id, product_id)
);

create index purchases_buyer_id_idx on public.purchases (buyer_id);
create index purchases_product_id_idx on public.purchases (product_id);

alter table public.purchases enable row level security;

create policy "Users can view their own purchases"
  on public.purchases for select
  using (auth.uid() = buyer_id);

create policy "Sellers can view purchases of their products"
  on public.purchases for select
  using (
    exists (
      select 1 from public.products
      where products.id = purchases.product_id
        and products.seller_id = auth.uid()
    )
  );

-- NOW add the product_files policy that depends on purchases
create policy "Purchased files are viewable by buyers"
  on public.product_files for select
  using (
    exists (
      select 1 from public.purchases
      where purchases.product_id = product_files.product_id
        and purchases.buyer_id = auth.uid()
    )
  );

-- 00004: reviews
create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles not null,
  product_id uuid references public.products not null,
  rating integer not null check (rating between 1 and 5),
  text text,
  works_confirmation boolean default false,
  verified_purchase boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (buyer_id, product_id)
);

create index reviews_product_id_idx on public.reviews (product_id);

create trigger reviews_updated_at
  before update on public.reviews
  for each row execute function public.handle_updated_at();

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using (true);

create policy "Buyers can create reviews for purchased products"
  on public.reviews for insert
  with check (
    auth.uid() = buyer_id
    and exists (
      select 1 from public.purchases
      where purchases.buyer_id = auth.uid()
        and purchases.product_id = reviews.product_id
    )
  );

create policy "Buyers can update their own reviews"
  on public.reviews for update
  using (auth.uid() = buyer_id);

create or replace function public.update_product_review_stats()
returns trigger as $$
begin
  update public.products set
    avg_rating = (select coalesce(avg(rating), 0) from public.reviews where product_id = coalesce(new.product_id, old.product_id)),
    review_count = (select count(*) from public.reviews where product_id = coalesce(new.product_id, old.product_id))
  where id = coalesce(new.product_id, old.product_id);
  return coalesce(new, old);
end;
$$ language plpgsql security definer;

create trigger on_review_change
  after insert or update or delete on public.reviews
  for each row execute function public.update_product_review_stats();

-- 00005: forks
create table public.forks (
  id uuid default gen_random_uuid() primary key,
  parent_product_id uuid references public.products not null,
  child_product_id uuid references public.products not null,
  forker_id uuid references public.profiles not null,
  revenue_share_pct integer default 10,
  created_at timestamptz default now()
);

create index forks_parent_product_id_idx on public.forks (parent_product_id);
create index forks_child_product_id_idx on public.forks (child_product_id);

alter table public.forks enable row level security;

create policy "Forks are viewable by everyone"
  on public.forks for select
  using (true);

-- 00006: quality_checks
create table public.quality_checks (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products on delete cascade not null,
  check_type text not null check (check_type in ('automated', 'peer_review', 'community')),
  passed boolean not null,
  details jsonb,
  checked_by uuid references public.profiles,
  created_at timestamptz default now()
);

create index quality_checks_product_id_idx on public.quality_checks (product_id);

alter table public.quality_checks enable row level security;

create policy "Quality checks are viewable by everyone"
  on public.quality_checks for select
  using (true);

-- 00007: credit_transactions
create table public.credit_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles not null,
  amount integer not null,
  type text not null check (type in ('welcome', 'purchase', 'playground_use', 'referral_bonus', 'refund')),
  related_product_id uuid references public.products,
  description text,
  created_at timestamptz default now()
);

create index credit_transactions_user_id_idx on public.credit_transactions (user_id);

alter table public.credit_transactions enable row level security;

create policy "Users can view their own credit transactions"
  on public.credit_transactions for select
  using (auth.uid() = user_id);
