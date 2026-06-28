'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useRouter } from 'next/navigation'
import type { Library } from '@/lib/queries/libraries'

const libraryIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export default function LibraryMap({ libraries }: { libraries: Library[] }) {
  const router = useRouter()

  if (libraries.length === 0) return null

  const center: [number, number] = [libraries[0].lat, libraries[0].lng]

  return (
    <div className="rounded-lg border border-[#332D24] overflow-hidden">
      <MapContainer
        center={center}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {libraries.map((lib) => (
          <Marker
            key={lib.id}
            position={[lib.lat, lib.lng]}
            icon={libraryIcon}
            eventHandlers={{
              click: () => router.push(`/library/${lib.id}`),
            }}
          >
            <Popup>
              <strong>{lib.name}</strong>
              <br />
              {lib.locality || lib.district}, {lib.state}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}