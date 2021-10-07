import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import NeverMiss from './NeverMiss'

describe('NeverMiss component:', () => {
  test('Never Miss a new workshop rendered successfully', () => {
    render(<NeverMiss />)
    expect(screen.getByText('Never Miss a new workshop')).toBeInTheDocument()
  })
})
