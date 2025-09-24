import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Marker from '../Marker'
import L from 'leaflet'
import { MapViewContainer } from './MapView.styles';

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
const defaultZoom = 13

const MapView = ({ markers = [], center = defaultCenter, zoom = defaultZoom }) => {
  const [isReady, setIsReady] = useState(false)
  const icon = useMemo(() => createDefaultIcon(), [])
  const mapRef = useRef(null)

  const renderedMarkers = useMemo(() => markers.map(marker => {
    if (!marker.lat || !marker.long) return null;

    const position = [marker.lat, marker.long];

    return(
      <Marker key={marker.id} position={position} icon={icon} />
    )
  }), [markers, icon])

  useEffect(() => {
    // MapContainer onLoad equivalent: mark ready when the map instance is available
    const timer = setTimeout(() => setIsReady(true), 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <MapViewContainer>
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

        {isReady && renderedMarkers}
      </MapContainer>
    </MapViewContainer>
  )
}

export default MapView;
