import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { imageoptimization } from '../../const'
import paths from '../../paths/path'
import DaysAgo from '../atoms/DaysAgo'
import TopicTag from './TopicTag'
// import ViewCount from './viewcount'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    minWidth: 312,
    '&:hover': {
      '& $truncate': {
        color: theme.palette.hover.main,
        textDecoration: 'underline',
      },
      boxShadow:
        '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  },
  cardActionRoot: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'flex-start',
    padding: theme.spacing(1),
    '&:hover': {
      textDecoration: 'none',
    },
    '&:hover $focusHighlight': {
      opacity: 0,
    },
  },
  cardContentRoot: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  focusHighlight: {},
  media: {
    width: 100,
    height: 96,
    borderRadius: '4px',
  },
  title: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: theme.typography.pxToRem(21),
    letterSpacing: 0.2,
  },
  thumbnailSmall: {
    position: 'relative',
    width: '100px',
    height: '96px',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    '& div': {
      '& img': {
        borderRadius: '4px',
      },
    },
  },
  playicon: {
    color: theme.palette.common.white,
    width: 60,
    height: 60,
    position: 'absolute',
    top: 'calc(50% - 30px)',
    left: 'calc(50% - 30px)',
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: '1.35rem' /* fallback */,
    '-webkit-line-clamp': 2 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',
  },
  metadata: {
    '& *': {
      color: theme.palette.grey.medium,
    },
  },
}))

export default function VideoPlaylistItem({ item, number }) {
  if (!item) return null
  const classes = useStyles()

  const url =
    item.sys.contentType.sys.id == 'video'
      ? paths.video({ slug: item.fields.slug })
      : paths.webinar({ slug: item.fields.slug })

  return (
    <Box mt={number > 0 ? 0.5 : -1} mb={0.5}>
      <Card className={classes.root} elevation={0}>
        <CardActionArea
          href={url}
          classes={{
            root: classes.cardActionRoot,
            focusHighlight: classes.focusHighlight,
          }}
          disableRipple
        >
          <Box className={classes.thumbnailSmall}>
            <CardMedia
              component='img'
              title={item.fields?.thumbnail?.fields?.alternate}
              image={
                item.fields?.thumbnail?.fields?.imageBynder
                  ? item.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : item.fields?.thumbnail?.fields?.imageContentful?.fields
                      ?.file?.url
                  ? item.fields?.thumbnail?.fields?.imageContentful?.fields
                      ?.file?.url +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : '/images/ASCDImageFiller.png'
              }
              className={classes.media}
            />
            <img
              alt=''
              src='/images/playButton.svg'
              className={classes.playicon}
            />
          </Box>

          <CardContent classes={{ root: classes.cardContentRoot }}>
            <Box
              maxHeight='100%'
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
            >
              {item.fields.topic && (
                <Box>
                  <TopicTag
                    variant='special'
                    label={item.fields.topic.fields?.title}
                    premium={item.fields.premium}
                  />
                </Box>
              )}
              <Box className={classes.truncate}>
                <Typography className={classes.title}>
                  {item.fields.title}
                </Typography>
              </Box>
              <Box
                display='flex'
                alignItems='center'
                className={classes.metadata}
              >
                {/* {item.fields.videoId && (
                  <Box>
                    <ViewCount
                      mediaId={item.fields.videoId}
                      variant='caption'
                    />
                  </Box>
                )}
                {(item.fields.date || item.fields.webinarDate) &&
                  item.fields.videoId && (
                    <Box ml={1} mr={1}>
                      &#8226;
                    </Box>
                  )} */}
                {item.fields.date && (
                  <Box>
                    <DaysAgo input={item.fields.date} variant='caption' />
                  </Box>
                )}
                {item.fields.webinarDate && (
                  <Box>
                    <DaysAgo
                      input={item.fields.webinarDate}
                      variant='caption'
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}
