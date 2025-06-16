'use client';

import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSearchParams } from 'next/navigation';
import useRealTimeBookings, { Booking } from '@/hooks/useRealTimeBookings';


type BookingTableProps = {
  bookings: Booking[];
};

const PAGE_SIZE = 10;

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
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
  const [bookingList, setBookingList] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // Real-time update hook (pushes new bookings)
  useRealTimeBookings({
    onNewBooking: (newBooking: Booking) => {
      setBookingList((prev) => [newBooking, ...prev]);
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
        setBookingList([]);
      } else if (data) {
        setBookingList(data);
      }
      setLoading(false);
    }

    fetchBookings();
  }, [search, statusFilter, serviceFilter, dateFilter, page, supabase]);

  // Export CSV function
  const exportCSV = () => {
    if (bookingList.length === 0) return alert('No bookings to export.');

    const headers = ['ID', 'Customer Name', 'Email', 'Service', 'Date', 'Status', 'Created At'];
    const rows = bookingList.map((b) => [
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
        filters={{
          status: '',
          search: '',
          statusFilter: '',
          service: '',
          serviceFilter: '',
          startDateFilter: undefined,
          endDateFilter: undefined,
          date: '',
          dateFilter: ''
        }} onChange={() => {}} />

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading bookings...</p>
      ) : bookingList.length === 0 ? (
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
              {bookingList.map((b) => (
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

export default BookingTable;
