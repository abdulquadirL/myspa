
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Extend the Session and User types to include 'role'
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    }
  }
  interface User {
    role?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const supabase = createRouteHandlerClient({ cookies })

        const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
          email: credentials?.email!,
          password: credentials?.password!,
        })

        if (authError || !user) return null

        // Get additional user data (e.g., role)
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('id, email, role')
          .eq('id', user.id)
          .single()

        if (profileError || !profile) return null

        return {
          id: profile.id,
          email: profile.email,
          role: profile.role || 'user',
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: import("next-auth").Session, token: any }) {
      session.user.role = token.role
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
