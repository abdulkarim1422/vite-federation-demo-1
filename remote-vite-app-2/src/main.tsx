import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Standalone: routes at remotedomain.com/*; assets still load from /mf/remote/* */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
