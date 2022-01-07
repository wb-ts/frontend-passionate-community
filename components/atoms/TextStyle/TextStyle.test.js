import '@testing-library/jest-dom/extend-expect'
import TextStyle from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

describe('TextStyle component:', () => {
  test('TextStyle rendered successfully', () => {
    render(
      <TextStyle color='black' variant='tinyStrikeThrough' component='h2'>
        TextStyle Text
      </TextStyle>
    )

    expect(screen.getByText('TextStyle Text')).toBeInTheDocument()
  })
})
