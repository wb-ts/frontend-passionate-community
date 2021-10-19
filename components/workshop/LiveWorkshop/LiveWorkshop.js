import React, { useState, useEffect, useContext } from 'react'

import {
  Box,
  Button,
  List,
  ListItem,
  makeStyles,
  Select,
  MenuItem,
} from '@material-ui/core'
import {
  AccessTime as AccessTimeIcon,
  MenuBook as MenuBookIcon,
} from '@material-ui/icons'
import TextStyle from '@/components/atoms/TextStyle'
import { AppContext } from '@/context/state'
import {
  validatePaidMembership,
  hasMemberBookPrice,
} from '@/lib/access-validator'
import SnipcartButton from '@/components/Snipcart/SnipcartButton'
import { addItemsToCart } from '@/components/Snipcart/SnipcartManager'
import ShareButtons from '@/components/molecules/sharebuttons'
import paths from '@/paths/path'
import { PropTypes } from 'prop-types'

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
    maxWidth: '145px',
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
    border: '2px solid #fff',
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
  clockHours,
  variations,
  mediaImg,
  bookCartItems,
}) {
  const classes = useStyles()
  const [otherDates, setOtherDates] = useState(variations[0]?.variationId)
  const [selectedVariation, setSelectedVariation] = useState(variations[0])
  const [sessions, setSessions] = useState([])
  const [variantPrice, setVariantPrice] = useState(0)
  const { userAccessData } = useContext(AppContext)
  const useMemberPrice = validatePaidMembership(userAccessData)
  const useMemberBookPrice = hasMemberBookPrice(userAccessData)
  const [seatsRemaining, setSeatsRemaining] = useState(0)
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
    setSeatsRemaining(currentVariation.seatsRemaining)
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
    })
  }, [otherDates])
  return (
    <Box className={classes.liveWorkshopContainer}>
      <TextStyle variant='sessionDate'>Live Workshops</TextStyle>
      <TextStyle variant='sessionDate' className={classes.dateTime}>
        {sessions.length > 1 ? `${sessions.length} Sessions` : '1 Session'} for{' '}
        {clockHours}
      </TextStyle>
      <TextStyle className={classes.title}>
        {seatsRemaining > 0
          ? `ONLY {seatsRemaining} SEATS REMAINING`
          : `NO SEATS REMAINING`}
      </TextStyle>
      <Box className={classes.sessions}>
        <List>
          {sessions.map((session, idx) => (
            <ListItem key={idx} className={classes.sessionItem}>
              <TextStyle variant='overlineLarge'>{session.title}</TextStyle>
              <TextStyle variant='sessionDate'>{session.startDate}</TextStyle>
              <TextStyle variant='h7'>
                {session.startTime}-{session.endTime}
              </TextStyle>
            </ListItem>
          ))}
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
        <AccessTimeIcon className={classes.itemIcon} />
        <Box>
          <Box className={classes.subtitle}>1 PM to 5:15 PM EST</Box>
        </Box>
      </Box>
      <Box display='flex' mt={[2, 3]}>
        <MenuBookIcon className={classes.itemIcon} />
        <Box>
          <TextStyle className={classes.subtitle}>
            Required Materials - ${materialPrice.toFixed(2)}
          </TextStyle>
          <TextStyle className={classes.description}>
            Differentiation in the Elementary Grades: Strategies to Engage &
            Equip All Learners
          </TextStyle>
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
            dataItemCustom1Value: selectedVariation.taxJarId,
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
          Questions? <a className={classes.description}>Checkout our FAQ</a>
        </TextStyle>
        {/* </Button> */}
      </Box>
    </Box>
  )
}

LiveWorkshop.propTypes = {
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
