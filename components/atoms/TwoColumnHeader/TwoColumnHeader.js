import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import TextStyle from '@/components/atoms/TextStyle'
import CtaButton from '@/components/atoms/CtaButton'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(34),
    lineHeight: theme.typography.pxToRem(42),
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(32),
      lineHeight: theme.typography.pxToRem(40),
    },
  },
  button: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'fit-content',
    },
  },
}))

export default function TwoColumnHeader({
  title,
  body,
  ctaLabel,
  ctaLink,
  ...props
}) {
  const classes = useStyles()
  return (
    <Box>
      <Typography variant='h2' className={classes.title}>
        {title}
      </Typography>
      <Box mt={1} mb={4}>
        <TextStyle variant='subtitle2'>{body}</TextStyle>
      </Box>
      {ctaLabel && (
        <Box className={classes.button}>
          <CtaButton
            variant='outlined'
            color='primary'
            label={ctaLabel}
            href={ctaLink}
            fullWidth
          />
        </Box>
      )}
    </Box>
  )
}

TwoColumnHeader.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaLink: PropTypes.string,
}
