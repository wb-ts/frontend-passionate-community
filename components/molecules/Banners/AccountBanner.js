import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Box, Grid } from '@material-ui/core'
import TextStyle from '@/components/atoms/TextStyle'
import { FullscreenExit } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) => theme.palette.background.lightGreen,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(7),
    [theme.breakpoints.up('md')]: {
      height: 220,
      paddingBottom: 0,
    },
  },
}))

export default function AccountBanner({ label, title, description }) {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.root}>
        <TextStyle variant='h1'>{title}</TextStyle>
      </Box>
    </>
  )
}
