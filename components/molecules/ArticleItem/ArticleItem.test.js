import '@testing-library/jest-dom/extend-expect'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ArticleItem from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const cardData = {
  title: 'Adding the "Value" to Student Evaluation',
  actionHref: '/el/articles/adding-the-value-to-student-evaluation-september',
  mediaImg: '/images/ASCDImageFiller.png',
  premium: false,
  topicTag: 'Assessment',
  authorName: 'Noble  Ingram',
  datePublished: '2021-09-08T00:00-04:00',
}
describe('ArticleItem component:', () => {
  test('Article Title rendered successfully', () => {
    render(
      <ArticleItem
        cardData={cardData}
        overlay={false}
        hasImage={false}
        firstSubItem={true}
      />
    )

    expect(screen.getByText(cardData.title)).toBeInTheDocument()
  })

  test('Child Component ArticleInfo rendered successfully', () => {
    const timeAgoStr = timeAgo.format(Date.parse(cardData.datePublished))
    render(
      <ArticleItem
        cardData={cardData}
        overlay={false}
        hasImage={false}
        firstSubItem={true}
      />
    )
    expect(screen.getByText(new RegExp(timeAgoStr, 'i'))).toBeInTheDocument()
  })
})
