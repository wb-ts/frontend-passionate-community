import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LoyaltySharpIcon from '@mui/icons-material/LoyaltySharp'
import { Box, Grid, Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FilterDropdown from '../../components/atoms/FilterDropdown'
import TextStyle from '../../components/atoms/TextStyle'
import BookBannerPrice from '../../components/molecules/bookbannerprice'
import SnipcartButton from '../../components/Snipcart/SnipcartButton'
import { imageoptimization, constSnipcart } from '../../const'
import { hasMemberBookPriceVar } from '../../lib/apollo-client/cache'
import { contentfulThumbnailAPIToImageUrl } from '../../lib/data-transformations'
import { getCartButtonCaptionLabel } from '../../lib/utils'
import paths from '../../paths/path'
import NextImageWrapper from '../images/NextImageWrapper'
import ImageCarousel from '../molecules/ImageCarousel'

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    boxShadow: theme.shadows[10],
    padding: 0,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  snipcartBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    border: '2px solid #fff',
    '&:hover': {
      backgroundColor: theme.palette.hover.main,
      textDecoration: 'underline',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 117,
    },
  },
  icons: {
    width: '32px',
    left: '20px',
    top: '29.49 %',
    bottom: '29.49 %',
    color: '#969696',
  },
  shippingDetails: {
    color: (props) => (props.noColor ? 'transparent' : '#546366'),
  },
}))

