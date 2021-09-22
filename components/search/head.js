import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

export const Head = (props) => (
  <NextHead>
    <link
      rel='stylesheet'
      href='https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css'
    />
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
}

export default Head
