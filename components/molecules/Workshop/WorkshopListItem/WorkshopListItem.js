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
import PropTypes from 'prop-types'
import TextStyle from '../../../atoms/TextStyle'
import TopicTag from '../../TopicTag'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 250,
    borderRadius: '8px',
    padding: 6,
    transition: 'all .2s ease-in-out',
    '&:hover': {
      boxShadow:
        '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
      transform: 'scale(1.03)',
    },
    [theme.breakpoints.up('md')]: {
      height: 450,
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
    height: 200,
    width: '30%',
    borderRadius: '4px',
    background: theme.palette.common.black,
    [theme.breakpoints.up('md')]: {
      height: 200,
      width: '100%',
    },
  },
  img: {
    borderRadius: '4px',
    height: 200,
    opacity: 0.8,
    [theme.breakpoints.up('md')]: {
      height: 200,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 0,
    width: '70%',
    height: 250,
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
  truncate1: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: '1.125rem' /* fallback */,
    maxHeight: '5.25rem',
    '-webkit-line-clamp': 1 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',
    [theme.breakpoints.up('md')]: {
      lineHeight: '1.25rem' /* fallback */,
      maxHeight: '4.5rem',
    },
  },
  truncate2: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: '1.125rem' /* fallback */,
    maxHeight: '5.25rem',
    '-webkit-line-clamp': 2 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',
    [theme.breakpoints.up('md')]: {
      lineHeight: '1.25rem' /* fallback */,
      maxHeight: '4.5rem',
    },
  },
  metadata: {
    '& *': {
      color: theme.palette.grey.medium,
    },
  },
}))

export default function WorkshopListItem({ cardData, useMemberBookPrice }) {
  if (!cardData) return null
  const classes = useStyles()
  const router = useRouter()

  return (
    <Card square elevation={0} className={classes.root}>
      <CardActionArea
        href={cardData.actionHref}
        classes={{
          root: classes.actionarea,
          focusHighlight: classes.focusHighlight,
        }}
        disableRipple
      >
        <Box className={classes.media}>
          <CardMedia
            component='img'
            image={cardData.mediaImg}
            className={classes.img}
          />
        </Box>
        <CardContent className={classes.content}>
          <Box>
            <Box>
              <Box my={2}>
                <TopicTag label={cardData.topicTag} textTransform='uppercase' />
              </Box>
              <Box className={classes.truncate1}>
                <TextStyle variant='h4'>{cardData.authorName}</TextStyle>
              </Box>
              <Box className={classes.truncate2}>
                <TextStyle variant='h4'>{cardData.title}</TextStyle>
              </Box>
              <Box>
                <TextStyle variant='subtitle1'>
                  {cardData.workshopDate} - {cardData.clockHours}
                </TextStyle>
              </Box>
            </Box>
            <Box>
              <Box>
                <TextStyle variant='subtitle1'>
                  $
                  {useMemberBookPrice
                    ? cardData.memberPrice
                    : cardData.nonMemberPrice}
                </TextStyle>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

WorkshopListItem.propTypes = {
  cardData: PropTypes.shape({
    title: PropTypes.string,
    actionHref: PropTypes.string,
    mediaImg: PropTypes.string,
    topicTag: PropTypes.string,
    authorName: PropTypes.string,
    workshopDate: PropTypes.string,
    memberPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nonMemberPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    seatsRemaining: PropTypes.number,
  }),
  useMemberBookPrice: PropTypes.bool,
}
