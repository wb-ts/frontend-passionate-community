import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CtaButton from '@/components/atoms/ctabutton'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import options from '@/const/options'

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    padding: theme.spacing(5),
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Georgia',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '25px',
    lineHeight: '37px',
    letterSpacing: '0.2px',
    textAlign: 'left',
  },
}))

export default function ArticlePledge({ pledge, author }) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.text}>
        {pledge
          ? documentToReactComponents(pledge, options)
          : '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper rhoncus, magna eu commodo. Cursus ipsum urna dictum augue enim. Amet sagittis enim.”'}
      </Box>

      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='caption'>{author}</Typography>
        <CtaButton
          variant='contained'
          color='primary'
          width='139'
          height='42'
          label='Share'
        />
      </Box>
    </Box>
  )
}
