import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

const MISSING_BANNERS_TABLE_HELP = 'Supabase table public.banners is missing. Go to Supabase Dashboard → SQL Editor → run the full supabase/schema.sql file → click Run → refresh this page.';

function isMissingBannersTable(errorMessage: string) {
  return errorMessage.includes("Could not find the table 'public.banners'") ||
    errorMessage.toLowerCase().includes('relation "banners" does not exist');
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from('banners').select('*').order('order_index', { ascending: true });
    if (error) {
      if (isMissingBannersTable(error.message)) {
        return NextResponse.json({ error: MISSING_BANNERS_TABLE_HELP }, { status: 500 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data ?? []);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unexpected server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from('banners').insert({
      title: body.title,
      subtitle: body.subtitle,
      media_url: body.media_url,
      media_type: body.media_type ?? 'image',
      cta_label: body.cta_label,
      cta_link: body.cta_link,
      order_index: body.order_index ?? 999,
      visible: body.visible ?? true
    }).select('*').single();
    if (error) {
      if (isMissingBannersTable(error.message)) {
        return NextResponse.json({ error: MISSING_BANNERS_TABLE_HELP }, { status: 500 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unexpected server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from('banners').update({
      title: body.title,
      subtitle: body.subtitle,
      media_url: body.media_url,
      media_type: body.media_type ?? 'image',
      cta_label: body.cta_label,
      cta_link: body.cta_link,
      order_index: body.order_index,
      visible: body.visible
    }).eq('id', body.id).select('*').single();
    if (error) {
      if (isMissingBannersTable(error.message)) {
        return NextResponse.json({ error: MISSING_BANNERS_TABLE_HELP }, { status: 500 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unexpected server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (error) {
      if (isMissingBannersTable(error.message)) {
        return NextResponse.json({ error: MISSING_BANNERS_TABLE_HELP }, { status: 500 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unexpected server error' }, { status: 500 });
  }
}
