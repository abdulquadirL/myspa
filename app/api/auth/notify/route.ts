// app/api/auth/notify/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'Notification sent!' })
}
