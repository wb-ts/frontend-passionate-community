import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Container } from '@mui/material'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import { makeStyles } from '@mui/styles'
import { sortBy } from 'lodash'
import TextStyle from '../../components/atoms/TextStyle'
import Layout from '../../components/layout'
import Banner from '../../components/molecules/banner'
import Directory from '../../components/molecules/directory'
import { SEOHead } from '../../const'
import { client } from '../../lib/contentful'

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
  [theme.breakpoints.down('sm')]: {
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
