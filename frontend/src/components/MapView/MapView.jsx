import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Configure default marker icons to avoid missing images in Vite builds
const createDefaultIcon = () => {
  const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png'
  const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png'
  const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'

  const icon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  })

  // Ensure defaults for any Marker without explicit icon
  L.Marker.prototype.options.icon = icon
  return icon
}

const defaultCenter = [41.1579, -8.6291] // Porto, Portugal
const defaultZoom = 7

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
}

const MapView = ({ center = defaultCenter, zoom = defaultZoom }) => {
  const [ready, setReady] = useState(false)
  const icon = useMemo(() => createDefaultIcon(), [])
  const mapRef = useRef(null)

  useEffect(() => {
    // MapContainer onLoad equivalent: mark ready when the map instance is available
    const timer = setTimeout(() => setReady(true), 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={containerStyle}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center} icon={icon}>
          <Popup>
            Map ready: {ready ? 'Yes' : 'Initializing...'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default MapView;
