import React from 'react'
import Head from 'next/head'
import { Box, Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '../../components/atoms/TextStyle'
import ViewAllCTA from '../../components/atoms/ViewAllCTA'
import Layout from '../../components/layout'
import GridSection from '../../components/molecules/gridsection'
import IssueBannerTitle from '../../components/molecules/issuebannertitle'
import PodcastPlayer from '../../components/molecules/podcastplayer'
import PodcastThumbnail from '../../components/molecules/podcastthumbnail'
import TextCTA from '../../components/molecules/textcta'
import Topics from '../../components/molecules/Topics'
import TwoColumnCta from '../../components/molecules/twocolumncta'
import HorizontalScroll from '../../components/organisms/horizontalscroll'
import { configsPages, imageoptimization, SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import paths from '../../paths/path'

const useStyles = makeStyles(() => ({}))

export default function Resources({
  page,
  articles,
  featuredPub,
  topics,
  videos,
  podcast,
  books,
  featuredAuthor,
  SEO,
}) {
  const popularTopics = topics
    .map((topic) => topic.fields?.title)
    .reduce((unique, o) => {
      if (!unique.includes(o)) {
        unique.push(o)
      }
      return unique
    }, [])

  const dateFormat = require('dateformat')

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Head>
        <script
          src={`https://fast.wistia.com/embed/medias/${podcast.fields.wistiaId}.jsonp`}
          async
        ></script>
        <script
          src='https://fast.wistia.com/assets/external/E-v1.js'
          async
        ></script>
      </Head>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12}>
            <Box mt={[6, 10]} display='flex' justifyContent='center'>
              <IssueBannerTitle
                landing={{
                  title: 'Read, Watch & Listen to Top Educators',
                  subtitle:
                    'Accelerate your path with high-quality content that helps you reach new heights',
                }}
                align='center'
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={[6, 10]}>
              <GridSection
                title='Featured Articles'
                ctaLink={paths.search({
                  types: ['article'],
                  featured: ['true'],
                })}
                items={articles}
              />
            </Box>
            <Box mt={[6, 10]}>
              <TwoColumnCta
                imagePos={'right'}
                image={
                  featuredPub.fields?.featuredImage?.fields?.imageBynder
                    ? featuredPub.fields?.featuredImage?.fields?.imageBynder[0]
                        ?.src +
                      '?' +
                      imageoptimization.qualityParameter +
                      '=' +
                      imageoptimization.qualityValue
                    : featuredPub.fields?.featuredImage?.fields?.imageContentful
                        ?.fields?.file?.url
                    ? featuredPub.fields?.featuredImage?.fields?.imageContentful
                        ?.fields?.file?.url +
                      '?' +
                      imageoptimization.qualityParameter +
                      '=' +
                      imageoptimization.qualityValue
                    : '/images/ASCDImageFiller.png'
                }
                title={featuredPub.fields.title}
                description={`${dateFormat(
                  featuredPub.fields.publicationDate + 'T00:00:00',
                  'mmmm d, yyyy'
                )}   |   Volume ${featuredPub.fields.volNo}   |   Number ${
                  featuredPub.fields.issueNo
                }`}
                ctaLabel1='Read Now'
                ctaLink1={paths.el({ slug: featuredPub.fields.slug })}
                ctaLabel2='View all issues'
                ctaLink2={paths.el({ slug: 'all' })}
              />
            </Box>
            {podcast?.fields?.wistiaId && (
              <Box mt={[6, 10]}>
                <PodcastPlayer
                  sectionTitle='Listen & Learn'
                  podcast={podcast}
                  ctaLink={paths.podcast({ slug: '' })}
                />
              </Box>
            )}
            <Grid item xs={12}>
              <Box mt={[6, 10]}>
                <HorizontalScroll
                  title='Browse Our Latest Titles'
                  ctaLabel='View all'
                  ctaLink={paths.search({ types: ['book'] })}
                  items={books}
                  cellHeight={478}
                  cols={4.2}
                  type='carttile'
                />
              </Box>
            </Grid>
            <Box mt={[6, 10]}>
              <Box display='flex' justifyContent='space-between' mb={3}>
                <TextStyle variant='h4'>Featured Videos</TextStyle>
                <ViewAllCTA
                  label='View all'
                  href={paths.search({
                    types: ['video'],
                    featured: ['true'],
                  })}
                  lg
                />
              </Box>
              {videos && videos.length > 0 && (
                <Grid container spacing={5}>
                  <Grid item md={8} xs={12}>
                    <PodcastThumbnail podcast={videos[0]} path='video' />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    {videos.length > 1 && (
                      <PodcastThumbnail podcast={videos[1]} path='video' />
                    )}
                  </Grid>
                </Grid>
              )}
            </Box>
            <Box mt={[6, 10]}>
              <TwoColumnCta
                imagePos={'left'}
                image={
                  featuredAuthor.fields?.thumbnail?.fields?.imageBynder
                    ? featuredAuthor.fields?.thumbnail?.fields?.imageBynder[0]
                        ?.src +
                      '?' +
                      imageoptimization.qualityParameter +
                      '=' +
                      imageoptimization.qualityValue
                    : featuredAuthor.fields?.thumbnail?.fields?.imageContentful
                        ?.fields?.file?.url
                    ? featuredAuthor.fields?.thumbnail?.fields?.imageContentful
                        ?.fields?.file?.url +
                      '?' +
                      imageoptimization.qualityParameter +
                      '=' +
                      imageoptimization.qualityValue
                    : '/images/ASCDImageFiller.png'
                }
                title={`${featuredAuthor.fields.firstName} ${featuredAuthor.fields.lastName}`}
                description={featuredAuthor.fields.shortBio}
                descriptionLineNumbers={3}
                ctaLabel1={'Learn more'}
                ctaLink1={paths.author({ slug: featuredAuthor.fields.slug })}
                ctaLabel2={'View all authors'}
                ctaLink2={paths.author({ slug: 'all' })}
                label='Featured Author'
              />
            </Box>
          </Grid>
        </Grid>

        <Box mt={[6, 10]}>
          <TextCTA
            description={page.fields.summary}
            ctaLabel='Get to know our industry-leading authors.'
            ctaLink={paths.author({ slug: 'all' })}
            bgColor='transparent'
          />
        </Box>
        <Box my={[6, 10]} id='topics'>
          <Topics
            title='Explore Popular Topics'
            topics={popularTopics}
            contentType='article'
            center={true}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const pageid = configsPages.pages.content.partners.id
  const pageData = await client.getEntries({
    content_type: configsPages.pages.type,
    'fields.pageId[match]': pageid,
    limit: 1,
  })
  const videoData = await client.getEntries({
    content_type: 'video',
    'fields.featured': true,
    limit: 2,
    order: '-fields.date',
  })
  const data = await client.getEntries({
    content_type: 'pubissue',
    select:
      'fields.title,fields.slug,fields.thumbnail,fields.volNo,fields.issueNo,fields.publicationDate,fields.featuredImage',
    include: 2,
    limit: 1,
    order: '-fields.publicationDate',
  })
  const articles = await client.getEntries({
    content_type: 'article',
    limit: 3,
    'fields.featured': true,
    order: '-fields.issueDate',
  })
  const topics = await client.getEntries({
    content_type: 'categoryTopics',
    limit: 20,
  })
  const podcasts = await client.getEntries({
    content_type: 'podcast',
    'fields.wistiaId[exists]': true,
    limit: 1,
    order: '-fields.date',
  })
  const booksData = await client.getEntries({
    content_type: 'book',
    order: '-fields.datePublished',
    select:
      'fields.title,fields.slug,fields.thumbnail,fields.authors,fields.memberBook,fields.bookVersions,fields.keywords,fields.topic,fields.description,fields.datePublished,fields.isbn,fields.featured,fields.premium,fields.quickRead',
    limit: 10,
  })

  const featuredAuthor = await client.getEntries({
    content_type: 'profile',
    'fields.featured': true,
    limit: 1,
  })
  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'resources',
    limit: 1,
  })

  return {
    props: {
      page: pageData.items[0] ? pageData.items[0] : {},
      articles: articles.items,
      featuredPub: data.items.length ? data.items[0] : null,
      topics: topics.items,
      videos: videoData.items,
      podcast: podcasts.items.length ? podcasts.items[0] : null,
      books: booksData.items,
      featuredAuthor: featuredAuthor.items.length
        ? featuredAuthor.items[0]
        : null,
      SEO: SEOData.items.length ? SEOData.items[0] : {},
    },
    revalidate: 20,
  }
}
