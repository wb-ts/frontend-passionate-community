import React, { useEffect, useState, useContext } from 'react'
import { Box, Container, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    lineHeight: '18px',
    letterSpacing: '0.3px',
  },
  infoRow: {
    backgroundColor: theme.palette.action.hover,
  },
  infoKey: {
    fontWeight: 700,
    lineHeight: theme.typography.pxToRem(28),
    letterSpacing: '0.2px',
  },
  infoValue: {
    fontWeight: 400,
    lineHeight: theme.typography.pxToRem(28),
    letterSpacing: '0.2px',
  },
  body: {
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
}))

export default function Workshops() {
  const classes = useStyles()

  return (
    <Container maxWidth='lg'>
      <Box className={classes.body}>
        <Box mt={[5, 9]}>Index Page</Box>
      </Box>
    </Container>
  )
}
