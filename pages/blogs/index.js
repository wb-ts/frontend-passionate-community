import React from 'react'
import Layout from '@/components/layout'
import { Box, Container } from '@material-ui/core'
import Head from 'next/head'
import paths from '@/paths/path'
import Router from 'next/router'
import { useEffect } from 'react'
import { algoliaSearchIndexId, algoliaSearchIndices } from '@/lib/algolia'

export default function Blogs({}) {
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
