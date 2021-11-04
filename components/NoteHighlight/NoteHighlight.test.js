import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'
import NoteHighlight from '../NoteHighlight'

const annotation = {
	id: 179,
  contentId: '1hkL6WeHOsK0F2ffDfqdNs', 
	contentImageSrc: 'https://library.ascd.org/m/7d6a3d3dbe4d5fda/webimage-0220_16-22_3C0A2612_CSI.jpg?q=90', 
	contentSlug: 'drawing-on-reading-science-without-starting-a-war', 
	contentTitle: 'Drawing on Reading Science Without Starting a War',
	notesCount: 2,
	totalCount: 14,
	updatedAt: '2021-10-25T21:23:38.000Z'
}

describe('Note/Highlight ListItem component:', () => {
  test('List item title and image source url', () => {
    render(
      <NoteHighlight annotation={annotation} deleteAction={(contentId) => deleteAnnotations(contentId)} />
    )
    expect(screen.getByText(annotation.contentTitle)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      `${annotation.contentImageSrc}`
    )
  })
})