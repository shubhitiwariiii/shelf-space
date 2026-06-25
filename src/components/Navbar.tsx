'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [supabase])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="bg-[#1F1B16] border-b border-[#332D24] px-6 py-3 flex items-center justify-between">
      <Link href="/" className="font-serif text-lg text-[#F7F4EC]">
        ShelfSpace
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link href="/explore" className="text-[#A8A296] hover:text-[#F7F4EC]">
          Explore
        </Link>

        {user ? (
          <>
            <Link href="/dashboard" className="text-[#A8A296] hover:text-[#F7F4EC]">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="text-[#A8A296] hover:text-[#F7F4EC]">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-[#A8A296] hover:text-[#F7F4EC]">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#FF6B47] text-[#2A1505] px-3 py-1.5 rounded-md font-medium"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}