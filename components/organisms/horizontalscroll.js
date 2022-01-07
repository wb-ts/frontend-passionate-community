import React, { useContext, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { imageoptimization, constSnipcart } from '../../const'
import { hasMemberBookPriceVar } from '../../lib/apollo-client/cache'
import { getCartButtonCaptionLabel } from '../../lib/utils'
import ViewAllCTA from '../atoms/ViewAllCTA'
import CartTile from '../molecules/carttile'
import IssueTile from '../molecules/issuetile'

const useStyles = makeStyles((theme) => ({
  gridScrollable: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    maxWidth: '1600px',
    overflowX: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  title: {
    color: theme.palette.primary.light,
  },
  container: {
    position: 'relative',
    maxWidth: '1600px',
    [theme.breakpoints.down('lg')]: {
      marginRight: '-16px',
    },
    [theme.breakpoints.down('lg')]: {
      marginRight: '-8px',
    },
  },
  gridItem: {
    paddingBottom: `30px !important`,
  },
  sliderLeftCartTile: {},
  sliderRightCartTile: {},
  sliderLeft: {
    position: 'absolute',
    left: -22,
    top: 'calc(50% - 68px)',
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
      left: -30,
    },
    '&$sliderLeftCartTile': {
      top: 'calc(50% - 50px)',
    },
  },
  sliderRight: {
    position: 'absolute',
    right: 2,
    top: 'calc(50% - 68px)',
    zIndex: 1,
    display: (length) => (length > 2 ? 'block' : 'none'),
    [theme.breakpoints.up('md')]: {
      right: -25,
      display: (length) => (length > 4 ? 'block' : 'none'),
    },
    [theme.breakpoints.up('sm')]: {
      right: -5,
    },
    '&$sliderRightCartTile': {
      top: 'calc(50% - 50px)',
    },
  },
  sliderBtn: {
    width: 40,
    height: 40,
    marginLeft: 20,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.light,
    border: '1px solid #C5CED1',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.03), 0px 2px 8px rgba(0, 0, 0, 0.04), 0px 3px 3px rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: theme.palette.hover.main,
      color: theme.palette.text.secondary,
      border: '1px solid #0C8671',
    },
    '& svg': {
      width: 28,
      height: 28,
    },
  },
}))

