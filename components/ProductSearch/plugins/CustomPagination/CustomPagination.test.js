/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyPagination } from './CustomPagination'

describe('Pagination component: ', () => {
  test('Component rendered successfully', () => {
    render(
      <MyPagination currentRefinement={1} nbPages={3} refine={() => null} />
    )

    expect(screen.getByTestId('custom-pagination-id')).toBeInTheDocument()
  })

  test('should call refine function when a different page is clicked', () => {
    const refine = jest.fn()
    render(<MyPagination currentRefinement={1} nbPages={3} refine={refine} />)
    expect(refine).toHaveBeenCalledTimes(0)
    const [, , page2] = screen.getAllByRole('button')
    userEvent.click(page2)
    expect(refine).toHaveBeenCalledTimes(1)
  })
})
