'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    if (password === expected) {
      localStorage.setItem('admin_auth', '1');
      router.push('/admin/dashboard');
      return;
    }
    setError('비밀번호가 올바르지 않습니다.');
  };

  return (
    <main className="min-h-screen grid place-items-center bg-stone-100 p-4">
      <form onSubmit={onSubmit} className="bg-white border border-stone-200 p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <input value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-3" type="password" placeholder="Password" />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full bg-stone-900 text-white py-2">Login</button>
      </form>
    </main>
  );
}
