import React from 'react'
import { isEqual } from 'lodash'
import Layout from '../../components/layout'
import { Container } from '@mui/material'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import qs from 'qs'
import algoliasearch from 'algoliasearch/lite'
import { Head, App } from '../../components/search'
import { SEOHead } from '../../const'
import { client } from '../../lib/contentful'
import {
  algoliaAppId,
  algoliaSearchApiKey,
  algoliaSearchIndexId,
} from '../../lib/algolia'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

const updateAfter = 700

const createURL = (state) => `?${qs.stringify(state)}`

const pathToSearchState = (path) =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}

const searchStateToURL = (searchState) =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : ''

const DEFAULT_PROPS = {
  searchClient,
  indexName: algoliaSearchIndexId,
}

export const getStaticProps = async () => {
  const SEOData = await client.getEntries({
    content_type: 'seo',
    'fields.id': 'search',
  })

  return {
    props: {
      SEO: SEOData.items.length ? SEOData.items[0] : {},
    },
    revalidate: 20,
  }
}

class Page extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    resultsState: PropTypes.object,
    searchState: PropTypes.object,
  }

  state = {
    searchState: {},
    lastRouter: this.props.router,
  }

  static getDerivedStateFromProps(props, state) {
    if (isEqual(state.lastRouter, props.router)) {
      return {
        searchState: pathToSearchState(props.router.asPath),
        lastRouter: props.router,
      }
    }

    return null
  }

  onSearchStateChange = (searchState) => {
    clearTimeout(this.debouncedSetState)

    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToURL({
        ...this.state.searchState,
        ...searchState,
      })

      this.props.router.push(href, href, {
        shallow: true,
      })
    }, updateAfter)

    this.setState({
      searchState: { ...this.state.searchState, ...searchState },
    })
  }

  render() {
    return (
      <Layout>
        <SEOHead seo={this.props.SEO} />
        <Head></Head>
        <Container>
          <App
            {...DEFAULT_PROPS}
            searchState={this.state.searchState}
            resultsState={this.props.resultsState}
            onSearchStateChange={this.onSearchStateChange}
            createURL={createURL}
          />
        </Container>
      </Layout>
    )
  }
}

export default withRouter(Page)
