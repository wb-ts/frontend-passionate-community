import React from 'react'
import { Box, Container } from '@material-ui/core'
import Layout from '@/components/layout'
import AccountBanner from '@/components/molecules/Banners/AccountBanner'
import useUserAccessById from '../../lib/hooks/useUserAccessById'
import PaymentsTab from '@/components/UserAccount/PaymentsTab'
import { PAYMENTS } from '@/components/UserAccount/tabConstants'

export default function MainTab() {
  const {
    userName,
    membershipName,
    autoRenew,
    expireDate,
    price,
    period,
    description,
  } = useUserAccessById()

  return (
    <Layout>
      <Box>
        <AccountBanner
          tab={PAYMENTS}
          title={userName ? userName : 'Please log in'}
        />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={8} mb={10}>
          <PaymentsTab
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
