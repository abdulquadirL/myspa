'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [service, setService] = useState(searchParams.get('service') || '')

  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (service) params.set('service', service)
    router.replace(`/admin/dashboard?${params.toString()}`)
  }, [search, service])

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="border px-2 py-1 rounded"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select
        value={service}
        onChange={e => setService(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">All Services</option>
        <option value="Massage">Massage</option>
        <option value="Facial">Facial</option>
        <option value="Salon Male">Salon Male</option>
        <option value="Salon Female">Salon Female</option>
        <option value="Body Treatment">Body Treatment</option>
        <option value="Manicure & Pedicure">Manicure & Pedicure</option>
        <option value="Full Spa Package">Full Spa Package</option>
      </select>
    </div>
  )
}