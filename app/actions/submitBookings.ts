'use server'

import { supabase } from '@/lib/supabaseClient'

export async function submitBooking({
  name,
  email,
  phone,
  service,
  date,
  time,
}: {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
}) {
  const { data, error } = await supabase.from('bookings').insert([
    {
      name,
      email,
      phone,
      service,
      date,
      time,
    },
  ])

  if (error) {
    throw new Error(error.message)
  }

  return data
}
