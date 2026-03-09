import AdminLayout from '@/components/admin/AdminLayout';
import { banners } from '@/lib/mock-data';

export default function AdminBannersPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Banner Management</h1>
      <div className="space-y-3">
        {banners.map(b => (
          <div key={b.id} className="border bg-white p-4">
            <p className="font-medium">{b.title}</p>
            <p className="text-sm text-stone-600">{b.subtitle}</p>
            <p className="text-xs text-stone-500 mt-2">CTA: {b.ctaLabel} → {b.ctaLink}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
