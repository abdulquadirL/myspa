'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', { redirect: false, email, password })
    if (res?.ok) router.push('/admin/dashboard')
    else setError('Invalid login credentials')
  }

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <form onSubmit={handleLogin} className="bg-white dark:bg-black p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition"
        >
          Login
        </button>
        <p className="text-right text-sm text-emerald-600 hover:underline cursor-pointer">Forgot password?</p>
      </form>
    </motion.div>
  )
}
