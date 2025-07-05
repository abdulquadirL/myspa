// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET: Fetch all bookings
export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[BOOKINGS_GET_ERROR]', error.message)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST: Create a new booking
export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
  const body = await req.json()

  const { name, email, date, services, totalPrice } = body

  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        name,
        email,
        date,
        services,
        total_price: totalPrice,
      },
    ])
    .select()

  if (error) {
    console.error('[BOOKINGS_POST_ERROR]', error.message)
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
