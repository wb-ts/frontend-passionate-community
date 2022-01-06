import React, { useEffect } from 'react'
import { connectRange } from 'react-instantsearch-dom'
import { DateRangePicker, LocalizationProvider } from '@mui/lab'
import { OutlinedInput } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DateFnsUtils from '@date-io/date-fns'
import PropTypes from 'prop-types'

const dateFns = new DateFnsUtils()

/**
 * It allows a user to select a date range using DateRangePicker of Material UI.
 * Used connectRange component to use React Material UI library.
 * https://www.algolia.com/doc/api-reference/widgets/range-input/react/#connector
 * @param {*} param0
 * @returns
 */
export const DateRangeInput = ({ currentRefinement, min, max, refine }) => {
  useEffect(() => {
    if (currentRefinement.min <= min || currentRefinement.max >= max) {
      refine({
        ...currentRefinement,
        min: Math.floor(new Date().getTime() / 1000),
        max: Math.floor(dateFns.addMonths(new Date(), 1).getTime() / 1000),
      })
    }
  }, [currentRefinement])
  const handleChange = (newValue) => {
    const updatedMin = Math.floor(new Date(newValue[0]).getTime() / 1000)
    const updatedMax = Math.floor(new Date(newValue[1]).getTime() / 1000)
    refine({
      ...currentRefinement,
      min: updatedMin ? updatedMin : min,
      max: updatedMax ? updatedMax : max,
    })
  }
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <DateRangePicker
        keyboard
        calendars={2}
        value={[
          new Date(currentRefinement.min * 1000),
          new Date(currentRefinement.max * 1000),
        ]}
        inputFormat='MM/dd/yyyy'
        onChange={(newValue) => handleChange(newValue)}
        renderInput={({ inputProps, ...startProps }, endProps) => {
          const startValue = inputProps.value
          delete inputProps.value
          return (
            <OutlinedInput
              {...startProps}
              data-testid='date-range-picker'
              autoWidth
              inputProps={inputProps}
              placeholder='Select Date Range'
              notched={false}
              label='Date Range'
              type='text'
              value={`${startValue} - ${endProps?.inputProps?.value}`}
              endAdornment={<CalendarTodayIcon />}
            />
          )
        }}
      />
    </LocalizationProvider>
  )
}

DateRangeInput.propTypes = {
  currentRefinement: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  min: PropTypes.number,
  max: PropTypes.number,
  refine: PropTypes.func,
}
const CustomDateRangePicker = connectRange(DateRangeInput)

export default CustomDateRangePicker
