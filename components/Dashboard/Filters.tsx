// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// // ...other imports

// // Define FiltersState type if not already defined or imported
// export type FiltersState = {
//   status: string;
//   search: string;
//   statusFilter: string;
//   service: string;
//   serviceFilter: string;
//   startDateFilter?: string;
//   endDateFilter?: string;
//   date: string;
//   dateFilter: string;
// };



// // const Filters = ({ filters, onChange }: FiltersProps) => {
// //   // ...component code
// // };

// export type FiltersProps = {
//   filters: FiltersState;
//   onChange: (newFilters: Partial<FiltersState>) => void;
//   search: string;
//   setSearch: (val: string) => void;
//   statusFilter: string;
//   setStatusFilter: (val: string) => void;
//   serviceFilter: string;
//   setServiceFilter: (val: string) => void;
//   startDateFilter?: string; // Optional for future use
//   setStartDateFilter?: (val: string) => void; // Optional for future use
//   endDateFilter?: string; // Optional for future use
//   setEndDateFilter?: (val: string) => void; // Optional for future use
//   dateFilter: string;
//   setDateFilter: (val: string) => void;
//   onExportCSV: () => void;
// };

// const Filters: React.FC<FiltersProps> = ({
//   search,
//   setSearch,
//   statusFilter,
//   setStatusFilter,
//   serviceFilter,
//   setServiceFilter,
//   endDateFilter,
//   setDateFilter,
//   onExportCSV,
// }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [services, setServices] = useState<string[]>([]);

//   // Sync state with URL query params on mount
//   useEffect(() => {
//     if (!searchParams) return;

//     setSearch(searchParams.get('search') || '');
//     setStatusFilter(searchParams.get('status') || '');
//     setServiceFilter(searchParams.get('service') || '');
//     setDateFilter(searchParams.get('date') || '');
//   }, [searchParams, setSearch, setStatusFilter, setServiceFilter, setDateFilter]);

//   // Fetch services dynamically from Supabase
//   useEffect(() => {
//     const supabase = createClientComponentClient();

//     async function fetchServices() {
//       const { data, error } = await supabase
//         .from('services') // replace with your table name for services
//         .select('name');

//       if (error) {
//         console.error('Error fetching services:', error.message);
//         return;
//       }

//       if (data) {
//         setServices(data.map((item) => item.name));
//       }
//     }

//     fetchServices();
//   }, []);

//   // Update URL query params on filter change
//   useEffect(() => {
//     const params = new URLSearchParams();

//     if (search) params.set('search', search);
//     if (statusFilter) params.set('status', statusFilter);
//     if (serviceFilter) params.set('service', serviceFilter);
//     if (endDateFilter) params.set('date', endDateFilter);

//     // Replace URL without refreshing page
//     router.replace(`${window.location.pathname}?${params.toString()}`);
//   }, [search, statusFilter, serviceFilter, endDateFilter, router]);

//   const resetFilters = () => {
//     setSearch('');
//     setStatusFilter('');
//     setServiceFilter('');
//     setDateFilter('');
//     router.replace(window.location.pathname); // clear URL params
//   };

//   return (
//     <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
//       <input
//         type="text"
//         placeholder="🔍 Search bookings..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="p-2 rounded border dark:bg-zinc-800 dark:text-white"
//       />

//       <div className="flex flex-wrap gap-2">
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="p-2 rounded border dark:bg-zinc-800 dark:text-white"
//         >
//           <option value="">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         <select
//           value={serviceFilter}
//           onChange={(e) => setServiceFilter(e.target.value)}
//           className="p-2 rounded border dark:bg-zinc-800 dark:text-white"
//         >
//           <option value="">All Services</option>
//           {services.map((service) => (
//             <option key={service} value={service}>
//               {service}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           value={endDateFilter}
//           onChange={(e) => setDateFilter(e.target.value)}
//           className="p-2 rounded border dark:bg-zinc-800 dark:text-white"
//         />

//         <button
//           onClick={onExportCSV}
//           className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
//         >
//           📁 Export CSV
//         </button>

//         <button
//           onClick={resetFilters}
//           className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700"
//           title="Reset all filters"
//         >
//           🔄 Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Filters;

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [service, setService] = useState(searchParams.get("service") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data.map((s) => s.name));
        }
      });
  }, []);

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (service) params.set("service", service);
    if (date) params.set("date", date);

    router.push(`/admin/dashboard?${params.toString()}`);
  };

  const resetFilters = () => {
    setService("");
    setDate("");
    router.push("/admin/dashboard");
  };

  return (
    <div className="flex flex-wrap gap-4 items-end justify-between mb-6">
      <div className="flex flex-col">
        <label htmlFor="service" className="text-sm font-medium">Service</label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
        >
          <option value="">All</option>
          {services.map((svc) => (
            <option key={svc} value={svc}>
              {svc}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="date" className="text-sm font-medium">Date</label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
}
