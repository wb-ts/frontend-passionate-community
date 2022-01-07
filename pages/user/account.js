import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Box, Container } from '@mui/material'
import Layout from '../../components/layout'
import Banner from '../../components/molecules/banner'
import TwoColumnCta from '../../components/molecules/twocolumncta'

const PianoAccount = dynamic(
  () => import('../../components/piano/pianoaccount'),
  {
    ssr: false,
  }
)

export default function UserAccount() {
  return (
    <Layout>
      <Head>
        <title>{`ASCD: My Account`}</title>
      </Head>
      <Banner header1='My Account' />
      <Container>
        <Box my={11}>
          <PianoAccount />
          <Box id='my-account'>Loading...</Box>
        </Box>
      </Container>
      <Container>
        <Box my={11}>
          <TwoColumnCta
            title='Write for ASCD'
            description='We publish insightful, actionable, relevant work from educators across all levels of education that help educators learn, teach and lead.'
            ctaLabel1='Learn more'
            ctaLink1='https://elmagazine.submittable.com/submit'
            image='/images/write_for_ascd.svg'
            imagePos='left'
          />
        </Box>
      </Container>
    </Layout>
  )
}
