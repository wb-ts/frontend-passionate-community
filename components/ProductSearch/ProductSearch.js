import React, { Component } from 'react'

import { WorkshopSearch } from './variants'

/**
 *
 * @param {String} variant Algolia search index
 * @returns {Component}
 */

const ProductSearch = ({ variant, ...restProps }) => {
  const getVariant = () => {
    switch (variant) {
      case 'workshop':
        return WorkshopSearch()
    }
  }

  return <>{variant && <>{getVariant()}</>}</>
}

export default ProductSearch
