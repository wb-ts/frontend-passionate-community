import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import { AppProvider } from '../context/state'
import { theme } from '../styles/mui'

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
