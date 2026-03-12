'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export function useAdminGuard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          router.replace('/admin/login');
          return;
        }
      } catch {
        router.replace('/admin/login');
        return;
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [router]);

  return { loading };
}
