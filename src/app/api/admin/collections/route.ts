import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

const MISSING_TABLE_HELP = 'Supabase table public.collections is missing. Run supabase/schema.sql in Supabase SQL Editor, then refresh.';

function isMissingCollectionsTable(errorMessage: string) {
  return errorMessage.includes("Could not find the table 'public.collections'") ||
    errorMessage.toLowerCase().includes('relation "collections" does not exist');
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from('collections').select('*').order('order_index', { ascending: true });
    if (error) {
      if (isMissingCollectionsTable(error.message)) {
        return NextResponse.json({ error: MISSING_TABLE_HELP }, { status: 500 });
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
    const { data, error } = await supabase.from('collections').insert({
      slug: body.slug,
      title: body.title,
      season: body.season,
      summary: body.summary,
      cover_image: body.cover_image,
      thumbnail: body.thumbnail || body.cover_image,
      body_blocks: body.body_blocks ?? [],
      status: body.status ?? 'published',
      order_index: body.order_index ?? 999
    }).select('*').single();
    if (error) {
      if (isMissingCollectionsTable(error.message)) {
        return NextResponse.json({ error: MISSING_TABLE_HELP }, { status: 500 });
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
    const { data, error } = await supabase.from('collections').update({
      slug: body.slug,
      title: body.title,
      season: body.season,
      summary: body.summary,
      cover_image: body.cover_image,
      thumbnail: body.thumbnail || body.cover_image,
      status: body.status,
      order_index: body.order_index
    }).eq('id', body.id).select('*').single();
    if (error) {
      if (isMissingCollectionsTable(error.message)) {
        return NextResponse.json({ error: MISSING_TABLE_HELP }, { status: 500 });
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
    const { error } = await supabase.from('collections').delete().eq('id', id);
    if (error) {
      if (isMissingCollectionsTable(error.message)) {
        return NextResponse.json({ error: MISSING_TABLE_HELP }, { status: 500 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unexpected server error' }, { status: 500 });
  }
}
