import { useState } from 'react'
import './App.css'
import { Navbar, MapView } from './components'

const App = () => {
  const [markers, setMarkers] = useState([]);

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
