import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Box, Grid, Button } from '@mui/material'
import PropTypes from 'prop-types'
import { connectHits, connectInfiniteHits } from 'react-instantsearch-dom'
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
}) => {
  return (
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
)(ResultHits)

export default ResultsComponent
