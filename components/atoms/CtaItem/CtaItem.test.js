/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import CtaItem from '@/components/atoms/CtaItem'

describe('CtaItem component:', () => {
  test('CtaItem rendered successfully', () => {
    render(<CtaItem tagline='CtaItem TagLine' />)

    expect(screen.getByText('CtaItem TagLine')).toBeInTheDocument()
  })
})
