import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Box, Container } from '@mui/material'
import Layout from '../../components/layout'
import paths from '../../paths/path'

export default function Collections() {
  useEffect(() => {
    Router.replace(
      paths.search({
        types: ['collection'],
      })
    )
  }, [])

  return (
    <Layout>
      <Head>
        <title>{`ASCD: Collections`}</title>
      </Head>
      <Container>
        <Box my={9}>Redirecting....</Box>
      </Container>
    </Layout>
  )
}
