import { useState } from 'react'
import './App.css'
import { Navbar, MapView } from './components'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <h1>Kinetik @ Confluent</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Kinetik and Confluent logos to learn more
      </p>
      <div style={{ marginTop: '24px' }}>
        <MapView />
      </div>
    </>
  )
};

export default App
