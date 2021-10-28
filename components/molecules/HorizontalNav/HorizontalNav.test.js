import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import HorizontalNav from './HorizontalNav'

describe('HorizontalNav component:', () => {
  test('HorizontalNav rendered successfully', () => {
    render(
      <HorizontalNav
        items={[
          {
            label: 'My Account',
            url: '/account',
            selected: true,
          },
          {
            label: 'My Orders',
            url: '/account/orders',
            selected: false,
          },
          {
            label: 'My Learning',
            url: '/account/learning',
            selected: false,
          },
          {
            label: 'My Preferences',
            url: '/account/preferences',
            selected: false,
          },
          {
            label: 'Notes and HighLights',
            url: '/account/notes',
            selected: false,
          },
        ]}
        mainBtn='makeStyles-navBtn-453'
        selectedBtn='makeStyles-selected-454'
      />
    )

    expect(screen.getByText('My Orders')).toBeInTheDocument()

    const button = screen.getByTestId('horizontalNav-4')
    expect(button).toHaveAttribute('href', '/account/notes')
  })

  test('HorizontalNav have correct class name', () => {
    render(
      <HorizontalNav
        items={[
          {
            label: 'My Account',
            url: '/account',
            selected: true,
          },
          {
            label: 'My Orders',
            url: '/account/orders',
            selected: false,
          },
          {
            label: 'My Learning',
            url: '/account/learning',
            selected: false,
          },
          {
            label: 'My Preferences',
            url: '/account/preferences',
            selected: false,
          },
          {
            label: 'Notes and HighLights',
            url: '/account/notes',
            selected: false,
          },
        ]}
        mainBtn='makeStyles-navBtn-453'
        selectedBtn='makeStyles-selected-454'
      />
    )

    let classes = screen.getByTestId('horizontalNav-4').getAttribute('class')
    classes = classes.split(' ')[3].split('-')
    expect(classes.includes('makeStyles-navBtn-453'))
  })
})
