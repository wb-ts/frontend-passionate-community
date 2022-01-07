import { createTheme } from '@mui/material/styles'
import { typography, zIndex, customPalette } from '.'

/**
 * First we create the a default theme with our palette,
 * typography, zIndex, or any other properties we may want.
 * These are located in their own separate files
 */
const defaultTheme = createTheme({
  palette: customPalette,
  typography: typography,
  zIndex: zIndex,
})

/**
 * We extract these properties as our component overrides will need them
 */
export const {
  breakpoints,
  palette,
  typography: { pxToRem },
} = defaultTheme

export default defaultTheme
