/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import NoAnnotations from '@/components/atoms/NoAnnotations'

describe('NoAnnotations component:', () => {
  test('NoAnnotations rendered successfully', () => {
    render(<NoAnnotations message='NoAnnotations Message Text' />)

    expect(screen.getByText('NoAnnotations Message Text')).toBeInTheDocument()
  })
})
