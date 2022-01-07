import React from 'react'
import Image from 'next/image'
import { Avatar, Box, Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import paths from '../../paths/path'
import TextStyle from '../atoms/TextStyle'
import ViewAllCTA from '../atoms/ViewAllCTA'
import TopicTag from './TopicTag'

const useStyles = makeStyles((theme) => ({
  root: {},
  fullWidth: {
    width: '100%',
    padding: '36px 28px',
    borderRadius: '8px 8px 8px 48px',
    backgroundColor: theme.palette.grey.extraLight,
    backgroundImage:
      'linear-gradient(to top right, rgba(255, 255, 255, 0.4) 50%, #E4E9EC 50%)',
    [theme.breakpoints.up('md')]: {
      padding: '46px 96px ',
      borderRadius: '8px 8px 8px 96px',
    },
    '& .MuiContainer-root': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  avatar: {
    width: '15vw',
    height: '15vw',
    minWidth: '128px',
    minHeight: '128px',
    maxHeight: '212px',
    maxWidth: '212px',
    border: '8px solid #FFFFFF',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
      border: '4px solid #FFFFFF',
    },
  },
  articleInfo: {
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      marginRight: '30px',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '26px',
    },
  },
  nextImage: {
    backgroundColor: 'transparent',
    minWidth: 25,
    marginTop: 5,
  },
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
}))

export default function HorizontalSection({
  title,
  viewAllLink,
  label,
  linkText,
  linkSlug,
  description,
  date,
  authorImage,
  authorTitle,
  authorSubtitle,
  imageSlug,
  variant,
}) {
  TimeAgo.addLocale(en)
  const classes = useStyles()
  const timeAgo = new TimeAgo('en-US')
  const dateFormat = require('dateformat')

  return (
    <Box className={classes.root}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        {title && <TextStyle variant='h4'>{title}</TextStyle>}
        {viewAllLink && <ViewAllCTA label='View all' href={'#'} lg />}
      </Box>
      <Box
        className={classes.fullWidth}
        display='flex'
        flexDirection='column'
        justifyContent='center'
      >
        <Container>
          <Grid container alignItems='center' className={classes.container}>
            <Grid item xs={12} sm={8} md={7}>
              <Box className={classes.articleInfo}>
                {variant === 'quote' && (
                  <Box display='flex'>
                    <Box pr={2}>
                      <Image
                        src='/images/quote.svg'
                        width={20}
                        height={20}
                        className={classes.nextImage}
                      />
                    </Box>
                    <Box>
                      <TextStyle variant='h4'>{description}</TextStyle>
                    </Box>
                  </Box>
                )}
                {label && (
                  <TopicTag
                    label={label}
                    variant='white'
                    textTransform='uppercase'
                  />
                )}
                {linkText && (
                  <Box my={1}>
                    <a href={paths.article({ slug: linkSlug })}>
                      <TextStyle variant='h2'>{linkText}</TextStyle>
                    </a>
                  </Box>
                )}
                {date && (
                  <TextStyle variant='subtitle2'>
                    {timeAgo.format(Date.parse(date))}
                  </TextStyle>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {imageSlug && (
                <a
                  href={paths.author({
                    slug: imageSlug,
                  })}
                >
                  <Avatar
                    src={authorImage}
                    alt={undefined}
                    className={classes.avatar}
                  />
                </a>
              )}
              {!imageSlug && (
                <Avatar
                  src={authorImage}
                  alt={undefined}
                  className={classes.avatar}
                />
              )}
              <Box pt={2} textAlign='center'>
                <TextStyle variant='h4'>
                  <span style={{ fontSize: 20 }}>{authorTitle}</span>
                </TextStyle>
                <Box color='#546366'>
                  <TextStyle variant='caption'>{authorSubtitle}</TextStyle>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
