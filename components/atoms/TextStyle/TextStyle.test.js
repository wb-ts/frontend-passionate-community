/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import TextStyle from '@/components/atoms/TextStyle'

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
