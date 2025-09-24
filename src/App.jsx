import { useState } from 'react'
import confluentLogo from '/confluent-dark.svg'
import kinetikLogo from '/kinetik.svg'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://kinetik.care" target="_blank">
          <img src={kinetikLogo} className="logo" alt="Kinetik logo" />
        </a>
        <a href="https://confluent.io" target="_blank">
          <img src={confluentLogo} className="logo confluent" alt="Confluent logo" />
        </a>
      </div>
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
    </>
  )
};

export default App
