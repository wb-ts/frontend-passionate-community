/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import CtaButton from '@/components/atoms/CtaButton'

describe('CtaButton component:', () => {
  test('CtaButton rendered successfully', () => {
    render(<CtaButton label='CtaButton Label' />)

    expect(screen.getByText('CtaButton Label')).toBeInTheDocument()
  })
})
