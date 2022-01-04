import { makeStyles } from '@mui/styles'
import { FormControl, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { connectSearchBox } from 'react-instantsearch-dom'
import PropTypes from 'prop-types'
/**
 * The SearchBox widget is used to let the user perform a text-based query.
 * https://www.algolia.com/doc/api-reference/widgets/search-box/react/
 * Used React Material UI library and connectSearchBox component to customize the UI.
 * https://www.algolia.com/doc/api-reference/widgets/search-box/react/#connector
 */
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '8px',
    width: (restProps) =>
      restProps.customWidth ? restProps.customWidth : 'calc(40% - 1rem)',
  },
}))
export const SearchBox = ({ currentRefinement, refine, ...restProps }) => {
  const classes = useStyles(restProps)
  return (
    <FormControl
      variant='standard'
      className={classes.formControl}
      data-testid='custom-searchbox-id'
    >
      <TextField
        type='text'
        variant='outlined'
        margin='normal'
        onChange={(event) => refine(event.currentTarget.value)}
        value={currentRefinement}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  )
}

SearchBox.propTypes = {
  currentRefinement: PropTypes.string,
  refine: PropTypes.func,
}

const CustomSearchBox = connectSearchBox(SearchBox)
export default CustomSearchBox
