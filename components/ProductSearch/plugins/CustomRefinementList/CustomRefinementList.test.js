/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RefinementList } from './CustomRefinementList'

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
describe('RefinementList component: ', () => {
  test('Component rendered successfully', () => {
    render(
      <RefinementList
        items={items}
        currentRefinement={currentRefinement}
        refine={() => null}
        searchable={false}
      />
    )

    expect(screen.getByTestId('custom-refinement-list-id')).toBeInTheDocument()
  })

  test('should render correct multiple select value', () => {
    render(<RefinementList items={items} refine={() => null} />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
    expect(checkboxes[2]).toBeChecked()
  })

  test('should call refine function when the selected items changes', () => {
    const refine = jest.fn()
    render(
      <RefinementList
        items={items}
        currentRefinement={currentRefinement}
        refine={refine}
      />
    )
    const menuitems = screen.getAllByRole('menuitem')
    expect(refine).toHaveBeenCalledTimes(0)
    fireEvent.click(menuitems[0])
    expect(refine).toHaveBeenCalledTimes(1)
  })
})
