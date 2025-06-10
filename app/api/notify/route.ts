import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { to, name, status } = await req.json()

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use your SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Booking Status Updated',
    text: `Hi ${name}, your booking status is now: ${status}. Thank you!`,
  })

  return NextResponse.json({ message: 'Email sent' })
}
