import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl
      // Allow public access to login page
      if (pathname === '/admin/login') return true

      // Require token for all other /admin routes
      return !!token
    },
  },
})

export const config = {
  matcher: ['/admin/:path*'],
}