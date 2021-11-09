import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
import TextStyle from '@/components/atoms/TextStyle'
import CtaButton from '@/components/atoms/CtaButton'
import TwoColumnCta from '@/components/molecules/twocolumncta'
import HeroHalfHalf from '@/components/molecules/herohalfhalf'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const MyAccount = ({ membershipData }) => {
  const classes = useStyles()
  return (
    <Box>
      {membershipData.period == 'month' && (
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
      )}

      <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
        <MembershipHalfHalf
          title='Get more from ASCD and save'
          description='Switch your monthly membership to an annual membership and enjoy two months of ASCD for free.'
          image='images/halfMembership.png'
          imageAlt='Events banner image'
          ctaLabel1='Upgrade Membership'
          ctaLink1={() => navigateTo('upcoming-events')}
          ctaLabel2='Cancel Membership'
          ctaLink2={() => navigateTo('upcoming-events')}
          imagePos='left'
          variant='membership'
          membershipData={membershipData}
        />
      </Box>
    </Box>
  )
}

export default MyAccount
