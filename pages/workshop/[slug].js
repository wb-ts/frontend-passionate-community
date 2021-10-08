import React, { useEffect, useState, useContext } from 'react'
import { Box, Container, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { client } from '@/lib/contentful'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import ReactMarkdown from 'react-markdown'
import BookBanner from '@/components/organisms/bookbanner'
import TwoColContentListing from '@/components/organisms/twocolcontentlisting'
import LiveWorkshop from '@/components/workshop/LiveWorkshop'
import NeverMiss from '@/components/workshop/NeverMiss'
import SpotlightImage from '@/components/workshop/SpotlightImage'
import VirtualWorkshop from '@/components/workshop/VirtualWorkshop'
import { useRouter } from 'next/router'
import { Skeleton } from '@material-ui/lab'

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

  const getContentText = (data) => {
    if (data && typeof data !== 'string' && data.nodeType == 'document') {
      const jsonData = JSON.parse(JSON.stringify(data))

      return jsonData.content[0] !== undefined
        ? documentToReactComponents(jsonData, options)
        : ''
    } else if (typeof data == 'string') {
      return data
    } else {
      return null
    }
  }

  useEffect(() => {
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
          <SpotlightImage
            imgUrl={
              workshop.fields.spotlightImage.fields.imageContentful.fields.file
                .url
            }
            imgTitle={
              workshop.fields.spotlightImage.fields.imageContentful.fields.title
            }
          />
        </Box>
        <Box className={classes.workshops}>
          <Box className={classes.virtualWorkshop}>
            <VirtualWorkshop
              title={workshop.fields?.title}
              description={getContentText(workshop.fields.description)}
              audience={workshop.fields.audience.map(
                (item) => item.fields.title
              )}
              topics={workshop.fields.topics.map((item) => item.fields.title)}
              author={documentToReactComponents(
                workshop.fields.authors[0].fields.description,
                options
              )}
              author={
                workshop.fields.authors[0]
                  ? workshop.fields.authors.map((author) =>
                      getContentText(author.fields.description)
                    )
                  : null
              }
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
