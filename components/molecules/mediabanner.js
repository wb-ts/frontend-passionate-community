import React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CtaButton from '../atoms/CtaButton'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      paddingRight: theme.spacing(3),
    },
    '& a': {
      justifyContent: 'center !important',
    },
    '& button': {
      width: '100%',
    },
  },
}))

export default function MediaBanner({ title, subtitle }) {
  const classes = useStyles({})
  return (
    <Box display='flex' justifyContent='center'>
      <Box
        mt={[6, 10]}
        px={[3, 'auto']}
        display='flex'
        flexDirection='column'
        alignItems='center'
        maxWidth='650px'
        textAlign='center'
      >
        <TextStyle component='h1' variant='h1'>
          {title}
        </TextStyle>
        <Box mt={5} textAlign='center'>
          <TextStyle variant='subtitle1'>{subtitle}</TextStyle>
          <Box mt={2} className={classes.button}>
            <CtaButton
              variant='outlined'
              color='primary'
              width='100%'
              size='large'
              label='Upcoming webinars'
              href='/events#upcoming-events'
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
