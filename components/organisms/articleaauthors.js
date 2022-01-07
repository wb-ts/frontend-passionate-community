import React, { Fragment } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Divider } from '@mui/material'
import { options } from '../../const'
import paths from '../../paths/path'
import TextStyle from '../atoms/TextStyle'
import HorizontalCard from '../molecules/horizontalcard'

export default function ArticleAuthors({ authors, title }) {
  return (
    <Box>
      {title && (
        <Box mb={5}>
          <TextStyle variant='h3'>{title}</TextStyle>
        </Box>
      )}
      {authors
        .filter((author) => author.fields)
        .map((author, key) => {
          const divider = authors.length > key + 1
          return (
            <Fragment key={key}>
              <Box my={3} id='lala'>
                <HorizontalCard
                  key={author.fields.slug}
                  body={documentToReactComponents(
                    author.fields.description,
                    options
                  )}
                  image={author.fields.thumbnail}
                  ctaLink={paths.author({ slug: author.fields.slug })}
                  reverse
                  variant='author'
                />
              </Box>
              {divider && <Divider />}
            </Fragment>
          )
        })}
    </Box>
  )
}
