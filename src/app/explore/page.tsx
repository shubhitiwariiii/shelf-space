import { Suspense } from 'react'
import { getLibraries } from '@/lib/queries/libraries'
import ExploreClient from './ExploreClient'

function ExploreLoading() {
  return (
    <div className="min-h-screen bg-[#15130F] flex items-center justify-center">
      <p className="text-sm text-[#A8A296]">Loading...</p>
    </div>
  )
}

export default async function ExplorePage() {
  const libraries = await getLibraries()
  return (
    <Suspense fallback={<ExploreLoading />}>
      <ExploreClient libraries={libraries} />
    </Suspense>
  )
}