export default function HorizontalScroll({
  title,
  ctaLabel = 'View all ',
  ctaLink = '/',
  items,
  type,
}) {
  const classes = useStyles(items.length)
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)

  const scrollerRef = React.createRef()

  //To refactor later to acheve proper show/hide arrows logic
  const [sliderLeftArrow, showSliderLeftArrow] = React.useState(false)
  const [sliderRightArrow, showSliderRightArrow] = React.useState(true)

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  function isElementVisible(el) {
    var rect = el.getBoundingClientRect(),
      efp = function (x, y) {
        return document.elementFromPoint(x, y)
      }

    return el.contains(efp(rect.left, rect.top))
  }

  const slideWidth = () => {
    const childWidth = scrollerRef.current.firstElementChild.clientWidth
    const containerWidth = scrollerRef.current.clientWidth
    const containerLeftPadding = parseFloat(
      window
        .getComputedStyle(scrollerRef.current)
        .getPropertyValue('padding-left')
    )
    const scrollwidth = containerWidth - (childWidth + containerLeftPadding)
    return scrollwidth
  }

  const goLeft = async () => {
    const el = scrollerRef.current.firstElementChild
    scrollerRef.current.scrollBy({
      left: -slideWidth(),
      top: 0,
      behavior: 'smooth',
    })
    showSliderRightArrow(true)

    await sleep(500)

    if (isElementVisible(el)) {
      showSliderLeftArrow(false)
    }
  }

  const goRight = async () => {
    const el = scrollerRef.current.lastElementChild
    scrollerRef.current.scrollBy({
      left: slideWidth(),
      top: 0,
      behavior: 'smooth',
    })
    showSliderLeftArrow(true)

    await sleep(500)

    if (isElementVisible(el)) {
      showSliderRightArrow(false)
    }
  }

  const sliderItems = items.slice(0, 12)

  const _renderSliderLeft = () => {
    if (sliderLeftArrow) {
      return (
        <Box
          className={
            type == 'carttile'
              ? `${classes.sliderLeft} ${classes.sliderLeftCartTile}`
              : classes.sliderLeft
          }
        >
          <IconButton
            aria-label='slide left'
            className={classes.sliderBtn}
            onClick={() => goLeft()}
            size='large'
          >
            <KeyboardArrowLeftIcon style={{ fontSize: 65 }} />
          </IconButton>
        </Box>
      )
    } else {
      return
    }
  }

  const _renderSliderRight = () => {
    if (sliderRightArrow) {
      return (
        <Box
          className={
            type == 'carttile'
              ? `${classes.sliderRight} ${classes.sliderRightCartTile}`
              : classes.sliderRight
          }
        >
          <IconButton
            aria-label='slide right'
            className={classes.sliderBtn}
            onClick={() => goRight()}
            size='large'
          >
            <KeyboardArrowRightIcon style={{ fontSize: 65 }} />
          </IconButton>
        </Box>
      )
    } else {
      return
    }
  }

  let cartButtonCaptionLabel = ''

  const _renderCartTile = (items) => {
    return items.map((item) => {
      return item.fields.bookVersions?.map((version) => (
        <Grid
          item
          key={version.fields?.productNumber}
          className={classes.gridItem}
        >
          {
            (cartButtonCaptionLabel = getCartButtonCaptionLabel(
              version.fields?.dateRelease
            ))
          }
          <CartTile
            item={item}
            snipcart={{
              label: cartButtonCaptionLabel,
              dataItemId: version.fields?.productNumber,
              dataItemName: version.fields?.title,
              dataItemAuthors: item.fields?.authors,
              dataItemUrl: item.fields?.slug,
              dataItemImage: item.fields?.thumbnail?.fields?.imageBynder
                ? item.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                  '?' +
                  imageoptimization.qualityParameter +
                  '=' +
                  imageoptimization.qualityValue
                : item.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                    ?.url
                ? item.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                    ?.url +
                  '?' +
                  imageoptimization.qualityParameter +
                  '=' +
                  imageoptimization.qualityValue
                : '/images/ASCDImageFiller.png',
              dataItemDescription: item.fields?.description,
              dataItemPrice: hasMemberBookPrice
                ? version.fields?.priceMember
                : version.fields?.priceNonMember,
              dataItemCustom1Value: version?.fields?.taxJar?.fields?.taxJarId
                ? version.fields.taxJar.fields.taxJarId
                : '',
              dataItemCustom2Value: version?.fields?.royaltyFlag
                ? version?.fields?.royaltyFlag
                : false,
              dataItemCustom3Value: item.fields.authors.map(
                (author) =>
                  author.fields?.title +
                  (author.fields?.email ? '/' + author.fields?.email : '')
              ),
              dataItemCustom4Value:
                cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
              digitalFileGuid: version.fields?.digitalFileGuid,
              productReleaseDate: version.fields?.dateRelease,
            }}
          />
        </Grid>
      ))
    })
  }

  const _renderCollectionTile = (items) => {
    return items.map((item) => (
      <Grid item key={item.fields?.productNumber} className={classes.gridItem}>
        <CartTile
          variant='collection'
          item={item}
          hasMemberBookPrice={hasMemberBookPrice}
          snipcart={{
            label: 'Add to Cart',
            dataItemId: item.fields?.productNumber,
            dataItemName: item.fields?.title,
            dataItemUrl: item.fields?.slug,
            dataItemImage: item.fields?.thumbnail?.fields?.imageBynder
              ? item.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                '?' +
                imageoptimization.qualityParameter +
                '=' +
                imageoptimization.qualityValue
              : item.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                  ?.url
              ? item.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                  ?.url +
                '?' +
                imageoptimization.qualityParameter +
                '=' +
                imageoptimization.qualityValue
              : '/images/ASCDImageFiller.png',
            dataItemDescription: item.fields?.description,
            dataItemPrice: hasMemberBookPrice
              ? item.fields?.memberDiscountedPrice
              : item.fields?.discountedPrice,
            dataItemCustom1Value: item?.fields?.taxJar?.fields?.taxJarId
              ? item.fields.taxJar.fields.taxJarId
              : '',
          }}
        />
      </Grid>
    ))
  }

  const _renderIssueTile = (items) => {
    return items.map((item) => (
      <Grid item key={item.fields.issueNo} className={classes.gridItem}>
        <IssueTile
          slug={item.fields.slug}
          imageUrl={
            item.fields?.thumbnail?.fields?.imageBynder
              ? item.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                '?' +
                imageoptimization.qualityParameter +
                '=' +
                imageoptimization.qualityValue
              : item.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                  ?.url
              ? item.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                  ?.url +
                '?' +
                imageoptimization.qualityParameter +
                '=' +
                imageoptimization.qualityValue
              : '/images/ASCDImageFiller.png'
          }
          title={item.fields?.alternate}
          issue={item}
        />
      </Grid>
    ))
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography component='h2' variant='h4'>
          {title}
        </Typography>
        <ViewAllCTA href={ctaLink} label={ctaLabel} lg />
      </Box>

      <Box mt={1} ml={-1.25} className={classes.container}>
        <Grid
          container
          spacing={2}
          ref={scrollerRef}
          className={classes.gridScrollable}
        >
          {type == 'carttile' && _renderCartTile(sliderItems)}
          {type == 'issuetile' && _renderIssueTile(sliderItems)}
          {type == 'collectiontile' && _renderCollectionTile(sliderItems)}
        </Grid>
        {_renderSliderLeft()}
        {_renderSliderRight()}
      </Box>
    </>
  )
}
