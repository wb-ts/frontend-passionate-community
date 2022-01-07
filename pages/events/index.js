import React from 'react'
import { Box, Container, Divider, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactMarkdown from 'react-markdown'
import TextStyle from '../../components/atoms/TextStyle'
import Layout from '../../components/layout'
import EventCard from '../../components/molecules/eventcard'
import HeroHalfHalf from '../../components/molecules/herohalfhalf'
import TwoColumnCTA from '../../components/molecules/twocolumncta'
import ContentGrid from '../../components/organisms/contentgrid'
import TwoColContentListing from '../../components/organisms/twocolcontentlisting'
import { imageoptimization, SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import paths from '../../paths/path'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '40px',
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '400px',
    marginTop: 'unset',
  },
  ctaBox: {
    color: theme.palette.text.primary,
    borderTop: `1px solid ${theme.palette.grey.extraLight}`,
    borderBottom: `1px solid ${theme.palette.grey.extraLight}`,
    [theme.breakpoints.up('md')]: {
      border: 0,
      backgroundColor: theme.palette.grey.extraLight,
    },
  },
  link: {
    textDecoration: 'underline',
    paddingTop: '8px',
    letterSpacing: '0.2px',
    fontWeight: '600',
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
  subtitle: {
    fontSize: '1.5rem',
    marginTop: '20px',
  },
}))

