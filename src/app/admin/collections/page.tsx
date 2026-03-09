import AdminLayout from '@/components/admin/AdminLayout';
import { collections } from '@/lib/mock-data';

export default function AdminCollectionsPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Collection Management</h1>
      <div className="border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone-50"><tr><th className="p-3 text-left">Title</th><th className="p-3 text-left">Slug</th><th className="p-3 text-left">Season</th><th className="p-3">Visible</th></tr></thead>
          <tbody>
            {collections.map(c => <tr key={c.id} className="border-t"><td className="p-3">{c.title}</td><td className="p-3">{c.slug}</td><td className="p-3">{c.season}</td><td className="p-3 text-center">{c.visible ? 'Y' : 'N'}</td></tr>)}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
