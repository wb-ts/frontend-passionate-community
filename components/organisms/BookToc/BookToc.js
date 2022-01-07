import React, { useState } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button } from '@mui/material'
import TextStyle from '../../atoms/TextStyle'
import ChapterLink from './ChapterLink'

/**
 * The Book Table of Contents component displays all the chapters of a book. It will provide
 * links to chapters that are available for preview by the user
 *
 * @return {Component}
 */
export default function BookToc({
  title,
  hasMemberBookAccess,
  slug,
  chapters,
}) {
  const [limit, setLimit] = useState(6)

  const readMoreChapters = () => {
    if (limit < chapters.length) {
      const newLimit = chapters.length
      setLimit(newLimit)
    } else if (limit >= chapters.length) {
      const newLimit = 6
      setLimit(newLimit)
    }
  }

  return (
    <Box>
      <TextStyle variant='h3'>{title}</TextStyle>
      <Box my={2}>
        {chapters.slice(0, limit).map((chapter, key) => (
          <ChapterLink
            key={`chapter-${key}`}
            chapter={chapter}
            pathname={`/books/${slug}`}
            hasMemberBookAccess={hasMemberBookAccess}
          />
        ))}
        {limit < chapters.length && (
          <Box my={2}>
            <Button
              style={{ padding: '0' }}
              onClick={() => readMoreChapters()}
              endIcon={<ExpandMoreIcon style={{ color: '#005E47' }} />}
            >
              Read more
            </Button>
          </Box>
        )}
        {limit >= chapters.length && chapters.length > 6 && (
          <Box my={2}>
            <Button
              style={{ padding: '0' }}
              onClick={() => readMoreChapters()}
              endIcon={<ExpandLessIcon style={{ color: '#005E47' }} />}
            >
              Read less
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}
