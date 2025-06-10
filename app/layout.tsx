"use client";

import "./globals.css";
import { ReactNode } from "react";
import React from "react";
import BookingModal from "@/components/BookingModal";
import AppProviders from "@/components/AppProviders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-amber-200 text-gray-800 dark:bg-gray-800 dark:text-amber-300">
        <AppProviders>
          {/* Navigation bar */}
          <Navbar />
          <span
            id="sr-notify"
            aria-live="polite"
            className="sr-only"
          />

          {/* Booking modal */}
          <BookingModal />
          {/* Main content */}
          <main className="min-h-screen">{children}</main>
          {/* Footer */}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
