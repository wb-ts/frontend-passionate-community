import { connectCurrentRefinements } from 'react-instantsearch-dom'
import { Box, Link } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * The CustomClearFilters widget displays a button that lets the user clear currently applied refinements
 * except for refinements that are listed in keepFilters.
 * It does not clear search box.
 * https://www.algolia.com/doc/api-reference/widgets/clear-refinements/react/
 * Used React Material UI library and connectCurrentRefinements component to create our own UI
 * https://www.algolia.com/doc/api-reference/widgets/clear-refinements/react/#connector
 * @param {Array} keepFilters Array of refinements to keep when clicking clear button.
 * @returns
 */
export const ClearRefinements = ({
  items,
  refine,
  keepFilters,
  ...restProps
}) => {
  const filterList = items.filter((item) => {
    return keepFilters.indexOf(item.attribute) < 0
  })
  const handleClear = () => {
    if (filterList.length > 0) {
      refine(filterList)
    }
  }
  return (
    <Box pl={1}>
      <Link onClick={handleClear}>Clear Filters</Link>
    </Box>
  )
}
ClearRefinements.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  refine: PropTypes.func,
  keepFilters: PropTypes.arrayOf(PropTypes.string),
}

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements)
export default CustomClearRefinements
