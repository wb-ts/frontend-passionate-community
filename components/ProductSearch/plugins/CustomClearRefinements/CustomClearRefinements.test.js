/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ClearRefinements } from './CustomClearRefinements'

describe('ClearRefinements component: ', () => {
  test('Component rendered successfully', () => {
    render(
      <ClearRefinements
        items={[{ filter: 1 }]}
        keepFilters={['filter']}
        refine={() => null}
      />
    )
    expect(screen.getByText('Clear Filters')).toBeInTheDocument()
  })

  test('when there is no filters to clear', () => {
    const refine = jest.fn()
    render(
      <ClearRefinements
        items={[{ attribute: 'filter', index: 'workshop_stage' }]}
        keepFilters={['filter']}
        refine={refine}
      />
    )
    expect(refine).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByText('Clear Filters'))
    expect(refine).toHaveBeenCalledTimes(0)
  })

  test('when there are filters to clear', () => {
    const refine = jest.fn()
    render(
      <ClearRefinements
        items={[{ attribute: 'filter', index: 'workshop_stage' }]}
        keepFilters={[]}
        refine={refine}
      />
    )
    expect(refine).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByText(/Clear Filters/i))
    expect(refine).toHaveBeenCalledTimes(1)
  })
})
