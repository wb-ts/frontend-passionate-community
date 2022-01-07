import '@testing-library/jest-dom/extend-expect'
import EmailCapture from '.'
import { render, screen } from '../../__test-utils__/test-utils'

const testData = {
  title: 'Test title text',
  description: 'Test description text',
}

describe('EmailCapture component:', () => {
  test('Title & description rendered successfully', () => {
    render(
      <EmailCapture title={testData.title} description={testData.description} />
    )
    expect(screen.getByText(testData.title)).toBeInTheDocument()
    expect(screen.getByText(testData.description)).toBeInTheDocument()
  })
})
