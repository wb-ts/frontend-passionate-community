import React from 'react'
import Head from 'next/head'
import { Box, Container } from '@mui/material'
import Layout from '../components/layout'
import TwoColumnCTA from '../components/molecules/twocolumncta'

export default function NotFound() {
  return (
    <Layout>
      <Head>
        <title>500 internal server error</title>
      </Head>
      <Container>
        <Box my={20}>
          <TwoColumnCTA
            title='500'
            ctaLabel2='Back to ascd.org'
            ctaLink2='https://www.ascd.org'
            description='Error occurred while processing your request.'
            image='/images/image404.svg'
            imagePos='right'
            variant='error'
          />
        </Box>
      </Container>
    </Layout>
  )
}
