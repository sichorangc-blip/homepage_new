'use client';

import { FormEvent, useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';

type BannerRow = { id: string; title: string; subtitle: string; media_url: string; cta_label: string; cta_link: string };

export default function AdminBannersPage() {
  const [items, setItems] = useState<BannerRow[]>([]);
  const [form, setForm] = useState({ title: '', subtitle: '', media_url: '', cta_label: '', cta_link: '/collection' });
  const [file, setFile] = useState<File | null>(null);

  const load = async () => setItems(await fetch('/api/admin/banners').then(r => r.json()));
  useEffect(() => { load(); }, []);

  const upload = async () => {
    if (!file) return form.media_url;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd }).then(r => r.json());
    return res.url as string;
  };

  const create = async (e: FormEvent) => {
    e.preventDefault();
    const uploaded = await upload();
    await fetch('/api/admin/banners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, media_url: uploaded }) });
    setForm({ title: '', subtitle: '', media_url: '', cta_label: '', cta_link: '/collection' });
    setFile(null);
    await load();
  };

  const remove = async (id: string) => { await fetch(`/api/admin/banners?id=${id}`, { method: 'DELETE' }); await load(); };

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold mb-4">Banner Management</h1>
      <form onSubmit={create} className="space-y-2 mb-6">
        <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="border p-2 w-full" placeholder="Title" />
        <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="border p-2 w-full" placeholder="Subtitle" />
        <input value={form.media_url} onChange={e => setForm({ ...form, media_url: e.target.value })} className="border p-2 w-full" placeholder="Image URL (or upload below)" />
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="border p-2 w-full bg-white" />
        <div className="grid grid-cols-2 gap-2">
          <input value={form.cta_label} onChange={e => setForm({ ...form, cta_label: e.target.value })} className="border p-2" placeholder="CTA Label" />
          <input value={form.cta_link} onChange={e => setForm({ ...form, cta_link: e.target.value })} className="border p-2" placeholder="CTA Link" />
        </div>
        <button className="bg-stone-900 text-white px-4 py-2">Add Banner</button>
      </form>
      <div className="space-y-3">
        {items.map(b => (
          <div key={b.id} className="border bg-white p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{b.title}</p>
              <p className="text-sm text-stone-600">{b.subtitle}</p>
            </div>
            <button onClick={() => remove(b.id)} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
