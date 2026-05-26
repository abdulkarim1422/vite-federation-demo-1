import './App.css'
import { Route, Routes } from 'react-router-dom'
import DemoPage1 from './pages/DemoPage01'
import DemoPage2 from './pages/DemoPage02'

function App() {
  return (
      <Routes>
        <Route index element={<div>Hello from Remote App 2</div>} />
        <Route path="demo1" element={<DemoPage1 />} />
        <Route path="demo2" element={<DemoPage2 />} />
      </Routes>
  )
}

export default App
