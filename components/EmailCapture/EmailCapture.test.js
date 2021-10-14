import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import EmailCapture from './EmailCapture'

const testData = {
  title: 'Test title text',
  description: 'Test description text',
}

describe('EmailCapture component:', () => {
  test('Title & description rendered successfully', () => {
    render(
      <EmailCapture
        title={testData.title}
        description={testData.description}
      />
    )
    expect(screen.getByText(testData.title)).toBeInTheDocument()
    expect(screen.getByText(testData.description)).toBeInTheDocument()
  })
})