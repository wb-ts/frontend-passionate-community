import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Container, Grid, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TOCNav from '../../components/atoms/TOCNav'
import Layout from '../../components/layout'
import ContentList from '../../components/molecules/contentlist'
import PodcastPlayer from '../../components/molecules/podcastplayer'
import ReadMore from '../../components/molecules/readmore'
import VideoPlayer from '../../components/molecules/videoplayer'
import HorizontalScroll from '../../components/organisms/horizontalscroll'
import IssueBanner from '../../components/organisms/issuebanner'
import { SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import paths from '../../paths/path'

const useStyles = makeStyles((theme) => ({
  body: {
    width: '100%',
    maxWidth: 700,
  },
  toc: {
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      top: 250,
    },
  },
}))

export default function Publication({ publication, publications }) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Skeleton
        animation='wave'
        variant='rectangular'
        width='100%'
        height='100px'
      />
    )
  }

  const classes = useStyles()

  const features = publication.fields.articles
    ? publication.fields.articles.filter((article) => {
        return article.fields?.elArticleType == 'Feature Articles'
      })
    : ''

  const columns = publication.fields.articles
    ? publication.fields.articles.filter(
        (article) =>
          article.fields?.elArticleType ==
          'Articles in Columns/Departments Section'
      )
    : ''

  const advisories = publication.fields.articles
    ? publication.fields.articles.filter(
        (article) =>
          article.fields?.elArticleType ==
          'Article in Advisory: Trends and Ideas'
      )
    : ''

  const newvoices = publication.fields.articles
    ? publication.fields.articles.filter(
        (article) => article.fields?.elArticleType == 'New Voices'
      )
    : ''

  const online = publication.fields.articles
    ? publication.fields.articles.filter(
        (article) => article.fields?.elArticleType == 'Online Only, Exclusives'
      )
    : ''

  const tools = publication.fields.articles
    ? publication.fields.articles.filter(
        (article) => article.fields?.elArticleType == 'Tools for Implementation'
      )
    : ''

  const videos = publication.fields.articles
    ? publication.fields.articles.filter(
        (article) => article.fields?.elArticleType == 'Video'
      )
    : ''

  const morearticles = publication.fields.articles
    ? publication.fields.articles.filter(
        (article) => !article.fields?.elArticleType
      )
    : ''

  const recentPubs = publications.filter(
    (pub) => pub.fields.issueNo !== publication.fields.issueNo
  )

  const toc_items = () => {
    const items = []

    if (publication.fields.shortDescription)
      items.push({ id: 'about', label: 'About this issue' })

    if (features.length > 0) items.push({ id: 'features', label: 'Features' })

    if (columns.length > 0) {
      items.push({ id: 'columns', label: 'Columns' })
    }

    if (advisories.length > 0) {
      items.push({ id: 'advisories', label: 'Advisory: Trends and Ideas' })
    }

    if (newvoices.length > 0) {
      items.push({ id: 'newvoices', label: 'New Voices' })
    }

    if (online.length > 0) {
      items.push({ id: 'onlineonly', label: 'Online Exclusives' })
    }

    if (tools.length > 0) {
      items.push({ id: 'tools', label: 'Tools for Implementation' })
    }

    if (videos.length > 0) {
      items.push({ id: 'videos', label: 'Videos' })
    }

    if (publication.fields.podcast)
      items.push({ id: 'podcast', label: 'Featured Podcast' })

    if (publication.fields.video) {
      items.push({ id: 'video', label: 'Featured Video' })
    }

    if (morearticles.length > 0) {
      items.push({ id: 'more', label: 'More Articles' })
    }
    return items
  }

  return (
    <Layout>
      <SEOHead
        seo={publication?.fields?.seo ? publication.fields.seo : publication}
      />
      <Head>
        <script
          src={`https://fast.wistia.com/embed/medias/${publication?.fields?.podcast?.fields?.wistiaId}.jsonp`}
          async
        ></script>
        <script
          src='https://fast.wistia.com/assets/external/E-v1.js'
          async
        ></script>
      </Head>
      <IssueBanner issue={publication} />

      <Grid container>
        <Grid item xs={false} md={2}>
          <Box
            ml={[2, 2, 2, 10]}
            mt={6}
            className={classes.toc}
            display={['none', 'none', 'block']}
          >
            <TOCNav
              toc_items={toc_items()}
              activeBorderWidth='4px'
              backgroundColor='white'
              borderLeft
              maxWidth='290px'
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Container maxWidth='lg'>
            <Box margin='auto' className={classes.body}>
              <Box
                mt={[6, 10]}
                id='about'
                width={['327px', '100%']}
                ml='auto'
                mr='auto'
              >
                {publication &&
                  publication.fields.shortDescription &&
                  publication.fields.description && (
                    <ReadMore
                      title='About this Issue'
                      titleVariant='h4'
                      short={publication.fields.shortDescription}
                      long={publication.fields.description}
                    />
                  )}
              </Box>

              {features.length > 0 && (
                <Box mt={[6, 10]} id='features'>
                  <ContentList
                    title='Features'
                    items={features}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {columns.length > 0 && (
                <Box mt={4} id='columns'>
                  <ContentList
                    title='Columns'
                    items={columns}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {advisories.length > 0 && (
                <Box mt={4} id='advisories'>
                  <ContentList
                    title='Advisory: Trends and Ideas'
                    items={advisories}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {newvoices.length > 0 && (
                <Box mt={4} id='newvoices'>
                  <ContentList
                    title='New Voices'
                    items={newvoices}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {online.length > 0 && (
                <Box mt={4} id='onlineonly'>
                  <ContentList
                    title='Online Exclusives'
                    items={online}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {tools.length > 0 && (
                <Box mt={4} id='tools'>
                  <ContentList
                    title='Tools for Implementation'
                    items={tools}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {videos.length > 0 && (
                <Box mt={4} id='videos'>
                  <ContentList
                    title='Videos'
                    items={videos}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}

              {publication.fields.podcast && (
                <Box mt={[6, 10]} id='podcast'>
                  <PodcastPlayer
                    sectionTitle='Listen & Learn'
                    podcast={publication.fields.podcast}
                    ctaLink={paths.podcast({ slug: '' })}
                    autoplay
                  />
                </Box>
              )}

              {publication.fields.video && publication.fields.video.fields && (
                <Box mt={[6, 10]} id='video'>
                  <VideoPlayer
                    sectionTitle='Featured Video'
                    ctaLink={paths.video({ slug: '' })}
                    video={publication.fields.video}
                  />
                </Box>
              )}

              {morearticles.length > 0 && (
                <Box mt={[6, 10]} id='more'>
                  <ContentList
                    title='More Articles'
                    items={morearticles}
                    variant='article'
                    align='flex-start'
                  />
                </Box>
              )}
            </Box>
            <Box mt={[3, 8]} mb={[3, 4]}>
              <HorizontalScroll
                title='Recent Issues'
                ctaLabel='View all'
                ctaLink={paths.el({ slug: 'all' })}
                items={recentPubs}
                type='issuetile'
              />
            </Box>
          </Container>
        </Grid>
        <Grid item xs={false} md={2}></Grid>
      </Grid>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'pubissue',
    select: 'fields.slug',
    limit: process.env.NEXT_STATIC_BUILD_LIMIT || 200,
  })

  return {
    paths: data.items.map((item) => ({
      params: { slug: item.fields.slug },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'pubissue',
    'fields.slug': params.slug,
    include: 2,
    limit: 1,
  })

  if (!data || !data.items || data.items.length == 0) {
    return {
      notFound: true,
    }
  }

  const publications = await client.getEntries({
    content_type: 'pubissue',
    order: '-fields.publicationDate',
    limit: 8,
  })

  return {
    props: {
      publication: data.items.length ? data.items[0] : null,
      publications: publications.items,
    },
    revalidate: 20,
  }
}
