// lib/supabase/server.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient(p0: string, p1: string, p2: { auth: { persistSession: boolean } }) {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  )
}
