import { makeStyles } from '@mui/styles'
import { FormControl, Select, MenuItem, Typography } from '@mui/material'
import { connectRefinementList } from 'react-instantsearch-dom'
import PropTypes from 'prop-types'

/**
 * With this widget, the user can filter the dataset based on facet values.
 * Multiple options can be selected.
 * https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/
 * Used React Material UI library and connectRefinementList component to customize the UI.
 * https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/#connector
 */
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: (restProps) =>
      restProps.customWidth ? restProps.customWidth : '250px',
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export const DropDownSelect = ({
  items,
  refine,
  currentRefinement,
  ...restProps
}) => {
  const classes = useStyles(restProps)
  const handleChangeTopics = (event) => {
    refine(event.target.value)
  }

  return (
    <FormControl variant='outlined' className={classes.formControl}>
      <Select
        labelId='demo-multiple-checkbox-label'
        data-testid='demo-multiple-checkbox-id'
        id='demo-multiple-checkbox'
        multiple
        value={currentRefinement || ''}
        onChange={handleChangeTopics}
        disableUnderline
        displayEmpty
        renderValue={(selected) => selected.join(', ') || 'All'}
        MenuProps={MenuProps}
      >
        {items
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((item) => (
            <MenuItem key={item.label} value={item.label}>
              <Typography variant='buttonSmall'>{item.label}</Typography>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

DropDownSelect.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      count: PropTypes.number,
      isRefined: PropTypes.bool,
      value: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  currentRefinement: PropTypes.arrayOf(PropTypes.string),
  refine: PropTypes.func,
}
const CustomDropDownSelect = connectRefinementList(DropDownSelect)
export default CustomDropDownSelect
