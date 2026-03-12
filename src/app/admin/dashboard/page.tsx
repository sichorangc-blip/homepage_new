'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ menus: 0, banners: 0, collections: 0 });

  useEffect(() => {
    const load = async () => {
      const [m, b, c] = await Promise.all([
        fetch('/api/admin/menus').then(r => r.json()),
        fetch('/api/admin/banners').then(r => r.json()),
        fetch('/api/admin/collections').then(r => r.json())
      ]);
      setStats({ menus: m?.length || 0, banners: b?.length || 0, collections: c?.length || 0 });
    };
    load();
  }, []);

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 bg-white"><p className="text-sm text-stone-500">Menus</p><p className="text-3xl">{stats.menus}</p></div>
        <div className="border p-4 bg-white"><p className="text-sm text-stone-500">Banners</p><p className="text-3xl">{stats.banners}</p></div>
        <div className="border p-4 bg-white"><p className="text-sm text-stone-500">Collections</p><p className="text-3xl">{stats.collections}</p></div>
      </div>
    </AdminShell>
  );
}
