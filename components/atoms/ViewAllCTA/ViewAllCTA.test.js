import '@testing-library/jest-dom/extend-expect'
import ViewAllCTA from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

describe('ViewAllCTA component:', () => {
  test('ViewAllCTA rendered successfully', () => {
    render(<ViewAllCTA label='ViewAllCTA Label' href='/all' lg />)

    expect(screen.getByText('ViewAllCTA Label')).toBeInTheDocument()
  })
})
