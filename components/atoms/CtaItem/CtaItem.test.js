import '@testing-library/jest-dom/extend-expect'
import CtaItem from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

describe('CtaItem component:', () => {
  test('CtaItem rendered successfully', () => {
    render(<CtaItem tagline='CtaItem TagLine' />)

    expect(screen.getByText('CtaItem TagLine')).toBeInTheDocument()
  })
})
