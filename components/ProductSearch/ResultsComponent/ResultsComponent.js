import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
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
  searchResults,
  isSearchStalled,
}) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      {isSearchStalled ? (
        <Box data-testid='circularprogress-id'>
          <CircularProgress color='inherit' />
        </Box>
      ) : (
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
}

const ResultsComponent = branch(
  ({ isInfinite }) => isInfinite,
  connectInfiniteHits,
  connectHits
)(connectStateResults(ResultHits))

export default ResultsComponent
