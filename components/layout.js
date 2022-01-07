import React from 'react'
import { makeStyles } from '@mui/styles'
import Footer from './organisms/footer'
import Header from './organisms/header'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    [theme.breakpoints.up('md')]: {
      paddingTop: 72,
    },
  },
  paywall: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1,
  },
  bottomRibbon: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
}))

export default function Layout({ children, paywall, grey = false }) {
  const classes = useStyles()
  return (
    <>
      <Header />
      <main id='mainContent' className={classes.root}>
        {children}
      </main>
      <Footer grey={grey} />
      {paywall && (
        <div id='piano-three-quarters-wall' className={classes.paywall} />
      )}
      {paywall && (
        <div id='piano-bottom-ribbon' className={classes.bottomRibbon} />
      )}
    </>
  )
}
