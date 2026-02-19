-- Create forks table (v0.2 feature, schema ready)
create table public.forks (
  id uuid default gen_random_uuid() primary key,
  parent_product_id uuid references public.products not null,
  child_product_id uuid references public.products not null,
  forker_id uuid references public.profiles not null,
  revenue_share_pct integer default 10,
  created_at timestamptz default now()
);

-- Indexes
create index forks_parent_product_id_idx on public.forks (parent_product_id);
create index forks_child_product_id_idx on public.forks (child_product_id);

-- RLS
alter table public.forks enable row level security;

create policy "Forks are viewable by everyone"
  on public.forks for select
  using (true);
