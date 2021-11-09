import React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import NextImageWrapper from '../images/NextImageWrapper'
import CtaButton from '@/components/atoms/CtaButton'
import TextStyle from '@/components/atoms/TextStyle'
import paths from '@/paths/path'
import { contentfulThumbnailAPIToImageUrl } from '../../lib/data-transformations'

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
          label='Subscribe Now'
          href={paths.subscribe}
        />
      </Box>
    </Box>
  )
}
