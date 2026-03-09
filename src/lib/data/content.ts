import { banners as fallbackBanners, collections as fallbackCollections, faqs as fallbackFaqs, gallery as fallbackGallery, menus as fallbackMenus } from '@/lib/mock-data';
import { getSupabasePublicServerClient } from '@/lib/supabase/server';

export async function getMenus() {
  const client = getSupabasePublicServerClient();
  if (!client) return fallbackMenus;
  const { data } = await client.from('menus').select('*').order('order_index', { ascending: true });
  if (!data?.length) return fallbackMenus;
  return data.map((m: any) => ({ id: m.id, label: m.label, path: m.path, order: m.order_index, visible: m.visible }));
}

export async function getBanners() {
  const client = getSupabasePublicServerClient();
  if (!client) return fallbackBanners;
  const { data } = await client.from('banners').select('*').eq('visible', true).order('order_index', { ascending: true });
  if (!data?.length) return fallbackBanners;
  return data.map((b: any) => ({ id: b.id, title: b.title, subtitle: b.subtitle, image: b.media_url, ctaLabel: b.cta_label || 'View', ctaLink: b.cta_link || '/', visible: b.visible }));
}

export async function getCollections() {
  const client = getSupabasePublicServerClient();
  if (!client) return fallbackCollections;
  const { data } = await client.from('collections').select('*').in('status', ['published', 'public']).order('order_index', { ascending: true });
  if (!data?.length) return fallbackCollections;
  return data.map((c: any) => ({ id: c.id, slug: c.slug, title: c.title, season: c.season || '', summary: c.summary || '', cover: c.cover_image, visible: c.status !== 'private' }));
}

export async function getCollectionBySlug(slug: string) {
  const all = await getCollections();
  return all.find((c) => c.slug === slug);
}

export async function getGallery() {
  const client = getSupabasePublicServerClient();
  if (!client) return fallbackGallery;
  const { data } = await client.from('gallery_items').select('*').eq('visible', true).order('order_index', { ascending: true });
  if (!data?.length) return fallbackGallery;
  return data.map((g: any) => ({ id: g.id, image: g.image_url, caption: g.caption || '', visible: g.visible }));
}

export async function getFaqs() {
  const client = getSupabasePublicServerClient();
  if (!client) return fallbackFaqs;
  const { data } = await client.from('faqs').select('*').eq('visible', true).order('order_index', { ascending: true });
  if (!data?.length) return fallbackFaqs;
  return data.map((f: any) => ({ id: f.id, question: f.question, answer: f.answer, visible: f.visible }));
}
