import React from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import CtaButton from '../../atoms/CtaButton'
import TextStyle from '../../atoms/TextStyle'
import InventorySummary from '../../info/InventorySummary'
import SpotlightImage from '../../workshop/SpotlightImage'
import TopicTag from '../TopicTag'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '4px',
    width: '100%',
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
  mainmedia: {
    height: 390,
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.up('md')]: {
      height: '100%',
      '&:hover $focusHighlight': {
        opacity: 0,
      },
    },
  },
  focusHighlight: {},
  mediaTop: {
    height: '60%',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      height: '70%',
      width: '100%',
    },
  },
  under: {
    height: (props) => (props.hasImage ? '40%' : '100%'),
    paddingLeft: 0,
    [theme.breakpoints.up('md')]: {
      height: (props) => (props.hasImage ? '30%' : '100%'),
      paddingTop: (props) =>
        props.hasImage
          ? theme.spacing(2)
          : !props.firstSubItem
          ? '12px'
          : '12px',
      paddingBottom: (props) => (props.hasImage ? theme.spacing(2) : '12px'),
    },
  },
}))

export default function WorkshopItem({ cardData, useMemberBookPrice }) {
  const classes = useStyles()

  return (
    <Card className={classes.root} square elevation={0}>
      {cardData && (
        <Box>
          <SpotlightImage
            imgUrl={cardData.mediaImg}
            imgTitle={cardData.title}
          />
        </Box>
      )}
      {cardData && (
        <CardContent className={classes.under}>
          <Box
            className={classes.root}
            display='flex'
            flexDirection='column'
            justifyContent='flex-start'
          >
            {cardData.topicTag && (
              <Box display='block'>
                <Box mb={1}>
                  <TopicTag
                    textTransform='uppercase'
                    label={cardData.topicTag}
                  />
                </Box>
                {cardData.authorName && (
                  <Box mr={2}>
                    <TextStyle variant={'h2'}>{cardData.authorName}</TextStyle>
                  </Box>
                )}
              </Box>
            )}
            <Box display='block' justifyContent='space-between'>
              <Box>
                <TextStyle variant='h4'>{cardData.title}</TextStyle>
              </Box>
            </Box>
            <Box mt={1}>
              <TextStyle variant='h4'>{cardData.workshopDate}</TextStyle>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Box mt={1} mb={1}>
                <TextStyle variant='h4'>{cardData.clockHours}</TextStyle>
              </Box>
              <Box>
                <TextStyle variant='subtitle1'>
                  {cardData.memberPrice &&
                    cardData.nonMemberPrice &&
                    `$${
                      useMemberBookPrice
                        ? cardData.memberPrice
                        : cardData.nonMemberPrice
                    }
                  `}
                </TextStyle>
              </Box>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <InventorySummary id={cardData.id} />
              <Box>
                <CtaButton
                  variant='outlined'
                  color='primary'
                  label='Learn More'
                  href={cardData.actionHref}
                  fullWidth
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      )}
    </Card>
  )
}

WorkshopItem.propTypes = {
  cardData: PropTypes.shape({
    title: PropTypes.string,
    actionHref: PropTypes.string,
    mediaImg: PropTypes.string,
    topicTag: PropTypes.string,
    authorName: PropTypes.string,
    workshopDate: PropTypes.string,
    memberPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nonMemberPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    clockHours: PropTypes.string,
    seatsRemaining: PropTypes.number,
  }),
  useMemberBookPrice: PropTypes.bool,
}
