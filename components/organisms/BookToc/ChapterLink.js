import React from 'react'
import Box from '@material-ui/core/Box'
import TextStyle from '@/components/atoms/TextStyle'
import CustomLink from '@/components/atoms/CustomLink'

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
          <CustomLink
            scroll={false}
            shallow={true}
            size='large'
            href={{
              pathname: pathname,
              query: { chapter: chapter.fields.slug },
            }}
          >
            <ChapterText />
          </CustomLink>
        ) : (
          <ChapterText />
        )}
      </TextStyle>
    </Box>
  )
}

export default ChapterLink
