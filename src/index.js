import React from 'react'
import ReactDOM from 'react-dom'
import PrimeReact from 'primereact/api'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'

import { AppContextProvider } from './context/AppContext'
import App from './App'

PrimeReact.ripple = true

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <Router>
        <App />
      </Router>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
