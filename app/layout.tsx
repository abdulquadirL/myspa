'use client';

import './globals.css';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ThemeToggle from '@/components/ThemeToggle';
import useAutoDarkMode from '@/hooks/useAutoDarkMode';



export default function RootLayout({ children }: { children: ReactNode }) {
  useAutoDarkMode(); // Automatically toggle dark mode based on time

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-amber-200 dark:bg-black text-gray-800 dark:text-amber-300">
        <SessionProvider>
          <Navbar />
          <ThemeToggle />
          <BookingModal />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SessionProvider>
        
      </body>
      
    </html>
  );
}


