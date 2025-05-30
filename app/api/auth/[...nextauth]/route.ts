import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          // You can integrate your own user database here
          return { id: "1", name: "Test User", email: credentials.email }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
})

export { handler as GET, handler as POST }
