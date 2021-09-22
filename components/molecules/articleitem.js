import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArticleInfo from '@/components/atoms/articleinfo'
import imageoptimization from '@/const/imageoptimization'
import paths from '@/paths/path'

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

    [theme.breakpoints.down('sm')]: {
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
  article,
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
        href={paths.article({ slug: article.fields.slug })}
        classes={{
          root: classes.mainmedia,
          focusHighlight: classes.focusHighlight,
        }}
        disableRipple
      >
        {(overlay || hasImage) && article && (
          <CardMedia
            image={
              article.fields?.image?.fields?.imageBynder
                ? article.fields?.image?.fields?.imageBynder[0]?.src +
                  '?' +
                  imageoptimization.qualityParameter +
                  '=' +
                  imageoptimization.qualityValue
                : article.fields?.image?.fields?.imageContentful?.fields?.file
                    ?.url
                ? article.fields?.image?.fields?.imageContentful?.fields?.file
                    ?.url +
                  '?' +
                  imageoptimization.qualityParameter +
                  '=' +
                  imageoptimization.qualityValue
                : '/images/ASCDImageFiller.png'
            }
            className={overlay ? classes.mediaOverlay : classes.mediaTop}
            title={article.fields.title}
          />
        )}
        {article && (
          <CardContent className={overlay ? classes.overlay : classes.under}>
            <ArticleInfo
              premium={article.fields.premium}
              topicTag={article.fields.topic?.fields?.title}
              topicTagColor={!overlay && 'black'}
              title={article.fields.title}
              authorName={`${
                article.fields.authors && article.fields.authors.length > 0
                  ? `${article.fields.authors[0].fields?.firstName}  ${article.fields.authors[0].fields?.lastName}`
                  : ''
              }`}
              datePublished={article.fields.issueDate}
              authorSpace
            />
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  )
}
