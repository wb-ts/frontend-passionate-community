import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
<<<<<<< HEAD
import { Box, Grid, Button , CircularProgress} from '@mui/material'
import PropTypes from 'prop-types'
import { connectHits, connectInfiniteHits , connectStateResults } from 'react-instantsearch-dom'
import { branch } from 'react-recompose'
import { CustomPagination } from '../plugins'
import { useEffect } from 'react'
=======
import { Box, Grid, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import PropTypes from 'prop-types'
import {
  connectHits,
  connectInfiniteHits,
  connectStateResults,
} from 'react-instantsearch-dom'
import { branch } from 'react-recompose'
import { CustomPagination } from '../plugins'

>>>>>>> 52543b1f953d102d23b18307c109049e756ad9b3
/**
 * Use the widget to display a list of results.
 * @param {Boolean} isInfinite if True, display an infinite list of results with a “Load more” button, else display with Pagination
 * @param {Component} ItemCard
 * @returns
 */

export const ResultHits = ({
  hits,
  isInfinite,
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext,
  RenderResults,
  searchState,
<<<<<<< HEAD
  isSearchStalled
=======
  searchResults,
  isSearchStalled,
>>>>>>> 52543b1f953d102d23b18307c109049e756ad9b3
}) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  return (
<<<<<<< HEAD
    <Box sx={{ flexGrow: 1 }}>
      <RenderResults hits={hits} />
=======
    <Box display='flex' justifyContent='center' alignItems='center'>
>>>>>>> 52543b1f953d102d23b18307c109049e756ad9b3
      {isSearchStalled ? (
        <Box data-testid='circularprogress-id'>
          <CircularProgress color='inherit' />
        </Box>
      ) : (
<<<<<<< HEAD
        hits.length > 0 ?
          isInfinite ? (
            <Box my={10}>
              <Button
                disabled={!hasMore}
                onClick={refineNext}
                startIcon={<ArrowDownwardIcon />}
              >
                Load More
              </Button>
            </Box>
          ) : (
            <Box>
              <CustomPagination />
            </Box>
          ) 
        : 
        <Box data-testid='no-results-id'>
          No results found for <strong>{searchState.query}</strong>.
=======
        <Box sx={{ width: '100%' }}>
          {hasResults ? (
            <Box sx={{ flexGrow: 1 }}>
              <RenderResults hits={hits} />
              {isInfinite ? (
                <Box my={10}>
                  <Button
                    disabled={!hasMore}
                    onClick={refineNext}
                    startIcon={<ArrowDownwardIcon />}
                  >
                    Load More
                  </Button>
                </Box>
              ) : (
                <Box>
                  <CustomPagination />
                </Box>
              )}
            </Box>
          ) : (
            <Box data-testid='no-results-id'>
              No results found for <strong>{searchState.query}</strong>.
            </Box>
          )}
>>>>>>> 52543b1f953d102d23b18307c109049e756ad9b3
        </Box>
      )}
      
    </Box>
  )
}

ResultHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object),
  isInfinite: PropTypes.bool,
  hasMore: PropTypes.bool,
  refineNext: PropTypes.func,
  RenderResults: PropTypes.elementType,
  hasPrevious: PropTypes.bool,
  refinePrevious: PropTypes.func,
  searchState: PropTypes.object,
  isSearchStalled: PropTypes.bool,
}

const ResultsComponent = branch(
  ({ isInfinite }) => isInfinite,
  connectInfiniteHits,
  connectHits
)(connectStateResults(ResultHits))

export default ResultsComponent
