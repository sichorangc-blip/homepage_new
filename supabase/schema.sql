-- Run this SQL in Supabase SQL editor

create extension if not exists "pgcrypto";


create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  brand text,
  hero_title text,
  hero_subtitle text,
  featured_title text,
  gallery_title text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists menus (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  path text not null,
  order_index int not null default 999,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  title text,
  subtitle text,
  media_url text not null,
  media_type text not null default 'image',
  cta_label text,
  cta_link text,
  order_index int not null default 999,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  season text,
  summary text,
  cover_image text not null,
  thumbnail text,
  body_blocks jsonb not null default '[]'::jsonb,
  status text not null default 'published',
  order_index int not null default 999,
  created_at timestamptz not null default now()
);

create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  order_index int not null default 999,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  order_index int not null default 999,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

alter table site_settings enable row level security;
alter table menus enable row level security;
alter table banners enable row level security;
alter table collections enable row level security;
alter table gallery_items enable row level security;
alter table faqs enable row level security;

drop policy if exists "public read site_settings" on site_settings;
create policy "public read site_settings" on site_settings for select using (true);

drop policy if exists "public read menus" on menus;
create policy "public read menus" on menus for select using (visible = true);

drop policy if exists "public read banners" on banners;
create policy "public read banners" on banners for select using (visible = true);

drop policy if exists "public read collections" on collections;
create policy "public read collections" on collections for select using (status in ('published','public'));

drop policy if exists "public read gallery" on gallery_items;
create policy "public read gallery" on gallery_items for select using (visible = true);

drop policy if exists "public read faqs" on faqs;
create policy "public read faqs" on faqs for select using (visible = true);

-- Storage bucket for uploaded images
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
