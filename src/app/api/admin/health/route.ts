import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

async function checkTable(client: ReturnType<typeof getSupabaseServerClient>, table: string) {
  try {
    const { error } = await client.from(table).select('*', { count: 'exact', head: true });
    if (error) return { table, ok: false, message: error.message };
    return { table, ok: true, message: 'ok' };
  } catch (e) {
    return { table, ok: false, message: e instanceof Error ? e.message : 'unknown error' };
  }
}

export async function GET() {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  };

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({
      ok: false,
      env,
      checks: [],
      message: 'Missing required Supabase environment variables on this deployment.'
    });
  }

  try {
    const client = getSupabaseServerClient();
    const checks = await Promise.all([
      checkTable(client, 'site_settings'),
      checkTable(client, 'menus'),
      checkTable(client, 'banners'),
      checkTable(client, 'collections'),
      checkTable(client, 'gallery_items'),
      checkTable(client, 'faqs')
    ]);

    const allOk = checks.every((c) => c.ok);

    return NextResponse.json({
      ok: allOk,
      env,
      checks,
      message: allOk ? 'All checks passed.' : 'Some checks failed. Run supabase/schema.sql and verify env variables in Vercel.'
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      env,
      checks: [],
      message: e instanceof Error ? e.message : 'Unknown health check error'
    });
  }
}
