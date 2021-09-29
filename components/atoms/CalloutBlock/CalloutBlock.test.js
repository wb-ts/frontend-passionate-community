/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import CalloutBlock from '@/components/atoms/CalloutBlock'

describe('Callout Block component:', () => {
  test('Callout Block rendered successfully', () => {
    render(<CalloutBlock sidelabel='TIP' background='red' />)

    expect(screen.getByText('TIP')).toBeInTheDocument()
  })
})
