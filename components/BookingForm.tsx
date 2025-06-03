'use client'
import { useState, useEffect } from 'react'

export default function BookingForm() {
  const [formData, setFormData] = useState({ name: '', email: '', date: '', service: 'Massage' })
  const [bookedDates, setBookedDates] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/availability')
      .then(res => res.json())
      .then(data => setBookedDates(data.bookedDates))
  }, [])

  const isDateBooked = (date: string) => bookedDates.includes(date)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/book', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    alert('Booking Submitted!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* name, email inputs same */}
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
        className={`w-full p-2 border ${isDateBooked(formData.date) ? 'bg-red-100' : ''}`}
      />
      {/* rest of form same */}
      <button type="submit" disabled={isDateBooked(formData.date)} className="bg-black text-amber-300 px-4 py-2 rounded">
        Book Now
      </button>
    </form>
  )
}
