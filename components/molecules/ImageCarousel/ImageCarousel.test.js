/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from 'test-utils'

import ImageCarousel from '@/components/molecules/ImageCarousel'

describe('Custom ImageCarousel component:', () => {
  test('Make sure items in the component are rendered', () => {
    render(<ImageCarousel images={['/images/image404.png']} />)

    expect(screen.getByText('1 of 1')).toBeInTheDocument()
    expect(screen.getByLabelText('slide left')).toBeInTheDocument()
    expect(screen.getByLabelText('slide right')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('slide right'))
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/images/image404.png'
    )
  })
})
