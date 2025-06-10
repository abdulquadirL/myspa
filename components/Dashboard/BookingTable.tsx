// 'use client';

// import { useEffect, useState, ChangeEvent } from 'react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { format } from 'date-fns';
// import { saveAs } from 'file-saver';
// import Papa from 'papaparse';
// import useRealTimeBookings, { Booking } from '@/hooks/useRealTimeBookings';
// import useNotificationSound from '@/hooks/useNotificationSound';


// export default function BookingTable() {
//   const supabase = createClientComponentClient();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [serviceFilter, setServiceFilter] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [page, setPage] = useState(1);
//   const perPage = 10;
//   const { play } = useNotificationSound();

//   // Real-time listener
//   useRealTimeBookings({
//     onNewBooking: (booking: Booking) => {
//       setBookings((prev) => [booking, ...prev]);
//       play('booking');
//     }
//   });

//   useEffect(() => {
//     const fetchBookings = async () => {
//       const { data, error } = await supabase
//         .from('bookings')
//         .select('*')
//         .order('created_at', { ascending: false });

//       if (!error && data) {
//         setBookings(data as Booking[]);
//       }
//     };

//     fetchBookings();
//   }, [supabase]);

//   // Filtered & paginated bookings
//   const filtered = bookings
//     .filter((b) =>
//       [ b.email, b.phone, b.service]
//         .join(' ')
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     )
//     .filter((b) => (statusFilter ? b.status === statusFilter : true))
//     .filter((b) => (serviceFilter ? b.service === serviceFilter : true))
//     .filter((b) => (dateFilter ? b.date === dateFilter : true));

//   const paginated = filtered.slice((page - 1) * perPage, page * perPage);

//   const exportCSV = () => {
//     const csv = Papa.unparse(filtered);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     saveAs(blob, 'bookings.csv');
//   };

//   // Handlers with explicit typing
//   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
//   const handleStatusFilter = (e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value);
//   const handleServiceFilter = (e: ChangeEvent<HTMLSelectElement>) => setServiceFilter(e.target.value);
//   const handleDateFilter = (e: ChangeEvent<HTMLInputElement>) => setDateFilter(e.target.value);

//   // Pagination helpers
//   const handlePrev = () => setPage((p) => Math.max(1, p - 1));
//   const handleNext = () => setPage((p) => p * perPage < filtered.length ? p + 1 : p);

//   return (
//     <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-md">
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
//         <input
//           type="text"
//           placeholder="🔍 Search bookings..."
//           value={search}
//           onChange={handleSearch}
//           className="p-2 rounded border dark:bg-zinc-800 dark:text-white"
//         />
//         <div className="flex gap-2">
//           <select
//             value={statusFilter}
//             onChange={handleStatusFilter}
//             className="p-2 rounded border dark:bg-zinc-800 dark:text-white"
//           >
//             <option value="">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>

//           <select
//             value={serviceFilter}
//             onChange={handleServiceFilter}
//             className="p-2 rounded border dark:bg-zinc-800 dark:text-white"
//           >
//             <option value="">All Services</option>
//             <option value="Massage">Massage</option>
//             <option value="Facial">Facial</option>
//             <option value="Manicure">Manicure</option>
//           </select>

//           <input
//             type="date"
//             value={dateFilter}
//             onChange={handleDateFilter}
//             className="p-2 rounded border dark:bg-zinc-800 dark:text-white"
//           />

//           <button
//             onClick={exportCSV}
//             className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
//           >
//             📁 Export CSV
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-emerald-600 text-white">
//             <tr>
//               <th className="p-2">Name</th>
//               <th className="p-2">Service</th>
//               <th className="p-2">Date</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginated.map((b) => (
//               <tr key={b.id} className="border-b dark:border-zinc-700">
//                 <td className="p-2">{b.service}</td>
//                 <td className="p-2">{format(new Date(b.date), 'PP')}</td>
//                 <td className="p-2 capitalize">{b.status}</td>
//                 <td className="p-2 space-x-2">
//                   <button className="text-blue-500 hover:underline">
//                     Confirm
//                   </button>
//                   <button className="text-red-500 hover:underline">
//                     Cancel
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4 flex justify-between items-center">
//         <p className="text-gray-600 dark:text-gray-300 text-sm">
//           Showing {paginated.length} of {filtered.length} bookings
//         </p>
//         <div className="space-x-2">
//           <button
//             disabled={page === 1}
//             onClick={handlePrev}
//             className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-white rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <button
//             disabled={page * perPage >= filtered.length}
//             onClick={handleNext}
//             className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 dark:text-white rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Filters from './Filters';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSearchParams } from 'next/navigation';
import useRealTimeBookings, { Booking } from '@/hooks/useRealTimeBookings';

const PAGE_SIZE = 10;

export default function BookingTable() {
  const supabase = createClientComponentClient();
  const searchParams = useSearchParams();

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Pagination
  const [page, setPage] = useState(1);

  // Booking data & loading
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // Real-time update hook (pushes new bookings)
  useRealTimeBookings({
    onNewBooking: (newBooking: Booking) => {
      setBookings((prev) => [newBooking, ...prev]);
    }
  });

  // On mount, sync filters from URL params
  useEffect(() => {
    if (!searchParams) return;

    setSearch(searchParams.get('search') || '');
    setStatusFilter(searchParams.get('status') || '');
    setServiceFilter(searchParams.get('service') || '');
    setDateFilter(searchParams.get('date') || '');
  }, [searchParams]);

  // Fetch bookings whenever filters or page changes
  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);

      let query = supabase.from('bookings').select('*');

      // Filters
      if (search) {
        query = query.ilike('customer_name', `%${search}%`);
      }
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      if (serviceFilter) {
        query = query.eq('service', serviceFilter);
      }
      if (dateFilter) {
        query = query.eq('date', dateFilter);
      }

      // Pagination (offset, limit)
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to).order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching bookings:', error.message);
        setBookings([]);
      } else if (data) {
        setBookings(data);
      }
      setLoading(false);
    }

    fetchBookings();
  }, [search, statusFilter, serviceFilter, dateFilter, page, supabase]);

  // Export CSV function
  const exportCSV = () => {
    if (bookings.length === 0) return alert('No bookings to export.');

    const headers = ['ID', 'Customer Name', 'Email', 'Service', 'Date', 'Status', 'Created At'];
    const rows = bookings.map((b) => [
      b.id,
      b.name,
      b.email,
      b.service,
      b.date,
      b.status,
      new Date(b.created_at).toLocaleString(),
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach((row) => {
      csvContent += row.map((item) => `"${item}"`).join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'bookings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination controls
  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => (p > 1 ? p - 1 : 1));

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded shadow">
      <Filters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        onExportCSV={exportCSV}
      />

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No bookings found.</p>
      ) : (
        <>
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="border border-gray-300 px-3 py-2 text-left">Customer</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Service</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Booked At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="odd:bg-white even:bg-gray-100 dark:odd:bg-zinc-800 dark:even:bg-zinc-700">
                  <td className="border border-gray-300 px-3 py-2">{b.name}</td>
                  <td className="border border-gray-300 px-3 py-2">{b.email}</td>
                  <td className="border border-gray-300 px-3 py-2">{b.service}</td>
                  <td className="border border-gray-300 px-3 py-2">{b.date}</td>
                  <td className="border border-gray-300 px-3 py-2 capitalize">{b.status}</td>
                  <td className="border border-gray-300 px-3 py-2">{new Date(b.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm dark:text-gray-300">Page {page}</span>
            <button
              onClick={nextPage}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
