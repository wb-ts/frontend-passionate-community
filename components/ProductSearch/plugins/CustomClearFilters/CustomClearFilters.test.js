/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ClearFilters } from './CustomClearFilters'
describe('CustomClearFilters component: ', () => {
  test('Component rendered successfully', () => {
    render(
      <ClearFilters
        items={[{ filter: 1 }]}
        keepFilters={['filter']}
        handleSearchRefine={() => null}
        refine={() => null}
      />
    )
    expect(screen.getByText('Clear Filters')).toBeInTheDocument()
  })

  test('when there is no filters to clear', () => {
    const refine = jest.fn()
    const handleSearchRefine = jest.fn()
    render(
      <ClearFilters
        items={[{ attribute: 'filter', index: 'workshop_stage' }]}
        keepFilters={['filter']}
        handleSearchRefine={handleSearchRefine}
        refine={refine}
      />
    )
    expect(refine).toHaveBeenCalledTimes(0)
    expect(handleSearchRefine).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByText('Clear Filters'))
    expect(refine).toHaveBeenCalledTimes(0)
    expect(handleSearchRefine).toHaveBeenCalledTimes(1)
  })

  test('when there are filters to clear', () => {
    const refine = jest.fn()
    const handleSearchRefine = jest.fn()
    render(
      <ClearFilters
        items={[{ attribute: 'filter', index: 'workshop_stage' }]}
        keepFilters={[]}
        handleSearchRefine={handleSearchRefine}
        refine={refine}
      />
    )
    expect(refine).toHaveBeenCalledTimes(0)
    expect(handleSearchRefine).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByText(/Clear Filters/i))
    expect(refine).toHaveBeenCalledTimes(1)
    expect(handleSearchRefine).toHaveBeenCalledTimes(1)
  })
})
