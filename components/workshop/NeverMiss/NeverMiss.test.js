import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import NeverMiss from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

describe('NeverMiss component:', () => {
  test('Never Miss a new workshop rendered successfully', () => {
    render(<NeverMiss />)
    expect(screen.getByText('Never Miss a new workshop')).toBeInTheDocument()
  })

  test('render email input', () => {
    render(<NeverMiss />)
    const inputEl = screen.getByTestId('email-input')
    expect(inputEl).toBeInTheDocument()
  })

  test('pass email to test email input field', () => {
    render(<NeverMiss />)
    const inputEl = screen.getByPlaceholderText('Your email address')
    userEvent.type(inputEl, 'test@mail.com')
    expect(screen.getByPlaceholderText('Your email address')).toHaveValue(
      'test@mail.com'
    )
  })
})
