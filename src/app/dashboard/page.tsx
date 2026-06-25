import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getSavedLibraries } from '@/lib/queries/libraries'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const savedLibraries = await getSavedLibraries(user.id)

  return (
    <div className="min-h-screen bg-[#15130F] px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-2xl text-[#F7F4EC]">
          Welcome{profile?.full_name ? `, ${profile.full_name}` : ''}
        </h1>
        <p className="text-sm text-[#A8A296] mt-1">Your saved libraries</p>

        <div className="mt-6">
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
                  className="block bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 hover:border-[#FF6B47]/40 transition-colors"
                >
                  <h3 className="font-serif text-[#F7F4EC]">{lib.name}</h3>
                  <p className="text-sm text-[#A8A296] mt-0.5">{lib.address}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}