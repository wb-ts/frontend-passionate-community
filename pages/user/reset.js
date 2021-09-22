import Layout from '@/components/layout'
import Banner from '@/components/molecules/banner'
import TwoColumnCta from '@/components/molecules/twocolumncta'
import { Box, Container } from '@material-ui/core'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'

const PianoReset = dynamic(() => import('@/components/piano/pianoreset'), {
  ssr: false,
})

export default function UserReset({}) {
  return (
    <Layout>
      <Head>
        <title>{`ASCD: Reset Password`}</title>
      </Head>
      <Banner header1='Reset Password' />
      <Container>
        <Box my={11}>
          <PianoReset />
        </Box>
      </Container>
      <Container>
        <Box my={11}>
          <TwoColumnCta
            title='Write for ASCD'
            description='We publish insightful, actionable, relevant work from educators across all levels of education that help educators learn, teach and lead.'
            ctaLabel1='Learn more'
            ctaLink1='#'
            image='/images/write_for_ascd.svg'
            imagePos='left'
          />
        </Box>
      </Container>
    </Layout>
  )
}
