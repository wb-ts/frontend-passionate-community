import { useEffect, useState } from 'react'
import { Box, Container } from '@material-ui/core'
import Layout from '@/components/layout'
import AccountBanner from '@/components/molecules/Banners/AccountBanner'
import useUserAccess from '../../lib/hooks/useUserAccess'
import useMembership from '../../lib/hooks/useMembership'
import MyAccount from '@/components/UserAccount/MyAccount'
import { MY_ACCOUNT } from '@/const/myaccount-tabs'

export default function MainTab() {
  const {
    userName,
    membershipName,
    autoRenew,
    expireDate,
    price,
    period,
    membershipKeyword,
  } = useUserAccess()

  const { description } = useMembership(membershipKeyword)

  return (
    <Layout>
      <Box>
        <AccountBanner
          tab={MY_ACCOUNT}
          title={userName ? userName : 'Please log in'}
        />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={1} mb={8}>
          <MyAccount
            membershipName={membershipName}
            autoRenew={autoRenew}
            expireDate={expireDate}
            price={price}
            period={period}
            description={description}
          />
        </Box>
      </Container>
    </Layout>
  )
}
