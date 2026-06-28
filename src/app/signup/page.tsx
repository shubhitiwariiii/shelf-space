'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#15130F] flex items-center justify-center px-4">
      <form
        onSubmit={handleSignup}
        className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-8 w-full max-w-sm"
      >
        <h1 className="font-serif text-xl text-[#F7F4EC]">Create your account</h1>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full bg-[#15130F] border border-[#332D24] rounded-md px-3 py-2 text-sm text-[#F7F4EC] placeholder:text-[#6B6560] focus:outline-none focus:border-[#FF6B47]"
          />
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
            minLength={6}
            className="w-full bg-[#15130F] border border-[#332D24] rounded-md px-3 py-2 text-sm text-[#F7F4EC] placeholder:text-[#6B6560] focus:outline-none focus:border-[#FF6B47]"
          />
        </div>

        {error && <p className="text-sm text-[#F0997B] mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-[#FF6B47] text-[#2A1505] rounded-md py-2.5 text-sm font-medium `disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>

        <p className="text-sm text-[#A8A296] mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-[#F7F4EC] font-medium underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}