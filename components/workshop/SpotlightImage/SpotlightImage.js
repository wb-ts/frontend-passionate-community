import React from 'react'
import { PropTypes } from 'prop-types'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  heroImg: {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '16px 16px 16px 64px',
  },
}))

export default function SpotlightImage({ imgUrl, imgTitle, className }) {
  const classes = useStyles()
  return <img src={imgUrl} alt={imgTitle} className={classes.heroImg} />
}

SpotlightImage.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  imgTitle: PropTypes.string,
}
