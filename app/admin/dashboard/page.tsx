'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const pageSize = 10;

interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  date: string;
  status?: string;
  created_at?: string;
  [key: string]: string | undefined;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const soundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchBookings();

const channel = supabase
  .channel('realtime:bookings')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'bookings',
    },
    (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookings((prev) => [payload.new as Booking, ...prev]);
            soundRef.current?.play();
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
              navigator.vibrate(200);
            }
          }
        }
      )
  .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
    } else {
      setBookings(data || []);
    }
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );

      const updated = bookings.find((b) => b.id === id);
      if (updated) {
        await fetch('/api/notify', {
          method: 'POST',
          body: JSON.stringify({ to: updated.email, name: updated.name, status }),
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  }

  function exportCSV() {
    const csv = [
      ['Name', 'Email', 'Service', 'Date', 'Status'],
      ...bookings.map((b) => [
        b.name,
        b.email,
        b.service,
        format(new Date(b.date), 'yyyy-MM-dd'),
        b.status || 'pending',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, `bookings-${Date.now()}.csv`);
  }

  const filteredBookings = bookings
    .filter(
      (b) =>
        !search ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.email.toLowerCase().includes(search.toLowerCase()) ||
        b.service.toLowerCase().includes(search.toLowerCase())
    )
    .filter((b) => !selectedService || b.service === selectedService);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (status === 'loading')
    return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {session?.user?.name || 'Admin'} 👋
        </h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-full md:w-64"
        />

        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="border px-2 py-1 rounded w-full md:w-64"
        >
          <option value="">All Services</option>
          {[...new Set(bookings.map((b) => b.service))].map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
        >
          Export to CSV
        </button>
      </div>

      <table className="w-full table-auto border border-collapse">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="border p-2">{booking.name}</td>
              <td className="border p-2">{booking.email}</td>
              <td className="border p-2">{booking.service}</td>
              <td className="border p-2">
                {format(new Date(booking.date), 'yyyy-MM-dd')}
              </td>
              <td className="border p-2 capitalize">
                {booking.status || 'pending'}
              </td>
              <td className="border p-2">
                <select
                  value={booking.status}
                  onChange={(e) => updateStatus(booking.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage * pageSize >= filteredBookings.length}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
        >
          Next
        </button>
      </div>

      <audio ref={soundRef} src="/notification.mp3" preload="auto" />
    </div>
  );
}
