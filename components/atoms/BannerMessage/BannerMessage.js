import React from 'react'
import { Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    minHeight: 48,
    padding: '12px 24px',
    borderRadius: 8,
    backgroundColor: ({ variant }) =>
      variant === 'special'
        ? theme.palette.accent.paleGreen
        : theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      borderRadius: 100,
    },
    '& p': {
      margin: 0,
      fontSize: theme.typography.pxToRem(18),
      fontWeight: 400,
      lineHeight: `${theme.typography.pxToRem(24)} !important`,
      letterSpacing: 0.2,
    },
    '& a': {
      color: ({ variant }) =>
        variant === 'special' ? 'inherit' : theme.palette.primary.main,
    },
  },
}))

export default function BannerMessage({ variant, children, ...props }) {
  const classes = useStyles({ variant })
  return (
    <>
      {variant === 'special' ? (
        <Paper className={classes.root} elevation={0}>
          {children}
        </Paper>
      ) : (
        <Paper className={classes.root} elevation={6}>
          {children}
        </Paper>
      )}
    </>
  )
}

BannerMessage.propTypes = {
  variant: PropTypes.string,
}
