-- Run this if /admin/settings still says public.site_settings is missing

create extension if not exists "pgcrypto";

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  brand text,
  hero_title text,
  hero_subtitle text,
  featured_title text,
  gallery_title text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "public read site_settings" on public.site_settings;
create policy "public read site_settings" on public.site_settings for select using (true);

-- Force PostgREST schema cache reload
NOTIFY pgrst, 'reload schema';
