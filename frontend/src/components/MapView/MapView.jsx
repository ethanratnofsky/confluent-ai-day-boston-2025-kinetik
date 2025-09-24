import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Marker from '../Marker'
import L from 'leaflet'
import { MapViewContainer } from './MapView.styles';
import HeatmapLayer from '../HeatmapLayer'
import COLORS from '../../constants/styles/colors'

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

// Car icon as an inline SVG DivIcon for vehicle markers
const createCarIcon = () => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
      <path fill="${COLORS.kinetikBlue}" d="M18.92 6.01C18.72 5.42 18.16 5 17.53 5H6.47C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 7h11l1.16 3.34H5.34L6.5 7zM6 16c-1.1 0-1.99-.9-1.99-2S4.9 12 6 12s2 .9 2 2-.9 2-2 2zm12 0c-1.1 0-1.99-.9-1.99-2S16.9 12 18 12s2 .9 2 2-.9 2-2 2z"/>
    </svg>
  `
  return L.divIcon({
    html: svg,
    className: 'car-marker-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 22],
    popupAnchor: [0, -20]
  })
}

const defaultCenter = [41.1579, -8.6291] // Porto, Portugal
const defaultZoom = 13

const MapView = ({ vehicles = [], pickups = [], center = defaultCenter, zoom = defaultZoom }) => {
  const [isReady, setIsReady] = useState(false)
  // Keep default icon configured globally (for any future default markers)
  useMemo(() => createDefaultIcon(), [])
  const carIcon = useMemo(() => createCarIcon(), [])
  const mapRef = useRef(null)

  const renderedVehicleMarkers = useMemo(() => vehicles.map(v => {
    if (!v.lat || !v.long) return null
    const position = [v.lat, v.long]
    return (
      <Marker key={v.id} position={position} icon={carIcon} />
    )
  }), [vehicles, carIcon])

  const heatmapPoints = useMemo(() => {
    return pickups
      .filter(p => p.lat && p.long)
      .map(p => [p.lat, p.long, 1])
  }, [pickups])

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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains={["a","b","c","d"]}
          detectRetina={true}
          maxZoom={20}
        />

        {isReady && (
          <HeatmapLayer
            points={heatmapPoints}
            radius={25}
            blur={15}
            max={1.0}
            maxZoom={17}
          />
        )}
        {isReady && renderedVehicleMarkers}
      </MapContainer>
    </MapViewContainer>
  )
}

export default MapView;
