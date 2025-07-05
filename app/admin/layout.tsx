
import Sidebar from '@/components/admin/AdminSidebar'
import { authOptions } from '@/lib/authOptions.'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen flex bg-white dark:bg-black text-gray-900 dark:text-white">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  )
}
