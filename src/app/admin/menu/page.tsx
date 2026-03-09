import AdminLayout from '@/components/admin/AdminLayout';
import { menus } from '@/lib/mock-data';

export default function AdminMenuPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Menu Management</h1>
      <p className="text-sm text-stone-600 mb-4">MVP에서는 더미 데이터 표시 기반입니다. 이후 Supabase CRUD로 확장합니다.</p>
      <div className="border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone-50"><tr><th className="p-3 text-left">Label</th><th className="p-3 text-left">Path</th><th className="p-3">Visible</th></tr></thead>
          <tbody>
            {menus.map(m => <tr key={m.id} className="border-t"><td className="p-3">{m.label}</td><td className="p-3">{m.path}</td><td className="p-3 text-center">{m.visible ? 'Y' : 'N'}</td></tr>)}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
