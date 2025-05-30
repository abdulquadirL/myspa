'use client'
import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Sign In</h2>
      <button
        onClick={() => signIn()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Credentials
      </button>
    </div>
  )
}
