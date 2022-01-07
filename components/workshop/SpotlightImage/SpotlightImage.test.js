import '@testing-library/jest-dom/extend-expect'
import SpotlightImage from '.'
import { render, screen } from '../../../__test-utils__/test-utils'

const src =
  '//images.ctfassets.net/cguvp07qpj80/2p2n6Zy0oDvftGFLyyVNtI/c1e24cd4cdd692e8ff2e90d26d6928ba/3-literacy-concepts-for-develo.png'
const title =
  '3 Literacy Concepts for Developing Students’ Skills in Reading, Writing and Thinking - thumbnail'
describe('SpotlightImage component: ', () => {
  test('SpotlightImage component rendered successfully', () => {
    render(<SpotlightImage imgUrl={src} imgTitle={title} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', src)
    expect(img).toHaveAttribute('alt', title)
  })
})
