import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { ApolloProvider } from '@apollo/client'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { createGenerateClassName } from '@mui/styles'
import PianoManager from '../components/piano/PianoManager'
import { SnipcartManager } from '../components/Snipcart'
import '../styles/globals.css'
import { analytics } from '../const'
import { AppProvider } from '../context/state'
import createEmotionCache from '../createEmotionCache'
import { client } from '../lib/apollo-client'
import { theme } from '../styles/mui'

Router.events.on('routeChangeComplete', () =>
  typeof window !== 'undefined' && typeof window.tp !== 'undefined'
    ? window?.tp?.experience?.execute()
    : () => {}
)

const clientSideEmotionCache = createEmotionCache()

const generateClassName = createGenerateClassName({
  productionPrefix: 'ascd',
})

function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  useEffect(() => {
    analytics.page({
      title: pageProps?.SEO?.fields?.title
        ? pageProps?.SEO?.fields?.title
        : document?.title,
      href: pageProps?.SEO?.fields?.pageUrl
        ? pageProps?.SEO?.fields?.pageUrl
        : location?.href,
      path: location?.pathname,
    })
  }, [pageProps])

  useEffect(() => {
    const pathname = location?.pathname.toLowerCase().replaceAll('_', '-')
    if (pathname !== location?.pathname) {
      setTimeout(() => {
        Router.push(pathname)
      }, 50)
    }
  }, [])

  return (
    <React.Fragment>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width'
          />
          <link rel='icon' type='image/ico' href='/favicon.ico' />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ApolloProvider client={client}>
            <AppProvider>
              <Component {...pageProps} />
              <SnipcartManager />
              <PianoManager />
            </AppProvider>
          </ApolloProvider>
        </ThemeProvider>
      </CacheProvider>
    </React.Fragment>
  )
}

export default App
