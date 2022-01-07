import '@testing-library/jest-dom/extend-expect'
import TOCNav from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

const toc_items = [
  { id: 'item_1', label: 'item 1' },
  { id: 'item_2', label: 'item 2' },
  { id: 'item_3', label: 'item 3' },
]

describe('TOCNav component:', () => {
  test('TOCNav rendered successfully', () => {
    render(<TOCNav toc_items={toc_items} />)

    expect(screen.getByText('item 2')).toBeInTheDocument()
  })
})
