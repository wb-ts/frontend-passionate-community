import React from 'react'
import { client } from '@/lib/contentful'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import Head from 'next/head'
import { Box, Container } from '@material-ui/core'
import TextCTA from '@/components/molecules/textcta'
import TextStyle from '@/components/atoms/textstyle'
import BecomeMember from '@/components/organisms/becomemember'
import { makeStyles } from '@material-ui/core/styles'
import paths from '@/paths/path'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  diagonalBackground: {
    width: '100%',
    zIndex: 0,
    height: 375,
    padding: '27px',
    borderRadius: '8px 8px 8px 96px',
    backgroundColor: theme.palette.grey.extraLight,
    backgroundImage:
      'linear-gradient(to top right, rgba(255, 255, 255, 0.4) 50%, #E4E9EC 50%)',
    [theme.breakpoints.up('md')]: {
      height: 500,
    },
  },
  title: {
    textAlign: 'left',
    maxWidth: 427,
    maxHeight: 327,
  },
}))

export default function Memberships({ page }) {
  const classes = useStyles()

  return (
    <Layout>
      <SEOHead seo={page?.fields?.seo} />
      <Head>
        <title>Memberships</title>
      </Head>
      <Box maxWidth='lg' className={classes.diagonalBackground}>
        <Container maxWidth='lg'>
          <Box mt={[0, 10]} className={classes.title}>
            <TextStyle variant='h1'>Become a member</TextStyle>
            <Box pt={2}>
              <TextStyle variant='subtitle1'>
                Join a community of life-changing educators who come together
                around a shared vision.
              </TextStyle>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box mt={[0, 2]}>
        <BecomeMember noBackground={true} noTitle={true} />
      </Box>
      <Container maxWidth='lg'>
        <Box mb={[5, 9]} mt={[1, 7]}>
          <TextCTA
            ctaLabel='Explore All Membership Options'
            ctaLink={paths.membershipDetails}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.getEntries({
    content_type: 'page',
    'fields.pageId': 'services',
    include: 3,
  })

  return {
    props: {
      page: data.items[0],
    },
    revalidate: 20,
  }
}
