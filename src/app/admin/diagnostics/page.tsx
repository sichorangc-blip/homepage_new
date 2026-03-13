'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';

type Check = { table: string; ok: boolean; message: string };

type Health = {
  ok: boolean;
  env: Record<string, boolean>;
  checks: Check[];
  message: string;
};

export default function AdminDiagnosticsPage() {
  const [data, setData] = useState<Health | null>(null);
  const [loading, setLoading] = useState(false);

  const runCheck = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/health');
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    runCheck();
  }, []);

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold mb-4">Diagnostics</h1>
      <button onClick={runCheck} className="mb-4 bg-stone-900 text-white px-4 py-2">{loading ? 'Checking...' : 'Run Check'}</button>

      {data ? (
        <div className="space-y-4">
          <p className={`text-sm ${data.ok ? 'text-emerald-700' : 'text-red-600'}`}>{data.message}</p>

          <div className="border bg-white p-4">
            <h2 className="font-medium mb-2">Environment</h2>
            {Object.entries(data.env).map(([k, v]) => (
              <p key={k} className="text-sm">{k}: {v ? 'OK' : 'MISSING'}</p>
            ))}
          </div>

          <div className="border bg-white p-4">
            <h2 className="font-medium mb-2">Tables</h2>
            {data.checks.length === 0 ? <p className="text-sm text-stone-600">No table checks executed.</p> : null}
            {data.checks.map((c) => (
              <p key={c.table} className={`text-sm ${c.ok ? 'text-emerald-700' : 'text-red-600'}`}>
                {c.table}: {c.ok ? 'OK' : c.message}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </AdminShell>
  );
}
