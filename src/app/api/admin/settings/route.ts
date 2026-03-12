import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

const MISSING_SETTINGS_TABLE_HELP = 'Supabase table public.site_settings is missing. Go to Supabase Dashboard → SQL Editor → run the full supabase/schema.sql file → click Run → refresh this page.';

function isMissingSettingsTable(errorMessage: string) {
  return errorMessage.includes("Could not find the table 'public.site_settings'") ||
    errorMessage.toLowerCase().includes('relation "site_settings" does not exist');
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      if (isMissingSettingsTable(error.message)) return NextResponse.json({ error: MISSING_SETTINGS_TABLE_HELP }, { status: 500 });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? null);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unexpected server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getSupabaseServerClient();

    const payload = {
      brand: body.brand,
      hero_title: body.hero_title,
      hero_subtitle: body.hero_subtitle,
      featured_title: body.featured_title,
      gallery_title: body.gallery_title
    };

    let upsertRes;
    if (body.id) {
      upsertRes = await supabase.from('site_settings').update(payload).eq('id', body.id).select('*').single();
    } else {
      upsertRes = await supabase.from('site_settings').insert(payload).select('*').single();
    }

    const { data, error } = upsertRes;
    if (error) {
      if (isMissingSettingsTable(error.message)) return NextResponse.json({ error: MISSING_SETTINGS_TABLE_HELP }, { status: 500 });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unexpected server error' }, { status: 500 });
  }
}
