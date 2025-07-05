// import { authOptions as rawAuthOptions } from '@/lib/authOptions.'
// import NextAuth, { SessionStrategy, AuthOptions } from 'next-auth'

// // Ensure session.strategy is typed as "jwt" or "database"
// const sessionStrategy: SessionStrategy =
//   rawAuthOptions.session && rawAuthOptions.session.strategy === 'database'
//     ? 'database'
//     : 'jwt';

// const authOptions: AuthOptions = {
//   ...rawAuthOptions,
//   session: {
//     ...rawAuthOptions.session,
//     strategy: sessionStrategy,
//   },
// };

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@/lib/supabase/server'
import { compare } from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          { auth: { persistSession: false } }
        )

        const { data, error } = await supabase
          .from('admins')
          .select('*')
          .eq('email', credentials?.email)
          .single()

        if (!data || error) return null

        const isValid = await compare(credentials!.password, data.password)
        if (!isValid) return null

        return {
          id: data.id,
          name: data.email,
          email: data.email,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.user) session.user = token.user as any
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
