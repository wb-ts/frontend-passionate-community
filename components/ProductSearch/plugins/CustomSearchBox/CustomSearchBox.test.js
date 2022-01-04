/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBox } from './CustomSearchBox'

describe('SearchBox component: ', () => {
  test('Component rendered successfully', () => {
    render(
      <SearchBox currentRefinement={'currentRefinement'} refine={() => null} />
    )

    expect(screen.getByTestId('custom-searchbox-id')).toBeInTheDocument()
  })

  test('should call refine function when the user types', () => {
    const refine = jest.fn()
    render(<SearchBox currentRefinement={''} refine={refine} />)
    expect(refine).toHaveBeenCalledTimes(0)
    userEvent.type(screen.getByRole('textbox'), 'test')
    expect(refine).toHaveBeenCalledTimes(4)
  })
})
