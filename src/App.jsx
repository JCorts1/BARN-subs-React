import { useState } from 'react'
import LeftContainer from './components/LeftContainer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">

    <div className="left-container">
      <LeftContainer/>
    </div>
    <div className="middle-container"></div>
    <div className="right-container"></div>
  </div>
  )
}

export default App
