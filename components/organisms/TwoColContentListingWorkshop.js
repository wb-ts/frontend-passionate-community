import React from 'react'
import { Divider, Grid, Box, ListItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { formatDateToCalendarMedium } from '../../lib/utils'
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
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
    },
  },
}))

export default function TwoColContentListingWorkshop({
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
  const ctaLink = isEvents
    ? paths.events
    : isWorkshops
    ? paths.workshop({ slug: '#allworkshops' })
    : null
  const dateFormat = require('dateformat')

  return (
    <Grid container>
      <Grid item xs={12} md={5} className={classes.gridLeft}>
        <TwoColumnHeader
          title={title}
          body={body}
          ctaLink={ctaLink}
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

                const itemData =
                  item.__typename === 'Workshop'
                    ? {
                        title: item.title,
                        authorName: `${item.authors.items[0].firstName} ${item.authors.items[0].lastName}`,
                        label: 'Author Workshop',
                        price:
                          item.variations.items.length > 0 &&
                          item.variations.items[0]
                            ? item.variations.items[0].nonMemberPrice
                            : '',
                        image: item.spotlightImage.imgSrc,
                        actionHref: `/workshops/${item.slug}`,
                        date:
                          item.variations.items.length > 0 &&
                          item.variations.items[0]
                            ? `${formatDateToCalendarMedium(
                                item.variations.items[0].sessions.items[0]
                                  .startDateTime
                              )}-${item.clockHours} Clock Hours`
                            : '',
                      }
                    : item

                return (
                  <React.Fragment key={`content-list-${key}`}>
                    <Grid item xs={12}>
                      <HorizontalCard
                        key={itemData.title}
                        price={itemData.price}
                        remaining={itemData.remaining}
                        label={itemData.label}
                        title={itemData.title}
                        authorName={itemData.authorName}
                        image={itemData.image}
                        date={itemData.date}
                        ctaLink={itemData.actionHref}
                        variant={variant}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {divider}
                    </Grid>
                  </React.Fragment>
                )
              })}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
