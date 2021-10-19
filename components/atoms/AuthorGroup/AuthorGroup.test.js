/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import AuthorGroup from '@/components/atoms/AuthorGroup'

describe('AuthorGroup component:', () => {
  test('AuthorGroup rendered successfully', () => {
    render(
      <AuthorGroup label='Custom Link Label Inside AuthorGroup Component' />
    )

    expect(
      screen.getByText('Custom Link Label Inside AuthorGroup Component')
    ).toBeInTheDocument()
  })
})
