'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { Library } from '@/lib/queries/libraries'
import { calculateDistance } from '@/lib/distance'
import LibraryList from './LibraryList'

const LibraryMap = dynamic(() => import('./LibraryMap'), {
  ssr: false,
  loading: () => (
    <div className="text-center py-20 text-[#A8A296] bg-[#1F1B16] border border-[#332D24] rounded-lg">
      Loading map...
    </div>
  ),
})

const MAX_DISTANCE_KM = 50

export default function ExploreClient({ libraries }: { libraries: Library[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const urlQuery = searchParams.get('q') || ''
  const urlLat = searchParams.get('lat')
  const urlLng = searchParams.get('lng')

  const [view, setView] = useState<'list' | 'map'>('list')
  const [searchQuery, setSearchQuery] = useState(urlQuery)
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>(
    urlLat && urlLng ? 'granted' : 'idle'
  )

  const userLocation = useMemo(() => {
    return urlLat && urlLng ? { lat: parseFloat(urlLat), lng: parseFloat(urlLng) } : null
  }, [urlLat, urlLng])

  function updateUrl(nextQuery: string, nextLocation: { lat: number; lng: number } | null) {
    const params = new URLSearchParams()
    if (nextQuery.trim()) params.set('q', nextQuery.trim())
    if (nextLocation) {
      params.set('lat', nextLocation.lat.toString())
      params.set('lng', nextLocation.lng.toString())
    }
    const query = params.toString()
    router.push(query ? `/explore?${query}` : '/explore', { scroll: false })
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value)
    updateUrl(value, userLocation)
  }

  function requestLocation() {
    if (!('geolocation' in navigator)) {
      setLocationStatus('denied')
      return
    }

    setLocationStatus('requesting')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = { lat: position.coords.latitude, lng: position.coords.longitude }
        setLocationStatus('granted')
        updateUrl(searchQuery, newLocation)
      },
      () => {
        setLocationStatus('denied')
      },
      { timeout: 8000 }
    )
  }

  const hasSearched = searchQuery.trim() !== '' || userLocation !== null

  const results = useMemo(() => {
    if (!hasSearched) return []

    let filtered = libraries.filter((lib) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        lib.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      return matchesSearch
    })

    if (userLocation) {
      filtered = filtered
        .map((lib) => ({
          ...lib,
          distance: calculateDistance(userLocation.lat, userLocation.lng, lib.lat, lib.lng),
        }))
        .filter((lib) => lib.distance <= MAX_DISTANCE_KM)
        .sort((a, b) => a.distance - b.distance)
    }

    return filtered
  }, [libraries, searchQuery, userLocation, hasSearched])

  return (
    <div className="min-h-screen bg-[#15130F]">
      <header className="border-b border-[#332D24] px-6 py-5">
        <h1 className="font-serif text-2xl text-[#F7F4EC]">Explore Libraries</h1>
        <p className="text-sm text-[#A8A296] mt-1">
          {hasSearched
            ? `${results.length} ${results.length === 1 ? 'library' : 'libraries'} found`
            : 'Search by name or use your location to get started'}
        </p>
      </header>

      <div className="px-6 pt-5">
        <div className="py-4 max-w-md flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search libraries by name..."
            className="flex-1 bg-[#1F1B16] border border-[#332D24] rounded-md px-4 py-2.5 text-sm text-[#F7F4EC] placeholder:text-[#6B6560] focus:outline-none focus:border-[#FF6B47]"
          />
          <button
            onClick={requestLocation}
            disabled={locationStatus === 'requesting'}
            className={`px-4 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              userLocation
                ? 'bg-[#2DD4A8] text-[#04342C]'
                : 'bg-[#1F1B16] border border-[#332D24] text-[#A8A296] hover:border-[#FF6B47]'
            }`}
          >
            {locationStatus === 'requesting' ? 'Locating...' : userLocation ? '✓ Near me' : 'Near me'}
          </button>
        </div>

        {hasSearched && (
          <div className="pb-4 flex gap-2">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'list'
                  ? 'bg-[#FF6B47] text-[#2A1505]'
                  : 'bg-transparent text-[#A8A296] hover:bg-[#1F1B16]'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView('map')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'map'
                  ? 'bg-[#FF6B47] text-[#2A1505]'
                  : 'bg-transparent text-[#A8A296] hover:bg-[#1F1B16]'
              }`}
            >
              Map
            </button>
          </div>
        )}
      </div>

      <main className="px-6 pb-10">
        {!hasSearched ? (
          <div className="text-center py-20 text-[#A8A296]">
            <p className="text-lg font-medium">Find a library to get started</p>
            <p className="text-sm mt-1">
              Type a name or tap &quot;Near me&quot; to search nearby.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 text-[#A8A296] bg-[#1F1B16] border border-[#332D24] rounded-lg">
            <p className="text-lg font-medium">No libraries match</p>
            <p className="text-sm mt-1">
              {userLocation
                ? `Nothing found within ${MAX_DISTANCE_KM}km. Try a search term instead.`
                : 'Try a different search term.'}
            </p>
          </div>
        ) : view === 'list' ? (
          <LibraryList libraries={results} userLocation={userLocation} />
        ) : (
          <LibraryMap libraries={results} />
        )}
      </main>
    </div>
  )
}