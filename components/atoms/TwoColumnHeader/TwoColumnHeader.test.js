import '@testing-library/jest-dom/extend-expect'
import TwoColumnHeader from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

describe('TwoColumnHeader component:', () => {
  test('TwoColumnHeader rendered successfully', () => {
    render(<TwoColumnHeader title={'TwoColumnHeader Title'} />)

    expect(screen.getByText('TwoColumnHeader Title')).toBeInTheDocument()
  })
})
