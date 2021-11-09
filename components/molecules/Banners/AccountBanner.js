import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, alpha, Container } from '@mui/material'

import TextStyle from '@/components/atoms/TextStyle'
import HorizontalNav from '@/components/molecules/HorizontalNav'
import path from '../../../paths/path'
import { MY_ACCOUNT, ORDERS, ACCOUNT_SETTINGS } from '@/const/myaccount-tabs'
const useStyles = makeStyles((theme) => ({
  welcome: {
    backgroundColor: (props) => theme.palette.grey.extraLight,
    width: '100%',
    paddingBottom: theme.spacing(7),
    display: 'flex',
    alignItems: 'center',
    background:
      'linear-gradient(to bottom left,' +
      theme.palette.grey.extraLight +
      ' 50%,' +
      alpha(theme.palette.background.light, 0.4) +
      ' 50%)',
    [theme.breakpoints.up('md')]: {
      height: 306,
      borderBottomLeftRadius: 180,
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
    borderRadius: '4px',
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
        <Container>
          <TextStyle variant='h3'>Welcome,</TextStyle>
          <TextStyle variant='h1'>{title}</TextStyle>
        </Container>
      </Box>
      <Box mt={1} pr={4}>
        <HorizontalNav
          items={[
            {
              label: 'My Account',
              url: path.account({ slug: '' }),
              selected: tab === MY_ACCOUNT,
            },
            {
              label: 'My Orders',
              url: path.account({ slug: ORDERS }),
              selected: tab === ORDERS,
            },

            {
              label: 'Account Settings',
              url: path.account({ slug: ACCOUNT_SETTINGS }),
              selected: tab === ACCOUNT_SETTINGS,
            },
          ]}
          mainBtn={classes.navBtn}
          selectedBtn={classes.selected}
        />
      </Box>
    </>
  )
}
