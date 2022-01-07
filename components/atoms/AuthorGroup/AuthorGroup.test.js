import '@testing-library/jest-dom/extend-expect'
import AuthorGroup from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

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
