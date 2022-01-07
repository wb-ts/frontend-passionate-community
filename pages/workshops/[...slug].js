import React from 'react'
import dynamic from 'next/dynamic'
import { Box, Container, Divider, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/layout'
import ProductBanner from '../../components/layouts/ProductBanner'
import WorkshopSectionTopLeft from '../../components/layouts/workshop/WorkshopSectionTopLeft'
import TwoColContentListingWorkshop from '../../components/organisms/TwoColContentListingWorkshop'
import NeverMiss from '../../components/workshop/NeverMiss'
import SpotlightImage from '../../components/workshop/SpotlightImage'
import { SEOHead } from '../../const'
import { contentfulDirectClient } from '../../lib/apollo-client'
import { client } from '../../lib/contentful'
import PAGE_QUERY from '../../lib/schema/pages/workshopProductPage.graphql'

const WorkshopSectionTopRight = dynamic(
  () => import('../../components/layouts/workshop/WorkshopSectionTopRight'),
  { ssr: false }
)

const useStyles = makeStyles((theme) => ({
  workshops: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
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
  workshop,
  recommendedWorkshops,
  slugVariationId,
}) {
  const classes = useStyles()
  const variationId = slugVariationId

  return (
    <Layout>
      <SEOHead seo={workshop} />
      {workshop && (
        <Container maxWidth='lg'>
          <Box mt={5} mb={5}>
            {workshop.spotlightImage?.imgSrc && (
              <SpotlightImage
                imgUrl={workshop.spotlightImage.imgSrc}
                imgTitle={workshop.spotlightImage.alternate}
              />
            )}
          </Box>
          <Box className={classes.workshops}>
            <Box pr={7}>
              <WorkshopSectionTopLeft workshop={workshop} />
            </Box>
            <Box className={classes.liveWorkshop}>
              <WorkshopSectionTopRight
                workshop={workshop}
                selectedVariationId={variationId}
              />
            </Box>
          </Box>
          <Box mt={[5, 9]}>
            {workshop.materials.items.map((book, i) => (
              <Box pt={2} pb={2} key={i}>
                <ProductBanner
                  data={book}
                  defaultProductVariantId={book.versions.items[0].productNumber}
                />
              </Box>
            ))}
          </Box>
          <Box mt={[5, 9]}>
            <Divider className={classes.mobileHide} />
          </Box>
          <Box mt={[5, 10]} mb={8}>
            {recommendedWorkshops?.length > 0 && (
              <TwoColContentListingWorkshop
                title='More Virtual Workshops from ASCD'
                items={recommendedWorkshops}
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
  /**
   * @todo Change to graphql
   */
  const data = await client.getEntries({
    content_type: 'workshop',
    select: 'fields.slug',
    limit: process.env.NEXT_STATIC_BUILD_LIMIT || 200,
  })

  return {
    paths: data.items.map((item) => ({
      params: {
        slug: item.fields.slug.split('/'),
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  let workshopResults = null
  try {
    workshopResults = await contentfulDirectClient.query({
      query: PAGE_QUERY,
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      variables: {
        preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
        slug: params?.slug[0] || 'undefined',
        topicsLimit: 9,
      },
    })
  } catch (e) {
    console.error(e)
  }

  if (!workshopResults || workshopResults.data.workshop.items.length < 1) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      workshop: workshopResults.data.workshop.items[0] || null,
      slugVariationId: params.slug[1] || null,
      recommendedWorkshops: workshopResults.data.moreWorkshops.items || null,
    },
    revalidate: 20,
  }
}
