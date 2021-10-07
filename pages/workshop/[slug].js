import React, { useEffect, useState, useContext } from 'react'
import { Box, Container, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { client } from '@/lib/contentful'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import ReactMarkdown from 'react-markdown'
// import HorizontalScroll from '@/components/organisms/horizontalscroll'
import ReadMore from '@/components/molecules/readmore'
import BookBanner from '@/components/organisms/bookbanner'
import TwoColContentListing from '@/components/organisms/twocolcontentlisting'
// import Topics from '@/components/molecules/topics'
// import paths from '@/paths/path'
// import BookToc from '@/components/organisms/BookToc'
// import ChapterPreview from '@/components/organisms/ChapterPreview'
// import AlternateRows from '@/components/molecules/alternaterows'
// import ArticleAuthors from '@/components/organisms/articleaauthors'
import LiveWorkshop from '@/components/workshop/LiveWorkshop'
import NeverMiss from '@/components/workshop/NeverMiss'
import VirtualWorkshop from '@/components/workshop/VirtualWorkshop'
import { AppContext } from '@/context/state'
import { hasMemberBookPrice, hasAccessToBook } from '@/lib/access-validator'
import { useRouter } from 'next/router'
import { Skeleton } from '@material-ui/lab'
import { getCartButtonCaptionLabel } from '@/lib/utils'
import constSnipcart from '@/const/snipcart'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import options from '@/const/options'

const useStyles = makeStyles((theme) => ({
  root: {},
  workshops: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
  heroImg: {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '16px 16px 16px 64px',
  },
  virtualWorkshop: {
    flexGrow: 1,
    maxWidth: 587,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
    },
  },
  liveWorkshop: {
    width: 348,
    minWidth: 348,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: 'unset',
    },
  },
  mobileHide: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  seeMore: {
    color: theme.palette.accent.darkGreen,
    textDecoration: 'under',
  },
}))

export default function Workshop({ workshop, workshops }) {
  const router = useRouter()
  const futureWorkshops = workshops.filter(
    (item) => item?.fields?.slug !== workshop?.fields?.slug
  )

  if (router.isFallback) {
    return (
      <Skeleton animation='wave' variant='rect' width='100%' height='100px' />
    )
  }

  const classes = useStyles()
  const [productNumber, setProductNumber] = useState(null)
  useEffect(() => {
    console.log('rendering workshop ', workshop)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const variant = url.searchParams.get('variant')
      setProductNumber(variant)
    }
  }, [])

  return (
    <Layout>
      <SEOHead seo={workshop?.fields?.seo ? workshop.fields.seo : workshop} />
      <Container maxWidth='lg'>
        <Box mt={[5, 9]}>
          <img
            src={
              workshop.fields.spotlightImage.fields.imageContentful.fields.file
                .url
            }
            alt='events-hero'
            className={classes.heroImg}
          />
        </Box>
        <Box className={classes.workshops}>
          <Box className={classes.virtualWorkshop}>
            <VirtualWorkshop
              title={workshop.fields?.title}
              body={documentToReactComponents(
                workshop.fields.description,
                options
              )}
              audience={workshop.fields.audience.map(
                (item) => item.fields.title
              )}
              topics={workshop.fields.topics.map((item) => item.fields.title)}
              author={documentToReactComponents(
                workshop.fields.authors[0].fields.description,
                options
              )}
            />
          </Box>
          <Box className={classes.liveWorkshop}>
            <LiveWorkshop />
          </Box>
        </Box>

        <Box mt={[5, 9]}>
          <BookBanner
            book={workshop.fields.materials[0]}
            productNumber={productNumber}
            updateProductNumber={(pn) => setProductNumber(pn)}
            showShipping
          />
        </Box>
        <Box mt={[5, 9]}>
          <Divider className={classes.mobileHide} />
        </Box>
        <Box mt={[5, 10]} mb={8}>
          <TwoColContentListing
            title='More Virtual Workshops and Institutes from ASCD'
            items={futureWorkshops}
            limit={3}
            body={
              <ReactMarkdown>
                Register today for our upcoming events. All virtual events are
                available to view for at least 30 days after the event **(so you
                can still register even after the live event date)**.
              </ReactMarkdown>
            }
            variant='workshop'
          />
        </Box>
        <Divider />
        <NeverMiss />
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'workshop',
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
  console.log('workghop gettting props ', params)
  const data = await client.getEntries({
    content_type: 'workshop',
    'fields.slug': params.slug,
    include: 4,
  })

  if (!data || !data.items || data.items.length == 0) {
    return {
      notFound: true,
    }
  }

  const workshops = await client.getEntries({
    content_type: 'workshop',
  })

  console.log('all workshops ', workshops.items.length)

  // const collections = await client.getEntries({
  //   content_type: 'collection',
  //   'fields.items.sys.id': data.items[0].sys.id,
  //   include: 2,
  // })

  // const books = await client.getEntries({
  //   content_type: 'book',
  //   'sys.id[ne]': data.items[0].sys.id,
  //   'fields.topic.sys.contentType.sys.id': 'categoryTopics',
  //   'fields.topic.fields.title': data.items[0].fields.topic?.fields
  //     ? data.items[0].fields.topic.fields.title
  //     : '',
  //   select:
  //     'fields.title,fields.slug,fields.authors,fields.thumbnail,fields.description,fields.bookVersions,fields.memberBook',
  //   include: 2,
  //   limit: 8,
  //   order: '-fields.datePublished',
  // })

  return {
    props: {
      key: data.items[0].sys.id,
      workshop: data.items[0],
      workshops: workshops.items,
      // relatedBooks: books.items,
      // relatedCollections: collections.items.length > 0 ? collections.items : [],
    },
    revalidate: 20,
  }
}
