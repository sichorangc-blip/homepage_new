'use client';

import { FormEvent, useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';

type Row = { id: string; title: string; slug: string; season: string; status: string; cover_image: string; summary: string };

export default function AdminCollectionsPage() {
  const [items, setItems] = useState<Row[]>([]);
  const [form, setForm] = useState({ title: '', slug: '', season: '', summary: '', cover_image: '', status: 'published' });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    const res = await fetch('/api/admin/collections');
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setError(data?.error || '컬렉션 데이터를 불러오지 못했습니다.');
      setItems([]);
      return;
    }
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => { load(); }, []);

  const upload = async () => {
    if (!file) return form.cover_image;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || '이미지 업로드 실패');
    return data.url as string;
  };

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const uploaded = await upload();
      const res = await fetch('/api/admin/collections', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, cover_image: uploaded }) });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || '컬렉션 추가 실패');
      setForm({ title: '', slug: '', season: '', summary: '', cover_image: '', status: 'published' });
      setFile(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : '컬렉션 추가 실패');
    }
  };

  const remove = async (id: string) => {
    setError('');
    const res = await fetch(`/api/admin/collections?id=${id}`, { method: 'DELETE' });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setError(data?.error || '컬렉션 삭제 실패');
      return;
    }
    await load();
  };

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold mb-4">Collection Management</h1>
      {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
      <form onSubmit={create} className="space-y-2 mb-6">
        <div className="grid md:grid-cols-2 gap-2">
          <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="border p-2" placeholder="Title" />
          <input required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="border p-2" placeholder="Slug" />
        </div>
        <input value={form.season} onChange={e => setForm({ ...form, season: e.target.value })} className="border p-2 w-full" placeholder="Season" />
        <textarea value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} className="border p-2 w-full" placeholder="Summary" />
        <input value={form.cover_image} onChange={e => setForm({ ...form, cover_image: e.target.value })} className="border p-2 w-full" placeholder="Cover URL (or upload below)" />
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="border p-2 w-full bg-white" />
        <button className="bg-stone-900 text-white px-4 py-2">Add Collection</button>
      </form>
      <div className="border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone-50"><tr><th className="p-3 text-left">Title</th><th className="p-3 text-left">Slug</th><th className="p-3 text-left">Season</th><th className="p-3">Action</th></tr></thead>
          <tbody>
            {items.map(c => <tr key={c.id} className="border-t"><td className="p-3">{c.title}</td><td className="p-3">{c.slug}</td><td className="p-3">{c.season}</td><td className="p-3 text-center"><button onClick={() => remove(c.id)} className="text-red-600">Delete</button></td></tr>)}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
