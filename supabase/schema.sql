create table if not exists public.items (
  id text primary key,
  name text not null,
  type text,
  rarity integer,
  attributes jsonb not null default '{}'::jsonb,
  tags text[] not null default '{}',
  source text,
  set_name text,
  image text,
  source_url text,
  score numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists items_name_idx on public.items using gin (to_tsvector('simple', name));
create index if not exists items_type_idx on public.items(type);
create index if not exists items_source_idx on public.items(source);
create index if not exists items_rarity_idx on public.items(rarity);

alter table public.items enable row level security;

drop policy if exists "Public can read items" on public.items;
create policy "Public can read items"
on public.items for select
to anon
using (true);
