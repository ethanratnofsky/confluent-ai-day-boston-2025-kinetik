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

// Driver icon: center dot with soft outer radius (live-location style)
const createDriverIcon = () => {
  const outer = 28
  const inner = 10
  const html = `
    <div style="position: relative; width: ${outer}px; height: ${outer}px;">
      <span style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); width:${outer}px; height:${outer}px; background: rgba(50, 102, 245, 0.18); border-radius:50%;"></span>
      <span style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); width:${inner}px; height:${inner}px; background:${COLORS.kinetikBlue}; border-radius:50%; box-shadow:0 0 0 2px #fff;"></span>
    </div>
  `
  const half = Math.round(outer / 2)
  return L.divIcon({
    html,
    className: 'driver-marker-icon',
    iconSize: [outer, outer],
    iconAnchor: [half, half],
    popupAnchor: [0, -half]
  })
}

// Generate many jittered points around each pickup to dramatize hotspots
function generateJitteredHeatmapPoints(pickups, duplicatesPerPickup = 30, radiusMeters = 200) {
  const points = []
  const metersPerDegreeLat = 111111

  for (const pickup of pickups) {
    if (!pickup.lat || !pickup.long) continue

    const baseLat = pickup.lat
    const baseLng = pickup.long
    const latRadians = baseLat * (Math.PI / 180)
    const metersPerDegreeLng = Math.cos(latRadians) * metersPerDegreeLat || metersPerDegreeLat

    for (let i = 0; i < duplicatesPerPickup; i++) {
      const u = Math.random()
      const v = Math.random()
      const randomRadius = radiusMeters * Math.sqrt(u)
      const randomAngle = 2 * Math.PI * v

      const offsetMetersX = randomRadius * Math.cos(randomAngle)
      const offsetMetersY = randomRadius * Math.sin(randomAngle)

      const offsetLat = offsetMetersY / metersPerDegreeLat
      const offsetLng = offsetMetersX / metersPerDegreeLng

      points.push([baseLat + offsetLat, baseLng + offsetLng, 1])
    }
  }

  return points
}

const defaultCenter = [41.1579, -8.6291] // Porto, Portugal
const defaultZoom = 13

const MapView = ({ vehicles = [], pickups = [], center = defaultCenter, zoom = defaultZoom }) => {
  const [isReady, setIsReady] = useState(false)
  // Keep default icon configured globally (for any future default markers)
  useMemo(() => createDefaultIcon(), [])
  const driverIcon = useMemo(() => createDriverIcon(), [])
  const mapRef = useRef(null)

  const renderedVehicleMarkers = useMemo(() => vehicles.map(v => {
    if (!v.lat || !v.long) return null
    const position = [v.lat, v.long]
    return (
      <Marker key={v.id} position={position} icon={driverIcon} />
    )
  }), [vehicles, driverIcon])

  const heatmapPoints = useMemo(() => {
    const base = pickups
      .filter(p => p.lat && p.long)
      .map(p => [p.lat, p.long, 1])
    const synthetic = generateJitteredHeatmapPoints(pickups, 20, 150)
    return base.concat(synthetic)
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
            max={2.0}
            maxZoom={17}
          />
        )}
        {isReady && renderedVehicleMarkers}
      </MapContainer>
    </MapViewContainer>
  )
}

export default MapView;
