import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Portfolio from './portfolio'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
)
