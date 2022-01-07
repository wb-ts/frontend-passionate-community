import React from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import paths from '../../paths/path'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  tile: {
    position: 'relative',
    width: 205,
    minHeight: 300,
    padding: 10,
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow:
        '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)!important',
      borderRadius: 4,
    },
  },
  media: {
    width: 185,
    height: 240,
    backgroundSize: '185px 240px',
  },
  cardActionRoot: {
    '&:hover': {
      textDecoration: 'none',
    },
    '&:hover $focusHighlight': {
      opacity: 0,
    },
  },
  focusHighlight: {},
  issueCardContent: {
    padding: '16px 0px',
  },
}))

export default function IssueTile({ slug, imageUrl, title, issue }) {
  const classes = useStyles()

  var dateFormat = require('dateformat')

  return (
    <Card className={classes.tile} square elevation={0}>
      <CardActionArea
        href={paths.el({ slug: slug })}
        classes={{
          root: classes.cardActionRoot,
          focusHighlight: classes.focusHighlight,
        }}
        disableRipple
      >
        <CardMedia image={imageUrl} title={title} className={classes.media} />

        <CardContent className={classes.issueCardContent}>
          <Box>
            <TextStyle variant='h5'>
              {dateFormat(
                issue.fields.publicationDate + 'T00:00:00',
                'mmmm yyyy'
              )}
            </TextStyle>
            <TextStyle variant='caption'>
              Vol {issue.fields.volNo}, No. {issue.fields.issueNo}
            </TextStyle>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
