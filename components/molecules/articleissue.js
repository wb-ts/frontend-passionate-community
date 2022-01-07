import React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { contentfulThumbnailAPIToImageUrl } from '../../lib/data-transformations'
import paths from '../../paths/path'
import CtaButton from '../atoms/CtaButton'
import TextStyle from '../atoms/TextStyle'
import NextImageWrapper from '../images/NextImageWrapper'

const useStyles = makeStyles((theme) => ({
  aside: {
    width: '185px',
    [theme.breakpoints.up('md')]: {
      width: '185px',
    },
  },
  nextImage: {
    paddingTop: 0,
  },
}))

export default function ArticleIssue({ issue }) {
  const classes = useStyles()
  return (
    <Box className={classes.aside}>
      <TextStyle variant='h5'>From our issue</TextStyle>
      <Box my={1.5}>
        <NextImageWrapper
          src={contentfulThumbnailAPIToImageUrl(issue.fields?.thumbnail)}
          alt={issue.fields.thumbnail?.fields?.alternate}
          width={185}
          height={240}
          className={classes.nextImage}
        />
      </Box>
      <TextStyle variant='caption'>{issue.fields.title}</TextStyle>
      <Box mt={2}>
        <CtaButton
          variant='contained'
          color='primary'
          fullWidth
          height='49'
          label='Go To Publication'
          href={paths.el({ slug: issue.fields.slug })}
        />
      </Box>
    </Box>
  )
}
