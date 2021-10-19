/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import DaysAgo from '@/components/atoms/DaysAgo'

const input = '2021-10-8'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')
const timeAgoStr = timeAgo.format(Date.parse(input))

describe('DaysAgo component:', () => {
  test('DaysAgo rendered successfully', () => {
    render(<DaysAgo input='2021-10-8' />)

    expect(screen.getByText(timeAgoStr)).toBeInTheDocument()
  })

  test('Invalid DaysAgo Input', () => {
    render(<DaysAgo input='ASCD' />)

    expect(screen.getByText('Invalid time format')).toBeInTheDocument()
  })
})
