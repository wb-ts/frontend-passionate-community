import React, { useContext } from 'react'
import Link from 'next/link'
import { useReactiveVar } from '@apollo/client'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import ReplyIcon from '@mui/icons-material/Reply'
import { Box, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { imageoptimization, constSnipcart } from '../../const'
import { hasMemberBookPriceVar } from '../../lib/apollo-client/cache'
import { getCartButtonCaptionLabel } from '../../lib/utils'
import paths from '../../paths/path'
import TextStyle from '../atoms/TextStyle'
import { SnipcartButton } from '../Snipcart'

const useStyles = makeStyles((theme) => ({
  searchResults: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchResultsCard: {
    position: 'relative',
    width: '108%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '32px 26px 26px',
    marginBottom: '4px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '16px 16px 10px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '16px 30px',
    },
    transition: 'transform .2s ease-in-out',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: '3.5%',
      width: '93%',
      borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    },
    '&:hover, &:focus': {
      transform: 'scale(1.01)',
      textDecoration: 'none',
      boxShadow:
        '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
      borderRadius: '4px',
      '& $searchResultsCardContentTitle': {
        color: theme.palette.hover.main,
        textDecoration: 'underline',
      },
      '&:after': {
        borderBottom: 0,
      },
      [theme.breakpoints.down('md')]: {
        borderRadius: 0,
        boxShadow: 'none',
        '&:after': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
  searchResultsCardContent: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginRight: 0,
    },
  },
  searchResultsCardContentTopic: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '8px',
    '& span': {
      padding: '2px 8px',
      backgroundColor: theme.palette.grey.extraLight,
      borderRadius: '4px',
    },
  },
  searchResultsCardContentTitle: {
    marginBottom: '6px',
    '&:hover': {
      color: theme.palette.hover.main,
      textDecoration: 'underline',
    },
  },
  searchResultsCardContentType: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.palette.grey.medium,
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '12px',
    },
    '& h6': {
      marginRight: '8px',
      textTransform: 'uppercase',
    },
  },
  searchResultsCardContentCtaBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '12px',
    },
  },
  searchResultsCardContentCta: {
    fontFamily: '"Poppins", sans-serif',
    padding: '6px 12px',
    fontSize: '12px',
    lineHeight: '18px',
    marginRight: '12px',
    boxShadow: 'none',
    letterSpacing: '0.2px',
    fontWeight: 600,
    minWidth: '64px',
    boxSizing: 'border-box',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderRadius: '2px',
    textTransform: 'none',
    border: 0,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.hover.main,
      textDecoration: 'underline',
      boxShadow:
        '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    },
  },
  searchResultsCardContentInfoBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 'auto',
    marginBottom: '-5px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
    },
    '& button': {
      marginRight: '10px',
      '&:first-child': {
        marginRight: '2px',
      },
      '& .MuiButton-startIcon': {
        marginRight: '4px',
      },
    },
  },
  searchResultsCardContentInfoBlockDate: {
    color: theme.palette.grey.medium,
    textTransform: 'uppercase',
  },
  flip: {
    '& svg': {
      '-webkit-transform': 'scaleX(-1)',
      transform: 'scaleX(-1)',
    },
  },
  searchResultsCardMedia: {
    width: '35%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'center',
    },
  },
  searchResultsCardMediaContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '160px',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    '& img': {
      maxWidth: '300px',
      maxHeight: '160px',
      width: 'auto',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  playicon: {
    position: 'absolute',
    top: 'calc(50% - 30px)',
    left: 'calc(50% - 30px)',
    color: theme.palette.common.white,
    width: 60,
    height: 60,
  },
}))

