import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import {
  Checkbox,
  FormControl,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Highlight, connectRefinementList } from 'react-instantsearch-dom'
import PropTypes from 'prop-types'
/**
 * With this widget, the user can filter the dataset based on facet values.
 * https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/
 * Used React Material UI library and connectRefinementList component to customize the UI.
 * https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/#connector
 */
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '8px',
    width: '500px',
  },
}))

export const RefinementList = ({
  items,
  isFromSearch,
  refine,
  searchForItems,
  searchable,
}) => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const handleChange = (event) => {
    setValue(event.currentTarget.value)
    searchForItems(event.currentTarget.value)
  }
  const handleClick = (event, item) => {
    event.preventDefault()
    refine(item.value)
  }
  return (
    <FormControl variant='standard' data-testid='custom-refinement-list-id'>
      {searchable && (
        <TextField
          type='text'
          variant='outlined'
          margin='normal'
          onChange={handleChange}
          value={value}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            // endAdornment: value && (
            //   <IconButton
            //     aria-label='toggle password visibility'
            //     onClick={() => setValue('')}>
            //     <CancelIcon />
            //   </IconButton>
            // )
          }}
        />
      )}

      {items.map((item) => (
        <MenuItem
          key={item.label}
          value={item.label}
          onClick={(event) => handleClick(event, item)}
        >
          <Checkbox checked={item.isRefined} />
          {isFromSearch ? (
            <Highlight attribute='label' hit={item} />
          ) : (
            item.label
          )}{' '}
          ({item.count})
        </MenuItem>
      ))}
    </FormControl>
  )
}

RefinementList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      count: PropTypes.number,
      isRefined: PropTypes.bool,
      value: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  refine: PropTypes.func,
  searchForItems: PropTypes.func,
  isFromSearch: PropTypes.bool,
  searchable: PropTypes.bool,
}

const CustomRefinementList = connectRefinementList(RefinementList)
export default CustomRefinementList
