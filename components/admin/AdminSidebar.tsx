// 1. components/admin/Sidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/analytics', label: 'Analytics' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-gray-100 dark:bg-gray-900 border-r hidden md:block">
      <div className="p-6 font-bold text-xl">Admin</div>
      <nav className="flex flex-col gap-2 px-4">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'px-4 py-2 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900',
              pathname === link.href && 'bg-emerald-200 dark:bg-emerald-800 font-semibold'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}



