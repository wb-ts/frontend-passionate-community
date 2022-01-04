/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DropDownSelect } from './CustomDropDownSelect'

const items = [
  {
    label: 'Classroom Management',
    value: ['Equity', 'Classroom Management'],
    count: 2,
    isRefined: false,
  },
  {
    label: 'Engagement',
    value: ['Equity', 'Engagement'],
    count: 7,
    isRefined: false,
  },
  {
    label: 'Equity',
    value: ['Professional Learning'],
    count: 5,
    isRefined: true,
  },
]
const currentRefinement = ['Equity']
describe('DropDownSelect component: ', () => {
  test('Component rendered successfully', () => {
    render(
      <DropDownSelect
        items={items}
        currentRefinement={currentRefinement}
        refine={() => null}
      />
    )

    expect(screen.getByTestId('demo-multiple-checkbox-id')).toBeInTheDocument()
  })

  test('should render correct multiple select value when the menu opens', () => {
    render(
      <DropDownSelect
        items={items}
        currentRefinement={currentRefinement}
        refine={() => null}
      />
    )
    const trigger = screen.getByRole('button')
    fireEvent.mouseDown(trigger)
    const options = screen.getAllByRole('option')
    expect(options[0]).not.toHaveAttribute('aria-selected')
    expect(options[1]).not.toHaveAttribute('aria-selected')
    expect(options[2]).toHaveAttribute('aria-selected', 'true')
  })

  test('should call refine function when the selected items changes', () => {
    const refine = jest.fn()
    render(
      <DropDownSelect
        items={items}
        currentRefinement={currentRefinement}
        refine={refine}
      />
    )
    const trigger = screen.getByRole('button')
    fireEvent.mouseDown(trigger)
    const options = screen.getAllByRole('option')
    expect(refine).toHaveBeenCalledTimes(0)
    act(() => {
      fireEvent.click(options[0])
    })
    expect(refine).toHaveBeenCalledTimes(1)
  })
})
