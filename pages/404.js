import React from 'react'
import Head from 'next/head'
import { Box, Container } from '@mui/material'
import Layout from '../components/layout'
import GridSection from '../components/molecules/gridsection'
import TwoColumnCTA from '../components/molecules/twocolumncta'
import { client } from '../lib/contentful'
import paths from '../paths/path'

export default function NotFound({ featuredArticles }) {
  return (
    <Layout>
      <Head>
        <title ml={-0.25}>404 page not found</title>
      </Head>
      <Container>
        <Box my={12}>
          <TwoColumnCTA
            title='404'
            ctaLabel2='Head over to our search page to find out what you need'
            ctaLink2='/search'
            description='Why do pencils have erasers? Because we all make mistakes.'
            image='/images/image404.png'
            imagePos='right'
            variant='error'
            descriptionLineNumbers={8}
          />
        </Box>
        <Box mb={10}>
          <GridSection
            title='Featured Articles'
            ctaLink={paths.search({
              types: ['article'],
              sortBy: ['featured_article'],
              featured: ['true'],
            })}
            items={featuredArticles}
            variant='articleOverlay'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.getEntries({
    content_type: 'article',
    limit: 3,
    'fields.featured': true,
    order: '-fields.issueDate',
  })

  return {
    props: {
      featuredArticles: data.items,
    },
  }
}
