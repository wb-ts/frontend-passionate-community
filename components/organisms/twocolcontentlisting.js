import React, { Fragment } from 'react'
import { Divider, Grid, Box, ListItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import paths from '../../paths/path'
import TwoColumnHeader from '../atoms/TwoColumnHeader'
import HorizontalCard from '../molecules/horizontalcard'

const useStyles = makeStyles((theme) => ({
  gridLeft: {
    paddingRight: 0,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingRight: '100px',
      marginBottom: 0,
    },
  },
  divider: {
    display: 'block',
    marginBottom: 4,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
}))

/**
 * @todo Refactor this component
 */
export default function TwoColContentListing({
  title,
  body,
  items,
  limit,
  variant,
}) {
  TimeAgo.addLocale(en)
  const classes = useStyles()
  const isEvents = variant === 'event'
  const isWorkshops = variant === 'workshop'
  const dateFormat = require('dateformat')

  const getImageObject = (item) => {
    if (item.fields.spotlightImage?.fields?.imageContentful) {
      return item.fields.spotlightImage?.fields?.imageContentful
    }
    if (item.fields.thumbnail) {
      return item.fields.thumbnail
    }
    if (item.fields.image) {
      return item.fields.image
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} md={5} className={classes.gridLeft}>
        <TwoColumnHeader
          title={title}
          body={body}
          ctaLink={isEvents || isWorkshops ? paths.events : null}
          ctaLabel={
            (isEvents || isWorkshops) && limit ? `View all ${variant}s` : null
          }
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <Box mt={[5, 0]}>
          <Grid container>
            {items &&
              items.length > 0 &&
              items.slice(0, limit).map((item, key) => {
                const divider =
                  items.length - 1 > key ? (
                    <Divider className={classes.divider} />
                  ) : null
                return (
                  <Fragment key={`content-list-${key}`}>
                    <Grid item xs={12}>
                      <HorizontalCard
                        price={isWorkshops ? item.fields.memberPrice : null}
                        remaining={
                          isWorkshops ? 'only 12 seats remaining' : null
                        }
                        premium={
                          item.fields.premium ? item.fields.premium : null
                        }
                        label={
                          variant === 'event'
                            ? item.fields.type?.fields?.title
                            : item.fields.topic?.fields?.title
                        }
                        title={item.fields.title}
                        body={item.fields.body ? item.fields.body : null}
                        image={getImageObject(item)}
                        date={
                          item.fields.dateTime
                            ? dateFormat(item.fields.dateTime, 'longDate')
                            : ''
                        }
                        ctaLink={
                          isEvents || isWorkshops
                            ? paths.event({ slug: item.fields.slug })
                            : item.fields.url
                        }
                        variant={variant}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {divider}
                    </Grid>
                  </Fragment>
                )
              })}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
