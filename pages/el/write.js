import React from 'react'
import { Box, Container } from '@mui/material'
import _ from 'lodash'
import Layout from '../../components/layout'
import IssueBannerTitle from '../../components/molecules/issuebannertitle'
import TextCTA from '../../components/molecules/textcta'
import AccordionList from '../../components/organisms/accordionlist'
import HorizontalScroll from '../../components/organisms/horizontalscroll'
import { SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import paths from '../../paths/path'

export default function WriteEL({ topics, publications, SEO }) {
  const dateFormat = require('dateformat')

  const sortedIssues = _.reverse(_.sortBy(topics, ['fields.deadlineDate']))

  let issues = sortedIssues.map((topic) => {
    return {
      title: topic.fields.title,
      deadline: dateFormat(topic.fields.deadlineDate, 'UTC:mmmm d, yyyy'),
      details: topic.fields.description,
      filterDate: topic.fields.magazineDate,
      filterTopic: topic.fields.topic.fields?.title,
    }
  })

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Container maxWidth='md'>
        <Box
          mt={[3, 7]}
          mx={[1, 'auto']}
          display='flex'
          justifyContent='center'
        >
          <IssueBannerTitle
            landing={{
              title: 'Write for EL Magazine',
              subtitle:
                'Contribute to our flagship magazine written by practitioners for practitioners.',
            }}
            ctaLabel='Get to know our guidelines'
            ctaLink={'/guidelines-for-el'}
            ctaWidth='250px'
            align='center'
          />
        </Box>
      </Container>
      <Box mt={[6, 10]} mx={[3, 'auto']}>
        <TextCTA
          title='Want to speak with the EL team about your submission?'
          ctaLabel='Contact Us'
          ctaLink='mailto:edleadership@ascd.org'
        />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={[6, 10]} mx={[1, 'auto']}>
          {/* <FutureIssuesList issues={issues} /> */}
          <AccordionList issues={issues} variant='issue' />
        </Box>
      </Container>
      <Container>
        <Box mt={[6, 10]} mb={[3, 6]} mx={[1, 'auto']}>
          <HorizontalScroll
            title='Recent Issues'
            ctaLabel='View all'
            ctaLink={paths.el({ slug: 'all' })}
            items={publications}
            type='issuetile'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const write = await client.getEntries({
    content_type: 'futureIssue',
  })

  const pubissue = await client.getEntries({
    content_type: 'pubissue',
    order: '-fields.publicationDate',
    select:
      'fields.title,fields.slug,fields.thumbnail,fields.volNo,fields.issueNo,fields.publicationDate',
    include: 2,
    limit: 8,
  })

  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'el',
    limit: 1,
  })

  return {
    props: {
      topics: write.items,
      publications: pubissue.items,
      SEO: SEOData.items.length ? SEOData.items[0] : {},
    },
    revalidate: 20,
  }
}
