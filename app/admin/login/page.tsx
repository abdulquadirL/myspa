// 'use client'

// import { useState } from 'react'
// import { signIn } from 'next-auth/react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { motion } from 'framer-motion'

// export default function AdminLoginPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const result = await signIn('credentials', {
//       redirect: false,
//       username,
//       password,
//       callbackUrl,
//     })

//     if (result?.error) {
//       setError('Invalid credentials')
//     } else {
//       router.push(callbackUrl)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-black dark:to-gray-900 px-4">
//       <motion.div
//         className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-sm border dark:border-gray-700"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: 'easeOut' }}
//       >
//         <h1 className="text-2xl font-semibold text-center mb-6 text-emerald-700 dark:text-amber-400">
//           Admin Login
//         </h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-amber-200">
//               Username
//             </label>
//             <input
//               type="text"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//               placeholder="admin"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-amber-200">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//               placeholder="••••••"
//             />
//           </div>
//           {error && <p className="text-sm text-red-600">{error}</p>}

//           <div className="flex items-center justify-between text-sm mt-2">
//             <span className="text-gray-500 dark:text-amber-300">
//               <a href="#" className="hover:underline">
//                 Forgot password?
//               </a>
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
//           >
//             Login
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.ok) {
      toast.success('Login successful!')
      router.push('/admin/dashboard')
    } else {
      toast.error('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-black px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg max-w-sm w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-amber-600 dark:text-amber-400">
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded border bg-white dark:bg-zinc-800 dark:border-zinc-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded border bg-white dark:bg-zinc-800 dark:border-zinc-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-center text-sm mt-2 text-zinc-600 dark:text-zinc-400">
          Forgot your password? Contact admin support.
        </p>
      </form>
    </div>
  )
}

