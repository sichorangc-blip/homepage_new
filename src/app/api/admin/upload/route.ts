import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'file required' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const supabase = getSupabaseServerClient();
  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabase.storage.from('media').upload(fileName, Buffer.from(arrayBuffer), {
    contentType: file.type,
    upsert: false
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabase.storage.from('media').getPublicUrl(fileName);
  return NextResponse.json({ url: data.publicUrl });
}
