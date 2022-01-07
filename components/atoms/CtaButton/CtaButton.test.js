import '@testing-library/jest-dom/extend-expect'
import CtaButton from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

describe('CtaButton component:', () => {
  test('CtaButton rendered successfully', () => {
    render(<CtaButton label='CtaButton Label' />)

    expect(screen.getByText('CtaButton Label')).toBeInTheDocument()
  })
})
