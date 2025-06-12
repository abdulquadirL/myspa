'use server';

import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Supabase environment variables are not set.');
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: async (name: string) => {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        set: async (name: string, value: string, options?: CookieOptions) => {
           cookieStore.set(name, value, options);
        },
        remove: async (name: string, _options?: CookieOptions) => {
           cookieStore.delete(name);
        },
      },
    }
  );
}


