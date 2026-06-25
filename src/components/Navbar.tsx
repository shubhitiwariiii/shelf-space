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
    <nav className="bg-white border-b border-[#E5DFD0] px-6 py-3 flex items-center justify-between">
      <Link href="/" className="font-semibold text-[#2B2620]">
        ShelfSpace
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link href="/explore" className="text-[#6B6354] hover:text-[#2B2620]">
          Explore
        </Link>

        {user ? (
          <>
            <Link href="/dashboard" className="text-[#6B6354] hover:text-[#2B2620]">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-[#6B6354] hover:text-[#2B2620]"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-[#6B6354] hover:text-[#2B2620]">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#2B2620] text-[#FAF7F0] px-3 py-1.5 rounded-md font-medium"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}