-- Create quality_checks table
create table public.quality_checks (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products on delete cascade not null,
  check_type text not null check (check_type in ('automated', 'peer_review', 'community')),
  passed boolean not null,
  details jsonb,
  checked_by uuid references public.profiles,
  created_at timestamptz default now()
);

-- Indexes
create index quality_checks_product_id_idx on public.quality_checks (product_id);

-- RLS
alter table public.quality_checks enable row level security;

create policy "Quality checks are viewable by everyone"
  on public.quality_checks for select
  using (true);
