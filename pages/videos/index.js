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

export default function Videos({ videos, SEO }) {
  const featuredVideos = videos
    .filter((video) => video.fields.featured)
    .slice(0, 2)

  const otherVideos = videos.filter(
    (video) =>
      featuredVideos &&
      video.sys.id !== featuredVideos[0]?.sys.id &&
      video.sys.id !== featuredVideos[1]?.sys.id
  )

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <MediaBanner
        title='Videos, Podcasts & Webinars'
        subtitle='Watch effective, research-based practices in action. Listen to advice from skilled practitioners. Accelerate your learning journey on your time and your path.'
      />
      <Box mt={[8, 10]}>
        <MediaTabs tabValue={0} />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={[6, 10]}>
          {featuredVideos.length > 0 && (
            <>
              <Box display='flex' justifyContent='space-between' mb={3}>
                <TextStyle variant='h4'>Featured Videos</TextStyle>
                <ViewAllCTA
                  href={paths.search({ types: ['video'], featured: ['true'] })}
                  label='View all'
                  lg
                />
              </Box>

              <Grid container spacing={5}>
                <Grid item md={8} xs={12}>
                  {featuredVideos[0] && (
                    <PodcastThumbnail
                      podcast={featuredVideos[0]}
                      path='video'
                    />
                  )}
                </Grid>
                <Grid item md={4} xs={12}>
                  {featuredVideos[1] && (
                    <PodcastThumbnail
                      podcast={featuredVideos[1]}
                      path='video'
                    />
                  )}
                </Grid>
              </Grid>
            </>
          )}
          <Box mt={[6, 10]}>
            <ContentGrid
              sectionTitle='Latest Videos'
              items={otherVideos.slice(1)}
              viewAllLink={paths.search({ types: ['video'] })}
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
    content_type: 'video',
    order: '-fields.date',
  })
  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'videos',
  })
  return {
    props: {
      videos: data.items,
      SEO: SEOData.items.length ? SEOData.items[0] : {},
    },
    revalidate: 20,
  }
}
