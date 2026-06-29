'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="text-sm text-[#A8A296] hover:text-[#F7F4EC]"
    >
      ← Back to explore
    </button>
  )
}