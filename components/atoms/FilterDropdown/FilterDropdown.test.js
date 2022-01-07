import '@testing-library/jest-dom/extend-expect'
import FilterDropdown from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

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
