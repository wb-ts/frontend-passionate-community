import React, { useState } from 'react'
import { Box, Grid, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import _, { sortBy } from 'lodash'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import TextStyle from '../../../components/atoms/TextStyle'
import Directory from '../../../components/molecules/Directory/Directory'
import {
  CustomDateRangePicker,
  CustomDropDownSelect,
  CustomSearchBox,
  CustomClearFilters,
} from '../plugins'
import { ResultsComponent } from '../ResultsComponent'
/**
 * Rendering People Search

 */

const useStyles = makeStyles((theme) => ({
  filter: {
    width: '250px',
    margin: 16,
  },
}))


const withPeopleSearch = (searchClient, hitsPerPage = 3) => {

  const [isClicked , setIsClickedLoadMore ] = useState(false);
  const [previousHits , setPreviousHits ] = useState([]);

  const Refinements = () => {
    const classes = useStyles()

    return (
      <Box
        display='flex'
        flexDirection='row'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='center'
      >
        <Box m={2}>
          <Box>Expertise</Box>
          <CustomDropDownSelect attribute='expertise' customWidth={200} />
        </Box>
        <Box m={2}>
          <Box>Profile Type</Box>
          <CustomDropDownSelect attribute='profileType' customWidth={200} />
        </Box>
      </Box>
    )
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_PEOPLE_INDEX_ID}
    >
      <main className='search-container'>
        <Configure hitsPerPage={hitsPerPage} />
        <Box
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          justifyContent='center'
          alignItems='center'
        >
          <Refinements />
          <Box mt={2} textAlign='center'>
            <CustomSearchBox
              customWidth={200}
              translations={{ placeholder: 'Search for products' }}
            />
          </Box>
          <Box>
            <CustomClearFilters />
          </Box>
        </Box>
        <Box mt={2} display='flex' justifyContent='center' alignItems='center'>
          <ResultsComponent 
            RenderResults={RenderResults} 
            isInfinite={true} 
            isPeople = {true} 
            isClicked= {isClicked} 
            setIsClickedLoadMore = {setIsClickedLoadMore} 
            previousHits = {previousHits} 
            setPreviousHits = {setPreviousHits} 
          />
        </Box>
      </main>
    </InstantSearch>
  )
}


const RenderResults = ({ hits }) => {

  const groupByLastName = _(hits)
    .filter((author) => author.lastName)
    .groupBy((o) => {
      const ln = o.lastName?.trim()
      return ln[0].toUpperCase()
    })
    .map((contacts, letter) => ({ letter, contacts }))
    .sortBy('letter')
    .value()

  return (
    <Box sx={{ width: '100%' }}>
      {groupByLastName.map(
        (item) =>
          item.contacts.length > 0 && (
            <Container key={item.letter}>
              <Box my={2} ml={2}>
                <TextStyle variant='h1'> {item.letter} </TextStyle>
              </Box>
              <Directory items={item.contacts} />
            </Container>
          )
      )}
    </Box>
  )
}

export default withPeopleSearch
