'use client'

import { useState } from 'react'

export default function BookingModal() {
  const [form, setForm] = useState({ name: '', email: '', date: '', service: 'Massage' })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await fetch('/api/book', {
      method: 'POST',
      body: JSON.stringify(form),
    })
    alert('Booking Confirmed!')
    document.getElementById('bookingModal')?.classList.add('hidden')
  }

  return (
    <div
      id="bookingModal"
      className="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
          onClick={() => document.getElementById('bookingModal')?.classList.add('hidden')}
        >
          ×
        </button>
        <h3 className="text-xl font-bold text-center">Book an Appointment</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option>Massage</option>
            <option>Facial</option>
            <option>Manicure & Pedicure</option>
            <option>Full Spa Package</option>
          </select>
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  )
}
