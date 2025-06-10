"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Greeting from "@/components/Dashboard/Greeting";
import BookingTable from "@/components/Dashboard/BookingTable";
import useRealTimeBookings from "@/hooks/useRealTimeBookings";
import useNotificationSound from "@/hooks/useNotificationSound";
import Pagination from "@/components/Dashboard/Pagination";
import Filters from "@/components/Dashboard/Filters";
import Dashboard from "@/components/Dashboard/Dashboard";

interface Booking {
  id: number;
  name: string;
  email: string;
  service: string;
  date: string;
  status: string;
  phone?: string;
  created_at?: string;
}

interface FiltersState {
  search: string;
  service: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function DashboardPage({ bookings: initialBookings, userName }: { bookings: Booking[]; userName: string }) {
  // const { data: session } = useSession();
  // const [filters, setFilters] = useState<FiltersState>({
  //   search: "",
  //   service: "",
  //   status: "",
  //   startDate: "",
  //   endDate: "",
  // });
  // const [currentPage, setCurrentPage] = useState(1);
  // const [bookings, setBookings] = useState<Booking[]>(initialBookings || []);
  // const pageSize = 10;
  // const { play } = useNotificationSound();

  // // Fetch bookings when filters or page change
  // useEffect(() => {
  //   async function fetchFilteredBookings() {
  //     const params = new URLSearchParams();
  //     Object.entries(filters).forEach(([key, value]) => {
  //       if (value) params.append(key, value);
  //     });
  //     params.append("page", currentPage.toString());
  //     params.append("pageSize", pageSize.toString());

  //     const res = await fetch(`/api/bookings?${params.toString()}`);
  //     const data = await res.json();
  //     setBookings(data.bookings || []);
  //   }
  //   fetchFilteredBookings();
  // }, [filters, currentPage, pageSize]);

  // // Setup realtime subscription for new bookings
  // useRealTimeBookings({
  //   onNewBooking: (newBooking: any) => {
  //     // Convert id to number to match local Booking type
  //     const bookingWithNumberId = { ...newBooking, id: Number(newBooking.id) };
  //     setBookings((prev) => [bookingWithNumberId, ...prev]);
  //     play();
  //   }
  // });

  // // Filter handlers
  // const handleFiltersChange = (newFilters: Partial<FiltersState>) => {
  //   setFilters((prev) => ({ ...prev, ...newFilters }));
  //   setCurrentPage(1); // reset page on filter change
  // };

  // // Export CSV function
  // const exportCSV = () => {
  //   const csvHeader = "ID,Name,Email,Service,Date,Status,Phone\n";
  //   const csvRows = bookings.map(b =>
  //     [b.id, b.name, b.email, b.service, b.date, b.status, b.phone ?? ""].join(",")
  //   );
  //   const csvContent = [csvHeader, ...csvRows].join("\n");
  //   const blob = new Blob([csvContent], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "bookings.csv";
  //   a.click();
  //   URL.revokeObjectURL(url);
  // };

  // if (!session) {
  //   return <p>Loading...</p>;
  // }

   return (
     <div className="p-6 max-w-7xl mx-auto">
      <Dashboard bookings={[]} userName={""}/>
      {/* <header className="flex justify-between items-center mb-6">
         <Greeting name={userName} />
        <div className="flex space-x-4">
           <button */}
  {/* //           onClick={exportCSV}
  //           className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
  //         >
  //           Export CSV
  //         </button>
  //         <button
  //           onClick={() => signOut()}
  //           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
  //         >
  //           Logout
  //         </button>
  //       </div>
  //     </header>

  //     <Filters
  //       search={filters.search}
  //       setSearch={(search: string) => handleFiltersChange({ search })}
  //       serviceFilter={filters.service}
  //       setServiceFilter={(service: string) => handleFiltersChange({ service })}
  //       statusFilter={filters.status}
  //       setStatusFilter={(status: string) => handleFiltersChange({ status })}
  //       startDateFilter={filters.startDate}
  //       setStartDateFilter={(startDate: string) => handleFiltersChange({ startDate })}
  //       endDateFilter={filters.endDate}
  //       setEndDateFilter={(endDate: string) => handleFiltersChange({ endDate })}
  //       onExportCSV={exportCSV} dateFilter={""} setDateFilter={function (val: string): void {
          
  //       } }      />

  //     <BookingTable  />

  //     <Pagination
  //       currentPage={currentPage}
  //       onPageChange={setCurrentPage}
  //       totalPages={Math.ceil(bookings.length / pageSize)} 
  //     /> */}
    </div>
  );
}
