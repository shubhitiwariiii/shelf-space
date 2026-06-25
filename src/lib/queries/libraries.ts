import { createClient } from '@/lib/supabase/server'

export interface Library {
  id: string
  name: string
  address: string
  district: string
  state: string
  lat: number
  lng: number
  google_rating: number | null
}

export async function getLibraries(): Promise<Library[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('libraries')
    .select('id, name, address, district, state, lat, lng, google_rating')
    .order('name')

  if (error) {
    console.error('Error fetching libraries:', error.message)
    return []
  }

  return data ?? []
}
export interface LibraryDetails {
  owner_name: string | null
  owner_contact: string | null
  pricing_info: string | null
  timings: Record<string, string> | null
  amenities: string[] | null
}

export interface LibraryWithDetails extends Library {
  library_details: LibraryDetails | null
}

export async function getLibraryById(id: string): Promise<LibraryWithDetails | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('libraries')
    .select(`
      id, name, address, district, state, lat, lng, google_rating,
      library_details (
        owner_name, owner_contact, pricing_info, timings, amenities
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching library:', error.message)
    return null
  }
  

  return {
    ...data,
    library_details: Array.isArray(data.library_details)
      ? data.library_details[0] ?? null
      : data.library_details,
  } as LibraryWithDetails
}
export async function getSavedLibraries(userId: string): Promise<Library[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('saved_libraries')
    .select(`
      library_id,
      libraries (
        id, name, address, district, state, lat, lng, google_rating
      )
    `)
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching saved libraries:', error.message)
    return []
  }

  return data
    .map((row) => (Array.isArray(row.libraries) ? row.libraries[0] : row.libraries))
    .filter((lib): lib is Library => lib != null)
}