'use client'

import { useEffect, useRef } from 'react'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import type { Library } from '@/lib/queries/libraries'

let optionsSet = false

export default function LibraryMap({ libraries }: { libraries: Library[] }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || libraries.length === 0) return

    if (!optionsSet) {
      setOptions({ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, v: 'weekly' })
      optionsSet = true
    }

    async function initMap() {
      const { Map } = await importLibrary('maps')
      const { AdvancedMarkerElement } = await importLibrary('marker')

      const map = new Map(mapRef.current!, {
        center: { lat: libraries[0].lat, lng: libraries[0].lng },
        zoom: 12,
        mapId: 'd0cf3f69e37cce9db8c50186',
      })

      libraries.forEach((lib) => {
        const marker = new AdvancedMarkerElement({
          position: { lat: lib.lat, lng: lib.lng },
          map,
          title: lib.name,
        })

        marker.addListener('click', () => {
          window.location.href = `/library/${lib.id}`
        })
      })
    }

    initMap()
  }, [libraries])

  return <div ref={mapRef} className="w-full h-150 rounded-lg border border-[#E5DFD0]" />
}