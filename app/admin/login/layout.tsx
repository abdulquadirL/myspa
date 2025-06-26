
// /app/admin/login/layout.tsx
import type { ReactNode } from 'react'

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-black text-gray-900 dark:text-amber-300">
        {children}
      </body>
    </html>
  )
}
