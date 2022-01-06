import React from 'react'
import algoliasearch from 'algoliasearch'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CustomDateRangePicker, CustomDropDownSelect } from '../plugins'
import { CustomStateResults } from '../CustomStateResults'
import { algoliaAppId, algoliaSearchApiKey } from '@/lib/algolia'
import { RefinementsTop } from '../layout'
import WorkshopListItem from '@/components/molecules/Workshop/WorkshopListItem'
/**
 * Rendering Workshop Search

 */

const useStyles = makeStyles((theme) => ({
  filter: {
    width: '250px',
    margin: 16,
  },
}))

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)
const WorkshopSearch = () => {
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

  const Results = () => {
    return (
      <Box mt={2}>
        <CustomStateResults
          ItemCard={WorkshopListItem}
          customWidth={4}
          isInfinite={true}
        />
      </Box>
    )
  }
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_WORKSHOP_INDEX_ID}
    >
      <main className='search-container'>
        <Configure
          hitsPerPage={3}
          attributesToSnippet={['content:24']}
          snippetEllipsisText=' ...'
        />
        <RefinementsTop Refinements={<Refinements />} Content={<Results />} />
      </main>
    </InstantSearch>
  )
}

export default WorkshopSearch
