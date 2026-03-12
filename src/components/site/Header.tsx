import Link from 'next/link';
import { getMenus, getSiteSettings } from '@/lib/data/content';

export default async function Header() {
  const [menus, settings] = await Promise.all([getMenus(), getSiteSettings()]);

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-line">
      <div className="container-p h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide">{settings.brand}</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          {menus.filter((m) => m.visible).map((m) => <Link key={m.id} href={m.path}>{m.label}</Link>)}
        </nav>
        <Link href="/admin/login" className="text-xs border border-line px-3 py-1 rounded">Admin</Link>
      </div>
    </header>
  );
}
