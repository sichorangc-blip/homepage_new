import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

function getProjectRefFromUrl(url?: string) {
  if (!url) return null;
  try {
    const host = new URL(url).hostname;
    return host.split('.')[0] || null;
  } catch {
    return null;
  }
}

export async function GET() {
  const sqlPath = join(process.cwd(), 'supabase', 'site_settings_fix.sql');
  const sql = readFileSync(sqlPath, 'utf-8');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const projectRef = getProjectRefFromUrl(supabaseUrl);

  return NextResponse.json({
    sql,
    supabaseUrl: supabaseUrl || null,
    projectRef
  });
}
