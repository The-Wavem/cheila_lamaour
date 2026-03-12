import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router.jsx'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider } from '@hooks/useAuth'
import muiTheme from '@theme/muiTheme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)