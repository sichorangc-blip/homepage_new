'use client';

import { FormEvent, useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';

type MenuRow = { id: string; label: string; path: string; order_index: number; visible: boolean };

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuRow[]>([]);
  const [form, setForm] = useState({ label: '', path: '/' });
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    const res = await fetch('/api/admin/menus');
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setError(data?.error || '메뉴 데이터를 불러오지 못했습니다.');
      setItems([]);
      return;
    }
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => { load(); }, []);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/menus', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error || '메뉴 추가에 실패했습니다.');
      return;
    }
    setForm({ label: '', path: '/' });
    await load();
  };

  const remove = async (id: string) => {
    setError('');
    const res = await fetch(`/api/admin/menus?id=${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error || '메뉴 삭제에 실패했습니다.');
      return;
    }
    await load();
  };

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold mb-4">Menu Management</h1>
      {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
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
