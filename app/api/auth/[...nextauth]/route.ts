import { authOptions as rawAuthOptions } from '@/lib/authOptions.'
import NextAuth, { SessionStrategy, AuthOptions } from 'next-auth'

// Ensure session.strategy is typed as "jwt" or "database"
const sessionStrategy: SessionStrategy =
  rawAuthOptions.session && rawAuthOptions.session.strategy === 'database'
    ? 'database'
    : 'jwt';

const authOptions: AuthOptions = {
  ...rawAuthOptions,
  session: {
    ...rawAuthOptions.session,
    strategy: sessionStrategy,
  },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
