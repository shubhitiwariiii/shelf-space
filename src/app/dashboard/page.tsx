import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getSavedLibraries, getDashboardStats } from '@/lib/queries/libraries'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, created_at')
    .eq('id', user.id)
    .single()

  const savedLibraries = await getSavedLibraries(user.id)
  const stats = await getDashboardStats(user.id)

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-IN', {
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <div className="min-h-screen bg-[#15130F] px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-2xl text-[#F7F4EC]">
          Welcome{profile?.full_name ? `, ${profile.full_name}` : ''}
        </h1>
        <p className="text-sm text-[#A8A296] mt-1">Your library dashboard</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <StatCard label="Saved" value={stats.savedCount} />
          <StatCard label="Districts" value={stats.districtsCount} />
          <StatCard
            label="Member since"
            value={memberSince || '—'}
            isText
          />
        </div>

        {/* Quick actions */}
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <Link
            href="/explore"
            className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 hover:border-[#FF6B47] transition-colors"
          >
            <p className="text-sm font-medium text-[#F7F4EC]">Browse all libraries</p>
            <p className="text-xs text-[#A8A296] mt-1">
              See the full catalog across every district
            </p>
          </Link>
          {stats.topDistrict ? (
            <Link
              href="/explore"
              className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 hover:border-[#2DD4A8] transition-colors"
            >
              <p className="text-sm font-medium text-[#F7F4EC]">
                More in {stats.topDistrict}
              </p>
              <p className="text-xs text-[#A8A296] mt-1">
                Your most-saved district so far
              </p>
            </Link>
          ) : (
            <div className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 opacity-60">
              <p className="text-sm font-medium text-[#F7F4EC]">More in your area</p>
              <p className="text-xs text-[#A8A296] mt-1">
                Save a library to see this here
              </p>
            </div>
          )}
        </div>

        {/* Saved libraries */}
        <div className="mt-8">
          <p className="text-xs font-medium tracking-wide uppercase text-[#6B6560] mb-3">
            Saved libraries
          </p>

          {savedLibraries.length === 0 ? (
            <div className="text-center py-16 bg-[#1F1B16] border border-[#332D24] rounded-lg">
              <p className="text-[#A8A296] font-medium">No saved libraries yet</p>
              <p className="text-sm text-[#6B6560] mt-1">
                Browse{' '}
                <Link href="/explore" className="underline text-[#F7F4EC]">
                  Explore
                </Link>{' '}
                and save libraries you want to revisit.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {savedLibraries.map((lib) => (
                <Link
                  key={lib.id}
                  href={`/library/${lib.id}`}
                  className="block bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 hover:border-[#FF6B47] transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-[#FF6B47] mb-1">
                        {lib.locality || lib.district}
                      </p>
                      <h3 className="font-serif text-[#F7F4EC]">{lib.name}</h3>
                      <p className="text-xs text-[#6B6560] mt-1">{lib.state}</p>
                    </div>
                    {lib.google_rating && (
                      <span className="text-xs font-medium text-[#04342C] bg-[#2DD4A8] px-2 py-1 rounded">
                        ★ {lib.google_rating}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  isText = false,
}: {
  label: string
  value: number | string
  isText?: boolean
}) {
  return (
    <div className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-4">
      <p className={`text-[#F7F4EC] ${isText ? 'text-sm font-medium' : 'font-serif text-2xl'}`}>
        {value}
      </p>
      <p className="text-xs text-[#6B6560] mt-1">{label}</p>
    </div>
  )
}