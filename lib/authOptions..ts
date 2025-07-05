// lib/authOptions.ts
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@/lib/supabase/server'
import { compare } from 'bcryptjs'
import { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const supabase = createClient()
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
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user as any
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
