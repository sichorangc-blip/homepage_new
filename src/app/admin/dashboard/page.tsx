import AdminLayout from '@/components/admin/AdminLayout';
import { banners, collections, menus } from '@/lib/mock-data';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 bg-white"><p className="text-sm text-stone-500">Menus</p><p className="text-3xl">{menus.length}</p></div>
        <div className="border p-4 bg-white"><p className="text-sm text-stone-500">Banners</p><p className="text-3xl">{banners.length}</p></div>
        <div className="border p-4 bg-white"><p className="text-sm text-stone-500">Collections</p><p className="text-3xl">{collections.length}</p></div>
      </div>
    </AdminLayout>
  );
}
