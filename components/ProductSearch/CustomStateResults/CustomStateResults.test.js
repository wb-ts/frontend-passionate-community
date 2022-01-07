/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import userEvent from '@testing-library/user-event'
import { StateResults } from './CustomStateResults'
import WorkshopListItem from '@/components/molecules/Workshop/WorkshopListItem'

const searchState = {
  page: 1,
  query: '',
}

const searchResults = {
  nbHits: 3,
}
describe('StateResults component: ', () => {
  //   test('Results found', () => {
  //     render(
  //       <StateResults
  //         searchState={searchState}
  //         searchResults={searchResults}
  //         isInfinite={true}
  //         ItemCard={WorkshopListItem}
  //         isSearchStalled={false}
  //         customWidth={4}
  //       />
  //     )
  //     expect(screen.getByTestId('no-results-id')).not.toBeInTheDocument()
  //     expect(screen.getByTestId('circularprogress-id')).not.toBeInTheDocument()
  //   })

  test('No results found', () => {
    render(
      <StateResults
        searchState={searchState}
        searchResults={null}
        isInfinite={true}
        ItemCard={WorkshopListItem}
        isSearchStalled={false}
        customWidth={4}
      />
    )
    expect(screen.getByTestId('no-results-id')).toBeInTheDocument()
  })

  test('Displaying circular loading', () => {
    render(
      <StateResults
        searchState={searchState}
        searchResults={null}
        isInfinite={true}
        ItemCard={WorkshopListItem}
        isSearchStalled={true}
        customWidth={4}
      />
    )
    expect(screen.getByTestId('circularprogress-id')).toBeInTheDocument()
  })
})
