import React from 'react'
import { useRouter } from 'next/router'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Container, Divider, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Layout from '../../components/layout'
import ReadMore from '../../components/molecules/readmore'
import TextCTA from '../../components/molecules/textcta'
import Topics from '../../components/molecules/Topics'
import TwoColumnCta from '../../components/molecules/twocolumncta'
import ContentGrid from '../../components/organisms/contentgrid'
import VideoPlaylist from '../../components/organisms/videoplaylist'
import { imageoptimization, options, SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import paths from '../../paths/path'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

export default function Video({ video, videos }) {
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

  const secondaryTopics =
    video?.fields.topicSecondary &&
    video?.fields.topicSecondary
      .map((topic) => topic?.fields?.title)
      .reduce((unique, o) => {
        if (!unique.includes(o)) {
          unique.push(o)
        }
        return unique
      }, [])

  const latestVideos = videos
    .filter((item) => item.sys.id !== video.sys.id)
    .sort((a, b) => {
      return Date.parse(b?.fields.date) - Date.parse(a?.fields.date)
    })

  const relatedVideos = videos
    .filter((item) => item.sys.id !== video.sys.id)
    .filter((item) => item?.fields.topic?.title == video?.fields.topic?.title)
    .sort((a, b) => {
      return Date.parse(b?.fields.date) - Date.parse(a?.fields.date)
    })

  const book = video?.fields.featuredBook

  return (
    <Layout>
      <SEOHead seo={video?.fields?.seo ? video?.fields.seo : video} />
      <Container>
        <Box pb={3} mt={2}>
          <VideoPlaylist video={video} videos={relatedVideos} />
        </Box>
      </Container>
      <Box mb={[0, 10]}>
        <Divider />
      </Box>

      <Container>
        <Box maxWidth={850}>
          {video?.fields.description && (
            <Box mt={[5, 0]} id='about'>
              <ReadMore
                title='In this Video'
                short={video?.fields.description}
                textAlign='left'
                titleVariant='h4'
                hideSummaryWhenExpanded
              />
            </Box>
          )}

          {secondaryTopics && (
            <Box mt={6} id='topics'>
              <Topics
                title='Topics covered'
                topics={secondaryTopics}
                contentType='podcast'
                titleVariant='h4'
                variant='basicSmall'
              />
            </Box>
          )}
        </Box>
        {book && (
          <Box my={11}>
            <TwoColumnCta
              title={book?.fields?.title}
              description={
                documentToReactComponents(book?.fields.description, options)[0]
              }
              ctaLabel1='Shop'
              ctaLink1={paths.book({ slug: book?.fields.slug })}
              label={book?.fields.topic?.fields?.title}
              image={
                book?.fields?.featuredImage?.fields?.imageBynder
                  ? book?.fields?.featuredImage?.fields?.imageBynder[0]?.src +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : book?.fields?.featuredImage?.fields?.imageContentful?.fields
                      ?.file?.url
                  ? book?.fields?.featuredImage?.fields?.imageContentful?.fields
                      ?.file?.url +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : '/images/ASCDImageFiller.png'
              }
              imagePos='right'
              variant='grey'
            />
          </Box>
        )}
        <Box mt={11}>
          <ContentGrid
            sectionTitle='Latest Videos'
            items={latestVideos}
            viewAllLink={paths.search({ types: ['videos'] })}
          />
        </Box>
        <Box my={9}>
          <TextCTA ctaLabel='Watch more videos' ctaLink={paths.videos} />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'video',
    select: 'fields.slug',
    limit: process.env.NEXT_STATIC_BUILD_LIMIT || 200,
  })

  return {
    paths: data.items.map((item) => ({
      params: { slug: item?.fields.slug },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'video',
    'fields.slug': params.slug,
    include: 2,
  })

  if (!data || !data.items || data.items.length == 0) {
    return {
      notFound: true,
    }
  }

  const videos = await client.getEntries({
    content_type: 'video',
  })

  return {
    props: {
      video: data.items.length ? data.items[0] : undefined,
      videos: videos.items,
    },
    revalidate: 20,
  }
}
