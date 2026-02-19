-- Create purchases table
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

-- Indexes
create index purchases_buyer_id_idx on public.purchases (buyer_id);
create index purchases_product_id_idx on public.purchases (product_id);

-- RLS
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
