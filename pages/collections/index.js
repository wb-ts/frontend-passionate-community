import React, { useEffect } from 'react'
import Layout from '@/components/layout'
import { Box, Container } from '@material-ui/core'
import Head from 'next/head'
import paths from '@/paths/path'
import Router from 'next/router'

export default function Collections({}) {
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
