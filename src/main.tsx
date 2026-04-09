import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

// Navigeerimiseks (URLi vahetuseks):
// 1. npm i react-router-dom --> paneb node_modules sisse navigeerimiseks vajaliku koodi
// 2. import BrowserRouterist (võtab sealt react-router-dom'st)
// 3. ümbritseme App tagi ehk App.tsx faili selle BrowserRouteriga
// 4. App.tsx failis lähme teeme URLi ja koodi vahelisi seoseid

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
