import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('libraries').select('*')

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Connection Test</h1>
      <p>Error: {error ? error.message : 'None'}</p>
      <p>Libraries found: {data?.length ?? 0}</p>
    </div>
  )
}