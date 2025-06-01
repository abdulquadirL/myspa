
"use client"
import './globals.css'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import BookingModal from '@/components/BookingModal'

// export const metadata = {
//     title: "Nirvana De Spa",
//     description: "Exquisite Luxury Spa, Wellness and Beauty Palace in Abuja",
//   };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <SessionProvider>
        <Navbar />
        <BookingModal />
        <main className="min-h-screen">{children}</main>
        <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
