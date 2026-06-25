'use client'

import { useState } from 'react'
import type { Library } from '@/lib/queries/libraries'
import LibraryList from './LibraryList'

export default function ExploreClient({ libraries }: { libraries: Library[] }) {
  const [view, setView] = useState<'list' | 'map'>('list')

  return (
    <div className="min-h-screen bg-[#15130F]">
      <header className="border-b border-[#332D24] px-6 py-5">
        <h1 className="font-serif text-2xl text-[#F7F4EC]">Explore Libraries</h1>
        <p className="text-sm text-[#A8A296] mt-1">
          {libraries.length} {libraries.length === 1 ? 'library' : 'libraries'} found
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

      <main className="px-6 pb-10">
        {libraries.length === 0 ? (
          <div className="text-center py-20 text-[#A8A296]">
            <p className="text-lg font-medium">No libraries found yet</p>
            <p className="text-sm mt-1">Run the ingestion script to add libraries for your area.</p>
          </div>
        ) : view === 'list' ? (
          <LibraryList libraries={libraries} />
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