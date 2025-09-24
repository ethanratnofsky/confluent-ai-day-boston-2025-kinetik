import { useState, useEffect } from 'react'
import './App.css'
import { Navbar, MapView } from './components'

const App = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetch('/markers.json')
      .then(response => response.json())
      .then(data => setMarkers(data))
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '24px', flex: 1 }}>
        <MapView markers={markers} setMarkers={setMarkers} />
      </div>
    </>
  )
};

export default App
