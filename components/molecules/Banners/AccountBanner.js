import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid } from '@material-ui/core'
import TextStyle from '@/components/atoms/TextStyle'
import HorizontalNav from '@/components/molecules/horizontalnav'
import path from '../../../paths/path'
import {
  PAYMENTS,
  ORDERS,
  LEARNING,
  PREFERENCES,
  NOTES,
} from '@/components/UserAccount/tabConstants'
const useStyles = makeStyles((theme) => ({
  welcome: {
    backgroundColor: (props) => theme.palette.grey.extraLight,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(7),
    [theme.breakpoints.up('md')]: {
      height: 220,
      paddingBottom: 0,
    },
    borderBottomLeftRadius: 48,
    [theme.breakpoints.down('sm')]: {
      borderBottomLeftRadius: 0,
      padding: 0,
    },
  },

  navBtn: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  selected: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}))

export default function AccountBanner({ title, tab }) {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.welcome}>
        <TextStyle variant='h1'>{title}</TextStyle>
      </Box>
      <Box mt={1} pr={4}>
        <HorizontalNav
          items={[
            {
              label: 'My Account',
              url: path.account({ slug: '' }),
              selected: tab === PAYMENTS,
            },
            {
              label: 'My Orders',
              url: path.account({ slug: ORDERS }),
              selected: tab === ORDERS,
            },
            {
              label: 'My Learning',
              url: path.account({ slug: LEARNING }),
              selected: tab === LEARNING,
            },
            {
              label: 'My Preferences',
              url: path.account({ slug: PREFERENCES }),
              selected: tab === PREFERENCES,
            },
            {
              label: 'Notes and HighLights',
              url: path.account({ slug: NOTES }),
              selected: tab === NOTES,
            },
          ]}
          mainBtn={classes.navBtn}
          selectedBtn={classes.selected}
        />
      </Box>
    </>
  )
}
