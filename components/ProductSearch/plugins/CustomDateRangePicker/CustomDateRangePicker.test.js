/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateRangeInput } from './CustomDateRangePicker'

describe('DateRangePicker component: ', () => {
  test('Component rendered without crashing', () => {
    render(
      <DateRangeInput
        currentRefinement={{
          min: new Date('11/10/2020').getTime() / 1000,
          max: new Date('12/12/2021').getTime() / 1000,
        }}
        refine={() => null}
      />
    )

    expect(
      screen.getByDisplayValue('11/10/2020 - 12/12/2021')
    ).toBeInTheDocument()
    expect(screen.getByTestId('date-range-picker')).toBeInTheDocument()
  })

  //   test('calling change function', () => {
  //     const refine = jest.fn()
  //     render(
  //       <DateRangeInput
  //         currentRefinement={{
  //           min: new Date('11/10/2020').getTime() / 1000,
  //           max: new Date('12/12/2021').getTime() / 1000,
  //         }}
  //         refine={refine}
  //       />
  //     )

  //     expect(screen.getByTestId('date-range-picker')).toBeInTheDocument()
  //     expect(refine).toHaveBeenCalledTimes(0)
  //     userEvent.type(screen.getByPlaceholderText('mm/dd/yyyy'), 'aaa')
  //     expect(screen.getByPlaceholderText('mm/dd/yyyy')).toHaveValue(
  //       '11/10/2020 - 12/13/2021'
  //     )
  //     // fireEvent.click(screen.getByTestId('date-range-picker'))
  //     expect(refine).toHaveBeenCalledTimes(1)
  //   })
})
