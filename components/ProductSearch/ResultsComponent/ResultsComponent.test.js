/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import userEvent from '@testing-library/user-event'
import { ResultHits } from './ResultsComponent'
import workshopHits from '../../../__mocks__/workshopHitsMock'
import WorkshopListItem from '@/components/molecules/Workshop/WorkshopListItem'

describe('ResultHits component: ', () => {
  test('Component rendered successfully', () => {
    render(
      <ResultHits
        hits={workshopHits}
        isInfinite={true}
        hasMore={true}
        refineNext={() => null}
        ItemCard={WorkshopListItem}
        customWidth={4}
      />
    )
    expect(screen.getByText('View More')).toBeInTheDocument()
  })
})
