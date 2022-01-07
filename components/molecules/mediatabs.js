import React from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import { makeStyles } from '@mui/styles'
import paths from '../../paths/path'

const useStyles = makeStyles((theme) => ({
  tab: {
    color: theme.palette.grey.medium,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '1.375rem',
    textTransform: 'capitalize',
    minHeight: '50px',
    position: 'relative',
    opacity: 1,
    '& svg': {
      position: 'absolute',
      right: 0,
      top: 25,
      color: '#11C142',
      width: '10px',
      height: '10px',
    },
  },
  selected: {
    color: theme.palette.common.black,
  },
  divider: {
    height: '1px',
    backgroundColor: theme.palette.grey.light,
    width: '100%',
  },
}))

export default function MediaTabs({ tabValue }) {
  const classes = useStyles()

  const router = useRouter()

  return (
    <>
      <Box my={1}>
        <Container>
          <Tabs
            value={tabValue}
            centered
            aria-label='Trending webinars tabs'
            TabIndicatorProps={{
              style: {
                backgroundColor: '#005E47',
                height: '6px',
                color: 'black',
              },
            }}
          >
            <Tab
              label='Videos'
              id='wrapped-tab-0'
              className={classes.tab}
              classes={{
                selected: classes.selected,
              }}
              onClick={() => router.push(`${paths.video({ slug: '/' })}`)}
            />
            <Tab
              label='Podcasts'
              id='wrapped-tab-1'
              className={classes.tab}
              classes={{
                selected: classes.selected,
              }}
              onClick={() => router.push(`${paths.podcast({ slug: '/' })}`)}
            />
            <Tab
              label='Past Webinars'
              id='wrapped-tab-2'
              className={classes.tab}
              classes={{
                selected: classes.selected,
              }}
              onClick={() => router.push(`${paths.webinar({ slug: '/' })}`)}
            />
          </Tabs>
        </Container>
        <Divider className={classes.divider} />
      </Box>
    </>
  )
}
