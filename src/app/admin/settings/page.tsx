'use client';

import { FormEvent, useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';

type SettingsRow = {
  id?: string | null;
  brand: string;
  hero_title: string;
  hero_subtitle: string;
  featured_title: string;
  gallery_title: string;
  warning?: string;
};

const initial: SettingsRow = {
  brand: '',
  hero_title: '',
  hero_subtitle: '',
  featured_title: 'Featured Collections',
  gallery_title: 'Gallery Preview'
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsRow>(initial);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [success, setSuccess] = useState('');
  const [sql, setSql] = useState('');
  const [projectRef, setProjectRef] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setError('');
      setWarning('');
      const res = await fetch('/api/admin/settings');
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || '홈 설정을 불러오지 못했습니다.');
        return;
      }
      if (data?.warning) setWarning(data.warning);
      if (data) setForm(data);
    };

    const loadSql = async () => {
      const res = await fetch('/api/admin/bootstrap-site-settings-sql');
      const data = await res.json().catch(() => null);
      if (res.ok && data?.sql) {
        setSql(data.sql);
        setProjectRef(data?.projectRef || null);
      }
    };

    load();
    loadSql();
  }, []);

  const copySql = async () => {
    if (!sql) return;
    await navigator.clipboard.writeText(sql);
    setSuccess('site_settings 복구 SQL이 클립보드에 복사되었습니다. Supabase SQL Editor에 붙여넣고 Run 하세요.');
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setError(data?.error || '저장 실패');
      return;
    }
    setForm(data);
    setSuccess('저장되었습니다. 첫화면에 바로 반영됩니다.');
  };

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold mb-4">Home / Brand Settings</h1>
      {warning ? <p className="mb-3 text-sm text-amber-700">⚠ {warning}</p> : null}
      {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
      {success ? <p className="mb-3 text-sm text-emerald-700">{success}</p> : null}

      {(warning || error) && sql ? (
        <div className="mb-6 border border-amber-300 bg-amber-50 p-4 text-sm space-y-3">
          <p className="font-medium">빠른 복구 방법 (2분)</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Supabase Dashboard 접속 (현재 프로젝트 ref: <b>{projectRef || 'unknown'}</b>)</li>
            <li>SQL Editor 열기</li>
            <li>아래 SQL 붙여넣고 Run</li>
            <li><code>NOTIFY pgrst, 'reload schema';</code> 실행</li>
            <li>이 페이지 새로고침 후 다시 저장</li>
          </ol>
          <button onClick={copySql} className="bg-stone-900 text-white px-3 py-1.5">Copy Fix SQL</button>
          <details>
            <summary className="cursor-pointer text-stone-700">SQL 보기</summary>
            <pre className="mt-2 p-2 bg-white border overflow-auto text-xs">{sql}</pre>
          </details>
        </div>
      ) : null}

      <form onSubmit={save} className="space-y-3 max-w-2xl">
        <input value={form.brand || ''} onChange={e => setForm({ ...form, brand: e.target.value })} className="border p-2 w-full" placeholder="Brand Name" />
        <input value={form.hero_title || ''} onChange={e => setForm({ ...form, hero_title: e.target.value })} className="border p-2 w-full" placeholder="Hero Title" />
        <input value={form.hero_subtitle || ''} onChange={e => setForm({ ...form, hero_subtitle: e.target.value })} className="border p-2 w-full" placeholder="Hero Subtitle" />
        <input value={form.featured_title || ''} onChange={e => setForm({ ...form, featured_title: e.target.value })} className="border p-2 w-full" placeholder="Featured Section Title" />
        <input value={form.gallery_title || ''} onChange={e => setForm({ ...form, gallery_title: e.target.value })} className="border p-2 w-full" placeholder="Gallery Section Title" />
        <button className="bg-stone-900 text-white px-4 py-2">Save Settings</button>
      </form>
      <p className="text-xs text-stone-500 mt-6">Supabase Security Advisor 경고(anonymous select 허용)는 공개 홈페이지용 읽기 정책에서 발생할 수 있습니다.</p>
    </AdminShell>
  );
}
