'use client'

import { supabase } from '@/lib/supabase'
import { useEffect } from 'react'

export default function BookingListener() {
  useEffect(() => {
    const channel = supabase
      .channel('realtime:bookings')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('New booking:', payload.new)
          // You can display toast, update UI etc.
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return null
}
