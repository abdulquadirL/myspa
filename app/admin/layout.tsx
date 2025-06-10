// app/admin/layout.tsx
import "@/app/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Admin Panel | Nirvana De Spa",
  description: "Manage bookings, view analytics, and control your spa services.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-zinc-900 text-gray-800 dark:text-amber-200 min-h-screen">
        <SessionProvider>
          <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
            <header className="text-xl font-bold text-emerald-700 dark:text-amber-300">
              Nirvana Admin Panel
            </header>
            <main>{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
