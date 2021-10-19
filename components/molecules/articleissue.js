import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'material-ui-image'
import CtaButton from '@/components/atoms/CtaButton'
import TextStyle from '@/components/atoms/TextStyle'
import paths from '@/paths/path'
import imageoptimization from '@/const/imageoptimization'

const useStyles = makeStyles((theme) => ({
  aside: {
    width: '185px',
    [theme.breakpoints.up('md')]: {
      width: '185px',
    },
  },
}))

export default function ArticleIssue({ issue }) {
  const classes = useStyles()
  return (
    <Box className={classes.aside}>
      <TextStyle variant='h5'>From our issue</TextStyle>
      <Box my={1.5}>
        <Image
          src={
            issue.fields?.thumbnail?.fields?.imageBynder
              ? issue.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                '?' +
                imageoptimization.qualityParameter +
                '=' +
                imageoptimization.qualityValue
              : issue.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                  ?.url
              ? issue.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                  ?.url +
                '?' +
                imageoptimization.qualityParameter +
                '=' +
                imageoptimization.qualityValue
              : '/images/ASCDImageFiller.png'
          }
          alt={issue.fields.thumbnail?.fields?.alternate}
          style={{ width: '185px', height: '240px', paddingTop: 0 }}
          imageStyle={{ width: '185px', height: '240px' }}
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
