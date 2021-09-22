import React, { useState } from 'react'
import { Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import TextStyle from '@/components/atoms/textstyle'
import Image from 'material-ui-image'

const useStyles = makeStyles((theme) => ({
  root: {},
  sliderBtn: {
    width: 32,
    height: 32,
    marginLeft: 20,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.light,
    border: '1px solid #C5CED1',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.03), 0px 2px 8px rgba(0, 0, 0, 0.04), 0px 3px 3px rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: theme.palette.hover.main,
      color: theme.palette.text.secondary,
      border: '1px solid #0C8671',
    },
    '& svg': {
      width: 28,
      height: 28,
    },
  },
  tile: {
    position: 'relative',
    width: 205,
    height: '100%',
    padding: 10,
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow:
        '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)!important',
      borderRadius: 4,
      '& $title': {
        color: theme.palette.hover.main,
        textDecoration: 'underline',
      },
    },
    media: {
      width: 185,
      height: 240,
      backgroundSize: '185px 240px',
    },
  },
}))

export default function ImageCarousel({ images }) {
  const classes = useStyles()
  const [currentImage, setCurrentImage] = useState(0)

  const goLeft = () => {
    setCurrentImage((prevState) =>
      prevState === 0 ? images.length - 1 : prevState - 1
    )
  }

  const goRight = () => {
    setCurrentImage((prevState) =>
      prevState < images.length - 1 ? prevState + 1 : 0
    )
  }

  return (
    <Box>
      <Box boxShadow={10}>
        <Image
          src={images[currentImage]}
          style={{
            width: '307px',
            height: '428px',
            padding: 0,
          }}
        />
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' pt={2}>
        <Box className={classes.sliderLeft}>
          <IconButton
            aria-label='slide left'
            className={classes.sliderBtn}
            onClick={() => goLeft()}
          >
            <KeyboardArrowLeftIcon style={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Box pl={2}>
          <TextStyle variant='h5'>
            {currentImage + 1} of {images.length}
          </TextStyle>
        </Box>
        <Box className={classes.sliderRight}>
          <IconButton
            aria-label='slide right'
            className={classes.sliderBtn}
            onClick={() => goRight()}
          >
            <KeyboardArrowRightIcon style={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
