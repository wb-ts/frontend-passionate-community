/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import CustomLink from '@/components/atoms/CustomLink'

describe('Custom Link component:', () => {
  test('Medium Link rendered successfully', () => {
    render(
      <CustomLink href='./books' color='black' size='medium'>
        Books Link
      </CustomLink>
    )

    expect(screen.getByText('Books Link')).toBeInTheDocument()
  })
})
