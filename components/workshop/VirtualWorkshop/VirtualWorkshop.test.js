import '@testing-library/jest-dom/extend-expect'
import VirtualWorkshop from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

const workshopData = {
  title: 'Principles and Practices for Effective Online and Blended Learning',
  roles: ['coach', 'senior editor'],
  grades: ['secondary', 'Elementary School'],
  topics: ['leadership', 'interactive learning'],
  description: 'This is the description',
  author: 'This is the about the author',
}
describe('VirtualWorkshop component: ', () => {
  test('title rendered successfully', () => {
    render(
      <VirtualWorkshop
        title={workshopData.title}
        roles={workshopData.roles}
        grades={workshopData.grades}
        topics={workshopData.topics}
        author={workshopData.author}
        description={workshopData.description}
      />
    )
    expect(screen.getByText(workshopData.title)).toBeInTheDocument()
  })

  test('Topics Covered rendered successfully', () => {
    render(
      <VirtualWorkshop
        title={workshopData.title}
        roles={workshopData.roles}
        grades={workshopData.grades}
        topics={workshopData.topics}
        author={workshopData.author}
        description={workshopData.description}
      />
    )
    expect(screen.getByTestId('topicsCovered')).toHaveTextContent(
      workshopData.topics[0]
    )
    expect(screen.getByTestId('topicsCovered')).toHaveTextContent(
      workshopData.topics[1]
    )
  })
})
