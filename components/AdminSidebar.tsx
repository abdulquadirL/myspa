'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils' // Optional helper for conditional classnames

const links = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed md:static top-0 left-0 z-40 h-full w-64 bg-gray-100 dark:bg-gray-900 p-6 shadow-lg transition-transform md:translate-x-0 -translate-x-full md:block">
      <h2 className="text-2xl font-bold mb-8 text-amber-600">Nirvana Admin</h2>

      <nav className="space-y-4">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block text-lg transition px-2 py-1 rounded hover:text-amber-500',
              pathname === link.href
                ? 'bg-amber-100 dark:bg-amber-900 text-amber-700'
                : 'text-black dark:text-white'
            )}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          🔓 Logout
        </button>
      </div>
    </aside>
  )
}


