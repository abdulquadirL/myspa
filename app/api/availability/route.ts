import { NextResponse } from 'next/server'

export async function GET() {
  const bookedDates = ['2025-06-01', '2025-06-03', '2025-06-05'] // Example booked dates
  return NextResponse.json({ bookedDates })
}
