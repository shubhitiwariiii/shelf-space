import type { Library } from '@/lib/queries/libraries'
import Link from 'next/link'

export default function LibraryList({ libraries }: { libraries: Library[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {libraries.map((lib) => (
        <Link
          key={lib.id}
          href={`/library/${lib.id}`}
          className="group relative block bg-[#1F1B16] border border-[#332D24] rounded-lg p-5 hover:border-[#FF6B47] transition-colors"
        >
          <p className="text-[10px] tracking-widest uppercase text-[#FF6B47] mb-2">
            {lib.locality || lib.district}
          </p>
          <h3 className="font-serif text-lg text-[#F7F4EC] group-hover:text-white transition-colors">
            {lib.name}
          </h3>
          <p className="text-xs text-[#6B6560] mt-3">
            {lib.locality ? `${lib.district}, ` : ''}{lib.state}
          </p>
        </Link>
      ))}
    </div>
  )
}