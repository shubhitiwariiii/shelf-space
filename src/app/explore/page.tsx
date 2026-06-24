import { getLibraries } from '@/lib/queries/libraries'
import ExploreClient from './ExploreClient'

export default async function ExplorePage() {
  const libraries = await getLibraries()
  return <ExploreClient libraries={libraries} />
}