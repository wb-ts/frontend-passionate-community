import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
      {label}
    </Button>
  )
}
