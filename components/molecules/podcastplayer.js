import React from 'react'
import Head from 'next/head'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '../atoms/TextStyle'
import ViewAllCTA from '../atoms/ViewAllCTA'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `4px solid ${theme.palette.primary.light}`,
    backgroundColor: theme.palette.primary.main,
  },

  player: {
    position: 'relative',
    width: '100%',
    height: '230px',
    [theme.breakpoints.up('md')]: {
      margin: 'auto',
      width: '90%',
      height: '308px',
    },
  },
}))

export default function PodcastPlayer({ sectionTitle, ctaLink, podcast }) {
  const classes = useStyles()
  return (
    <Box key={Math.random()}>
      <Head>
        <script
          src={`https://fast.wistia.com/embed/medias/${podcast?.fields.wistiaId}.jsonp`}
          async
        ></script>
        <script
          src='https://fast.wistia.com/assets/external/E-v1.js'
          async
        ></script>
      </Head>
      {(sectionTitle || ctaLink) && (
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <TextStyle variant='h4'>{sectionTitle}</TextStyle>

          {ctaLink && <ViewAllCTA label='View all' href={ctaLink} lg />}
        </Box>
      )}
      <Box className={classes.root}>
        <div
          className={`wistia_embed wistia_async_${podcast.fields.wistiaId} seo=false ${classes.player}`}
        >
          &nbsp;
        </div>
      </Box>
    </Box>
  )
}
