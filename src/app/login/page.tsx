'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if (loginError) {
      setError(loginError.message)
      setLoading(false)
      return
    }

    const saveLibraryId = searchParams.get('save')
    const redirectTo = searchParams.get('redirect') || '/dashboard'

    if (saveLibraryId && data.user) {
      await supabase
        .from('saved_libraries')
        .insert({ user_id: data.user.id, library_id: saveLibraryId })
        .select()
        .maybeSingle()
      // Ignore errors here (e.g. already saved) — not worth blocking the redirect over
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#15130F] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-8 w-full max-w-sm"
      >
        <h1 className="font-serif text-xl text-[#F7F4EC]">Welcome back</h1>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#15130F] border border-[#332D24] rounded-md px-3 py-2 text-sm text-[#F7F4EC] placeholder:text-[#6B6560] focus:outline-none focus:border-[#FF6B47]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-[#15130F] border border-[#332D24] rounded-md px-3 py-2 text-sm text-[#F7F4EC] placeholder:text-[#6B6560] focus:outline-none focus:border-[#FF6B47]"
          />
        </div>

        {error && <p className="text-sm text-[#F0997B] mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-[#FF6B47] text-[#2A1505] rounded-md py-2.5 text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <p className="text-sm text-[#A8A296] mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#F7F4EC] font-medium underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}