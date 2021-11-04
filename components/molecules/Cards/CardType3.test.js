import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import CardType3 from '../../components/molecules/Cards/CardType3'

cardData = {
  bgColor: '',
  itemTitle: 'Add new payment',
  input1Title: 'Enter New Credit card',
  input1HelpText: 'Assistive text1',
  showInput1: true,
  input2Title: 'Confirm Credit card',
  input2HelpText: 'Assistive text2',
  showInput2: true,
  input3Title: 'CVV',
  input3HelpText: 'Assistive text3',
  showInput3: true,
  button1Text: 'Cancel',
  button1Url: '',
  showButton1: true,
  button2Text: 'Save',
  button2Url: '',
  showButton2: true,
  errorMessage: 'Credit Card Number does not match',
}
describe('CardType3 component:', () => {
  test('CardType3 Title rendered successfully', () => {
    render(<CardType3 cardData={cardData} />)
    expect(screen.getByText(cardData.itemTitle)).toBeInTheDocument()
  })
})
