import React, { useState, Fragment } from 'react'
import Link from 'next/link'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LoyaltySharpIcon from '@mui/icons-material/LoyaltySharp'
import { Box, Typography, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import paths from '../../../../paths/path'
import NextImageWrapper from '../../../images/NextImageWrapper'
import BuyButton from '../../../inputs/BuyButton'
import PriceDisplay from '../plugins/PriceDisplay'

const useStyles = makeStyles((theme) => ({
  icons: {
    width: '32px',
    left: '20px',
    top: '29.49 %',
    bottom: '29.49 %',
    color: '#969696',
  },
}))

const withBookProductBanner = (
  WrappedComponent,
  book,
  defaultProductVariantId
) => {
  const BookImage = () => (
    <NextImageWrapper
      src={book.thumbnail.imgSrc}
      alt={book.thumbnail.alternate}
      width={307}
      height={428}
    />
  )

  const BookContent = () => {
    const classes = useStyles()
    const [selectedVariantId, setSelectedVariantId] = useState(
      defaultProductVariantId
    )

    const handlePriceOnChange = (variantId) => setSelectedVariantId(variantId)

    const prices = book.versions.items.map((version) => ({
      key: version.productNumber,
      name: version.bookType.title,
      priceNonMember: version.priceNonMember,
      priceMember: version.priceMember,
      default: version.productNumber === defaultProductVariantId,
    }))

    return (
      <>
        <Box my={1}>
          <Typography variant='h2'>{book.title}</Typography>
        </Box>
        <Box my={1} display='flex' alignItems='center' flexWrap='wrap'>
          <Box mr={1}>
            <Typography variant='body3'>By </Typography>
          </Box>
          {book.authors.items.map((author, key) => (
            <Fragment key={key}>
              <Link href={paths.author({ slug: author.slug })}>
                <a>
                  <Typography variant='medium-link' color='#005E47'>
                    {`${author.firstName} ${author.lastName}`}
                    {key < book.authors.items.length - 1 ? ',' : ''}
                  </Typography>
                </a>
              </Link>
              &nbsp;
            </Fragment>
          ))}
        </Box>
        <Box my={1}>
          <PriceDisplay
            prices={prices}
            id={book.slug}
            handleOnChange={handlePriceOnChange}
          />
        </Box>
        <Box my={1} display='flex' alignItems='center'>
          <BuyButton data={book} selectedVariantId={selectedVariantId} />
        </Box>
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
                  <Typography variant='h6'>Ships in 1-3 days</Typography>
                </Box>
                <Box className={classes.shippingDetails}>
                  <Typography variant='caption'>
                    Free shipping on orders over $50
                  </Typography>
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
                  <Typography variant='h6'>Discounts</Typography>
                </Box>
                <Box className={classes.shippingDetails}>
                  <Typography variant='caption'>
                    Buy 15 books, save 35%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
        </Box>
      </>
    )
  }

  return <WrappedComponent left={<BookImage />} right={<BookContent />} />
}

export default withBookProductBanner
