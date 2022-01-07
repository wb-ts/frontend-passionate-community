import React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import PropTypes from 'prop-types'
import TopicTag from '../../molecules/TopicTag'
import TextStyle from '../TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
  topictag: {
    color: theme.palette.accent.lightGrey,
  },
  title3Lines: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',
    height: '5.25rem',
    '&:hover': {
      color: theme.palette.hover.main,
      textDecoration: 'underline',
    },
  },
}))

export default function ArticleInfo({
  premium,
  topicTag,
  topicTagColor,
  title,
  authorName,
  datePublished,
  ...props
}) {
  const classes = useStyles()

  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')

  return (
    <Box
      className={classes.root}
      display='flex'
      flexDirection='column'
      justifyContent='flex-start'
    >
      {topicTag && (
        <Box display='flex'>
          <TopicTag
            variant='special'
            label={topicTag}
            color={topicTagColor ? topicTagColor : 'white'}
            premium={premium}
          />
        </Box>
      )}
      <Box className={topicTagColor ? classes.title3Lines : ''}>
        <TextStyle variant={props.titleVariant ? props.titleVariant : 'h4'}>
          {title}
        </TextStyle>
      </Box>
      <Box mt={1}>
        <TextStyle
          variant='subtitle3'
          className={topicTagColor ? classes.topictag : ''}
        >
          {Date.parse(datePublished) ? (
            timeAgo.format(Date.parse(datePublished))
          ) : (
            <div data-testid='blank-timeago'></div>
          )}
          {authorName ? ' • ' + authorName : ''}
        </TextStyle>
      </Box>
    </Box>
  )
}

ArticleInfo.propTypes = {
  premium: PropTypes.bool,
  topicTag: PropTypes.string,
  topicTagColor: PropTypes.string,
  title: PropTypes.string,
  authorName: PropTypes.string,
  datePublished: PropTypes.string,
}
