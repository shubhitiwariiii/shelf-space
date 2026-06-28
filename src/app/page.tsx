import Link from 'next/link'
import { getLibraries } from '@/lib/queries/libraries'

export default async function HomePage() {
  const libraries = await getLibraries()
  const districtCount = new Set(libraries.map((lib) => lib.district)).size
  const previewLibraries = libraries.slice(0, 3)

  return (
    <div className="min-h-screen bg-[#15130F]">
      <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#FF6B47] uppercase mb-4">
              Now mapping Uttar Pradesh
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight text-[#F7F4EC]">
              Stop guessing if the library&apos;s even open.
            </h1>
            <p className="text-[#A8A296] mt-5 text-base md:text-lg max-w-md">
              Real libraries near you — with pricing, timings, and amenities a
              map pin alone never tells you.
            </p>
            <div className="flex gap-3 mt-8">
              <Link
                href="/explore"
                className="bg-[#FF6B47] text-[#2A1505] px-5 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Explore libraries
              </Link>
              <Link
                href="/signup"
                className="border border-[#332D24] text-[#F7F4EC] px-5 py-3 rounded-md font-medium text-sm hover:bg-[#1F1B16] transition-colors"
              >
                Create account
              </Link>
            </div>

            {/* Live stats */}
            <div className="flex gap-6 mt-8 pt-6 border-t border-[#332D24]">
              <div>
                <p className="font-serif text-2xl text-[#F7F4EC]">{libraries.length}</p>
                <p className="text-xs text-[#6B6560] mt-0.5">Libraries mapped</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#F7F4EC]">{districtCount}</p>
                <p className="text-xs text-[#6B6560] mt-0.5">Districts covered</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#F7F4EC]">Free</p>
                <p className="text-xs text-[#6B6560] mt-0.5">Always to browse</p>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-6">
              <div className="flex gap-2 mb-4">
                <span className="bg-[#FF6B47] text-[#2A1505] text-xs font-medium px-2.5 py-1 rounded">
                  ₹50/day
                </span>
                <span className="bg-[#2DD4A8] text-[#04342C] text-xs font-medium px-2.5 py-1 rounded">
                  Open now
                </span>
                <span className="bg-[#A78BFA] text-[#26215C] text-xs font-medium px-2.5 py-1 rounded">
                  WiFi
                </span>
              </div>
              <div className="border-l-2 border-[#FF6B47] pl-4">
                <p className="font-serif text-lg text-[#F7F4EC]">Cyber Library</p>
                <p className="text-xs text-[#A8A296] mt-1">Lucknow, Uttar Pradesh — verified</p>
              </div>
              <div className="mt-5 pt-5 border-t border-[#332D24] space-y-2 text-xs text-[#A8A296]">
                <div className="flex justify-between">
                  <span>Hours</span>
                  <span className="text-[#F7F4EC]">9 AM – 8 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Owner</span>
                  <span className="text-[#F7F4EC]">Verified listing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real library preview */}
      {previewLibraries.length > 0 && (
        <section className="px-6 py-16 border-t border-[#332D24]">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-baseline mb-6">
              <h2 className="font-serif text-xl text-[#F7F4EC]">Already on ShelfSpace</h2>
              <Link href="/explore" className="text-sm text-[#FF6B47] hover:underline">
                View all {libraries.length} →
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {previewLibraries.map((lib) => (
                <Link
                  key={lib.id}
                  href={`/library/${lib.id}`}
                  className="block bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 hover:border-[#FF6B47] transition-colors"
                >
                  <p className="text-[10px] tracking-widest uppercase text-[#FF6B47] mb-2">
                    {lib.locality || lib.district}
                  </p>
                  <p className="font-serif text-[#F7F4EC]">{lib.name}</p>
                  <p className="text-xs text-[#6B6560] mt-2">{lib.state}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What it actually does */}
      <section className="px-6 py-16 border-t border-[#332D24]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <span className="inline-block bg-[#FF6B47] text-[#2A1505] text-xs font-medium px-2 py-1 rounded mb-3">
              Pricing
            </span>
            <p className="font-serif text-xl text-[#F7F4EC]">No surprise costs</p>
            <p className="text-sm text-[#A8A296] mt-2">
              See what a seat actually costs before you make the trip.
            </p>
          </div>
          <div>
            <span className="inline-block bg-[#2DD4A8] text-[#04342C] text-xs font-medium px-2 py-1 rounded mb-3">
              Timings
            </span>
            <p className="font-serif text-xl text-[#F7F4EC]">No locked gates</p>
            <p className="text-sm text-[#A8A296] mt-2">
              Hours that are actually verified, not guessed from a map listing.
            </p>
          </div>
          <div>
            <span className="inline-block bg-[#A78BFA] text-[#26215C] text-xs font-medium px-2 py-1 rounded mb-3">
              Amenities
            </span>
            <p className="font-serif text-xl text-[#F7F4EC]">Know before you go</p>
            <p className="text-sm text-[#A8A296] mt-2">
              WiFi, quiet zones, seating — the details that decide if it's worth the trip.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-[#332D24] text-center">
        <p className="font-serif text-2xl text-[#F7F4EC] max-w-md mx-auto">
          Your next study spot is closer than you think.
        </p>
        <Link
          href="/explore"
          className="inline-block mt-6 bg-[#FF6B47] text-[#2A1505] px-6 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Start exploring
        </Link>
      </section>
    </div>
  )
}