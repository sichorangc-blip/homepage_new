'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setNotice('');

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

  const onResetPassword = async () => {
    if (!email) {
      setError('비밀번호 재설정을 위해 관리자 이메일을 먼저 입력해 주세요.');
      return;
    }

    setLoading(true);
    setError('');
    setNotice('');

    try {
      const supabase = getSupabaseBrowserClient();
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const baseUrl = siteUrl || origin;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${baseUrl}/admin/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setNotice('재설정 메일을 보냈습니다. 메일함(스팸함 포함)을 확인해 주세요.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '비밀번호 재설정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-stone-100 p-4">
      <form onSubmit={onSubmit} className="bg-white border border-stone-200 p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="text-sm text-stone-600">
          초기 비밀번호는 기본 제공되지 않습니다. Supabase에서 생성한 관리자 계정 이메일/비밀번호로 로그인하세요.
        </p>
        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-3" type="email" placeholder="Email" required />
        <input value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-3" type="password" placeholder="Password" required />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {notice ? <p className="text-sm text-green-700">{notice}</p> : null}
        <button disabled={loading} className="w-full bg-stone-900 text-white py-2 disabled:opacity-60">{loading ? 'Logging in...' : 'Login'}</button>
        <button
          type="button"
          disabled={loading}
          onClick={onResetPassword}
          className="w-full border border-stone-300 py-2 text-sm text-stone-700 disabled:opacity-60"
        >
          비밀번호 재설정 메일 보내기
        </button>
      </form>
    </main>
  );
}
