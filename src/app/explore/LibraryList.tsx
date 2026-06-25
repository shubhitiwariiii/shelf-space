import type { Library } from '@/lib/queries/libraries'
import Link from 'next/link'

export default function LibraryList({ libraries }: { libraries: Library[] }) {
  return (
    <div className="grid gap-3 max-w-3xl">
      {libraries.map((lib) => (
        <Link
          key={lib.id}
          href={`/library/${lib.id}`}
          className="block bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 hover:border-[#FF6B47]/40 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-serif text-lg text-[#F7F4EC]">{lib.name}</h3>
              <p className="text-sm text-[#A8A296] mt-0.5">{lib.address}</p>
              <p className="text-xs text-[#6B6560] mt-1">{lib.district}, {lib.state}</p>
            </div>
            {lib.google_rating && (
              <span className="text-sm font-medium text-[#04342C] bg-[#2DD4A8] px-2 py-1 rounded">
                ★ {lib.google_rating}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}