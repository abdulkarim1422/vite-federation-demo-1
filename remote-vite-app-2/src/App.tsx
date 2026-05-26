import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DemoPage1 from './pages/DemoPage01'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Hello from Remote App 2</div>} />
        <Route path="/demo1" element={<DemoPage1 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
