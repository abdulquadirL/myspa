// app/admin/layout.tsx
import '../globals.css';
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import MobileNavToggle from '@/components/MobileNavToggle';
import ThemeToggle from '@/components/ThemeToggle';
import { authOptions } from '@/lib/authOptions.';

export const metadata = {
  title: 'Admin | Nirvana De Spa',
  description: 'Manage bookings and spa operations.',
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/admin/login');
  }

  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-black dark:text-white flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 relative p-4 md:p-8">
          <MobileNavToggle />
          <ThemeToggle />
          {children}
        </main>
      </body>
    </html>
  );
}
