'use client'

import { useState, useMemo } from 'react'
import type { Library } from '@/lib/queries/libraries'
import LibraryList from './LibraryList'

export default function ExploreClient({ libraries }: { libraries: Library[] }) {
  const [view, setView] = useState<'list' | 'map'>('list')
  const [districtFilter, setDistrictFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const districtCounts = useMemo(() => {
    const counts = new Map<string, number>()
    libraries.forEach((lib) => {
      counts.set(lib.district, (counts.get(lib.district) ?? 0) + 1)
    })
    return counts
  }, [libraries])

  const districts = useMemo(
    () => Array.from(districtCounts.keys()).sort(),
    [districtCounts]
  )

  const filteredLibraries = useMemo(() => {
    return libraries.filter((lib) => {
      const matchesDistrict = districtFilter === 'all' || lib.district === districtFilter
      const matchesSearch =
        searchQuery.trim() === '' ||
        lib.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      return matchesDistrict && matchesSearch
    })
  }, [libraries, districtFilter, searchQuery])

  return (
    <div className="min-h-screen bg-[#15130F]">
      <header className="border-b border-[#332D24] px-6 py-5">
        <h1 className="font-serif text-2xl text-[#F7F4EC]">Explore Libraries</h1>
        <p className="text-sm text-[#A8A296] mt-1">
          {filteredLibraries.length} of {libraries.length}{' '}
          {libraries.length === 1 ? 'library' : 'libraries'} shown
          {searchQuery.trim() !== '' && ` for "${searchQuery.trim()}"`}
        </p>
      </header>

      <div className="px-6 pt-5">
        {/* District tabs */}
        <div className="flex gap-6 border-b border-[#332D24] overflow-x-auto">
          <TabButton
            active={districtFilter === 'all'}
            onClick={() => setDistrictFilter('all')}
          >
            All ({libraries.length})
          </TabButton>
          {districts.map((d) => (
            <TabButton
              key={d}
              active={districtFilter === d}
              onClick={() => setDistrictFilter(d)}
            >
              {d} ({districtCounts.get(d)})
            </TabButton>
          ))}
        </div>

        {/* Search */}
        <div className="py-4 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search libraries by name..."
            className="w-full bg-[#1F1B16] border border-[#332D24] rounded-md px-4 py-2.5 text-sm text-[#F7F4EC] placeholder:text-[#6B6560] focus:outline-none focus:border-[#FF6B47]"
          />
        </div>

        {/* List/Map toggle */}
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
      </div>

      <main className="px-6 pb-10">
        {libraries.length === 0 ? (
          <div className="text-center py-20 text-[#A8A296]">
            <p className="text-lg font-medium">No libraries found yet</p>
            <p className="text-sm mt-1">Run the ingestion script to add libraries for your area.</p>
          </div>
        ) : filteredLibraries.length === 0 ? (
          <div className="text-center py-20 text-[#A8A296] bg-[#1F1B16] border border-[#332D24] rounded-lg">
            <p className="text-lg font-medium">No libraries match this search</p>
            <p className="text-sm mt-1">Try a different district tab or search term.</p>
          </div>
        ) : view === 'list' ? (
          <LibraryList libraries={filteredLibraries} />
        ) : (
          <div className="text-center py-20 text-[#A8A296] bg-[#1F1B16] border border-[#332D24] rounded-lg">
            <p className="text-lg font-medium">Map view coming soon</p>
            <p className="text-sm mt-1">Browse the list for now — pins are on the way.</p>
          </div>
        )}
      </main>
    </div>
  )
}

function TabButton({
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
      className={`pb-3 px-1 text-sm whitespace-nowrap transition-colors border-b-2 ${
        active
          ? 'text-[#F7F4EC] border-[#FF6B47] font-medium'
          : 'text-[#6B6560] border-transparent hover:text-[#A8A296]'
      }`}
    >
      {children}
    </button>
  )
}