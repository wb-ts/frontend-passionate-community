import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  h7: {
    fontSize: theme.typography.pxToRem(13),
    lineHeight: theme.typography.pxToRem(18),
    // fontSize: theme.typography.pxToRem(11),
    fontWeight: 600,
    // lineHeight: theme.typography.pxToRem(20),
    letterSpacing: 0.2,
    // [theme.breakpoints.up('md')]: {
    //   fontSize: theme.typography.pxToRem(13),
    //   lineHeight: theme.typography.pxToRem(18),
    // },
  },
  error: {
    fontSize: theme.typography.pxToRem(80),
    fontWeight: 800,
    lineHeight: theme.typography.pxToRem(80),
    letterSpacing: 0.2,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(120),
      lineHeight: theme.typography.pxToRem(120),
    },
  },
  subtitle3: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    lineHeight: theme.typography.pxToRem(24),
    letterSpacing: 0.2,
  },
  largeBody1: {
    fontFamily: 'Literata, Poppins, Arial',
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 500,
    lineHeight: theme.typography.pxToRem(28),
    letterSpacing: 0.2,
  },
  articleBody: {
    fontFamily: 'Literata, Poppins, Arial',
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 300,
    lineHeight: theme.typography.pxToRem(30),
    letterSpacing: 0.2,
  },
  articleAbstract: {
    fontFamily: 'Literata, Poppins, Arial',
    fontSize: theme.typography.pxToRem(21),
    fontWeight: 300,
    lineHeight: theme.typography.pxToRem(32),
    letterSpacing: 0.2,
  },
  body3: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    lineHeight: theme.typography.pxToRem(22),
    letterSpacing: 0.2,
  },
  buttonLarge: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
    lineHeight: theme.typography.pxToRem(24),
    letterSpacing: 0.2,
  },
  buttonMedium: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: theme.typography.pxToRem(24),
    letterSpacing: 0.2,
  },
  buttonSmall: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    lineHeight: theme.typography.pxToRem(20),
    letterSpacing: 0.2,
  },
  overlineLarge: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: theme.typography.pxToRem(20),
    letterSpacing: 0.4,
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  sessionDate: {
    fontSize: theme.typography.pxToRem(20),
    lineHeight: theme.typography.pxToRem(28),
    letterSpacing: 0.2,
    fontWeight: 700,
  },
  textColor: {
    color: (props) => (props.color ? props.color : 'inherit'),
  },
  strikeThrough: {
    textDecoration: 'line-through',
    fontSize: theme.typography.pxToRem(24),
    lineHeight: theme.typography.pxToRem(34),
    fontWeight: 800,
    letterSpacing: 0.2,
  },
  smallStrikeThrough: {
    textDecoration: 'line-through',
    fontSize: theme.typography.pxToRem(17),
    lineHeight: theme.typography.pxToRem(25),
    fontWeight: 400,
    letterSpacing: 0.2,
  },
  tinyStrikeThrough: {
    textDecoration: 'line-through',
    fontSize: theme.typography.pxToRem(17),
    lineHeight: theme.typography.pxToRem(25),
    fontWeight: 800,
    letterSpacing: 0.2,
  },
  remainingSeat: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    lineHeight: theme.typography.pxToRem(28),
    textTransform: 'uppercase',
  },
}))
export default function TextStyle({
  color,
  variant,
  component,
  children,
  className,
  ...restProps
}) {
  const classes = useStyles({ color })

  const customVariants = [
    'error',
    'h7',
    'subtitle3',
    'articleBody',
    'articleAbstract',
    'largeBody1',
    'body3',
    'buttonSmall',
    'buttonMedium',
    'buttonLarge',
    'overlineLarge',
    'strikeThrough',
    'smallStrikeThrough',
    'tinyStrikeThrough',
    'remainingSeat',
    'sessionDate',
  ]
  const customVariant = classes[variant]

  if (customVariants.includes(variant)) {
    return (
      <Typography
        className={`${customVariant} ${classes.textColor} ${className}`}
        component={component}
        {...restProps}
      >
        {children}
      </Typography>
    )
  } else {
    return (
      <Typography
        variant={variant}
        component={component}
        className={`${classes.textColor} ${className}`}
        {...restProps}
      >
        {children}
      </Typography>
    )
  }
}

TextStyle.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.string,
  component: PropTypes.string,
}
