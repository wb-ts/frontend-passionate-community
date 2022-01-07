import '@testing-library/jest-dom/extend-expect'
import TopicTag from '.'
import { render, fireEvent, screen } from '../../../__test-utils__/test-utils'

describe('TopicTag component:', () => {
  test('TopicTag variant=special rendered successfully', () => {
    render(
      <TopicTag
        label='leadership'
        variant='special'
        color='red'
        textTransform='uppercase'
        premium
      />
    )

    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/images/premium.png')
    expect(img).toHaveAttribute('alt', 'premium resources logo')

    expect(screen.getByText('leadership')).toBeInTheDocument()
  })

  test('TopicTag variant=special have correct class name', () => {
    render(
      <TopicTag
        label='leadership'
        variant='special'
        color='red'
        textTransform='uppercase'
        backgroundColor='white'
        premium
      />
    )

    let classes = screen.getByTestId('specialTag').getAttribute('class')
    classes = classes.split(' ')[1].split('-')
    expect(classes.includes('specialTag'))
  })

  test('TopicTag variant=special have correct style', () => {
    const topicTag = render(
      <TopicTag
        label='leadership'
        variant='special'
        color='white'
        textTransform='uppercase'
        premium
        marginRight='5px'
      />
    )

    expect(screen.getByTestId('specialTag')).toHaveStyle({
      textTransform: 'uppercase',
    })

    //color testing does not work.
    //https://github.com/testing-library/jest-dom/issues/350
    // expect(screen.getByTestId('specialTag')).toHaveStyle({
    //   color: 'white',
    // })

    expect(screen.getByTestId('specialTag')).toHaveStyle({
      marginRight: '5px',
    })
  })
})
