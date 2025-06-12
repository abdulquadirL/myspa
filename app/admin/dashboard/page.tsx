
// import { getServerSession } from "next-auth";

// import { redirect } from "next/navigation";
// import { supabase } from "@/lib/supabase";
// import BookingTable from "@/components/Dashboard/BookingTable";
// import Filters from "@/components/Dashboard/Filters";
// import Greeting from "@/components/Dashboard/Greeting";
// import LogoutButton from "@/components/Dashboard/LogoutButton";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import Pagination from "@/components/Dashboard/Pagination";

// export default async function DashboardPage({
//   searchParams,
// }: {
//   searchParams?: Record<string, string | string[] | undefined>;
// }) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user || session.user.role !== "admin") {
//     return redirect("/admin/login");
//   }

//   const userName = session.user.name ?? "Admin";
//   const page = parseInt(searchParams?.page?.toString() || "1");
//   const serviceFilter = searchParams?.service?.toString() || "";
//   const dateFilter = searchParams?.date?.toString() || "";

//   const pageSize = 10;
//   const from = (page - 1) * pageSize;
//   const to = from + pageSize - 1;

//   let query = supabase
//     .from("bookings")
//     .select("*", { count: "exact" })
//     .order("created_at", { ascending: false })
//     .range(from, to);

//   if (serviceFilter) {
//     query = query.eq("service", serviceFilter);
//   }

//   if (dateFilter) {
//     query = query.eq("date", dateFilter);
//   }

//   const { data: bookings = [], count = 0 } = await query;

//   return (
//     <div className="p-4 space-y-4">
//       <div className="flex justify-between items-center">
//         <Greeting name={userName} />
//         <LogoutButton />
//       </div>

//       <Filters
//         filters={{
//           search: "",
//           service: serviceFilter,
//           status: "",
//           statusFilter: "",
//           serviceFilter: serviceFilter,
//           date: "",
//           dateFilter: dateFilter,
//         }}
//         onChange={() => {}}
//         search={""}
//         setSearch={() => {}}
//         statusFilter={""}
//         setStatusFilter={() => {}}
//         serviceFilter={serviceFilter}
//         setServiceFilter={() => {}}
//         dateFilter={dateFilter}
//         setDateFilter={() => {}}
//         onExportCSV={() => {}}
//       />

//       <BookingTable />

//       <Pagination
//         currentPage={page}
//         totalPages={Math.ceil((count ?? 0) / pageSize)}
//         onPageChange={(newPage: number) => {
//           // This will redirect to the new page with updated searchParams
//           'use client';
//           window.location.search = `?page=${newPage}${serviceFilter ? `&service=${serviceFilter}` : ""}${dateFilter ? `&date=${dateFilter}` : ""}`;
//         }}
//       />
//     </div>
//   );
// }

import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import BookingTable from "@/components/Dashboard/BookingTable";
import Filters from "@/components/Dashboard/Filters";
import Greeting from "@/components/Dashboard/Greeting";
import Pagination from "@/components/Dashboard/Pagination";
import { getFilteredBookings } from "@/lib/queries";


const PAGE_SIZE = 10; // Define your page size here

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    page = "1",
    service,
    date,
  } = searchParams || {};

  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1", 10);
  const selectedService = Array.isArray(service) ? service[0] : service;
  const selectedDate = Array.isArray(date) ? date[0] : date;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/admin/login");
  }

  const { bookings, totalCount } = await getFilteredBookings({
    page: currentPage,
    pageSize: PAGE_SIZE,
    filters: {
      service: selectedService,
      date: selectedDate,
    },
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Greeting name={user.user_metadata?.name || user.email || "Admin"} />
      <Filters />
      <Suspense fallback={<p>Loading bookings...</p>}>
        <BookingTable  />
      </Suspense>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage: number) => {
          "use client";
          window.location.search = `?page=${newPage}${selectedService ? `&service=${selectedService}` : ""}${selectedDate ? `&date=${selectedDate}` : ""}`;
        }}
      />
    </div>
  );
}
