import React from 'react'
import { useRouter } from 'next/router'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Container, Divider, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import DaysAgo from '../../components/atoms/DaysAgo'
import Layout from '../../components/layout'
import PodcastPlayer from '../../components/molecules/podcastplayer'
import ReadMore from '../../components/molecules/readmore'
import TextCTA from '../../components/molecules/textcta'
import Topics from '../../components/molecules/Topics'
import TopicTag from '../../components/molecules/TopicTag'
import TwoColumnCta from '../../components/molecules/twocolumncta'
import ContentGrid from '../../components/organisms/contentgrid'
import { imageoptimization, options, SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import paths from '../../paths/path'

const useStyles = makeStyles(() => ({
  metadata: {
    '& .MuiChip-root': {
      marginBottom: 0,
    },
  },
}))

export default function Podcast({ podcast, podcasts }) {
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

  const secondaryTopics = podcast?.fields.topicSecondary
    ?.map((topic) => topic?.fields?.title)
    .reduce((unique, o) => {
      if (!unique.includes(o)) {
        unique.push(o)
      }
      return unique
    }, [])

  const latestPodcasts = podcasts
    .filter((item) => item.sys.id !== podcast.sys.id)
    .sort((a, b) => {
      return Date.parse(b?.fields.date) - Date.parse(a?.fields.date)
    })

  const book = podcast?.fields.featuredBook

  return (
    <Layout>
      <SEOHead seo={podcast?.fields?.seo ? podcast?.fields.seo : podcast} />
      <Container>
        <Box mt={5} id='podcast'>
          <PodcastPlayer podcast={podcast} />
          <Box
            mt={3}
            mb={3}
            display='flex'
            flexDirection='row'
            alignItems='center'
            className={classes.metadata}
          >
            <TopicTag
              variant='special'
              label={podcast?.fields.topic?.fields?.title}
              premium={podcast?.fields.premium}
            />
            <Box ml={1}>
              <DaysAgo input={podcast?.fields.date} variant='body3' />
            </Box>
          </Box>
        </Box>
      </Container>
      <Box mb={[0, 10]}>
        <Divider />
      </Box>

      <Container>
        <Box maxWidth={850}>
          <Box mt={[5, 0]}>
            <a
              href='https://www.bamradionetwork.com/'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='/images/BamRadioLogoNew.png'
                alt='BAM radio logo'
                height='30px'
              />
            </a>
          </Box>
          {podcast?.fields.description && (
            <Box mt={[2, 3]} id='about'>
              <ReadMore
                title='In this podcast'
                short={podcast?.fields.description}
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
              title={book?.fields.title}
              description={
                documentToReactComponents(book?.fields.description, options)[0]
              }
              ctaLabel1='Shop'
              ctaLink1={paths.book({ slug: book?.fields.slug })}
              label={book?.fields.topic?.fields.title}
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
            sectionTitle='Latest Podcasts'
            items={latestPodcasts}
            viewAllLink={paths.search({ types: ['podcasts'] })}
          />
        </Box>
        <Box my={9}>
          <TextCTA
            ctaLabel='Listen to more podcasts'
            ctaLink={paths.podcasts}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'podcast',
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
    content_type: 'podcast',
    'fields.slug': params.slug,
    include: 2,
  })

  if (!data || !data.items || data.items.length == 0) {
    return {
      notFound: true,
    }
  }

  const podcasts = await client.getEntries({
    content_type: 'podcast',
  })

  return {
    props: {
      podcast: data.items.length ? data.items[0] : null,
      podcasts: podcasts.items,
    },
    revalidate: 20,
  }
}
