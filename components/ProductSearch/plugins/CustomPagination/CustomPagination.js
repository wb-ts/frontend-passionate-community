import { makeStyles } from '@mui/styles'
import { Box, Pagination, Stack } from '@mui/material'
import { connectPagination } from 'react-instantsearch-dom'
import PropTypes from 'prop-types'
/**
 * The Pagination widget displays a pagination system allowing the user to change the current page.
 * https://www.algolia.com/doc/api-reference/widgets/pagination/react/
 * https://www.algolia.com/doc/api-reference/widgets/pagination/react/#connector
 * @param {*} param0
 * @returns
 */
export const MyPagination = ({
  currentRefinement,
  nbPages,
  refine,
  createURL,
}) => {
  const handleChange = (event, value) => {
    refine(value)
  }
  return (
    <Stack spacing={2}>
      <Pagination
        data-testid='custom-pagination-id'
        count={nbPages}
        page={currentRefinement}
        color='primary'
        onChange={handleChange}
      />
    </Stack>
  )
}

MyPagination.propTypes = {
  currentRefinement: PropTypes.number,
  nbPages: PropTypes.number,
  createURL: PropTypes.func,
  refine: PropTypes.func,
}

const CustomPagination = connectPagination(MyPagination)
export default CustomPagination
