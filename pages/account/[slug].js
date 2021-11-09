import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import AccountBanner from '@/components/molecules/Banners/AccountBanner'

import { useRouter } from 'next/router'
import useUserAccount from '../../lib/hooks/useUserAccount'
import CardItem from '../../components/molecules/Cards/CardType1'
import { orderItemToCardData } from '../../lib/data-transformations'
import AccountSettings from '@/components/UserAccount/AccountSettings'
import { MY_ACCOUNT, ORDERS, ACCOUNT_SETTINGS } from '@/const/myaccount-tabs'

const useStyles = makeStyles((theme) => ({}))
export default function AccountTab({ tab }) {
  const router = useRouter()
  const classes = useStyles()
  const { userAccountUser } = useUserAccount()
  console.log('useraccount ', userAccountUser)

  return (
    <Layout>
      <Box>
        <AccountBanner
          tab={tab}
          title={userAccountUser ? userAccountUser.name : 'Please log in'}
        />
      </Box>

      <Container maxWidth='lg'>
        <Box mt={8} mb={10}>
          {tab === ORDERS && <CardItem cardData={orderItemToCardData()} />}
          {tab === ACCOUNT_SETTINGS && <AccountSettings />}
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const tabs = [MY_ACCOUNT, ORDERS, ACCOUNT_SETTINGS]
  return {
    paths: tabs.map((tab) => ({
      params: { slug: tab },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      tab: params.slug,
    },
    revalidate: 20,
  }
}
