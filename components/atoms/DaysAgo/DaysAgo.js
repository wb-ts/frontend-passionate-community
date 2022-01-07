import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import PropTypes from 'prop-types'
import TextStyle from '../TextStyle'

export default function DaysAgo({ input, ...props }) {
  if (!input) return ''
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')

  return (
    <TextStyle variant={props.variant ? props.variant : 'overline'}>
      {Date.parse(input)
        ? timeAgo.format(Date.parse(input))
        : 'Invalid time format'}
    </TextStyle>
  )
}

DaysAgo.propTypes = {
  input: PropTypes.string,
  variant: PropTypes.string,
}
