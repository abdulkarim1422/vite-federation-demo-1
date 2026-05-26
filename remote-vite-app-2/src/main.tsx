import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Standalone dev/preview entry: remote is served under /mf/remote */}
    <BrowserRouter basename="/mf/remote">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
