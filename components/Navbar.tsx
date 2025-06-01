'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-amber-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-black">
          Nirvanad'Spa
        </Link>

        <div className="hidden md:flex gap-6 items-center text-gray-800">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-amber-300 px-4 py-2 animate-bounce rounded-full hover:bg-amber-300 hover:text-black transition"
          >
            Book Now
          </button>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-3 shadow">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <button
            onClick={() => {
              setIsOpen(false)
              document.getElementById('bookingModal')?.classList.remove('hidden')
            }}
            className="w-full bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition"
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  )
}
