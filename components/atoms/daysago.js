import React from 'react'
import TextStyle from '@/components/atoms/textstyle'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export default function DaysAgo({ input, ...props }) {
  if (!input) return ''
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')

  return (
    <TextStyle variant={props.variant ? props.variant : 'overline'}>
      {timeAgo.format(Date.parse(input))}
    </TextStyle>
  )
}
