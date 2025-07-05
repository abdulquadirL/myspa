// "use client";

// import { motion } from "framer-motion";

// export default function Greeting({ name }: { name: string }) {
//   return (
//     <motion.h1
//       className="text-2xl font-semibold text-emerald-700 dark:text-amber-300"
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       Welcome back, {name} 👋
//     </motion.h1>
//   );
// }

'use client'
import { useSession } from 'next-auth/react'

export default function Greeting() {
  const { data: session } = useSession()
  return <h1 className="text-2xl font-bold">Welcome, {session?.user?.name || 'Admin'} 👋</h1>
}

