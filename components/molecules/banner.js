import React from 'react'
import { Box, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CtaButton from '../atoms/CtaButton'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.accent.paleGreen,
    color: theme.palette.text.primary,
    borderBottomLeftRadius: 96,
  },
  innerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  [theme.breakpoints.down('lg')]: {
    innerHeader: {
      marginRight: '20vw',
      marginBottom: '0',
      marginLeft: '20vw',
      '& h1': {
        marginBottom: '1vw',
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    innerHeader: {
      marginRight: '12vw',
      marginBottom: '0',
      marginLeft: '12vw',
      '& h1': {
        marginBottom: '1vw',
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    innerHeader: {
      marginTop: '15vw',
      marginRight: '8vw',
      marginBottom: '0',
      marginLeft: '8vw',
      '& h1': {
        marginBottom: '4vw',
      },
    },
  },
}))

export default function Banner({
  header1,
  header2,
  btn1Text,
  btn1Url,
  btn2Text,
  btn2Url,
}) {
  const classes = useStyles()
  return (
    <Box py={[9, 10]} className={classes.header}>
      <Container>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <Box>
            <TextStyle variant='h1'> {header1} </TextStyle>
          </Box>
          <Box>
            <TextStyle variant='subtitle1'> {header2} </TextStyle>
          </Box>
          {(btn1Text || btn2Text) && (
            <Box className={classes.innerHeader}>
              {btn1Text && (
                <Box mr={[0, 2]} mb={[2, 0]}>
                  <CtaButton
                    variant='outlinedPrimary'
                    label={btn1Text}
                    href={btn1Url}
                  />
                </Box>
              )}
              {btn2Text && (
                <Box>
                  <CtaButton
                    variant='containedPrimary'
                    label={btn2Text}
                    href={btn2Url}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}
