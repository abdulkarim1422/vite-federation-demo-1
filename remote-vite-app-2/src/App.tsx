import './App.css'
import { Route, Routes } from 'react-router-dom'
import DemoPage1 from './pages/DemoPage01'

function App() {
  return (
      <Routes>
        <Route path="/" element={<div>Hello from Remote App 2</div>} />
        <Route path="/demo1" element={<DemoPage1 />} />
      </Routes>
  )
}

export default App
