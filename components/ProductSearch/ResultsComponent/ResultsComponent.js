import { connectHits, connectInfiniteHits } from 'react-instantsearch-dom'
import { Box, Grid, Button } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { branch } from 'react-recompose'
import { CustomPagination } from '../plugins'
import { hasMemberBookPriceVar } from '@/lib/apollo-client/cache'
import { useReactiveVar } from '@apollo/client'
import PropTypes from 'prop-types'
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
  ItemCard,
  customWidth,
}) => {
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {hits.map((hit) => (
          <Grid item xs={12} md={customWidth} key={hit.objectID}>
            <ItemCard useMemberBookPrice={hasMemberBookPrice} cardData={hit} />
          </Grid>
        ))}
      </Grid>
      {isInfinite ? (
        <Box my={10}>
          <Button
            disabled={!hasMore}
            onClick={refineNext}
            startIcon={<ArrowDownwardIcon />}
          >
            View More
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
  customWidth: PropTypes.number,
  ItemCard: PropTypes.elementType,
  hasPrevious: PropTypes.bool,
  refinePrevious: PropTypes.func,
}

const ResultsComponent = branch(
  ({ isInfinite }) => isInfinite,
  connectInfiniteHits,
  connectHits
)(ResultHits)

export default ResultsComponent
