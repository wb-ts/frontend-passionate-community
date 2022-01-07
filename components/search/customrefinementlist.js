import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import TextField from '@mui/material/TextField'
import { connectRefinementList } from 'react-instantsearch-dom'

const CustomPaper = (props) => {
  return <Paper elevation={0} {...props} />
}

const RefinementList = ({ items, refine }) => (
  <div className={`ais-RefinementList`}>
    <Autocomplete
      multiple={true}
      options={items}
      noOptionsText='No results'
      open={true}
      disableClearable
      freeSolo
      renderTags={() => null}
      disableCloseOnSelect
      PaperComponent={CustomPaper}
      PopperComponent={({ style, ...props }) => (
        <Popper {...props} style={{ ...style, height: 0 }} />
      )}
      disablePortal={true}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <label className={`ais-RefinementList-label`}>
          <input
            type='checkbox'
            checked={option.isRefined}
            className={`ais-RefinementList-checkbox`}
            onChange={() => {
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
