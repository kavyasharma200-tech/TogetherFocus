import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SetupGuide from './pages/SetupGuide.jsx'

// Check for missing keys
const missingKeys = !import.meta.env.VITE_FIREBASE_API_KEY ||
  import.meta.env.VITE_FIREBASE_API_KEY === 'your_api_key' ||
  import.meta.env.VITE_FIREBASE_API_KEY === 'undefined';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {missingKeys ? <SetupGuide /> : <App />}
  </StrictMode>,
)
