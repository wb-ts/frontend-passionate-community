import '@testing-library/jest-dom/extend-expect'
import NoAnnotations from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

describe('NoAnnotations component:', () => {
  test('NoAnnotations rendered successfully', () => {
    render(<NoAnnotations message='NoAnnotations Message Text' />)

    expect(screen.getByText('NoAnnotations Message Text')).toBeInTheDocument()
  })
})
