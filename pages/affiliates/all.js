import React from 'react'
import { client } from '@/lib/contentful'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import { Box, Container } from '@material-ui/core'
import Banner from '@/components/molecules/banner'
import { sortBy } from 'lodash'
import { useState } from 'react'
import TextStyle from '@/components/atoms/TextStyle'
import Directory from '@/components/molecules/directory'

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    fontSize: 30,
  },
  divider: {
    backgroundColor: '#C5CED1',
    height: '40px',
    marginTop: -30,
  },
  [theme.breakpoints.down('xs')]: {
    '.MuiButtonBase-root': {
      justifyContent: 'flex-start',
    },
  },
}))

export default function AffiliateLocations({ affiliateLocations, SEO }) {
  const classes = useStyles()
  const [searchText, setSearchText] = useState('')
  const sortedLocations = sortBy(
    affiliateLocations,
    (item) => item.fields.title
  )

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Banner
        header1='ASCD Affiliate Directory'
        header2='ASCD affiliates work collaboratively as part of the ASCD community to foster common values and goals.'
      />

      <Container maxWidtg='lg'>
        <Box mt={5} mb={7}>
          <Input
            placeholder='Search by location'
            onChange={(e) => setSearchText(e.target.value)}
            className={classes.textField}
            startAdornment={
              <InputAdornment position='start'>
                <SearchIcon className={classes.searchIcon} />
              </InputAdornment>
            }
          />
        </Box>
      </Container>
      {sortedLocations.map((location, index) => {
        const filteredLocations = location.fields.affiliates.filter(
          (affiliate) => {
            if (searchText !== '') {
              if (
                !affiliate.fields.title
                  .toUpperCase()
                  .includes(searchText.toUpperCase())
              )
                return false
            }
            return true
          }
        )
        return (
          filteredLocations.length > 0 && (
            <Container key={index}>
              <Box my={5} ml={2}>
                <TextStyle variant='h1'>{location.fields.title}</TextStyle>
              </Box>
              <Directory items={filteredLocations} />
            </Container>
          )
        )
      })}
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.getEntries({
    content_type: 'affiliateLocation',
    include: 3,
  })
  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'affiliates',
  })

  return {
    props: {
      affiliateLocations: data.items,
      SEO: SEOData.items.length ? SEOData.items[0] : {},
    },
    revalidate: 20,
  }
}
