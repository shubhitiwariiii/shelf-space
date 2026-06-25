'use client'

import { useState, useMemo } from 'react'
import type { Library } from '@/lib/queries/libraries'
import LibraryList from './LibraryList'

export default function ExploreClient({ libraries }: { libraries: Library[] }) {
  const [view, setView] = useState<'list' | 'map'>('list')
  const [districtFilter, setDistrictFilter] = useState<string>('all')
  const [ratingFilter, setRatingFilter] = useState<string>('all')

  const districts = useMemo(
    () => Array.from(new Set(libraries.map((lib) => lib.district))).sort(),
    [libraries]
  )

  const filteredLibraries = useMemo(() => {
    return libraries.filter((lib) => {
      const matchesDistrict = districtFilter === 'all' || lib.district === districtFilter
      const matchesRating =
        ratingFilter === 'all' ||
        (ratingFilter === 'rated' && lib.google_rating != null) ||
        (ratingFilter === 'unrated' && lib.google_rating == null)
      return matchesDistrict && matchesRating
    })
  }, [libraries, districtFilter, ratingFilter])

  return (
    <div className="min-h-screen bg-[#15130F]">
      <header className="border-b border-[#332D24] px-6 py-5">
        <h1 className="font-serif text-2xl text-[#F7F4EC]">Explore Libraries</h1>
        <p className="text-sm text-[#A8A296] mt-1">
          {filteredLibraries.length} of {libraries.length}{' '}
          {libraries.length === 1 ? 'library' : 'libraries'} shown
        </p>
      </header>

      <div className="px-6 py-4 flex gap-2">
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

      <main className="px-6 pb-10 grid md:grid-cols-[220px_1fr] gap-8 max-w-6xl">
        <aside className="space-y-6">
          <div>
            <p className="text-xs font-medium tracking-wide uppercase text-[#6B6560] mb-3">
              District
            </p>
            <div className="flex flex-col gap-1">
              <FilterButton
                active={districtFilter === 'all'}
                onClick={() => setDistrictFilter('all')}
              >
                All districts
              </FilterButton>
              {districts.map((d) => (
                <FilterButton
                  key={d}
                  active={districtFilter === d}
                  onClick={() => setDistrictFilter(d)}
                >
                  {d}
                </FilterButton>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium tracking-wide uppercase text-[#6B6560] mb-3">
              Rating
            </p>
            <div className="flex flex-col gap-1">
              <FilterButton active={ratingFilter === 'all'} onClick={() => setRatingFilter('all')}>
                All
              </FilterButton>
              <FilterButton
                active={ratingFilter === 'rated'}
                onClick={() => setRatingFilter('rated')}
              >
                Rated only
              </FilterButton>
              <FilterButton
                active={ratingFilter === 'unrated'}
                onClick={() => setRatingFilter('unrated')}
              >
                Unrated
              </FilterButton>
            </div>
          </div>
        </aside>

        <div>
          {libraries.length === 0 ? (
            <div className="text-center py-20 text-[#A8A296]">
              <p className="text-lg font-medium">No libraries found yet</p>
              <p className="text-sm mt-1">Run the ingestion script to add libraries for your area.</p>
            </div>
          ) : filteredLibraries.length === 0 ? (
            <div className="text-center py-20 text-[#A8A296] bg-[#1F1B16] border border-[#332D24] rounded-lg">
              <p className="text-lg font-medium">No libraries match these filters</p>
              <p className="text-sm mt-1">Try a different district or rating filter.</p>
            </div>
          ) : view === 'list' ? (
            <LibraryList libraries={filteredLibraries} />
          ) : (
            <div className="text-center py-20 text-[#A8A296] bg-[#1F1B16] border border-[#332D24] rounded-lg">
              <p className="text-lg font-medium">Map view coming soon</p>
              <p className="text-sm mt-1">Browse the list for now — pins are on the way.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
        active
          ? 'bg-[#FF6B47]/10 text-[#FF6B47] border border-[#FF6B47]/30'
          : 'text-[#A8A296] hover:bg-[#1F1B16] border border-transparent'
      }`}
    >
      {children}
    </button>
  )
}