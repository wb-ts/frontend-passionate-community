import React from 'react'
import { makeStyles } from '@mui/styles'
import { PropTypes } from 'prop-types'
import NextImageWrapper from '../../images/NextImageWrapper'

const useStyles = makeStyles((theme) => ({
  heroImg: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '16px 16px 16px 64px',
  },
}))

export default function SpotlightImage({ imgUrl, imgTitle }) {
  const classes = useStyles()
  return (
    <NextImageWrapper
      src={imgUrl}
      alt={imgTitle}
      className={classes.heroImg}
      height={388}
      width={800}
      layout='responsive'
      priority='true'
    />
  )
}

SpotlightImage.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  imgTitle: PropTypes.string,
}
