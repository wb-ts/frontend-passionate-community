import React from 'react'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
    textDecoration: (underlined) => (underlined ? 'underline' : 'none'),
    whiteSpace: 'nowrap',
  },
})
export default function CtaButton({
  label,
  onclick,
  id = '',
  href,
  variant,
  size,
  color,
  underlined = false,
  fullWidth = false,
  target,
  styles,
  children,
  ...props
}) {
  const classes = useStyles(underlined)

  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={() => (onclick ? onclick() : void 0)}
      className={classes.root}
      href={href}
      fullWidth={fullWidth}
      id={id}
      target={target}
      style={styles}
    >
      {label || children}
    </Button>
  )
}

CtaButton.propTypes = {
  label: PropTypes.string,
  onclick: PropTypes.func,
  id: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  underlined: PropTypes.bool,
  fullWidth: PropTypes.bool,
  target: PropTypes.string,
  styles: PropTypes.object,
}

CtaButton.defaultProps = {
  variant: 'contained',
  color: 'primary',
}
