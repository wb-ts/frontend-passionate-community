import '@testing-library/jest-dom/extend-expect'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import DaysAgo from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

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
