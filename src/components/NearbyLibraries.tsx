'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { calculateDistance } from '@/lib/distance'
import type { Library } from '@/lib/queries/libraries'

type LocationStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported'

export default function NearbyLibraries({ libraries }: { libraries: Library[] }) {
  const [status, setStatus] = useState<LocationStatus>('idle')
  const [nearby, setNearby] = useState<(Library & { distance: number })[]>([])

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      return
    }

    setStatus('requesting')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        const withDistance = libraries
          .map((lib) => ({
            ...lib,
            distance: calculateDistance(latitude, longitude, lib.lat, lib.lng),
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3)

        setNearby(withDistance)
        setStatus('granted')
      },
      () => {
        setStatus('denied')
      },
      { timeout: 8000 }
    )
  }, [libraries])

  if (status === 'idle' || status === 'requesting') {
    return (
      <section className="px-6 py-16 border-t border-[#332D24]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl text-[#F7F4EC] mb-6">Finding libraries near you...</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 h-24 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (status === 'denied' || status === 'unsupported') {
    return (
      <section className="px-6 py-16 border-t border-[#332D24]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#A8A296]">
            We couldn&apos;t access your location.{' '}
            <Link href="/explore" className="text-[#FF6B47] underline">
              Browse all libraries
            </Link>{' '}
            to find one near you instead.
          </p>
        </div>
      </section>
    )
  }

  if (nearby.length === 0) return null

  return (
    <section className="px-6 py-16 border-t border-[#332D24]">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="font-serif text-xl text-[#F7F4EC]">Closest to you</h2>
          <Link href="/explore" className="text-sm text-[#FF6B47] hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {nearby.map((lib) => (
            <Link
              key={lib.id}
              href={`/library/${lib.id}`}
              className="block bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 hover:border-[#FF6B47] transition-colors"
            >
              <p className="text-[10px] tracking-widest uppercase text-[#FF6B47] mb-2">
                {lib.distance < 1
                  ? `${Math.round(lib.distance * 1000)} m away`
                  : `${lib.distance.toFixed(1)} km away`}
              </p>
              <p className="font-serif text-[#F7F4EC]">{lib.name}</p>
              <p className="text-xs text-[#6B6560] mt-2">
                {lib.locality || lib.district}, {lib.state}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}