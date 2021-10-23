import React, { useEffect, useState } from 'react'
import { Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import AccountBanner from '@/components/molecules/Banners/AccountBanner'

import HorizontalNav from '@/components/molecules/horizontalnav'
import { useRouter } from 'next/router'
import useUserAccount from '../../lib/hooks/useUserAccount'
import PaymentsTab from '@/components/UserAccount/PaymentsTab'
import OrdersTab from '@/components/UserAccount/OrdersTab'
import LearningTab from '@/components/UserAccount/LearningTab'
import PreferencesTab from '@/components/UserAccount/PreferencesLab'
import {
  PAYMENTS,
  ORDERS,
  LEARNING,
  PREFERENCES,
  NOTES,
} from '@/components/UserAccount/tabConstants'
import path from '../../paths/path'
const useStyles = makeStyles((theme) => ({
  horizontalNav: {
    backgroundColor: theme.palette.background.lightGreen,
    borderBottomLeftRadius: 48,
    [theme.breakpoints.down('sm')]: {
      borderBottomLeftRadius: 0,
      padding: 0,
    },
  },
  navBtn: {
    background: theme.palette.background.lightGreen,
    marginLeft: 0,
    marginRight: 0,
    width: 200,
    height: 48,
    padding: 8,
  },
  selected: {
    marginLeft: 0,
    marginRight: 0,
    width: 200,
    height: 48,
    padding: 8,
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}))
export default function AccountTab({ tab }) {
  const router = useRouter()
  const classes = useStyles()
  const { userAccountUser } = useUserAccount()
  console.log('useraccount ', userAccountUser)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
    }
  }, [])

  return (
    <Layout>
      <Box>
        {userAccountUser ? (
          <AccountBanner
            label={'Books'}
            title={`Welcome, ${userAccountUser?.name}`}
          />
        ) : (
          <AccountBanner label={'Books'} title='loading' />
        )}
      </Box>

      <Box className={classes.horizontalNav} pr={4}>
        <HorizontalNav
          items={[
            {
              label: 'My Account',
              url: path.account({ slug: PAYMENTS }),
            },
            {
              label: 'My Orders',
              url: path.account({ slug: ORDERS }),
            },
            {
              label: 'My Learning',
              url: path.account({ slug: LEARNING }),
            },
            {
              label: 'My Preferences',
              url: path.account({ slug: PREFERENCES }),
            },
            {
              label: 'Notes and HighLights',
              url: path.account({ slug: NOTES }),
            },
          ]}
          main={classes.navBtn}
          tab={tab}
          selected={classes.selected}
        />
      </Box>

      <Container maxWidth='lg'>
        <Box mt={8} mb={10}>
          {tab === PAYMENTS && <PaymentsTab />}
          {tab === ORDERS && <OrdersTab />}
          {tab === LEARNING && <LearningTab />}
          {tab === PREFERENCES && <PreferencesTab />}
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const tabs = [PAYMENTS, ORDERS, LEARNING, PREFERENCES, NOTES]
  return {
    paths: tabs.map((tab) => ({
      params: { slug: tab },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      tab: params.slug,
    },
  }
}
