import React from 'react'
import { Box, Container, Grid } from '@mui/material'
import TextStyle from '../../components/atoms/TextStyle'
import ViewAllCTA from '../../components/atoms/ViewAllCTA'
import Layout from '../../components/layout'
import MediaBanner from '../../components/molecules/mediabanner'
import MediaTabs from '../../components/molecules/mediatabs'
import PodcastThumbnail from '../../components/molecules/podcastthumbnail'
import TextCTA from '../../components/molecules/textcta'
import ContentGrid from '../../components/organisms/contentgrid'
import { SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import paths from '../../paths/path'

export default function Webinars({ webinars, SEO }) {
  const featuredWebinars = webinars
    .filter((webinar) => webinar.fields.featured)
    .slice(0, 2)
  const otherWebinars = webinars.filter(
    (webinar) =>
      featuredWebinars &&
      webinar.sys.id !== featuredWebinars[0]?.sys.id &&
      webinar.sys.id !== featuredWebinars[1]?.sys.id
  )

  return (
    <Layout>
      <SEOHead seo={SEO} />

      <MediaBanner
        title='Videos, Podcasts & Webinars'
        subtitle='Watch effective, research-based practices in action. Listen to advice from skilled practitioners. Accelerate your learning journey on your time and your path.'
      />
      <Box mt={[8, 10]}>
        <MediaTabs tabValue={2} />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={[6, 10]}>
          <Box display='flex' justifyContent='space-between' mb={3}>
            <TextStyle variant='h4'>Featured Webinars</TextStyle>
            <ViewAllCTA
              href={paths.search({ types: ['webinar'], featured: ['true'] })}
              label='View all'
              lg
            />
          </Box>
          <Grid container spacing={5}>
            <Grid item md={8} xs={12}>
              {featuredWebinars[0] && (
                <PodcastThumbnail
                  podcast={featuredWebinars[0]}
                  path='webinar'
                />
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              {featuredWebinars[1] && (
                <PodcastThumbnail
                  podcast={featuredWebinars[1]}
                  path='webinar'
                />
              )}
            </Grid>
          </Grid>
          <Box mt={[6, 10]}>
            <ContentGrid
              sectionTitle='Latest Webinars'
              items={otherWebinars.slice(1)}
              viewAllLink={paths.search({ types: ['webinar'] })}
            />
          </Box>
        </Box>
        <Box my={[4, 10]} mt={[2, 6]}>
          <TextCTA
            ctaLabel='Become a member to access more great content'
            ctaLink={paths.subscribe}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.getEntries({
    content_type: 'webinar',
    order: '-fields.date',
  })
  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'webinars',
  })

  return {
    props: {
      webinars: data.items,
      SEO: SEOData.items.length ? SEOData.items[0] : {},
    },
    revalidate: 20,
  }
}
