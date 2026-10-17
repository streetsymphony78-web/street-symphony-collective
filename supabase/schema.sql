create extension if not exists pgcrypto;

create table if not exists public.artist_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  role text not null default 'artist',
  art_description text,
  slug text,
  art_form text not null default 'Folk Arts',
  categories text[] not null default '{}',
  city text not null default '',
  state text not null default '',
  region text not null default '',
  image_url text not null default '',
  tagline text not null default '',
  bio text not null default '',
  story text[] not null default '{}',
  price text not null default 'Quote available',
  price_note text not null default '',
  available boolean not null default true,
  availability_note text not null default 'Available for bookings',
  available_days integer[] not null default '{}',
  rating numeric(2, 1) not null default 0,
  review_count integer not null default 0,
  experience_years integer not null default 0,
  languages text[] not null default '{}',
  available_for text[] not null default '{}',
  formats text[] not null default '{}',
  portfolio text[] not null default '{}',
  reviews jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  quote text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.artist_profiles add column if not exists slug text;
alter table public.artist_profiles add column if not exists art_form text not null default 'Folk Arts';
alter table public.artist_profiles add column if not exists categories text[] not null default '{}';
alter table public.artist_profiles add column if not exists city text not null default '';
alter table public.artist_profiles add column if not exists state text not null default '';
alter table public.artist_profiles add column if not exists region text not null default '';
alter table public.artist_profiles add column if not exists image_url text not null default '';
alter table public.artist_profiles add column if not exists tagline text not null default '';
alter table public.artist_profiles add column if not exists bio text not null default '';
alter table public.artist_profiles add column if not exists story text[] not null default '{}';
alter table public.artist_profiles add column if not exists price text not null default 'Quote available';
alter table public.artist_profiles add column if not exists price_note text not null default '';
alter table public.artist_profiles add column if not exists available boolean not null default true;
alter table public.artist_profiles add column if not exists availability_note text not null default 'Available for bookings';
alter table public.artist_profiles add column if not exists available_days integer[] not null default '{}';
alter table public.artist_profiles add column if not exists rating numeric(2, 1) not null default 0;
alter table public.artist_profiles add column if not exists review_count integer not null default 0;
alter table public.artist_profiles add column if not exists experience_years integer not null default 0;
alter table public.artist_profiles add column if not exists languages text[] not null default '{}';
alter table public.artist_profiles add column if not exists available_for text[] not null default '{}';
alter table public.artist_profiles add column if not exists formats text[] not null default '{}';
alter table public.artist_profiles add column if not exists portfolio text[] not null default '{}';
alter table public.artist_profiles add column if not exists reviews jsonb not null default '[]'::jsonb;
alter table public.artist_profiles add column if not exists featured boolean not null default false;
alter table public.artist_profiles add column if not exists quote text;
alter table public.artist_profiles add column if not exists is_published boolean not null default true;
alter table public.artist_profiles add column if not exists updated_at timestamptz not null default now();

create unique index if not exists artist_profiles_slug_idx on public.artist_profiles (slug) where slug is not null;
create index if not exists artist_profiles_published_created_idx on public.artist_profiles (is_published, created_at desc);

alter table public.artist_profiles enable row level security;

drop policy if exists "Public can read published artist profiles" on public.artist_profiles;
create policy "Public can read published artist profiles"
  on public.artist_profiles for select
  using (is_published = true);

drop policy if exists "Admins can insert artist profiles" on public.artist_profiles;
create policy "Admins can insert artist profiles"
  on public.artist_profiles for insert to authenticated
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update artist profiles" on public.artist_profiles;
create policy "Admins can update artist profiles"
  on public.artist_profiles for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete artist profiles" on public.artist_profiles;
create policy "Admins can delete artist profiles"
  on public.artist_profiles for delete to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into storage.buckets (id, name, public)
values ('artist-images', 'artist-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view artist images" on storage.objects;
create policy "Public can view artist images"
  on storage.objects for select
  using (bucket_id = 'artist-images');

drop policy if exists "Admins can upload artist images" on storage.objects;
create policy "Admins can upload artist images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'artist-images'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "Admins can update artist images" on storage.objects;
create policy "Admins can update artist images"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'artist-images'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  with check (
    bucket_id = 'artist-images'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "Admins can delete artist images" on storage.objects;
create policy "Admins can delete artist images"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'artist-images'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- After creating the admin account in Supabase Auth, run this as project owner:
-- update auth.users
-- set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
-- where email = lower('admin@example.com');