import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import AuthoringApp from './AuthoringApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthoringApp />
  </StrictMode>,
)
