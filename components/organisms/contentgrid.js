import React, { useState } from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Box, Button, Divider, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { workshopItemToCardData } from '../../lib/data-transformations'
import paths from '../../paths/path'
import TextStyle from '../atoms/TextStyle'
import ViewAllCTA from '../atoms/ViewAllCTA'
import ContentCardListing from '../molecules/contentcardlisting'
import TopicTag from '../molecules/TopicTag'
import WorkshopListItem from '../molecules/Workshop/WorkshopListItem'

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: '367px',
    backgroundColor: theme.palette.primary.main,
  },
  metadata: {
    backgroundColor: '#E5E5E5',
    '& *': {
      fontWeight: 700,
      lineHeight: '18px',
      letterSpacing: '0.3px',
    },
  },
  viewall: {
    textDecoration: 'underline',
  },
  divider: {
    height: '1px',
    backgroundColor: theme.palette.grey.light,
    width: '100%',
  },
  topics: {
    width: '100%',
    marginBottom: -4,
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    overflowY: 'hidden',
    '-webkit-overflow-scrolling': 'touch',
    '&::-webkit-scrollbar': {
      display: 'none',
    } /* Chrome, Safari */,
    msOverflowStyle: 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,
    '& div': {
      float: 'none',
    },
    '&:webkit-scrollbar': {
      display: 'none',
    },
  },
}))

export default function ContentGrid({
  sectionTitle,
  items,
  contentLimit = 0,
  showFilters = true,
  showDivider = true,
  showViewAll = true,
  viewAllLink = paths.search({ types: [] }),
  columnWidth = 4,
  variant,
  limit = 12,
  useMemberBookPrice,
}) {
  const [state, setState] = useState({
    topic: '',
    gridLimit: limit,
  })
  const { topic, gridLimit } = state
  const classes = useStyles()

  const loadMore = () => {
    const more = gridLimit + 6 // add 2 more rows
    setState({ ...state, gridLimit: more })
  }

  const _renderTopicFilters = () => {
    const topicFilters = items
      .map((item) => item?.fields?.topic?.fields?.title)
      .reduce((unique, o) => {
        if (!unique.includes(o)) {
          unique.push(o)
        }
        return unique
      }, [])
      .sort()

    return topicFilters.map((filter, key) => (
      <TopicTag
        key={key}
        label={filter}
        variant='basicSmall'
        marginRight='8px'
        textTransform='uppercase'
        onclick={() => setState({ ...state, topic: filter })}
      />
    ))
  }
  const _renderItems = (items, columnWidth) => {
    return items
      .filter((item) => {
        if (topic !== '') {
          return topic == item.fields.topic.fields.title
        }
        return true
      })
      .slice(0, `${contentLimit ? contentLimit : items.length}`)
      .map((item, key) => {
        return (
          <Grid item xs={12} md={columnWidth} key={key}>
            <ContentCardListing item={item} />
          </Grid>
        )
      })
  }

  const _renderWorkshopItems = (items, columnWidth) => {
    return items
      .slice(0, `${contentLimit ? contentLimit : items.length}`)
      .map((item) => {
        return item?.fields?.variations.map((v) => {
          return (
            <Grid item xs={12} md={columnWidth} key={v.fields.variationId}>
              <WorkshopListItem
                useMemberBookPrice
                cardData={workshopItemToCardData(item, v)}
              />
            </Grid>
          )
        })
      })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display='flex' justifyContent='space-between'>
          <Box>
            <TextStyle variant='h4'>{sectionTitle}</TextStyle>
          </Box>

          {showViewAll && (
            <Box>
              <ViewAllCTA href={viewAllLink} label='View all' lg />
            </Box>
          )}
        </Box>
        {showDivider && (
          <Box mt={[1.5, 2.5]}>
            <Divider className={classes.divider} />
          </Box>
        )}
      </Grid>
      {showFilters && (
        <Grid item xs={12}>
          <Box className={classes.topics}>
            <TopicTag
              label='All Topics'
              variant='basicSmall'
              marginRight='8px'
              textTransform='uppercase'
              onclick={() => setState({ ...state, topic: '' })}
            />
            {_renderTopicFilters()}
          </Box>
        </Grid>
      )}
      {variant === 'workshop'
        ? _renderWorkshopItems(items.slice(0, gridLimit), columnWidth)
        : _renderItems(items.slice(0, gridLimit), columnWidth)}
      <Box my={10} textAlign='center'>
        {gridLimit < items.length && (
          <Button onClick={() => loadMore()} startIcon={<ArrowDownwardIcon />}>
            <TextStyle variant='h5'>View More</TextStyle>
          </Button>
        )}
      </Box>
    </Grid>
  )
}
