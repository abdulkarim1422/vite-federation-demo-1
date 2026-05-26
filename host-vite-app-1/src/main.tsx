import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import RemoteApp from 'remoteApp2/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/remote/*" element={<RemoteApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
