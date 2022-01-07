import React, { useState, useEffect } from 'react'
import { FormControl, Select, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: (props) =>
      props.marginLeft ? props.marginLeft : theme.spacing(1),
  },
  select: {
    height: (props) => (props.height ? props.height : 'inherit'),
    width: (props) => (props.width ? props.width : 'inherit'),
    padding: (props) => (props.width && props.height ? '0' : 'initial'),
    overflow: 'hidden',
  },
}))

export default function FilterDropdown({
  items,
  defaultValue,
  action,
  ...props
}) {
  const classes = useStyles(props)
  const [value, setValue] = useState(
    typeof defaultValue == 'object' ? defaultValue.value : defaultValue
  )

  const handleChange = (event) => {
    setValue(event.target.value || '')
    action(event.target.value)
  }

  const _renderItems = (items) => {
    return items.map((item, key) => (
      <MenuItem key={key} value={typeof item == 'object' ? item.value : item}>
        {typeof item == 'object' ? item.label : item}
      </MenuItem>
    ))
  }

  return (
    <FormControl
      variant='outlined'
      fullWidth={props.width ? false : true}
      className={classes.formControl}
    >
      <Select
        labelId='select-category-label'
        id='select-category'
        value={value}
        onChange={handleChange}
        className={classes.select}
      >
        {items && _renderItems(items)}
      </Select>
    </FormControl>
  )
}

FilterDropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
      PropTypes.string,
      PropTypes.number,
    ])
  ),
  defaultValue: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.string,
    }),
    PropTypes.string,
    PropTypes.number,
  ]),
  action: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
