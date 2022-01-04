import {
  connectSearchBox,
  connectCurrentRefinements,
} from 'react-instantsearch-dom'
import { compose, renameProp } from 'react-recompose'
import { Box, Link } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * The CustomClearFilters widget displays a button that lets the user clear currently applied refinements
 * except for refinements that are listed in keepFilters
 * It also clears the search box.
 * https://www.algolia.com/doc/api-reference/widgets/clear-refinements/react/
 * Used React Material UI library and connectCurrentRefinements component to create our own UI
 * https://www.algolia.com/doc/api-reference/widgets/clear-refinements/react/#connector
 * @param {Array} keepFilters Array of refinements to keep when clicking clear button.
 * @returns
 */

export const ClearFilters = ({
  items,
  refine,
  handleSearchRefine,
  keepFilters,
}) => {
  const filterList = items.filter((item) => {
    return keepFilters.indexOf(item.attribute) < 0
  })
  const handleClear = () => {
    if (filterList.length > 0) {
      refine(filterList)
    }

    //clear searchbox
    handleSearchRefine('')
  }
  return (
    <Box pl={1}>
      <Link onClick={handleClear}>Clear Filters</Link>
    </Box>
  )
}

ClearFilters.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  refine: PropTypes.func,
  handleSearchRefine: PropTypes.func,
  keepFilters: PropTypes.arrayOf(PropTypes.string),
}

const CustomClearFilters = compose(
  connectSearchBox,
  renameProp('refine', 'handleSearchRefine'),
  connectCurrentRefinements
)(ClearFilters)
export default CustomClearFilters
