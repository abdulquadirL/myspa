'use client'
import { useEffect, useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

interface Booking {
  id: string
  name: string
  email: string
  date: string
  services: string[]
  created_at: string
}

export default function BookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .finally(() => setLoading(false))
  }, [])

  const exportToCSV = () => {
    const rows = [
      ['Name', 'Email', 'Date', 'Services', 'Created At'],
      ...bookings.map(b => [
        b.name,
        b.email,
        b.date,
        b.services.join('; '),
        format(new Date(b.created_at), 'dd MMM yyyy HH:mm')
      ])
    ]

    const csvContent = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'bookings.csv'
    link.click()
  }

  if (loading) {
    return <div className="flex items-center gap-2"><Loader2 className="animate-spin" /> Loading bookings...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Bookings</h2>
        <button onClick={exportToCSV} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-1 rounded hover:bg-emerald-700">
          <Download size={16} /> Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Services</th>
              <th className="p-2 border">Created</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className="hover:bg-amber-100 dark:hover:bg-amber-900">
                <td className="p-2 border">{booking.name}</td>
                <td className="p-2 border">{booking.email}</td>
                <td className="p-2 border">{booking.date}</td>
                <td className="p-2 border">{booking.services.join(', ')}</td>
                <td className="p-2 border">{format(new Date(booking.created_at), 'dd MMM yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