export default function Events({
  events,
  webinars,
  SEO,
  webinarImage,
  symposiumImage,
  summitImage,
  conferenceImage,
}) {
  const classes = useStyles()

  const about = [
    {
      image: webinarImage?.fields?.imageBynder
        ? webinarImage?.fields?.imageBynder[0]?.src +
          '?' +
          imageoptimization.qualityParameter +
          '=' +
          imageoptimization.qualityValue
        : webinarImage?.fields?.imageContentful?.fields?.file?.url
        ? webinarImage?.fields?.imageContentful?.fields?.file?.url +
          '?' +
          imageoptimization.qualityParameter +
          '=' +
          imageoptimization.qualityValue
        : '/images/ASCDImageFiller.png',
      alt: 'Webinars image',
      title: 'Webinars',
      body: 'Our free webinar series brings education experts to you discussing topics like student engagement, classroom technology, and instructional strategies.',
      ctaLabel: 'Learn more',
      ctaLink: '/webinars',
    },
    {
      image: symposiumImage?.fields?.imageBynder
        ? symposiumImage?.fields?.imageBynder[0]?.src +
          '?' +
          imageoptimization.qualityParameter +
          '=' +
          imageoptimization.qualityValue
        : symposiumImage?.fields?.imageContentful?.fields?.file?.url
        ? symposiumImage?.fields?.imageContentful?.fields?.file?.url +
          '?' +
          imageoptimization.qualityParameter +
          '=' +
          imageoptimization.qualityValue
        : '/images/ASCDImageFiller.png',
      alt: 'Symposiums image',
      title: 'Symposiums',
      body: 'Half-day symposiums that dive deep into the issues affecting educators. learn while engaging with peers and presenters in real time.',
      ctaLabel: 'Learn more',
      ctaLink: 'http://events.ascd.org/symposiums',
    },
    {
      image: summitImage?.fields?.imageBynder
        ? summitImage?.fields?.imageBynder[0]?.src +
          '?' +
          imageoptimization.qualityParameter +
          '=' +
          imageoptimization.qualityValue
        : summitImage?.fields?.imageContentful?.fields?.file?.url
        ? summitImage?.fields?.imageContentful?.fields?.file?.url +
          '?' +
          imageoptimization.qualityParameter +
          '=' +
          imageoptimization.qualityValue
        : '/images/ASCDImageFiller.png',
      alt: 'Leadership Summit image',
      title: 'Leadership Summit',
      body: 'Three-day virtual summit designed to inspire you and your leadership team and give you the skills and strategies you need to lead with confidence.',
      ctaLabel: 'Learn more',
      ctaLink: 'http://events.ascd.org/leadership-summit',
    },
    {
      image: conferenceImage?.fields?.imageBynder
        ? conferenceImage?.fields?.imageBynder[0]?.src +
          '?' +
          imageoptimization.qualityParameter +
          '=' +
          imageoptimization.qualityValue
        : conferenceImage?.fields?.imageContentful?.fields?.file?.url
        ? conferenceImage?.fields?.imageContentful?.fields?.file?.url +
          '?' +
          imageoptimization.qualityParameter +
          '=' +
          imageoptimization.qualityValue
        : '/images/ASCDImageFiller.png',
      alt: 'Annual Conference image',
      title: 'Annual Conference',
      body: 'This signature event brings experts and practitioners together to recharge and inspire you as we look ahead to a new school year and begin summer learning.',
      ctaLabel: 'Learn more',
      ctaLink: 'http://events.ascd.org/annual-conference',
    },
  ]

  const learnmore = [
    {
      title: 'Proposals & Presenters',
      body: 'Find out which events are actively seeking proposal submissions and sign up to be notified when they do. ',
      ctaLabel: 'Learn More',
      ctaLink: 'https://events.ascd.org/proposals',
    },
    {
      title: 'Sponsors & Exhibitors',
      body: "Connect your company to today's education leaders and decision makers at our events.",
      ctaLabel: 'Learn More',
      ctaLink: 'https://events.ascd.org/sponsors-and-exhibitors',
    },
    {
      title: 'Registration Rules',
      body: 'Attendees must be 18 years of age or older, unless advanced written authorization from ASCD is secured.',
      ctaLabel: 'Learn More',
      ctaLink: 'https://events.ascd.org/event-registration-policies ',
    },
  ]

  const featuredEvent = events.filter((event) => event.fields.featured)[0]

  const futureEvents = events
    // .filter((event) =>
    //   featuredEvent ? event.sys.id !== featuredEvent.sys.id : true
    // )
    .filter((item) => {
      const released = Date.parse(item.fields.dateTime)
      const today = new Date().getTime()
      return released > today
    })
    .sort((a, b) => {
      return Date.parse(a.fields.dateTime) - Date.parse(b.fields.dateTime)
    })

  const navigateTo = (id) => {
    const el = window.document.getElementById(id)
    const r = el.getBoundingClientRect()
    window.scrollTo({
      top: pageYOffset + r.top,
      behavior: 'smooth',
    })
  }

  var dateFormat = require('dateformat')

  const descriptionCharCount =
    featuredEvent?.fields?.description?.length > 0
      ? featuredEvent.fields.description.length
      : 0

  return (
    <Layout>
      <SEOHead seo={SEO} />

      <Box pt={[0, 7]} pb={7} maxWidth={['100%', '1024px']} margin='auto'>
        <HeroHalfHalf
          title='Events'
          description='Experience virtual learning from virtually anywhere'
          imagePos='right'
          image='images/events.png'
          imageAlt='Events banner image'
          ctaLabel1='Upcoming events'
          ctaLink1={() => navigateTo('upcoming-events')}
          ctaLabel2='Watch past webinars'
          ctaLink2='/webinars'
        />
      </Box>

      <Box my={5}>
        <Divider />
      </Box>
      <Container maxWidth='lg'>
        <Box
          mt={10}
          px={[3, 0]}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Box mb={6}>
            <TextStyle variant='h3'>About our events</TextStyle>
          </Box>
          <Grid container spacing={5}>
            {about.map((item, key) => (
              <Grid item xs={12} md={3} key={key}>
                <EventCard
                  image={item.image}
                  alt={item.alt}
                  title={item.title}
                  body={item.body}
                  ctaLabel={item.ctaLabel}
                  ctaLink={item.ctaLink}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {featuredEvent && (
          <Box mt={10}>
            <TwoColumnCTA
              label={featuredEvent.fields.type?.fields?.title}
              title={featuredEvent.fields.title}
              date={dateFormat(featuredEvent.fields.dateTime, 'longDate')}
              time={dateFormat(featuredEvent.fields.dateTime, 'shortTime')}
              description={featuredEvent.fields.description}
              descriptionLineNumbers={
                descriptionCharCount > 315
                  ? 8
                  : descriptionCharCount > 270
                  ? 7
                  : descriptionCharCount > 225
                  ? 6
                  : descriptionCharCount > 180
                  ? 5
                  : descriptionCharCount > 135
                  ? 4
                  : descriptionCharCount > 90
                  ? 3
                  : null
              }
              image={
                featuredEvent.fields?.thumbnail?.fields?.imageBynder
                  ? featuredEvent.fields?.thumbnail?.fields?.imageBynder[0]
                      ?.src +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : featuredEvent.fields?.thumbnail?.fields?.imageContentful
                      ?.fields?.file?.url
                  ? featuredEvent.fields?.thumbnail?.fields?.imageContentful
                      ?.fields?.file?.url +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : '/images/ASCDImageFiller.png'
              }
              imagePos={'right'}
              variant='grey'
              ctaLabel1={'Learn more'}
              ctaLink1={featuredEvent.fields?.link}
            />
          </Box>
        )}

        <Box pt={10} id='upcoming-events'>
          <TwoColContentListing
            title='Upcoming Events'
            body={
              <ReactMarkdown>
                Register today for our upcoming events. All virtual events are
                available to view for at least 30 days after the event **(so you
                can still register even after the live event date)**.
              </ReactMarkdown>
            }
            items={futureEvents}
            variant='event'
          />
        </Box>
      </Container>

      <Box
        mt={10}
        mx={[2, 0]}
        py={[5, 10]}
        px={[3, 0]}
        className={classes.ctaBox}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={4}>
            {learnmore.map((item, key) => (
              <Grid item xs={12} md={4} key={key}>
                <EventCard
                  title={item.title}
                  body={item.body}
                  ctaLabel={item.ctaLabel}
                  ctaLink={item.ctaLink}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Container maxWidth='lg'>
        <Box my={11}>
          <ContentGrid
            sectionTitle='Past Webinars'
            items={webinars}
            showFilters={false}
            showDivider={false}
            contentLimit={3}
            viewAllLink={paths.search({ types: ['webinar'] })}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const webinarData = await client.getEntries({
    content_type: 'webinar',
    order: '-fields.date',
    limit: 8,
  })
  const eventData = await client.getEntries({
    content_type: 'event',
  })
  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'events',
  })

  const webinarImage = await client.getEntries({
    content_type: 'image',
    'sys.id': '3j3O9jryvknM1pgoGXFYHR',
  })

  const symposiumImage = await client.getEntries({
    content_type: 'image',
    'sys.id': '61aQkzqHqZt3iE6TAd0Lmp',
  })

  const summitImage = await client.getEntries({
    content_type: 'image',
    'sys.id': '5hY1sz2iVWb69b5NdSBIk4',
  })

  const conferenceImage = await client.getEntries({
    content_type: 'image',
    'sys.id': '1NsnPynuTAuHqjHWhND1gA',
  })

  return {
    props: {
      webinars: webinarData.items,
      webinarImage: webinarImage.items.length ? webinarImage.items[0] : null,
      symposiumImage: symposiumImage.items.length
        ? symposiumImage.items[0]
        : null,
      summitImage: summitImage.items.length ? summitImage.items[0] : null,
      conferenceImage: conferenceImage.items.length
        ? conferenceImage.items[0]
        : null,
      events: eventData.items,
      SEO: SEOData.items.length ? SEOData.items[0] : {},
    },
    revalidate: 20,
  }
}
