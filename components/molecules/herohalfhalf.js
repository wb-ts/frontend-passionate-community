import React from 'react'
import { useRouter } from 'next/router'
import { Box, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactMarkdown from 'react-markdown'
import CtaButton from '../atoms/CtaButton'
import TextStyle from '../atoms/TextStyle'
import { SnipcartButton } from '../Snipcart'
import TopicTag from './TopicTag'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.light,
    flexDirection: 'column-reverse !important',
    [theme.breakpoints.up('sm')]: {
      height: '375px',
      flexDirection: 'row !important',
    },
    [theme.breakpoints.up('md')]: {
      height: '500px',
    },
  },
  content: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(2),
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.up('xl')]: {
      padding: 0,
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
  link: {
    textDecoration: 'underline',
  },
  label: {
    paddingRight: theme.spacing(3),
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  button: {
    width: '100%',
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
    '& a': {
      justifyContent: 'center !important',
    },
    '& button': {
      width: '100%',
    },
    '& .MuiButton-label': {
      fontWeight: 600,
    },
  },
  description: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '85%',
    },
  },
  descriptionLink: {
    '& a': {
      color: theme.palette.primary.main,
    },
  },
}))

export default function HeroHalfHalf({
  label,
  title,
  description,
  date,
  time,
  ctaLabel1,
  ctaLink1,
  ctaLabel2,
  ctaLink2,
  image,
  imageAlt,
  imagePos = 'left',
  snipcart,
}) {
  const classes = useStyles()
  const router = useRouter()

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6} className={classes.content}>
        <Box ml={[3, 2, 0]} mr={[3, 0]} width='468px'>
          {label && (
            <Box pb={1}>
              <TopicTag
                label={label}
                variant='special'
                color='black'
                textTransform='uppercase'
              />
            </Box>
          )}
          <Box>
            <TextStyle variant='h1'>{title}</TextStyle>
            {date && time ? (
              <>
                <TextStyle variant='subtitle2'>{`${date} - ${time} EST`}</TextStyle>
              </>
            ) : null}
            <Box mt={2} className={classes.description}>
              <TextStyle variant='subtitle2'>
                {Array.isArray(description) ? (
                  description
                ) : (
                  <ReactMarkdown className={classes.descriptionLink}>
                    {description}
                  </ReactMarkdown>
                )}
              </TextStyle>
            </Box>
          </Box>
          <Box mt={5} className={classes.buttonContainer}>
            {ctaLabel1 && (
              <Box pt={0} className={classes.button}>
                <CtaButton
                  variant='contained'
                  color='primary'
                  width='100%'
                  size='large'
                  label={ctaLabel1}
                  onclick={
                    Object.prototype.toString.call(ctaLink1) ==
                    '[object Function]'
                      ? () => ctaLink1()
                      : undefined
                  }
                  href={
                    Object.prototype.toString.call(ctaLink1) !=
                    '[object Function]'
                      ? ctaLink1
                      : null
                  }
                  snipcart={snipcart}
                />
              </Box>
            )}

            {snipcart && (
              <Box pt={[2, 0, 0]} className={classes.button}>
                <SnipcartButton snipcart={snipcart} />
              </Box>
            )}

            {ctaLabel2 && (
              <Box pt={[2, 2, 0]} className={classes.button}>
                <CtaButton
                  variant='outlined'
                  color='primary'
                  width='100%'
                  size='large'
                  label={ctaLabel2}
                  href={ctaLink2}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.media}>
        {image ? (
          <img
            src={image ? image : '/images/ASCDImageFiller.png'}
            alt={imageAlt}
            style={{ width: '100%', height: 'inherit', objectFit: 'cover' }}
          />
        ) : (
          'Image'
        )}
      </Grid>
    </Grid>
  )
}
