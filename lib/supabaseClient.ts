import { createBrowserClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      async get(name: string) {
        const cookieStore = await cookies();
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options?: any) {
        // Implement set if needed, or leave as a no-op for SSR
      },
      remove(name: string, options?: any) {
        // Implement remove if needed, or leave as a no-op for SSR
      },
    },
  }
);
