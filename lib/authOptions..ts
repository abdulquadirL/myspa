import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials?.email)
          .single()

        if (error || !user) return null

        const isValid = await bcrypt.compare(credentials!.password, user.password)

        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token } : { session: any; token: any }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
        }
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
