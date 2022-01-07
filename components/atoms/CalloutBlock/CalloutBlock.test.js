import '@testing-library/jest-dom/extend-expect'
import CalloutBlock from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

describe('Callout Block component:', () => {
  test('Callout Block rendered successfully', () => {
    render(<CalloutBlock sidelabel='TIP' background='red' />)

    expect(screen.getByText('TIP')).toBeInTheDocument()
  })
})
