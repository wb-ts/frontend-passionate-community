import React from 'react'
import PropTypes from 'prop-types'
import SnipcartButton from '../../Snipcart/SnipcartButton'
import { withBookBuyButton } from './variants'

/**
 *
 *
 */
const BuyButton = ({ label, selectedVariantId, data }) => {
  const getVariant = () => {
    switch (data.__typename) {
      case 'Book':
        return withBookBuyButton(SnipcartButton, data, selectedVariantId)
    }
  }

  return <>{data && <>{getVariant()}</>}</>
}
export default BuyButton

BuyButton.propTypes = {
  label: PropTypes.string,
}
