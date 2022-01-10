import React, { Component } from 'react'

import algoliasearch from 'algoliasearch'
import { withWorkshopSearch, withPeopleSearch } from './variants'
import { algoliaAppId, algoliaSearchApiKey } from '@/lib/algolia'

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
      case 'people':
        return withPeopleSearch(searchClient, 20)
    }
  }

  return <>{variant && <>{getVariant()}</>}</>
}

export default ProductSearch
