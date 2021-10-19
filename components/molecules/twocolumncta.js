import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CtaButton from '@/components/atoms/CtaButton'
import TextStyle from '@/components/atoms/TextStyle'
import ViewAllCTA from '@/components/atoms/ViewAllCTA'
import TopicTag from '@/components/molecules/TopicTag'
import { useRouter } from 'next/router'
import SnipcartButton from '@/components/Snipcart/SnipcartButton'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '359px',
    backgroundColor: ({ variant }) =>
      variant == 'grey'
        ? theme.palette.background.lightGrey
        : theme.palette.background.light,
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      height: '100%',
      flexDirection: ({ variant }) =>
        variant == 'error' ? 'column' : 'column-reverse !important',
    },
  },
  content: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
    paddingLeft: 0,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: ({ imagePos }) =>
        imagePos == 'left' ? `${theme.spacing(5)}px` : 0,
    },
  },
  media: {
    overflow: 'hidden',
    width: '100%',
    height: '359px',
    maxHeight: '359px',
    objectFit: ({ variant }) => (variant == 'error' ? 'fill' : 'cover'),
    [theme.breakpoints.down('xs')]: {
      height: '239px',
      maxHeight: '239px',
    },
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
  leftAligned: {
    '& a': {
      justifyContent: 'flex-start !important',
    },
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: '1.875rem' /* fallback */,
    '-webkit-line-clamp': 2 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',
    [theme.breakpoints.up('md')]: {
      lineHeight: '2rem',
    },
  },
  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: '1.5rem' /* fallback */,
    '-webkit-line-clamp': ({ descriptionLineNumbers }) =>
      descriptionLineNumbers
        ? descriptionLineNumbers
        : 2 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',
    [theme.breakpoints.up('md')]: {
      maxWidth: '85%',
    },
  },
}))

export default function TwoColumnCta({
  label,
  title,
  description,
  descriptionLineNumbers,
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
  variant,
}) {
  const classes = useStyles({ imagePos, variant, descriptionLineNumbers })
  const router = useRouter()
  return (
    <Grid
      container
      className={classes.root}
      direction={`${imagePos == 'right' ? 'row' : 'row-reverse'}`}
    >
      <Grid item sm={6} xs={12} className={classes.content}>
        <Box
          ml={variant == 'grey' ? [0, 3, 6] : 0}
          mr={[0, 1]}
          mt={[3, 0]}
          px={variant == 'grey' ? [2, 0] : 0}
          width='100%'
        >
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
            <Box className={classes.title}>
              <TextStyle
                variant={
                  variant === 'error'
                    ? 'error'
                    : variant === 'h1'
                    ? 'h1'
                    : variant === 'h2'
                    ? 'h2'
                    : 'h3'
                }
              >
                {title}
              </TextStyle>
            </Box>
            {date && time ? (
              <>
                <TextStyle variant='subtitle2'>{`${date} - ${time}`}</TextStyle>
              </>
            ) : null}
            <Box pt={1} className={classes.description}>
              <TextStyle variant={variant === 'error' ? 'h3' : 'subtitle2'}>
                {description}
              </TextStyle>
            </Box>
          </Box>
          <Box className={classes.buttonContainer}>
            {ctaLabel1 && (
              <Box pt={3} className={classes.button} pr={[0, 2]}>
                <CtaButton
                  variant='contained'
                  color='primary'
                  width='100%'
                  height='42'
                  label={ctaLabel1}
                  href={ctaLink1}
                  snipcart={snipcart}
                />
              </Box>
            )}

            {snipcart && (
              <Box pt={3} className={classes.button}>
                <SnipcartButton snipcart={snipcart} />
              </Box>
            )}

            {ctaLabel2 && (
              <Box
                pt={3}
                className={
                  variant === 'error'
                    ? `${classes.button} ${classes.leftAligned}`
                    : classes.button
                }
              >
                <ViewAllCTA label={ctaLabel2} href={ctaLink2} />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item sm={6} xs={12} className={classes.media}>
        <img
          src={image ? image : '/images/ASCDImageFiller.png'}
          alt={imageAlt}
          className={classes.media}
        />
      </Grid>
    </Grid>
  )
}
