import { useState } from 'react'
import MiddleContainer from './components/MiddleContainer'
import RightContainer from './components/RightContainer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">

    <div className="function-container">
      <MiddleContainer/>
    </div>
    <div className="result-container">
      <RightContainer/>
    </div>
  </div>
  )
}

export default App
