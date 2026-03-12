'use client';

import { FormEvent, useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';

type SettingsRow = {
  id?: string;
  brand: string;
  hero_title: string;
  hero_subtitle: string;
  featured_title: string;
  gallery_title: string;
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
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const load = async () => {
      setError('');
      const res = await fetch('/api/admin/settings');
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || '홈 설정을 불러오지 못했습니다.');
        return;
      }
      if (data) setForm(data);
    };
    load();
  }, []);

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
      {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
      {success ? <p className="mb-3 text-sm text-emerald-700">{success}</p> : null}
      <form onSubmit={save} className="space-y-3 max-w-2xl">
        <input value={form.brand || ''} onChange={e => setForm({ ...form, brand: e.target.value })} className="border p-2 w-full" placeholder="Brand Name" />
        <input value={form.hero_title || ''} onChange={e => setForm({ ...form, hero_title: e.target.value })} className="border p-2 w-full" placeholder="Hero Title" />
        <input value={form.hero_subtitle || ''} onChange={e => setForm({ ...form, hero_subtitle: e.target.value })} className="border p-2 w-full" placeholder="Hero Subtitle" />
        <input value={form.featured_title || ''} onChange={e => setForm({ ...form, featured_title: e.target.value })} className="border p-2 w-full" placeholder="Featured Section Title" />
        <input value={form.gallery_title || ''} onChange={e => setForm({ ...form, gallery_title: e.target.value })} className="border p-2 w-full" placeholder="Gallery Section Title" />
        <button className="bg-stone-900 text-white px-4 py-2">Save Settings</button>
      </form>
    </AdminShell>
  );
}
