import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import ArticleInfo from '../../atoms/ArticleInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) =>
      props.overlay ? theme.palette.primary.main : theme.palette.common.white,
    borderRadius: '4px',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
  mainmedia: {
    height: (props) => (props.overlay ? 242 : props.hasImage ? 390 : 180),
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.up('md')]: {
      height: (props) => (props.overlay ? '100%' : '100%'),
      '&:hover $focusHighlight': {
        opacity: 0,
      },
    },
  },
  focusHighlight: {},
  mediaOverlay: {
    height: '100%',
    width: '100%',
    backgroundPosition: 'bottom',
  },
  mediaTop: {
    height: '60%',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      height: '70%',
      width: '100%',
    },
  },
  secondcol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  overlay: {
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    color: theme.palette.common.white,
    height: '100%',
    width: '100%',
    padding: '24px 32px',
    zIndex: 3,
    backgroundColor: 'transparent',

    [theme.breakpoints.down('md')]: {
      padding: 16,
    },
    background:
      'linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.6) 51.04%, rgba(0, 0, 0, 0.85) 100%)',
    '&:hover': {
      background:
        'linear-gradient(0deg, rgba(12, 134, 113, 0.6), rgba(12, 134, 113, 0.6)), linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.6) 51.04%, rgba(0, 0, 0, 0.85) 100%)',
      '& h3': {
        textDecoration: 'underline',
      },
      '& .MuiChip-root': {
        background: 'rgba(0, 0, 0, 0.2)',
      },
    },
    '& > .MuiBox-root': {
      justifyContent: 'flex-end',
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

export default function ArticleItem({
  cardData,
  overlay = false,
  hasImage = false,
  firstSubItem,
}) {
  const classes = useStyles({
    overlay: overlay,
    hasImage: hasImage,
    firstSubItem: firstSubItem,
  })

  return (
    <Card className={classes.root} square elevation={0}>
      <CardActionArea
        href={cardData.actionHref}
        classes={{
          root: classes.mainmedia,
          focusHighlight: classes.focusHighlight,
        }}
        disableRipple
      >
        {(overlay || hasImage) && cardData && (
          <CardMedia
            image={cardData.mediaImg}
            className={overlay ? classes.mediaOverlay : classes.mediaTop}
            title={cardData.title}
          />
        )}
        {cardData && (
          <CardContent className={overlay ? classes.overlay : classes.under}>
            <ArticleInfo
              premium={cardData.premium}
              topicTag={cardData.topicTag}
              topicTagColor={!overlay ? 'black' : ''}
              title={cardData.title}
              authorName={cardData.authorName}
              datePublished={cardData.datePublished}
            />
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  )
}

ArticleItem.propTypes = {
  cardData: PropTypes.shape({
    title: PropTypes.string,
    actionHref: PropTypes.string,
    mediaImg: PropTypes.string,
    premium: PropTypes.bool,
    topicTag: PropTypes.string,
    authorName: PropTypes.string,
    datePublished: PropTypes.string,
  }),
  overlay: PropTypes.bool,
  hasImage: PropTypes.bool,
  firstSubItem: PropTypes.bool,
}
