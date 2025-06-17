// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { SupabaseAdapter } from "@next-auth/supabase-adapter"
// import { createServerClient } from "@supabase/ssr"
// import { cookies, headers } from "next/headers"
// import bcrypt from "bcryptjs"

// // Extend NextAuth session user type to include 'id'
// declare module "next-auth" {
//   interface Session {
//     user?: {
//       id?: string
//       name?: string | null
//       email?: string | null
//       image?: string | null
//     }
//   }
// }

// // Configure NextAuth handler
// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null

//         const supabase = createServerClient(
//           process.env.NEXT_PUBLIC_SUPABASE_URL!,
//           process.env.SUPABASE_SERVICE_ROLE_KEY!,
//           { cookies: cookies(), headers: headers() }
//         )

//         const { data: user, error } = await supabase
//           .from("users")
//           .select("*")
//           .eq("email", credentials.email)
//           .single()

//         if (error || !user) return null

//         const isValid = await bcrypt.compare(credentials.password, user.hashed_password)
//         if (!isValid) return null

//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         }
//       },
//     }),
//   ],

//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
//   }),

//   session: {
//     strategy: "jwt",
//   },

//   pages: {
//     signIn: "/admin/login",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.sub = user.id
//       return token
//     },
//     async session({ session, token }) {
//       if (token?.sub && session.user) session.user.id = token.sub
//       return session
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET!,
// })

// // Export GET and POST methods for App Router
// export { handler as GET, handler as POST }


import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import { createServerClient } from "@supabase/ssr"
import { cookies, headers } from "next/headers"
import bcrypt from "bcryptjs"
import { createClient } from "@supabase/supabase-js"

// Extend NextAuth session user type to include 'id'
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          // { cookies: await cookies(), headers: await headers() }
        )

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (error || !user) return null

        const isValid = await bcrypt.compare(credentials.password, user.hashed_password)
        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],

  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/admin/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.sub = user.id
      return token
    },
    async session({ session, token }) {
      if (token?.sub && session.user) session.user.id = token.sub
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
