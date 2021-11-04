import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import CardType1 from '../../components/molecules/Cards/CardType1'

cardData = {
  header1Text: 'Order Placed',
  header1Value: 'October 7, 2021',
  header2Text: 'Shipped to',
  header2Value: 'Gerard Viscido',
  header3Text: 'Total',
  header3Value: '21.76',
  imageUrl: '/images/ASCDImageFiller.png',
  itemTitle: 'Social Emotional Learning and the Brain by Marilee Sprenger',
  itemUrl: '/el/innovative-lesson-planning',
  itemDate1Text: 'Date:',
  itemDate1Value: 'October 31, 2021 at 3:00 pm EDT',
  itemDate2Text: 'Duration:',
  itemDate2Value: '4 Clock Hours',
  itemDate3Text: 'Delivered:',
  itemDate3Value: 'September 23, 2021',
  button1Text: 'Track Package',
  button1Url: '/resources',
  button2Text: 'Receipt/Invoice',
  button2Url: '/resources',
  button3Text: 'Cancel my Event',
  button3Url: '/resources',
  showHeader: true,
  showHeader1: true,
  showHeader2: true,
  showHeader3: true,
  showImage: true,
  showTitle: true,
  showDates: true,
  showDate1: true,
  showDate2: true,
  showDate3: false,
  showButtons: true,
  showButton1: true,
  showButton2: true,
  showButton3: true,
}
describe('CardType1 component:', () => {
  test('CardType1 Title rendered successfully', () => {
    render(<CardType1 cardData={cardData} />)
    expect(screen.getByText(cardData.itemTitle)).toBeInTheDocument()
  })
})
