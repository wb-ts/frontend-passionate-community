import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import NoteHighlightList from '../NoteHighlightList'
import { Box, Container } from '@mui/material'

const noData = 'Go to an article and start by highlighting some text.'

describe('Note/Highlight List component:', () => {
  test('Render empty list', () => {
    render(
      <Container maxWidth='lg'>
        <Box mb={[5, 9]} mt={[1, 7]}>
          <NoteHighlightList
            userId='BAEC1245-013F-435B-85A9-DC20C7A9A626'
            width={1024}
          />
        </Box>
      </Container>
    )
    expect(screen.getByText(noData)).toBeInTheDocument()
  })
})
