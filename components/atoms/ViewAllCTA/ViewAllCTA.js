import React from 'react'
import Link from 'next/link'
import CallMadeIcon from '@mui/icons-material/CallMade'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import TextStyle from '../TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.hover.main,
      '& $forwardArrowIcon': {
        color: theme.palette.hover.main,
      },
    },
  },
  forwardArrowIcon: {
    width: 22,
    paddingTop: 6,
    color: theme.palette.primary.main,
    transform: 'rotate(45deg)',
  },
}))
export default function ViewAllCTA({ label, href, target, sm, lg, ...props }) {
  const classes = useStyles()

  const textSize = (sm, lg, label) => {
    if (sm) {
      return (
        <TextStyle component='span' variant='buttonSmall'>
          {label}
        </TextStyle>
      )
    } else if (lg) {
      return (
        <TextStyle component='span' variant='buttonLarge'>
          {label}
        </TextStyle>
      )
    } else {
      return (
        <TextStyle component='span' variant='buttonMedium'>
          {label}
        </TextStyle>
      )
    }
  }

  return (
    <>
      {href && (
        <Link href={href} passHref aria-label='View All link'>
          <a className={classes.label} target={target}>
            {textSize(sm, lg, label)}
            <Box pl={0.75}>
              <CallMadeIcon className={classes.forwardArrowIcon} />
            </Box>
          </a>
        </Link>
      )}
    </>
  )
}

ViewAllCTA.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  sm: PropTypes.bool,
  lg: PropTypes.bool,
}
