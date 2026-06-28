import type { Library } from '@/lib/queries/libraries'
import { calculateDistance } from '@/lib/distance'
import Link from 'next/link'
import SaveIconButton from '@/components/SaveIconButton'

export default function LibraryList({
  libraries,
  userLocation,
}: {
  libraries: Library[]
  userLocation?: { lat: number; lng: number } | null
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {libraries.map((lib) => {
        const distance = userLocation
          ? calculateDistance(userLocation.lat, userLocation.lng, lib.lat, lib.lng)
          : null

        return (
          <Link
            key={lib.id}
            href={`/library/${lib.id}`}
            className="group relative block bg-[#1F1B16] border border-[#332D24] rounded-lg p-5 hover:border-[#FF6B47] transition-colors"
          >
            <div className="absolute top-4 right-4">
              <SaveIconButton libraryId={lib.id} />
            </div>

            <p className="text-[10px] tracking-widest uppercase text-[#FF6B47] mb-2 pr-10">
              {distance !== null
                ? distance < 1
                  ? `${Math.round(distance * 1000)} m away`
                  : `${distance.toFixed(1)} km away`
                : lib.locality || lib.district}
            </p>
            <h3 className="font-serif text-lg text-[#F7F4EC] group-hover:text-white transition-colors pr-10">
              {lib.name}
            </h3>
            <p className="text-xs text-[#6B6560] mt-3">
              {lib.locality ? `${lib.district}, ` : ''}{lib.state}
            </p>
          </Link>
        )
      })}
    </div>
  )
}