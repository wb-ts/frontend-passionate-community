import React from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { imageoptimization } from '../../const'
import paths from '../../paths/path'
import DaysAgo from '../atoms/DaysAgo'
import TextStyle from '../atoms/TextStyle'
import TopicTag from './TopicTag'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    borderRadius: '8px',
    padding: 6,
    transition: 'all .2s ease-in-out',
    '&:hover': {
      boxShadow:
        '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
      transform: 'scale(1.03)',
    },
    [theme.breakpoints.up('md')]: {
      height: 294,
    },
  },
  actionarea: {
    display: 'flex',
    borderRadius: '8px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      '&:hover $focusHighlight': {
        opacity: 0,
      },
    },
    '&:hover': {
      textDecoration: 'none',
      '& $truncate': {
        textDecoration: 'underline',
        color: theme.palette.hover.main,
      },
      '& $img': {
        opacity: 0.6,
      },
    },
  },
  focusHighlight: {},
  media: {
    position: 'relative',
    height: 96,
    width: '30%',
    borderRadius: '4px',
    background: theme.palette.common.black,
    [theme.breakpoints.up('md')]: {
      height: 160,
      width: '100%',
    },
  },
  img: {
    borderRadius: '4px',
    height: 96,
    opacity: 0.8,
    [theme.breakpoints.up('md')]: {
      height: 160,
    },
  },
  playicon: {
    position: 'absolute',
    top: 'calc(50% - 28px)',
    left: 'calc(50% - 28px)',
    color: theme.palette.common.white,
    width: 56,
    height: 56,
    zIndex: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 0,
    width: '70%',
    height: 96,
    marginLeft: theme.spacing(2),
    '& > div': {
      marginTop: 4,
      marginBottom: 0,
      '&:first-of-type': {
        marginTop: 0,
      },
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(1),
        marginBottom: 0,
        '&:first-of-type': {
          marginTop: theme.spacing(1.5),
        },
      },
    },

    [theme.breakpoints.up('md')]: {
      width: '100%',
      height: 'inherit',
      marginLeft: 0,
      marginBottom: theme.spacing(2),
    },
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: '1.125rem' /* fallback */,
    maxHeight: '2.25rem',
    '-webkit-line-clamp': 2 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',
    [theme.breakpoints.up('md')]: {
      lineHeight: '1.25rem' /* fallback */,
      maxHeight: '2.5rem',
    },
  },
  metadata: {
    '& *': {
      color: theme.palette.grey.medium,
    },
  },
}))

export default function ContentCardListing({ item }) {
  if (!item) return null
  const classes = useStyles()
  const router = useRouter()

  let type = item.sys.contentType.sys.id
  let url = ''
  switch (type) {
    case 'podcast':
      url = paths.podcast({ slug: item.fields.slug })
      break
    case 'video':
      url = paths.video({ slug: item.fields.slug })
      break
    case 'webinar':
      url = paths.webinar({ slug: item.fields.slug })
      break
    default:
      url = item.fields.slug
  }

  const imgUrl = item.fields?.thumbnail?.fields?.imageBynder
    ? item.fields?.thumbnail?.fields?.imageBynder[0]?.src +
      '?' +
      imageoptimization.qualityParameter +
      '=' +
      imageoptimization.qualityValue
    : item.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url
    ? item.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url +
      '?' +
      imageoptimization.qualityParameter +
      '=' +
      imageoptimization.qualityValue
    : '/images/ASCDImageFiller.png'

  return (
    <Card square elevation={0} className={classes.root}>
      <CardActionArea
        href={url}
        classes={{
          root: classes.actionarea,
          focusHighlight: classes.focusHighlight,
        }}
        disableRipple
      >
        <Box className={classes.media}>
          <CardMedia
            component='img'
            alt={item.fields.thumbnail?.fields?.alternate}
            image={imgUrl}
            title={item.fields.thumbnail?.fields?.title}
            className={classes.img}
          />
          <img
            alt=''
            src='/images/playButton.svg'
            className={classes.playicon}
          />
        </Box>
        <CardContent className={classes.content}>
          {item.fields.topic && (
            <Box my={2}>
              <TopicTag
                label={item.fields.topic.fields?.title}
                textTransform='uppercase'
              />
            </Box>
          )}
          <Box className={classes.truncate}>
            <TextStyle variant='h6'>{item.fields.title}</TextStyle>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            className={classes.metadata}
            mb={1}
            pb={[0, 1]}
          >
            {/* {type !== 'podcast' && (
              <Box>
                <ViewCount
                  mediaId={item.fields.videoId}
                  variant='caption'
                ></ViewCount>
              </Box>
            )}
            {item.fields.date && type !== 'podcast' && (
              <Box ml={1} mr={1}>
                &#8226;
              </Box>
            )} */}
            <Box>
              <DaysAgo input={item.fields.date} variant='caption' />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
