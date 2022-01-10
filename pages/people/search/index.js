import React, { useEffect, useState } from 'react'
import { Box, Container, Divider, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '../../../components/atoms/TextStyle'
import Layout from '../../../components/layout'
import Banner from '../../../components/molecules/banner'
import TwoColumnCta from '../../../components/molecules/twocolumncta'
import { SEOHead } from '../../../const'
import { client } from '../../../lib/contentful'
import { ProductSearch } from '@/components/ProductSearch'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    marginBottom: '10px',
    alignItems: 'center',
  },
  ddl: {
    width: '100%',
  },
  medium: {
    width: '120px',
    height: '120px',
  },
  textField: {
    width: '100%',
    height: 56,
  },
  input: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700,
    lineHeight: theme.typography.pxToRem(26),
    letterSpacing: 0.2,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(20),
      lineHeight: theme.typography.pxToRem(28),
    },
  },
  groupHeader: {
    color: '#C4C4C4',
  },
  divider: {
    backgroundColor: '#C5CED1',
    height: '40px',
    marginTop: -25,
  },
}))

export default function AllAuthors({ SEO }) {
  const classes = useStyles()

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Banner
        header1='Everyone @ ASCD'
        header2='Get to know the people shaping our education community'
      />
      <Container maxWidth='lg'>
        <ProductSearch variant={'people'} />
      </Container>

      <Container maxWidth='lg'>
        <Box my={11}>
          <TwoColumnCta
            title='Write for ASCD'
            description='We publish insightful, actionable, relevant work from educators across all levels of education that help educators learn, teach and lead.'
            ctaLabel1='Learn more'
            ctaLink1='/write-for-ascd'
            image='/images/write_for_ascd.svg'
            imagePos='right'
            variant='grey'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'people/all',
  })

  return {
    props: {
      SEO: SEOData.items.length ? SEOData.items[0] : {},
    },
  }
}
