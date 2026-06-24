'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if (loginError) {
      setError(loginError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white border border-[#E5DFD0] rounded-lg p-8 w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold text-[#2B2620]">Welcome back</h1>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-[#E5DFD0] rounded-md px-3 py-2 text-sm text-[#2B2620] focus:outline-none focus:border-[#2B2620]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-[#E5DFD0] rounded-md px-3 py-2 text-sm text-[#2B2620] focus:outline-none focus:border-[#2B2620]"
          />
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-[#2B2620] text-[#FAF7F0] rounded-md py-2.5 text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <p className="text-sm text-[#6B6354] mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#2B2620] font-medium underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}