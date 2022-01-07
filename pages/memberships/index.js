import React from 'react'
import Head from 'next/head'
import { Box, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '../../components/atoms/TextStyle'
import Layout from '../../components/layout'
import HeroHalfHalf from '../../components/molecules/herohalfhalf'
import TextCTA from '../../components/molecules/textcta'
import BecomeMember from '../../components/organisms/becomemember'
import { imageoptimization, SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import paths from '../../paths/path'

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

export default function Memberships({ page, image }) {
  const classes = useStyles()

  return (
    <Layout>
      <SEOHead seo={page?.fields?.seo} />
      <Head>
        <title>Memberships</title>
      </Head>
      <Box mt={[0, 0, 5]} mb={[6, 10]}>
        <Box
          pl={[0, 0, 3, 0]}
          pb={[1, 3]}
          maxWidth={['100%', '1024px']}
          margin='auto'
        >
          <HeroHalfHalf
            title='Become a member'
            description='Join a community of life-changing educators who come together around a shared vision. [Need to renew your membership? Click here.](/faq#how-do-i-renew-my-membership)'
            image={
              image?.fields?.imageBynder
                ? image?.fields?.imageBynder[0]?.src +
                  '?' +
                  imageoptimization.qualityParameter +
                  '=' +
                  imageoptimization.qualityValue
                : image?.fields?.imageContentful?.fields?.file?.url
                ? image?.fields?.imageContentful?.fields?.file?.url +
                  '?' +
                  imageoptimization.qualityParameter +
                  '=' +
                  imageoptimization.qualityValue
                : '/images/ASCDImageFiller.png'
            }
            imageAlt={image?.fields?.alternate}
            imagePos='right'
          />
        </Box>
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

  const image = await client.getEntries({
    content_type: 'image',
    'fields.alternate': 'Membership details',
    include: 2,
  })

  return {
    props: {
      page: data.items[0],
      image: image.items[0],
    },
    revalidate: 20,
  }
}
