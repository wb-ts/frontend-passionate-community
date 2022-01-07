import React from 'react'
// import { connectStateResults } from 'react-instantsearch/connectors'

import { connectStateResults } from 'react-instantsearch-dom'
import { ResultsComponent } from '../ResultsComponent'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
/**
 * The StateResults widget provides a way to access the searchState and the searchResults of InstantSearch.
 * https://www.algolia.com/doc/api-reference/widgets/state-results/react/#about-this-widget
 * Used React Material UI library and connectStateResults component to customize the UI.
 *
 * @param {Boolean} isInfinite if True, display an infinite list of results with a “Load more” button, else display with Pagination
 * @returns
 */
export const StateResults = ({
  searchState,
  searchResults,
  ItemCard,
  customWidth,
  isInfinite,
  isSearchStalled,
}) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  const nbHits = searchResults && searchResults.nbHits

  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      {isSearchStalled ? (
        <Box data-testid='circularprogress-id'>
          <CircularProgress color='inherit' />
        </Box>
      ) : (
        <Box>
          {hasResults ? (
            <ResultsComponent
              customWidth={customWidth}
              ItemCard={ItemCard}
              isInfinite={isInfinite}
            />
          ) : (
            <Box data-testid='no-results-id'>
              No results found for <strong>{searchState.query}</strong>.
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

StateResults.propTypes = {
  searchState: PropTypes.object,
  searchResults: PropTypes.object,
  isInfinite: PropTypes.bool,
  ItemCard: PropTypes.elementType,
  isSearchStalled: PropTypes.bool,
  customWidth: PropTypes.number,
}

const CustomStateResults = connectStateResults(StateResults)

export default CustomStateResults
