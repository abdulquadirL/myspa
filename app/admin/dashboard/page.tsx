'use client'

import BookingTable from "@/components/admin/BookingTable"
import Filters from "@/components/admin/Filters"
import NotificationSound from "@/components/admin/NotificationSound"



export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Filters />
      <BookingTable />
      <NotificationSound />
    </div>
  )
}