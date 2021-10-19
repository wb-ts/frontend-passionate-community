/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import TwoColumnHeader from '@/components/atoms/TwoColumnHeader'

describe('TwoColumnHeader component:', () => {
  test('TwoColumnHeader rendered successfully', () => {
    render(<TwoColumnHeader title={'TwoColumnHeader Title'} />)

    expect(screen.getByText('TwoColumnHeader Title')).toBeInTheDocument()
  })
})
