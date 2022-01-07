import React from 'react'
import { Box, Divider, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import paths from '../../paths/path'
import TextStyle from '../atoms/TextStyle'
import ViewAllCTA from '../atoms/ViewAllCTA'
import HorizontalCard from './horizontalcard'

const useStyles = makeStyles((theme) => ({
  lists: {
    marginLeft: '-10px',
  },
}))

const _renderItems = (items, pathsVariant, noImage, lines) => {
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')

  return items.map((item, key) => {
    let image = ''
    if (item.fields?.thumbnail) {
      image = item.fields?.thumbnail
    } else {
      image = item.fields?.image
    }

    const divider =
      items.length - 1 > key ? (
        <Divider style={{ marginTop: 12, marginBottom: 8 }} />
      ) : null
    return (
      <Box key={`content-list-item-${item.fields?.title}`} mb={1} width='100%'>
        {item && item.fields && (
          <HorizontalCard
            key={item.fields.title}
            premium={item.fields.premium ? item.fields.premium : null}
            label={item.fields.topic?.fields?.title}
            title={item.fields.title}
            image={image}
            date={
              item.fields.issueDate
                ? timeAgo.format(Date.parse(item.fields.issueDate))
                : item.fields.date
                ? timeAgo.format(Date.parse(item.fields.date))
                : ''
            }
            ctaLink={
              pathsVariant
                ? paths[pathsVariant]({ slug: item.fields.slug })
                : item.fields.url
            }
            reverse
            variant={pathsVariant}
            noImage={noImage}
            lines={lines}
          />
        )}
        {divider}
      </Box>
    )
  })
}

export default function ContentList({
  title,
  items,
  ctaLabel,
  ctaLink,
  variant = null,
  noImage = false,
  align = 'center',
  lines,
}) {
  const classes = useStyles()

  return (
    <Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems={align}
        mb={2}
      >
        <TextStyle variant='h5'>{title}</TextStyle>
        {ctaLabel && <ViewAllCTA label={ctaLabel} href={ctaLink} lg />}
      </Box>

      <Grid container spacing={2} className={classes.lists}>
        {_renderItems(items, variant, noImage, lines)}
      </Grid>
    </Box>
  )
}
