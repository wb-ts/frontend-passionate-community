import React from 'react'
// import { connectStateResults } from 'react-instantsearch/connectors'

import { connectStateResults } from 'react-instantsearch-dom'
import { ResultsComponent } from '../ResultsComponent'
/**
 * The StateResults widget provides a way to access the searchState and the searchResults of InstantSearch.
 * https://www.algolia.com/doc/api-reference/widgets/state-results/react/#about-this-widget
 * Used React Material UI library and connectStateResults component to customize the UI.
 *
 * @param {Boolean} isInfinite if True, display an infinite list of results with a “Load more” button, else display with Pagination
 * @returns
 */
const StateResults = ({
  searchState,
  searchResults,
  ItemCard,
  customWidth,
  isInfinite,
}) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  const nbHits = searchResults && searchResults.nbHits

  return searchResults && searchResults.nbHits !== 0 ? (
    <ResultsComponent
      customWidth={customWidth}
      ItemCard={ItemCard}
      isInfinite={isInfinite}
    />
  ) : (
    <div>
      No results found for <strong>{searchState.query}</strong>.
    </div>
  )
}

const CustomStateResults = connectStateResults(StateResults)

export default CustomStateResults
