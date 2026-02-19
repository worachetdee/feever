-- Create reviews table
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

-- Indexes
create index reviews_product_id_idx on public.reviews (product_id);

-- Auto-update updated_at
create trigger reviews_updated_at
  before update on public.reviews
  for each row execute function public.handle_updated_at();

-- RLS
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

-- Function to update product avg_rating and review_count
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
