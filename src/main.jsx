import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <StrictMode>
    <App/>
  </StrictMode>
  </QueryClientProvider>
  
)
