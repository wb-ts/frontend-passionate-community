import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import VirtualWorkshop from './VirtualWorkshop'

const workshopData = {
  title: 'Principles and Practices for Effective Online and Blended Learning',
  audience: ['secondary', 'curriculium developers'],
  topics: ['leadership', 'interactive learning'],
}
describe('VirtualWorkshop component: ', () => {
  test('title rendered successfully', () => {
    render(
      <VirtualWorkshop
        title={workshopData.title}
        audience={workshopData.audience}
        topics={workshopData.topics}
      />
    )
    expect(screen.getByText(workshopData.title)).toBeInTheDocument()
  })

  test('audience rendered successfully', () => {})
})
