import React from 'react'
import { useRouter } from 'next/router'
import { Container, Box, Grid, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactMarkdown from 'react-markdown'
import CtaButton from '../../atoms/CtaButton'
import CtaItem from '../../atoms/CtaItem'
import TextStyle from '../../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomLeftRadius: 64,
    width: '100%',
    paddingBottom: theme.spacing(7),
    [theme.breakpoints.up('md')]: {
      height: 506,
      borderBottomLeftRadius: 180,
      paddingBottom: 0,
    },
  },
  container: {
    height: '100%',
    paddingTop: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(7),
      paddingRight: theme.spacing(7),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
    },
  },
  gridContainer: {
    height: '100%',
  },
  leftContent: {
    marginTop: 5,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginTop: 67,
      width: 427,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  rightContent: {
    marginTop: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginTop: 60,
      width: 470,
    },
    '& .MuiGrid-spacing-xs-5 > .MuiGrid-item': {
      [theme.breakpoints.down('xs')]: {
        padding: '16px 18px',
      },
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  media: {
    backgroundColor: theme.palette.primary.main,
    objectFit: 'cover',
    overflow: 'hidden',
    height: 375,
    maxHeight: 375,
    width: '100%',
    alignSelf: 'center',
    borderRadius: '0 0 0 96px',

    [theme.breakpoints.up('md')]: {
      width: 500,
      height: 500,
      maxHeight: 500,
      borderRadius: '8px 8px 8px 96px',
    },
  },
  btnGroup: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
  },
  bannerHolder: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginTop: -22,
    },
  },
  banner: {
    width: '80%',
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
    '& a': {
      textDecoration: 'underline',
    },
  },
}))

export default function HeroBanner({
  label,
  title,
  description,
  ctaLabel1,
  ctaLink1,
  ctaLabel2,
  ctaLink2,
  image,
  imageAlt,
  imagePos = 'left',
}) {
  const classes = useStyles()
  const router = useRouter()
  return (
    <>
      <Box className={classes.root}>
        <Container
          maxWidth='lg'
          disableGutters={false}
          className={classes.container}
        >
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} justifyContent='flex-start'>
              <Box className={classes.leftContent}>
                <TextStyle variant='h1'>{title}</TextStyle>
                <Box mt={2} mb={5}>
                  <TextStyle variant='subtitle1'>{description}</TextStyle>
                </Box>
                <Grid container spacing={1} className={classes.btnGroup}>
                  <Grid item xs={12} md={6}>
                    {ctaLabel1 && (
                      <CtaButton
                        variant='contained'
                        color='primary'
                        label={ctaLabel1}
                        href={ctaLink1}
                        fullWidth
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {ctaLabel2 && (
                      <CtaButton
                        variant='outlined'
                        color='primary'
                        label={ctaLabel2}
                        href={ctaLink2}
                        fullWidth
                      />
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} container justifyContent='flex-end'>
              <Box className={classes.media} mt={2}>
                {image ? (
                  <img
                    src={image ? image : '/images/ASCDImageFiller.png'}
                    alt={imageAlt}
                    style={{
                      width: '100%',
                      height: 'inherit',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  'Image'
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
