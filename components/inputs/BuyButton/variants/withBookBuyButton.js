import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Typography, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { constSnipcart } from '../../../../const'
import { hasMemberBookPriceVar } from '../../../../lib/apollo-client/cache'

const useStyles = makeStyles((theme) => ({
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
}))

const withBookBuyButton = (WrappedComponent, book, selectedVariantId) => {
  const classes = useStyles()
  const hasMemberPricing = useReactiveVar(hasMemberBookPriceVar)

  const selectedBookVersion = book.versions.items.find(
    (version) => version.productNumber === selectedVariantId
  )
  const getCartButtonCaptionLabel = (availableDateString) => {
    const becomeAvailable = (availableDateString) => {
      const availableDate = new Date(availableDateString)
      return !isNaN(availableDate) && !(availableDate - new Date() > 0)
    }
    return becomeAvailable(availableDateString)
      ? constSnipcart.BTN_LABEL_ADD
      : constSnipcart.BTN_LABEL_PREORDER
  }

  const cartButtonCaptionLabel = getCartButtonCaptionLabel(
    selectedBookVersion?.dateRelease
  )

  const snipcartData = () => ({
    label: cartButtonCaptionLabel,
    dataItemId: selectedVariantId,
    dataItemName: selectedBookVersion.title,
    dataItemUrl: book.slug,
    dataItemImage: book.thumbnail.imgSrc,
    dataItemDescription: book.description,
    dataItemPrice: hasMemberPricing
      ? selectedBookVersion.priceMember
      : selectedBookVersion.priceNonMember,
    dataItemCustom1Value: selectedBookVersion.taxJar.taxJarId || '',
    dataItemCustom2Value: selectedBookVersion.royaltyFlag || false,
    dataItemCustom3Value: book.authors.items.map(
      (author) => author.title + (author.email ? '/' + author.email : '')
    ),
    dataItemCustom4Value:
      cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
    dataItemQuantity: 1,
    digitalFileGuid: selectedBookVersion.digitalFileGuid,
    productReleaseDate: selectedBookVersion.dateRelease,
  })

  return (
    <>
      {selectedBookVersion && (
        <WrappedComponent
          snipcart={snipcartData()}
          className={classes.snipcartBtn}
        />
      )}
    </>
  )
}

export default withBookBuyButton

/*

                label: cartButtonCaptionLabel,
                dataItemId: version.fields?.productNumber,
                dataItemName: version.fields?.title,
                dataItemUrl: book.fields.slug,
                dataItemImage: imgUrl.startsWith('//')
                  ? 'https:' + imgUrl
                  : imgUrl,
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
              */
