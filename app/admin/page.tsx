
"use client"
import dynamic from "next/dynamic";

const BookingTable = dynamic(() => import("@/components/Dashboard/BookingTable"), {
  ssr: false,
  loading: () => <div>Loading bookings...</div>,
});

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
        Bookings Dashboard
      </h1>
      <BookingTable />
      
    </div>
  );
}
