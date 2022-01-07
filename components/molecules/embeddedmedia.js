import React from 'react'
import Head from 'next/head'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `4px solid ${theme.palette.primary.light}`,
    backgroundColor: theme.palette.primary.main,
  },
  video: {
    height: '240px',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '425px',
    },
    [theme.breakpoints.up('md')]: {
      height: '460px',
    },
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

export default function EmbeddedMedia({ item }) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Head>
        <script
          src={`https://fast.wistia.com/embed/medias/${item?.fields.wistiaId}.jsonp`}
          async
        ></script>
        <script
          src='https://fast.wistia.com/assets/external/E-v1.js'
          async
        ></script>
      </Head>
      <div
        className={`wistia_embed wistia_async_${
          item.fields.wistiaId
        } seo=false ${
          item.fields.radio === 'Video' ? classes.video : classes.player
        }`}
      ></div>
    </Box>
  )
}
