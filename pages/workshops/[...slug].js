import React, { useEffect, useState, useContext } from 'react'

import { client as apolloClient } from '../../lib/apollo-client'
import GET_WORKSHOP_BY_SLUG_QUERY from '../../lib/apollo-client/schema/workshopBySlug.graphql'

import { Box, Container, Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { client } from '@/lib/contentful'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import ReactMarkdown from 'react-markdown'
import BookBanner from '@/components/organisms/bookbanner'
import TwoColContentListingWorkshop from '@/components/organisms/TwoColContentListingWorkshop'
import LiveWorkshop from '@/components/workshop/LiveWorkshop'
import NeverMiss from '@/components/workshop/NeverMiss'
import SpotlightImage from '@/components/workshop/SpotlightImage'
import VirtualWorkshop from '@/components/workshop/VirtualWorkshop'
import {
  workshopItemToCardData1,
  workshopItemToCardData,
  bookVersionToSnipcart,
} from '@/lib/data-transformations'
import { useReactiveVar } from '@apollo/client'
import { hasMemberBookPriceVar } from '../../lib/apollo-client/cache'

import { getParamValue } from '../../lib/utils'

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

export default function Workshop({
  authorIds,
  workshop,
  workshops,
  slugVariationId,
}) {
  const classes = useStyles()
  const [variationId] = useState(slugVariationId || getParamValue('variation'))
  const hasMemberPrice = useReactiveVar(hasMemberBookPriceVar)

  const futureWorkshops = workshops
    ?.filter((item) => item?.fields?.slug !== workshop?.fields?.slug)
    .map((workshopItem, idx) => {
      const {
        title,
        actionHref,
        mediaImg,
        topicTag,
        authorName,
        workshopDate,
        memberPrice,
        nonMemberPrice,
        clockHours,
        seatsRemaining,
      } = workshopItemToCardData(
        workshopItem,
        workshopItem.fields.variations[0]
      )
      return {
        key: workshop.fields.slug,
        remaining:
          seatsRemaining > 0
            ? `ONLY {seatsRemaining} SEATS REMAINING`
            : `NO SEATS REMAINING`,
        price: hasMemberPrice ? memberPrice : nonMemberPrice,
        label: topicTag,
        title: title,
        authorName: authorName,
        image: mediaImg,
        date: `${workshopDate}-${clockHours}`,
        actionHref: actionHref,
      }
    })

  const bookCartItems = workshop?.fields?.materials.map((book) =>
    bookVersionToSnipcart(book)
  )

  const {
    title,
    actionHref,
    mediaImg,
    mediaImgTitle,
    topicTag,
    description,
    topics,
    keywords,
    roles,
    grades,
    authorName,
    authorDescription,
    variations,
    clockHours,
  } = workshopItemToCardData1(workshop)

  return (
    <Layout>
      <SEOHead seo={workshop?.fields?.seo ? workshop.fields.seo : workshop} />
      {workshop && (
        <Container maxWidth='lg'>
          <Box mt={5} mb={5}>
            <SpotlightImage imgUrl={mediaImg} imgTitle={mediaImgTitle} />
          </Box>
          <Box className={classes.workshops}>
            <Box className={classes.virtualWorkshop}>
              <VirtualWorkshop
                title={title}
                topicTag={topicTag}
                description={description}
                roles={roles}
                grades={grades}
                topics={keywords}
                author={authorDescription}
                authorIds={authorIds}
              />
            </Box>
            <Box className={classes.liveWorkshop}>
              <LiveWorkshop
                slug={workshop.fields.slug}
                clockHours={clockHours}
                variations={variations}
                mediaImg={mediaImg}
                bookCartItems={bookCartItems}
                currentVariationId={variationId}
              />
            </Box>
          </Box>

          <Box mt={[5, 9]}>
            {workshop?.fields?.materials?.map((book, i) => (
              <Box pt={2} pb={2} key={i}>
                <BookBanner book={book} showShipping />
              </Box>
            ))}
          </Box>
          <Box mt={[5, 9]}>
            <Divider className={classes.mobileHide} />
          </Box>
          <Box mt={[5, 10]} mb={8}>
            {futureWorkshops.length > 0 && (
              <TwoColContentListingWorkshop
                title='More Virtual Workshops from ASCD'
                items={futureWorkshops}
                limit={3}
                body={
                  <ReactMarkdown>
                    Register today for an upcoming author Workshop. Registered
                    attendees have access to each session's recording for seven
                    days after the live date.
                  </ReactMarkdown>
                }
                variant='workshop'
              />
            )}
          </Box>
          <Divider />
          <NeverMiss />
        </Container>
      )}
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
      params: { slug: item.fields.slug.split('/') },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const workshop = await apolloClient.query({
    query: GET_WORKSHOP_BY_SLUG_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      where: {
        slug: params.slug[0],
      },
      authorsCollectionPreview2:
        process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
    },
  })

  const authorIds =
    workshop?.data?.workshopCollection?.items[0]?.authorsCollection?.items?.map(
      (item) => item?.sys?.id
    )

  const data = await client.getEntries({
    content_type: 'workshop',
    'fields.slug': params.slug[0],
    include: 4,
  })

  if (!data || !data.items || data.items.length == 0) {
    return {
      notFound: true,
    }
  }

  data.items[0].fields.variations = data.items[0].fields.variations.filter(
    (item) => item.fields !== undefined
  )

  const workshops = await client.getEntries({
    content_type: 'workshop',
    'fields.slug[ne]': params.slug[0],
    limit: 3,
    include: 4,
  })

  workshops.items.forEach((ws) => {
    ws.fields.variations = ws.fields.variations.filter(
      (item) => item.fields !== undefined
    )
  })

  return {
    props: {
      key: data.items[0].sys.id,
      authorIds: authorIds,
      slugVariationId: params.slug[1] || null,
      workshop: data.items.length > 0 ? data.items[0] : null,
      workshops: workshops.items.length > 0 ? workshops.items : [],
    },
    revalidate: 20,
  }
}
