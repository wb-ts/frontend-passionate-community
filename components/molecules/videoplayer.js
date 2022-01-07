import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactPlayer from 'react-player/wistia'
import DaysAgo from '../atoms/DaysAgo'
// import ViewCount from './viewcount'
import TextStyle from '../atoms/TextStyle'
import ViewAllCTA from '../atoms/ViewAllCTA'
import TopicTag from './TopicTag'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '350px',
    [theme.breakpoints.up('md')]: {
      minHeight: '495px',
    },
  },
  rootOverlay: {
    position: 'relative',
    minHeight: '410px',
  },
  video: {
    position: 'relative',
    paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */,
    height: '240px',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '425px',
    },
    [theme.breakpoints.up('md')]: {
      height: '460px',
    },
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  videoOverlay: {
    height: '410px',
  },
  ctaIcons: {
    color: theme.palette.common.black,
    padding: 0,
    fontSize: '14px',
    '& svg': {
      '-webkit-transform': 'scaleX(-1)',
      transform: 'scaleX(-1)',
    },
  },
  ctaIconsOverlay: {
    color: theme.palette.common.white,
  },
  ctaMarginRight: {
    marginRight: theme.spacing(2),
  },
  details: {
    height: '116px',
    paddingTop: theme.spacing(2),
  },
  greenDetails: {
    height: '124px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    '& *': {
      color: theme.palette.common.white,
    },
    '& .MuiChip-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    height: '99px',
    backgroundColor: 'transparent',
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    color: theme.palette.common.white,
  },
  ctabar: {
    marginRight: '-10px',
  },
  truncate: {
    width: '90%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

export default function VideoPlayer({
  sectionTitle,
  ctaLink,
  video,
  autoplay = false,
  variant,
  noTruncate,
}) {
  const classes = useStyles()
  const wistiaendpoint =
    process?.env?.WISTIA_ENDPOINT || 'https://ascd.wistia.com/medias/'

  const _renderDetails = () => (
    <Grid
      container
      className={variant == 'green' ? classes.greenDetails : classes.details}
    >
      {video.fields.topic && (
        <Grid item xs={12}>
          <TopicTag
            variant='special'
            label={video.fields.topic.fields?.title}
            color={'black'}
            premium={video.fields.premium}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography
          component='h2'
          variant='h4'
          className={noTruncate ? '' : classes.truncate}
        >
          {video.fields.title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box display='flex' flexDirection='row'>
          {/* <Box>
            <ViewCount mediaId={video.fields.videoId} variant='body3' />
          </Box>
          {video.fields.date && video.fields.videoId && (
            <Box ml={1} mr={1}>
              &#8226;
            </Box>
          )} */}
          {video.fields.date && (
            <Box>
              <DaysAgo input={video.fields.date} variant='body3' />
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  )

  return (
    <Box className={classes.root}>
      {(sectionTitle || ctaLink) && (
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <TextStyle variant='h4'>{sectionTitle}</TextStyle>

          {ctaLink && <ViewAllCTA label='View all' href={ctaLink} lg />}
        </Box>
      )}

      <Box className={classes.video} display='flex' justifyContent='center'>
        {video && video.fields.videoId ? (
          <ReactPlayer
            url={`${wistiaendpoint}${video.fields.videoId}`}
            config={{
              wistia: {
                options: {},
                playerId: video.fields.videoId,
              },
            }}
            playing={autoplay}
            controls
            width='100%'
            height='100%'
            className={classes.reactPlayer}
          />
        ) : (
          // <div
          //   className={`wistia_embed wistia_async_${video.fields.videoId} ${classes.video}`}
          // >
          //   &nbsp;
          // </div>
          ''
        )}
      </Box>
      {_renderDetails()}
    </Box>
  )
}
