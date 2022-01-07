import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Container, Divider, Grid } from '@mui/material'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import { makeStyles } from '@mui/styles'
import _, { sortBy } from 'lodash'
import FilterDropdown from '../../components/atoms/FilterDropdown'
import TextStyle from '../../components/atoms/TextStyle'
import Layout from '../../components/layout'
import Banner from '../../components/molecules/banner'
import Directory from '../../components/molecules/directory'
import TwoColumnCta from '../../components/molecules/twocolumncta'
import { SEOHead } from '../../const'
import { client } from '../../lib/contentful'

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

export default function AllAuthors({
  authors,
  profileCategories,
  topicCategories,
  SEO,
  hasQueryParamCategoryProfiles,
  hasQueryParamCategoryTopics,
}) {
  const classes = useStyles()

  const [people, setPeople] = useState([])
  const [authorsByExpertise, setAuthorsByExpertise] = useState([])

  const sortedAuthors = sortBy(
    !hasQueryParamCategoryProfiles
      ? !hasQueryParamCategoryTopics
        ? authors
        : authorsByExpertise
      : people,
    (item) => item?.fields?.lastName?.trim().toUpperCase()
  )

  const result = _(sortedAuthors)
    .filter((author) => author.fields.lastName)
    .groupBy((o) => {
      const ln = o.fields.lastName?.trim()
      return ln[0].toUpperCase()
    })
    .map((contacts, letter) => ({ letter, contacts }))
    .value()

  const [state, setState] = useState({
    topicsFilter: [],
  })
  const [topic, setTopic] = useState('')
  const [searchText, setSearchText] = useState('')

  const { topicsFilter } = state

  useEffect(() => {
    let authorsFilteredByExpertise = []
    let filteredAuthors = []

    const givenProfileCategoryIds = profileCategories?.length
      ? profileCategories?.map((el) => el.sys.id)
      : []

    const givenTopicCategoryIds = topicCategories?.length
      ? topicCategories?.map((el) => el.sys.id)
      : []

    if (authors?.length) {
      if (hasQueryParamCategoryProfiles) {
        filteredAuthors = authors
          .filter((author) => author.fields.profileType)
          .filter((a) => {
            let match = false
            a.fields.profileType.forEach((e) => {
              if (givenProfileCategoryIds.includes(e?.sys?.id)) {
                match = true
              }
            })
            return match
          })
        setPeople(filteredAuthors)
      }

      if (hasQueryParamCategoryTopics) {
        authorsFilteredByExpertise = (
          filteredAuthors.length
            ? filteredAuthors
            : hasQueryParamCategoryProfiles
            ? filteredAuthors
            : authors
        )
          .filter((author) => author?.fields?.expertise)
          .filter((a) => {
            let match = false
            a.fields.expertise.forEach((e) => {
              if (givenTopicCategoryIds.includes(e?.sys?.id)) {
                match = true
              }
            })
            return match
          })
        setAuthorsByExpertise(authorsFilteredByExpertise)
        if (filteredAuthors?.length) {
          setPeople(authorsFilteredByExpertise)
        }
      }
    }

    const topicsFilter = (
      authorsFilteredByExpertise?.length
        ? authorsFilteredByExpertise
        : filteredAuthors?.length
        ? filteredAuthors
        : authors
    )
      .map((myItem) =>
        filteredAuthors?.length
          ? myItem.fields.profileType
          : myItem.fields.expertise
      )
      .flat()
      .map((exp) => exp?.fields?.title)
      .reduce((unique, o) => {
        if (!unique.some((obj) => obj === o)) {
          unique.push(o)
        }
        return unique
      }, [])
      .sort()

    topicsFilter.unshift(filteredAuthors?.length ? `All Types` : `All Topics`)

    setState({ ...state, topicsFilter: topicsFilter })
  }, [])

  useEffect(() => {
    if (topicsFilter.length > 0) {
      setTopic(topicsFilter[0])
    }
  }, [topicsFilter])

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Banner
        header1='Everyone @ ASCD'
        header2='Get to know the people shaping our education community'
      />
      <Container maxWidth='lg'>
        <Grid container className={classes.searchBar} spacing={4}>
          <Grid item xs={12} md={10}>
            <Input
              placeholder='Search by name'
              onChange={(e) => setSearchText(e.target.value)}
              className={classes.textField}
              classes={{
                input: classes.input,
              }}
              endAdornment={
                <InputAdornment position='end'>
                  <Divider
                    orientation='vertical'
                    variant='middle'
                    flexItem
                    className={classes.divider}
                  />
                  <Box>
                    <SearchIcon />
                  </Box>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FilterDropdown
              items={topicsFilter}
              defaultValue={topic}
              action={(filterVal) => setTopic(filterVal)}
              marginLeft='0px'
            />
          </Grid>
        </Grid>
      </Container>
      {result.map((item, index) => {
        const filteredContacts = item.contacts
          .filter((subitem) => {
            if (topic !== (people?.length ? `All Types` : `All Topics`)) {
              if (
                !(people?.length
                  ? subitem.fields.profileType
                  : subitem.fields.expertise) ||
                ((people?.length
                  ? subitem.fields.profileType
                  : subitem.fields.expertise) &&
                  !(
                    people?.length
                      ? subitem.fields.profileType
                      : subitem.fields.expertise
                  ).some((obj) => obj.fields?.title === topic))
              )
                return false
            }
            return true
          })
          .filter((subitem) => {
            if (searchText !== '') {
              if (
                !(subitem.fields.firstName + subitem.fields.lastName)
                  .toUpperCase()
                  .replace(/\s/g, '')
                  .includes(searchText.toUpperCase().replace(/\s/g, ''))
              )
                return false
            }
            return true
          })
        return (
          filteredContacts.length > 0 && (
            <Container key={item.letter}>
              <Box my={2} ml={2}>
                <TextStyle variant='h1'> {item.letter} </TextStyle>
              </Box>
              <Directory items={filteredContacts} />
            </Container>
          )
        )
      })}
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
  const maxEntries = 1000
  const categoryProfiles =
    context.query.categoryProfiles && context.query.categoryProfiles.length
      ? context.query.categoryProfiles
      : ''
  const hasKeyCategoryProfiles = context.query.categoryProfiles !== undefined
  const categoryTopics =
    context.query.categoryTopics && context.query.categoryTopics.length
      ? context.query.categoryTopics
      : ''
  const hasKeyCategoryTopics = context.query.categoryTopics !== undefined

  const profileCategories = await client.getEntries({
    content_type: 'categoryProfiles',
    'fields.title[in]': categoryProfiles,
    limit: maxEntries,
  })

  const topicCategories = await client.getEntries({
    content_type: 'categoryTopics',
    'fields.title[in]': categoryTopics,
    limit: maxEntries,
  })

  //unarchived persons
  let offset = 0
  let items = []
  let processedEntries = null
  while (processedEntries !== 0) {
    const entries = await client.getEntries({
      content_type: 'profile',
      'fields.authorStatus[ne]': 'Archive',
      select:
        'fields.title,fields.thumbnail,fields.slug,fields.lastName,fields.firstName,fields.expertise,fields.profileType',
      skip: offset,
      limit: maxEntries,
    })

    processedEntries = entries.items.length

    if (processedEntries > 0) {
      offset += processedEntries
      items.push(...entries.items)
    }
  }

  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'people/all',
  })

  return {
    props: {
      authors: items,
      profileCategories: profileCategories.items,
      topicCategories: topicCategories.items,
      SEO: SEOData.items.length ? SEOData.items[0] : {},
      hasQueryParamCategoryProfiles: hasKeyCategoryProfiles,
      hasQueryParamCategoryTopics: hasKeyCategoryTopics,
    },
  }
}
