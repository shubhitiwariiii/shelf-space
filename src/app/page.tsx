import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* Hero */}
      <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#B5482F] uppercase mb-4">
              Now mapping Uttar Pradesh
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight text-[#2B2620]">
              Find a place to read,
              <br />
              study, or just think.
            </h1>
            <p className="text-[#6B6354] mt-5 text-base md:text-lg max-w-md">
              Real libraries near you — with pricing, timings, and amenities a
              map pin alone never tells you.
            </p>
            <div className="flex gap-3 mt-8">
              <Link
                href="/explore"
                className="bg-[#2B2620] text-[#FAF7F0] px-5 py-3 rounded-md font-medium text-sm hover:bg-[#1F1B16] transition-colors"
              >
                Explore libraries
              </Link>
              <Link
                href="/signup"
                className="border border-[#2B2620] text-[#2B2620] px-5 py-3 rounded-md font-medium text-sm hover:bg-[#EFE9DA] transition-colors"
              >
                Create account
              </Link>
            </div>
          </div>

          {/* Signature element: a "stamped" library card */}
          <div className="hidden md:flex justify-center">
            <div className="relative -rotate-2">
              <div className="bg-white border border-[#E5DFD0] rounded-sm shadow-sm w-72 p-6">
                <p className="text-[10px] tracking-widest uppercase text-[#9A8F73] border-b border-[#E5DFD0] pb-2 mb-4">
                  Library Record
                </p>
                <p className="font-serif text-lg text-[#2B2620]">Cyber Library</p>
                <p className="text-xs text-[#6B6354] mt-1">Lucknow, Uttar Pradesh</p>

                <div className="mt-5 space-y-2 text-xs text-[#6B6354]">
                  <div className="flex justify-between">
                    <span>Open</span>
                    <span className="text-[#2B2620]">9 AM – 8 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pricing</span>
                    <span className="text-[#2B2620]">₹50 / day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amenities</span>
                    <span className="text-[#2B2620]">WiFi, AC</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 rotate-12 border-2 border-[#B5482F] text-[#B5482F] text-xs font-bold tracking-wider px-3 py-1 rounded-sm bg-[#FAF7F0]">
                VERIFIED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it actually does */}
      <section className="px-6 py-16 border-t border-[#E5DFD0]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-serif text-xl text-[#2B2620]">Pricing, upfront</p>
            <p className="text-sm text-[#6B6354] mt-2">
              See what a seat actually costs before you make the trip.
            </p>
          </div>
          <div>
            <p className="font-serif text-xl text-[#2B2620]">Real timings</p>
            <p className="text-sm text-[#6B6354] mt-2">
              No more showing up to a locked gate. Hours, verified.
            </p>
          </div>
          <div>
            <p className="font-serif text-xl text-[#2B2620]">Amenities that matter</p>
            <p className="text-sm text-[#6B6354] mt-2">
              WiFi, quiet zones, seating — know before you go.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-16 border-t border-[#E5DFD0] text-center">
        <p className="font-serif text-2xl text-[#2B2620] max-w-md mx-auto">
          Your next study spot is closer than you think.
        </p>
        <Link
          href="/explore"
          className="inline-block mt-6 bg-[#2B2620] text-[#FAF7F0] px-6 py-3 rounded-md font-medium text-sm hover:bg-[#1F1B16] transition-colors"
        >
          Start exploring
        </Link>
      </section>
    </div>
  )
}