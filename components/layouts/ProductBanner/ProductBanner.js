import React from 'react'
import TwoColumn from '../TwoColumn'
import { withBookProductBanner } from './variants'

const ProductBanner = ({ data, defaultProductVariantId }) => {
  const getVariant = () => {
    switch (data.__typename) {
      case 'Book':
        return withBookProductBanner(TwoColumn, data, defaultProductVariantId)
    }
  }

  return <>{data && <>{getVariant()}</>}</>
}

export default ProductBanner
