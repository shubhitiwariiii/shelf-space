import { getLibraryById } from '@/lib/queries/libraries'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function LibraryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const library = await getLibraryById(id)

  if (!library) notFound()

  const details = library.library_details

  return (
    <div className="min-h-screen bg-[#FAF7F0] px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/explore" className="text-sm text-[#6B6354] hover:text-[#2B2620]">
          ← Back to explore
        </Link>

        <div className="mt-4 bg-white border border-[#E5DFD0] rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-[#2B2620]">{library.name}</h1>
              <p className="text-sm text-[#6B6354] mt-1">{library.address}</p>
              <p className="text-xs text-[#9A8F73] mt-1">
                {library.district}, {library.state}
              </p>
            </div>
            {library.google_rating && (
              <span className="text-sm font-medium text-[#2B2620] bg-[#F0E9D8] px-3 py-1.5 rounded">
                ★ {library.google_rating}
              </span>
            )}
          </div>

          <div className="mt-6 border-t border-[#E5DFD0] pt-6 grid gap-4">
            <DetailRow label="Pricing" value={details?.pricing_info} />
            <DetailRow label="Owner" value={details?.owner_name} />
            <DetailRow label="Contact" value={details?.owner_contact} />
            <DetailRow
              label="Timings"
              value={details?.timings ? formatTimings(details.timings) : null}
            />
            <DetailRow
              label="Amenities"
              value={details?.amenities?.length ? details.amenities.join(', ') : null}
            />
          </div>

          {!details && (
            <p className="mt-6 text-sm text-[#9A8F73] italic">
              Detailed info for this library hasn't been added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div>
      <p className="text-xs font-medium text-[#9A8F73] uppercase tracking-wide">{label}</p>
      <p className="text-sm text-[#2B2620] mt-1">{value}</p>
    </div>
  )
}

function formatTimings(timings: Record<string, string>): string {
  return Object.entries(timings)
    .map(([day, hours]) => `${day}: ${hours}`)
    .join(', ')
}