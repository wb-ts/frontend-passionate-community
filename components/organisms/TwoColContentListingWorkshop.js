import React from 'react'
import { Divider, Grid, Box, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import paths from '@/paths/path'
import HorizontalCard from '@/components/molecules/horizontalcard'
import TwoColumnHeader from '@/components/atoms/TwoColumnHeader'

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
                return (
                  <React.Fragment key={`content-list-${key}`}>
                    <Grid item xs={12}>
                      <HorizontalCard
                        key={item.title}
                        price={item.price}
                        remaining={item.remaining}
                        label={item.label}
                        title={item.title}
                        authorName={item.authorName}
                        image={item.image}
                        date={item.date}
                        ctaLink={item.actionHref}
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
