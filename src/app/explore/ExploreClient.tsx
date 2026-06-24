'use client'

import { useState } from 'react'
import type { Library } from '@/lib/queries/libraries'
import LibraryList from './LibraryList'

export default function ExploreClient({ libraries }: { libraries: Library[] }) {
  const [view, setView] = useState<'list' | 'map'>('list')

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <header className="border-b border-[#E5DFD0] px-6 py-5">
        <h1 className="text-2xl font-semibold text-[#2B2620]">Explore Libraries</h1>
        <p className="text-sm text-[#6B6354] mt-1">
          {libraries.length} {libraries.length === 1 ? 'library' : 'libraries'} found
        </p>
      </header>

      <div className="px-6 py-4 flex gap-2">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            view === 'list'
              ? 'bg-[#2B2620] text-[#FAF7F0]'
              : 'bg-transparent text-[#6B6354] hover:bg-[#EFE9DA]'
          }`}
        >
          List
        </button>
        <button
          onClick={() => setView('map')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            view === 'map'
              ? 'bg-[#2B2620] text-[#FAF7F0]'
              : 'bg-transparent text-[#6B6354] hover:bg-[#EFE9DA]'
          }`}
        >
          Map
        </button>
      </div>

      <main className="px-6 pb-10">
        {libraries.length === 0 ? (
          <div className="text-center py-20 text-[#6B6354]">
            <p className="text-lg font-medium">No libraries found yet</p>
            <p className="text-sm mt-1">Run the ingestion script to add libraries for your area.</p>
          </div>
        ) : view === 'list' ? (
          <LibraryList libraries={libraries} />
        ) : (
          <div className="text-center py-20 text-[#6B6354] bg-white border border-[#E5DFD0] rounded-lg">
            <p className="text-lg font-medium">Map view coming soon</p>
            <p className="text-sm mt-1">Browse the list for now — pins are on the way.</p>
          </div>
        )}
      </main>
    </div>
  )
}