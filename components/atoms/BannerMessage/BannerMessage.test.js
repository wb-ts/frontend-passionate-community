/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import BannerMessage from '@/components/atoms/BannerMessage'

describe('BannerMessage component:', () => {
  test('BannerMessage rendered successfully', () => {
    render(<BannerMessage variant='special'>BannerMessage Text</BannerMessage>)

    expect(screen.getByText('BannerMessage Text')).toBeInTheDocument()
  })
})
