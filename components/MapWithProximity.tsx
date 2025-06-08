'use client'

import { useEffect, useState } from 'react'

const spaCoords = { lat: 6.5244, lng: 3.3792 } // Replace with your spa's coordinates

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function MapWithProximity() {
  const [userDistance, setUserDistance] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        const dist = getDistanceFromLatLonInKm(latitude, longitude, spaCoords.lat, spaCoords.lng)
        setUserDistance(dist)
        if (dist <= 10) {
          setShowModal(true)
        }
      })
    }
  }, [])

  return (
    <div className="w-full  h-[400px] mt-10 relative">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${spaCoords.lat},${spaCoords.lng}`}
        className="rounded-xl"
      />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-emerald-600">You're Nearby!</h2>
            <p className="mt-2 text-gray-700">
              You're just {userDistance?.toFixed(1)} km away from our spa.
              Come relax — we’re expecting you!
            </p>
            <button
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
// Note: Replace YOUR_GOOGLE_MAPS_API_KEY with your actual Google Maps API key.
// Make sure to handle the API key securely and not expose it in client-side code in production.
