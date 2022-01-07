import '@testing-library/jest-dom/extend-expect'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ArticleInfo from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

describe('ArticleInfo component:', () => {
  test('Instructional Strategies Article rendered successfully', () => {
    render(
      <ArticleInfo
        premium='premium'
        topicTag='Instructional Strategies'
        topicTagColor='black'
        title='Putting the Person Back in Personalized Learning'
        authorName='Paul Emerich'
        datePublished='2021-09-01'
      />
    )

    expect(screen.getByText('Instructional Strategies')).toBeInTheDocument()
    expect(
      screen.getByText('Putting the Person Back in Personalized Learning')
    ).toBeInTheDocument()
  })

  test('Timeago: Valid date format', () => {
    const datePublished = '2021-09-01'
    const timeAgoStr = timeAgo.format(Date.parse(datePublished))
    const el = render(
      <ArticleInfo
        premium='premium'
        topicTag='Instructional Strategies'
        topicTagColor='black'
        title='Putting the Person Back in Personalized Learning'
        authorName='Paul Emerich'
        datePublished={datePublished}
      />
    )

    expect(screen.getByText(new RegExp(timeAgoStr, 'i'))).toBeInTheDocument()
  })

  test('Timeago: Null date', () => {
    const datePublished = ''
    const el = render(
      <ArticleInfo
        premium='premium'
        topicTag='Instructional Strategies'
        topicTagColor='black'
        title='Putting the Person Back in Personalized Learning'
        authorName='Paul Emerich'
        datePublished={datePublished}
      />
    )

    expect(screen.getByTestId('blank-timeago')).toBeInTheDocument()
  })

  test('Timeago: non compliant date format', () => {
    const datePublished = 'ASD'
    const el = render(
      <ArticleInfo
        premium='premium'
        topicTag='Instructional Strategies'
        topicTagColor='black'
        title='Putting the Person Back in Personalized Learning'
        authorName='Paul Emerich'
        datePublished={datePublished}
      />
    )

    expect(screen.getByTestId('blank-timeago')).toBeInTheDocument()
  })
})
