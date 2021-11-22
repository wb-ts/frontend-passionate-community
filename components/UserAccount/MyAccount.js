import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
import TextStyle from '@/components/atoms/TextStyle'
import CtaButton from '@/components/atoms/CtaButton'
import TwoColumnCta from '@/components/molecules/twocolumncta'
import HeroHalfHalf from '@/components/molecules/herohalfhalf'

import descriptionMock from '../../__mocks__/descriptionMock'
import paths from '@/paths/path'
import Axios from 'axios'
import qs from 'qs'
import useMembership from '../../lib/hooks/useMembership'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const MyAccount = ({ membershipData }) => {
  const classes = useStyles()

  const { description, getMoreText, upgradeData } = useMembership(
    membershipData?.membershipKeyword,
    membershipData?.period
  )

  const handleCancelMembership = () => {
    var data = qs.stringify({
      api_token: `${process.env.NEXT_PUBLIC_PIANO_API_KEY}`,
      aid: `${process.env.NEXT_PUBLIC_PIANO_APP_ID}`,
      subscription_id: membershipData?.subscriptionId,
    })
    var config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_PIANO_API_BASE_URL}/publisher/subscription/cancel`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    }

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Box>
      {membershipData?.period == 'month' && (
        <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
          <HeroHalfHalf
            title='Get more from ASCD and save'
            description='Switch your monthly membership to an annual membership and enjoy two months of ASCD for free.'
            image='images/monthlyMembership.png'
            imageAlt='Events banner image'
            ctaLabel1='Upgrade Membership'
            upgradeAnnualId='upgrade2annual'
          />
        </Box>
      )}

      <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
        <HeroHalfHalf
          title={getMoreText}
          description={descriptionMock}
          image='images/halfMembership.png'
          imageAlt='Events banner image'
          ctaLabel1={
            membershipData?.membershipName
              ? 'Upgrade Membership'
              : 'Buy Membership'
          }
          ctaLink1={
            membershipData?.membershipName ? null : paths.membershipDetails
          }
          ctaLabel2='Cancel Membership'
          ctaLink2={() => handleCancelMembership()}
          imagePos='left'
          variant='membership'
          membershipData={{ ...membershipData, description }}
          upgradeData={
            membershipData?.membershipName
              ? [
                  {
                    slug: membershipData?.membershipKeyword,
                    upgradeId: '',
                    description: description,
                  },
                ].concat(upgradeData)
              : []
          }
        />
      </Box>
    </Box>
  )
}

export default MyAccount
