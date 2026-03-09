'use client';

import { FormEvent, useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';

type MenuRow = { id: string; label: string; path: string; order_index: number; visible: boolean };

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuRow[]>([]);
  const [form, setForm] = useState({ label: '', path: '/' });

  const load = async () => setItems(await fetch('/api/admin/menus').then(r => r.json()));
  useEffect(() => { load(); }, []);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/menus', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ label: '', path: '/' });
    await load();
  };

  const remove = async (id: string) => { await fetch(`/api/admin/menus?id=${id}`, { method: 'DELETE' }); await load(); };

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold mb-4">Menu Management</h1>
      <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
        <input required value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} className="border p-2" placeholder="Label" />
        <input required value={form.path} onChange={e => setForm({ ...form, path: e.target.value })} className="border p-2" placeholder="Path" />
        <button className="bg-stone-900 text-white px-3 py-2">Add Menu</button>
      </form>
      <div className="border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone-50"><tr><th className="p-3 text-left">Label</th><th className="p-3 text-left">Path</th><th className="p-3">Visible</th><th className="p-3">Action</th></tr></thead>
          <tbody>
            {items.map(m => <tr key={m.id} className="border-t"><td className="p-3">{m.label}</td><td className="p-3">{m.path}</td><td className="p-3 text-center">{m.visible ? 'Y' : 'N'}</td><td className="p-3 text-center"><button onClick={() => remove(m.id)} className="text-red-600">Delete</button></td></tr>)}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
