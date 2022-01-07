import React, { Component } from 'react'

import { withWorkshopSearch } from './variants'
import { algoliaAppId, algoliaSearchApiKey } from '@/lib/algolia'
import algoliasearch from 'algoliasearch'

/**
 *
 * @param {String} variant Algolia search index
 * @returns {Component}
 */

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

const ProductSearch = ({ variant, ...restProps }) => {
  const getVariant = () => {
    switch (variant) {
      case 'workshop':
        return withWorkshopSearch(searchClient)
    }
  }

  return <>{variant && <>{getVariant()}</>}</>
}

export default ProductSearch
