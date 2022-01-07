import React from 'react'
import Link from 'next/link'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import TextStyle from '../../atoms/TextStyle'

/**
 * The Chapter Link component will display the name of the chapter and
 * also provide a link if the chapter can be previewed by the user
 *
 * @return {Component}
 */
const ChapterLink = ({ chapter, hasMemberBookAccess, pathname }) => {
  const ChapterText = () => (
    <>
      {chapter.fields?.title && chapter.fields?.label
        ? chapter.fields.label + '. '
        : chapter.fields?.label}
      {chapter.fields?.title}
    </>
  )

  return (
    <Box pt={1}>
      <TextStyle variant='body1'>
        {(hasMemberBookAccess && chapter.fields?.slug) ||
        (chapter.fields?.freeChapter && chapter.fields?.slug) ? (
          <Link
            href={{
              pathname: pathname,
              query: { chapter: chapter.fields.slug },
            }}
            scroll={false}
            shallow={true}
          >
            <a>
              <Typography variant='large-link' color='#005E47'>
                <ChapterText />
              </Typography>
            </a>
          </Link>
        ) : (
          <ChapterText />
        )}
      </TextStyle>
    </Box>
  )
}

export default ChapterLink
