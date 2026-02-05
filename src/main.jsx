import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router.jsx'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
  </StrictMode>,
)