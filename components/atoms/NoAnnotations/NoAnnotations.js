import React from 'react'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  noAnnotations: {
    height: '248px',
    backgroundColor: theme.palette.accent.paleGreen,
  },
  headline: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '24px',
    letterSpacing: '0.2px',
  },
  subline: {
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: '0.2px',
    color: '#5F5858',
    marginTop: 8,
  },
}))

export default function NoAnnotations({ message, ...props }) {
  const classes = useStyles()
  return (
    <Box
      m={2}
      p={2}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      textAlign='center'
      className={classes.noAnnotations}
    >
      <FormatQuoteIcon style={{ fontSize: '60px', color: '#969696' }} />
      <Typography className={classes.headline}>
        You don&apos;t have any
      </Typography>
      <Typography className={classes.headline}>notes at the moment</Typography>
      <Typography className={classes.subline}>{message}</Typography>
    </Box>
  )
}

NoAnnotations.propTypes = {
  message: PropTypes.string,
}
