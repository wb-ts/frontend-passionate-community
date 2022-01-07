import '@testing-library/jest-dom/extend-expect'
import ModalMessageBox from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

describe('Custom ModalMessageBox component:', () => {
  test('Message in the ModalMessageBox is rendered', () => {
    render(
      <ModalMessageBox
        openMessageBox={true}
        onMessageBoxClose={(value) => setOpenModal(value)}
        message='Test of rending text in custom ModalMessageBox'
        itemlist={['Test of item list']}
      ></ModalMessageBox>
    )

    expect(
      screen.getByText('Test of rending text in custom ModalMessageBox')
    ).toBeInTheDocument()
    expect(screen.getByText('Test of item list')).toBeInTheDocument()
  })
})
