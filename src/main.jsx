import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <App/>
  </StrictMode>
)
