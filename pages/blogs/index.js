import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Box, Container } from '@mui/material'
import Layout from '../../components/layout'
import { algoliaSearchIndexId, algoliaSearchIndices } from '../../lib/algolia'
import paths from '../../paths/path'

export default function Blogs() {
  const searchIndicesSortBy =
    process.env.NEXT_PUBLIC_ALGOLIA_INDEX_ID == 'ascd_dev'
      ? algoliaSearchIndices.dev[4].value
      : process.env.NEXT_PUBLIC_ALGOLIA_INDEX_ID == 'ascd_stage'
      ? algoliaSearchIndices.stage[4].value
      : process.env.NEXT_PUBLIC_ALGOLIA_INDEX_ID == 'ascd_master'
      ? algoliaSearchIndices.master[4].value
      : algoliaSearchIndices.dev[4].value

  useEffect(() => {
    // @TODO - redirect to search.
    Router.replace(
      paths.search({
        types: ['blog'],
        sortBy: [searchIndicesSortBy],
      })
    )
  }, [])
  return (
    <Layout>
      <Head>
        <title>{`ASCD: Blogs`}</title>
      </Head>
      <Container>
        <Box my={9}>Redirecting....</Box>
      </Container>
    </Layout>
  )
}
