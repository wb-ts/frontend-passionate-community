import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import TextStyle from '@/components/atoms/TextStyle'
import CtaButton from '@/components/atoms/CtaButton'
import TwoColumnCta from '@/components/molecules/twocolumncta'
import HeroHalfHalf from '@/components/molecules/herohalfhalf'
import MembershipHalfHalf from '@/components/molecules/MembershipHalfHalf'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const MyAccount = ({
  membershipName,
  autoRenew,
  expireDate,
  price,
  period,
  description,
}) => {
  const classes = useStyles()
  return (
    <Box>
      <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
        <HeroHalfHalf
          title='Get more from ASCD and save'
          description='Switch your monthly membership to an annual membership and enjoy two months of ASCD for free.'
          image='images/monthlyMembership.png'
          imageAlt='Events banner image'
          ctaLabel1='Upgrade Membership'
          ctaLink1={() => navigateTo('upcoming-events')}
        />
      </Box>
      <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
        <MembershipHalfHalf
          title='Get more from ASCD and save'
          description='Switch your monthly membership to an annual membership and enjoy two months of ASCD for free.'
          image='images/monthlyMembership.png'
          imageAlt='Events banner image'
          ctaLabel1='Upgrade Membership'
          ctaLink1={() => navigateTo('upcoming-events')}
          ctaLabel2='Cancel Membership'
          ctaLink2={() => navigateTo('upcoming-events')}
          imagePos='left'
        />
      </Box>
    </Box>
  )
}

export default MyAccount
