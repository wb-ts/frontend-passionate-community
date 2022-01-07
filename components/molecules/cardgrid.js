import React from 'react'
import {
  Grid,
  CardMedia,
  CardContent,
  Box,
  Card,
  CardActionArea,
  Avatar,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactMarkdown from 'react-markdown'
import { imageoptimization } from '../../const'
import paths from '../../paths/path'
import TextStyle from '../atoms/TextStyle'
import ViewAllCTA from '../atoms/ViewAllCTA'

const useStyles = makeStyles((theme) => ({
  btn: {
    textDecoration: (underlined) => (underlined ? 'underline' : 'none'),
    whiteSpace: 'nowrap',
    minWidth: '64px',
    boxSizing: 'border-box',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontFamily: 'Poppins',
    borderRadius: '2px',
    textTransform: 'none',
    boxShadow: 'none',
    minHeight: '40px',
    fontWeight: 600,
    letterSpacing: '0.2px',
    color: theme.palette.common.white,
    backgroundColor: '#005E47',
    padding: '12px 24px',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  cardGrid: {
    justifyContent: 'center',
    textAlign: 'center',
    background: (props) =>
      props.bgColor === 'blue' ? theme.palette.secondary.main : '',
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(4),
    },
  },
  cardRoot: {
    borderRadius: '8px',
    height: '100%',
    border: '1px solid rgba(0,0,0,0.1)',
    '&:hover': {
      boxShadow:
        '0px 16px 24px rgba(0, 0, 0, 0.03), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)',
    },
  },
  cardGridItem: {
    '&.MuiGrid-item': {
      [theme.breakpoints.down('md')]: {
        paddingBottom: 0,
      },
    },
  },
  cardActionRoot: {
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      '&:hover $focusHighlight': {
        opacity: 0,
      },
    },
  },
  focusHighlight: {},
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    width: '100%',
    borderRadius: 8,
    [theme.breakpoints.up('md')]: {
      width: '100%',
      height: 245,
    },
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  medium: {
    width: '52px',
    height: '52px',
    border: '4px solid white',
    boxShadow: theme.shadows[4],
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: '120px',
      height: '120px',
      margin: 'auto',
      marginTop: '20px',
    },
  },
  noHover: {
    cursor: 'auto',
  },
}))

