// File: app/admin/login/layout.tsx
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  )
}
