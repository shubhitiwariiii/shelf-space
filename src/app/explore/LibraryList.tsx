import type { Library } from '@/lib/queries/libraries'
import Link from 'next/link'

export default function LibraryList({ libraries }: { libraries: Library[] }) {
  return (
    <div className="grid gap-3 max-w-3xl">
      {libraries.map((lib) => (
        <Link
          key={lib.id}
          href={`/library/${lib.id}`}
          className="block bg-white border border-[#E5DFD0] rounded-lg p-4 hover:border-[#C9BFA3] transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-[#2B2620]">{lib.name}</h3>
              <p className="text-sm text-[#6B6354] mt-0.5">{lib.address}</p>
              <p className="text-xs text-[#9A8F73] mt-1">{lib.district}, {lib.state}</p>
            </div>
            {lib.google_rating && (
              <span className="text-sm font-medium text-[#2B2620] bg-[#F0E9D8] px-2 py-1 rounded">
                ★ {lib.google_rating}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}