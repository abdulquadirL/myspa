'use client'

import BookingTable from "@/components/admin/BookingTable"
import NotificationSound from "@/components/admin/NotificationSound"
import Filters from "@/components/Dashboard/Filters"
import Greeting from "@/components/Dashboard/Greeting"
import { SetStateAction } from "react"


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Greeting />
      <Filters search={""} setSearch={function (value: SetStateAction<string>): void {
              throw new Error("Function not implemented.")
          } } statusFilter={""} setStatusFilter={function (value: SetStateAction<string>): void {
              throw new Error("Function not implemented.")
          } } serviceFilter={""} setServiceFilter={function (value: SetStateAction<string>): void {
              throw new Error("Function not implemented.")
          } } dateFilter={""} setDateFilter={function (value: SetStateAction<string>): void {
              throw new Error("Function not implemented.")
          } } onExportCSV={function (): void {
              throw new Error("Function not implemented.")
          } } filters={{
              service: undefined,
              status: undefined,
              date: undefined,
              search: undefined,
              statusFilter: undefined,
              serviceFilter: undefined,
              dateFilter: undefined
          }} onChange={function (newFilters: Partial<{ service?: string; status?: string; date?: string; search?: string; statusFilter?: string; serviceFilter?: string; dateFilter?: string }>): void {
              throw new Error("Function not implemented.")
          } } />
      <BookingTable />
      <NotificationSound />
    </div>
  )
}