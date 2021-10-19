import React from 'react'
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'
import theme from '../theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withTests } from '@storybook/addon-jest'
import results from '../test-results/report.json'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ascd',
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    </StylesProvider>
  ),
  withTests({
    results,
  }),
]
