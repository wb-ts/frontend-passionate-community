import React from 'react'
import { Box, Divider, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { articleItemToCardData } from '../../lib/data-transformations'
import TextStyle from '../atoms/TextStyle'
import ViewAllCTA from '../atoms/ViewAllCTA'
import ArticleItem from './ArticleItem'

const useStyles = makeStyles((theme) => ({
  root: {},
  secondcol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    color: theme.palette.common.white,
    height: '100%',
    padding: theme.spacing(4),
  },
  sideResponsive: {
    paddingLeft: 0,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(3),
      height: (props) => (props.variant == 'articleOverlay' ? 504 : 554),
      marginTop: '-12px',
    },
  },
  item: {
    '& h3': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 2 /* number of lines to show */,
      '-webkit-box-orient': 'vertical',
    },
  },
  sideItem: {
    height: (props) => `calc(100% / ${props.length})`,
  },
  divider: {
    display: 'block',
    marginTop: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  addMargin: {
    marginBottom: 20,
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },
  },
}))

export default function GridSection({
  title,
  ctaLink,
  items,
  variant = 'articleOverlay',
}) {
  const classes = useStyles({ length: items.length - 1, variant: variant })

  const sideItems = items.slice(1, 4)

  return (
    <Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <TextStyle variant='h4'>{title}</TextStyle>
        <ViewAllCTA label='View all' href={ctaLink} lg />
      </Box>
      <Grid container className={classes.root}>
        <Grid
          item
          xs={12}
          md={8}
          className={clsx([classes.item, classes.addMargin])}
        >
          {variant == 'articleOverlay' && (
            <ArticleItem cardData={articleItemToCardData(items[0])} overlay />
          )}
          {variant == 'articleUnder' && (
            <ArticleItem cardData={articleItemToCardData(items[0])} hasImage />
          )}
          {variant == 'articleUnder' && <Divider className={classes.divider} />}
        </Grid>
        <Grid item xs={12} md={4} className={classes.secondcol}>
          <Grid
            container
            spacing={variant == 'articleOverlay' ? 3 : 1}
            className={classes.sideResponsive}
          >
            {sideItems.map((item, key) => {
              const divider = sideItems.length > key + 1
              return (
                <Grid
                  item
                  xs={12}
                  key={key}
                  className={clsx([classes.item, classes.sideItem])}
                >
                  {variant == 'articleOverlay' && (
                    <ArticleItem
                      cardData={articleItemToCardData(item)}
                      submedia
                      overlay
                    />
                  )}
                  {variant == 'articleUnder' && (
                    <ArticleItem
                      cardData={articleItemToCardData(item)}
                      firstSubItem={key == 0}
                    />
                  )}
                  {divider && variant == 'articleUnder' && <Divider />}
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
