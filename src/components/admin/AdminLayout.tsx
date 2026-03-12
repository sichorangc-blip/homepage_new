import Link from 'next/link';
import { ReactNode } from 'react';

const links = [
  ['Dashboard', '/admin/dashboard'],
  ['Menu', '/admin/menu'],
  ['Banners', '/admin/banners'],
  ['Collections', '/admin/collections']
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="flex">
        <aside className="w-52 min-h-screen border-r border-stone-200 p-4 space-y-2">
          <h2 className="font-semibold mb-4">Admin</h2>
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="block text-sm px-2 py-1 rounded hover:bg-stone-100">{label}</Link>
          ))}
          <Link href="/" className="block text-sm px-2 py-1 text-muted">Back to site</Link>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