export default function BookBanner({
  book,
  productNumber,
  updateProductNumber,
  showShipping,
  ...props
}) {
  const classes = useStyles()
  const router = useRouter()
  const isCollection = book.sys.contentType.sys.id === 'collection'
  const [qty, setQty] = useState(1)
  const [version, setVersion] = useState(
    !isCollection
      ? productNumber
        ? book.fields.bookVersions.find(
            (version) => version?.fields?.productNumber == productNumber
          ) || book.fields.bookVersions[0]
        : book.fields.bookVersions[0]
      : ''
  )

  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)

  const changeVersion = (productNumber) => {
    const newVersion = book.fields.bookVersions.find(
      (version) => version.fields.productNumber == productNumber
    )
    updateProductNumber(productNumber)
    setVersion(newVersion)

    router.push(
      {
        pathname: `/books/${book.fields.slug}`,
        query: { variant: productNumber },
      },
      undefined,
      { shallow: true }
    )
  }

  const imgUrl = contentfulThumbnailAPIToImageUrl(book.fields?.thumbnail)
  const collection = book
  const bookImages = isCollection
    ? [imgUrl].concat(
        collection.fields.items.map((book) =>
          contentfulThumbnailAPIToImageUrl(book.fields?.thumbnail)
        )
      )
    : null

  const cartButtonCaptionLabel = getCartButtonCaptionLabel(
    version?.fields?.dateRelease
  )

  return (
    <Grid container alignItems='center' spacing={5}>
      <Grid item xs={12} md={5} className={classes.media}>
        {isCollection ? (
          <ImageCarousel images={bookImages} />
        ) : (
          <NextImageWrapper
            src={imgUrl}
            alt={`Book banner image for ${book.fields.thumbnail?.fields?.title}`}
            className={classes.image}
            width={307}
            height={428}
          />
        )}
      </Grid>
      <Grid item xs={12} md={7} className={classes.details}>
        <Box my={1}>
          <TextStyle variant='h2'>{book.fields.title}</TextStyle>
        </Box>
        <Box my={1} display='flex' alignItems='center' flexWrap='wrap'>
          <Box mr={1}>
            {isCollection ? (
              <Link href={paths.search({ types: ['collection'] })}>
                <a>
                  <Typography variant='medium-link' color='#005E47'>
                    {'ASCD Collections'}
                  </Typography>
                </a>
              </Link>
            ) : (
              <TextStyle variant='body3'>By </TextStyle>
            )}
          </Box>
          {book?.fields?.authors &&
            book.fields.authors.map((author, key) => (
              <React.Fragment key={key}>
                <Link href={paths.author({ slug: author.fields?.slug })}>
                  <a>
                    <Typography variant='medium-link' color='#005E47'>
                      {`${author.fields?.firstName} ${author.fields?.lastName}`}
                      {key < book.fields.authors.length - 1 ? ',' : ''}
                    </Typography>
                  </a>
                </Link>
                &nbsp;
              </React.Fragment>
            ))}
        </Box>
        <Box my={1}>
          <BookBannerPrice
            collection={isCollection ? book : ''}
            version={!isCollection ? version : ''}
            versions={!isCollection ? book.fields.bookVersions : ''}
            onchange={(pn) => changeVersion(pn)}
            hasMemberBookPrice={hasMemberBookPrice}
          />
        </Box>
        <Box my={1} display='flex' alignItems='center'>
          <FilterDropdown
            items={[1, 2, 3, 4, 5]}
            defaultValue={1}
            action={(filterVal) => setQty(filterVal)}
            marginLeft='0'
            height='40px'
            width='65px'
          />
          {version && (
            <SnipcartButton
              className={classes.snipcartBtn}
              snipcart={{
                label: cartButtonCaptionLabel,
                dataItemId: version.fields?.productNumber,
                dataItemName: version.fields?.title,
                dataItemUrl: book.fields.slug,
                dataItemImage: imgUrl,
                dataItemDescription: book.fields.description,
                dataItemPrice: hasMemberBookPrice
                  ? version.fields?.priceMember
                  : version.fields?.priceNonMember,
                dataItemCustom1Value: version?.fields?.taxJar?.fields?.taxJarId
                  ? version.fields.taxJar.fields.taxJarId
                  : '',
                dataItemCustom2Value: version?.fields?.royaltyFlag
                  ? version?.fields?.royaltyFlag
                  : false,
                dataItemCustom3Value: book.fields.authors?.map(
                  (author) =>
                    author.fields?.title +
                    (author.fields?.email ? '/' + author.fields?.email : '')
                ),
                dataItemCustom4Value:
                  cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
                dataItemQuantity: qty,
                digitalFileGuid: version.fields?.digitalFileGuid,
                productReleaseDate: version?.fields?.dateRelease,
              }}
            />
          )}
          {isCollection && (
            <SnipcartButton
              className={classes.snipcartBtn}
              snipcart={{
                label: 'Add to Cart',
                dataItemId: book.fields?.productNumber,
                dataItemName: book.fields.title,
                dataItemUrl: book.fields.slug,
                dataItemImage: imgUrl,
                dataItemDescription: book.fields.description,
                dataItemPrice: hasMemberBookPrice
                  ? book.fields?.memberDiscountedPrice
                  : book.fields?.discountedPrice,
                dataItemCustom1Value: book?.fields?.taxJar?.fields?.taxJarId
                  ? book.fields.taxJar.fields.taxJarId
                  : '',
                dataItemQuantity: qty,
              }}
            />
          )}
        </Box>
        {showShipping && (
          <Box my={1}>
            <Divider />
            <Box my={1}>
              <Box display='flex' alignItems='center'>
                <Box mr={1}>
                  <LocalShippingIcon className={classes.icons} />
                </Box>
                <Box display='inline'>
                  <Box>
                    {' '}
                    <TextStyle variant='h6'>Ships in 1-3 days</TextStyle>
                  </Box>
                  <Box className={classes.shippingDetails}>
                    <TextStyle variant='caption'>
                      Free shipping on orders over $50
                    </TextStyle>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box my={1}>
              <Box display='flex' alignItems='center'>
                <Box mr={1}>
                  <LoyaltySharpIcon className={classes.icons} />
                </Box>
                <Box display='inline'>
                  <Box>
                    {' '}
                    <TextStyle variant='h6'>Discounts</TextStyle>
                  </Box>
                  <Box className={classes.shippingDetails}>
                    <TextStyle variant='caption'>
                      Buy 15 books, save 35%
                    </TextStyle>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
          </Box>
        )}
      </Grid>
    </Grid>
  )
}
