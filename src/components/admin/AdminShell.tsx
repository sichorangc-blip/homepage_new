'use client';

import { ReactNode } from 'react';
import AdminLayout from './AdminLayout';
import { useAdminGuard } from './useAdminGuard';

export default function AdminShell({ children }: { children: ReactNode }) {
  const { loading } = useAdminGuard();

  if (loading) return <div className="p-8 text-sm">Loading admin...</div>;

  return <AdminLayout>{children}</AdminLayout>;
}
