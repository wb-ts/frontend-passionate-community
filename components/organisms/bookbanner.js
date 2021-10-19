import React, { useState, useContext, useEffect } from 'react'
import { Box, Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'material-ui-image'
import CustomLink from '@/components/atoms/CustomLink'
import paths from '@/paths/path'
import FilterDropdown from '@/components/atoms/FilterDropdown'
import SnipcartButton from '@/components/Snipcart/SnipcartButton'
import BookBannerPrice from '@/components/molecules/bookbannerprice'
import TextStyle from '@/components/atoms/TextStyle'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import LoyaltySharpIcon from '@material-ui/icons/LoyaltySharp'
import { useRouter } from 'next/router'
import imageoptimization from '@/const/imageoptimization'
import ImageCarousel from '@/components/molecules/ImageCarousel'
import { getCartButtonCaptionLabel } from '@/lib/utils'
import constSnipcart from '@/const/snipcart'
import { useReactiveVar } from '@apollo/client'
import { hasMemberBookPriceVar } from '../../lib/apollo-client/cache'

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    boxShadow: theme.shadows[10],
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
            (version) => version.fields.productNumber == productNumber
          )
        : book.fields.bookVersions[0]
      : ''
  )

  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)

  useEffect(() => {
    if (productNumber && !isCollection) {
      setVersion(
        productNumber
          ? book.fields.bookVersions.find(
              (version) => version.fields.productNumber == productNumber
            )
          : book.fields.bookVersions[0]
      )
    }
  }, [productNumber])

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

  const imgUrl = book.fields?.thumbnail?.fields?.imageBynder
    ? book.fields?.thumbnail?.fields?.imageBynder[0]?.src +
      '?' +
      imageoptimization.qualityParameter +
      '=' +
      imageoptimization.qualityValue
    : book.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url
    ? book.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url +
      '?' +
      imageoptimization.qualityParameter +
      '=' +
      imageoptimization.qualityValue
    : '/images/ASCDImageFiller.png'

  const collection = book
  const bookImages = isCollection
    ? [imgUrl].concat(
        collection.fields.items.map((book, key) =>
          book.fields?.thumbnail?.fields?.imageBynder
            ? book.fields?.thumbnail?.fields?.imageBynder[0]?.src +
              '?' +
              imageoptimization.qualityParameter +
              '=' +
              imageoptimization.qualityValue
            : book.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url
            ? book.fields?.thumbnail?.fields?.imageContentful?.fields?.file
                ?.url +
              '?' +
              imageoptimization.qualityParameter +
              '=' +
              imageoptimization.qualityValue
            : '/images/ASCDImageFiller.png'
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
          <Image
            src={imgUrl}
            alt={`Book banner image for ${book.fields.thumbnail?.fields?.title}`}
            className={classes.image}
            imageStyle={{
              width: '307px',
              height: '428px',
            }}
            style={{
              width: '307px',
              height: '428px',
              padding: 0,
            }}
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
              <CustomLink
                href={paths.search({ types: ['collection'] })}
                label='ASCD Collections'
              ></CustomLink>
            ) : (
              <TextStyle variant='body3'>By </TextStyle>
            )}
          </Box>
          {book?.fields?.authors &&
            book.fields.authors.map((author, key) => (
              <>
                <CustomLink
                  key={`author-${key}`}
                  href={paths.author({ slug: author.fields?.slug })}
                  label={`${author.fields?.firstName} ${
                    author.fields?.lastName
                  }${key < book.fields.authors.length - 1 ? ',' : ''}`}
                />
                &nbsp;
              </>
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
                dataItemCustom3Value: book.fields.authors.map(
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

        {/* JIRA ASCD-818: start */}
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
        {/* JIRA ASCD-818: end */}
      </Grid>
    </Grid>
  )
}
