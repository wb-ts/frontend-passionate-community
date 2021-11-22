import { Box, Container } from '@mui/material'
import Layout from '@/components/layout'
import AccountBanner from '@/components/molecules/Banners/AccountBanner'
import useUserSubscription from '../../lib/hooks/useUserSubscription'
import useUserAccount from '../../lib/hooks/useUserAccount'
import useMembership from '../../lib/hooks/useMembership'
import MyAccount from '@/components/UserAccount/MyAccount'
import { MY_ACCOUNT } from '@/const/myaccount-tabs'

export default function MainTab() {
  const {
    membershipName,
    autoRenew,
    expireDate,
    price,
    period,
    membershipKeyword,
    subscriptionId,
  } = useUserSubscription()

  const { userAccountUser } = useUserAccount()

  return (
    <Layout>
      <Box>
        <AccountBanner
          tab={MY_ACCOUNT}
          title={userAccountUser ? userAccountUser.name : 'Please log in'}
        />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={1} mb={8}>
          <MyAccount
            membershipData={
              userAccountUser
                ? {
                    membershipName,
                    autoRenew,
                    expireDate,
                    price,
                    period,
                    subscriptionId,
                    membershipKeyword,
                  }
                : null
            }
          />
        </Box>
      </Container>
    </Layout>
  )
}
