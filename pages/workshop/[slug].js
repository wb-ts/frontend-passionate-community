import React, { useEffect, useState, useContext } from 'react'
import { Box, Container, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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
import { useRouter } from 'next/router'
import { Skeleton } from '@material-ui/lab'
import {
  workshopItemToCardData1,
  workshopItemToCardData,
  bookVersionToSnipcart,
} from '@/lib/data-transformations'
import { AppContext } from '@/context/state'
import { validatePaidMembership } from '@/lib/access-validator'
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
  const { userAccessData } = useContext(AppContext)
  const useMemberPrice = validatePaidMembership(userAccessData)
  const futureWorkshops = workshops
    ?.filter((item) => item?.fields?.slug !== workshop?.fields?.slug)
    .map((workshop, idx) => {
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
      } = workshopItemToCardData(workshop, workshop.fields.variations[0])
      return {
        key: workshop.fields.slug,
        remaining:
          seatsRemaining > 0
            ? `ONLY {seatsRemaining} SEATS REMAINING`
            : `NO SEATS REMAINING`,
        price: useMemberPrice ? memberPrice : nonMemberPrice,
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

  if (router.isFallback) {
    return (
      <Skeleton animation='wave' variant='rect' width='100%' height='100px' />
    )
  }

  const classes = useStyles()
  const [productNumber, setProductNumber] = useState(null)
  const {
    title,
    actionHref,
    mediaImg,
    mediaImgTitle,
    topicTag,
    description,
    topics,
    roles,
    grades,
    authorName,
    authorDescription,
    variations,
    clockHours,
  } = workshopItemToCardData1(workshop)
  useEffect(() => {
    console.log('workshop ', workshop)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const variant = url.searchParams.get('variant')
      setProductNumber(variant)
    }
  }, [])

  return (
    <Layout>
      <SEOHead seo={workshop?.fields?.seo ? workshop.fields.seo : workshop} />
      {workshop && (
        <Container maxWidth='lg'>
          <Box mt={[5, 9]}>
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
                topics={topics}
                author={authorDescription}
              />
            </Box>
            <Box className={classes.liveWorkshop}>
              <LiveWorkshop
                clockHours={clockHours}
                variations={variations}
                mediaImg={mediaImg}
                bookCartItems={bookCartItems}
              />
            </Box>
          </Box>

          <Box mt={[5, 9]}>
            <BookBanner
              book={workshop?.fields?.materials[0]}
              productNumber={productNumber}
              updateProductNumber={(pn) => setProductNumber(pn)}
              showShipping
            />
          </Box>
          <Box mt={[5, 9]}>
            <Divider className={classes.mobileHide} />
          </Box>
          <Box mt={[5, 10]} mb={8}>
            {futureWorkshops.length > 0 && (
              <TwoColContentListingWorkshop
                title='More Virtual Workshops and Institutes from ASCD'
                items={futureWorkshops}
                limit={3}
                body={
                  <ReactMarkdown>
                    Register today for our upcoming events. All virtual events
                    are available to view for at least 30 days after the event
                    **(so you can still register even after the live event
                    date)**.
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
      params: { slug: item.fields.slug },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
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

  return {
    props: {
      key: data.items[0].sys.id,
      workshop: data.items.length > 0 ? data.items[0] : null,
      workshops: workshops.items.length > 0 ? workshops.items : [],
    },
    revalidate: 20,
  }
}
