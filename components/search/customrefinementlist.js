import React from 'react'
import { connectRefinementList } from 'react-instantsearch-dom'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Paper from '@material-ui/core/Paper'

const CustomPaper = (props) => {
  return <Paper elevation={0} {...props} />
}

const RefinementList = ({ items, refine }) => (
  <div className={`ais-RefinementList`}>
    <Autocomplete
      multiple
      options={items}
      noOptionsText='No results'
      open={true}
      disableClearable
      freeSolo
      renderTags={() => null}
      disableCloseOnSelect
      PaperComponent={CustomPaper}
      disablePortal={true}
      getOptionLabel={(option) => option.label}
      renderOption={(option, { selected }) => (
        <label className={`ais-RefinementList-label`}>
          <input
            type='checkbox'
            checked={option.isRefined}
            className={`ais-RefinementList-checkbox`}
            onClick={() => {
              refine(option.value)
            }}
          />
          <span className={`ais-RefinementList-labelText`}>{option.label}</span>
          <span className={`ais-RefinementList-count`}>{option.count}</span>
        </label>
      )}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} placeholder='Search' size='small' />
      )}
    />
  </div>
)

export const CustomRefinementList = connectRefinementList(RefinementList)
