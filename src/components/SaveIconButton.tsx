'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SaveIconButton({ libraryId }: { libraryId: string }) {
  const [isSaved, setIsSaved] = useState(false)
  const [checking, setChecking] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkSavedStatus() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setChecking(false)
        return
      }

      setUserId(user.id)

      const { data } = await supabase
        .from('saved_libraries')
        .select('id')
        .eq('user_id', user.id)
        .eq('library_id', libraryId)
        .maybeSingle()

      setIsSaved(!!data)
      setChecking(false)
    }

    checkSavedStatus()
  }, [libraryId, supabase])

  async function handleToggleSave(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!userId) {
      router.push(`/login?redirect=/explore&save=${libraryId}`)
      return
    }

    if (isSaved) {
      const { error } = await supabase
        .from('saved_libraries')
        .delete()
        .eq('user_id', userId)
        .eq('library_id', libraryId)

      if (!error) setIsSaved(false)
    } else {
      const { error } = await supabase
        .from('saved_libraries')
        .insert({ user_id: userId, library_id: libraryId })

      if (!error) setIsSaved(true)
    }
  }

  if (checking) {
    return <div className="w-7 h-7 rounded-full bg-[#332D24] animate-pulse" />
  }

  return (
    <button
      onClick={handleToggleSave}
      aria-label={isSaved ? 'Unsave library' : 'Save library'}
      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isSaved
          ? 'bg-[#2DD4A8] text-[#04342C]'
          : 'bg-[#332D24] text-[#A8A296] hover:bg-[#FF6B47] hover:text-[#2A1505]'
        }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  )
}