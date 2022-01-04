/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import userEvent from '@testing-library/user-event'
import workshopHits from '../../../../__mocks__/workshopHitsMock'
import WorkshopListItem from '@/components/molecules/Workshop/WorkshopListItem'

describe('WorkshopListItem component: ', () => {
  test('Component rendered successfully', () => {
    render(
      <WorkshopListItem cardData={workshopHits[0]} useMemberBookPrice={false} />
    )
    expect(screen.getByText('Author Workshop')).toBeInTheDocument()
  })
})
