import { Box, Container, Divider } from '@material-ui/core'
import SEOHead from '@/const/head'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { client } from '@/lib/contentful'
import paths from '@/paths/path'
import Layout from '@/components/layout'
import Topics from '@/components/molecules/topics'
import HorizontalScroll from '@/components/organisms/horizontalscroll'
import TwoColContentListing from '@/components/organisms/twocolcontentlisting'
import Jumbotron from '@/components/molecules/jumbotron'
import GridSection from '@/components/molecules/gridsection'
import BecomeMember from '@/components/organisms/becomemember'
import ReactMarkdown from 'react-markdown'
import VideoBanner from '../components/organisms/videobanner'

const useStyles = makeStyles((theme) => ({
  articles: {
    marginTop: '56px',
    [theme.breakpoints.up('md')]: {
      marginTop: '78px',
    },
  },
  topics: {
    marginTop: '48px 0 ',
    [theme.breakpoints.up('md')]: {
      marginTop: '24px',
    },
  },
  events: {
    margin: '48px 8px 24px',
    [theme.breakpoints.up('sm')]: {
      margin: '88px auto 60px',
    },
  },
}))

export default function Home({
  valuepropositions,
  articles,
  topics,
  books,
  events,
  SEO,
}) {
  const classes = useStyles()
  const isLoggedIn = false // this will have to pull from session var
  const isSub = false
  const catTopics = topics.map((topic) => topic.fields.title)
  const [showBanner, setShowBanner] = useState(false)

  events.sort((a, b) => {
    return Date.parse(a.fields.dateTime) - Date.parse(b.fields.dateTime)
  })

  const futureEvents = JSON.parse(JSON.stringify(events)).filter((item) => {
    const released = Date.parse(item.fields.dateTime)
    const today = new Date().getTime()
    return released > today
  })

  return (
    <Layout paywall>
      <SEOHead seo={SEO} />
      {showBanner && <VideoBanner close={() => setShowBanner(false)} />}

      {!isLoggedIn && (
        <Jumbotron
          valuepropositions={valuepropositions}
          isHeader
          toggleVideoBanner={() => setShowBanner(!showBanner)}
        />
      )}
      <Container maxWidth='lg'>
        {articles.length > 0 && (
          <Box id='articles' className={classes.articles}>
            <GridSection
              title='Latest Articles'
              ctaLink={paths.search({ types: ['blog', 'article'] })}
              items={articles}
              variant='articleUnder'
            />
          </Box>
        )}

        <Box mt={4} id='topics' className={classes.topics}>
          <Divider />
          <Box mt={[4, 6]} mb={[4, 7.5]}>
            <Topics
              title='Topics that can be found on ASCD'
              topics={catTopics}
              center={true}
              maxWidth={'100%'}
              background={'transparent'}
            />
          </Box>
          <Divider />
        </Box>
        {books && books.length > 0 && (
          <Box my={5} id='books'>
            <HorizontalScroll
              title='Shop Books'
              ctaLabel='View all'
              ctaLink={paths.search({ types: ['book'] })}
              items={books}
              type='carttile'
            />
          </Box>
        )}
      </Container>

      {(!isSub || !isLoggedIn) && (
        <Box id='become a member'>
          <BecomeMember />
        </Box>
      )}

      <Container maxWidth='lg'>
        <Box id='events' className={classes.events}>
          <TwoColContentListing
            title={'Upcoming Events'}
            items={futureEvents}
            limit='4'
            body={
              <ReactMarkdown>
                Register today for our upcoming events. All virtual events are
                available to view for at least 30 days after the event **(so you
                can still register even after the live event date)**.
              </ReactMarkdown>
            }
            variant='event'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.getEntries({
    content_type: 'article',
    'fields.featured': true,
    limit: 4,
    order: '-fields.issueDate',
  })

  const vpData = await client.getEntries({
    content_type: 'valuePropositionCta',
    'sys.id': '2Ib9twgvrzbRBW4djFMc8z',
    limit: 1,
    order: '-sys.createdAt',
    include: 2,
  })
  const topics = await client.getEntries({
    content_type: 'categoryTopics',
  })
  const books = await client.getEntries({
    content_type: 'book',
    order: '-fields.datePublished',
    select:
      'fields.title,fields.slug,fields.authors,fields.thumbnail,fields.description,fields.bookVersions,fields.memberBook',
    include: 2,
    limit: 8,
  })
  const eventData = await client.getEntries({
    content_type: 'event',
  })
  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'home',
  })

  return {
    props: {
      articles: data.items,
      valuepropositions: vpData.items[0],
      topics: topics.items,
      books: books.items,
      events: eventData.items,
      SEO: SEOData.items.length ? SEOData.items[0] : {},
    },
    revalidate: 20,
  }
}
