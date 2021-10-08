import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import VirtualWorkshop from './VirtualWorkshop'

const workshopData = {
  title: 'Principles and Practices for Effective Online and Blended Learning',
  audience: ['secondary', 'curriculium developers'],
  topics: ['leadership', 'interactive learning'],
  description: 'This is the description',
  author: 'This is the about the author',
}
describe('VirtualWorkshop component: ', () => {
  test('title rendered successfully', () => {
    render(
      <VirtualWorkshop
        title={workshopData.title}
        audience={workshopData.audience}
        topics={workshopData.topics}
        author={workshopData.author}
        description={workshopData.description}
      />
    )
    expect(screen.getByText(workshopData.title)).toBeInTheDocument()
  })

  test('audience rendered successfully', () => {
    render(
      <VirtualWorkshop
        title={workshopData.title}
        audience={workshopData.audience}
        topics={workshopData.topics}
        author={workshopData.author}
        description={workshopData.description}
      />
    )
    expect(screen.getByTestId('audience')).toHaveTextContent(
      workshopData.audience[0]
    )
    expect(screen.getByTestId('audience')).toHaveTextContent(
      workshopData.audience[1]
    )
  })

  test('topics rendered successfully', () => {
    render(
      <VirtualWorkshop
        title={workshopData.title}
        audience={workshopData.audience}
        topics={workshopData.topics}
        author={workshopData.author}
        description={workshopData.description}
      />
    )
    expect(screen.getByTestId('topics')).toHaveTextContent(
      workshopData.topics[0]
    )
    expect(screen.getByTestId('topics')).toHaveTextContent(
      workshopData.topics[1]
    )
  })
})