export default function SearchItem({ hit, props }) {
  // @TODO - use highlight.
  const classes = useStyles()
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  const dateFormat = require('dateformat')
  const dt =
    new Date(hit.dateTimeStamp + 'T00:00:00').toString() == 'Invalid Date'
      ? new Date(hit.dateTimeStamp)
      : new Date(hit.dateTimeStamp + 'T00:00:00')
  const yyyymmdd =
    dt.getFullYear() +
    '-' +
    ('0' + (dt.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + dt.getDate()).slice(-2)
  const cartButtonCaptionLabel = getCartButtonCaptionLabel(hit.dateTimeStamp)

  return (
    <Box className={classes.searchResults} key={hit.objectID}>
      <a
        className={classes.searchResultsCard}
        href={
          hit.type == 'book'
            ? `${hit.url}?variant=${hit.productNumber}`
            : hit.url
        }
        aria-label={hit.title}
      >
        <Box className={classes.searchResultsCardContent}>
          <Box className={classes.searchResultsCardContentTopic}>
            {hit.premium && (
              <img
                src='/images/premium.png'
                alt='premium resources logo'
                style={{ width: '20px', margin: '0 6px 0 0' }}
              />
            )}
            {hit.topic && hit.topic.length > 0 ? (
              <Typography variant='overline'>
                {hit.topic[hit.topic.length - 1] + ''}
              </Typography>
            ) : (
              ''
            )}
          </Box>
          <Typography
            variant='h4'
            className={classes.searchResultsCardContentTitle}
          >
            {hit.title}
          </Typography>
          <Box className={classes.searchResultsCardContentType}>
            <Typography variant='h6'>
              {hit.type != 'pubissue' ? hit.type : 'Publication'}
            </Typography>
            {hit.author && (
              <Typography variant='caption'>{hit.author.join(', ')}</Typography>
            )}
          </Box>
          {(hit.type === 'book' || hit.type === 'collection') && (
            <Box className={classes.searchResultsCardContentCtaBlock}>
              <SnipcartButton
                className={classes.searchResultsCardContentCta}
                snipcart={{
                  label: cartButtonCaptionLabel,
                  dataItemId: hit.productNumber,
                  dataItemName: hit.title,
                  dataItemAuthors: hit.author ? hit.author : '',
                  dataItemUrl: hit.url,
                  dataItemImage: hit.thumbnail,
                  dataItemDescription: hit.description,
                  dataItemPrice:
                    hit.type === 'collection'
                      ? hasMemberBookPrice
                        ? hit.memberDiscountedPrice
                        : hit.discountedPrice
                      : hasMemberBookPrice
                      ? hit.priceMember
                      : hit.priceNonmember,
                  dataItemCustom1Value: hit?.taxJarId ? hit.taxJarId : '',
                  dataItemCustom2Value: hit?.royaltyFlag
                    ? hit?.royaltyFlag
                    : false,
                  dataItemCustom3Value: hit?.authorInfo ? hit?.authorInfo : '',
                  dataItemCustom4Value:
                    cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
                  digitalFileGuid: hit.digitalFileGuid,
                  productReleaseDate: hit.dateTimeStamp,
                }}
              />
              {hit.type === 'collection' ? (
                hasMemberBookPrice ? (
                  <Box>
                    <Box
                      display='flex'
                      justifyContent='left'
                      alignItems='center'
                    >
                      <Box mr={1}>
                        <TextStyle variant='strikeThrough'>
                          ${hit.memberOriginalPrice}
                        </TextStyle>
                      </Box>
                      <Box>
                        <TextStyle variant='h3' color='#0C8671'>
                          ${hit.memberDiscountedPrice}
                        </TextStyle>
                      </Box>
                    </Box>
                    <Box
                      display='flex'
                      justifyContent='left'
                      alignItems='center'
                    >
                      <Box mr={1}>
                        <TextStyle variant='smallStrikeThrough'>
                          ${hit.originalPrice}
                        </TextStyle>
                      </Box>
                      <Box mr={1}>
                        <TextStyle variant='subtitle2' color='#0C8671'>
                          ${hit.discountedPrice}
                        </TextStyle>
                      </Box>
                      <Box>
                        <TextStyle variant='subtitle2'>
                          {' '}
                          non-member price{' '}
                        </TextStyle>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box
                      display='flex'
                      justifyContent='left'
                      alignItems='center'
                    >
                      <Box mr={1}>
                        <TextStyle variant='strikeThrough'>
                          ${hit.originalPrice}
                        </TextStyle>
                      </Box>
                      <Box>
                        <TextStyle variant='h3' color='#0C8671'>
                          ${hit.discountedPrice}
                        </TextStyle>
                      </Box>
                    </Box>
                    <Box
                      display='flex'
                      justifyContent='left'
                      alignItems='center'
                    >
                      <Box mr={1}>
                        <TextStyle variant='smallStrikeThrough'>
                          ${hit.memberOriginalPrice}
                        </TextStyle>
                      </Box>
                      <Box mr={1}>
                        <TextStyle variant='subtitle2' color='#0C8671'>
                          ${hit.memberDiscountedPrice}
                        </TextStyle>
                      </Box>
                      <Box
                        display='flex'
                        justifyContent='left'
                        alignItems='center'
                      >
                        <Box mr={1}>
                          <TextStyle variant='subtitle2'>
                            {' '}
                            member price{' '}
                          </TextStyle>
                        </Box>
                        <Link href={paths.subscribe}>
                          <a>
                            <Typography variant='medium-link' color='#005E47'>
                              {'join now'}
                            </Typography>
                          </a>
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                )
              ) : hasMemberBookPrice ? (
                <Box>
                  <TextStyle variant='h3'>$ {hit.priceMember}</TextStyle>
                  <TextStyle variant='subtitle2'>
                    $ {hit.priceNonmember} non-member price
                  </TextStyle>
                </Box>
              ) : (
                <Box>
                  <TextStyle variant='h3'>$ {hit.priceNonmember}</TextStyle>
                  <TextStyle variant='subtitle2'>
                    $ {hit.priceMember} member price{' '}
                    <Link href={paths.subscribe}>
                      <a>
                        <Typography variant='medium-link' color='#005E47'>
                          {'join now'}
                        </Typography>
                      </a>
                    </Link>
                  </TextStyle>
                </Box>
              )}
            </Box>
          )}
          <Box className={classes.searchResultsCardContentInfoBlock}>
            {/* When uncomment Social buttons below, make adjustments to marginBottom for .searchResultsCardContentInfoBlock to make it aligned with the bottom of tallest image*/}
            {/* <Button startIcon={<PlaylistAddIcon />}>
              SAVE
            </Button>
            <Button startIcon={<ReplyIcon />} className={classes.flip}>
              SHARE
            </Button> */}
            {hit.dateTimeStamp && (
              <Typography
                variant='caption'
                className={classes.searchResultsCardContentInfoBlockDate}
              >
                {dateFormat(yyyymmdd + 'T00:00:00', 'mmmm d, yyyy')}
              </Typography>
            )}
          </Box>
        </Box>
        <Box className={classes.searchResultsCardMedia}>
          <Box className={classes.searchResultsCardMediaContainer}>
            <img
              src={
                hit.thumbnail
                  ? hit.thumbnail +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : '/images/ASCDImageFiller.png'
              }
              alt='card image'
            />
            {hit.type == 'video' || hit.type == 'podcast' ? (
              <img
                alt=''
                src='/images/playButton.svg'
                className={classes.playicon}
              />
            ) : null}
          </Box>
        </Box>
      </a>
    </Box>
  )
}
