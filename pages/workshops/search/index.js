import {
  Box,
  Container,
  OutlinedInput,
  Link,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import { DateRangePicker, LocalizationProvider } from '@mui/lab'
import DateFnsUtils from '@date-io/date-fns'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SEOHead from '@/const/head'
import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@mui/styles'
import { client } from '@/lib/contentful'
import Layout from '@/components/layout'
import { components } from '@/const/components'
import HeroBanner from '@/components/molecules/Banners/HeroBanner'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import options from '@/const/options'
import imageoptimization from '@/const/imageoptimization'
import ContentGrid from '@/components/organisms/contentgrid'
import { workshopItemToCardData } from '@/lib/data-transformations'
import WorkshopItem from '@/components/molecules/Workshop/WorkshopItem'
import TextStyle from '@/components/atoms/TextStyle'
import { useReactiveVar } from '@apollo/client'
import { hasMemberBookPriceVar } from '@/lib/apollo-client/cache'
import NeverMiss from '@/components/workshop/NeverMiss'
import { ProductSearch } from '@/components/ProductSearch'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    maxWidth: 150,
  },
  filter: {
    display: 'flex',
    justifyContent: 'center',
    // textAlign: 'left',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
}))

export default function AuthorWorkshop({
  page,
  workshops,
  // eventTypes,
  topics,
}) {
  const classes = useStyles()

  const allTopics = topics.map((t) => t.fields?.title)

  const featuredWorkshop = workshops
    .filter((workshop) => workshop.fields?.featured)
    .slice(0, 1)
  const otherWorkshops =
    featuredWorkshop.length > 0
      ? workshops.filter(
          (workshop) =>
            featuredWorkshop[0] &&
            workshop?.sys?.id !== featuredWorkshop[0]?.sys.id
        )
      : workshops

  const dateFns = new DateFnsUtils()

  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)

  const _renderPageContent = (content) => {
    return (
      content &&
      content.map((item, key) => {
        if (item.sys.contentType.sys.id === 'componentBanner') {
          return (
            <HeroBanner
              title={item.fields.title}
              description={documentToReactComponents(
                item?.fields?.body,
                options
              )}
              imagePos='right'
              image={
                item.fields?.image?.fields?.imageBynder
                  ? item.fields?.image?.fields?.imageBynder[0]?.src +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : item.fields?.image?.fields?.imageContentful?.fields?.file
                      ?.url
                  ? item.fields?.image?.fields?.imageContentful?.fields?.file
                      ?.url +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : '/images/ASCDImageFiller.png'
              }
              imageAlt={item.fields.title}
              ctaLabel1={item.fields.cta && item.fields.cta[0]?.fields.label}
              ctaLink1={item.fields.cta && item.fields.cta[0]?.fields.url}
              ctaLabel2={
                item.fields.cta &&
                item.fields.cta.length > 1 &&
                item.fields.cta[1].fields.label
              }
              ctaLink2={
                item.fields.cta &&
                item.fields.cta.length > 1 &&
                item.fields.cta[1].fields.url
              }
            />
          )
        } else {
          return (
            <Container maxWidth='lg'>
              <Box mt={[5, 10]} key={key}>
                {components(item, Math.floor(Math.random() * 10 + 1))}
              </Box>
            </Container>
          )
        }
      })
    )
  }

  return (
    <Layout>
      <SEOHead seo={page?.fields?.seo ? page.fields.seo : page} />
      <Box mb={[6, 10]}>{_renderPageContent(page?.fields?.content)}</Box>
      <Container>
        {featuredWorkshop && featuredWorkshop[0] && (
          <Box mb={[6, 10]} mt={[6, 10]}>
            <Box mb={3}>
              <TextStyle variant='h4' id='allworkshops'>
                Upcoming Author Workshops
              </TextStyle>
            </Box>
            <WorkshopItem
              hasMemberBookPrice
              cardData={workshopItemToCardData(
                featuredWorkshop[0],
                featuredWorkshop[0].fields.variations[0]
              )}
            />
          </Box>
        )}
        <Box mb={[6, 10]} mt={[6, 10]}>
          <ProductSearch variant={'workshop'} />
        </Box>
        <Box>
          <NeverMiss />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.getEntries({
    content_type: 'page',
    'fields.pageId': 'workshopsLanding',
    include: 2,
    limit: 1,
  })

  const workshopData = await client.getEntries({
    content_type: 'workshop',
    select:
      'fields.title,fields.slug,fields.authors,fields.variations,fields.type,fields.topics,fields.clockHours,fields.featured,fields.spotlightImage',
    include: 3,
  })

  workshopData.items.forEach((ws) => {
    ws.fields.variations = ws.fields.variations?.filter(
      (item) => item.fields !== undefined
    )
    if (!ws.fields.variations) {
      ws.fields.variations = null
    }
  })

  // const eventTypeData = await client.getEntries({
  //   content_type: 'categoryEvents',
  //   include: 1,
  // })

  const TopicsData = await client.getEntries({
    content_type: 'categoryTopics',
    include: 1,
  })

  return {
    props: {
      page: data?.items[0] || null,
      workshops: workshopData.items,
      // eventTypes: eventTypeData.items,
      topics: TopicsData.items,
    },
    revalidate: 20,
  }
}
