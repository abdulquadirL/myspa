'use client'

import { createContext, useContext, useState } from 'react'
import { Session, SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

type SupabaseContext = {
  supabase: SupabaseClient
  session: Session | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode
  initialSession: Session | null
}) {
  const [supabase] = useState(() => createClient())

  return (
    <Context.Provider value={{ supabase, session: initialSession }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (!context) throw new Error('useSupabase must be used inside SupabaseProvider')
  return context
}
