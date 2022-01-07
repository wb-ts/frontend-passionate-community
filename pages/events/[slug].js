import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { Box, Grid, Container, Divider, Button, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactMarkdown from 'react-markdown'
import CtaButton from '../../components/atoms/CtaButton'
import TextStyle from '../../components/atoms/TextStyle'
import Layout from '../../components/layout'
import HeroHalfHalf from '../../components/molecules/herohalfhalf'
import TextCTA from '../../components/molecules/textcta'
import TwoColContentListing from '../../components/organisms/twocolcontentlisting'
import SnipcartButton from '../../components/Snipcart/SnipcartButton'
import { imageoptimization, SEOHead } from '../../const'
import { hasMemberBookPriceVar } from '../../lib/apollo-client/cache'
import { client } from '../../lib/contentful'

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  detailsText: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
  opacity: {
    opacity: '0.7',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  },
  snipcartBtn: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    border: '2px solid #fff',
    borderRadius: '2px',
    minWidth: '100%',
    height: 38,
    padding: '0px 16px',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '0.02em',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(51, 126, 109, 0.8)',
      textDecoration: 'underline',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 104,
    },
  },
  priceLabel: {
    textAlign: 'right',
    marginTop: '-2.5rem',
    fontWeight: '600',
  },
}))

export default function Event({ event, events }) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Skeleton
        animation='wave'
        variant='rectangular'
        width='100%'
        height='100px'
      />
    )
  }
  const classes = useStyles()

  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)

  const futureEvents = events
    .filter((item) => item?.fields?.slug !== event?.fields?.slug)
    .filter((item) => {
      const released = Date.parse(item?.fields?.dateTime)
      const today = new Date().getTime()
      return released > today
    })
    .sort((a, b) => {
      return Date.parse(a?.fields?.dateTime) - Date.parse(b?.fields?.dateTime)
    })

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return (
          <Box minHeight='1.125rem'>
            <TextStyle component='p' variant='subtitle1'>
              {children.length > 1
                ? children
                : children[0]
                    .split('\n')
                    .flatMap((text, i) => [i > 0 && <br />, text])}
            </TextStyle>
          </Box>
        )
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return <TextStyle variant='h3'>{children}</TextStyle>
      },
    },
  }
  const _getPriceLabel = (price) => {
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    return (
      <Box className={classes.priceLabel}>Price: {formatter.format(price)}</Box>
    )
  }

  return (
    <Layout>
      <SEOHead seo={event?.fields?.seo ? event?.fields?.seo : event} />
      <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
        <HeroHalfHalf
          title={event?.fields?.title}
          description={event?.fields?.description}
          imagePos='right'
          image={
            event?.fields?.thumbnail?.fields?.imageBynder
              ? event?.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                '?' +
                imageoptimization.qualityParameter +
                '=' +
                imageoptimization.qualityValue
              : event?.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                  ?.url
              ? event?.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                  ?.url +
                '?' +
                imageoptimization.qualityParameter +
                '=' +
                imageoptimization.qualityValue
              : '/images/ASCDImageFiller.png'
          }
          imageAlt={event?.fields?.thumbnail?.fields?.alternate}
        />
      </Box>
      <Box className={classes.details} py={6} prl={[5, 0]}>
        <Container>
          <Grid container spacing={4}>
            <Grid xs={12} md={6} item className={classes.detailsText}>
              {documentToReactComponents(event?.fields?.eventDetails, options)}
            </Grid>
            <Grid item xs={12} md={6} className={classes.buttons}>
              {event?.fields?.link && (
                <CtaButton
                  variant='contained'
                  width='158'
                  height='42'
                  onclick={() => void 0}
                  href={event?.fields?.link}
                  label='Event Details'
                  color='secondary'
                  size='medium'
                />
              )}
              <Box ml={[0, 2]} mt={[2, 0]}>
                {event?.fields?.type?.fields?.title == 'Webinar' &&
                event?.fields?.webinarLink ? (
                  <Button
                    variant='outlined'
                    className={classes.snipcartBtn}
                    target='_blank'
                    href={event?.fields?.webinarLink}
                  >
                    Register Now
                  </Button>
                ) : (
                  <>
                    {event?.fields?.eventId ===
                      '2022-virtual-annual-conference' ||
                    event?.fields?.eventId === '2021-leadership-summit' ||
                    event?.fields?.eventId ===
                      'symposium-new-era-of-education' ||
                    event?.fields?.eventId === '2022-annual-conference' ||
                    event?.fields?.eventId ===
                      '2021-virtual-leadership-summit' ||
                    event?.fields?.eventId === 'kindergarten-conference' ? (
                      <>
                        {event?.fields?.eventId !==
                          'kindergarten-conference' && (
                          <CtaButton
                            variant='contained'
                            color='primary'
                            size='large'
                            label='Register Now'
                            backgroundColor='#3C64B1'
                            id={
                              event?.fields?.eventId ===
                              '2021-leadership-summit'
                                ? 'december-event'
                                : event?.fields?.eventId ===
                                  '2022-annual-conference'
                                ? 'annual-conference-2022'
                                : event?.fields?.eventId ===
                                  '2021-virtual-leadership-summit'
                                ? 'leadership-summit-2022'
                                : event?.fields?.eventId ===
                                  '2022-virtual-annual-conference'
                                ? 'ascd-virtual-annual-conference-2022'
                                : event?.fields?.eventId ===
                                  'kindergarten-conference'
                                ? 'kindergarten-conference'
                                : 'october-event'
                            }
                            styles={{
                              border: '2px solid #fff',
                              borderRadius: '2px',
                              width: '100%',
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <SnipcartButton
                        className={classes.snipcartBtn}
                        snipcart={{
                          label: 'Register Now',
                          dataItemId: event?.fields?.eventId,
                          dataItemName: event?.fields?.title,
                          dataItemImage: event?.fields?.thumbnail?.fields
                            ?.imageBynder
                            ? event?.fields?.thumbnail?.fields?.imageBynder[0]
                                ?.src +
                              '?' +
                              imageoptimization.qualityParameter +
                              '=' +
                              imageoptimization.qualityValue
                            : event?.fields?.thumbnail?.fields?.imageContentful
                                ?.fields?.file?.url
                            ? event?.fields?.thumbnail?.fields?.imageContentful
                                ?.fields?.file?.url +
                              '?' +
                              imageoptimization.qualityParameter +
                              '=' +
                              imageoptimization.qualityValue
                            : '/images/ASCDImageFiller.png',
                          dataItemDescription: event?.fields?.description,
                          dataItemPrice: hasMemberBookPrice
                            ? event?.fields?.priceMember
                            : event?.fields?.nonMemberPrice,
                          dataItemCustom1Value: event?.fields?.taxJar?.fields
                            ?.taxJarId
                            ? event?.fields?.taxJar?.fields?.taxJarId
                            : '',
                        }}
                      />
                    )}
                  </>
                )}
              </Box>
            </Grid>
            {event?.fields?.eventId === '2021-leadership-summit' && (
              <>
                <Grid xs={12} md={6} item></Grid>
                <Grid xs={12} md={6} item>
                  {hasMemberBookPrice
                    ? _getPriceLabel(event?.fields?.priceMember)
                    : _getPriceLabel(event?.fields?.nonMemberPrice)}
                </Grid>
              </>
            )}
            {event?.fields?.eventId === 'symposium-new-era-of-education' && (
              <>
                <Grid xs={12} md={6} item></Grid>
                <Grid xs={12} md={6} item>
                  <Box className={classes.priceLabel}>Price: $79.00</Box>
                </Grid>
              </>
            )}
            {event?.fields?.eventId === '2021-virtual-leadership-summit' && (
              <>
                <Grid xs={12} md={6} item></Grid>
                <Grid xs={12} md={6} item>
                  <Box className={classes.priceLabel}>Price: $199.00</Box>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Box>
      <Container maxWidth='lg'>
        <Box mt={[5, 10]} mb={8}>
          <TwoColContentListing
            title='More events from ASCD'
            items={futureEvents}
            limit={4}
            body={
              <ReactMarkdown>
                Register today for our upcoming events. All virtual events are
                available to view for at least 30 days after the event **(so you
                can still register even after the live event date)**.
              </ReactMarkdown>
            }
            variant='event'
          />
        </Box>
        <Divider />
        <Box my={10}>
          <TextCTA
            title='Become a Member'
            description='Save on event registration fees and enjoy access to exclusive webinars.'
            ctaLabel='Join'
            ctaLink='/memberships'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'event',
    select: 'fields.slug',
    limit: process.env.NEXT_STATIC_BUILD_LIMIT || 200,
  })

  return {
    paths: data.items.map((item) => ({
      params: { slug: item?.fields?.slug },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'event',
    'fields.slug': params.slug,
  })

  if (!data || !data.items || data.items.length == 0) {
    return {
      notFound: true,
    }
  }

  const events = await client.getEntries({
    content_type: 'event',
  })

  return {
    props: {
      event: data.items.length ? data.items[0] : undefined,
      events: events.items,
    },
    revalidate: 20,
  }
}
