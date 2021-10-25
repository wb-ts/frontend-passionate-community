import React, { useEffect, useState } from 'react'
import { Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import AccountBanner from '@/components/molecules/Banners/AccountBanner'
import { useRouter } from 'next/router'
import useUserAccount from '../../lib/hooks/useUserAccount'
import PaymentsTab from '@/components/UserAccount/PaymentsTab'

import {
  PAYMENTS,
  ORDERS,
  LEARNING,
  PREFERENCES,
  NOTES,
} from '@/components/UserAccount/tabConstants'
import path from '../../paths/path'

const useStyles = makeStyles((theme) => ({}))
export default function MainTab({ tab }) {
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
        <AccountBanner
          tab={PAYMENTS}
          title={userAccountUser ? userAccountUser.name : 'Please log in'}
        />
      </Box>

      <Container maxWidth='lg'>
        <Box mt={8} mb={10}>
          <PaymentsTab />
        </Box>
      </Container>
    </Layout>
  )
}
