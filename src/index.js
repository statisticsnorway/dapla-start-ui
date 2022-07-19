import React from 'react'
import PrimeReact from 'primereact/api'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'

import { AppContextProvider } from './context/AppContext'
import App from './App'

PrimeReact.ripple = true

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<React.StrictMode>
  <AppContextProvider>
    <Router>
      <App />
    </Router>
  </AppContextProvider>
</React.StrictMode>)
