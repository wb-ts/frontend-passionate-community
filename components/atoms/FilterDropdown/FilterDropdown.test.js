/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import FilterDropdown from '@/components/atoms/FilterDropdown'

const items = [
  { value: 'item 1', label: 'item 1' },
  'item 2',
  'item 3',
  { value: 'item 4', label: 'item 4' },
]

describe('FilterDropdown component:', () => {
  test('FilterDropdown rendered successfully', () => {
    render(<FilterDropdown items={items} defaultValue='item 1' />)

    expect(screen.getByText('item 1')).toBeInTheDocument()
  })
})
