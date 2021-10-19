/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import ViewAllCTA from '@/components/atoms/ViewAllCTA'

describe('ViewAllCTA component:', () => {
  test('ViewAllCTA rendered successfully', () => {
    render(<ViewAllCTA label='ViewAllCTA Label' href='/all' lg />)

    expect(screen.getByText('ViewAllCTA Label')).toBeInTheDocument()
  })
})
