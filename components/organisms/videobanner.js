import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactPlayer from 'react-player/wistia'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 350,
    backgroundColor: theme.palette.grey.dark,

    [theme.breakpoints.up('md')]: {
      height: 550,
    },
    [theme.breakpoints.up('lg')]: {
      height: 617,
    },
  },
  player: {
    width: '100%',
    height: '250px',

    [theme.breakpoints.up('sm')]: {
      width: '60%',
      height: '250px',
    },

    [theme.breakpoints.up('md')]: {
      width: '783px',
      height: '400px',
    },

    [theme.breakpoints.up('lg')]: {
      width: '783px',
      height: '521px',
    },
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: theme.palette.common.white,

    [theme.breakpoints.up('md')]: {
      top: 24,
      right: 24,
    },
  },
}))

export default function VideoBanner({ close }) {
  const classes = useStyles()
  const wistiaendpoint =
    process?.env?.WISTIA_ENDPOINT || 'https://ascd.wistia.com/medias/'

  const closeBanner = () => {
    close()
  }

  return (
    <Box className={classes.container}>
      <IconButton
        aria-label='Close video banner button'
        className={classes.closeButton}
        onClick={() => closeBanner()}
        size='large'
      >
        <CloseIcon size='small' />
      </IconButton>

      <Box className={classes.player}>
        <ReactPlayer
          url={`${wistiaendpoint}72jvholg15`}
          config={{
            wistia: {
              options: {},
              playerId: '72jvholg15',
            },
          }}
          playing
          controls
          width='100%'
          height='100%'
        />
      </Box>
    </Box>
  )
}
