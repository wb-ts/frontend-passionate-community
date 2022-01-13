import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import { CustomStateResults } from '../CustomStateResults'
import { RefinementsTop } from '../layout'
import {
  CustomDateRangePicker,
  CustomDropDownSelect,
  CustomSearchBox,
  CustomClearFilters,
} from '../plugins'
import { ResultsComponent } from '../ResultsComponent'
import WorkshopListItem from '@/components/molecules/Workshop/WorkshopListItem'
import { hasMemberBookPriceVar } from '@/lib/apollo-client/cache'

/**
 * Rendering Workshop Search

 */

const useStyles = makeStyles((theme) => ({
  filter: {
    width: '250px',
    margin: 16,
  },
}))

const withWorkshopSearch = (searchClient, hitsPerPage = 3) => {
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
          <Box>Topics</Box>
          <CustomDropDownSelect attribute='topics' customWidth={200} />
        </Box>
        <Box m={2}>
          <Box>Date</Box>
          <CustomDateRangePicker
            attribute='workshopDateTimeStamp'
            min={-2208948402} // 01/01/0
            max={4102484440} // 01/01/2100
          />
        </Box>
      </Box>
    )
  }

  // const Results = () => {
  //   return (
  //     <Box mt={2}>
  //       <CustomStateResults RenderResults={RenderResults} isInfinite={true} />
  //     </Box>
  //   )
  // }
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_WORKSHOP_INDEX_ID}
    >
      <main className='search-container'>
        <Configure hitsPerPage={hitsPerPage} />
        {/* <RefinementsTop Refinements={<Refinements />} Content={<Results />} /> */}
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
            <CustomClearFilters keepFilters={['workshopDateTimeStamp']} />
          </Box>
        </Box>
        <Box mt={2} display='flex' justifyContent='center' alignItems='center'>
          <ResultsComponent RenderResults={RenderResults} isInfinite={true} />
        </Box>
      </main>
    </InstantSearch>
  )
}

const RenderResults = ({ hits }) => {
  console.log('hits ', hits)
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  return (
    <>
      <Grid container spacing={3}>
        {hits.map((hit) => (
          <Grid item xs={12} md={4} key={hit.objectID}>
            <WorkshopListItem
              useMemberBookPrice={hasMemberBookPrice}
              cardData={hit}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default withWorkshopSearch
