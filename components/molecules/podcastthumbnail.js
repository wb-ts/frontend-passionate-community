import React from 'react'
import Link from 'next/link'
import { Box, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { imageoptimization } from '../../const'
import paths from '../../paths/path'
import DaysAgo from '../atoms/DaysAgo'
import TextStyle from '../atoms/TextStyle'
import TopicTag from './TopicTag'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    minHeight: '390px',
    maxHeight: '556px',
  },
  image: {
    borderRadius: '4px',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    color: theme.palette.common.white,
    height: '100%',
    width: '100%',
    padding: theme.spacing(4),
    backgroundImage: (props) =>
      `url(
        ${
          props.podcast.fields?.thumbnail?.fields?.imageBynder
            ? props.podcast.fields?.thumbnail?.fields?.imageBynder[0]?.src +
              '?' +
              imageoptimization.qualityParameter +
              '=' +
              imageoptimization.qualityValue
            : props.podcast.fields?.thumbnail?.fields?.imageContentful?.fields
                ?.file?.url
            ? props.podcast.fields?.thumbnail?.fields?.imageContentful?.fields
                ?.file?.url +
              '?' +
              imageoptimization.qualityParameter +
              '=' +
              imageoptimization.qualityValue
            : '/images/ASCDImageFiller.png'
        }
      )`,
    backgroundPosition: 'center' /* Center the image */,
    backgroundRepeat: 'no-repeat' /* Do not repeat the image */,
    backgroundSize:
      'cover' /* Resize the background image to cover the entire container */,
  },
  shadowBg: {
    borderRadius: '4px',
    position: 'absolute',
    top: 0,
    left: 0,
    color: theme.palette.common.white,
    height: '100%',
    width: '100%',
    padding: theme.spacing(4),
    background:
      'linear-gradient(180deg,rgba(0,0,0,.04) 0%,rgba(0,0,0,.6) 51.04%,rgba(0,0,0,.75) 100%)',
    '-webkit-transition': 'background-color 200ms ease-in-out',
    '-moz-transition': 'background-color 200ms ease-in-out',
    '-o-transition': 'background-color 200ms ease-in-out',
    transition: 'background-color 200ms ease-in-out',

    '&:hover': {
      backgroundColor: 'rgba(12, 134, 113, 0.6)',

      '& h3': {
        textDecoration: 'underline',
      },
      '& .MuiChip-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
    },
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: `0px ${theme.spacing(3)}`,
    color: theme.palette.common.white,
    zIndex: 1,
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: '32px' /* fallback */,
    maxHeight: '64px' /* fallback */,
    '-webkit-line-clamp': 2 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',
  },
  playicon: {
    position: 'absolute',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 42px)',
    color: theme.palette.common.white,
    width: 80,
    height: 80,
    zIndex: 1,
  },
}))

export default function PodcastThumbnail({ podcast, ...props }) {
  const classes = useStyles({ podcast })

  const _renderOverlay = () => (
    <Grid container className={classes.overlay}>
      <Grid item xs={12}>
        <Box display='flex'>
          <TopicTag
            variant='special'
            color='white'
            label={podcast?.fields?.topic.fields?.title}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.truncate}>
          <TextStyle variant='h3'>{podcast?.fields?.title} </TextStyle>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display='flex' mb={1} pb={2.5}>
          {podcast?.fields?.date && (
            <Box>
              <DaysAgo input={podcast?.fields?.date} variant='subtitle3' />
            </Box>
          )}

          {podcast?.fields?.date &&
            podcast?.fields?.authors &&
            podcast?.fields?.authors.length > 0 && (
              <Box ml={1} mr={1}>
                <TextStyle variant='subtitle3'>&#8226;</TextStyle>
              </Box>
            )}
          {podcast?.fields?.authors && podcast?.fields?.authors.length > 0 && (
            <Box>
              <TextStyle variant='subtitle3'>
                {podcast.fields.authors[0].fields.firstName +
                  ' ' +
                  podcast.fields.authors[0].fields.lastName}
              </TextStyle>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  )

  const pathUsed = (path) => {
    if (path === 'video') {
      return paths.video({ slug: podcast.fields?.slug })
    } else if (path === 'webinar') {
      return paths.webinar({ slug: podcast.fields?.slug })
    } else {
      return paths.podcast({ slug: podcast.fields?.slug })
    }
  }

  return (
    <Box className={classes.root}>
      <Box
        className={clsx(classes.image)}
        display='flex'
        justifyContent='center'
        title={podcast.fields?.thumbnail?.fields?.alternate}
      />
      <Link href={`${pathUsed(props.path)}`}>
        <a className={classes.shadowBg}>
          <img
            alt=''
            src='/images/playButton.svg'
            className={classes.playicon}
          />
          {_renderOverlay()}
        </a>
      </Link>
    </Box>
  )
}
