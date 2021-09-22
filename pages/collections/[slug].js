import React, { useEffect, useState } from 'react'
import { Box, Container, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { client } from '@/lib/contentful'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import HorizontalScroll from '@/components/organisms/horizontalscroll'
import ReadMore from '@/components/molecules/readmore'
import BookBanner from '@/components/organisms/bookbanner'
import paths from '@/paths/path'
import { useRouter } from 'next/router'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    lineHeight: '18px',
    letterSpacing: '0.3px',
  },
  infoRow: {
    backgroundColor: theme.palette.action.hover,
  },
  infoKey: {
    fontWeight: 700,
    lineHeight: theme.typography.pxToRem(28),
    letterSpacing: '0.2px',
  },
  infoValue: {
    fontWeight: 400,
    lineHeight: theme.typography.pxToRem(28),
    letterSpacing: '0.2px',
  },
  body: {
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
}))

export default function Collection({ collection }) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Skeleton animation='wave' variant='rect' width='100%' height='100px' />
    )
  }

  const classes = useStyles()
  const [productNumber, setProductNumber] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const variant = url.searchParams.get('variant')
      setProductNumber(variant)
    }
  }, [])

  return (
    <Layout>
      <SEOHead
        seo={collection?.fields?.seo ? collection.fields.seo : collection}
      />
      <Container maxWidth='lg'>
        <Box className={classes.body}>
          <Box mt={[5, 9]}>
            <BookBanner
              book={collection}
              productNumber={productNumber}
              updateProductNumber={(pn) => setProductNumber(pn)}
            />
          </Box>
          <Box mt={[5, 9]} id='about'>
            <ReadMore
              title='About this collection'
              titleVariant='h4'
              short={collection.fields.about}
              textAlign='left'
              hideSummaryWhenExpanded
            />
          </Box>
        </Box>
        <Box my={[5, 9]}>
          <Divider />
        </Box>
        {collection.fields?.items?.length > 0 && (
          <Box mb={[5, 9]}>
            <HorizontalScroll
              title='Books in this collection'
              ctaLabel='View all'
              ctaLink={paths.search({
                types: ['book'],
              })}
              items={collection.fields.items}
              type='carttile'
            />
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'collection',
    select: 'fields.slug',
    limit: 200,
  })

  return {
    paths: data.items.reduce(
      (acc, item) =>
        item?.fields?.slug
          ? [...acc, { params: { slug: item.fields.slug } }]
          : acc,
      []
    ),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'collection',
    'fields.slug': params?.slug,
    include: 6,
  })

  if (!data || !data.items || data.items.length == 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      key: data.items[0].sys.id,
      collection: data.items[0],
    },
    revalidate: 20,
  }
}
