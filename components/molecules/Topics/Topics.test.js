import '@testing-library/jest-dom/extend-expect'
import Topics from '.'
import { render, fireEvent, screen } from '../../../__test-utils__/test-utils'

describe('Topics component:', () => {
  test('Topics rendered successfully', () => {
    render(
      <Topics
        title='Topics that can be found on ASCD'
        topics={['assessment', 'classroom management', 'engagement']}
        center={true}
        maxWidth={'100%'}
        background={'transparent'}
      />
    )

    expect(
      screen.getByText('Topics that can be found on ASCD')
    ).toBeInTheDocument()
  })

  test('Topics has correct style ', () => {
    render(
      <Topics
        title='Topics that can be found on ASCD'
        topics={['assessment', 'classroom management', 'engagement']}
        center={true}
        maxWidth={'100%'}
        background={'transparent'}
      />
    )

    expect(screen.getByTestId('topics')).toHaveStyle({
      maxWidth: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
    })
  })
})
