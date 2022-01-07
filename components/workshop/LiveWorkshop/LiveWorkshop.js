import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { MenuBook as MenuBookIcon } from '@mui/icons-material'
import { Box, Button, List, ListItem, Select, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { PropTypes } from 'prop-types'
import {
  hasMemberBookPriceVar,
  hasPaidMembershipVar,
} from '../../../lib/apollo-client/cache'
import { convertTimeToLocaleTimeWithDST, pathName } from '../../../lib/utils'
import paths from '../../../paths/path'
import TextStyle from '../../atoms/TextStyle'
import ShareButtons from '../../molecules/sharebuttons'
import { SnipcartButton } from '../../Snipcart'
import { addItemsToCart } from '../../Snipcart/SnipcartManager'

const InventorySummary = dynamic(() => import('../../info/InventorySummary'), {
  ssr: false,
})

const useStyles = makeStyles((theme) => ({
  liveWorkshopContainer: {
    backgroundColor: theme.palette.grey.extraLight,
    padding: '20px',
  },
  dateTime: {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '28px',
    letterSpacing: '2%',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '30px',
    color: theme.palette.primary.light,
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
  },
  description: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.primary.main,
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '100%',
  },
  itemIcon: {
    fontSize: '15px',
    marginRight: '8px',
  },
  select: {
    width: '136px',
    fontSize: theme.typography.pxToRem(13),
    lineHeight: theme.typography.pxToRem(18),
    fontWeight: 600,
    marginRight: 16,
    padding: '0 8px',
    border: 'solid 1px ' + theme.palette.text.primary,
    borderRadius: '5px',
    '&::before': {
      content: 'unset',
    },
  },
  selectIcon: {
    color: theme.palette.text.primary,
  },
  sessions: {
    width: '100%',
    maxWidth: '592px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
    },
  },

  sessionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: '20px 0',
    borderBottom: 'solid 1px ' + theme.palette.text.primary,
    '&:last-child': {
      borderBottom: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },

  snipcartBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    width: '100%',
    height: 'min-content',
    padding: '10px',
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.typography.pxToRem(24),
    fontWeight: 600,
    letterSpacing: 0.2,
    '&:hover': {
      backgroundColor: theme.palette.hover.main,
      textDecoration: 'underline',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 117,
    },
  },
}))
export default function LiveWorkshop({
  slug,
  clockHours,
  variations,
  mediaImg,
  bookCartItems,
  currentVariationId,
}) {
  const classes = useStyles()
  const router = useRouter()
  const getSelectedVariation = () => {
    if (currentVariationId) {
      const foundVariation = variations?.find(
        (v) =>
          v.variationId?.toLowerCase() === currentVariationId?.toLowerCase()
      )
      return foundVariation || variations[0]
    }
    return variations[0]
  }
  const [otherDates, setOtherDates] = useState(
    getSelectedVariation().variationId
  )
  const [selectedVariation, setSelectedVariation] = useState(
    getSelectedVariation()
  )

  const [sessions, setSessions] = useState([])
  const [variantPrice, setVariantPrice] = useState(0)
  const useMemberPrice = useReactiveVar(hasPaidMembershipVar)
  const useMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  const [VariationCartItem, setVariationCartItem] = useState()
  const materialPrice = useMemberBookPrice
    ? bookCartItems.reduce(
        (sum, bookCartItem) => sum + bookCartItem.memberPrice,
        0
      )
    : bookCartItems.reduce(
        (sum, bookCartItem) => sum + bookCartItem.nonMemberPrice,
        0
      )
  const handleChange = (event) => {
    router.push(
      `${pathName()}/${event.target.value?.toLowerCase()}`,
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    )
    setOtherDates(event.target.value)
  }

  const handleRegisterWithBook = () => {
    addItemsToCart([
      VariationCartItem,
      ...bookCartItems.map((bookCartItem) => ({
        ...bookCartItem,
        dataItemPrice: useMemberBookPrice
          ? bookCartItem.memberPrice
          : bookCartItem.nonMemberPrice,
      })),
    ])
  }
  useEffect(() => {
    const currentVariation = variations.find(
      (variation) => variation.variationId === otherDates
    )

    setSelectedVariation(currentVariation)
    setSessions(currentVariation.sessions)
    setVariantPrice(
      useMemberPrice
        ? currentVariation.memberPrice
        : currentVariation.nonMemberPrice
    )

    setVariationCartItem({
      label: `Register Now $${variantPrice}`,
      dataItemId: currentVariation?.variationId,
      dataItemName: currentVariation?.title,
      dataItemImage: mediaImg,
      dataItemPrice: useMemberPrice
        ? currentVariation.memberPrice
        : currentVariation.nonMemberPrice,
      dataItemQuantity: 1,
      dataItemCustom1Value: currentVariation.taxJarId,
      dataItemCustom5Value: 'workshop',
      dataItemCustom6Value: `/workshops/${slug}?variation=${currentVariation?.variationId}`,
      dataItemCustom7Value: `${currentVariation?.sessions[0]?.startDate},  ${currentVariation?.sessions[0]?.startTime} - ${currentVariation?.sessions[0]?.endTime}`,
    })
  }, [otherDates, useMemberPrice])

  if (sessions && sessions[0]) {
  }
  return (
    <Box className={classes.liveWorkshopContainer}>
      <TextStyle variant='sessionDate'>Live Workshops</TextStyle>
      <TextStyle variant='sessionDate' className={classes.dateTime}>
        {sessions.length > 1 ? `${sessions.length} Sessions` : '1 Session'} for{' '}
        {clockHours}
      </TextStyle>
      <InventorySummary id={selectedVariation?.variationId} />
      <Box className={classes.sessions}>
        <List>
          {sessions.map((session, idx) => {
            return (
              <ListItem key={idx} className={classes.sessionItem}>
                <TextStyle variant='body3'>
                  {session.displayTitle || session.title}
                </TextStyle>
                <TextStyle variant='sessionDate'>{session.startDate}</TextStyle>
                <TextStyle variant='h7'>
                  {session.startTime}-{session.endTime}
                </TextStyle>
              </ListItem>
            )
          })}
        </List>
      </Box>
      <Box display='flex' mt={[2, 3]}>
        {variations.length > 1 && (
          <Select
            className={classes.select}
            value={otherDates}
            displayEmpty
            onChange={handleChange}
            inputProps={{
              classes: {
                icon: classes.selectIcon,
              },
            }}
          >
            {variations.map((variation, idx) => (
              <MenuItem
                value={variation.variationId}
                key={variation.variationId}
              >
                <TextStyle variant='h7'>{variation.dateRange}</TextStyle>
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>
      <Box display='flex' mt={[2, 3]}>
        <MenuBookIcon className={classes.itemIcon} />
        <Box>
          <TextStyle className={classes.subtitle}>
            Required Materials - ${materialPrice.toFixed(2)}
          </TextStyle>
          {bookCartItems?.map((book, i) => (
            <TextStyle className={classes.description} key={i}>
              {book.dataItemBookName}
            </TextStyle>
          ))}
        </Box>
      </Box>
      <Box mt={[2, 3]}>
        <SnipcartButton
          className={classes.snipcartBtn}
          snipcart={{
            label: `Register Now $${variantPrice?.toFixed(2)}`,
            dataItemId: selectedVariation?.variationId,
            dataItemName: selectedVariation?.title,
            dataItemImage: mediaImg,
            dataItemPrice: variantPrice,
            dataItemQuantity: 1,
            dataItemCustom1Value: selectedVariation?.taxJarId,
            dataItemCustom5Value: 'workshop',
            dataItemCustom6Value: `/workshops/${slug}?variation=${selectedVariation?.variationId}`,
            dataItemCustom7Value: `${selectedVariation?.sessions[0]?.startDate},  ${selectedVariation?.sessions[0]?.startTime} - ${selectedVariation?.sessions[0]?.endTime}`,
          }}
        />
      </Box>
      <Box mt={[2, 3]}>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          size='large'
          onClick={handleRegisterWithBook}
        >
          Register Now with Book ${(materialPrice + variantPrice).toFixed(2)}
        </Button>
      </Box>
      <Box mt={[2, 3]} display='flex' justifyContent='center'>
        {/* <Button
          variant='contained'
          fullWidth
          size='large'
          startIcon={<img src='/images/share.svg' alt='share' />}
        >
          <TextStyle variant='buttonSmall'>SHARE</TextStyle>
        </Button> */}
        <Box>
          <ShareButtons url={paths.workshop({ slug: '' })} title={''} />
        </Box>
        <Box display='flex' alignItems='center'>
          <TextStyle variant='buttonSmall'>SHARE</TextStyle>
        </Box>
      </Box>
      <Box mt={[2]} display='flex' justifyContent='center'>
        {/* <Button variant='contained' fullWidth size='large'> */}
        <TextStyle variant='buttonMedium'>
          Questions? <a className={classes.description}>Check out our FAQ</a>
        </TextStyle>
        {/* </Button> */}
      </Box>
    </Box>
  )
}

LiveWorkshop.propTypes = {
  slug: PropTypes.string,
  clockHours: PropTypes.string,
  mediaImg: PropTypes.string,
  variations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variationId: PropTypes.string,
      nonMemberPrice: PropTypes.number,
      memberPrice: PropTypes.number,
      taxJarId: PropTypes.string,
      dateRange: PropTypes.string,
      seatsRemaining: PropTypes.number,
      sessions: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          sessionId: PropTypes.string,
          startDate: PropTypes.string,
          endTime: PropTypes.string,
        })
      ),
    })
  ),
  bookCartItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      dataItemId: PropTypes.string,
      dataItemName: PropTypes.string,
      dataItemUrl: PropTypes.string,
      dataItemImage: PropTypes.string,
      dataItemDescription: PropTypes.object,
      memberPrice: PropTypes.number,
      nonMemberPrice: PropTypes.number,
      dataItemCustom1Value: PropTypes.string,
      dataItemCustom2Value: PropTypes.bool,
      dataItemCustom3value: PropTypes.arrayOf(PropTypes.string),
      dataItemCustom4Value: PropTypes.bool,
      dataItemQuantity: PropTypes.number,
      digitalFileGuid: PropTypes.string,
      productReleaseDate: PropTypes.string,
    })
  ),
}
