import { useState, useEffect } from 'react'
import './App.css'
import { Navbar, MapView } from './components'

const App = () => {
  const [vehicles, setVehicles] = useState([])
  const [pickups, setPickups] = useState([])

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch('/vehicles.json').then(r => r.json()),
      fetch('/pickups.json').then(r => r.json())
    ]).then(([vehiclesData, pickupsData]) => {
      if (cancelled) return
      setVehicles(vehiclesData)
      setPickups(pickupsData)
    })
    return () => { cancelled = true }
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '24px', flex: 1 }}>
        <MapView vehicles={vehicles} pickups={pickups} />
      </div>
    </>
  )
};

export default App
