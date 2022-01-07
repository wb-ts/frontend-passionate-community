import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { MenuBook as MenuBookIcon } from '@mui/icons-material'
import {
  Box,
  List,
  ListItem,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { PropTypes } from 'prop-types'
import {
  hasMemberBookPriceVar,
  hasPaidMembershipVar,
} from '../../../lib/apollo-client/cache'
import {
  formatDateToCalendarLong,
  formatDateToTime,
  formatDateRangeToCalendarShort,
  pathName,
} from '../../../lib/utils'
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
export default function WorkshopSectionTopRight({
  workshop,
  selectedVariationId,
}) {
  // console.log('Workshop: ', workshop)
  /**
   * @todo find a more reusable solution for this
   */
  const mediaImg = workshop.spotlightImage?.imageBynder
    ? workshop.spotlightImage?.imageBynder[0]?.src.startsWith('//')
      ? 'https:' + workshop.spotlightImage?.imageBynder[0]?.src
      : workshop.spotlightImage?.imageBynder[0]?.src
    : workshop.spotlightImage?.imageContentful?.url
    ? workshop.spotlightImage?.imageContentful?.url.startsWith('//')
      ? 'https:' + workshop.spotlightImage?.imageContentful?.url
      : workshop.spotlightImage?.imageContentful?.url
    : '/images/ASCDImageFiller.png'

  const classes = useStyles()
  const router = useRouter()

  const getSelectedVariation = (variationId) => {
    const variation = variationId
      ? workshop?.variations?.items?.find(
          (v) => v.variationId?.toLowerCase() === variationId?.toLowerCase()
        )
      : workshop?.variations?.items[0]

    return variation || workshop?.variations?.items[0]
  }

  const [selectedVariation, setSelectedVariation] = useState(
    getSelectedVariation(selectedVariationId)
  )

  const handleChangeVariation = (event) => {
    setSelectedVariation(getSelectedVariation(event.target.value))
    console.log(pathName())
    if (
      !pathName()
        ?.toLowerCase()
        .includes(selectedVariation.variationId.toLowerCase())
    ) {
      router.push(
        `/workshops/${
          workshop.slug
        }/${selectedVariation.variationId.toLowerCase()}`,
        undefined,
        {
          scroll: false,
          shallow: true,
        }
      )
    }
  }

  const useMemberPrice = useReactiveVar(hasPaidMembershipVar)
  const useMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)

  const RequiredMaterials = () => {
    return (
      <>
        {workshop.materials?.items.length > 0 && (
          <>
            <MenuBookIcon className={classes.itemIcon} />
            <Box>
              <TextStyle className={classes.subtitle}>
                Required Materials - ${materialsPrice.toFixed(2)}
              </TextStyle>
              {workshop.materials?.items?.map((item, i) => (
                <TextStyle className={classes.description} key={i}>
                  {item.title}
                </TextStyle>
              ))}
            </Box>
          </>
        )}
      </>
    )
  }

  const getSelectedVariantPrice = () =>
    selectedVariation
      ? useMemberPrice
        ? selectedVariation.memberPrice
        : selectedVariation.nonMemberPrice
      : 0
  const [variantPrice, setVariantPrice] = useState(getSelectedVariantPrice())
  const [materialsPrice, setMaterialsPrice] = useState(0)
  const [VariationCartItem, setVariationCartItem] = useState()

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
    if (selectedVariation) {
      setVariantPrice(getSelectedVariantPrice())

      setVariationCartItem({
        label: `Register Now $${variantPrice}`,
        dataItemId: selectedVariation?.variationId,
        dataItemName: selectedVariation?.title,
        dataItemImage: mediaImg,
        dataItemPrice: useMemberPrice
          ? selectedVariation.memberPrice
          : selectedVariation.nonMemberPrice,
        dataItemQuantity: 1,
        dataItemCustom1Value: selectedVariation.taxJarId,
        dataItemCustom5Value: 'workshop',
        dataItemCustom6Value: `/workshops/${workshop.slug}?variation=${selectedVariation?.variationId}`,
        dataItemCustom7Value: `${selectedVariation?.sessions[0]?.startDate},  ${selectedVariation?.sessions[0]?.startTime} - ${selectedVariation?.sessions[0]?.endTime}`,
      })
    }
  }, [selectedVariation, useMemberPrice])

  useEffect(() => {
    if (selectedVariation) {
      const getMaterialsPrice = () => {
        if (workshop.materials?.items.length > 0) {
          return workshop.materials?.items.reduce((sum, item) => {
            let itemSum = 0
            switch (item['__typename']) {
              case 'Book':
                itemSum = item.versions.items.reduce(
                  (sum, bookVersion) =>
                    sum +
                    (useMemberBookPrice
                      ? bookVersion.priceMember
                      : bookVersion.priceNonMember),
                  0
                )
                break
            }
            return sum + itemSum
          }, 0)
        }
        return 0
      }
      setMaterialsPrice(getMaterialsPrice())
    }
  }, [useMemberBookPrice])

  // console.log('Selected Variation: ', selectedVariation)

  return (
    <>
      {selectedVariation ? (
        <Box className={classes.liveWorkshopContainer}>
          <TextStyle variant='sessionDate'>Live Workshops</TextStyle>
          <TextStyle variant='sessionDate' className={classes.dateTime}>
            {selectedVariation.sessions.items.length > 1
              ? `${selectedVariation.sessions.items.length} Sessions`
              : '1 Session'}{' '}
            for {`${workshop.clockHours} Clock Hours`}
          </TextStyle>
          <InventorySummary id={selectedVariation?.variationId} />
          <Box className={classes.sessions}>
            <List>
              {selectedVariation.sessions.items.map((session, idx) => (
                <ListItem key={idx} className={classes.sessionItem}>
                  <TextStyle variant='body3'>
                    {session.displayTitle || session.title}
                  </TextStyle>
                  <TextStyle variant='sessionDate'>
                    {formatDateToCalendarLong(session.startDatetime)}
                  </TextStyle>
                  <TextStyle variant='h7'>
                    {formatDateToTime(session.startDatetime)}-
                    {formatDateToTime(session.endDatetime)}
                  </TextStyle>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box display='flex' mt={[2, 3]}>
            {workshop.variations.items.length > 1 && (
              <Select
                className={classes.select}
                value={selectedVariation.variationId}
                displayEmpty
                onChange={handleChangeVariation}
                inputProps={{
                  classes: {
                    icon: classes.selectIcon,
                  },
                }}
              >
                {workshop.variations.items.map((variation) => (
                  <MenuItem
                    value={variation.variationId}
                    key={variation.variationId}
                  >
                    <TextStyle variant='h7'>
                      {formatDateRangeToCalendarShort(
                        variation.sessions.items[0].startDatetime,
                        variation.sessions.items[
                          variation.sessions.items.length - 1
                        ].startDatetime
                      )}
                    </TextStyle>
                  </MenuItem>
                ))}
              </Select>
            )}
          </Box>
          <Box display='flex' mt={[2, 3]}>
            <RequiredMaterials />
          </Box>
          <Box mt={[2, 3]}>
            {variantPrice > 0 && (
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
                  dataItemCustom6Value: `/workshops/${workshop.slug}?variation=${selectedVariation?.variationId}`,
                  dataItemCustom7Value: `${formatDateToCalendarLong(
                    selectedVariation?.sessions?.items[0]?.startDatetime
                  )} ${formatDateToTime(
                    selectedVariation?.sessions?.items[0]?.startDatetime
                  )} - ${formatDateToCalendarLong(
                    selectedVariation?.sessions?.items[0]?.endDatetime
                  )} ${formatDateToTime(
                    selectedVariation?.sessions.items[0]?.endDatetime
                  )}`,
                }}
              />
            )}
          </Box>
          {/* <Box mt={[2, 3]}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              size='large'
              onClick={handleRegisterWithBook}
            >
              Register Now with Book $
              {(materialsPrice + variantPrice).toFixed(2)}
            </Button>
          </Box> */}
          <Box mt={[2, 3]} display='flex' justifyContent='center'>
            <Box>
              <ShareButtons
                url={paths.workshop({ slug: workshop.slug })}
                title={workshop.title}
              />
            </Box>
            <Box display='flex' alignItems='center'>
              <TextStyle variant='buttonSmall'>SHARE</TextStyle>
            </Box>
          </Box>
          <Box mt={[2]} display='flex' justifyContent='center'>
            <TextStyle variant='buttonMedium'>
              Questions?{' '}
              <Link href={'/faq?service=Virtual%20Author%20Workshops'}>
                <a>
                  <Typography variant='medium-link' color='#005E47'>
                    {'Check out our FAQ'}
                  </Typography>
                </a>
              </Link>
            </TextStyle>
          </Box>
        </Box>
      ) : (
        <Box className={classes.liveWorkshopContainer}>
          <TextStyle variant='sessionDate'>Live Workshops</TextStyle>
          <TextStyle variant='sessionDate'>COMING SOON</TextStyle>
        </Box>
      )}
    </>
  )
}

WorkshopSectionTopRight.propTypes = {
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
