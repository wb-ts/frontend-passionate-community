import { Box, Container } from '@mui/material'
import Layout from '@/components/layout'
import AccountBanner from '@/components/molecules/Banners/AccountBanner'
import useUserAccess from '../../lib/hooks/useUserAccess'
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
  } = useUserAccess()

  const { description, upgradeData } = useMembership(membershipKeyword)
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
            membershipData={{
              membershipName,
              autoRenew,
              expireDate,
              price,
              period,
              description,
            }}
            upgradeData={[
              {
                slug: membershipKeyword,
                upgradeId: '',
                description: description,
              },
            ].concat(upgradeData)}
          />
        </Box>
      </Container>
    </Layout>
  )
}
