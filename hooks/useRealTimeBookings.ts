'use client';

import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';

export type Booking = {
  id: string;
  name: string;
  email: string;
  service: string;
  phone: string;
  date: string;
  status: string;
  created_at: string;
};

type UseRealTimeBookingsOptions = {
  onNewBooking?: (booking: Booking) => void;
};

const useRealTimeBookings = ({ onNewBooking }: UseRealTimeBookingsOptions) => {
  useEffect(() => {
    const channel = supabase
      .channel('realtime:bookings')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookings',
        },
        (payload: { new: Booking }) => {
          const newBooking = payload.new as Booking;
          console.log('🔔 New booking received:', newBooking);

          if (onNewBooking) {
            onNewBooking(newBooking);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onNewBooking]);
};

export default useRealTimeBookings;
