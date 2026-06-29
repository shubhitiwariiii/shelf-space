import { getLibraryById } from '@/lib/queries/libraries'
import { notFound } from 'next/navigation'
import BackButton from '@/components/BackButton'
import SaveButton from '@/components/SaveIconButton'

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
    <div className="min-h-screen bg-[#15130F] px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <BackButton />

        <div className="mt-4 bg-[#1F1B16] border border-[#332D24] rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-serif text-2xl text-[#F7F4EC]">{library.name}</h1>
              <p className="text-sm text-[#A8A296] mt-1">{library.address}</p>
              <p className="text-xs text-[#6B6560] mt-1">
                {library.district}, {library.state}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {library.google_rating && (
                <span className="text-sm font-medium text-[#04342C] bg-[#2DD4A8] px-3 py-1.5 rounded">
                  ★ {library.google_rating}
                </span>
              )}
              <SaveButton libraryId={library.id} />
            </div>
          </div>

          <div className="mt-6 border-t border-[#332D24] pt-6 grid gap-4">
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
            <p className="mt-6 text-sm text-[#6B6560] italic">
              Detailed info for this library hasn&apos;t been added yet.
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
      <p className="text-xs font-medium text-[#6B6560] uppercase tracking-wide">{label}</p>
      <p className="text-sm text-[#F7F4EC] mt-1">{value}</p>
    </div>
  )
}

function formatTimings(timings: Record<string, string>): string {
  return Object.entries(timings)
    .map(([day, hours]) => `${day}: ${hours}`)
    .join(', ')
}