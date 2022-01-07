import React from 'react'
import { Box, Container } from '@mui/material'
import Layout from '../../components/layout'
import IssueBannerTitle from '../../components/molecules/issuebannertitle'
import IssueGrid from '../../components/molecules/issuegrid'
import TwoColumnCta from '../../components/molecules/twocolumncta'
import { SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import paths from '../../paths/path'

export default function AllIssues({ publications, SEO, featuredAuthors }) {
  publications.sort((a, b) => {
    if (new Date(b.fields.publicationDate) > new Date(a.fields.publicationDate))
      return 1
    else if (
      new Date(b.fields.publicationDate) < new Date(a.fields.publicationDate)
    )
      return -1
    else return 0
  })

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Container maxWidth='lg'>
        <Box mt={10} maxWidth='600px'>
          <IssueBannerTitle
            tag='Educational Leadership'
            landing={{
              title: 'All Issues',
              subtitle:
                'Evidence-based, peer-to-peer guidance and professional knowledge since 1943.',
            }}
            ctaLabel='Subscribe'
            ctaLink={paths.subscribe}
            authors={{
              ctaLabel: '100+ Featured Authors',
              ctaLink: paths.authors,
            }}
            featuredAuthors={featuredAuthors}
            align='left'
          />
        </Box>

        <Box my={[5, 10]}>
          <IssueGrid issues={publications} />
        </Box>

        <Box mb={10}>
          <TwoColumnCta
            title='Write for EL Magazine'
            description='Share your writing with more than 135,000 educators. Get a feel for our upcoming themes and writing guidelines. '
            ctaLabel1='View upcoming themes'
            ctaLink1={paths.el({ slug: 'write' })}
            ctaLabel2='View guidelines'
            ctaLink2={'/guidelines-for-el'}
            imagePos='right'
            image='/images/el.png'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const maxEntries = 1000
  let offset = 0
  let items = []
  let processedEntries = null
  while (processedEntries !== 0) {
    const entries = await client.getEntries({
      content_type: 'pubissue',
      select:
        'fields.slug,fields.title,fields.volNo,fields.issueNo,fields.publicationDate,fields.topics,fields.topicSecondary,fields.thumbnail',
      include: 2,
      skip: offset,
      limit: maxEntries,
    })

    processedEntries = entries.items.length

    if (processedEntries > 0) {
      offset += processedEntries
      items.push(...entries.items)
    }
  }

  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'el',
    limit: 1,
  })

  const profileCategories = await client.getEntries({
    content_type: 'categoryProfiles',
    'fields.title': 'Author',
  })

  const authors = await client.getEntries({
    content_type: 'profile',
    //'fields.profileType.sys.contentType.sys.id': 'categoryProfiles',
    'fields.profileType.sys.id': profileCategories.items[0]?.sys.id,
    limit: 3,
  })

  return {
    props: {
      publications: items,
      SEO: SEOData.items.length ? SEOData.items[0] : {},
      featuredAuthors: authors.items,
    },
    revalidate: 20,
  }
}
