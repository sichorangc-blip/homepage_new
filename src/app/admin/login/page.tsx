'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError(authError.message);
        return;
      }
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-stone-100 p-4">
      <form onSubmit={onSubmit} className="bg-white border border-stone-200 p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-3" type="email" placeholder="Email" required />
        <input value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-3" type="password" placeholder="Password" required />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button disabled={loading} className="w-full bg-stone-900 text-white py-2 disabled:opacity-60">{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </main>
  );
}