export default function CardGrid({ items, ...props }) {
  const classes = useStyles(props)

  const showAvatar =
    props.gridLayout === 'three-col-avatar' ||
    props.gridLayout === 'four-col-avatar'

  const viewAllAuthors =
    props?.headerBody &&
    props?.headerBody[0]?.props?.children &&
    props?.headerBody[0]?.props?.children.length > 0
      ? props?.headerBody[0].props?.children?.find(
          (child) => child?.props?.href == '/people/all'
        )
      : null

  let gridMd = 4
  switch (props.gridLayout) {
    case 'four-col':
    case 'four-col-avatar':
      gridMd = 3
      break
    case 'three-col':
    case 'three-col-avatar':
      gridMd = 4
      break
    case 'two-col':
      gridMd = 6
      break
  }

  return (
    <Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        textAlign='center'
        maxWidth={675}
        mx='auto'
      >
        <Box pb={2}>
          <TextStyle variant={items ? 'h2' : 'h4'}>
            {props.headerText}
          </TextStyle>
        </Box>
        {viewAllAuthors && (
          <ViewAllCTA href={paths.author({ slug: 'all ' })} label='View all' />
        )}
        {!viewAllAuthors && (
          <Box textAlign='left'>
            <TextStyle variant='h3'>{props.headerBody}</TextStyle>
          </Box>
        )}
      </Box>
      <Grid container spacing={4} className={classes.cardGrid}>
        {items?.map((card, key) => (
          <Grid
            item
            key={key}
            md={gridMd}
            xs={12}
            className={classes.cardGridItem}
          >
            <Card elevation={0} className={showAvatar ? classes.cardRoot : ''}>
              <CardActionArea
                classes={{
                  root: classes.cardActionRoot,
                  focusHighlight: classes.focusHighlight,
                }}
                href={card?.fields?.link ? card.fields.link : null}
                className={!card?.fields?.link ? classes.noHover : ''}
                id={
                  card?.fields?.cta?.fields?.url ==
                    'piano#subscription-basic' ||
                  card?.fields?.cta?.fields?.url ==
                    'piano#subscription-select' ||
                  card?.fields?.cta?.fields?.url ==
                    'piano#subscription-premium' ||
                  card?.fields?.cta?.fields?.url == 'piano#Digital-Basic' ||
                  card?.fields?.cta?.fields?.url ==
                    'piano#Digital-Print-Basic' ||
                  card?.fields?.cta?.fields?.url == 'piano#Digital-Select' ||
                  card?.fields?.cta?.fields?.url ==
                    'piano#Digital-Print-Select' ||
                  card?.fields?.cta?.fields?.url == 'piano#Digital-Premium' ||
                  card?.fields?.cta?.fields?.url ==
                    'piano#Digital-Print-Premium'
                    ? card.fields.cta?.fields?.url.replace('piano#', '')
                    : ''
                }
              >
                <CardContent className={showAvatar ? classes.cardContent : ''}>
                  <Box className={showAvatar ? classes.cardContent : ''}>
                    {card.fields?.thumbnail && !showAvatar && (
                      <CardMedia
                        className={classes.cardMedia}
                        image={
                          card.fields?.thumbnail?.fields?.imageBynder
                            ? card.fields?.thumbnail?.fields?.imageBynder[0]
                                ?.src +
                              '?' +
                              imageoptimization.qualityParameter +
                              '=' +
                              imageoptimization.qualityValue
                            : card.fields?.thumbnail?.fields?.imageContentful
                                ?.fields?.file?.url
                            ? card.fields?.thumbnail?.fields?.imageContentful
                                ?.fields?.file?.url +
                              '?' +
                              imageoptimization.qualityParameter +
                              '=' +
                              imageoptimization.qualityValue
                            : '/images/ASCDImageFiller.png'
                        }
                        title={card.fields?.title}
                      />
                    )}
                    {showAvatar && (
                      <Avatar
                        alt={card.fields?.thumbnail?.fields?.title}
                        src={
                          card.fields?.thumbnail?.fields?.imageBynder
                            ? card.fields?.thumbnail?.fields?.imageBynder[0]
                                ?.src +
                              '?' +
                              imageoptimization.qualityParameter +
                              '=' +
                              imageoptimization.qualityValue
                            : card.fields?.thumbnail?.fields?.imageContentful
                                ?.fields?.file?.url +
                              '?' +
                              imageoptimization.qualityParameter +
                              '=' +
                              imageoptimization.qualityValue
                        }
                        className={classes.medium}
                      />
                    )}
                    <Box
                      textAlign={[
                        'left',
                        'left',
                        // card.fields?.cta || card.fields?.link || showAvatar
                        showAvatar ? 'center' : 'left',
                      ]}
                    >
                      <Box mt={2} mb={showAvatar ? 0 : 1}>
                        <TextStyle variant='h5'>
                          {card?.fields?.title}
                        </TextStyle>
                      </Box>
                      <TextStyle
                        variant={showAvatar ? 'caption' : 'subtitle3'}
                        color={showAvatar ? '#546366' : 'inherit'}
                      >
                        <ReactMarkdown>{card?.fields?.body}</ReactMarkdown>
                      </TextStyle>
                    </Box>
                    {card?.fields?.cta && (
                      <Box
                        display='flex'
                        justifyContent='flex-start'
                        alignItems='center'
                        pt={2}
                      >
                        {card?.fields?.cta?.fields?.url ==
                          'piano#subscription-basic' ||
                        card?.fields?.cta?.fields?.url ==
                          'piano#subscription-select' ||
                        card?.fields?.cta?.fields?.url ==
                          'piano#subscription-premium' ||
                        card?.fields?.cta?.fields?.url ==
                          'piano#Digital-Basic' ||
                        card?.fields?.cta?.fields?.url ==
                          'piano#Digital-Print-Basic' ||
                        card?.fields?.cta?.fields?.url ==
                          'piano#Digital-Select' ||
                        card?.fields?.cta?.fields.url ==
                          'piano#Digital-Print-Select' ||
                        card?.fields?.cta?.fields?.url ==
                          'piano#Digital-Premium' ||
                        card?.fields?.cta?.fields?.url ==
                          'piano#Digital-Print-Premium' ? (
                          // <Button
                          //   variant='contained'
                          //   size='large'
                          //   color='primary'
                          //   onClick={() => void 0}
                          //   className={classes.btn}
                          // >
                          //   Join
                          // </Button>
                          <span className={classes.btn}>Join</span>
                        ) : (
                          <ViewAllCTA
                            key={card.sys.id}
                            href={card?.fields?.cta?.fields?.url}
                            label={card?.fields?.cta?.fields?.label}
                          />
                        )}
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
