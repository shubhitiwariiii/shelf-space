import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

// Areas to search — add more districts as you expand
const AREAS = [
  { name: "Lucknow", state: "Uttar Pradesh" },
  { name: "Greater Noida", state: "Uttar Pradesh" },
];

interface OverpassElement {
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

async function resolveAreaCoords(
  areaName: string,
): Promise<{ lat: number; lon: number } | null> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(areaName)}&format=json&limit=1`,
    { headers: { "User-Agent": "library-finder-app" } },
  );
  const data = await res.json();
  if (!data[0]) return null;
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

async function fetchLibrariesNear(
  lat: number,
  lon: number,
  radius = 15000,
): Promise<OverpassElement[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="library"](around:${radius},${lat},${lon});
      way["amenity"="library"](around:${radius},${lat},${lon});
    );
    out center;
  `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      "User-Agent": "library-finder-app (student project)",
    },
    body: query,
  });

  if (!res.ok) {
    console.error(`Overpass error: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return data.elements || [];
}

function buildAddress(
  tags: Record<string, string> | undefined,
  fallback: string,
): string {
  if (!tags) return fallback;
  const parts = [
    tags["addr:housenumber"],
    tags["addr:street"],
    tags["addr:city"],
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : fallback;
}

function extractLocality(
  tags: Record<string, string> | undefined,
): string | null {
  if (!tags) return null;
  return (
    tags["addr:suburb"] ||
    tags["addr:neighbourhood"] ||
    tags["addr:quarter"] ||
    null
  );
}

async function main() {
  for (const area of AREAS) {
    console.log(`\n--- Fetching: ${area.name} ---`)

    const coords = await resolveAreaCoords(area.name)
    if (!coords) {
      console.log(`Could not resolve coordinates for ${area.name}, skipping.`)
      continue
    }

    const elements = await fetchLibrariesNear(coords.lat, coords.lon)
    console.log(`Found ${elements.length} raw results`)

    let saved = 0
    let withLocality = 0
    for (const el of elements) {
      const lat = el.lat ?? el.center?.lat
      const lon = el.lon ?? el.center?.lon
      if (!lat || !lon) continue

      const name = el.tags?.name || 'Unnamed Library'
      const address = buildAddress(el.tags, area.name)
      const locality = extractLocality(el.tags)
      if (locality) withLocality++

      const { error } = await supabase.from('libraries').upsert(
        {
          google_place_id: `osm_${el.id}`,
          name,
          address,
          district: area.name,
          locality,
          state: area.state,
          lat,
          lng: lon,
          google_rating: null,
        },
        { onConflict: 'google_place_id' }
      )

      if (error) {
        console.error(`Failed: ${name} —`, error.message)
      } else {
        saved++
        console.log(`Saved: ${name}${locality ? ` (${locality})` : ''}`)
      }
    }

    console.log(`${area.name}: ${saved} libraries saved, ${withLocality} with locality data`)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  console.log('\nDone.')
}

main().catch(console.error)