'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminResetPasswordPage() {
  const [nextPassword, setNextPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (nextPassword.length < 8) {
      setError('비밀번호는 8자 이상으로 입력해 주세요.');
      return;
    }

    if (nextPassword !== confirmPassword) {
      setError('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({ password: nextPassword });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      setNotice('비밀번호가 변경되었습니다. 관리자 로그인 페이지로 이동합니다.');
      setTimeout(() => router.push('/admin/login'), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : '비밀번호 변경 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-stone-100 p-4">
      <form onSubmit={onSubmit} className="bg-white border border-stone-200 p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">비밀번호 재설정</h1>
        <p className="text-sm text-stone-600">
          메일의 링크로 접속한 뒤, 새 비밀번호를 입력해 저장하세요.
        </p>
        <input
          value={nextPassword}
          onChange={e => setNextPassword(e.target.value)}
          className="w-full border p-3"
          type="password"
          placeholder="새 비밀번호 (8자 이상)"
          minLength={8}
          required
        />
        <input
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full border p-3"
          type="password"
          placeholder="새 비밀번호 확인"
          minLength={8}
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {notice ? <p className="text-sm text-green-700">{notice}</p> : null}
        <button disabled={loading} className="w-full bg-stone-900 text-white py-2 disabled:opacity-60">
          {loading ? '변경 중...' : '새 비밀번호 저장'}
        </button>
      </form>
    </main>
  );
}
