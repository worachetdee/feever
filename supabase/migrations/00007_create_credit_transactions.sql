-- Create credit_transactions table
create table public.credit_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles not null,
  amount integer not null,
  type text not null check (type in ('welcome', 'purchase', 'playground_use', 'referral_bonus', 'refund')),
  related_product_id uuid references public.products,
  description text,
  created_at timestamptz default now()
);

-- Indexes
create index credit_transactions_user_id_idx on public.credit_transactions (user_id);

-- RLS
alter table public.credit_transactions enable row level security;

create policy "Users can view their own credit transactions"
  on public.credit_transactions for select
  using (auth.uid() = user_id);
