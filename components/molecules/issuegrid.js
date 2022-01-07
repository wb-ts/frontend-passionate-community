import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { contentfulThumbnailAPIToImageUrl } from '../../lib/data-transformations'
import paths from '../../paths/path'
import FilterDropdown from '../atoms/FilterDropdown'
import TextStyle from '../atoms/TextStyle'
import NextImageWrapper from '../images/NextImageWrapper'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    transition: 'all .2s ease-in-out',
    padding: 10,
    marginBottom: 20,
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow:
        '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)!important',
      borderRadius: 4,
    },
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
  media: {
    width: '100%',
    minHeight: 309,
  },
  media: {
    position: 'relative',
    width: '100%',
    minHeight: 445,
    objectFit: 'fill',
    [theme.breakpoints.up('sm')]: {
      minHeight: 309,
    },
  },
  cardContentRoot: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
}))

export default function IssueGrid({ issues }) {
  const [year, setYear] = useState('')
  const [topic, setTopic] = useState('')
  const [yearFilter, setYearFilter] = useState([])
  const [topicFilter, setTopicFilter] = useState([])

  useEffect(() => {
    const yearFilter = issues
      .map((issue) => {
        const year = issue.fields.publicationDate.substring(0, 4)

        return {
          value: year,
          label: year,
        }
      })
      .reduce((unique, o) => {
        if (!unique.some((obj) => obj.value === o.value)) {
          unique.push(o)
        }
        return unique
      }, [])

    setYearFilter(yearFilter)
    const topicFilter = issues
      .filter((issue) => issue.fields.topics)
      .map((issue) => issue.fields.topics.fields?.title)
      .sort()

    topicFilter.unshift('All')

    setTopicFilter([...new Set(topicFilter)])
  }, [])

  useEffect(() => {
    if (yearFilter.length > 0) {
      setYear(yearFilter[0].value)
    }
  }, [yearFilter])

  useEffect(() => {
    if (topicFilter.length > 0) {
      setTopic(topicFilter[0])
    }
  }, [topicFilter])

  const _renderItems = (items) => {
    const dateFormat = require('dateformat')
    const classes = useStyles()

    return items
      .filter((item) => {
        if (year !== '') {
          const pubYear = item.fields.publicationDate.substring(0, 4)

          if (year !== pubYear) return false
        }

        return true
      })
      .filter((item) => {
        if (topic !== 'All') {
          if (
            !item.fields.topics ||
            (item.fields.topics && item.fields.topics.fields?.title !== topic)
          )
            return false
        }

        return true
      })
      .map((item, key) => {
        return (
          <Grid item xs={12} sm={4} md={3} key={key}>
            <Card className={classes.root} elevation={0} square>
              <CardActionArea
                href={paths.el({ slug: item.fields.slug })}
                classes={{
                  root: classes.cardActionRoot,
                  focusHighlight: classes.focusHighlight,
                }}
                disableRipple
              >
                <CardMedia title={item.fields.thumbnail?.fields?.alternate}>
                  <Box className={classes.media}>
                    {item?.fields?.thumbnail && (
                      <NextImageWrapper
                        src={contentfulThumbnailAPIToImageUrl(
                          item.fields.thumbnail
                        )}
                        alt={item.fields.thumbnail.fields?.alternate}
                        width={464}
                        height={600}
                      />
                    )}
                  </Box>
                </CardMedia>

                <CardContent className={classes.cardContentRoot}>
                  {item.fields.publicationDate && (
                    <TextStyle variant='h5'>
                      {dateFormat(
                        item.fields.publicationDate + 'T00:00:00',
                        'mmm yyyy'
                      )}
                      {/* Added the T00:00:00 so that JS Date() will not subtract a day */}
                    </TextStyle>
                  )}
                  <Box display='flex'>
                    {item.fields.volNo && (
                      <TextStyle variant='caption'>
                        Vol {item.fields.volNo}
                      </TextStyle>
                    )}
                    {item.fields.issueNo && (
                      <TextStyle variant='caption'>
                        , No. {item.fields.issueNo}
                      </TextStyle>
                    )}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )
      })
  }

  return (
    <Box>
      <Box mb={5} display='flex' alignItems='center'>
        <Box mr={1}>
          <TextStyle variant='h5'>Filters:</TextStyle>
        </Box>
        <Box mr={1}>
          <FilterDropdown
            items={yearFilter}
            defaultValue={year}
            action={(filterVal) => setYear(filterVal)}
          />
        </Box>
        <Box mr={1}>
          <FilterDropdown
            items={topicFilter}
            defaultValue={topic}
            action={(filterVal) => setTopic(filterVal)}
          />
        </Box>
      </Box>
      <Grid
        container
        style={{ marginLeft: '-10px', marginRight: '-10px' }}
        spacing={1.5}
      >
        {_renderItems(issues)}
      </Grid>
    </Box>
  )
}
