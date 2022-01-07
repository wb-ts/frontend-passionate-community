import '@testing-library/jest-dom/extend-expect'
import BannerMessage from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

describe('BannerMessage component:', () => {
  test('BannerMessage rendered successfully', () => {
    render(<BannerMessage variant='special'>BannerMessage Text</BannerMessage>)

    expect(screen.getByText('BannerMessage Text')).toBeInTheDocument()
  })
})
